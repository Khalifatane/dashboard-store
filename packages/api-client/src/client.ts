// HTTP client for BFF API
import { API_URL } from "@repo/config/env";

export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private buildUrl(
    path: string,
    params?: Record<string, string | number | boolean | undefined>
  ): string {
    const normalizedBase = this.baseUrl.endsWith("/")
      ? this.baseUrl
      : `${this.baseUrl}/`;
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
    const url = new URL(normalizedPath, normalizedBase);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  private buildGraphqlUrl(): string {
    if (this.baseUrl.endsWith("/graphql")) {
      return this.baseUrl;
    }
    return this.baseUrl.replace(/\/$/, "") + "/graphql";
  }

  private async request<T>(
    path: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, ...fetchConfig } = config;
    const url = this.buildUrl(path, params);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((fetchConfig.headers as Record<string, string>) || {}),
    };

    // Add auth token if available
    const token = typeof window !== "undefined" 
      ? localStorage.getItem("auth_token") 
      : undefined;
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...fetchConfig,
        headers,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new ApiError(
          data?.message || `HTTP error ${response.status}`,
          response.status,
          data
        );
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : "Network error",
        0
      );
    }
  }

  async graphql<T>(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("auth_token")
        : undefined;

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(this.buildGraphqlUrl(), {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
    });

    const payload = (await response
      .json()
      .catch(() => null)) as GraphQLResponse<T> | null;

    if (!response.ok) {
      throw new ApiError(
        payload?.errors?.[0]?.message ||
          `HTTP error ${response.status}`,
        response.status,
        payload
      );
    }

    if (!payload || payload.errors?.length) {
      throw new ApiError(
        payload?.errors?.[0]?.message || "GraphQL error",
        response.status,
        payload
      );
    }

    if (!payload.data) {
      throw new ApiError("No data returned from GraphQL", response.status);
    }

    return payload.data;
  }

  // HTTP methods
  get<T>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(path, { ...config, method: "GET" });
  }

  post<T>(path: string, body: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(path, {
      ...config,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put<T>(path: string, body: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(path, {
      ...config,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  patch<T>(path: string, body: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(path, {
      ...config,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  delete<T>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(path, { ...config, method: "DELETE" });
  }
}

// Default client instance
export const apiClient = new ApiClient();

// Helper to create a new client with custom config
export function createApiClient(baseUrl?: string): ApiClient {
  return new ApiClient(baseUrl);
}

import { http, HttpResponse } from "msw";
import {
  mockProducts,
  mockCategories,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  searchProducts,
  createMockCheckout,
  getCheckoutById,
  updateCheckoutShippingAddress,
  updateCheckoutBillingAddress,
  setShippingMethod,
  completeCheckout,
  getOrderById,
} from "../data";
import { ApiResponse, PaginatedResponse } from "../types";

const API_BASE = "http://localhost:4000";

export const apiHandlers = [
  // GET /products - List all products
  http.get(`${API_BASE}/products`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search");

    let products = [...mockProducts];

    if (category) {
      products = getProductsByCategory(category);
    }

    if (search) {
      products = searchProducts(search);
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedProducts = products.slice(start, end);

    const response: ApiResponse<PaginatedResponse<typeof mockProducts[0]>> = {
      data: {
        data: paginatedProducts,
        totalCount: products.length,
        pageInfo: {
          hasNextPage: end < products.length,
          hasPreviousPage: page > 1,
        },
      },
      success: true,
    };

    return HttpResponse.json(response);
  }),

  // GET /products/:slug - Get product by slug
  http.get(`${API_BASE}/products/:slug`, ({ params }) => {
    const { slug } = params;
    const product = getProductBySlug(slug as string);

    if (!product) {
      return HttpResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    const response: ApiResponse<typeof product> = {
      data: product,
      success: true,
    };

    return HttpResponse.json(response);
  }),

  // GET /categories - List all categories
  http.get(`${API_BASE}/categories`, () => {
    const response: ApiResponse<typeof mockCategories> = {
      data: mockCategories,
      success: true,
    };

    return HttpResponse.json(response);
  }),

  // GET /categories/:slug - Get category by slug
  http.get(`${API_BASE}/categories/:slug`, ({ params }) => {
    const { slug } = params;
    const category = mockCategories.find((c) => c.slug === slug);

    if (!category) {
      return HttpResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    const response: ApiResponse<typeof category> = {
      data: category,
      success: true,
    };

    return HttpResponse.json(response);
  }),

  // POST /checkout - Create checkout
  http.post(`${API_BASE}/checkout`, async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      lines: { variantId: string; quantity: number }[];
    };

    if (!body.email || !body.lines || body.lines.length === 0) {
      return HttpResponse.json(
        { success: false, message: "Invalid checkout data" },
        { status: 400 }
      );
    }

    const checkout = createMockCheckout(body.email, body.lines);

    const response: ApiResponse<typeof checkout> = {
      data: checkout,
      success: true,
    };

    return HttpResponse.json(response, { status: 201 });
  }),

  // GET /checkout/:id - Get checkout by ID
  http.get(`${API_BASE}/checkout/:id`, ({ params }) => {
    const { id } = params;
    const checkout = getCheckoutById(id as string);

    if (!checkout) {
      return HttpResponse.json(
        { success: false, message: "Checkout not found" },
        { status: 404 }
      );
    }

    const response: ApiResponse<typeof checkout> = {
      data: checkout,
      success: true,
    };

    return HttpResponse.json(response);
  }),

  // PATCH /checkout/:id/shipping-address - Update shipping address
  http.patch(
    `${API_BASE}/checkout/:id/shipping-address`,
    async ({ request, params }) => {
      const { id } = params;
      const body = (await request.json()) as {
        firstName: string;
        lastName: string;
        streetAddress1: string;
        city: string;
        postalCode: string;
        country: string;
        phone?: string;
      };

      const checkout = updateCheckoutShippingAddress(id as string, body);

      if (!checkout) {
        return HttpResponse.json(
          { success: false, message: "Checkout not found" },
          { status: 404 }
        );
      }

      const response: ApiResponse<typeof checkout> = {
        data: checkout,
        success: true,
      };

      return HttpResponse.json(response);
    }
  ),

  // PATCH /checkout/:id/billing-address - Update billing address
  http.patch(
    `${API_BASE}/checkout/:id/billing-address`,
    async ({ request, params }) => {
      const { id } = params;
      const body = (await request.json()) as {
        firstName: string;
        lastName: string;
        streetAddress1: string;
        city: string;
        postalCode: string;
        country: string;
        phone?: string;
      };

      const checkout = updateCheckoutBillingAddress(id as string, body);

      if (!checkout) {
        return HttpResponse.json(
          { success: false, message: "Checkout not found" },
          { status: 404 }
        );
      }

      const response: ApiResponse<typeof checkout> = {
        data: checkout,
        success: true,
      };

      return HttpResponse.json(response);
    }
  ),

  // POST /checkout/:id/shipping-method - Set shipping method
  http.post(
    `${API_BASE}/checkout/:id/shipping-method`,
    async ({ request, params }) => {
      const { id } = params;
      const body = (await request.json()) as { shippingMethodId: string };

      const checkout = setShippingMethod(id as string, body.shippingMethodId);

      if (!checkout) {
        return HttpResponse.json(
          { success: false, message: "Checkout or shipping method not found" },
          { status: 404 }
        );
      }

      const response: ApiResponse<typeof checkout> = {
        data: checkout,
        success: true,
      };

      return HttpResponse.json(response);
    }
  ),

  // POST /checkout/:id/complete - Complete checkout
  http.post(
    `${API_BASE}/checkout/:id/complete`,
    async ({ request, params }) => {
      const { id } = params;
      const body = (await request.json()) as { paymentMethod: string };

      const order = completeCheckout(id as string, body.paymentMethod);

      if (!order) {
        return HttpResponse.json(
          { success: false, message: "Checkout not found" },
          { status: 404 }
        );
      }

      const response: ApiResponse<typeof order> = {
        data: order,
        success: true,
      };

      return HttpResponse.json(response, { status: 201 });
    }
  ),

  // GET /orders/:id - Get order by ID
  http.get(`${API_BASE}/orders/:id`, ({ params }) => {
    const { id } = params;
    const order = getOrderById(id as string);

    if (!order) {
      return HttpResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const response: ApiResponse<typeof order> = {
      data: order,
      success: true,
    };

    return HttpResponse.json(response);
  }),

  // POST /payments - Process payment (placeholder for PayDunya integration)
  http.post(`${API_BASE}/payments`, async ({ request }) => {
    const body = (await request.json()) as {
      checkoutId: string;
      paymentMethod: string;
      amount: number;
      currency: string;
    };

    // Mock payment processing
    const paymentResponse = {
      id: `payment-${Date.now()}`,
      status: "PENDING",
      amount: body.amount,
      currency: body.currency,
      paymentMethod: body.paymentMethod,
      redirectUrl: `https://mock-payment-gateway.com/checkout/${body.paymentMethod}`,
      createdAt: new Date().toISOString(),
    };

    const response: ApiResponse<typeof paymentResponse> = {
      data: paymentResponse,
      success: true,
      message: "Payment initiated successfully",
    };

    return HttpResponse.json(response, { status: 201 });
  }),
];

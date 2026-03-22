// Product API functions
import { apiClient } from "./client";
import {
  Product,
  PaginatedResponse,
  ListProductsParams,
} from "./types";

/**
 * Get a paginated list of products
 * @param params - Query parameters for filtering and pagination
 * @returns Paginated list of products
 */
export async function getProducts(
  params?: ListProductsParams
): Promise<PaginatedResponse<Product>> {
  const query = /* GraphQL */ `
    query Products($first: Int, $channel: String) {
      products(first: $first, channel: $channel) {
        edges {
          node {
            id
            name
            slug
            description
            category { id name slug }
            thumbnail { url alt }
            media { url alt }
            variants { id name }
            pricing {
              priceRange {
                start { gross { amount currency } }
              }
            }
          }
        }
      }
    }
  `;

  const data = await apiClient.graphql<{
    products: {
      edges: {
        node: {
          id: string;
          name: string;
          slug: string;
          description?: string | null;
          category?: { id: string; name: string; slug: string } | null;
          thumbnail?: { url: string; alt?: string | null } | null;
          media?: { url: string; alt?: string | null }[] | null;
          variants?: { id: string; name: string }[] | null;
          pricing?: {
            priceRange?: {
              start?: { gross?: { amount: number; currency: string } | null } | null;
            } | null;
          } | null;
        };
      }[];
    };
  }>(query, { first: params?.limit, channel: undefined });

  const products = data.products.edges.map(({ node }) =>
    mapProduct(node)
  );

  return {
    data: products,
    totalCount: products.length,
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };
}

/**
 * Get a single product by slug
 * @param slug - Product slug
 * @returns Product details
 */
export async function getProductBySlug(slug: string): Promise<Product> {
  const query = /* GraphQL */ `
    query ProductBySlug($slug: String!, $channel: String) {
      product(slug: $slug, channel: $channel) {
        id
        name
        slug
        description
        category { id name slug }
        thumbnail { url alt }
        media { url alt }
        variants { id name }
        pricing {
          priceRange {
            start { gross { amount currency } }
          }
        }
      }
    }
  `;

  const data = await apiClient.graphql<{
    product: {
      id: string;
      name: string;
      slug: string;
      description?: string | null;
      category?: { id: string; name: string; slug: string } | null;
      thumbnail?: { url: string; alt?: string | null } | null;
      media?: { url: string; alt?: string | null }[] | null;
      variants?: { id: string; name: string }[] | null;
      pricing?: {
        priceRange?: {
          start?: { gross?: { amount: number; currency: string } | null } | null;
        } | null;
      } | null;
    } | null;
  }>(query, { slug, channel: undefined });

  if (!data.product) {
    throw new Error("Product not found");
  }

  return mapProduct(data.product);
}

/**
 * Get a single product by ID
 * @param id - Product ID
 * @returns Product details
 */
export async function getProductById(id: string): Promise<Product> {
  // The mock data is slug-centric; try slug first and fall back to ID lookup on the list.
  try {
    return await getProductBySlug(id);
  } catch {
    const products = await getProducts();
    const product = products.data.find((p) => p.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
}

function mapProduct(node: {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  category?: { id: string; name: string; slug: string } | null;
  thumbnail?: { url: string; alt?: string | null } | null;
  media?: { url: string; alt?: string | null }[] | null;
  variants?: { id: string; name: string }[] | null;
  pricing?: {
    priceRange?: {
      start?: { gross?: { amount: number; currency: string } | null } | null;
    } | null;
  } | null;
}): Product {
  const media = node.media && node.media.length > 0 ? node.media : undefined;
  const image = media?.[0] || node.thumbnail || { url: "https://placehold.co/600x400", alt: node.name };
  const price = node.pricing?.priceRange?.start?.gross || { amount: 0, currency: "USD" };

  return {
    id: node.id,
    name: node.name,
    slug: node.slug,
    description: node.description || "",
    price: {
      amount: price.amount,
      currency: price.currency,
    },
    images: [
      {
        url: image.url,
        alt: image.alt || node.name,
      },
    ],
    category: node.category
      ? {
          id: node.category.id,
          name: node.category.name,
          slug: node.category.slug,
          level: 0,
        }
      : {
          id: "uncategorized",
          name: "Uncategorized",
          slug: "uncategorized",
          level: 0,
        },
    variants:
      node.variants && node.variants.length > 0
        ? node.variants.map((v) => ({
            id: v.id,
            name: v.name,
            sku: `SKU-${v.id}`,
            quantityAvailable: 100,
          }))
        : [
            {
              id: `${node.id}-v1`,
              name: "Default",
              sku: `SKU-${node.id}-v1`,
              quantityAvailable: 100,
            },
          ],
    attributes: [],
    isAvailable: true,
    rating: undefined,
    reviewCount: undefined,
  };
}

/**
 * Search products by query string
 * @param query - Search query
 * @param page - Page number
 * @param limit - Items per page
 * @returns Paginated search results
 */
export async function searchProducts(
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResponse<Product>> {
  return getProducts({ search: query, page, limit });
}

/**
 * Get products by category
 * @param categorySlug - Category slug
 * @param page - Page number
 * @param limit - Items per page
 * @returns Paginated products in category
 */
export async function getProductsByCategory(
  categorySlug: string,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResponse<Product>> {
  return getProducts({ category: categorySlug, page, limit });
}

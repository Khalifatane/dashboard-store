// Category API functions
import { apiClient } from "./client";
import { Category } from "./types";

/**
 * Get all categories
 * @returns List of all categories
 */
export async function getCategories(): Promise<Category[]> {
  const query = /* GraphQL */ `
    query Categories {
      categories {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  `;

  const data = await apiClient.graphql<{
    categories: { edges: { node: { id: string; name: string; slug: string } }[] };
  }>(query);

  return data.categories.edges.map(({ node }) => ({
    id: node.id,
    name: node.name,
    slug: node.slug,
    level: 0,
    children: [],
  }));
}

/**
 * Get a single category by slug
 * @param slug - Category slug
 * @returns Category details
 */
export async function getCategoryBySlug(slug: string): Promise<Category> {
  const query = /* GraphQL */ `
    query CategoryBySlug($slug: String!) {
      categories {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  `;

  const data = await apiClient.graphql<{
    categories: { edges: { node: { id: string; name: string; slug: string } }[] };
  }>(query, { slug });

  const match = data.categories.edges.find((edge) => edge.node.slug === slug);
  if (!match) {
    throw new Error("Category not found");
  }

  return {
    id: match.node.id,
    name: match.node.name,
    slug: match.node.slug,
    level: 0,
    children: [],
  };
}

import { GraphQLScalarType, Kind } from "graphql";
import { v4 as uuid } from "uuid";
import { mockProducts, mockCategories } from "@repo/mock";

type CheckoutLine = {
  id: string;
  quantity: number;
  variant: ReturnType<typeof mapVariant>;
};

type Checkout = {
  token: string;
  lines: CheckoutLine[];
};

const checkouts = new Map<string, Checkout>();

const collections = [
  { id: "col-001", name: "Featured", slug: "featured" },
  { id: "col-002", name: "New Arrivals", slug: "new-arrivals" },
];

export const resolvers = {
  UUID: new GraphQLScalarType({
    name: "UUID",
    description: "UUID scalar represented as string",
    serialize: (value) => String(value),
    parseValue: (value) => String(value),
    parseLiteral: (ast) => (ast.kind === Kind.STRING ? ast.value : null),
  }),
  Query: {
    products: (_: unknown, args: { first?: number; channel?: string }) => {
      const limit = args.first ?? 10;
      const items = mockProducts.slice(0, limit);

      return {
        edges: items.map((p) => ({
          node: mapProduct(p),
        })),
      };
    },
    product: (_: unknown, args: { slug: string; channel?: string }) => {
      const product = mockProducts.find((p) => p.slug === args.slug);
      return product ? mapProduct(product) : null;
    },
    categories: (_: unknown, args: { first?: number }) => {
      const limit = args.first ?? mockCategories.length;
      const items = mockCategories.slice(0, limit);
      return {
        edges: items.map((c) => ({
          node: mapCategory(c),
        })),
      };
    },
    collections: (_: unknown, args: { first?: number; channel?: string }) => {
      const limit = args.first ?? collections.length;
      return {
        edges: collections.slice(0, limit).map((c) => ({
          node: c,
        })),
      };
    },
    checkout: (_: unknown, args: { token: string }) =>
      checkouts.get(args.token) || null,
  },
  Mutation: {
    checkoutCreate: (_: unknown, args: { input: { lines?: { variantId: string; quantity: number }[] } }) => {
      const token = uuid();
      const lines = (args.input.lines || []).map((line) => {
        const variant = findVariantById(line.variantId);
        return {
          id: uuid(),
          quantity: line.quantity,
          variant,
        };
      });

      const checkout: Checkout = { token, lines };
      checkouts.set(token, checkout);

      return { checkout };
    },
    checkoutLinesAdd: (
      _: unknown,
      args: { token: string; lines: { variantId: string; quantity: number }[] }
    ) => {
      const checkout = checkouts.get(args.token);
      if (!checkout) {
        throw new Error("Checkout not found");
      }

      args.lines.forEach((line) => {
        const variant = findVariantById(line.variantId);
        checkout.lines.push({
          id: uuid(),
          quantity: line.quantity,
          variant,
        });
      });

      return { checkout };
    },
    checkoutLinesUpdate: (
      _: unknown,
      args: { token: string; lines: { variantId: string; quantity: number }[] }
    ) => {
      const checkout = checkouts.get(args.token);
      if (!checkout) {
        throw new Error("Checkout not found");
      }

      checkout.lines = args.lines.map((line) => {
        const variant = findVariantById(line.variantId);
        return {
          id: uuid(),
          quantity: line.quantity,
          variant,
        };
      });

      return { checkout };
    },
    checkoutComplete: (_: unknown, args: { token: string }) => {
      if (!checkouts.has(args.token)) {
        throw new Error("Checkout not found");
      }
      return {
        orderId: `ORDER-${Math.floor(Math.random() * 10000)}`,
      };
    },
  },
  Checkout: {
    totalPrice: (checkout: Checkout) => {
      const amount = checkout.lines.reduce(
        (sum, line) => sum + line.variant.pricing.price.gross.amount * line.quantity,
        0
      );

      return {
        gross: {
          amount,
          currency: "USD",
        },
      };
    },
  },
};

function mapProduct(p: typeof mockProducts[number]) {
  const image = p.images[0];
  const url = image?.url || "https://via.placeholder.com/300";
  const alt = image?.alt || p.name;

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    category: p.category ? mapCategory(p.category) : null,
    thumbnail: { url, alt },
    media: [{ url, alt }],
    variants: p.variants.length ? p.variants.map((v) => mapVariant(v, p)) : [mapVariant(p)],
    pricing: {
      priceRange: {
        start: price(p.price.amount, p.price.currency),
        stop: price(p.price.amount, p.price.currency),
      },
    },
  };
}

function mapVariant(
  variantOrProduct: { id: string; name?: string } | typeof mockProducts[number],
  product?: typeof mockProducts[number]
) {
  const baseProduct =
    product ||
    mockProducts.find((p) =>
      "variants" in variantOrProduct
        ? p.id === variantOrProduct.id
        : p.variants.some((v) => v.id === variantOrProduct.id)
    );

  const priceAmount = baseProduct?.price.amount ?? 0;
  const priceCurrency = baseProduct?.price.currency ?? "USD";

  return {
    id: variantOrProduct.id,
    name: variantOrProduct.name || "Default",
    pricing: {
      price: price(priceAmount, priceCurrency),
    },
  };
}

function mapCategory(c: { id: string; name: string; slug: string }) {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
  };
}

function price(amount: number, currency: string) {
  return {
    gross: {
      amount,
      currency,
    },
  };
}

function findVariantById(variantId: string) {
  for (const product of mockProducts) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) {
      return mapVariant(variant, product);
    }
  }

  const fallbackProduct = mockProducts.find((p) => p.id === variantId);
  if (fallbackProduct) {
    return mapVariant(fallbackProduct);
  }

  return {
    id: variantId,
    name: "Default",
    pricing: {
      price: price(0, "USD"),
    },
  };
}

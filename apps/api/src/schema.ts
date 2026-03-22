export const typeDefs = /* GraphQL */ `
  scalar UUID

  type Query {
    products(first: Int, channel: String): ProductConnection!
    product(slug: String!, channel: String): Product
    categories(first: Int): CategoryConnection!
    collections(first: Int, channel: String): CollectionConnection!
    checkout(token: UUID!): Checkout
  }

  type Mutation {
    checkoutCreate(input: CheckoutCreateInput!): CheckoutCreate!
    checkoutLinesAdd(token: UUID!, lines: [CheckoutLineInput!]!): CheckoutLinesAdd!
    checkoutLinesUpdate(token: UUID!, lines: [CheckoutLineInput!]!): CheckoutLinesUpdate!
    checkoutComplete(token: UUID!): CheckoutComplete!
  }

  type ProductConnection {
    edges: [ProductEdge!]!
  }

  type ProductEdge {
    node: Product!
  }

  type CategoryConnection {
    edges: [CategoryEdge!]!
  }

  type CategoryEdge {
    node: Category!
  }

  type CollectionConnection {
    edges: [CollectionEdge!]!
  }

  type CollectionEdge {
    node: Collection!
  }

  type Product {
    id: ID!
    name: String!
    slug: String!
    description: String
    category: Category
    thumbnail: Image
    media: [ProductMedia!]!
    variants: [ProductVariant!]!
    pricing: ProductPricingInfo
  }

  type ProductVariant {
    id: ID!
    name: String!
    pricing: VariantPricingInfo
  }

  type VariantPricingInfo {
    price: TaxedMoney
  }

  type ProductMedia {
    url: String!
    alt: String
  }

  type ProductPricingInfo {
    priceRange: TaxedMoneyRange
  }

  type TaxedMoneyRange {
    start: TaxedMoney
    stop: TaxedMoney
  }

  type TaxedMoney {
    gross: Money
  }

  type Money {
    amount: Float!
    currency: String!
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
  }

  type Collection {
    id: ID!
    name: String!
    slug: String!
  }

  type Image {
    url: String!
    alt: String
  }

  type Checkout {
    token: UUID!
    lines: [CheckoutLine!]!
    totalPrice: TaxedMoney
  }

  type CheckoutLine {
    id: ID!
    quantity: Int!
    variant: ProductVariant!
  }

  input CheckoutCreateInput {
    lines: [CheckoutLineInput!]
  }

  input CheckoutLineInput {
    variantId: ID!
    quantity: Int!
  }

  type CheckoutCreate {
    checkout: Checkout
  }

  type CheckoutLinesAdd {
    checkout: Checkout
  }

  type CheckoutLinesUpdate {
    checkout: Checkout
  }

  type CheckoutComplete {
    orderId: ID
  }
`;

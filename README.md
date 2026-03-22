# Saleor Monorepo

A production-grade monorepo for Saleor e-commerce applications using Turborepo and pnpm workspaces.

## Architecture

This monorepo follows a **Backend-for-Frontend (BFF)** pattern that decouples frontend applications from direct Saleor dependencies.

```
Frontend Apps (Storefront, Dashboard)
    ↓
API Client Package (@repo/api-client)
    ↓
BFF API (/apps/api) - localhost:4000
    ↓
Saleor API OR Mock Data
```

## Project Structure

```
/
├── apps/
│   ├── api/              # BFF API (Express.js) - Port 4000
│   ├── storefront/       # Next.js Storefront - Port 3000
│   └── dashboard/        # Vite React Dashboard - Port 9000
├── packages/
│   ├── ui/               # Shared React components (@repo/ui)
│   ├── api-client/       # BFF API client (@repo/api-client)
│   ├── config/           # Shared configuration (@repo/config)
│   └── mock/             # MSW mock data (@repo/mock)
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9.4.0

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Development

Run all applications in development mode:

```bash
pnpm dev
```

Or run individual apps:

```bash
# BFF API
pnpm --filter @repo/api dev

# Storefront
pnpm --filter @repo/storefront dev

# Dashboard
pnpm --filter @repo/dashboard dev
```

### Ports

| Application | Port | URL |
|-------------|------|-----|
| BFF API | 4000 | http://localhost:4000 |
| Storefront | 3000 | http://localhost:3000 |
| Dashboard | 9000 | http://localhost:9000 |

## Environment Variables

### Root `.env`

```bash
# BFF API URL (used by all apps)
NEXT_PUBLIC_API_URL=http://localhost:4000
VITE_API_URL=http://localhost:4000

# Saleor API (used only by BFF)
SALEOR_API_URL=https://demo.saleor.io/graphql/
SALEOR_API_TOKEN=your-token

# Mock Mode
USE_MOCK=true
```

## Key Features

### 1. Backend-for-Frontend (BFF) Pattern

- All frontend apps communicate ONLY with the BFF API
- No direct GraphQL calls from frontend
- Easy to mock and test
- Future-proof for custom backend logic

### 2. Mock Support

Enable mocking by setting `USE_MOCK=true`:

```bash
# In root .env
USE_MOCK=true
```

The BFF will return mock data instead of calling Saleor.

### 3. Payment Integration Ready

The BFF includes prepared endpoints for:
- PayDunya (West African payments)
- Stripe (Credit cards)
- Custom payment providers

### 4. Shared Packages

- **@repo/ui**: Reusable React components (Button, ProductCard, etc.)
- **@repo/api-client**: Type-safe API client for BFF
- **@repo/config**: Shared configuration and environment variables
- **@repo/mock**: MSW mock data and handlers

## API Endpoints

### Products
- `GET /api/products` - List products
- `GET /api/products/:slug` - Get product by slug

### Categories
- `GET /api/categories` - List categories
- `GET /api/categories/:slug` - Get category by slug

### Checkout
- `POST /api/checkout` - Create checkout
- `GET /api/checkout/:id` - Get checkout
- `PATCH /api/checkout/:id/shipping-address` - Update shipping address
- `PATCH /api/checkout/:id/billing-address` - Update billing address
- `POST /api/checkout/:id/shipping-method` - Set shipping method
- `POST /api/checkout/:id/complete` - Complete checkout

### Payments
- `POST /api/payments` - Create payment
- `GET /api/payments/:id/status` - Check payment status

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order by ID

## Usage Examples

### Using the API Client

```typescript
import { getProducts, getProductBySlug, createCheckout } from "@repo/api-client";

// Get products
const products = await getProducts({ limit: 10 });

// Get single product
const product = await getProductBySlug("premium-t-shirt");

// Create checkout
const checkout = await createCheckout({
  email: "customer@example.com",
  lines: [{ variantId: "var-001", quantity: 2 }],
});
```

### Using UI Components

```tsx
import { Button, ProductCard } from "@repo/ui";

function MyComponent() {
  return (
    <>
      <Button variant="primary" size="lg">
        Click me
      </Button>
      
      <ProductCard
        id="prod-001"
        name="T-Shirt"
        slug="t-shirt"
        price={{ amount: 29.99, currency: "USD" }}
        // ...other props
      />
    </>
  );
}
```

## Building for Production

```bash
# Build all apps and packages
pnpm build

# Start production server
pnpm --filter @repo/api start
```

## Testing

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @repo/api-client test
```

## Adding New Packages

```bash
# Generate new package using Turbo
pnpm turbo gen workspace
```

## Contributing

1. Create a new branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT

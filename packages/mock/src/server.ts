// MSW server setup for Node.js (used in BFF and tests)
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

export function startMockServer() {
  server.listen({ onUnhandledRequest: "bypass" });
  console.log("[MSW] Mock server started");
}

export function stopMockServer() {
  server.close();
  console.log("[MSW] Mock server stopped");
}

export { handlers };

// MSW browser setup for frontend apps
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

export function startMockWorker() {
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
}

export function stopMockWorker() {
  worker.stop();
}

export { handlers };

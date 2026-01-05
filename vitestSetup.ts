import nextRouterMock from "next-router-mock";
import { beforeEach, vi } from "vitest";

beforeEach(async () => {
    vi.mock("next/router", () => nextRouterMock);
    vi.mock("next/navigation", () => {
        return {
            __esModule: true,
            usePathname: () => ({
                pathname: "",
            }),
            useRouter: () => ({
                push: vi.fn(),
                replace: vi.fn(),
                prefetch: vi.fn(),
            }),
            useSearchParams: () => ({
                get: () => {},
            }),
        };
    });
});

import { vi } from "vitest"
vi.mock("solid-js/web", () => ({
  ...jest.requireActual("solid-js/web"),
  onMount: vi.fn(),
}))

import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for the Portofolio UI audit.
 *
 * Scope: visual regression + functional a11y/UX checks for the 3D flip
 * book portfolio. Single browser (chromium) — baselines are platform-
 * specific and the project is desktop-primary.
 *
 * Targets:
 *   - Desktop: 1280x800 (close to common laptop viewport)
 *   - Mobile:  Pixel 5 (393x851) — the project's narrow-screen branch
 *
 * The build is served by `next start` on a project-specific port
 * (default 4388). webServer.command runs the build so CI does not need
 * a separate `npm run build` step.
 *
 * Visual baselines: first run uses `npx playwright test --update-snapshots`
 * to capture the deployed site's current state. Subsequent runs diff
 * against the local build to catch unintended visual drift.
 *
 * ponytail: pinned to chromium + 2 viewports. Add `webkit` or `firefox`
 * projects when design system needs cross-browser verification.
 */
const port = Number(process.env.AUDIT_PORT ?? 4388);
const baseUrl = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/audit",
  fullyParallel: false, // single book, single state — sequential
  forbidOnly: !!process.env.CI,
  retries: 0, // audit runs are diagnostic, not flaky
  workers: 1,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "audit-report" }],
    ["json", { outputFile: "audit-report/results.json" }],
  ],
  outputDir: "audit-report/test-results",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02, // 2% tolerance — fonts/anti-aliasing vary slightly
      animations: "disabled", // flip animations stay still for diff
    },
  },
  use: {
    baseURL: baseUrl,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off", // audit diagnostics; screenshots are the artifact
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    // The project uses `output: "export"`, so `next start` won't serve it.
    // Build then serve the static `out/` directory.
    command: `npm run build && npx -y serve@latest -l ${port} -L out`,
    url: baseUrl,
    reuseExistingServer: process.env.AUDIT_REUSE_SERVER === "1",
    timeout: 180_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});

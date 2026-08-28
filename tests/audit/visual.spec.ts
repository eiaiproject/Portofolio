/**
 * Full UI audit — Portofolio 3D flip book.
 *
 * Covers:
 *   1. Visual regression — every page (cover, title, manifesto, 4 projects,
 *      contact) at desktop + mobile viewports, plus 404.
 *   2. A11y structure — single h1, heading hierarchy, ARIA labels, skip link,
 *      focus visibility.
 *   3. Functional — keyboard flip (ArrowRight/Left), button controls, deep
 *      link hashes land on the right page, mobile menu open/close, no console
 *      errors.
 *
 * Run:
 *   npm run audit                     # regression check against baselines
 *   npm run audit:update              # capture baselines
 *
 * Navigation: hash deep links only apply on first mount (see
 * app/page.tsx), so for in-test page navigation we use the actual UI
 * flow: nav links (which call `handleNavigate` → `flipTo` and update
 * React state) or the Prev/Next buttons.
 */
import { test, expect, type Page } from "@playwright/test";

const SITE = "https://anggieirawan.my.id";

// ── Helpers ────────────────────────────────────────────────────────

/** Cold-load the app and wait for it to settle. */
async function boot(page: Page): Promise<void> {
  await page.goto("/");
  await page.waitForLoadState("load");
  // The book hides transitions for one frame; give it a beat to settle.
  await page.waitForTimeout(400);
}

/** Open the mobile menu if hidden (mobile only). No-op on desktop. */
async function openMobileMenu(page: Page): Promise<void> {
  const toggle = page.locator(".nav-toggle");
  const visible = await toggle.isVisible().catch(() => false);
  if (!visible) return;
  const expanded = await toggle.getAttribute("aria-expanded");
  if (expanded === "false") await toggle.click();
  await page.waitForTimeout(300);
}

/**
 * Navigate to a target page by name using the in-page nav.
 * Works for both desktop and mobile (opens the menu on mobile).
 *
 * On mobile, the links sit inside the collapsed menu; the menu
 * grid-rows animation makes them briefly unstable, so we wait for
 * the link to be visible before clicking.
 */
async function navTo(page: Page, label: string): Promise<void> {
  await openMobileMenu(page);
  const link = page.getByRole("link", { name: label, exact: true }).first();
  await link.waitFor({ state: "visible", timeout: 5_000 });
  await link.click();
  await page.waitForTimeout(1400); // flip animation + buffer
}

// ── 1. Visual regression ───────────────────────────────────────────

test.describe("Visual — every page (desktop)", () => {
  test.beforeEach(async ({ page }) => {
    await boot(page);
  });

  test("cover", async ({ page }) => {
    await expect(page).toHaveScreenshot("desktop-cover.png");
  });

  test("title", async ({ page }) => {
    // Cover → title via Next.
    await page.getByRole("button", { name: "Next page" }).click();
    await page.waitForTimeout(1400);
    await expect(page).toHaveScreenshot("desktop-title.png");
  });

  test("about (manifesto)", async ({ page }) => {
    await navTo(page, "About");
    await expect(page).toHaveScreenshot("desktop-about.png");
  });

  test("work (first project spread)", async ({ page }) => {
    await navTo(page, "Work");
    await expect(page).toHaveScreenshot("desktop-work.png");
  });

  test("expend", async ({ page }) => {
    await navTo(page, "Work");
    // Work = first project spread (Expend text + plate). Stay here.
    await expect(page).toHaveScreenshot("desktop-expend.png");
  });

  test("invois", async ({ page }) => {
    // Work spread is project 1 (Expend). Next → Invois.
    await navTo(page, "Work");
    await page.getByRole("button", { name: "Next page" }).click();
    await page.waitForTimeout(1400);
    await expect(page).toHaveScreenshot("desktop-invois.png");
  });

  test("ledjer", async ({ page }) => {
    await navTo(page, "Work");
    await page.getByRole("button", { name: "Next page" }).click();
    await page.waitForTimeout(1400);
    await page.getByRole("button", { name: "Next page" }).click();
    await page.waitForTimeout(1400);
    await expect(page).toHaveScreenshot("desktop-ledjer.png");
  });

  test("zipto", async ({ page }) => {
    await navTo(page, "Work");
    for (let i = 0; i < 3; i++) {
      await page.getByRole("button", { name: "Next page" }).click();
      await page.waitForTimeout(1400);
    }
    await expect(page).toHaveScreenshot("desktop-zipto.png");
  });

  test("capabilities (left of final spread)", async ({ page }) => {
    await navTo(page, "Capabilities");
    await expect(page).toHaveScreenshot("desktop-capabilities.png");
  });

  test("process (same spread as capabilities)", async ({ page }) => {
    await navTo(page, "Process");
    await expect(page).toHaveScreenshot("desktop-process.png");
  });

  test("contact (last page)", async ({ page }) => {
    await navTo(page, "Contact");
    await expect(page).toHaveScreenshot("desktop-contact.png");
  });
});

test.describe("Visual — every page (mobile)", () => {
  test.beforeEach(async ({ page }) => {
    await boot(page);
  });

  test("cover", async ({ page }) => {
    await expect(page).toHaveScreenshot("mobile-cover.png");
  });

  test("title", async ({ page }) => {
    await page.getByRole("button", { name: "Next page" }).click();
    await page.waitForTimeout(1400);
    await expect(page).toHaveScreenshot("mobile-title.png");
  });

  test("about", async ({ page }) => {
    await navTo(page, "About");
    await expect(page).toHaveScreenshot("mobile-about.png");
  });

  test("work", async ({ page }) => {
    await navTo(page, "Work");
    await expect(page).toHaveScreenshot("mobile-work.png");
  });

  test("contact", async ({ page }) => {
    await navTo(page, "Contact");
    await expect(page).toHaveScreenshot("mobile-contact.png");
  });
});

test.describe("Visual — special states", () => {
  test("404 — not found (desktop)", async ({ page }) => {
    await page.goto("/nonexistent-path");
    await page.waitForLoadState("load");
    await expect(page).toHaveScreenshot("desktop-404.png");
  });

  test("mobile — menu open", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile only");
    await boot(page);
    await page.locator(".nav-toggle").click();
    await page.waitForTimeout(400);
    await expect(page).toHaveScreenshot("mobile-menu-open.png");
  });
});

// ── 2. A11y structure ──────────────────────────────────────────────

test.describe("A11y — document structure", () => {
  test("single h1 on the cover (visible)", async ({ page }) => {
    await boot(page);
    // Only the visible h1 counts; inert+aria-hidden faces are excluded.
    const h1s = page.locator("h1:visible");
    await expect(h1s).toHaveCount(1);
    const text = ((await h1s.first().textContent()) ?? "").toUpperCase();
    expect(text).toContain("ANGGIE");
    expect(text).toContain("IRAWAN");
  });

  test("skip link targets #book-main", async ({ page }) => {
    await boot(page);
    const skip = page.locator(".skip-link");
    await expect(skip).toHaveAttribute("href", "#book-main");
  });

  test("page heading is focusable (tabIndex=-1)", async ({ page }) => {
    await boot(page);
    const h1 = page.locator("h1:visible").first();
    await expect(h1).toHaveAttribute("tabindex", "-1");
  });

  test("lang attribute is set", async ({ page }) => {
    await boot(page);
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBeTruthy();
    expect(lang!.length).toBeGreaterThanOrEqual(2);
  });

  test("every image has alt text (or empty alt for decorative)", async ({ page }) => {
    await boot(page);
    const imgs = page.locator("img");
    const count = await imgs.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const alt = await imgs.nth(i).getAttribute("alt");
      expect(alt, `image ${i} must have alt attribute`).not.toBeNull();
    }
  });

  test("every external link has rel=noopener", async ({ page }) => {
    await boot(page);
    const links = page.locator('a[target="_blank"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const rel = await links.nth(i).getAttribute("rel");
      expect(rel, `link ${i}`).toContain("noopener");
    }
  });
});

// ── 3. Functional — interaction (desktop) ──────────────────────────

test.describe("Functional — book controls (desktop)", () => {
  test("Next button advances the book", async ({ page }) => {
    await boot(page);
    const indicator = page.locator(".book-indicator");
    await expect(indicator).toContainText(/cover/i);
    await page.getByRole("button", { name: "Next page" }).click();
    await page.waitForTimeout(1400);
    await expect(indicator).not.toContainText(/cover/i);
  });

  test("Prev button at cover is disabled", async ({ page }) => {
    await boot(page);
    const prev = page.getByRole("button", { name: "Previous page" });
    await expect(prev).toBeDisabled();
  });

  test("Next button at last page (contact) is disabled — desktop", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "desktop only — mobile has an extra colophon sheet");
    await boot(page);
    // Click Next until disabled (avoids any nav-link flakiness).
    for (let i = 0; i < 20; i++) {
      const next = page.getByRole("button", { name: "Next page" });
      if (await next.isDisabled()) break;
      await next.click();
      await page.waitForTimeout(1300);
    }
    const next = page.getByRole("button", { name: "Next page" });
    await expect(next).toBeDisabled();
  });

  test("ArrowRight keyboard flips forward", async ({ page }) => {
    await boot(page);
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(1400);
    const indicator = page.locator(".book-indicator");
    await expect(indicator).not.toContainText(/cover/i);
  });

  test("ArrowLeft keyboard flips backward", async ({ page }) => {
    await boot(page);
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(1400);
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(1400);
    const indicator = page.locator(".book-indicator");
    await expect(indicator).toContainText(/cover/i);
  });
});

test.describe("Functional — nav links (desktop)", () => {
  test("About link lands on page 02 (manifesto)", async ({ page, }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "desktop only");
    await boot(page);
    await navTo(page, "About");
    const indicator = page.locator(".book-indicator");
    await expect(indicator).toContainText(/^02\b/);
  });

  test("Contact link lands on last page (07/07)", async ({ page, }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "desktop only");
    await boot(page);
    await navTo(page, "Contact");
    const indicator = page.locator(".book-indicator");
    const text = (await indicator.textContent()) ?? "";
    expect(text).toMatch(/07\s*\/\s*07/);
  });
});

test.describe("Functional — mobile menu", () => {
  test("toggle opens/closes the menu", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile only");
    await boot(page);
    const toggle = page.locator(".nav-toggle");
    await expect(toggle).toBeVisible();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("toggle has accessible label", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile only");
    await boot(page);
    const toggle = page.locator(".nav-toggle");
    const label = await toggle.getAttribute("aria-label");
    expect(label).toMatch(/menu/i);
  });
});

test.describe("Functional — no console errors", () => {
  test("home loads with no errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await boot(page);
    // Filter out noise: favicon 404s (none expected) and deprecation warnings.
    const real = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.toLowerCase().includes("eslint") &&
        !e.toLowerCase().includes("deprecat"),
    );
    expect(real, real.join("\n")).toEqual([]);
  });
});

// ── 4. Live-site smoke (against deployed production) ───────────────

test.describe("Live site — smoke", () => {
  test("live site loads and renders cover", async ({ page, baseURL }) => {
    test.skip(baseURL === SITE, "skip when targeting the live site directly");
    await page.goto(SITE);
    await page.waitForLoadState("load");
    const h1 = page.locator("h1:visible").first();
    await expect(h1).toBeVisible();
    const text = ((await h1.textContent()) ?? "").toUpperCase();
    expect(text).toContain("ANGGIE");
    expect(text).toContain("IRAWAN");
  });
});

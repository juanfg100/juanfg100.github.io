import { test, expect } from '@playwright/test';

test.describe('Theme Switcher', () => {
  test('default theme is "bold"', async ({ page }) => {
    await page.goto('/');
    const theme = await page.locator('html').getAttribute('data-theme');
    expect(theme).toBe('bold');
  });

  test('clicking Bold changes the theme', async ({ page }) => {
    await page.goto('/');

    await page.click('[data-set-theme="bold"]');

    const theme = await page.locator('html').getAttribute('data-theme');
    expect(theme).toBe('bold');
  });

  test('theme persists after page reload', async ({ page }) => {
    await page.goto('/');

    await page.click('[data-set-theme="bold"]');
    expect(await page.locator('html').getAttribute('data-theme')).toBe('bold');

    await page.reload();

    expect(await page.locator('html').getAttribute('data-theme')).toBe('bold');
  });

  test('query param overrides stored theme', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-set-theme="bold"]');

    await page.goto('/?theme=bold');
    expect(await page.locator('html').getAttribute('data-theme')).toBe('bold');
  });

  test('switching themes does not break layout', async ({ page }) => {
    await page.goto('/');

    const heroName = page.locator('.hero__name').first();
    await expect(heroName).toBeVisible();

    await page.click('[data-set-theme="bold"]');
    await expect(heroName).toBeVisible();

    await expect(page.locator('#main-content')).toBeVisible();
  });
});
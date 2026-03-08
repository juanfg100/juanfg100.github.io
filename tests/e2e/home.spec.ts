import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// Read profile data from YAML
const profilePath = path.resolve('src/data/profile.yaml');
const profileData = yaml.load(fs.readFileSync(profilePath, 'utf8')) as any[];
const profile = profileData[0]; // Profile is an array with one entry

test.describe('Homepage', () => {
  test('loads successfully and shows the hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(new RegExp(profile.name));

    // Hero section is visible
    const name = page.locator('h1');
    await expect(name).toContainText(profile.name);
  });

  test('shows all main sections', async ({ page }) => {
    await page.goto('/');

    // Verify key sections exist
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#experience')).toBeVisible();
    await expect(page.locator('#education')).toBeVisible();
    await expect(page.locator('#volunteering')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#posts')).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');

    // Click "Posts" in navbar
    await page.click('nav a[href="/posts"]');
    await expect(page).toHaveURL(/\/posts/);
  });
});

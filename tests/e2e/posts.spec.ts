import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// Read first post metadata from markdown frontmatter
const postsDir = path.resolve('src/data/posts');
const firstPostFile = fs
  .readdirSync(postsDir)
  .find((f) => f.endsWith('.md') || f.endsWith('.mdx'))!;
const firstPostContent = fs.readFileSync(path.join(postsDir, firstPostFile), 'utf8');
const frontMatter = yaml.load(firstPostContent.split('---')[1]);

test.describe('Posts', () => {
  test('lists all posts', async ({ page }) => {
    await page.goto('/posts');
    await expect(page).toHaveTitle(/Posts/);

    // Verify the first post title is visible
    const postTitle = page.locator('h3', { hasText: (frontMatter as any).title });
    await expect(postTitle).toBeVisible();
  });

  test('can navigate to a single post', async ({ page }) => {
    await page.goto('/posts');

    // Click the first post link by its title
    const firstPost = page.getByRole('heading', { name: (frontMatter as any).title }).first();
    await firstPost.click();

    // Should be on a post detail page with an article
    await expect(page.locator('article')).toBeVisible();
    await expect(page.locator('.prose')).toBeVisible();
  });

  test('post detail has breadcrumb navigation', async ({ page }) => {
    await page.goto('/posts');

    const firstPost = page.locator('a[href^="/posts/"]').first();
    await firstPost.click();

    // Breadcrumb should have a link back to Posts
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.locator('a[href="/posts"]')).toBeVisible();
  });
});

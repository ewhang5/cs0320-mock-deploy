import { test, expect } from '@playwright/test';

/**
 * Setting up the page before each test.
 */
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
})

/**
 * Testing that loading works with brief.
 */
test('has successfully loaded (brief)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Output: successfully loaded file: mock/src/data/csv/BasicHeaderCSV.ts')
});

/**
 * Testing that loading works with verbose.
 */
test('has successfully loaded (verbose)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: load_file mock/src/data/csv/BasicHeaderCSV.ts')
  await expect(page.getByLabel('output')).toContainText('Output: successfully loaded file: mock/src/data/csv/BasicHeaderCSV.ts')
});

/**
 * Testing that loading a nonexistent file will fail with brief.
 */
test('has failed to load file that does not exist (brief)', async ({page}) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file random file loading');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Output: failure to load file: random file loading')
});

/**
 * Testing that loading a nonexistent file will fail with verbose.
 */
test('has failed to load file that does not exist (verbose)', async ({page}) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file random random');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: load_file random random')
  await expect(page.getByLabel('output')).toContainText('Output: failure to load file: random random')
});

/**
 * Testing that loading multiple files works with brief.
 */
test('loading multiple files (brief)', async ({page}) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Output: successfully loaded file: mock/src/data/csv/BasicHeaderCSV.ts')
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Output: successfully loaded file: mock/src/data/csv/BasicNoHeaderCSV.ts')
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/EmptyCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Output: successfully loaded file: mock/src/data/csv/EmptyCSV.ts')
});

/**
 * Testing that loading multiple files works with verbose.
 */
test('loading multiple files (verbose)', async ({page}) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: load_file mock/src/data/csv/BasicHeaderCSV.ts')
  await expect(page.getByLabel('output')).toContainText('Output: successfully loaded file: mock/src/data/csv/BasicHeaderCSV.ts')
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: load_file mock/src/data/csv/BasicNoHeaderCSV.ts')
  await expect(page.getByLabel('output')).toContainText('Output: successfully loaded file: mock/src/data/csv/BasicNoHeaderCSV.ts')
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/EmptyCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: load_file mock/src/data/csv/EmptyCSV.ts')
  await expect(page.getByLabel('output')).toContainText('Output: successfully loaded file: mock/src/data/csv/EmptyCSV.ts')
});

/**
 * Testing that an invalid CSV will not load with brief.
 */
test('has failed to load a bad file with variable columns (brief)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BadCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Output: failure to load file: mock/src/data/csv/BadCSV.ts')
});

/**
 * Testing that an invalid CSV will not load with verbose.
 */
test('has failed to load a bad file with variable columns (verbose)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BadCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: load_file mock/src/data/csv/BadCSV.ts')
  await expect(page.getByLabel('output')).toContainText('Output: failure to load file: mock/src/data/csv/BadCSV.ts')
});
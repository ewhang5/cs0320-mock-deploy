import { test, expect } from '@playwright/test';

/**
 * Setting up the page before each test.
 */
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
})

/**
 * Testing that viewing without loading fails with brief.
 */
test('viewing without load gives error message (brief)', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByLabel('output')).toContainText('Output: failure to view file')
});

/**
 * Testing that viewing without loading fails with verbose.
 */
test('viewing without load gives command and error message (verbose)', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode verbose');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByLabel('output')).toContainText('Command: view')
    await expect(page.getByLabel('output')).toContainText('Output: failure to view file')
});

/**
 * Testing that viewing after loading succeeds with brief.
 */
test('successful viewing after load gives table (brief)', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[1]/td[1]')).toContainText("State")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[2]/td[2]')).toContainText("White")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[3]/td[3]')).toContainText("$770.26")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[4]/td[4]')).toContainText("2315.505646")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[5]/td[5]')).toContainText("$1.02")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[6]/td[6]')).toContainText("14%")
});

/**
 * Testing that viewing after loading succeeds with verbose.
 */
test('successful viewing after load gives command and table (verbose)', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode verbose');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[1]/td[1]')).toContainText("State")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[2]/td[2]')).toContainText("White")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[3]/td[3]')).toContainText("$770.26")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[4]/td[4]')).toContainText("2315.505646")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[5]/td[5]')).toContainText("$1.02")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[6]/td[6]')).toContainText("14%")
});

/**
 * Testing that viewing an empty CSV succeeds with brief.
 */
test('successful viewing empty csv (brief)', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file mock/src/data/csv/EmptyCSV.ts');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('table')).toBeEmpty()
});

/**
 * Testing that viewing an empty CSV succeeds with verbose.
 */
test('successful viewing empty csv (verbose)', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode verbose');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file mock/src/data/csv/EmptyCSV.ts');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByLabel('output')).toContainText('Command: load_file mock/src/data/csv/EmptyCSV.ts')
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('table')).toBeEmpty()
});

/**
 * Testing that viewing a CSV without a header succeeds with brief.
 */
test('successful viewing csv without header (brief)', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[1]/td[1]')).toContainText("0")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[2]/td[2]')).toContainText("")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[3]/td[3]')).toContainText("43.04329")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[4]/td[4]')).toContainText("0.02422")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[5]/td[5]')).toContainText("0.68697")
});

/**
 * Testing that viewing a CSV without a header succeeds with verbose.
 */
test('successful viewing csv without header (verbose)', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode verbose');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByLabel('output')).toContainText('Command: load_file mock/src/data/csv/BasicNoHeaderCSV.ts')
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[1]/td[1]')).toContainText("0")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[2]/td[2]')).toContainText("")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[3]/td[3]')).toContainText("43.04329")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[4]/td[4]')).toContainText("0.02422")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[5]/td[5]')).toContainText("0.68697")
});

/**
 * Testing that loading and viewing two different files after each other works with brief.
 */
test('integration testing load-view-load-view (brief)', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[1]/td[1]')).toContainText("0")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[2]/td[2]')).toContainText("")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[3]/td[3]')).toContainText("43.04329")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[4]/td[4]')).toContainText("0.02422")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[5]/td[5]')).toContainText("0.68697")
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table[2]/tr[1]/td[1]')).toContainText("State")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table[2]/tr[2]/td[2]')).toContainText("White")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table[2]/tr[3]/td[3]')).toContainText("$770.26")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table[2]/tr[4]/td[4]')).toContainText("2315.505646")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table[2]/tr[5]/td[5]')).toContainText("$1.02")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/table[2]/tr[6]/td[6]')).toContainText("14%")
});

/**
 * Testing that loading and viewing two different files after each other works with verbose.
 */
test('integration testing load-view-load-view (verbose)', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode verbose');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByLabel('output')).toContainText('Command: load_file mock/src/data/csv/BasicNoHeaderCSV.ts')
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[1]/td[1]')).toContainText("0")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[2]/td[2]')).toContainText("")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[3]/td[3]')).toContainText("43.04329")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[4]/td[4]')).toContainText("0.02422")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[5]/td[5]')).toContainText("0.68697")
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByLabel('output')).toContainText('Command: load_file mock/src/data/csv/BasicHeaderCSV.ts')
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[4]/div[2]/table/tr[1]/td[1]')).toContainText("State")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[4]/div[2]/table/tr[2]/td[2]')).toContainText("White")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[4]/div[2]/table/tr[3]/td[3]')).toContainText("$770.26")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[4]/div[2]/table/tr[4]/td[4]')).toContainText("2315.505646")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[4]/div[2]/table/tr[5]/td[5]')).toContainText("$1.02")
    await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[4]/div[2]/table/tr[6]/td[6]')).toContainText("14%")
});
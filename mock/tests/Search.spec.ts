import { test, expect } from '@playwright/test';

/**
 * Setting up the page before each test.
 */
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
})

/**
 * Testing that searching without loading failes with brief.
 */
test('searching without load gives error message (brief)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = Data Type value = White header = true');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Output: cannot search before loading file')
});

/**
 * Testing that searching without loading failes with verbose.
 */
test('searching without load gives command and error message (verbose)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = Data Type value = White header = true');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: search column = Data Type value = White header = true')
  await expect(page.getByLabel('output')).toContainText('Output: cannot search before loading file')
});

/**
 * Testing that searching works with header in a file with headers with brief.
 */
test('has successfully searched with header in a file with headers (brief)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = Data Type value = White header = true');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[1]')).toContainText("RI")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[2]')).toContainText("White")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[3]')).toContainText("$1,058.47")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[4]')).toContainText("395773.6521")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[5]')).toContainText("$1.00")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[6]')).toContainText("75%")
});

/**
 * Testing that searching works with header in a file with headers with verbose.
 */
test('has successfully searched with header in a file with headers (verbose)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = Data Type value = White header = true');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: search column = Data Type value = White header = true')
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[1]')).toContainText("RI")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[2]')).toContainText("White")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[3]')).toContainText("$1,058.47")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[4]')).toContainText("395773.6521")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[5]')).toContainText("$1.00")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[6]')).toContainText("75%")
});

/**
 * Testing that searching with a column index works in a file with headers with brief.
 */
test('has successfully searched column index in file with header (brief)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = 1 value = White header = true');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[1]')).toContainText("RI")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[2]')).toContainText("White")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[3]')).toContainText("$1,058.47")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[4]')).toContainText("395773.6521")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[5]')).toContainText("$1.00")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[6]')).toContainText("75%")
});

/**
 * Testing that searching with a column index works in a file with headers with verbose.
 */
test('has successfully searched column index in file with header (verbose)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = 1 value = White header = true');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: search column = 1 value = White header = true')
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[1]')).toContainText("RI")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[2]')).toContainText("White")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[3]')).toContainText("$1,058.47")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[4]')).toContainText("395773.6521")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[5]')).toContainText("$1.00")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[6]')).toContainText("75%")
});

/**
 * Testing that searching works with no column identifier in a file with headers with brief.
 */
test('has successfully searched with no column identifier in file with header (brief)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search value = White header = true');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[1]')).toContainText("RI")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[2]')).toContainText("White")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[3]')).toContainText("$1,058.47")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[4]')).toContainText("395773.6521")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[5]')).toContainText("$1.00")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[6]')).toContainText("75%")
});

/**
 * Testing that searching works with no column identifier in a file with headers with verbose.
 */
test('has successfully searched with no column identifier in file with header (verbose)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search value = White header = true');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: search value = White header = true')
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[1]')).toContainText("RI")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[2]')).toContainText("White")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[3]')).toContainText("$1,058.47")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[4]')).toContainText("395773.6521")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[5]')).toContainText("$1.00")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[6]')).toContainText("75%")
});

/**
 * Testing that searching with a column header in a file with no headers returns an empty array with brief.
 */
test('searching with column header in file with no header returns empty result (brief)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = Star value = Rigel Kentaurus A header = false');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.getByRole('table')).toBeEmpty()
});

/**
 * Testing that searching with a column header in a file with no headers returns an empty array with verbose.
 */
test('searching with column header in file with no header returns empty result (verbose)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = Star value = Rigel Kentaurus A header = false');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: search column = Star value = Rigel Kentaurus A header = false')
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.getByRole('table')).toBeEmpty()
});

/**
 * Testing that searching works with column indices in a file with no headers with brief.
 */
test('has successfully searched column index in file with no header (brief)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = 1 value = Rigel Kentaurus A header = false');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[1]/td[1]')).toContainText("71454")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[1]/td[2]')).toContainText("Rigel Kentaurus A")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[1]/td[3]')).toContainText("-0.50359")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[2]/td[1]')).toContainText("71457")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[2]/td[2]')).toContainText("Rigel Kentaurus A")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[2]/td[3]')).toContainText("-0.50362")
});

/**
 * Testing that searching works with column indices in a file with no headers with verbose.
 */
test('has successfully searched column index in file with no header (verbose)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = 1 value = Rigel Kentaurus A header = false');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: search column = 1 value = Rigel Kentaurus A header = false')
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[1]/td[1]')).toContainText("71454")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[1]/td[2]')).toContainText("Rigel Kentaurus A")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[1]/td[3]')).toContainText("-0.50359")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[2]/td[1]')).toContainText("71457")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[2]/td[2]')).toContainText("Rigel Kentaurus A")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[2]/td[3]')).toContainText("-0.50362")
});

/**
 * Testing that searching with no column identifier works with a file with no header with brief.
 */
test('has successfully searched with no column identifier in file with no header (brief)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search value = Rigel Kentaurus A header = false');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[1]/td[1]')).toContainText("71454")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[1]/td[2]')).toContainText("Rigel Kentaurus A")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[1]/td[3]')).toContainText("-0.50359")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[2]/td[1]')).toContainText("71457")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[2]/td[2]')).toContainText("Rigel Kentaurus A")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr[2]/td[3]')).toContainText("-0.50362")
});

/**
 * Testing that searching with no column identifier works with a file with no header with verbose.
 */
test('has successfully searched with no column identifier in file with no header (verbose)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search value = Rigel Kentaurus A header = false');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: search value = Rigel Kentaurus A header = false')
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[1]/td[1]')).toContainText("71454")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[1]/td[2]')).toContainText("Rigel Kentaurus A")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[1]/td[3]')).toContainText("-0.50359")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[2]/td[1]')).toContainText("71457")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[2]/td[2]')).toContainText("Rigel Kentaurus A")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr[2]/td[3]')).toContainText("-0.50362")
});

/**
 * Testing that searching an empty CSV returns an empty array with brief
 */
test('searching empty file returns empty result (brief)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/EmptyCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = blah value = blah header = false');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.getByRole('table')).toBeEmpty()
});

/**
 * Testing that searching an empty CSV returns an empty array with verbose.
 */
test('searchi column index file returns empty result (verbose)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/EmptyCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = blah value = blah header = false');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: search column = blah value = blah header = false')
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.getByRole('table')).toBeEmpty()
});

/**
 * Testing that loading and searching two files after each other works with brief.
 */
test('has successfully load-search-load-search (brief)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = Data Type value = White header = true');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[1]')).toContainText("RI")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[2]')).toContainText("White")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[3]')).toContainText("$1,058.47")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[4]')).toContainText("395773.6521")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[5]')).toContainText("$1.00")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table/tr/td[6]')).toContainText("75%")
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = 1 value = Rigel Kentaurus A header = false');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table[2]/tr[1]/td[1]')).toContainText("71454")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table[2]/tr[1]/td[2]')).toContainText("Rigel Kentaurus A")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table[2]/tr[1]/td[3]')).toContainText("-0.50359")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table[2]/tr[2]/td[1]')).toContainText("71457")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table[2]/tr[2]/td[2]')).toContainText("Rigel Kentaurus A")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/table[2]/tr[2]/td[3]')).toContainText("-0.50362")
});

/**
 * Testing that loading and searching two files after each other works with verbose.
 */
test('has successfully load-search-load-search (verbose)', async ({ page }) => {
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = Data Type value = White header = true');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: search column = Data Type value = White header = true')
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[1]')).toContainText("RI")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[2]')).toContainText("White")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[3]')).toContainText("$1,058.47")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[4]')).toContainText("395773.6521")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[5]')).toContainText("$1.00")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[2]/div[2]/table/tr/td[6]')).toContainText("75%")
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file mock/src/data/csv/BasicNoHeaderCSV.ts');
  await page.getByRole('button', {name: "Submit"}).click()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search column = 1 value = Rigel Kentaurus A header = false');
  await page.getByRole('button', {name: "Submit"}).click()
  await expect(page.getByLabel('output')).toContainText('Command: search column = 1 value = Rigel Kentaurus A header = false')
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[4]/div[2]/table/tr[1]/td[1]')).toContainText("71454")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[4]/div[2]/table/tr[1]/td[2]')).toContainText("Rigel Kentaurus A")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[4]/div[2]/table/tr[1]/td[3]')).toContainText("-0.50359")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[4]/div[2]/table/tr[2]/td[1]')).toContainText("71457")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[4]/div[2]/table/tr[2]/td[2]')).toContainText("Rigel Kentaurus A")
  await expect(page.locator('//*[@id="root"]/div/div/div[1]/div[4]/div[2]/table/tr[2]/td[3]')).toContainText("-0.50362")
});
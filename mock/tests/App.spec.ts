import { test, expect } from '@playwright/test';

/**
 * Setting up the page before each test.
 */
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
})

/**
 * Testing that the page has an input bar.
 */
test('on page load, i see an input bar', async ({ page }) => {
    await expect(page.getByLabel('Command input')).toBeVisible()
})

/**
 * Testing that typing in the box changes the text.
 */
test('after I type into the input box, its text changes', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('Awesome command');
    const mock_input = `Awesome command`
    await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
});

/**
 * Testing there is a button on the page.
 */
test('on page load, i see a button', async ({ page }) => {
    await expect(page.getByRole('button')).toBeVisible()
});

/**
 * Testing there is a header on the page.
 */
test('on page load, i see a header', async ({ page }) => {
    await expect(page.getByRole('heading')).toBeVisible()
});

/**
 * Testing that there is an ouput area on the page.
 */
test('on page load, i see the output area', async ({ page }) => {
    await expect(page.getByLabel('output')).toBeVisible()
});

/**
 * Testing that switching to brief mode is successful.
 */
test('mode brief', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode verbose');
    await page.getByRole('button', {name: "Submit"}).click()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode brief');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByLabel('output')).toContainText('mode set to brief')
});

/**
 * Testing that switching to verbose mode is successful.
 */
test('mode verbose', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode verbose');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByLabel('output')).toContainText('mode set to verbose')
});

/**
 * Testing that entering an invalid command will return unknown command.
 */
test('invalid command', async ({ page }) => {
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('aikfdhasdjhf');
    await page.getByRole('button', {name: "Submit"}).click()
    await expect(page.getByLabel('output')).toContainText('unknown command')
});
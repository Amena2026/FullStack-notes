const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {
    beforeEach(async ({page}) => {
        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({page}) => {
        const locator = page.getByText('log in')
        await expect(locator).toBeVisible()
        await expect(page.getByText('log in'))
    }) 


    test('user can log in', async ({ page }) => {
    

        await page.getByRole('button', {name: 'log in'}).click()
        await page.getByLabel('username').fill('root')
        await page.getByLabel('password').fill('password')

        await page.getByRole('button', {name: 'login'}).click()
    
        await expect(page.getByText('Superuser logged in')).toBeVisible()
    })

    test('login fails with wrong password', async ({page}) => {

        await page.getByRole('button', {name: 'log in'}).click()
        await page.getByLabel('username').fill('root')
        await page.getByLabel('password').fill('wrong password')

        await page.getByRole('button', {name: 'login'}).click()
    
        await expect(page.getByText('Login')).toBeVisible()
        
    })


    describe('when logged in', () => {
        beforeEach(async ({page}) => {
            await page.getByRole('button', {name: 'log in'}).click()
            await page.getByLabel('username').fill('root')
            await page.getByLabel('password').fill('password')

            await page.getByRole('button', {name: 'login'}).click()
        })

        test('a new note can be created', async ({page}) => {
            await page.getByRole('button', {name: 'new note'}).click()
            await page.getByLabel('new note').fill('notes can be created through playwright testing')
            await page.getByRole('button', {name: 'save'}).click()
            await expect(page.getByText('notes can be created through playwrite testing')).toBeVisible()

        })

        test('a note can be deleted', async ({page}) => {
            const note = page.locator('li.note').filter({ hasText: 'notes can be created through playwrite testing'})
            await note.getByRole('button', { name: 'delete' }).click()

            await expect(page.getByText('notes can be created through playwrite testing')).not.toBeVisible()
        })
    })
})
import { test, expect, Page } from '@playwright/test';
import { addScan, chooseApplication, login, uploadFile, allApplications } from './utils';


test.use({
    locale: 'pt-br',
    headless: true
});

test.beforeEach(async ({ page }) => {

});

test.afterEach(async ({ page }) => {
    await 
    await page.reload()
});

async function clickElement(page, selector: string) {
    await page.waitForSelector(selector, { state: 'visible' });
    await page.locator(selector).click();
};

test('SAST', async ({ page }) => {

    await test.step('Login', async() => {
        await login(page);
    });
    
    await test.step('Abrir menu de aplicações', async () => {
        await allApplications(page)
    });

    await test.step('Escolha a aplicação', async() => {
        await chooseApplication(page)
    });

    await test.step('Adicionando SCAN', async() => {
        await addScan(page);
    });

    await test.step('Preencher informações do SCAN', async () => {
        const scanTypeInput = page.locator('xpath=/html/body/div[1]/div[1]/div[8]/div[2]/div[2]/div/div[2]/form/div/div/div[2]/div[1]/div[1]/div/input');
        await scanTypeInput.click();

        const scanNameInput = page.locator('xpath=/html/body/div[1]/div[1]/div[8]/div[2]/div[2]/div/div[2]/form/div/div/div[2]/div[2]/div/label/div/input');
        await scanNameInput.click();
        await scanNameInput.fill("");
    });

    await test.step('Upload do arquivo do SCAN', async () => {
        await uploadFile(page, '');
    });
    
});


test('SCA', async ({ page }) => {
    await test.step('Login', async() => {
        await login(page);
    })

    await test.step('Abrir menu de aplicações', async () => {
        await allApplications(page)
    });

    await test.step('Escolha a aplicação', async() => {
        await chooseApplication(page)
    });

    await test.step('Adicionando SCAN', async() => {
        await addScan(page);
    });

    await test.step('Preencher informações do SCAN', async () => {
        const scanTypeInput = page.locator('xpath=/html/body/div[1]/div[1]/div[8]/div[2]/div[2]/div/div[2]/form/div/div/div[2]/div[1]/div[2]/div/input');
        await scanTypeInput.click();

        const scanNameInput = page.locator('xpath=/html/body/div[1]/div[1]/div[8]/div[2]/div[2]/div/div[2]/form/div/div/div[2]/div[2]/div/label/div/input');
        await scanNameInput.click();
        await scanNameInput.fill('');

    });

    await test.step('Upload do arquivo', async () => {
        await page.waitForURL('https://shield.xguardianplatform.io/dashboard')
        await uploadFile(page, '');


    })
    


    
    
});


test('Container', async ({ page }) => {
    await test.step('Login', async() => {
        await login(page);
    })
    
    await test.step('Abrir menu de aplicações', async () => {
        await allApplications(page)
    });

    await test.step('Escolha a aplicação', async() => {
        await chooseApplication(page)
    });

    await test.step('Adicionando SCAN', async() => {
        await addScan(page);
    });

    await test.step('Preencher informações do SCAN', async () => {
        const scanTypeInput = page.locator('//*[@id="root"]/div[1]/div[8]/div[2]/div[2]/div/div[2]/form/div/div/div[2]/div[1]/div[6]/div/input');
        await scanTypeInput.click();

        const scanNameInput = page.locator('xpath=/html/body/div[1]/div[1]/div[8]/div[2]/div[2]/div/div[2]/form/div/div/div[2]/div[2]/div/label/div/input');
        await scanNameInput.click();
        await scanNameInput.fill("");
    });

    await test.step('Upload do arquivo do SCAN', async () => {
        await uploadFile(page, '');
    });


    await test.step('Realizando o upload do arquivo', async() => {
        test.setTimeout(120000);
        await page.waitForTimeout(95000)
    });

    
    
});

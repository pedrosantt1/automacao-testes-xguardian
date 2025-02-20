import { test, expect, Page } from '@playwright/test';
import { allApplications, login, createApplications1, generateUniqueName, createTeam } from './utils';

test.use({
    locale: 'pt-BR',
    headless: true
});

async function clickElement(page: Page, selector: string): Promise<void> {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible' });
    await element.click();
};

test.beforeEach(async ({ page }) => {});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('Criação de aplicação', async ({ page }) => {
    const appUniqueName = generateUniqueName();

    await test.step('Login', async () => {
        await login(page);
    });

    await test.step('Abrir menu de aplicações', async () => {
        await allApplications(page);
    });

    await test.step('Criando aplicação', async () => {
        const { nameApplicationInput, describeApplication, selectTeam, selectedLanguage } = await createApplications1(page);
        const addApplication = page.locator('xpath=//button[normalize-space()="Adicionar Aplicação"]')
        await addApplication.click()

        await nameApplicationInput.fill(appUniqueName);
        await describeApplication.fill('');
        await selectTeam.selectOption({ value: '' });
        await selectedLanguage.selectOption({ value: '' });

        const createButton = await page.locator('//button[@type="submit"]');
        if (createButton) {
            await createButton.scrollIntoViewIfNeeded();
            await createButton.click();
        }
    });
});

test('Login', async({ page }) => {
await page.goto('https://shield.xguardianplatform.io/');

    await test.step('Inserindo e-mail', async() => {
        await page.waitForSelector('xpath=//input[@name="email"]');
        const emailInput = page.locator('xpath=//input[@name="email"]');
        await emailInput.type('');        
    })

    await test.step('Iserindo a senha', async() => {
        const passwordlInput = page.locator('xpath=//input[@name="password"]');
        await passwordlInput.type('');

    })

    await test.step('Clicando no botão de login', async() => {
        const loginButton = page.locator('xpath=//button[@type="submit"]');
        await loginButton.click();
    })

    await test.step('Validação de login com sucesso', async() => {
        await page.waitForURL('https://shield.xguardianplatform.io/dashboard')
        await page.waitForLoadState('networkidle');

        
        
        
    });
    
})

test('Reset de senha', async({ page }) => {
    await page.goto('https://shield.xguardianplatform.io/esqueci-minha-senha');
    
    
    await test.step('Inserindo e-mail', async () => {
        const inputEmail = page.locator('xpath=//input[@name="email"]');
        await inputEmail.type(''); // 
    });

    
    await test.step('Clicando no botão de envio e validação via API', async () => {
        const sendCode = page.locator('xpath=//button[@type="submit"]');
        await sendCode.click();

        
        await page.route('**/forgot_password_code', async (route) => {
            const response = await route.fetch();
            const json = await response.json();

            
            expect(response.status()).toBe(200);
            expect(json.success).toBeTruthy();

            await route.continue();
        });

        await page.waitForResponse('**/forgot_password_code');
    });
});

test('Criação de equipe', async({ page }) => {

    
    await test.step('Login na plataforma', async () => {
    await login(page);


    })

    await test.step('Navegando até as equipes', async() => {
        const allTeams = page.locator('xpath=//*[@id="root"]/div[1]/aside/nav/div[3]')
        await allTeams.click()
    })

    await test.step('Clicando no botão de criar equipe', async() => {
        const createTeam = page.locator('xpath=//button[normalize-space()="Criar equipe"]')
        await createTeam.click()
        
    })

    await test.step('Preenchendo informações da equipe', async() => {
        const { nameTeam, participants, applications } = await createTeam(page);
        await nameTeam.fill('Equipe criada por automação');
        await participants.selectOption({ value: '39' });
        await applications.selectOption({ value: '167' })

    })

    await test.step('Criando equipe', async() => {
        const createdTeam = page.locator('xpath=//button[@type="submit"]')
        await createdTeam.click()
        await page.waitForTimeout(3000)
    })
})

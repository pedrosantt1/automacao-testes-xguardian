import { Page, expect } from '@playwright/test';
async function clickElement(page, selector: string) {
    await page.waitForSelector(selector, { state: 'visible' });
    await page.locator(selector).click();
}


export async function login(page: Page){
        await page.goto('https://shield.xguardianplatform.io/');
        const currentUrl = page.url();
        expect(currentUrl).toBe('https://shield.xguardianplatform.io/');
        const emailInput = page.locator('xpath=//input[@name="email"]');
        await emailInput.type('');

        const passwordlInput = page.locator('xpath=//input[@name="password"]');
        await passwordlInput.type('');

        const loginButton = page.locator('xpath=//button[@type="submit"]');
        await loginButton.click();

    };



export async function chooseApplication(page: Page){
            await page.waitForSelector('img.flex', { state: 'visible'});
            const allApp = page.locator('xpath=/html/body/div[1]/div[1]/aside/nav/div[4]');
            await allApp.click()

            const selectAoo = page.locator("xpath=//td[normalize-space()='AutomacaoScan2']");

            await selectAoo.click()

};



export async function addScan(page:Page) { 
        const scans = page.locator('xpath=/html/body/div[1]/div[1]/div[8]/div[2]/div[2]/div/div[1]/div[2]/div[2]')
        await scans.click()
        await page.waitForSelector('xpath=//button[normalize-space()="Adicionar Scan"]', { state: 'visible'})
        const scanAdd = page.locator('xpath=//button[normalize-space()="Adicionar Scan"]')
        await scanAdd.click()
        await page.waitForSelector('xpath=/html/body/div[1]/div[1]/div[8]/div[2]/div[2]/div/div[2]/form/div/div/div[2]/div[1]/div[1]/div/input', { state: 'visible'})
    
};


export async function uploadFile(page: Page, filePath: string) {
    page.on('filechooser', async (filechooser) => {
        await filechooser.setFiles(filePath);
    });

    await page.click('xpath=/html/body/div[1]/div[1]/div[8]/div[2]/div[2]/div/div[2]/form/div/div/div[2]/div[3]/div/div');

    const elemento = await page.$('xpath=/html/body/div[1]/div[1]/div[8]/div[2]/div[2]/div/div[2]/form/div/div/div[3]/button[2]');

    if (elemento) {
        await elemento.scrollIntoViewIfNeeded();
        await elemento.click();
    }

};


export async function allApplications(page: Page){
    await clickElement(page, 'img.flex'); 
    await clickElement(page, 'xpath=/html/body/div[1]/div[1]/aside/nav/div[4]');
};

export async function createApplications1(page: Page){
    
    const nameApplicationInput = page.locator('xpath=//input[@name="app_name"]');
    
    const describeApplication = page.locator('xpath=//input[@name="description"]');
    const selectTeam = page.locator('xpath=//select[@name="team_id"]');
    const selectedLanguage = page.locator('xpath=//select[@name="languages"]');

    return  { nameApplicationInput, describeApplication, selectTeam, selectedLanguage  } 


};


export async function createTeam(page: Page){

    const nameTeam = page.locator('xpath=//input[@name="name"]');
    const participants = page.locator('//select[@name="users"]');
    const applications = page.locator('//select[@name="apps"]');

    return { nameTeam, participants, applications }
};

/*
interface applicationSelectors {
    elementXpath: string
    nameApplicationInput: string;
    describeApplication: string;
    selectTeam: string;
    selectedLanguage: string


}

export async function createApplcation2(page: Page, selectors: applicationSelectors) {
    await clickElement(page, selectors.elementXpath)
}*/



export function generateUniqueName(): string{
    const today = new Date()
    const hours = String(today.getHours()).padStart(2,'0');
    const minutes = String(today.getMinutes()).padStart(2,'0')


    return `Aplicacao criada por automacao as ${hours}h e ${minutes}min`
}



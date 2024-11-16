const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

async function captureTable() {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport({ width: 600, height: 450 });
    
    // Navigate to page
    await page.goto('https://thebossmagnus.github.io/thunder/supported_version.html');
    
    // Wait for table to load
    await page.waitForSelector('.table-style');
    
    // Set dark background
    await page.evaluate(() => {
        document.getElementById('table-container').style.backgroundColor = '#26292f';
    });
    
    // Capture table
    const element = await page.$('#table-container');
    const boundingBox = await element.boundingBox();
    const newWidth = boundingBox.width / 3;

    await element.screenshot({
        path: path.join(__dirname, '../../assets/table.png'),
        omitBackground: false,
        clip: {
            x: boundingBox.x,
            y: boundingBox.y,
            width: newWidth,
            height: boundingBox.height
        }
    });

    await browser.close();
}

captureTable().catch(console.error);
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('https://www.aichpoem.com/#/shisanbai/poem', {
    waitUntil: 'networkidle',
  });
  await page.click('//*[@id="app"]/div/div/div[1]/div/div[2]/div');
  await page.click('//*[@id="app"]/div/div/div[2]/div/div[3]/div');
  await page.fill('//*[@id="app"]/div/div/div[4]/div/input', '思想是力量之源');
  await page.waitForTimeout(1000);
  await page.click('//*[@id="app"]/div/div/div[2]/div/div[4]/div');
  const answer = await page.$('#app > div > div > div.answer > p');
  await page.waitForTimeout(1000);

  // console.log(answer);
  const repos = await answer.evaluate(() => {
    const poem = document.querySelector('#app > div > div > div.answer > p')
      .textContent;
    return poem;
  });
  console.log(repos);

  ('第一次提交');
  ('第三提交');
  // page.on('pageerror', console.log);
  // await browser.close();
})();

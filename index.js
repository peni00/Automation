const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  const website_url = 'https://peni00.github.io/Automation/customer_data.html';
  
  await page.goto(website_url, { waitUntil: 'networkidle0' });

  try {
    await page.click('button[type="submit"]');
    let nameError = await page.evaluate(() => document.querySelector('#name:invalid') !== null);
    if (!nameError) await page.screenshot({ path: 'name_empty_failed.png' });
    console.log('Test Case 1.1 (Invalid Name - Empty):', nameError ? 'Passed' : 'Failed');
    
    await page.type('#name', 'a'.repeat(101));
    let nameValue = await page.evaluate(() => document.querySelector('#name').value.length);
    if (nameValue <= 100) await page.screenshot({ path: 'name_exceeds_max_length_failed.png' });
    console.log('Test Case 1.2 (Invalid Name - Exceeds Max Length):', nameValue <= 100 ? 'Failed' : 'Passed');

    await page.evaluate(() => document.querySelector('#name').value = '');
    await page.type('#name', 'Ruben Sandique');
    console.log('Test Case 1.3 (Valid Name): Passed');

    const photoInput = await page.$('#photo');
    await photoInput.uploadFile('D:/Downloads/CV.pdf');
    console.log('Test Case 2.1 (Invalid Photo): Passed if unsupported file rejected');

    await photoInput.uploadFile('D:/Downloads/net.png');
    console.log('Test Case 2.2 (Valid Photo): Passed if supported file accepted');

    await page.type('#description', 'a'.repeat(10001));
    let descriptionValue = await page.evaluate(() => document.querySelector('#description').value.length);
    if (descriptionValue <= 10000) await page.screenshot({ path: 'description_exceeds_max_length_failed.png' });
    console.log('Test Case 3.1 (Invalid Description - Exceeds Max Length):', descriptionValue <= 10000 ? 'Failed' : 'Passed');

    await page.evaluate(() => document.querySelector('#description').value = '');
    await page.type('#description', 'Testing Description.');
    console.log('Test Case 3.2 (Valid Description): Passed');

    await page.click('button[type="submit"]');
    let businessTypeError = await page.evaluate(() => document.querySelector('#business_type:invalid') !== null);
    if (!businessTypeError) await page.screenshot({ path: 'business_type_not_selected_failed.png' });
    console.log('Test Case 4.1 (Invalid Business Type - Not Selected):', businessTypeError ? 'Passed' : 'Failed');

    await page.select('#business_type', 'IT Services');
    console.log('Test Case 4.2 (Valid Business Type): Passed');

    await page.type('#contact_person_name', 'a'.repeat(101));
    let contactNameValue = await page.evaluate(() => document.querySelector('#contact_person_name').value.length);
    if (contactNameValue <= 100) await page.screenshot({ path: 'contact_person_name_exceeds_max_length_failed.png' });
    console.log('Test Case 5.1 (Invalid Contact Person Name - Exceeds Max Length):', contactNameValue <= 100 ? 'Failed' : 'Passed');

    await page.evaluate(() => document.querySelector('#contact_person_name').value = '');
    await page.type('#contact_person_name', 'Naruto Uzumaki');
    console.log('Test Case 5.2 (Valid Contact Person Name): Passed');

    await page.type('#contact_person_phone', '1'.repeat(16));
    let contactPhoneValue = await page.evaluate(() => document.querySelector('#contact_person_phone').value.length);
    if (contactPhoneValue <= 15) await page.screenshot({ path: 'contact_person_phone_exceeds_max_length_failed.png' });
    console.log('Test Case 6.1 (Invalid Contact Person Phone - Exceeds Max Length):', contactPhoneValue <= 15 ? 'Failed' : 'Passed');

    await page.evaluate(() => document.querySelector('#contact_person_phone').value = '');
    await page.type('#contact_person_phone', '09457415600');
    console.log('Test Case 6.2 (Valid Contact Person Phone): Passed');

    await page.click('button[type="submit"]');
    await page.screenshot({ path: 'valid_submission_screenshot.png' });

  } catch (err) {
    console.error('Test execution failed:', err);
  }

  await browser.close();
})();

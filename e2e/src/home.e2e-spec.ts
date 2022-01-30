import { browser, by, element, logging } from 'protractor';

describe('Splyza Teams Challenge - Home', function () {
  var button = element(by.id('invite'));

  beforeEach(function () {
    browser.get(browser.baseUrl);
    browser.waitForAngular();
  });

  it('click invite', async () => {
    button.click();
    browser.waitForAngularEnabled(true);
    expect(await browser.getCurrentUrl()).toEqual(
      browser.baseUrl + 'invitation'
    );
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});

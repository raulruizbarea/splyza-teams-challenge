import { $, browser, by, element, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Splyza Teams Challenge - Invitation', function () {
  var ec = protractor.ExpectedConditions;

  var dialog = element(by.id('dialog'));
  var role = element(by.id('role'));
  var link = element(by.id('invitation'));
  var copy = element(by.id('copy'));
  var send = element(by.id('send-email'));
  var error = element(by.id('error'));
  var email = element(by.id('email'));
  var cancel = element(by.id('cancel'));
  var ok = element(by.id('ok'));

  beforeEach(function () {
    browser.get(browser.baseUrl + 'invitation');
    browser.waitForAngular();
  });

  it('check form', async () => {
    browser.waitForAngularEnabled(true);
    browser.isElementPresent(error).then(function (result) {
      if (result) {
        expect(role).toBeNull;
        expect(link).toBeNull;
        expect(copy).toBeNull;
        expect(send).toBeNull;
      } else {
        expect(role).not.toBeNull;
        expect(link).not.toBeNull;
        expect(copy).not.toBeNull;
        expect(send).not.toBeNull;
      }
    });
  });

  it('copy link', async () => {
    browser.waitForAngularEnabled(true);
    browser.isElementPresent(error).then(function (result) {
      if (!result) {
        copy.click();
      }
    });
  });

  it('send email, fulfill email and open default email app', async () => {
    browser.waitForAngularEnabled(true);
    browser.isElementPresent(error).then(function (result) {
      if (!result) {
        send.click();
        browser.wait(ec.presenceOf(dialog), 8000);
        email.sendKeys('info@splyza.com');
        browser.sleep(2000);
        ok.click();
        browser.sleep(2000);
      }
    });
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

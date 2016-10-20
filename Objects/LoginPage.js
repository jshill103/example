'use strict';
var config = require("./config.json")[process.env.NODE_ENV];
/**
 * Page object for non-Angular login page.
 * @constructor
 */
var LoginPage = function() {

    this.goToUrl = browser.driver.get('https://' + config.environment + '.gogrow.com/login');
    this.email = browser.driver.findElement(By.name('email'));
    this.password = browser.driver.findElement(By.name('password'));
    this.submitButton = browser.driver.findElement(By.xpath('//button[@type="submit"]'));

    this.login = function(email, password) {
        this.goToUrl;
        this.email.sendKeys(email);
        this.password.sendKeys(password);
        this.submitButton.click();
    };

};

module.exports = LoginPage;
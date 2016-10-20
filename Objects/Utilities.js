'use strict';
/**
 * Utilities Object.
 * @constructor
 */
var Utilities = function() {

    this.waitForPageLoad = function(page) {
        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                //Make sure it is on the dashboard page
                var pattern = new RegExp(page);
                return pattern.test(url);
            });
            //Give it 5 seconds
        }, 5000);
    };

    //Utility function for react changes
    this.clickButton = function(button) {
        var EC = protractor.ExpectedConditions;
        var isClickable = EC.elementToBeClickable(button);
        browser.driver.wait(isClickable, 5000);
        return button.click();
    }


    //Utility function for react changes
    this.mouseHover = function(element) {
        return browser.actions().mouseMove(element).perform();
    }

    this.hasClass = function(element, cls) {
        return element.getAttribute('class').then(function(classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };

    this.getBackgroundColorHex = function(element) {

        return element.getCssValue('background-color').then(function(rgb) {
            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgb && rgb.length === 4) ? "#" +
                ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';

        });
    }


    this.deleteAll = function(done, dashboardsPage) {
        var self = this;
        element.all(by.css('.dbname')).then(function(elements) {
            if (elements.length == 1) {
                done();
            } else {
                elements[1].click().then(function() {
                    dashboardsPage.deleteDashboardButton.click().then(function() {
                        dashboardsPage.confirmDeleteButton.click().then(function() {
                            self.deleteAll(done, dashboardsPage);
                        });
                    });
                });
            }
        });
    }

    this.spanByText = function(text) {
        return element(by.xpath('//span[text()="' + text + '"]'));
    }
    this.spanByTextByPosition = function(text, position) {
        return element.all(by.xpath('//span[text()="' + text + '"]')).get(position);
    }
    this.spanByTextCount = function(text) {
        return element.all(by.xpath('//span[text()="' + text + '"]')).count();
    }

    /**
     *[selectWindow Focus the browser to the index window.
     * @param  {[Object]} index [Is the index of the window. E.g., 0=browser, 1=popup]
     * @return {[!webdriver.promise.Promise.<void>]}
     */
    this.selectWindow = function(index) {
        // wait for handles[index] to exist
        browser.wait(function() {
            return browser.getAllWindowHandles().then(function(handles) {
                /**
                 * Assume that handles.length >= 1 and index >=0.
                 * So when calling selectWindow(index) return
                 * true if handles contains that window.
                 */
                if (handles.length > index) {
                    return true;
                }
            });
        }, 30000);
        // here i know that the requested window exists

        // switch to the window
        return browser.getAllWindowHandles().then(function(handles) {
            return browser.switchTo().window(handles[index]);
        });
    };

    this.enter = browser.actions().sendKeys(protractor.Key.ENTER);
};

module.exports = Utilities;
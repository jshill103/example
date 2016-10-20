'use strict';
/**
 * Page object for Protractor Current Dashboard page.
 * @constructor
 */
var CurrentDashboardPage = function() {
    //React selectors
    this.dashboardActionsButton = $('[class^="dashboardControls---dashboardActions"]');
    this.addLabelButton = $('[class^="controls---textbarSeparator"]');
    this.label = $('[class^="textbarSeparator---textbar"]');
    this.removeLabelButton = $('[class^="textbarSeparator---delete"]');
    this.fullScreenModeButton = $('[class^="dashboardControls---presentationMode"]');
    this.exitFullscreenButton = $('[class^="fullScreenControls---toggleFullScreen"]');
    this.dayNightButton = $(`[class^="fullScreenControls---toggleTheme"]`);
    this.isFullscreen = $(`[class="fullScreen"]`);
    this.dashboardSettingsButton = $('[class^="dashboardControls---dashboardSettings"]');

    //Angular selectors
    this.addMetricButton = element(by.buttonText("Add Metric"));
    this.generatePdfButton = $('.icon-pdf');
    
    this.darkThemeElement = $('.dark');
    this.addUserIcon = $('.icon-add-user');
    this.dashboardTabTitle = $('[ng-click="$mdTabsCtrl.select(tab.getIndex())"]');
    this.dashboardTitle = $('#dashboard-title');


    this.getLabelCount = function() {
        return element.all(by.css('[class^="textbarSeparator---textbar"]')).count();
    }

    this.getDashboardName = function() {
        return $('[class^="currentDashboardName---dashboard"]]').getText();
    }

    this.getButtonCount = function() {
        return element.all(by.css('.modification-controls.hide-sm li:not(.ng-hide)')).count();
    }

    this.isPlusButtonHidden = function() {
        return element.all(by.css(`[ng-click="site.addDashboard($event); growTrack('dashboard', 'createDashboard', 'plus-sign-by-tabs')"].ng-hide`)).count().then(function(count) {
            if (count === 1) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    this.isErrorDisplayed = function() {
        return element.all(by.css('.icon-warning-softred')).isDisplayed().then(function(array) {
            var returnValue = 0;
            array.forEach(function(value) {
                if (value === true) {
                    returnValue = 1;
                }
            });
            return returnValue;
        });
    }

    this.isAddUserButtonHidden = function() {
        return $("#add-user-from-dashboard").getAttribute('aria-hidden');
    }

};

module.exports = CurrentDashboardPage;
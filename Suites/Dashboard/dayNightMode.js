// Test: Day/Night mode on a dashboard
// Dependencies: Any user, A dashboard
// Acceptance: 
//      1. Full screen defaults to Night mode
//      2. page-theme value === dark
//      3. Mouse click on toggle theme switches to day mode
//      4. page-theme value === light
//      5. Mouse click on 'close fullscreen' button takes us back to dashboard view
//      6. page-theme should no longer exist as no dashboard view themes are supported
//
// What does this test: Tests functionality of day/night mode is properly working.
// What does this not test: This does not test proper css of each chart type in each mode.

var LoginPage = require('../../Objects/LoginPage.js');
var Utilities = require('../../Objects/Utilities.js');
var CurrentDashboardPage = require('../../Objects/CurrentDashboardPage.js');
var StyleGuide = require('../../Objects/StyleGuide.js');
var Metric = require('../../Objects/Metric.js');

describe('Day/Night mode', function() {

    var loginPage = new LoginPage();
    var current = new CurrentDashboardPage();
    var utilities = new Utilities();
    var style = new StyleGuide();
    var metric = new Metric();

    it('Login', function() {
        //Login
        loginPage.login('test', 'test');
        //BLOCKED: span element containing name needs a unique identifier
        //make sure correct user is logged in
        // utilities.spanByText('grow automation1').then(function(text){
        //     expect(text === 'grow automation1').toBe(true);
        // });
    });

    it('Fullscreen Dashboard', function() {
        expect(current.fullScreenModeButton.isPresent()).toBe(true);
        utilities.clickButton(current.fullScreenModeButton);
        // This tells us we are in fullscreen mode
        expect(current.exitFullscreenButton.isPresent()).toBe(true);
    });

    it('Night Mode', function() {
        //Start testing style guide inside tests
        utilities.getBackgroundColorHex($('html')).then(function(value) {
            expect(value === style.nightModeBackground).toBe(true);
        });
        //Metric Tile background in night mode
        utilities.getBackgroundColorHex(metric.metricTile).then(function(value) {
            expect(value === style.nightModeTileBackground).toBe(true);
        });
        //Metric Tile Header background in night mode
        utilities.getBackgroundColorHex(metric.metricTileHeader).then(function(value) {
            expect(value === style.nightModeTileHeaderBackground).toBe(true);
        });
        expect(current.darkThemeElement.isPresent()).toBe(true);
    });

    it('Day Mode', function() {
        utilities.clickButton(current.dayNightButton);
        //Start testing style guide inside tests
        utilities.getBackgroundColorHex($('html')).then(function(value) {
            expect(value === style.dayModeBackground).toBe(true);
        });
        //Metric Tile background in night mode
        utilities.getBackgroundColorHex(metric.metricTile).then(function(value) {
            expect(value === style.dayModeTileBackground).toBe(true);
        });
        //Metric Tile Header background in night mode
        utilities.getBackgroundColorHex(metric.metricTileHeader).then(function(value) {
            expect(value === style.dayModeTileHeaderBackground).toBe(true);
        });
        expect(current.darkThemeElement.isPresent()).toBe(false);

    });

    it('Exit Fullscreen Mode', function() {
        utilities.clickButton(current.dayNightButton);
        utilities.clickButton(current.exitFullscreenButton);
        expect(current.isFullscreen.isPresent()).toBe(false);

    });
});
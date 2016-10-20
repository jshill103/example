var Reporter = require('jasmine-reporters');

var reporter = new Reporter.JUnitXmlReporter({
    consolidateAll: false,
    savePath: './results',
    filePrefix: 'TEST-'
});

exports.config = {
    //Headless
    seleniumAddress: 'http://localhost:24444/wd/hub',
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 1
    },
    exclude:[
        'Suites/Manage_users/addDeleteUserFromAccountSettings.js',
        'Suites/Metric/metricDescription.js',
        'Suites/CloneDashboardSuite.js',
        'Suites/dataConnections.js',
        'Suites/SalesDemo.js',
        //Delete not working
        'Suites/Dashboard/duplicateDashboardViaAccountSettings.js'
    ],
    suites: {
        // pageLoad: 'Suites/pageLoad.js',
        // clone: 'Suites/CloneDashboardSuite.js',
        // sales: 'Suites/SalesDemo.js',
        //permissions: 'Suites/Permissions/*.js',
        //dashboard: 'Suites/Dashboard/*.js',
            dayNightMode: 'Suites/Dashboard/dayNightMode.js',
            addRemoveLabel: 'Suites/Dashboard/addRemoveLabel.js',
            generateRemoveShareUrl: 'Suites/Dashboard/generateRemoveShareUrl.js',
            //duplicateDashboardViaAccountSettings: 'Suites/Dashboard/duplicateDashboardViaAccountSettings.js',
        //manageUsers: 'Suites/Manage_users/*.js',     
            //addUserToDashboard: 'Suites/Manage_users/addUserToDashboard.js',
            //BLOCKED: addDeleteUserFromAccountSettings: 'Suites/Manage_users/addDeleteUserFromAccountSettings.js',
        //Metric: 'Suites/Metric/*.js',  
            expandMetric: 'Suites/Metric/expandMetric.js',
            //metricHistory: 'Suites/Metric/metricHistory.js',
            //BLOCKED BY ME: metricDescription: 'Suites/Metric/metricDescription.js',

    },

    // Assign the test reporter to each running instance
    onPrepare: function() {
        browser.ignoreSynchronization = true;
        jasmine.getEnv().addReporter(reporter);
    },
}
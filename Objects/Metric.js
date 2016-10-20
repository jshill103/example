'use strict'
/**
 * Protractor Object for Account Details Page Object.
 * @constructor
 */
var Metric = function() {

    this.metricTile = $('[class^="metricTile---tile"]');
    this.metricTileHeader = $('[class^="metricTitle---container"]');
   
};

module.exports = Metric;
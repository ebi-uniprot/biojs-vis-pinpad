/*jslint node: true */
/*jshint laxbreak: true */
"use strict";
/*
 * biojs-vis-pinpad
 * https://github.com/ebi-uniprot/biojs-vis-pinpad
 *
 * Copyright (c) 2014 ebi-uniprot
 * Licensed under the Apache 2 license.
 */

/**
@class Pinpad
 */
var d3 = require('d3');
var _ = require('underscore');
var CategoryFactory = require('./CategoryFactory');

/**
 * Private Methods
 */
var defaultOpts = {
    width: '250px',
    height: '500px'
};
var init = function(options) {
    var pinpadContainer = d3.select(options.el)
      .text('')
      .append('div')
      .classed('up_pp_main-container', true)
      .style('width', options.width);

    pinpadContainer.append('div').classed('up_pp_mainTitle', true)
        .append('div').classed('up_pp_iconContainer', true)
        .append('div').classed('up-pp-icon-pin', true).classed('up_pp_icon', true);

    return pinpadContainer.append('div')
        .classed('up_pp_pad', true)
        .style('height', options.height);
};
var addCategory = function(container, category) {
    return CategoryFactory.createCategory(container, category);
};
/*
 * Public Methods
 */
var getPxNumber = function(pxNumber) {
    var pos = pxNumber.indexOf('px');
    if (pos != -1) {
        return +pxNumber.substring(0, pos);
    } else {
        return +pxNumber;
    }
};
var PinpadViewer = function(opts){
    var pinPad = this;
    pinPad.options = _.extend({}, defaultOpts, opts);

    pinPad.padContainer = init(pinPad.options);

    pinPad.categories = [];
    if (pinPad.options.toPin) {
        pinPad.addElement(pinPad.options.toPin);
    }
    //this.el.textContent = biojsVisPinpad.hello(opts.text);
};

PinpadViewer.prototype.addElement = function(toPin) {
    var pinPad = this;
    //add category
    var category = _.find(pinPad.categories, function(cat) {return cat.title === toPin.category; });
    if (category === undefined) {
        pinPad.categories.push(addCategory(pinPad.padContainer, toPin.category));
        category = _.last(pinPad.categories);
    }
    if (toPin.sections && (toPin.sections.length !== 0)) {
        CategoryFactory.createElement(category, toPin.sections);
    }
};

/**
 * Method responsible to say Hello
 * @example
 *     biojsvispinpad.hello('biojs');
 * @method hello
 * @param {String} name Name of a person
 * @return {String} Returns hello name
 */
PinpadViewer.hello = function (name) {
    return 'hello ' + name;
};

module.exports = PinpadViewer;
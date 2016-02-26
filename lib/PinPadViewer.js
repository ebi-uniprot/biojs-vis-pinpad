/*jslint node: true */
/*jshint laxbreak: true */
'use strict' ;
/*
 * biojs-vis-pinpad
 * https://github.com/ebi-uniprot/biojs-vis-pinpad
 *
 * Copyright (c) 2014 ebi-uniprot
 * Licensed under the Apache 2 license.
 */

/**
@class PinPadViewer
 */
var d3 = require('d3');
var _ = require('underscore');
var CategoryFactory = require('./CategoryFactory');

/**
 * Private Methods
 */
var defaultOpts = {
    height: '500px',
    width: '250px',
    highlightColor: 'green'
};
var init = function(pinPadViewer, toPin) {
    var pinPadViewerContainer = d3.select(pinPadViewer.options.el)
      .text('')
      .append('div')
      .classed('up_pp_main-container', true)
      .style('width', pinPadViewer.options.width);

    var mainTitle = pinPadViewerContainer.append('div')
        .classed('up_pp_mainTitle', true);
    mainTitle.append('div').classed('up_pp_iconContainer', true)
        .append('div').classed('icon-pin', true)
        .classed('up_pp_icon', true);
    pinPadViewer.offsetTop = mainTitle.node().offsetHeight
        + mainTitle.node().offsetTop;

    pinPadViewer.padContainer = pinPadViewerContainer.append('div')
        .classed('up_pp_pad', true)
        .style('height', pinPadViewer.options.height);

    if (pinPadViewer.options.toPin) {
        pinPadViewer.addElement({elem: toPin});
    }
};

/*
 * Public Methods
 */
var PinPadViewer = function(opts, toPin, pinPad){
    var pinPadViewer = this;
    pinPadViewer.options = _.extend({}, defaultOpts, opts);
    pinPadViewer.pinPad = pinPad;
    pinPadViewer.offsetTop = undefined;
    pinPadViewer.categories = [];

    init(pinPadViewer, toPin);
};

var addCategory = function(pinPadViewer, category) {
    return CategoryFactory.createCategory(pinPadViewer, category);
};

PinPadViewer.prototype.addElement = function(elInfo, catIndex) {
    var pinPadViewer = this;
    //add category
    var category;
    if (catIndex >= pinPadViewer.categories.length) {
        pinPadViewer.categories
            .push(addCategory(pinPadViewer, elInfo.elem.category));
        category = _.last(pinPadViewer.categories);
    } else {
        category = pinPadViewer.categories[catIndex];
    }
    if (!category.open) {
        category.toggle();
    }
    var newElem = CategoryFactory.createElement(category, elInfo);
    var elemY = newElem.header.node().offsetTop;
    pinPadViewer.padContainer.node().scrollTop = elemY - pinPadViewer.offsetTop;
    var color = newElem.header.style('background-color');
    newElem.header
        .transition()
        .duration(1500)
        .styleTween('background-color', function() {
            return d3.interpolate(pinPadViewer.options.highlightColor, color);
        })
    ;
    return newElem;
};

PinPadViewer.prototype.removeElement = function(catIndex, elIndex) {
    var pinPadViewer = this;
    CategoryFactory.removeElement(pinPadViewer.categories[catIndex], elIndex);
    if (pinPadViewer.categories[catIndex].elements.length === 0) {
        CategoryFactory.removeCategory(pinPadViewer.categories[catIndex]);
        pinPadViewer.categories.splice(catIndex, 1);
    }
};

PinPadViewer.prototype.delegateElementRemoval = function(elId) {
    var pinPadViewer = this;
    pinPadViewer.pinPad.removeElement(elId);
};

PinPadViewer.prototype.removeCategory = function(catIndex) {
    var pinPadViewer = this;
    CategoryFactory.removeCategory(pinPadViewer.categories[catIndex]);
    pinPadViewer.categories.splice(catIndex, 1);
};

PinPadViewer.prototype.delegateCategoryRemoval = function(catTitle) {
    var pinPadViewer = this;
    pinPadViewer.pinPad.removeCategory(catTitle);
};

module.exports = PinPadViewer;
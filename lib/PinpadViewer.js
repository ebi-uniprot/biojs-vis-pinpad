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
    height: '500px',
    highlightColor: 'green'
};
var init = function(pinPad) {
    var pinPadContainer = d3.select(pinPad.options.el)
      .text('')
      .append('div')
      .classed('up_pp_main-container', true)
      .style('width', pinPad.options.width);

    var mainTitle = pinPadContainer.append('div').classed('up_pp_mainTitle', true);
    mainTitle.append('div').classed('up_pp_iconContainer', true)
        .append('div').classed('up-pp-icon-pin', true).classed('up_pp_icon', true);
    pinPad.offsetTop = mainTitle.node().offsetHeight + mainTitle.node().offsetTop;

    pinPad.padContainer = pinPadContainer.append('div')
        .classed('up_pp_pad', true)
        .style('height', pinPad.options.height);

    if (pinPad.options.toPin) {
        pinPad.addElement(pinPad.options.toPin);
    }
};

/*
 * Public Methods
 */
var PinpadViewer = function(opts){
    var pinPad = this;
    pinPad.options = _.extend({}, defaultOpts, opts);
    pinPad.offsetTop = undefined;
    pinPad.categories = [];
    pinPad.dispatcher = d3.dispatch("duplication", "add", "remove");

    pinPad.getDispatcher = function() {
        return pinPad.dispatcher;
    };

    init(pinPad);
    //this.el.textContent = biojsVisPinpad.hello(opts.text);
};


PinpadViewer.prototype.addCategory = function(category) {
    return CategoryFactory.createCategory(this, category);
};

PinpadViewer.prototype.addElement = function(toPin) {
    var pinPad = this;
    //avoid duplicated ids
    var exists = toPin.id && _.some(pinPad.categories, function(cat) {
        return _.some(cat.data, function(elem) {
            return elem.id === toPin.id
        });
    });
    if (exists) {
        pinPad.dispatcher.duplication({element: toPin});
        return;
    }
    //add category
    var category = _.find(pinPad.categories, function(cat) {return cat.title === toPin.category; });
    if (category === undefined) {
        pinPad.categories.push(pinPad.addCategory(toPin.category));
        pinPad.dispatcher.add({category: toPin.category});
        category = _.last(pinPad.categories);
    }
    if (toPin.sections && (toPin.sections.length !== 0)) {
        if (!category.open) {
            category.toggle();
        }
        var newElem = CategoryFactory.createElement(category, toPin.id, toPin.sections);
        var elemY = newElem.header.node().offsetTop;
        pinPad.padContainer.node().scrollTop = elemY - pinPad.offsetTop;
        var color = newElem.header.style('background-color');
        newElem.header
            .transition()
            .duration(1500)
            .styleTween('background-color', function() {
                return d3.interpolate(pinPad.options.highlightColor, color);
            })
        ;
        pinPad.dispatcher.add({element: toPin});
        return newElem;
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
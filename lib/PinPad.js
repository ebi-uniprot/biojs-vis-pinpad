/*jslint node: true */
/*jshint laxbreak: true */
'use strict';

var PinPadViewer = require('./PinPadViewer');
var PinPadModel = require('./PinPadModel');
var d3 = require('d3');

var PinPad = function(opts) {
    var pinPad = this;
    pinPad.model = new PinPadModel(opts.ordering);
    pinPad.viewer = new PinPadViewer(opts.options, opts.toPin, pinPad);
    pinPad.dispatcher = d3.dispatch('add', 'duplication', 'remove', 'unknown', 'incomplete');
};

PinPad.prototype.addElement = function(element) {
    var pinPad = this;
    if (element.category && element.id && element.sections
        && (element.sections.length !== 0)) {
        var result = pinPad.model.addElement(element);
        if (result.error) {
            pinPad.dispatcher.duplication({element: element});
        } else {
            pinPad.viewer.addElement(element, result.catIndex,
                result.elIndex,
                pinPad.model.categories[result.catIndex].elements);
            pinPad.dispatcher.add({
                category: element.category,
                element: element
            });
        }
    } else {
        pinPad.dispatcher.incomplete({element: element});
    }
};

PinPad.prototype.removeElement = function(elId) {
    var pinPad = this;
    var result = pinPad.model.removeElement(elId);
    if (result.error) {
        pinPad.dispatcher.unknown({element: elId});
    } else {
        pinPad.viewer.removeElement(result.catIndex, result.elIndex);
        pinPad.dispatcher.remove({element: result.element});
        if ((pinPad.model.categories.length === 0)
            || (pinPad.model.categories.length === result.catIndex)) {
            pinPad.dispatcher.remove({category: result.category});
        } else if (pinPad.model.categories[result.catIndex].title
            !== result.category) {
            pinPad.dispatcher.remove({category: result.category});
        }
    }
};

PinPad.prototype.removeCategory = function(catTitle) {
    var pinPad = this;
    var result = pinPad.model.removeCategory(catTitle);
    pinPad.viewer.removeCategory(result.catIndex);
    pinPad.dispatcher.remove({category: catTitle});
};

module.exports = PinPad;
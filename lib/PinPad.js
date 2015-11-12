/*jslint node: true */
/*jshint laxbreak: true */
"use strict";

var PinPadViewer = require('./PinPadViewer');
var PinPadModel = require('./PinPadModel');

var PinPad = function(opts) {
    var pinPad = this;
    pinPad.model = new PinPadModel(opts.ordering);
    pinPad.viewer = new PinPadViewer(opts.options, opts.toPin, pinPad);
    pinPad.dispatcher = d3.dispatch("add", "duplication", "remove", "unknown", "incomplete");

    pinPad.addElement = function(element) {
        if (element.category && element.id && element.sections && (element.sections.length !== 0)) {
            var result = pinPad.model.addElement(element);
            if (result.error) {
                pinPad.dispatcher.duplication({element: element});
            } else {
                pinPad.viewer.addElement(element, result.catIndex, result.elIndex,
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

    pinPad.removeElement = function(elId) {
        var result = pinPad.model.removeElement(elId);
        if (result.error) {
            pinPad.dispatcher.unknown({element: elId});
        } else {
            pinPad.viewer.removeElement(result.catIndex, result.elIndex);
            pinPad.dispatcher.remove({category: result.category, element: result.element});
        }
    };

    pinPad.removeCategory = function(catTitle) {
        var result = pinPad.model.removeCategory(catTitle);
        pinPad.viewer.removeCategory(result.catIndex);
        pinPad.dispatcher.remove({category: catTitle});
    };
};

module.exports = PinPad;
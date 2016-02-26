/*jslint node: true */
/*jshint laxbreak: true */
/*jshint laxcomma: true*/
'use strict';

var _ = require('underscore');
var CategoryModel = require('./CategoryModel');

var addCategory = function(pinPadModel, catTitle, ordering) {
    return new CategoryModel(catTitle, ordering);
};

var PinPadModel = function(ordering) {
    var pinPadModel = this;
    pinPadModel.ordering = ordering;
    pinPadModel.categories = [];
};

PinPadModel.prototype.addElement = function(element) {
    var pinPadModel = this;
    var category;
    var catIndex = -1;
    var elem = _.find(pinPadModel.categories, function(cat, counter) {
        if (cat.title === element.category) {
            category = cat;
            catIndex = counter;
        }
        return _.find(cat.elements, function(el) {
            return element.id === el.id;
        });
    });
    if (elem) {
        return {error: 'duplication'};
    } else {
        if (!category || (catIndex === -1)) {
            category = addCategory
                (pinPadModel, element.category, pinPadModel.ordering);
            pinPadModel.categories.push(category);
            catIndex = pinPadModel.categories.length - 1;
        }
        var elIndex = category.addElement(element);
        return {catIndex: catIndex, elIndex: elIndex};
    }
};

PinPadModel.prototype.removeElement = function(elId) {
    var pinPadModel = this;
    var catIndex = -1, elIndex = -1;
    _.find(pinPadModel.categories, function(cat, counter) {
        var element = _.find(cat.elements, function(el, index) {
            elIndex = index;
            return el.id === elId;
        });
        if (element) {
            catIndex = counter;
        }
        return catIndex !== -1;
    });
    if ((catIndex !== -1) && (elIndex !== -1)) {
        var removedFromCategory = pinPadModel.categories[catIndex].title;
        var removedElement = pinPadModel.categories[catIndex]
            .elements[elIndex];
        pinPadModel.categories[catIndex].removeElement(elIndex);
        if (pinPadModel.categories[catIndex].elements.length === 0) {
            pinPadModel.categories.splice(catIndex, 1);
        }
        return {catIndex: catIndex, elIndex: elIndex
            , category: removedFromCategory, element: removedElement};
    }
    return {error: 'unknown'};
};

PinPadModel.prototype.removeCategory = function(catTitle) {
    var pinPadModel = this;
    var catIndex = -1;
    var category = _.find(pinPadModel.categories, function(cat, index) {
        catIndex = index;
        return cat.title === catTitle;
    });
    if (category) {
        pinPadModel.categories.splice(catIndex, 1);
    }
    return {catIndex: catIndex};
};

module.exports = PinPadModel;
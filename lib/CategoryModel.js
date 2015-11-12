/*jslint node: true */
/*jshint laxbreak: true */
"use strict";

var _ = require('underscore');

var CategoryModel = function(catTitle, ordering) {
    var catModel = this;
    catModel.title = catTitle;
    catModel.ordering = ordering;
    catModel.elements = [];

    catModel.addElement = function(element) {
        var sortedIndex = 0;
        if (catModel.ordering && element.ordering) {
            var rest = _.pluck(catModel.elements, 'ordering');
            _.each(ordering, function(attr) {
                var index = _.sortedIndex(rest, element.ordering, attr);
                sortedIndex = sortedIndex + index;
                rest = _.rest(rest, index);
            });
        } else {
            sortedIndex = catModel.elements.length;
        }
        catModel.elements.splice(sortedIndex, 0, element);
        return sortedIndex;
    };

    catModel.removeElement = function(index) {
        if ((0 <= index) && (index < catModel.elements.length)) {
            catModel.elements.splice(index, 1);
            return index;
        } else {
            return -1;
        }
    };
};

module.exports = CategoryModel;
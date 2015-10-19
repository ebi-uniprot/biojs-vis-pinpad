/*jslint node: true */
/*jshint laxbreak: true */
"use strict";

var d3 = require('d3');
var _ = require('underscore');
var ElementFactory = require('./ElementFactory');

var Category = function(pinPad, catTitle) {
    var category = this;
    category.pinPad = pinPad;
    category.title = catTitle;
    category.index = pinPad.categories.length;
    category.open = true;
    category.elements = [];

    var categoryContainer = category.pinPad.padContainer.append('div').classed('up_pp_category-container', true);

    category.header = categoryContainer.append('div').classed('up_pp_category-header', true);
    category.header.title = category.header.append('a')
        .attr('class', 'up_pp_category-name up_pftv_arrow-down')
        .text(catTitle)
        .on('click', function() {
            category.toggle();
        });
    category.header.append('span')
        .classed('up_pp_iconContainer', true)
        .style('float', 'right')
        .append('div')
        .attr('class', 'up-pp-icon-trash up_pp_clickable-icon')
        .on('click', function() {
            categoryContainer.remove();
            category.pinPad.categories.splice(category.index, 1);
            category.pinPad.dispatcher.remove({category: category.title});
        });

    category.padContainer = categoryContainer.append('div').classed('up_pp_category-pad', true);

    category.toggle = function() {
        if (category.padContainer.style('display') === 'none') {
            category.padContainer.style('display', 'block');
            category.header.title.attr('class', 'up_pp_category-name up_pftv_arrow-down');
            category.open = true;
        } else {
            category.padContainer.style('display', 'none');
            category.header.title.attr('class', 'up_pp_category-name up_pftv_arrow-right');
            category.open = false;
        }
    };

    category.addElement = function(id, sections) {
        var elem = {sortAttribute: sections[0].title, id: id, sections: sections};
        var sortedIndex = _.sortedIndex(category.elements, elem, 'sortAttribute');
        elem.sortedIndex = sortedIndex;
        category.elements.splice(sortedIndex, 0, elem);
        return sortedIndex;
    };

    category.displayElements = function(sortedIndex) {
        if (sortedIndex === (category.elements.length-1)) {
            return ElementFactory.createElement(category, category.elements[category.elements.length-1]);
        } else {
            var newElem = undefined;
            category.padContainer.selectAll('*').remove();
            _.each(category.elements, function(elem, index) {
                var added = ElementFactory.createElement(category, elem);
                if (index === sortedIndex) {
                    newElem = added;
                }
            });
            return newElem;
        }
    }
};

var CategoryFactory = function () {
    return {
        createCategory: function(pinPad, catTitle) {
            return new Category(pinPad, catTitle);
        },
        createElement: function(category, id, sections) {
            var sortedIndex = category.addElement(id, sections);
            return category.displayElements(sortedIndex);
        }
    };
}();

module.exports = CategoryFactory;
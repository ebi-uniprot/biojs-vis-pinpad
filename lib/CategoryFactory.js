/*jslint node: true */
/*jshint laxbreak: true */
"use strict";

var d3 = require('d3');
var _ = require('underscore');
var ElementFactory = require('./ElementFactory');

var Category = function(pinPadViewer, catTitle) {
    var category = this;
    category.pinPadViewer = pinPadViewer;
    category.title = catTitle;
    category.open = true;
    category.elements = [];

    var categoryContainer = category.pinPadViewer.padContainer.append('div').classed('up_pp_category-container', true);

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
            category.delegateCategoryRemoval(category.title);
        });

    category.padContainer = categoryContainer.append('div').classed('up_pp_category-pad', true);

    category.remove = function() {
        while (category.elements.length > 0) {
            category.elements[0].remove(category.elements[0].id, category.title, false);
            category.elements.splice(0, 1);
        }
        categoryContainer.remove();
    };

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

    category.addElement = function(elem, sortedIndex, allElements) {
        var newElem = undefined;
        if (sortedIndex > category.elements.length) {
            newElem =  ElementFactory.createElement(category, elem);
            category.elements.push(newElem);
        } else {
            category.padContainer.selectAll('*').remove();
            _.each(allElements, function(elem, index) {
                var added = ElementFactory.createElement(category, elem);
                if (index === sortedIndex) {
                    newElem = added;
                    category.elements.splice(sortedIndex, 0, newElem);
                }
                if (category.elements[index].open === false) {
                    added.toggle();
                }
            });
        }
        return newElem;
    };

    category.removeElement = function(elIndex) {
        var element = category.elements[elIndex];
        category.elements.splice(elIndex, 1);
        ElementFactory.removeElement(element);
    };

    category.delegateElementRemoval = function(elId) {
        category.pinPadViewer.delegateElementRemoval(elId);
    };

    category.delegateCategoryRemoval = function(catTitle) {
        category.pinPadViewer.delegateCategoryRemoval(catTitle);
    };
};

var CategoryFactory = function () {
    return {
        createCategory: function(pinPadViewer, catTitle) {
            return new Category(pinPadViewer, catTitle);
        },
        removeCategory: function(category) {
            category.remove();
        },
        createElement: function(category, elem, elIndex, allElements) {
            return category.addElement(elem, elIndex, allElements);
        },
        removeElement: function(category, elIndex) {
            category.removeElement(elIndex);
        }
    };
}();

module.exports = CategoryFactory;
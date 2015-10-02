/*jslint node: true */
/*jshint laxbreak: true */
"use strict";

var d3 = require('d3');
var _ = require('underscore');
var ElementFactory = require('./ElementFactory');

var Category = function(container, catTitle) {
    var category = this;
    category.title = catTitle;
    category.elements = [];

    var categoryContainer = container.append('div').classed('up_pp_category-container', true);

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
        });

    category.padContainer = categoryContainer.append('div').classed('up_pp_category-pad', true);

    category.toggle = function() {
        if (category.padContainer.style('display') === 'none') {
            category.padContainer.style('display', 'block');
            category.header.title.attr('class', 'up_pp_category-name up_pftv_arrow-down');
        } else {
            category.padContainer.style('display', 'none');
            category.header.title.attr('class', 'up_pp_category-name up_pftv_arrow-right');
        }
    };

    category.addElement = function(sections) {
        var elem = {sortAttribute: sections[0].title, sections: sections};
        var sortedIndex = _.sortedIndex(category.elements, elem, 'sortAttribute');
        category.elements.splice(sortedIndex, 0, elem);
    };

    category.displayElements = function() {
        category.padContainer.selectAll('*').remove();
        _.each(category.elements, function(elem) {
            ElementFactory.createElement(category.padContainer, elem.sections);
        });
    }
};

var CategoryFactory = function () {
    return {
        createCategory: function(container, catTitle) {
            return new Category(container, catTitle);
        },
        createElement: function(category, sections) {
            category.addElement(sections);
            category.displayElements();
        }
    };
}();

module.exports = CategoryFactory;
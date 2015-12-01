/*jslint node: true */
/*jshint laxbreak: true */
'use strict';

var _ = require('underscore');
var ElementFactory = require('./ElementFactory');

var Category = function(pinPadViewer, catTitle) {
    var category = this;
    category.pinPadViewer = pinPadViewer;
    category.title = catTitle;
    category.open = true;
    category.elements = [];

    category.categoryContainer = category.pinPadViewer.padContainer.append('div')
        .classed('up_pp_category-container', true);

    category.header = category.categoryContainer.append('div')
        .classed('up_pp_category-header', true);
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

    category.padContainer = category.categoryContainer.append('div')
        .classed('up_pp_category-pad', true);
};

Category.prototype.remove = function() {
    var category = this;
    while (category.elements.length > 0) {
        category.elements[0]
            .remove(category.elements[0].id, category.title, false);
        category.elements.splice(0, 1);
    }
    category.categoryContainer.remove();
};

Category.prototype.toggle = function() {
    var category = this;
    if (category.padContainer.style('display') === 'none') {
        category.padContainer.style('display', 'block');
        category.header.title
            .attr('class', 'up_pp_category-name up_pftv_arrow-down');
        category.open = true;
    } else {
        category.padContainer.style('display', 'none');
        category.header.title
            .attr('class', 'up_pp_category-name up_pftv_arrow-right');
        category.open = false;
    }
};

Category.prototype.addElement = function(elem, sortedIndex, allElements) {
    var category = this;
    var newElem;
    if (sortedIndex > category.elements.length) {
        newElem =  ElementFactory.createElement(category, elem);
        category.elements.push(newElem);
    } else {
        category.padContainer.selectAll('*').remove();
        _.each(allElements, function(elem, index) {
            var open = index === sortedIndex
                ? undefined : category.elements[index].open;
            var added = ElementFactory.createElement(category, elem, open);
            if (index === sortedIndex) {
                newElem = added;
                category.elements.splice(sortedIndex, 0, newElem);
            }
        });
    }
    return newElem;
};

Category.prototype.removeElement = function(elIndex) {
    var category = this;
    var element = category.elements[elIndex];
    category.elements.splice(elIndex, 1);
    ElementFactory.removeElement(element);
};

Category.prototype.delegateElementRemoval = function(elId) {
    this.pinPadViewer.delegateElementRemoval(elId);
};

Category.prototype.delegateCategoryRemoval = function(catTitle) {
    this.pinPadViewer.delegateCategoryRemoval(catTitle);
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
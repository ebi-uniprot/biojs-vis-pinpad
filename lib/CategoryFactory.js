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
    category.open = true;
    category.data = [];
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
            category.remove();
        });

    category.padContainer = categoryContainer.append('div').classed('up_pp_category-pad', true);

    category.remove = function() {
        while (category.elements.length !== 0) {
            category.elements[0].remove(category.data[0].id, category.title, false);
        }
    };

    category.removeDom = function() {
        var index = _.findIndex(category.pinPad.categories, function(cat) {
            return cat.title === category.title;
        });
        if (index !== -1) {
            categoryContainer.remove();
            category.pinPad.categories.splice(index, 1);
            category.pinPad.dispatcher.remove({category: category.title});
        }
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

    category.addElement = function(id, sections) {
        var datum = {sortAttribute: sections[0].title, id: id, sections: sections};
        var sortedIndex = _.sortedIndex(category.data, datum, 'sortAttribute');
        category.data.splice(sortedIndex, 0, datum);
        return sortedIndex;
    };

    category.displayElements = function(sortedIndex) {
        var newElem = undefined;
        if (sortedIndex === (category.data.length-1)) {
            newElem =  ElementFactory.createElement(category, category.data[category.data.length-1]);
            category.elements.push(newElem);
        } else {
            category.padContainer.selectAll('*').remove();
            _.each(category.data, function(elem, index) {
                var added = ElementFactory.createElement(category, elem);
                if (index === sortedIndex) {
                    newElem = added;
                }
            });
            category.elements.splice(sortedIndex, 0, newElem);
        }
        return newElem;
    }
};

var CategoryFactory = function () {
    return {
        createCategory: function(pinPad, catTitle) {
            return new Category(pinPad, catTitle);
        },
        removeCategory: function(category) {
            category.remove();
        },
        createElement: function(category, id, sections) {
            var sortedIndex = category.addElement(id, sections);
            return category.displayElements(sortedIndex);
        },
        removeElement: function(category, index) {
            ElementFactory.removeElement(category.elements[index]);
        }
    };
}();

module.exports = CategoryFactory;
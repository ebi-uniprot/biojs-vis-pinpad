/*jslint node: true */
/*jshint laxbreak: true */
"use strict";

var d3 = require("d3");

var Category = function(container, catTitle) {
    var category = this;
    category.title = catTitle;

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
    }
};

var CategoryFactory = function () {
    return {
        createCategory: function(container, catTitle) {
            return new Category(container, catTitle);
        }
    };
}();

module.exports = CategoryFactory;
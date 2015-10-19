/*jslint node: true */
/*jshint laxbreak: true */
"use strict";

var d3 = require('d3');
var _ = require('underscore');

var isLink = function(info) {
    if ((typeof info === 'object') && !(info instanceof Array)) {
        var keys = _.keys(info);
        if ((keys.length === 2) && _.contains(keys, 'value') && _.contains(keys, 'link')) {
            return true;
        }
    }
    return false
};

var addLink = function(container, infoText, infoLink) {
    if (infoLink && (infoLink !== '-')) {
        container.append('a')
            .attr('href', infoLink)
            .attr('target', '_blank')
            .text(infoText);
    } else {
        container.text(infoText);
    }
};

var addValue = function(container, info) {
    if ((typeof info === 'string') || (typeof info === 'number') || (typeof info === 'boolean')) {
        container.text(info);
    } else if (isLink(info)) {
        addLink(container, info.value, info.link);
    } else if (info instanceof Array) {
        _.each(info, function(datum, index) {
            var span = container.append('span');
            addValue(span, datum);
            if (index !== (info.length-1)) {
                container.append('span').text(', ');
            }
        });
    } else {
        addData(container.append('table'), info);
    }
};

var addDatum = function(table, key, info) {
    var tr = table.append('tr');
    if (key.indexOf('styled_') === 0) {
        var leftCol = tr.append('td').text(info.key);
        if (info.key_style) {
            leftCol.attr('style', info.key_style);
        }
        var rightCol = tr.append('td');
        if (info.value_style) {
            rightCol.attr('style', info.value_style);
        }
        addValue(rightCol, info.value)
    } else if (key.indexOf('subsection_') === 0) {
        tr.append('td')
            .attr('colspan', 2)
            .classed('up_pp_table_subsection', true)
            .text(info.title);
        addData(table, info.information);
    } else {
        tr.append('td').text(key.replace('_', ' '));
        addValue(tr.append('td'), info);
    }
};

var addData = function(table, data) {
    _.each(data, function(info, key) {
        addDatum(table, key, info);
    });
};

var Element = function(category, elem) {
    var element = this;
    element.category = category;
    element.content = elem;
    element.header = undefined;
    element.tableContainer = undefined;
    element.table = undefined;

    element.toggle = function() {
        if (element.tableContainer.style('display') === 'none') {
            element.tableContainer.style('display', 'block');
            element.header.title.attr('class', 'up_pp_category-name up_pftv_arrow-down');
            element.content.open = true;
        } else {
            element.tableContainer.style('display', 'none');
            element.header.title.attr('class', 'up_pp_category-name up_pftv_arrow-right');
            element.content.open = false;
        }
    };

    var elemContainer = element.category.padContainer.append('div');
    element.first(element.category.title, elemContainer, _.first(element.content.sections));
    element.tail(element.table, _.tail(element.content.sections));

    if (element.content.open === false) {
        element.toggle();
    }
};

Element.prototype.first = function(catTitle, container, section) {
    var element = this;
    element.header = container.append('div').classed('up_pp_element-header', true);
    element.header.title = element.header.append('a')
        .attr('class', 'up_pp_element-name up_pftv_arrow-down')
        .text(section.title)
        .on('click', function() {
            element.toggle();
        });
    element.header.append('span')
        .classed('up_pp_iconContainer', true)
        .style('float', 'right')
        .append('div')
        .attr('class', 'up-pp-icon-trash up_pp_clickable-icon')
        .on('click', function() {
            container.remove();
            element.category.elements.splice(element.sortedIndex, 1);
            element.category.pinPad.dispatcher.remove({element: {
                category: catTitle, id: element.content.id, sections: element.content.sections}
            });
        });

    element.tableContainer = container.append('div');
    element.table = element.tableContainer.append('table').attr('width', '100%');
    addData(element.table, section.information);
};

Element.prototype.tail = function(container, sections) {
    _.each(sections, function(section) {
        container.append('tr').classed('up_pp_element-section', true)
            .append('td')
            .attr('colspan', 2)
            .text(section.title);

        addData(container, section.information);
    });
};

var ElementFactory = function () {
    return {
        createElement: function(category, element) {
            return new Element(category, element);
        }
    };
}();

module.exports = ElementFactory;
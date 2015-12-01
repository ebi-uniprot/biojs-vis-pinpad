/*jslint node: true */
/*jshint laxbreak: true */
'use strict';

var d3 = require('d3');
var _ = require('underscore');

var isLink = function(info) {
    if ((typeof info === 'object') && !(info instanceof Array)) {
        var keys = _.keys(info);
        if ((keys.length === 2) && _.contains(keys, 'value')
            && _.contains(keys, 'link')) {
            return true;
        }
    }
    return false;
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

var addData = function(table, data) {
    _.each(data, function(info, key) {
        addDatum(table, key, info);
    });
};

var addValue = function(container, info) {
    if ((typeof info === 'string') || (typeof info === 'number')
        || (typeof info === 'boolean')) {
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
        var leftCol, rightCol;
        if (info.key_right === true) {
            leftCol = tr.append('td');
            rightCol = tr.append('td').text(info.key + ' ');
        } else {
            leftCol = tr.append('td').text(info.key);
            rightCol = tr.append('td');
        }
        if (info.key_style) {
            leftCol.attr('style', info.key_style);
        }
        if (info.value_style) {
            rightCol.attr('style', info.value_style);
        }
        addValue(rightCol, info.value);
    } else if (key.indexOf('subsection_') === 0) {
        tr.append('td')
            .attr('colspan', 2)
            .classed('up_pp_table_subsection', true)
            .text(info.title);
        addData(table, info.information);
    } else {
        tr.append('td').text(key.replace(/_/g, ' '));
        addValue(tr.append('td'), info);
    }
};

var Element = function(category, elem, open) {
    var element = this;
    element.id = elem.id;
    element.category = category;
    element.open = open;
    element.header = undefined;
    element.tableContainer = undefined;
    element.table = undefined;

    element.toggle = function() {
        if (element.tableContainer.style('display') === 'none') {
            element.tableContainer.style('display', 'block');
            element.header.title
                .attr('class', 'up_pp_element-name up_pftv_arrow-down');
            element.open = true;
        } else {
            element.tableContainer.style('display', 'none');
            element.header.title
                .attr('class', 'up_pp_element-name up_pftv_arrow-right');
            element.open = false;
        }
    };

    var elemContainer = element.category.padContainer.append('div')
        .attr('id', 'pinned_elem_id_' + elem.id);

    element.first(
        element.category.title, elemContainer, _.first(elem.sections)
    );
    element.tail(element.table, _.tail(elem.sections));
};

Element.prototype.first = function(catTitle, container, section) {
    var element = this;
    element.header = container.append('div')
        .classed('up_pp_element-header', true);
    element.header.title = element.header.append('a')
        .attr('class', function() {
            if (element.open === false) {
                return 'up_pp_element-name up_pftv_arrow-right';
            } else {
                return 'up_pp_element-name up_pftv_arrow-down';
            }
        })
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
            element.category.delegateElementRemoval(element.id);
        });

    element.tableContainer = container.append('div');
    if (element.open === false) {
        element.tableContainer.style('display', 'none');
    }
    element.table = element.tableContainer
        .append('table').attr('width', '100%');
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

Element.prototype.remove = function(id) {
    var container = d3.select('#' + 'pinned_elem_id_' + id);
    container.remove();
};

var ElementFactory = function () {
    return {
        createElement: function(category, elem, open) {
            return new Element(category, elem, open);
        },
        removeElement: function(element) {
            element.remove(element.id);
        }
    };
}();

module.exports = ElementFactory;
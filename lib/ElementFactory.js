/*jslint node: true */
/*jshint laxbreak: true */
"use strict";

var d3 = require('d3');
var _ = require('underscore');

var addLink = function(container, infoText, infoLink) {
    if (infoLink && (infoLink !== '-')) {
        container.append('span').append('a')
            .attr('href', infoLink)
            .attr('target', '_blank')
            .text(infoText);
    } else {
        container.append('span')
            .text(infoText);
    }
};

var addValue = function(container, info) {
    if ((typeof info === 'string') || (typeof info === 'number') || (typeof info === 'boolean')) {
        container.text(info);
    } else {
        _.each(info, function(datum, index) {
            //TODO arrays and objects... add table first and then use addDatum or so
        });
    }
};

var addDatum = function(table, key, info) {
    var tr = table.append('tr');
    if (key.indexOf('styled_') === 0) {
        var leftCol = tr.append('td').text(info.key);
        if (info.right) {
            leftCol.style('text-align', 'right');
        }
        if (info.bgcolor) {
            leftCol.style('background-color', info.bgcolor);
        }
        if (info.color) {
            leftCol.style('color', info.color);
        }
        var rightCol = tr.append('td');
        if (typeof info.text === 'string') {
            addLink(rightCol, info.text, info.link);
        } else {
            _.each(info.text, function(datum, index) {
                addLink(rightCol, datum, info.link[index]);
                if (index !== (info.text.length-1)) {
                    rightCol.append('span').text(', ');
                }
            });
        }
    } else if (key.indexOf('subsection_') === 0) {
        //TODO
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

var Element = function(container, sections) {
    var element = this;
    element.header = undefined;
    element.tableContainer = undefined;

    var elemContainer = container.append('div');
    element.first(elemContainer, _.first(sections));
    element.tail(elemContainer, _.tail(sections));

    element.toggle = function() {
        if (element.tableContainer.style('display') === 'none') {
            element.tableContainer.style('display', 'block');
            element.header.title.attr('class', 'up_pp_category-name up_pftv_arrow-down');
        } else {
            element.tableContainer.style('display', 'none');
            element.header.title.attr('class', 'up_pp_category-name up_pftv_arrow-right');
        }
    }
};

Element.prototype.first = function(container, section) {
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
        });

    element.tableContainer = container.append('div');
    var table = element.tableContainer.append('table');
    addData(table, section.information);
};

Element.prototype.tail = function(container, sections) {
    //TODO add data to element.tableContainer.table
};

var ElementFactory = function () {
    return {
        createElement: function(container, sections) {
            return new Element(container, sections);
        }
    };
}();

module.exports = ElementFactory;
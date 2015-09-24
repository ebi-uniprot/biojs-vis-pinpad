/*
 * biojs-vis-pinpad
 * https://github.com/ljgarcia/biojs-vis-pinpad
 *
 * Copyright (c) 2014 ebi-uniprot
 * Licensed under the Apache 2 license.
 */

/**
@class biojsvispinpad
 */
var d3 = require('d3');
var _ = require('underscore');

var biojsVisPinpad  = function(opts){
    var pinPad = this;
    pinPad.options = _.extend({}, defaultOpts, opts);

    init(pinPad.options);

    var categories = [];
    var exist = _.some(categories, function(cat) {return cat.title === pinPad.options.toPin.category; });
    if (!exist) {
        addCategory(pinPad.options.toPin.category, categories);
    }

    //this.el.textContent = biojsVisPinpad.hello(opts.text);
};

/**
 * Private Methods
 */
var defaultOpts = {
    width: '250px',
    height: '700px'
};
var init = function(options) {
    var pinpadContainer = d3.select(options.el)
      .text('')
      .append('div')
      .classed('up_pp_mainContainer', true)
      .style('width', options.width)
      .style('height', options.height);

    pinpadContainer.append('div').classed('up_pp_mainTitle', true)
        .append('div').classed('up_pp_iconContainer', true)
        .append('div').classed('up-pp-icon-pin', true).classed('up_pp_icon', true);

    pinpadContainer.append('div')
        .classed('up_pp_pad', true);

    return pinpadContainer;
};
var addCategory = function(category) {
    console.log('todo add: ' + category);
};
/*
 * Public Methods
 */

/**
 * Method responsible to say Hello
 *
 * @example
 *
 *     biojsvispinpad.hello('biojs');
 *
 * @method hello
 * @param {String} name Name of a person
 * @return {String} Returns hello name
 */


biojsVisPinpad.hello = function (name) {
  return 'hello ' + name;
};

biojsVisPinpad.addElement = function(elem) {

};

biojsVisPinpad.removeElement = function(id) {

};

biojsVisPinpad.removeCategory = function(elem) {

};

module.exports = biojsVisPinpad;
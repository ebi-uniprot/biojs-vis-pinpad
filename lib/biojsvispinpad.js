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

var biojsVisPinpad  = function(opts){
  var pinpad = this;
  pinpad.container = init(opts);

  //this.el.textContent = biojsVisPinpad.hello(opts.text);
};

/**
 * Private Methods
 */
var init = function(opts) {
  var pinpadContainer = d3.select(opts.el)
      .text('')
      .append('div')
      .classed('up_pp_container', true);
    pinpadContainer.append('div')
        .classed('up_pp_title', true)
        .append('span')
        .classed('up_pp_iconContainer')
        .append('div')
        .classed('up-pp-icon-pin', true);
    pinpadContainer.append('div')
        .classed('up_pp_pad', true);
  return pinpadContainer;
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

biojsVisPinpad.load = function(elem) {

};

module.exports = biojsVisPinpad;
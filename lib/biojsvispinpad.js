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


var  biojsVisPinpad;
module.exports = biojsVisPinpad = function(opts){
  this.el = opts.el;
  this.el.textContent = biojsVisPinpad.hello(opts.text);
};

/**
 * Private Methods
 */

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


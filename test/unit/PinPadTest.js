/*
 * biojs-vis-pinpad
 * https://github.com/ljgarcia/biojs-vis-pinpad
 *
 * Copyright (c) 2014 ljgarcia
 * Licensed under the Apache 2 license.
 */

// chai is an assertion library
var chai = require('chai');

// @see http://chaijs.com/api/assert/
var assert = chai.assert;

// register alternative styles
// @see http://chaijs.com/api/bdd/
chai.expect();
chai.should();

// requires your main app (specified in index.js)
var PinPad = require('../..');
var PinPadModel = require('../../lib/PinPadModel');
var TestData = require('../TestData');

describe('PinPadTest', function(){
    var model = new PinPadModel(['type', 'start', 'end']);
    var data = new TestData();

    it('should create an empty model', function(){
      assert.equal(model.categories.length, 0, 'empty categories');
    });
    describe('adding a first element', function() {
        it('should add a new category', function() {
            model.addElement(data.addCat1Elem1);
            assert.equal(model.categories.length, 1, 'only one category in model');
            assert.equal(model.categories[0].title, data.addCat1Elem1.category, 'model category title');
        });
        it('should add a new element', function() {
            assert.equal(model.categories[0].elements.length, 1, 'only one element in model');
            assert.equal(model.categories[0].elements[0].id, data.addCat1Elem1.id, 'model element id');
            assert.equal(model.categories[0].elements[0].sections, data.addCat1Elem1.sections, 'model' +
                ' element sections');
        });
    });
    describe('adding a second element to the same category', function() {
        it('should keep only one category', function() {
            model.addElement(data.addCat1Elem2);
            assert.equal(model.categories.length, 1, 'still only one category in model');
        });
        it('should have now a second element', function() {
            assert.equal(model.categories[0].elements.length, 2, 'two elements in model');
            assert.equal(model.categories[0].elements[1].id, data.addCat1Elem2.id, 'second element id in model');
            assert.equal(model.categories[0].elements[1].sections, data.addCat1Elem2.sections, 'element sections');
        });
    });
    describe('adding an element in the middle', function() {
        it('should add a third element into the second position', function () {
            model.addElement(data.addCat1Elem3);
            assert.equal(model.categories[0].elements.length, 3, 'three elements in model');
            assert.equal(model.categories[0].elements[1].id, data.addCat1Elem3.id, 'middle element id in model');
            assert.equal(model.categories[0].elements[1].sections, data.addCat1Elem3.sections, 'element sections');
        });
    });
    describe('unsuccessfully adding an element with a duplicated id', function() {
        it('should not have a duplicated id', function () {
            model.addElement(data.addDuplicated);
            assert.equal(model.categories[0].elements.length, 3, 'still three elements in model');
        });
    });
    describe('adding an element in a new category', function() {
        it('should add a new category', function() {
            model.addElement(data.addElem1Cat2);
            assert.equal(model.categories.length, 2, 'two categories in model');
        });
        it('should add a new element', function() {
            assert.equal(model.categories[1].elements[0].id, data.addElem1Cat2.id, 'element id');
            assert.equal(model.categories[1].elements[0].sections, data.addElem1Cat2.sections,
                'element sections');
        });
    });

    describe('removing the middle element in first category', function() {
        it('should remove the element', function() {
            model.removeElement('ft_3');
            assert.equal(model.categories[0].elements.length, 2, 'only two elements in model');
        });
    });

    describe('removing the first category', function() {
        it('should remove the category in the data', function() {
            model.removeCategory('Domains & sites');
            assert.equal(model.categories.length, 1, 'only 1 category now in model');
            assert.equal(model.categories[0].elements.length, 1, 'only 1 element in data list now');
        });
    });
});

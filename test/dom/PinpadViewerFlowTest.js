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
var expect = chai.expect;

// this is your global div instance (see index.html)
var yourDiv = document.getElementById('mocha');

// requires your main app (specified in index.js)
var PinPadViewer = require('../..');

describe('PinPadViewerFlowTest', function(){
    var instance;
    var elemField = 'description';

    var flushAllD3Transitions = function() {
        var now = Date.now;
        Date.now = function() { return Infinity; };
        d3.timer.flush();
        Date.now = now;
    };

    before(function(done) {
        instance = new PinPadViewer({
            el: yourDiv
            , width: '250px'
            , height: '300px'
            , highlightColor: 'green'
        });
        done();
    });

    it('should create a pinpad component', function() {
        assert.equal(yourDiv.childElementCount, 1, 'only one main container created');

        var mainContainer = yourDiv.firstElementChild;
        assert.equal(mainContainer.getAttribute('class'), 'up_pp_main-container', 'main container class');
        assert.equal(mainContainer.childElementCount, 2);

        var titleDiv = mainContainer.firstElementChild;
        assert.equal(titleDiv.getAttribute('class'), 'up_pp_mainTitle');
        assert.equal(titleDiv.childElementCount, 1, 'only one icon container');
        assert.equal(titleDiv.firstElementChild.getAttribute('class'), 'up_pp_iconContainer', 'icon class');
        assert.equal(titleDiv.firstElementChild.childElementCount, 1, 'only one icon');
        assert.equal(titleDiv.firstElementChild.firstElementChild.getAttribute('class'), 'up-pp-icon-pin up_pp_icon',
            'icon classes');

        assert.equal(mainContainer.lastElementChild.getAttribute('class'), 'up_pp_pad');
        expect(mainContainer.lastElementChild.getAttribute('style').indexOf('height: 300px;')).to.be.equal(0);
    });

    describe('adding a first element and category', function() {
        var addCat1Elem1 = {
            category: "Domains & sites",
            id: 'ft_1',
            sections: [
                {
                    title: "Region of interest 181-188",
                    information: {
                        description: "Zinc-binding"
                    }
                }
            ]
        };
        var catContainer, element, pad;
        it('should add a new category and element data', function() {
            var newElem = instance.addElement(addCat1Elem1);
            assert.equal(instance.categories.length, 1, 'only one category');
            assert.equal(instance.categories[0].title, addCat1Elem1.category, 'category title');
            assert.equal(instance.categories[0].data.length, 1, 'only one element');
            assert.equal(instance.categories[0].data[0].sortAttribute, addCat1Elem1.sections[0].title,
                'element title');
            assert.equal(instance.categories[0].data[0].id, addCat1Elem1.id,
                'element id');
            assert.equal(instance.categories[0].data[0].sections, addCat1Elem1.sections,
                'element sections');
            assert.equal(newElem.content, instance.categories[0].data[0], 'element content');
            expect(newElem.content.open).to.be.undefined;
        });
        it('should add a new category to dom', function() {
            catContainer = document.getElementsByClassName('up_pp_category-container');
            assert.equal(catContainer.length, 1, 'only one category added');
            assert.equal(catContainer[0].childElementCount, 2, 'one header and one pad');

            var header = catContainer[0].firstElementChild;
            assert.equal(header.getAttribute('class'), 'up_pp_category-header', 'header class');
            assert.equal(header.firstElementChild.getAttribute('class'), 'up_pp_category-name up_pftv_arrow-down',
                'arrow class');
            assert.equal(header.firstElementChild.innerText.toLowerCase(), addCat1Elem1.category.toLowerCase(),
                'category header text');
            assert.equal(header.lastElementChild.getAttribute('class'), 'up_pp_iconContainer', 'lift icon container');
            assert.equal(header.lastElementChild.firstElementChild.getAttribute('class'),
                'up-pp-icon-trash up_pp_clickable-icon', 'lift icon');
        });
        it('should add a new pad to the category', function() {
            pad = catContainer[0].lastElementChild;
            assert.equal(pad.getAttribute('class'), 'up_pp_category-pad', 'pad class');
            assert.equal(pad.childElementCount, 1, 'elements in category');
        });
        it('should add a new element to the category pad', function() {
            element = pad.firstElementChild;
            assert.equal(element.childElementCount, 2, 'element header and content');
        });
        it('should add a new header for the element', function() {
            var elHeader = element.firstElementChild;
            assert.equal(elHeader.getAttribute('class'), 'up_pp_element-header', 'element header class');
            assert.equal(elHeader.childElementCount, 2, 'text and lift');
            assert.equal(elHeader.firstElementChild.getAttribute('class'), 'up_pp_element-name up_pftv_arrow-down',
                'element arrow class');
            assert.equal(elHeader.firstElementChild.innerText.toLowerCase(), addCat1Elem1.sections[0].title.toLowerCase(),
                'element header text');
            assert.equal(elHeader.lastElementChild.getAttribute('class'), 'up_pp_iconContainer', 'el lift icon container');
            assert.equal(elHeader.lastElementChild.firstElementChild.getAttribute('class'),
                'up-pp-icon-trash up_pp_clickable-icon', 'el lift icon');
        });
        it('should add new content for the element', function() {
            var elContent = element.lastElementChild;
            assert.equal(elContent.childElementCount, 1, 'one table per element');
            assert.equal(elContent.firstElementChild.childElementCount, 1, 'one row only');
            assert.equal(elContent.firstElementChild.firstElementChild.childElementCount, 2, 'two columns');
            var col1 = elContent.firstElementChild.firstElementChild.firstElementChild;
            assert.equal(col1.innerText, elemField, 'row title');
            var col2 = elContent.firstElementChild.firstElementChild.lastElementChild;
            assert.equal(col2.innerText, addCat1Elem1.sections[0].information[elemField], 'row information');
        });
    });

    describe('closing elements', function() {
        it('should close the only one existing element', function() {
            var elArrow = document.querySelector('.up_pp_element-name');
            assert.equal(elArrow.getAttribute('class'), 'up_pp_element-name up_pftv_arrow-down', 'open class');
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, elArrow);
            elArrow.dispatchEvent(evt); //close
            flushAllD3Transitions();

            assert.equal(instance.categories[0].elements[0].content.open, false, 'element is close');
            assert.equal(elArrow.getAttribute('class'), 'up_pp_element-name up_pftv_arrow-right', 'close class');
        });
    });

    describe('adding a second element to the same category', function() {
        var addCat1Elem2 = {
            category: "Domains & sites",
            id: 'ft_2',
            sections: [
                {
                    title: "Site 57-57",
                    information: {
                        description: "Reactive bond"
                    }
                }
            ]
        };
        var newElem;
        it('should keep only one category', function() {
            newElem = instance.addElement(addCat1Elem2);
            assert.equal(instance.categories.length, 1, 'still only one category');
            assert.equal(instance.categories[0].data.length, 2, 'two elements');
        });
        it('should add a second element', function() {
            assert.equal(instance.categories[0].data[1].sortAttribute, addCat1Elem2.sections[0].title,
                'element title');
            assert.equal(instance.categories[0].data[1].id, addCat1Elem2.id,
                'element id');
            assert.equal(instance.categories[0].data[1].sections, addCat1Elem2.sections,
                'element sections');
            assert.equal(newElem.content, instance.categories[0].data[1], 'element content');
            expect(newElem.content.open).to.be.undefined;
        });
        it('should keep the first element closed', function() {
            assert.equal(instance.categories[0].elements[0].content.open, false,
                'first element is still closed');
        });
    });

    describe('closing a category', function() {
        it('should close the first category', function() {
            var catArrow = document.querySelector('.up_pp_category-name');
            assert.equal(catArrow.getAttribute('class'), 'up_pp_category-name up_pftv_arrow-down', 'open class');
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, catArrow);
            catArrow.dispatchEvent(evt); //close
            flushAllD3Transitions();

            assert.equal(instance.categories[0].open, false, 'category is close');
            assert.equal(catArrow.getAttribute('class'), 'up_pp_category-name up_pftv_arrow-right', 'close class');
        })
    });

    describe('adding an element in the middle', function() {
        var addCat1Elem3 = {
            category: "Domains & sites",
            id: 'ft_3',
            sections: [
                {
                    title: "Site 1-2",
                    information: {
                        description: "Cleavage; by beta-secretase"
                    }
                }
            ]
        };
        it('should add a third element into the second position', function() {
            var newElem = instance.addElement(addCat1Elem3);
            assert.equal(instance.categories[0].data[1].sortAttribute, addCat1Elem3.sections[0].title,
                'element title');
            assert.equal(instance.categories[0].data[1].id, addCat1Elem3.id,
                'element id');
            assert.equal(instance.categories[0].data[1].sections, addCat1Elem3.sections,
                'element sections');
            assert.equal(newElem.content, instance.categories[0].data[1], 'element content');
            expect(newElem.content.open).to.be.undefined;
        });
        it('should open the category after insertion', function() {
            var catArrow = document.querySelector('.up_pp_category-name');
            assert.equal(catArrow.getAttribute('class'), 'up_pp_category-name up_pftv_arrow-down', 'open class');
            assert.equal(instance.categories[0].open, true, 'category is open');
        });
        it('should keep the first added element closed and the others undefined', function() {
            var allElArrows = document.querySelectorAll('.up_pp_element-name');
            assert.equal(allElArrows[0].getAttribute('class'), 'up_pp_element-name up_pftv_arrow-right', 'close class');
            assert.equal(instance.categories[0].elements[0].content.open, false,
                'first element is still closed');

            assert.equal(allElArrows[1].getAttribute('class'), 'up_pp_element-name up_pftv_arrow-down', 'open class');
            assert.equal(allElArrows[2].getAttribute('class'), 'up_pp_element-name up_pftv_arrow-down', 'open class');
            expect(instance.categories[0].elements[1].content.open).to.be.undefined;
            expect(instance.categories[0].elements[2].content.open).to.be.undefined;
        });
    });

    describe('unsuccessfully adding an element with a duplicated id', function() {
        var addDuplicated = {
            category: "Anything here",
            id: 'ft_3',
            sections: [
                {
                    title: "Domain 10-13",
                    information: {
                        description: "Not provided"
                    }
                }
            ]
        };
        it('should not allow adding a duplicated id', function() {
            instance.addElement(addDuplicated);

            var allElArrows = document.querySelectorAll('.up_pp_element-name');
            assert.equal(allElArrows.length, 3, "still three elements");

            var allCatArrows = document.querySelectorAll('.up_pp_category-name');
            assert.equal(allCatArrows.length, 1, "still one category");
        });
    });

    describe('adding an element in a new category', function() {
        var addElem1Cat2 = {
            category: "Post translational modification",
            id: 'ft_4',
            sections: [
                {
                    title: "Modified residue",
                    information: {
                        description: "Phosphoserine; by CK1"
                    }
                }
            ]
        };
        var newElem;
        it('should add a new category', function() {
            newElem = instance.addElement(addElem1Cat2);
            assert.equal(instance.categories.length, 2, 'two categories');
            var allCats = document.querySelectorAll('.up_pp_category-container');
            assert.equal(allCats.length, 2, "two DOM categories");
            assert.equal(instance.categories[0].data.length, 3, 'three elements');
            assert.equal(instance.categories[1].data.length, 1, 'one elements');
        });
        it('should add a new element', function() {
            assert.equal(instance.categories[1].data[0].sortAttribute, addElem1Cat2.sections[0].title,
                'element title');
            assert.equal(instance.categories[1].data[0].id, addElem1Cat2.id,
                'element id');
            assert.equal(instance.categories[1].data[0].sections, addElem1Cat2.sections,
                'element sections');
            assert.equal(newElem.content, instance.categories[1].data[0], 'element content');
            expect(newElem.content.open).to.be.undefined;
        });
    });

    describe('removing the middle element in first category', function() {
        it('should remove the element', function() {
            var elTrashes = document.querySelectorAll('.up_pp_element-header .up-pp-icon-trash');
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, elTrashes[1]);
            elTrashes[1].dispatchEvent(evt); //close
            flushAllD3Transitions();

            assert.equal(instance.categories[0].data.length, 2, 'only two elements in data list now');
            assert.equal(instance.categories[0].elements.length, 2, 'only two elements in dom list now');
        });
        it('should remove the element in the DOM', function() {
            var elements = document.querySelectorAll('.up_pp_element-header');
            assert.equal(elements.length, 3, 'only 3 elements in total');
        });
    });

    describe('removing the first category', function() {
        it('should remove the category in the DOM', function() {
            var catTrashes = document.querySelectorAll('.up_pp_category-header .up-pp-icon-trash');
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, catTrashes[0]);
            catTrashes[0].dispatchEvent(evt); //close
            flushAllD3Transitions();

            var categories = document.querySelectorAll('.up_pp_category-header');
            assert.equal(categories.length, 1, 'only 1 category in total');
        });
        it('should remove the category in the data', function() {
            assert.equal(instance.categories.length, 1, 'only 1 category now');
            assert.equal(instance.categories[0].data.length, 1, 'only 1 element in data list now');
            assert.equal(instance.categories[0].elements.length, 1, 'only 1 element in dom list now');
        })
    });
});

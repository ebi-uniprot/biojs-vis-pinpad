// if you don't specify a html file, the sniper will generate a div
var appDiv = document.createElement('div');
yourDiv.appendChild(appDiv);

var addDiv = document.createElement('div');
yourDiv.appendChild(addDiv);
var addButton = document.createElement('button');
addButton.innerHTML = "Add element";
addDiv.appendChild(addButton);

var app = require("biojs-vis-pinpad");
var instance = new app({
    el: appDiv
    , width: '250px'
    , height: '300px'
    , highlightColor: 'green'
    , text: 'biojs'
});

var toAdd = [site671, site580, catPTM, site342, site425];
addButton.onclick = function() {
    if (toAdd.length != 0) {
        var elem = toAdd.shift();
        instance.addElement(elem);
    } else {
        console.log('No more test elements to add');
    }
};

// if you don't specify a html file, the sniper will generate a div
var appDiv = document.createElement('div');
yourDiv.appendChild(appDiv);

var addDiv = document.createElement('div');
yourDiv.appendChild(addDiv);
var addButton = document.createElement('button');
addButton.innerHTML = "Add element";
addDiv.appendChild(addButton);

var removeDiv = document.createElement('div');
yourDiv.appendChild(removeDiv);
var idText = document.createElement('textarea');
idText.rows = 1;
idText.cols = 10;
removeDiv.appendChild(idText);
var removeButton = document.createElement('button');
removeButton.innerHTML = "Remove element";
removeDiv.appendChild(removeButton);

var app = require("biojs-vis-pinpad");
var instance = new app({
    ordering: ['type', 'start', 'end'],
    options: {
        el: appDiv
        , width: '220px'
        , height: '320px'
        , highlightColor: 'green'
    }
});

var toAdd = [site671, site580, catPTM, site342, site425, variant];
addButton.onclick = function() {
    if (toAdd.length != 0) {
        var elem = toAdd.shift();
        instance.addElement(elem);
    } else {
        console.log('No more test elements to add');
    }
};

removeButton.onclick = function() {
    console.log('removeButton.onclick');
    console.log(idText);
    var text = idText.value;
    if (text.length !== 0) {
        instance.removeElement(text);
    }
};

instance.dispatcher.on('duplication', function(obj) {
    console.log('Element already exist');
    console.log(obj);
});

instance.dispatcher.on('add', function(obj) {
    console.log('Something added');
    console.log(obj);
});

instance.dispatcher.on('remove', function(obj) {
    console.log('Something removed');
    console.log(obj);
});

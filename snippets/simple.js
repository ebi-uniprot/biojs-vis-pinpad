// if you don't specify a html file, the sniper will generate a div
var app = require("biojs-vis-pinpad");
var instance = new app({
    el: yourDiv
    , width: '200px'
    , toPin: {
        category: "Domains & sites"
    }
    , text: 'biojs'
});

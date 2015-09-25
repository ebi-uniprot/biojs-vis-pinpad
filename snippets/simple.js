// if you don't specify a html file, the sniper will generate a div
var app = require("biojs-vis-pinpad");
var instance = new app({
    el: yourDiv
    , width: '250px'
    , toPin: {
        category: "Domains & sites",
        sections: [
            {
                title: "Site 671-672",
                information: {
                    description: "Cleavage; by beta-secretase",
                    position: "671-672",
                    more_information: ["info1", "info2"],
                    even_more: {
                        title: "See also",
                        other: "this information",
                        more: "more info"
                    },
                    and_more: {
                        anything: "See as well",
                        what: ["here", "there"]
                    }
                }
            }
        ]
    }
    , text: 'biojs'
});
instance.addElement({
    category: "Domains & sites"
});
instance.addElement({
    category: "PTM"
});

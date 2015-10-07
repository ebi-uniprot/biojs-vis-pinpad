// if you don't specify a html file, the sniper will generate a div
var app = require("biojs-vis-pinpad");
var instance = new app({
    el: yourDiv
    , width: '250px'
    , height: '300px'
    , toPin: {
        category: "Domains & sites",
        sections: [
            {
                title: "Site 671-672",
                information: {
                    string: "Cleavage; by beta-secretase",
                    number: 5,
                    boolean: true,
                    link: {
                        value: "any text",
                        link: "https://wwwdev.ebi.ac.uk/uniprot/services/rest/uniprot/features/P05067"
                    },
                    primitive_array: ["info1", "info2", 3, 2, false],
                    mixed_array: [
                        {
                            value: "one",
                            link: "https://wwwdev.ebi.ac.uk/uniprot/services/rest/uniprot/features/P05067"
                        }, "two",
                        {
                            value: "three",
                            link: "https://wwwdev.ebi.ac.uk/uniprot/services/rest/uniprot/features/P05067"
                        }
                    ],
                    styled_elem: {
                        key: "Styled element",
                        key_style: "text-align: right; background-color: green; color: blue;",
                        value: "Primitive",
                        value_style: "background-color: blue; color: green;"
                    },
                    styled_array: {
                        key: "Styled array",
                        key_style: "text-align: right; background-color: pink; color: purple;",
                        value: ["elem1", 2, true],
                        value_style: "background-color: purple; color: pink;"
                    },
                    styled_link: {
                        key: "Styled link",
                        value: {
                            value: "click me!",
                            link: "https://wwwdev.ebi.ac.uk/uniprot/services/rest/uniprot/features/P05067"
                        }
                    },
                    styled_link_array: {
                        key: "Styled mixed array",
                        value: [
                            {
                                value: "click me once!",
                                link: "https://wwwdev.ebi.ac.uk/uniprot/services/rest/uniprot/features/P05067"
                            },
                            {
                                value: "click me twice!",
                                link: "https://wwwdev.ebi.ac.uk/uniprot/services/rest/uniprot/features/P05067"
                            },"do not click me!"
                        ]
                    },
                    subsection_one: {
                        title: "Subsection title",
                        information: {
                            primitive: "String",
                            array: [1, 2, 3]
                        }
                    },
                    complex_object: {
                        key: "value",
                        number_key: 3,
                        array: [1, 2, 3],
                        link: {
                            value: "text",
                            link: "https://wwwdev.ebi.ac.uk/uniprot/services/rest/uniprot/features/P05067"
                        },
                        links: [
                            {
                                value: "text2",
                                link: "https://wwwdev.ebi.ac.uk/uniprot/services/rest/uniprot/features/P05067"
                            },
                            {
                                value: "text3",
                                link: "https://wwwdev.ebi.ac.uk/uniprot/services/rest/uniprot/features/P05067"
                            }
                        ],
                        no_more: "better not to add more levels"
                    },
                    complex_array: [
                        {question: "how does it look?"}, {answer: "a bit weird maybe?"}, "should we stop now?"
                        , ["maybe", "we", "should"]
                    ]
                }
            },
            {
                title: "LSS information",
                information: {
                    frequency: 0.005,
                    subsection_one: {
                        title: "LSS subsection",
                        information: {
                            primitive: "String",
                            array: [1, 2, 3]
                        }
                    }
                }
            }
        ]
    }
    , text: 'biojs'
});
instance.addElement({
    category: "Domains & sites",
    sections: [
        {
            title: "Site 580",
            information: {
                frequency: 0.005,
                subsection_one: {
                    title: "Any subsection",
                    information: {
                        description: "Anything here"
                    }
                }
            }
        }
    ]
});
instance.addElement({
    category: "Domains & sites",
    sections: [
        {
            title: "Site 342",
            information: {
                anything: 0.005
            }
        }
    ]
});
instance.addElement({
    category: "Domains & sites",
    sections: [
        {
            title: "Site 425",
            information: {
                something: 0.005
            }
        }
    ]
});
instance.addElement({
    category: "PTM",
    sections: []
});

var site671 = {
    category: "Domains & sites",
    id: 'ft_14',
    ordering: {
        type: 'Site',
        start: 671,
        end: 672
    },
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
};

var site580 = {
    category: "Domains & sites",
    id: 'ft_18',
    ordering: {
        type: 'Site',
        start: 680,
        end: 680
    },
    sections: [
        {
            title: "Site 680",
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
};

var site342 = {
    category: "Domains & sites",
    id: 'ft_1',
    ordering: {
        type: 'Site',
        start: 342,
        end: 342
    },
    sections: [
        {
            title: "Site 342",
            information: {
                anything: 0.005
            }
        }
    ]
};

var site425 = {
    category: "Domains & sites",
    id: 'ft_1',
    ordering: {
        type: 'Site',
        start: 425,
        end: 425
    },
    sections: [
        {
            title: "Site 425",
            information: {
                something: 0.005
            }
        }
    ]
};

var catPTM = {
    category: "PTM",
    id: 'ft_123',
    ordering: {
        type: 'res_mod'
    },
    sections: [
        {
            title: "Any PTM with a really long title",
            information: {
                something: 0.005
            }
        }
    ]
};
var variant = {
    "category": "Variants",
    "id": "ft_206",
    ordering: {
        type: 'missense',
        start: 301,
        end: 301
    },
    "sections": [{
        "title": "missense 301-301",
        "information": {
            "source": "Large scale studies",
            "description": "primary tissue(s): large intestine",
            "mutation": "R > G",
            "polyphen": "probably damaging, score 0.9309999942779541",
            "sift": "deleterious, score 0",
            "styled_evidence_1": {
                "key": "Evidence",
                "key_style": "background-color: #E8E8E8",
                "value": "Imported",
                "value_style": "background-color: #E8E8E8"
            },
            "styled_evidenceArray_cosmic_1": {
                "key": "cosmic",
                "key_style": "text-align: right; background-color: #F0F0F0",
                "value": [{
                    "value": "COSM1413501",
                    "link": "http://cancer.sanger.ac.uk/cosmic/mutation/overview?id=1413501"
                }],
                "value_style": "background-color: #F0F0F0"
            },
            "styled_evidenceArray_cosmic_study_1": {
                "key": "cosmic_study",
                "key_style": "text-align: right; background-color: #F0F0F0",
                "value": [{
                    "value": "COSU:376",
                    "link": "http://cancer.sanger.ac.uk/cosmic/study/overview?study_id=376"
                }],
                "value_style": "background-color: #F0F0F0"
            }
        }
    }]
};
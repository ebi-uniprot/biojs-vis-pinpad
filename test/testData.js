var TestData = function() {
    this.addCat1Elem1 = {
        category: "Domains & sites",
        id: 'ft_1',
        ordering: {type: 'region', start: 181, end: 188},
        sections: [
            {
                title: "Region of interest 181-188",
                information: {
                    description: "Zinc-binding"
                }
            }
        ]
    };
    this.addCat1Elem2 = {
        category: "Domains & sites",
        id: 'ft_2',
        ordering: {type: 'site', start: 57, end: 57},
        sections: [
            {
                title: "Site 57-57",
                information: {
                    description: "Reactive bond"
                }
            }
        ]
    };
    this.addCat1Elem3 = {
        category: "Domains & sites",
        id: 'ft_3',
        ordering: {type: 'site', start: 1, end: 2},
        sections: [
            {
                title: "Site 1-2",
                information: {
                    description: "Cleavage; by beta-secretase"
                }
            }
        ]
    };
    this.addDuplicated = {
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
    this.addElem1Cat2 = {
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
    return this;
};

module.exports = TestData;
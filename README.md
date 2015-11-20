# biojs-vis-pinpad
A biojs component to pin information. The motivation behind it is being able to pin tooltips from the https://github.com/ebi-uniprot/biojs-vis-proteinFeaturesViewer. Ideally it should be flexible enough to accomodate any similar information. 
Note: This is an ongoing project on a pretty early stage, please be aware that this is under development, not ready to be use yet!

##Data structure
This component is inteded to be flexible enough so other components can use it. In order to get such flexibility, a data structure has been defined to cover as many cases as possible. In theory, the component should be able to handle sub-sections within sub-section but it has only be tested up to one sub-section level.

###Component initialization
```
{
  ordering: [] //array of strings
  , options: {
    el: object //this component will be append to it    
    , height: number //in pixels of percentage, 500px by default
    , width: number //in pixels or percentage, 250px by default
    , highlightColor: color //used to highlight the most recently pinned element with a shade effect, green by default
  }
  , toPin: object //element to pin, see description below
}
```

###Instantiation example
```
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
```

###Elements to pin

Pinned elementes will be organized in a table. Pinned data will have "keys" and "values", "keys" will be capitalized and displayed on the left column while "values" will be displayed on the right column. Multiple sections are allowed, section titles will be displayed in two columns with a darker background. Somo styling can be specified too.

Any field with an _# can be replaced by any valid JSON key name, any other key should appear as it is shown.
```
{
  category: String //mandatory, used to grouped pinned elements
  , id: String //unique id, no duplicated ids are allowed
  , ordering: {
    //one field for each stringspecified in the ordering element on instantiation
  }
  , sections: {
    title: String //will be displayed with a darker background
    , information: {
      key_1: value //String or number will be directly displayed
      , key_2: {
        value: String //will be wrapped as an HTML link
        , link: URL 
      }
      , key_3: [] //elements in arrays will be separated by commas, elements can be any combination of Strings, numbers or pairs (value, link)
      , styled_key_1: {
        key: String //will be displayed on the left column
        , key_right: boolean //if true, then the key will be moved to the value column
        , key_style: style string //optional
        , value: String/Number/Pair of (value, link))/Array
        , value_style: style string//optional
      } 
    }
  }
}
```

###Element to pin example
```
{
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
                "key_right": true,
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
}
```

###More examples
Please see the data provided for the snippets at https://github.com/ebi-uniprot/biojs-vis-pinpad/tree/master/snippets/data

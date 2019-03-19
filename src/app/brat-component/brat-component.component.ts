import { Component, OnInit } from '@angular/core';
//import { BratFrontendEditor } from '../../../libs/brat-frontend2/brat-frontend-editor';
declare const require: any;

var BratFrontendEditor: any;
require('libs/brat-frontend2/brat-frontend-editor')

@Component({
  selector: 'app-brat-component',
  templateUrl: './brat-component.component.html',
  styleUrls: ['./brat-component.component.css']
})
export class BratComponentComponent implements OnInit {
  private brat: any;
  private windowBrat: any;

  constructor() { }

  ngOnInit() {
    let elem = document.getElementById("test");
    let collData = {"messages": [],
    "items": [],
    "ui_names":{
        "entities":"annotation",
        "events":"événements",
        "relations":"relations",
        "attributes":"attributs"
    },
    "search_config": [
        ["Google", "http://www.google.com/search?q=%s"],
        ["Wikipedia", "http://en.wikipedia.org/wiki/Special:Search?search=%s"],
        ["UniProt", "http://www.uniprot.org/uniprot/?sort=score&query=%s"],
        ["EntrezGene", "http://www.ncbi.nlm.nih.gov/gene?term=%s"],
        ["GeneOntology", "http://amigo.geneontology.org/cgi-bin/amigo/search.cgi?search_query=%s&action=new-search&search_constraint=term"],
        ["ALC", "http://eow.alc.co.jp/%s"]
    ],
    "disambiguator_config": [],
    "unconfigured_types":[
        {
            "borderColor":"darken",
            "arrowHead":"triangle,5",
            "name":"Cause",
            "color":"#007700",
            "labels":[
                "Cause"
            ],
            "unused":true,
            "bgColor":"lightgreen",
            "type":"Cause",
            "fgColor":"black"
        }
    ],
    "entity_types": [
        {
            "name": "Person",
            "type"   : "Person",
            "labels" : ["Per", "P"],
            "bgColor": "#FE2E2E",
            "borderColor": "darken",
            "unused": false,
            "attributes": [
                "Notorious", "Polarity"
            ],
            "arcs": [{
                "arrowHead": "triangle,5",
                "color": "black",
                "labels": ["Ennemy", "Enn"],
                "dashArray": ",",
                "hotkey": "T",
                "type": "Ennemy",
                "targets": ["Person"]
            },
                {
                    "arrowHead": "triangle,5",
                    "color": "black",
                    "labels": ["Friend", "Fr"],
                    "dashArray": ",",
                    "hotkey": "T",
                    "type": "Friend",
                    "targets": ["Person"]
                },
                {
                    "arrowHead": "triangle,5",
                    "color": "black",
                    "labels": ["Destruction", "Dest"],
                    "dashArray": ",",
                    "hotkey": "T",
                    "type": "Destruction",
                    "targets": ["Object", "Person"]
                }],
            "children": [
                {
                    "name": "Child",
                    "type"   : "Child",
                    "labels" : ["Child", "Child"],
                    "bgColor": "#FE2E2E",
                    "borderColor": "darken",
                    "children": [
                        {
                            "name": "Baby",
                            "type"   : "Baby",
                            "labels" : ["Baby", "Baby"],
                            "bgColor": "#DF7401",
                            "borderColor": "darken",
                            "children": []
                        },
                        {
                            "name": "Kid",
                            "type"   : "Kid",
                            "labels" : ["Kid", "Kid"],
                            "bgColor": "#FE2E2E",
                            "borderColor": "darken",
                            "children": []
                        }
                    ]
                }
            ]
        },
        //null, //will produde <hr> between entity groups or single entities but generate bugs with current code
        {
            "name": "Object",
            "type"   : "Object",
            "labels" : ["Object", "Obj"],
            "bgColor": "#7fa2ff",
            "borderColor": "darken",
            "attributes": [],
            "children": [],
            "unused": false,
            "arcs": [{
                "arrowHead": "triangle,5",
                "color": "black",
                "labels": ["Destruction", "Dest"],
                "dashArray": ",",
                "hotkey": "T",
                "type": "Destruction",
                "targets": ["Object", "Person"]
            }]
        }],
    "event_attribute_types": [
        {
            "labels": null,
            "type":"Confidence",
            "name":"Confidence",
            "unused":false,
            "values":{
                "Certain":{
                    "dashArray":","
                },
                "Likely":{
                    "dashArray":"3,3"
                },
                "Possible":{
                    "dashArray":"3,6"
                }
            }
        },
        {
            "labels": null,
            "type":"BombType", //Renaud, make sure type has no space in it, it is used as a jquery selector class
            "name":"BombType",
            "unused":false,
            "values":{
                "Nuclear bomb": {},
                "Neutron bomb": {},
                "Napalm bomb": {},
                "Hydrogen bomb": {}
            }
        },
        {
            "name": "Epic",
            "type"  : "Epic",
            "values": { "Epic": { "glyph": "★★★" } }
        }
    ],
    "entity_attribute_types": [
        {
            "name": "Notorious",
            "type"  : "Notorious",
            "values": { "Notorious": { "glyph": "★" } }
        },
        {
            "type": "Polarity",
            "name": "Polarity",
            "values": {
                "Positive": {
                    "box": "none",
                    "glyph": "\n[Polarity:true]",
                    "dashArray": "1,2"
                },
                "Negative": {
                    "box": "crossed",
                    "glyph": "\n[Polarity:false]",
                    "dashArray": "3,4"
                }
            }
        }
    ],
    "relation_attribute_types": [
        {
            "labels": null,
            "type":"RelConfidence",
            "name":"Relation Confidence",
            "unused":false,
            "values":{
                "Certain":{
                    "dashArray":","
                },
                "Likely":{
                    "dashArray":"3,3"
                },
                "Possible":{
                    "dashArray":"3,6"
                }
            }
        },
        {
            "name": "Safe",
            "type"  : "Safe",
            "values": { "Safe": {} }
        }
    ],
    "relation_types": [
        {
            "type"     : "Destruction",
            "labels"   : ["Destruction", "Dest"],
            "dashArray": "3,3",
            "color"    : "purple",
            "args"     : [
                {"role": "Destructor", "targets": ["Person", "Object"] },
                {"role": "Destroyed",  "targets": ["Person", "Object"] }
            ]
        },
        {
            "type"     : "Friend",
            "labels"   : ["Friend", "Fr"],
            "dashArray": "3,3",
            "color"    : "purple",
            "attributes": [
                "RelConfidence", "Safe"
            ],
            "args"     : [
                {"role": "From", "targets": ["Person"] },
                {"role": "To",  "targets": ["Person"] }
            ]
        },
        {
            "type"     : "Ennemy",
            "labels"   : ["Ennemy", "Enn"],
            "dashArray": "3,3",
            "color"    : "purple",
            "args"     : [
                {"role": "From", "targets": ["Person"] },
                {"role": "To",  "targets": ["Person"] }
            ]
        },
        {
            "type"     : "Perpetrator",
            "labels"   : ["Perpetrator", "Perp"],
            "dashArray": "3,3",
            "color"    : "purple",
            "args"     : [
                {"role": "From", "targets": ["Assassination"] },
                {"role": "To",  "targets": ["Person"] }
            ]
        }
    ],
    "event_types": [
        {
            "name": "Assassination",
            "type"   : "Assassination",
            "labels" : ["Assassination", "Assas"],
            "bgColor": "lightgreen",
            "borderColor": "darken",
            "attributes": [
                "Epic"
            ],
            "children": [],
            "unused": false,
            "arcs"   : [
                {
                    "type": "Victim",
                    "labels": [
                        "Victim",
                        "Vict"
                    ],
                    targets: [
                        "Person"
                    ],
                },
                {
                    "type": "Perpetrator",
                    "labels": [
                        "Perpetrator",
                        "Perp"
                    ],
                    targets: [
                        "Person"
                    ],
                    "color": "green"
                }
            ]
        },
        {
            "name": "Bomb",
            "type"   : "Bomb",
            "labels" : ["Bomb", "Bomb"],
            "bgColor": "gold",
            "borderColor": "darken",
            "attributes": [
                "BombType"
            ],
            "children": [],
            "unused": false,
            "arcs"   : [
                {
                    "type": "Destroyed",
                    "labels": ["Destroyed","Dest"],
                    "color": "gold"
                }
            ]
        },
        {
            "name": "Resurrection",
            "type"   : "Resurrection",
            "labels" : ["Resurrection", "Resur"],
            "bgColor": "magenta",
            "borderColor": "darken",
            "attributes": [
                "Epic", "Confidence"
            ],
            "children": [],
            "unused": false,
            "arcs"   : [
                {
                    "type": "Resurrected",
                    "labels": ["Resurrected","Resur"],
                    "color": "magenta"
                },
                {
                    //"arrowHead": "triangle,5",
                    //"dashArray": ",",
                    //"hotkey": "T",
                    //"targets": [],
                    "type": "Savior",
                    "labels": ["Savior","Sav"],
                    "color": "magenta"
                }
            ]
        }
    ] };

    let docData = {"messages": [],
    "source_files": ["ann", "txt"],
    "modifications": [],
    "normalizations": [],
    "ctime": 1351154734.5055847,
    "text"     : "Ed O'Kelley was the man who shot the man who shot Jesse James.\nJ'ai lancé une bombe nucléaire sur Simon, Gustav et Pavel... sans raison particulière. Nos trois comparses se ne pouvant se venger sont allés directement au Paradis. Cette histoire est vraie. Ceci est la fin du paragraphe.\n Ceci est le second paragraphe. C'est l'histoire du petit castor le plus petit, mais le plus fort.",
    "entities" : [
        ["N1", "Person", [[0, 2], [5, 11]]], //TODO, name text-bound annotations Tn to be coherent with standoff brat format http://brat.nlplab.org/standoff.html
        ["N2", "Person", [[20, 55], [55, 90], [90,124]]],
        ["N3", "Person", [[37, 40]]],
        ["N4", "Object", [[78, 83], [84, 93]]],
        ["N5", "Person", [[98, 104]]],
        ["N6", "Person", [[105, 111]]],
        ["N7", "Person", [[115, 120]]],
        ["N8", "Person", [[50, 61]]]
    ],
    "attributes": [
        ["A1", "Notorious", "N4"],
        ["A2", "Polarity", "N1", "Positive"],
        ["A3", "Polarity", "N2", "Negative"],
        ["A4", "Epic", "T1"],
        ["A5", "Safe", "R1"]//Relation attributes ignored by client at this point
    ],
    "relations": [
        // ["R1", "Friend", [["From", "N2"], ["To", "N1"]]]
    ],
    "triggers": [
        // ["T1", "Assassination", [[45, 49]]],
        // ["T2", "Resurrection", [[28, 32]]],
        // ["T3", "Bomb", [[78, 93]]]
    ],
    "events": [
        // ["E1", "T1", [["Perpetrator", "N3"], ["Victim", "N8"]]],
        // ["E2", "T2", [["Savior", "N2"], ["Resurrected", "N3"]]],
        // ["E3", "T3", [["Destroyed", "N5"], ["Destroyed", "N6"], ["Destroyed", "N7"]]]
    ],
    "comments":[
        ["N1", "AnnotatorNotes", "test comment"]
    ] };

    let options = {
      'ajax': 'local', //local(default), normal, external(Handle all 'ajax' actions by yourself)
    };
    //console.log(this.brat.dispatcher);
    this.brat = new (<any>window).BratFrontendEditor(elem, collData, docData, options);
    console.log(this.brat);
    if(this.brat.dispatcher == null || this.brat.dispatcher === undefined) {
      console.log('Brat dispatcher undefined!, setting to window dispatcher. ');

      //this.brat.dispatcher = (<any>window).Dispatcher;
      let temp = (<any>window).Dispatcher;
      this.brat.dispatcher = new temp();
    }
    let dispatcher = this.brat.dispatcher;

    console.log(dispatcher);

    this.brat.dispatcher.on('ajax', (data, callback, merge) => this.onExternalAjaxActions(data, callback, merge));
    this.brat.dispatcher.on('local-ajax-begin', this.onBeforeLocalAjaxActions);
    this.brat.dispatcher.on('local-ajax-done', this.onAfterLocalAjaxActions);
  }

  private onExternalAjaxActions(data, callback, merge) {
    // You could manage all data transformations externally (from Ng2 App)
    // Set option.ajax: 'external' first
    // Following will "work"(no span will actually be created) for createSpan action
    // All actions must be implemented externally if option.ajax=external
    this.brat.dispatcher.post('spin');
    let response = {};

    switch(data.action){
      case "createSpan":
        response = {
          action: data.action,
          annotations: {
            "source_files": data.document.source_files,
            "modifications": data.document.modifications,
            "normalizations": data.document.normalizations,
            "text": data.document.text,
            "entities" : data.document.entities,
            "attributes": data.document.attributes,
            "relations": data.document.relations,
            "triggers": data.document.triggers,
            "events": data.document.events
          },
          edited: [[data.origin], [data.target]],
          messages: [],
          protocol: 1
        };
        break;
      case "getDocument":
      case "loadConf":
      case "getCollectionInformation":
      case "createArc":
      case "deleteArc":
      case "reverseArc":
      case "deleteSpan":
      case "deleteFragmentxyz?":
      case "splitSpan":
      case "tag":
      case "login":
      case "logout":
      case "whoami":
      case "normGetName":
      case "normSearch":
      case "suggestSpanTypes":
      case "importDocument":
      case "deleteDocument":
      case "deleteCollection":
      case "undo":
      case "normData":
      case "InDocument":
      case "InCollection":
      case "storeSVG":
      case "getDocumentTimestamp":
      case "saveConf":
      default:
        console.log("Not yet supported externally");
        break;
    }

    this.brat.dispatcher.post(0, callback, [response]);
    this.brat.dispatcher.post('unspin');
  }

  onBeforeLocalAjaxActions(data, callback, merge){
    // Right before any local_ajax.js actions
  }

  onAfterLocalAjaxActions(response, callback, merge){
    // Right after any local_ajax.js actions
  }

}
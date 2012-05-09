﻿{        var DEBUG = true;main();        function main(){             var doc  = createDoc();    var dp = doc.documentPreferences;    var mp = doc.marginPreferences;    var styles  = createStyles(doc);    var tf = doc.pages.item(0).textFrames.add({        geometricBounds:[mp.top,mp.left,dp.pageHeight - mp.bottom, dp.pageWidth - mp.right]        });    var FileString = readinFile();    tf.contents = FileString;    DumbRunPages (doc, tf.parentStory, 0);    for (var i = doc.textFrames.length - 1; i >= 0; i--) {      doc.textFrames[i].paragraphs.everyItem().applyParagraphStyle(doc.paragraphStyles.item("body"));    };    DumbRunPages (doc, tf.parentStory, 0);     markdown(doc,styles);    };function readinFile(){          // var textFile = File.openDialog("Select a text file to import.", "*.*",false);  // var path = ((new File($.fileName)).path);// var textFile = File( path+"/world_geo_json/" + THESELECTEDFILENAME);var textFile = File(File.openDialog ("select your .md file","*.*",false));      if (textFile != null) {        var textLines = new Array();        textFile.open("r", "TEXT", "????");        while (!textFile.eof){                    textLines[textLines.length] = textFile.readln();                      }                 textFile.close();                   }            if(!textLines){                return;                }             var str = textLines.join("\r");                   // var reg = new RegExp("\n|\r","g");            // str.replace (reg, " ");            // alert(str);            // var obj = eval("(" + str + ")"); // evaluate the JSON code        return str;               };function createStyles(theDoc){var parStyles = {  "styles":[       {"name":"h1" ,"appliedFont":app.fonts.item(47)/* Calluna reg */ ,  "pointSize":23, "basedOn":theDoc.paragraphStyles.item(0)},      {"name":"h2"   /*,"appliedFont":app.fonts.item(94) */,      "pointSize":17, "basedOn":theDoc.paragraphStyles.item(1)},      {"name":"h3"   /*,"appliedFont":app.fonts.item(94)  */,     "pointSize":16, "basedOn":theDoc.paragraphStyles.item(1)},      {"name":"h4"   /*,"appliedFont":app.fonts.item(94)  */,     "pointSize":15, "basedOn":theDoc.paragraphStyles.item(1)},      {"name":"h5"   /*,"appliedFont":app.fonts.item(94)  */,     "pointSize":15, "basedOn":theDoc.paragraphStyles.item(1)},      {"name":"h6"   /*,"appliedFont":app.fonts.item(94) */ ,     "pointSize":15, "basedOn":theDoc.paragraphStyles.item(1)},      {"name":"body"  ,"appliedFont":app.fonts.item(47)  ,   "pointSize":13, "basedOn":theDoc.paragraphStyles.item(0)},      {"name":"ul"  /* ,"appliedFont":app.fonts.item(92)  */,     "pointSize":13, "basedOn":theDoc.paragraphStyles.item("body")},      {"name":"ol"  /* ,"appliedFont":app.fonts.item(92) */ ,     "pointSize":13, "basedOn":theDoc.paragraphStyles.item("body")},            {     "name":"blockquote" ,            "appliedFont":app.fonts.item(47) ,            "pointSize":12 , "basedOn":theDoc.paragraphStyles.item(0),            "leftIndent":5         }      ],     };var charStyles = {  "styles":[       {"name":"strong" ,"appliedFont":app.fonts.item(47)/* bold *//* ,  "pointSize":23 , "basedOn":theDoc.paragraphStyles.item(0) */},      {"name":"em" ,"appliedFont":app.fonts.item(47)/* bold *//* ,  "pointSize":23 , "basedOn":theDoc.paragraphStyles.item(0) */},      {"name":"code" ,"appliedFont":app.fonts.item(47)/* bold *//* ,  "pointSize":23 , "basedOn":theDoc.paragraphStyles.item(0) */}      ],     };for(var i in parStyles.styles){try{theDoc.paragraphStyles.add(parStyles.styles[i]);}catch(e){ if(DEBUG)alert(e + "\n" + i);};};for(var i in charStyles.styles){try{theDoc.characterStyles.add(charStyles.styles[i]);}catch(e){ if(DEBUG)alert(e + "\n" + i);};};var code = build_code_paragraphStyle(theDoc);var styles ={/* Par styles*/  "h1"    :theDoc.paragraphStyles.item("h1"),  "h2"    :theDoc.paragraphStyles.item("h2"),  "h3"    :theDoc.paragraphStyles.item("h3"),  "h4"    :theDoc.paragraphStyles.item("h4"),  "h5"    :theDoc.paragraphStyles.item("h5"),  "h6"    :theDoc.paragraphStyles.item("h6"),  "ol"    :theDoc.paragraphStyles.item("ol"),  "ul"    :theDoc.paragraphStyles.item("ul"),  "code"  :theDoc.paragraphStyles.item("code"),  "blockquote"  :theDoc.paragraphStyles.item("blockquote"),/* char styles*/  "strong":theDoc.characterStyles.item("strong"),  "em"    :theDoc.characterStyles.item("em"),  "code"  :theDoc.characterStyles.item("code")};return styles;};function createDoc () {  var doc = app.documents.add({facingPages:true, documentPreferences:{pageWidth:210,pageHeight:297}})  doc.gridPreferences.baselineDivision = "15pt";  doc.viewPreferences.properties = {  horizontalMeasurementUnits: MeasurementUnits.MILLIMETERS,  verticalMeasurementUnits:MeasurementUnits.MILLIMETERS  };  doc.marginPreferences.properties = {    top:20,    left:25,    bottom:42,    right:25  };  var mp = doc.marginPreferences;  doc.documentPreferences.properties = {  // pageWidth : mp.pw,  // pageHeight : mp.ph,  documentBleedBottomOffset : 3,  documentBleedTopOffset : 3,  documentBleedInsideOrLeftOffset : 3,  documentBleedOutsideOrRightOffset : 3  };var msp1 = doc.masterSpreads.item(0).pages.item(0);// edit the masterspreads  msp1.marginPreferences.properties = {    right:mp.right,    top:mp.top,    left:mp.left,    bottom:mp.bottom    // columnGutter:mp.gutter,  };  var msp2 = doc.masterSpreads.item(0).pages.item(1);//edit the other masterspred  msp2.marginPreferences.properties = {    right:mp.right,    top:mp.top,    left:mp.left,    bottom:mp.bottom  // columnGutter:mp.gutter,  };  return doc;};// you can use ths solo// alert($.fileName);// var d = app.documents.add();// var par = build_code_paragraphStyle(d);function build_code_paragraphStyle(d){var charStyles = new Array();var keywords = d.characterStyles.add(   {name:"keywords",   fillColor:d.swatches.item(5)});var comments = d.characterStyles.add(   {name:"comments",   fillColor:d.swatches.item(6)});var operators = d.characterStyles.add(  {name:"operators",  fillColor:d.swatches.item(7)});var separators = d.characterStyles.add( {name:"separators", fillColor:d.swatches.item(8)});var numbers = d.characterStyles.add(    {name:"numbers",    fillColor:d.swatches.item(9)});var comment = d.characterStyles.add(    {name:"comment",    fillColor:d.swatches.item(9)});var string = d.characterStyles.add(     {name:"strings",    fillColor:d.swatches.item(5)});var code = d.paragraphStyles.add({name:"code",appliedFont:"DejaVu Sans Mono	Book"});//change language (only in the paragraphStyle) to get the right "" for the code    code.appliedLanguage = app.languagesWithVendors.item("English: USA")    var grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = keywords;        grp.grepExpression = "abstract|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|\sdo\s|double|else|enum|export|extends|false|final|finally|float|for|function|goto|if|implements|import|\sin\s|instanceof|int|interface|long|native|\snew\s|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var|void|volatile|while|with";                grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = keywords;        grp.grepExpression = "is|new|sizeof|typeof";                grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = operators;        grp.grepExpression = "[-~\\[\\]!$%&*+/:<=>?^|]+";                grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = separators;        grp.grepExpression = "[(){},;\\s]+";                grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = numbers;        grp.grepExpression = "\\<[0-9]+(\\.[0-9]+)?([eE][-+]?[0-9]+)?";                grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = comments;        grp.grepExpression = "/\\*+[^*]*\\*+([^/*][^*]*\\*+)*/";                                grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = comment;        grp.grepExpression = "//.*";                        grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = string;        grp.grepExpression = "\".*?\"";                   return code;                };/** * md 2 id  * by melchior-b bhttps://github.com/melchior-b * whole script is here * from here --> https://github.com/melchior-b/indesign-scripts  * */function markdown( theDoc, styles) {      var replacements = [  {     name:     'Heading 6',    find:     { "findWhat": '^#{6}(?!#)(.+?)$' },    change:   { "changeTo": "$1", "appliedParagraphStyle": styles.h6 }  },  {    name:     'Heading 5',    find:     { "findWhat": '^#{5}(?!#)(.+?)$' },    change:   { "changeTo": "$1", "appliedParagraphStyle": styles.h5 }  },  {    name:     'Heading 4',    find:     { "findWhat": '^#{4}(?!#)(.+?)$' },    change:   { "changeTo": "$1", "appliedParagraphStyle": styles.h4 }  },  {      name:     'Heading 3',    find:     { "findWhat": '^^#{3}(?!#)(.+?)$' },    change:   { "changeTo": "$1", "appliedParagraphStyle": styles.h3 }  },   {    name:     'Heading 2',    find:     { "findWhat": '^#{2}(?!#)(.+?)$' },    change:   { "changeTo": "$1", "appliedParagraphStyle": styles.h2 }  },   {    name:     'Heading 1',    find:     { "findWhat": '^#{1}(?!#)(.+?)$' },    change:   { "changeTo": "$1", "appliedParagraphStyle": styles.h1 }  },     {    name:     'Blockquote',    find:     { "findWhat": '^>(.+)$' },    change:   { "changeTo": "$1", "appliedParagraphStyle": styles.blockquote }  },   // {  //   name:     'Ordered List',  //   find:     { "findWhat": '^\\d+\\.\\s+(.+)$' },  //   change:   { "changeTo": "$1", "appliedParagraphStyle": styles.ol }  // },   {    name:     'Unordered List',    find:     { "findWhat": '^[-|+|*]{1}\\s(.+)$' },    change:   { "changeTo": "$1", "appliedParagraphStyle": styles.ul }  },   // {  //   name:     'Strong',  //   find:     { "findWhat": '__(.*?)__|\*\*(.*?)\*\*' },  //   change:   { "changeTo": '$1', "appliedCharacterStyle": styles.strong }  // },   // {  //   name:     'Emphasized',  //   find:     { "findWhat": '_([^_]+)_' },  //   change:   { "changeTo": '$1', "appliedCharacterStyle": styles.em }  // },   // {  //   name:     'Code',  //   find:     { "findWhat": '`([^_]+)`' },  //   change:   { "changeTo": '$1', "appliedCharacterStyle": styles.code }  // },   {    name:     'Line Breaks',    find:     { "findWhat": '\\s\\s' },    change:   { "changeTo": "\r" }  }];    var debug = [];    for(var i = 0; i < replacements.length; i++) {    var foundItems = runGrep(theDoc, replacements[i]);  app.findGrepPreferences   = NothingEnum.nothing;  app.changeGrepPreferences = NothingEnum.nothing;    debug.push(foundItems.length.toString() + 'x ' + replacements[i].name);  }    debug.sort();  debug.unshift('Markdown Replacements');  var message = debug.join("\n");    alert(message);};function runGrep(theDoc, options) {  app.findGrepPreferences.properties    = options.find;  app.changeGrepPreferences.properties  = options.change;    var foundItems = theDoc.changeGrep();    app.findGrepPreferences   = NothingEnum.nothing;  app.changeGrepPreferences = NothingEnum.nothing;    return foundItems;};/** * This is dumb run pages. (takes care of the overflow) */// by Dave Saunders// http://jsid.blogspot.de/2005/12/function-snippets.htmlfunction DumbRunPages(theDoc, theStory, mssp_id) {  	// What makes this "dumb" is that default master pages are used.  	var uRuler = theDoc.viewPreferences.rulerOrigin;  	theDoc.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;	while (theStory.textContainers[theStory.textContainers.length-1].overflows) {  		/* 		// Original: Seite nach der letzten Dokumentseite einfügen 		theDoc.documentPreferences.pagesPerDocument = theDoc.documentPreferences.pagesPerDocument + 1;  		var backPage = theDoc.pages[-1]; 		*/ 		 		//alternativ: Seite nach der letzten Textrahmenseite einfügen 		var backPage = theDoc.pages.add();        backPage.appliedMaster = theDoc.masterSpreads.item((mssp_id));		app.activeWindow.activePage = backPage;  //~ 		backPage.appliedMaster = theDoc.pages[-2].appliedMaster;  		var myPbounds = backPage.bounds;  		var myNewTF = backPage.textFrames.add();  		if ((backPage.name % 2 == 1) || (!theDoc.documentPreferences.facingPages)) {  			myNewTF.geometricBounds =   			[myPbounds[0] + backPage.marginPreferences.top,   			myPbounds[1] + backPage.marginPreferences.left,   			myPbounds[2] - backPage.marginPreferences.bottom,   			myPbounds[3] - backPage.marginPreferences.right];  		} else {  			myNewTF.geometricBounds =   			[myPbounds[0] + backPage.marginPreferences.top,   			myPbounds[1] + backPage.marginPreferences.right,   			myPbounds[2] - backPage.marginPreferences.bottom,   			myPbounds[3] - backPage.marginPreferences.left];  		}  		myNewTF.itemLayer = theStory.textContainers[theStory.textContainers.length-1].itemLayer;  		myNewTF.previousTextFrame = theStory.textContainers[theStory.textContainers.length-1];          		if (myNewTF.characters.length == 0){  			theDoc.viewPreferences.rulerOrigin = uRuler;  			alert("Permanently overset"); // This indicates a permanent overset condition so break out of loop              break;        }  	}  	theDoc.viewPreferences.rulerOrigin = uRuler;  };   }
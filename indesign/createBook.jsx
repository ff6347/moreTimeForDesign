﻿{    var DEBUG = true;main();        /** *  Main function without params *  evrything is in there * */ function main(){// ------------ the GREP FC Queries names are + .xml ------------var findChangeXMLs = new Array ();findChangeXMLs.push("md h1");findChangeXMLs.push("md h2");findChangeXMLs.push("md h3");findChangeXMLs.push("md h4");findChangeXMLs.push("md h5");findChangeXMLs.push("md h6");findChangeXMLs.push("md to bold 1");findChangeXMLs.push("md to bold 2");findChangeXMLs.push("md to code");findChangeXMLs.push("md to bq");findChangeXMLs.push("md to ul li");findChangeXMLs.push("md code tabstops");var findChangeIMAGEGrep = "md find images";var meta = loadFiles();// get the files from the folderif(meta == null){return};// if the user cancelsvar allMarkdownFiles = meta.files;// allMarkdownvar theFolder = meta.folder;// the folder where to workvar imageFolder = new Folder(theFolder.fsName+"/"+ "images");var allImages = imageFolder.getFiles("*.*");var IDtargetFolder = new Folder(theFolder.fsName +"/"+ "IDfiles");  if(!IDtargetFolder.exists){  IDtargetFolder.create();};var allDocs = new Array();// for the book// alert(allMarkdownFiles);// ------------ now loop the .md files ------------for (var i in allMarkdownFiles){var theFile = allMarkdownFiles[i];// File.openDialog ("select your .md file","*.*",false);// strip of the extensionvar nameExtensionless = allMarkdownFiles[i].name.substring(0, allMarkdownFiles[i].name.length-3);var doc  = createDoc(nameExtensionless);//a new doc with that namevar dp = doc.documentPreferences; // 4 better handlingvar mp = doc.marginPreferences; // 4 better handlingvar styles  = createStyles(doc); // create the styles var tf = doc.pages.item(0).textFrames.add({        geometricBounds:[mp.top,mp.left,dp.pageHeight - mp.bottom, dp.pageWidth - mp.right]        });// add the first textframe on page 0var FileString = readinFile(theFile);// read in data from the file    tf.contents = FileString; // push it into the textframe    DumbRunPages (doc, tf.parentStory, 0);// now run the pages so ther is no overflow// ------------ needs a basic par style ------------    for (var l = doc.textFrames.length - 1; l >= 0; l--) {      doc.textFrames[l].paragraphs.everyItem().applyParagraphStyle(doc.paragraphStyles.item("body"));    }; // close l loop     DumbRunPages (doc, tf.parentStory, 0);// run it again if it overflows now// ------------ Find change all markdown - this is a still a bit buggy ------------    for(var k = 0; k< findChangeXMLs.length; k++){      app.loadFindChangeQuery (findChangeXMLs[k], SearchModes.grepSearch);       app.activeDocument.changeGrep();        //Clear the find/change grep preferences.      app.findGrepPreferences = NothingEnum.nothing;      app.changeGrepPreferences = NothingEnum.nothing;    }; // close k loop    // this seems more buggy ;)     // markdown(doc,styles);     // now create a file in that folder and safe the doc into it     var theIDFile  = new File (IDtargetFolder.fsName + "/" + nameExtensionless + ".indd");     if(theIDFile.exists){      theIDFile.remove(); // we want to keep it clean and not overwrite     };      getImageNames(doc, allImages);     doc.save(theIDFile); // save the doc     // add that doc to a list     allDocs.push(doc);}; // close i loop// now make a bookvar theBookRef = new File(IDtargetFolder.fsName + "/" + "mt4dBook.indb");     if(theBookRef.exists){      theBookRef.remove();     };var theBook = app.books.add(theBookRef);// loop the docsfor (var j in allDocs) {    theBook.bookContents.add(allDocs[j].fullName); // add every doc to the book      };};function loadFiles(){// the function that loads the files      var theFolder = Folder.selectDialog ("Choose the FOLDER");// user select a folder  if(!theFolder){// if the folder is not a folder cancel the script    return;// this cancels the whole function image_loadFiles \(\)    }; // end foldr check  var theFileType = "*.md";// use only jpg  var allMarkdownFiles = null; // will hold the md files  try{// encapsulate in a try catch   allMarkdownFiles = theFolder.getFiles(theFileType);// get the files by type     }catch(e){// this is the error catcher       alert("Error with this:\n" +e);// e is what InDesign says       };// end catch  if((allMarkdownFiles.length < 1)||(allMarkdownFiles == null) ){// again if check if there are images    alert("There are no .md files");// hm something went wrong? User error    return null;// so we cancel the function          }else{  return {"files":allMarkdownFiles,"folder":theFolder};// give back the md files. Success!        };// end all images check  }function readinFile(theFile){          // var textFile = File.openDialog("Select a text file to import.", "*.*",false);  // var path = ((new File($.fileName)).path);// var textFile = File( path+"/world_geo_json/" + THESELECTEDFILENAME);var textFile = File(theFile); // File.openDialog ("select your .md file","*.*",false)      if (textFile != null) {        var textLines = new Array();        textFile.open("r", "TEXT", "????");        while (!textFile.eof){                    textLines[textLines.length] = textFile.readln();                      }                 textFile.close();                   }            if(!textLines){                return;                }             var str = textLines.join("\r");                   // var reg = new RegExp("\n|\r","g");            // str.replace (reg, " ");            // alert(str);            // var obj = eval("(" + str + ")"); // evaluate the JSON code        return str;               };function getImageNames(doc, allImages){for(var i =0; i < allImages.length;i++){    app.findTextPreferences = NothingEnum.nothing;    app.changeTextPreferences = NothingEnum.nothing;    app.findTextPreferences.findWhat = allImages[i].name;    var result = doc.findText();  for (var k = result.length-1; k >= 0; k--){        var ip = result[k].insertionPoints[0];    var pp = ip.parentStory.parent;    var target = pp.rectangles.add({                  geometricBounds:[0,0,100,100],                  label: allImages[i].name                  });      target.place(allImages[i]);    };  };};/** *  This creates the paragraph styles *  fine thing is it does that from an *  JSON Object * */ function createStyles(theDoc){var parStyles = {  "styles":[       {        "name":"h1" ,        "appliedFont":app.fonts.item(49)/* Calluna reg */       ,  "pointSize":23,       "basedOn":theDoc.paragraphStyles.item(0),       "alignToBaseline":true     },      {"name":"h2"   ,"appliedFont":app.fonts.item(49) ,      "pointSize":17,"alignToBaseline":true},      {"name":"h3"   ,"appliedFont":app.fonts.item(48) ,     "pointSize":16 ,"alignToBaseline":true},      {"name":"h4"   ,"appliedFont":app.fonts.item(48)  ,     "pointSize":15,"alignToBaseline":true },      {"name":"h5"   ,"appliedFont":app.fonts.item(47)  ,     "pointSize":15,"alignToBaseline":true},      {"name":"h6"   ,"appliedFont":app.fonts.item(47)  ,     "pointSize":15 ,"alignToBaseline":true},      {        "name":"body"  ,        "appliedFont":app.fonts.item(47)  ,        "pointSize":13 /* ,"basedOn":theDoc.paragraphStyles.item(0) */,        "justification":1818915700 /* left justified*/,        "firstLineIndent": 5,        "alignToBaseline":true      },      {"name":"ul"  ,"appliedFont":app.fonts.item(48),     "pointSize":11,"alignToBaseline":true},      {"name":"ol"   ,"appliedFont":app.fonts.item(48)  ,     "pointSize":11,"alignToBaseline":true},            {        "name":"blockquote" ,        "appliedFont":app.fonts.item(47) ,        "pointSize":12 , "basedOn":theDoc.paragraphStyles.item(0),        "justification":1818915700,/* left justified*/        "leftIndent":5,        "rightIndent":5,         }      ],     };  // ------------ CHARCTER STYLES ------------var charStyles = {  "styles":[       {"name":"strong"  ,"appliedFont":app.fonts.item(47)},      {"name":"em"      ,"appliedFont":app.fonts.item(47)},      {"name":"code"    ,"appliedFont":app.fonts.item(91)}      ],     };// ------------ loop the JSON objects ------------for(var i in parStyles.styles){try{theDoc.paragraphStyles.add(parStyles.styles[i]);}catch(e){ if(DEBUG)alert(e + "\n" + i +"\n"+ parStyles.styles[i].name);};};for(var i in charStyles.styles){try{theDoc.characterStyles.add(charStyles.styles[i]);}catch(e){ if(DEBUG)alert(e + "\n" + i+"\n"+ charStyles.styles[i].name);};};// ------------ this is a special style with nested Grep styles ------------var code = build_code_paragraphStyle(theDoc);// ------------ this is the styles object that comes back ------------var styles ={/* Par styles*/  "h1"    :theDoc.paragraphStyles.item("h1"),  "h2"    :theDoc.paragraphStyles.item("h2"),  "h3"    :theDoc.paragraphStyles.item("h3"),  "h4"    :theDoc.paragraphStyles.item("h4"),  "h5"    :theDoc.paragraphStyles.item("h5"),  "h6"    :theDoc.paragraphStyles.item("h6"),  "ol"    :theDoc.paragraphStyles.item("ol"),  "ul"    :theDoc.paragraphStyles.item("ul"),  "code"  :theDoc.paragraphStyles.item("code"),  "blockquote"  :theDoc.paragraphStyles.item("blockquote"),/* char styles*/  "strong":theDoc.characterStyles.item("strong"),  "em"    :theDoc.characterStyles.item("em"),  "code"  :theDoc.characterStyles.item("code")};return styles;};/** *  Creates our doc with lots of specs   * */function createDoc (theDocName) {var doc = app.documents.add({name:theDocName, facingPages:true, documentPreferences:{pageWidth:210,pageHeight:297}})    doc.gridPreferences.baselineDivision = "18pt";    doc.viewPreferences.properties = {    horizontalMeasurementUnits: MeasurementUnits.MILLIMETERS,    verticalMeasurementUnits:MeasurementUnits.MILLIMETERS    };    doc.marginPreferences.properties = {    top:20,    left:25,    bottom:42,    right:25  };var mp = doc.marginPreferences;    doc.documentPreferences.properties = {    documentBleedBottomOffset : 3,    documentBleedTopOffset : 3,    documentBleedInsideOrLeftOffset : 3,    documentBleedOutsideOrRightOffset : 3    };var msp1 = doc.masterSpreads.item(0).pages.item(0);// edit the masterspreads    msp1.marginPreferences.properties = {      right:  mp.right,      top:    mp.top,      left:   mp.left,      bottom: mp.bottom    // columnGutter:mp.gutter,    };var msp2 = doc.masterSpreads.item(0).pages.item(1);//edit the other masterspred  msp2.marginPreferences.properties = {    right:  mp.right,    top:    mp.top,    left:   mp.left,    bottom: mp.bottom  // columnGutter:mp.gutter,  };  return doc;};// you can use ths solo// alert($.fileName);// var d = app.documents.add();// var par = build_code_paragraphStyle(d);function build_code_paragraphStyle(d){var colkw   = color_add (d, "keywords", ColorModel.PROCESS,   [0,0,0,100]);var colcmnt = color_add (d, "comments", ColorModel.PROCESS,   [0,0,0,75]);var colop   = color_add (d, "operators", ColorModel.PROCESS,  [0,50,50,50]);var colsep  = color_add (d, "separators", ColorModel.PROCESS, [0,50,50,50]);var colnum  = color_add (d, "numbers", ColorModel.PROCESS,    [50,0,0,75]);// color_add (d, "comment", ColorModel.PROCESS,               [100,0,75,0]);var colstr  = color_add (d, "strings", ColorModel.PROCESS,    [0,0,00,100]);var charStyles = new Array();var keywords    = d.characterStyles.add({name:"keywords",   fillColor: colkw});var comments    = d.characterStyles.add({name:"comments",   fillColor: colcmnt});var operators   = d.characterStyles.add({name:"operators",  fillColor: colop});var separators  = d.characterStyles.add({name:"separators", fillColor: colsep});var numbers     = d.characterStyles.add({name:"numbers",    fillColor: colnum});var comment     = d.characterStyles.add({name:"comment",    fillColor: colcmnt});var string      = d.characterStyles.add({name:"strings",    fillColor: colstr});var code = d.paragraphStyles.add({name:"code",appliedFont:"DejaVu Sans Mono	Book"});//change language (only in this paragraphStyle) to get the right "" for the code    code.appliedLanguage = app.languagesWithVendors.item("English: USA")    var grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = keywords;        grp.grepExpression = "abstract|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|\sdo\s|double|else|enum|export|extends|false|final|finally|float|for|function|goto|if|implements|import|\sin\s|instanceof|int|interface|long|native|\snew\s|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var|void|volatile|while|with";                grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = keywords;        grp.grepExpression = "is|new|sizeof|typeof";                grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = operators;        grp.grepExpression = "[-~\\[\\]!$%&*+/:<=>?^|]+";                grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = separators;        grp.grepExpression = "[(){},;\\s]+";                grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = numbers;        grp.grepExpression = "\\<[0-9]+(\\.[0-9]+)?([eE][-+]?[0-9]+)?";                grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = comments;        grp.grepExpression = "/\\*+[^*]*\\*+([^/*][^*]*\\*+)*/";                                grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = comment;        grp.grepExpression = "//.*";                        grp = code.nestedGrepStyles.add();        grp.appliedCharacterStyle = string;        grp.grepExpression = "\".*?\"";                   return code;                };// found on http://bit.ly/h5EobK indisnip.wordpress.com ->// how to apply:// add CMYK color//myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [80,50,30,10]);// add RGB color//myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [33,66,99]);// add HEX color//myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, "ABCDEF");// add color directly// add CMYK color to document// and asign it to selected object//app.selection[0].fillColor = myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [80,50,30,10]);function color_add(myDocument, myColorName, myColorModel, myColorValue){  if(myColorValue instanceof Array == false){    myColorValue = [(parseInt(myColorValue, 16) >> 16 ) & 0xff, (parseInt(myColorValue, 16) >> 8 ) & 0xff, parseInt(myColorValue, 16 ) & 0xff ];    myColorSpace = ColorSpace.RGB;  }else{    if(myColorValue.length == 3)      myColorSpace = ColorSpace.RGB;    else      myColorSpace = ColorSpace.CMYK;  }  try{    myColor = myDocument.colors.item(myColorName);    myName = myColor.name;  }  catch (myError){    myColor = myDocument.colors.add();    myColor.properties = {name:myColorName, model:myColorModel, space:myColorSpace ,colorValue:myColorValue};  }  return myColor;}/** * md 2 id  * this seemed usefull but it is much easier using the  * saved xml files from find chagne queries * ID understands them better * by melchior-b bhttps://github.com/melchior-b * whole script is here * from here --> https://github.com/melchior-b/indesign-scripts  * */// function markdown( theDoc, styles) {    //   var replacements = [//   {//      name:     'Heading 6',//     find:     { "findWhat": '^#{6}(?!#)(.+?)$' },//     change:   { "changeTo": "$1", "appliedParagraphStyle": styles.h6 }//   },//   {//     name:     'Heading 5',//     find:     { "findWhat": '^#{5}(?!#)(.+?)$' },//     change:   { "changeTo": "$1", "appliedParagraphStyle": styles.h5 }//   },//   {//     name:     'Heading 4',//     find:     { "findWhat": '^#{4}(?!#)(.+?)$' },//     change:   { "changeTo": "$1", "appliedParagraphStyle": styles.h4 }//   },//   {//       name:     'Heading 3',//     find:     { "findWhat": '^^#{3}(?!#)(.+?)$' },//     change:   { "changeTo": "$1", "appliedParagraphStyle": styles.h3 }//   }, //   {//     name:     'Heading 2',//     find:     { "findWhat": '^#{2}(?!#)(.+?)$' },//     change:   { "changeTo": "$1", "appliedParagraphStyle": styles.h2 }//   }, //   {//     name:     'Heading 1',//     find:     { "findWhat": '^#{1}(?!#)(.+?)$' },//     change:   { "changeTo": "$1", "appliedParagraphStyle": styles.h1 }//   }, //     {//     name:     'Blockquote',//     find:     { "findWhat": '^>(.+)$' },//     change:   { "changeTo": "$1", "appliedParagraphStyle": styles.blockquote }//   }, //   // {//   //   name:     'Ordered List',//   //   find:     { "findWhat": '^\\d+\\.\\s+(.+)$' },//   //   change:   { "changeTo": "$1", "appliedParagraphStyle": styles.ol }//   // }, //   {//     name:     'Unordered List',//     find:     { "findWhat": '^[-|+|*]{1}\\s(.+)$' },//     change:   { "changeTo": "$1", "appliedParagraphStyle": styles.ul }//   }, //   // {//   //   name:     'Strong',//   //   find:     { "findWhat": '__(.*?)__|\*\*(.*?)\*\*' },//   //   change:   { "changeTo": '$1', "appliedCharacterStyle": styles.strong }//   // }, //   // {//   //   name:     'Emphasized',//   //   find:     { "findWhat": '_([^_]+)_' },//   //   change:   { "changeTo": '$1', "appliedCharacterStyle": styles.em }//   // }, //   // {//   //   name:     'Code',//   //   find:     { "findWhat": '`([^_]+)`' },//   //   change:   { "changeTo": '$1', "appliedCharacterStyle": styles.code }//   // }, //   {//     name:     'Line Breaks',//     find:     { "findWhat": '\\s\\s' },//     change:   { "changeTo": "\r" }//   }];  //   var debug = [];  //   for(var i = 0; i < replacements.length; i++) {//     var foundItems = runGrep(theDoc, replacements[i]);//   app.findGrepPreferences   = NothingEnum.nothing;//   app.changeGrepPreferences = NothingEnum.nothing;//     debug.push(foundItems.length.toString() + 'x ' + replacements[i].name);//   }  //   debug.sort();//   debug.unshift('Markdown Replacements');//   var message = debug.join("\n");  //   alert(message);// };// function runGrep(theDoc, options) {//   app.findGrepPreferences.properties    = options.find;//   app.changeGrepPreferences.properties  = options.change;  //   var foundItems = theDoc.changeGrep();  //   app.findGrepPreferences   = NothingEnum.nothing;//   app.changeGrepPreferences = NothingEnum.nothing;  //   return foundItems;// };/** * This is dumb run pages. (takes care of the overflow) */// by Dave Saunders// http://jsid.blogspot.de/2005/12/function-snippets.htmlfunction DumbRunPages(theDoc, theStory, mssp_id) {  	// What makes this "dumb" is that default master pages are used.  	var uRuler = theDoc.viewPreferences.rulerOrigin;  	theDoc.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;	while (theStory.textContainers[theStory.textContainers.length-1].overflows) {  		/* 		// Original: Seite nach der letzten Dokumentseite einfügen 		theDoc.documentPreferences.pagesPerDocument = theDoc.documentPreferences.pagesPerDocument + 1;  		var backPage = theDoc.pages[-1]; 		*/ 		 		//alternativ: Seite nach der letzten Textrahmenseite einfügen 		var backPage = theDoc.pages.add();        backPage.appliedMaster = theDoc.masterSpreads.item((mssp_id));		app.activeWindow.activePage = backPage;  //~ 		backPage.appliedMaster = theDoc.pages[-2].appliedMaster;  		var myPbounds = backPage.bounds;  		var myNewTF = backPage.textFrames.add();  		if ((backPage.name % 2 == 1) || (!theDoc.documentPreferences.facingPages)) {  			myNewTF.geometricBounds =   			[myPbounds[0] + backPage.marginPreferences.top,   			myPbounds[1] + backPage.marginPreferences.left,   			myPbounds[2] - backPage.marginPreferences.bottom,   			myPbounds[3] - backPage.marginPreferences.right];  		} else {  			myNewTF.geometricBounds =   			[myPbounds[0] + backPage.marginPreferences.top,   			myPbounds[1] + backPage.marginPreferences.right,   			myPbounds[2] - backPage.marginPreferences.bottom,   			myPbounds[3] - backPage.marginPreferences.left];  		}  		myNewTF.itemLayer = theStory.textContainers[theStory.textContainers.length-1].itemLayer;  		myNewTF.previousTextFrame = theStory.textContainers[theStory.textContainers.length-1];          		if (myNewTF.characters.length == 0){  			theDoc.viewPreferences.rulerOrigin = uRuler;  			alert("Permanently overset"); // This indicates a permanent overset condition so break out of loop              break;        }  	}  	theDoc.viewPreferences.rulerOrigin = uRuler;  };   }
// this script "placeOnWorldMap.js" builds a map and places data on it
// right now it can build
// - the capitols of the world
// - 2000 weather stations from nort america
// - nuclear test sites from 1945 till 2006
// this is the most well implemeted one

 // __          ______  _____  _      _____    _   _ _    _ _  ________    _____ _____ _______ ______  _____ 
 // \ \        / / __ \|  __ \| |    |  __ \  | \ | | |  | | |/ /  ____|  / ____|_   _|__   __|  ____|/ ____|
 //  \ \  /\  / / |  | | |__) | |    | |  | | |  \| | |  | | ' /| |__    | (___   | |    | |  | |__  | (___  
 //   \ \/  \/ /| |  | |  _  /| |    | |  | | | . ` | |  | |  < |  __|    \___ \  | |    | |  |  __|  \___ \ 
 //    \  /\  / | |__| | | \ \| |____| |__| | | |\  | |__| | . \| |____   ____) |_| |_   | |  | |____ ____) |
 //     \/  \/   \____/|_|  \_\______|_____/  |_| \_|\____/|_|\_\______| |_____/|_____|  |_|  |______|_____/ 

 // all the ascii text images where generated with this generator:
 // http://patorjk.com/software/taag/
 // it helps to keep track of long scripts

// Copyright (C) 2012 Fabian "fabiantheblind" Morón Zirfas
// http://www.the-moron.net
// http://fabiantheblind.info/
// info [at] the - moron . net

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see http://www.gnu.org/licenses/

  //                       _                               _        
  //                      (_)                             | |       
  //  _ __ ___  __ _ _   _ _ _ __ ___ _ __ ___   ___ _ __ | |_ ___  
  // | '__/ _ \/ _` | | | | | '__/ _ \ '_ ` _ \ / _ \ '_ \| __/ __| 
  // | | |  __/ (_| | |_| | | | |  __/ | | | | |  __/ | | | |_\__ \ 
  // |_|  \___|\__, |\__,_|_|_|  \___|_| |_| |_|\___|_| |_|\__|___/ 
  //              | |                                               
  //              |_|                                               

 //  _             _                _   
 // (_)           | |              | |  
 //  _ _ __    ___| |__   ___  _ __| |_ 
 // | | '_ \  / __| '_ \ / _ \| '__| __|
 // | | | | | \__ \ | | | (_) | |  | |_ 
 // |_|_| |_| |___/_| |_|\___/|_|   \__|
                                     

// this is tested in InDesign CS5
// some of the view settings may not work in CS 4 - everything else should
// check out function reset_activeView(page)

// **these are the databases the code works with:**  
// https://raw.github.com/fabiantheblind/world.geo.json/master/countries.geo.json  
// https://raw.github.com/fabiantheblind/moreTimeForDesign/javascript/indesign/jsonfiles/World_nuclear_test_sites.json  

// **this is the image used:**  
// https://github.com/fabiantheblind/moreTimeForDesign/raw/javascript/indesign/radiation_warning.bmp  

// **without them there is no map and so on**  

// **for convinence you can load zipped packages from here:**   
//  here: https://github.com/fabiantheblind/moreTimeForDesign/zipball/javascript  
//  and here: https://github.com/fabiantheblind/world.geo.json/zipball/master 

// the folder structure is like this (Mac):  
// in (folder) Applications in (folder) InDesign CS5 in (folder) Scripts in (folder) Scripts Panel in (folder) moreTimeForDesign      
// in (folder) indesign (file) placeOnWorldMap.js  
// in (folder) indesign (file) radiation_warning.bmp
// in (folder) indesign in (folder) jsonfiles (file) World_nuclear_test_sites.json  
// in (folder) indesign in (folder) world.geo.json (file) countries.geo.json  

// and this is the used font DejaVu:  
// http://dejavu-fonts.org/wiki/Main_Page
// the bold and book types are used

// so if you load the zipped packages you just have to: 
// - rename folder the "faibantheblind-world.geo.json-********"" to world.geo.json
// - drop it next to the scriptfile
// and install the fonts

// be aware of the folder structure

// --------------------------script start-------------------------- // 


var startDate = new Date(); // this is for time recording
#include "jsonfiles/World_nuclear_test_sites.json"


// these are some global variables that can be accesed everywhere
// beware to use ther names ;) maybe i'll change this
var DEBUG = true; // adds some alerts an so on

// this is just fooling around
// for having a console
// the script could be much faster but for the sake of seeing what he does...

var console = initConsole();
// sometimes you have to add an delay(seconds) to see whats goiing on
logToConsole("main function start");
delay(3);

// // // // // // // // // // // // // // 
// // // // // // // // // // // // // // 
main();// everything happens in there
// // // // // // // // // // // // // // 
// // // // // // // // // // // // // // 

var endDate = new Date();
var timeTaken = endDate.getTime() - startDate.getTime();

logToConsole("main function end - logging of after: " + timeTaken/1000 + " seconds");
delay(7);

console.close();// and we are done

// --------------------------script end-------------------------- // 




// this the main function where all the other stuff takes place


 //  __  __          _____ _   _ 
 // |  \/  |   /\   |_   _| \ | |
 // | \  / |  /  \    | | |  \| |
 // | |\/| | / /\ \   | | | . ` |
 // | |  | |/ ____ \ _| |_| |\  |
 // |_|  |_/_/    \_\_____|_| \_|
                              

function main(){

var scale = 2; // for rescaling the whole thing if it is 1.0 the page will be 400x200 mm
var doc = createDocument(400,200,scale);
var pg = doc.pages.item(0);
var pw = doc.documentPreferences.pageWidth;
var ph = doc.documentPreferences.pageHeight;

createStyles(doc,scale);
logToConsole("Going to presentation mode. hit ESC when the script is done");
delay(2);
reset_activeView(pg);

// make the background
createBackground(pg,pw,ph);
// i didn't use his script but i'm quite thankfull for the logic have a look at
// http://forums.adobe.com/message/2538244#2538244
logToConsole("Draw Mercator Map - inspired by incredible Jongware");
delay(1);

var allCountrieNames = drawMercatorMap(doc,pg, readInCountries() ,scale);

// this gets data directly from the testsites file in the folder
// "jsonfiles" in there is some data in the JSON Object "nucleartests"
var nukeTestList = copy_obj(nucleartests);

var testsites =  calculateTestSites(doc, nucleartests);

colors_builder(doc, testsites.uniqueNames);

drawTestSites(doc, pg,testsites,scale);

findAndChange(doc);

drawLegend(doc,pg, testsites.statistics,pw,ph,scale);

// close main function 
}


 //  _____  _____      __          __  _______ _    _ ______   __  __          _____  
 // |  __ \|  __ \    /\ \        / / |__   __| |  | |  ____| |  \/  |   /\   |  __ \ 
 // | |  | | |__) |  /  \ \  /\  / /     | |  | |__| | |__    | \  / |  /  \  | |__) |
 // | |  | |  _  /  / /\ \ \/  \/ /      | |  |  __  |  __|   | |\/| | / /\ \ |  ___/ 
 // | |__| | | \ \ / ____ \  /\  /       | |  | |  | | |____  | |  | |/ ____ \| |     
 // |_____/|_|  \_|_/    \_\/  \/        |_|  |_|  |_|______| |_|  |_/_/    \_\_|     
                                                                                   
                                                                                   
// with some hints from the fine jongware
// see http://forums.adobe.com/message/2538244#2538244
function drawMercatorMap(doc, pg, countries ,scale){

var lyr = doc.layers.item(0);
	lyr.name = "map mercator";
var list = new Array();

for(var k = 0; k <countries.features.length ;k++){
	var cnt = countries.features[k];
	var id = cnt.id;
	var name = cnt.properties.name;
	list.push({"name":name,"id":id});

}

colors_builder_mercator(doc,list);

for (var i = 0; i < countries.features.length; i++) {
	var cnt = countries.features[i];
	var name = cnt.properties.name;
	var type = cnt.geometry.type;
	var coords = cnt.geometry.coordinates;
	// look for polygon or multipolygon
	var pattern = "MultiPolygon";
	var reg = new RegExp(pattern,"g");
	if (reg.test(type)==true){
	
	logToConsole("type: " +type+" Name: " + name + " id: "+ cnt.id);
	for (var j = 0; j < coords.length; j++) {
		for (var k = 0; k < coords[j].length; k++) {
					drawPolygon(doc, coords[j][k], scale, cnt.id + " "+name);
		};
	};
	}else{
	// we have only a polygon dont need the loop
	logToConsole("type: " +type+" Name: " + name + " id: "+ cnt.id);
	drawPolygon(doc, coords[0], scale, cnt.id + " "+name);
	}
};
lyr.locked = true;

return list;
}

// This draws actual one polygon object on the map
// and applys an objectstyle

function drawPolygon(doc, coords, scale, name){
	var pt = new Array();
	for(var i =0;i < coords.length;i++){
		var x = (coords[i][0])*scale;
		var y =  (coords[i][1]*-1)*scale;
		pt.push([x,y]);
	}
	var pol = doc.polygons.add();
	pol.paths[0].entirePath = pt;
	pol.applyObjectStyle(doc.objectStyles.item("landmass"),true,true);
	try{ pol.fillColor = doc.swatches.item(name); }catch(err){ if(DEBUG)alert(err); }

}

 //   _____          _       _____   _______ ______  _____ _______    _____ _____ _______ ______  _____ 
 //  / ____|   /\   | |     / ____| |__   __|  ____|/ ____|__   __|  / ____|_   _|__   __|  ____|/ ____|
 // | |       /  \  | |    | |         | |  | |__  | (___    | |    | (___   | |    | |  | |__  | (___  
 // | |      / /\ \ | |    | |         | |  |  __|  \___ \   | |     \___ \  | |    | |  |  __|  \___ \ 
 // | |____ / ____ \| |____| |____     | |  | |____ ____) |  | |     ____) |_| |_   | |  | |____ ____) |
 //  \_____/_/    \_\______|\_____|    |_|  |______|_____/   |_|    |_____/|_____|  |_|  |______|_____/ 
                                                                                                     
// This function takes the list of 2065 testsites and looks in a range of 3 degrees in latitude and longitude
// to make out actual testsites and not only display every testsite.
// It also builds up lists with all the names of the countries that tested some where and
// caculates statistics

function calculateTestSites(doc, testsList){

var checkList = testsList; // the incoming list


var len = checkList.length;// usefull for debugging set it to 100 insted of 2065

logToConsole("Calculating statistics");

var allNames = new Array();// will hold all extracted names
for (var m = 0; m < len; m++) {
	var aName= checkList[m].name;
	allNames.push(getCountry(aName));
	logToConsole("("+ m + "/"+len+") " + getCountry(aName));
};// close the m loop

// now build the stats
var statistics = compressArray(allNames);// reduce the array to get out how many by whom.

var uniqueNames = eliminateDuplicates(allNames); // make a list with the uniq
logToConsole("Countries with nuclear tests: "+ uniqueNames.join(" "));
delay(1);

for (var i = 0; i < len; i++) {

	if(checkList[i]!=null) {
		checkList[i].counter = 1;
		checkList[i].allNames = new Array();
		checkList[i].allNames.push(getCountry(checkList[i].name));
		}
   logToConsole("Checking site "+ i +" / "+checkList.length);
var origList = checkList;
	for (var j = 0; j < origList.length; j++) {
		if(i!=j){
			if (checkList[i]!= null && origList[j]!= null ) {
				var c_lat = checkList[i].lat;
				var o_lat = origList[j].lat;
				var c_lon = checkList[i].lon;
				var o_lon = origList[j].lon;
				// this is for point checking
				// if (( c_lat == o_lat ) && (c_lon == o_lon )) 
			
				// this checkes for a range
				if (checkRange(c_lat, o_lat, c_lon, o_lon)) {
					checkList[i].counter++;
					checkList[i].allNames.push(getCountry(checkList[j].name));
					checkList[j] = null;
				// close lat lon ckeck
				};
			//close checklist and origList != null
			};
		//close if i!=j
		}
	// close j loop
	};
//close i loop
};

// remove empty fields that got set null while calculating the testsites
var list = new Array();
for(var k = 0; k <  checkList.length;k++){
	if(checkList[k] != null){
		list.push(checkList[k]);		// do nothing;
	}
}

list.uniqueNames = uniqueNames;
list.statistics = statistics;
return list;
// close function
}


 //  _____  _____      __          __  _______ ______  _____ _______    _____ _____ _______ ______  _____ 
 // |  __ \|  __ \    /\ \        / / |__   __|  ____|/ ____|__   __|  / ____|_   _|__   __|  ____|/ ____|
 // | |  | | |__) |  /  \ \  /\  / /     | |  | |__  | (___    | |    | (___   | |    | |  | |__  | (___  
 // | |  | |  _  /  / /\ \ \/  \/ /      | |  |  __|  \___ \   | |     \___ \  | |    | |  |  __|  \___ \ 
 // | |__| | | \ \ / ____ \  /\  /       | |  | |____ ____) |  | |     ____) |_| |_   | |  | |____ ____) |
 // |_____/|_|  \_|_/    \_\/  \/        |_|  |______|_____/   |_|    |_____/|_____|  |_|  |______|_____/ 
                                                                                                       
                                                                                                       
// this function takes the testsiteslist created in 
// calculateTestSites
// builds up:
// - a circle
// - places and image in the circle 
// - creates a textframe
// - places some data from the list 

function drawTestSites(doc, pg,testsites,scale){

var testsitesLayer = doc.layers.add({name:"testsites"});
var w = 1*scale;// so if you scale he doesn't matter
var counter = 1;
var numsites = testsites.length;// good for debugging

	for(var i =0; i < numsites;i++){
		var site = testsites[i];
		var name = site.name;
		var who = getCountry(name);

		var desc = site.description;
		var y1 = (site.lat*-1)*scale;
		var x1 = (site.lon)*scale;

		var oy1 = y1- (w/2);
		var ox1 = x1- (w/2);
		var oy2 = y1+ (w/2);
		var ox2 = x1 + (w/2);

		
		var ty1 = y1 - w;
		var tx1 = x1 + w;

	 logToConsole("("+ i +"/"+testsites.length+") site: "+ name+ " @ lat: " + site.lat.toFixed(2) + " lon: "+ site.lon.toFixed(2));
	 delay(1);
	 // logToConsole("the used color: " + who);
	 // delay(2);

	 	// just fooling around with the red circle
	 	if(DEBUG) {
	 		var hlw = 10;
	 		var highlite = pg.ovals.add({geometricBounds:[y1-hlw,x1-hlw,y1+hlw,x1+hlw],fillColor:doc.swatches[0],strokeWeight:10,strokeColor:doc.swatches[7]})
		}
		var ov = pg.ovals.add({ geometricBounds:[oy1 ,ox1 , oy2, ox2]});
			ov.applyObjectStyle(doc.objectStyles.item("marker"));

		// load the radiation image into the oval - colorize and fit it
		var path = (app.activeScript.parent.fsName);
		var radiation = File( path+"/radiation_warning.bmp");// app.ac
		ov.place(radiation);
		ov.images[0].fillColor = doc.swatches.item(who);
		ov.fit(FitOptions.CONTENT_TO_FRAME);
		ov.fit(FitOptions.CENTER_CONTENT);

		// if there is more than one test at the testsite
		// add a texbox with the number counted
		// if(site.counter > 1){

		var compressedNames = compressArray(site.allNames);

		var str ="";

		compressedNames.sort(comparator);


		for(var j = compressedNames.length-1; j >=0;j--){
		str+= compressedNames[j].value + ":\u2003"+ compressedNames[j].count + "\n";
		}


		var cnt = "";
		if(compressedNames.length>1){
		cnt = "overall:\t"+ String(site.counter)+"\n"+str;

		// this is a manual fix sry
		var ov2 = ov.duplicate();
		var gb1 = ov.geometricBounds;
		
		ov.geometricBounds = [gb1[0],gb1[1],gb1[2],gb1[3]-((gb1[3]-gb1[1])/2)];
		var gb2 = ov2.geometricBounds;
		ov2.geometricBounds = [gb2[0],gb2[1]+((gb2[3]-gb2[1])/2),gb2[2],gb2[3]];
		ov.images[0].fillColor = doc.swatches.item("United States of America");
		}else{
		cnt = str;

		}
		var tf = pg.textFrames.add({geometricBounds:[ty1 ,tx1 ,ty1 + 5, tx1 + 42],contents:cnt});
		// tf.contents = String(site.counter);
		tf.paragraphs.everyItem().appliedParagraphStyle = doc.paragraphStyles.item("numbers");
		tf.fit(FitOptions.FRAME_TO_CONTENT);

		// now draw a line
		var gl = pg.graphicLines.add();
	    var p1 = gl.paths[0].pathPoints[0];
  	    var p2 = gl.paths[0].pathPoints[1];
  	   		p1.anchor = [x1 ,y1];

  	    var gb = tf.geometricBounds;

  	    var th = gb[2] - gb[0];

	 		p2.anchor = [gb[1] - w/3,gb[0] + (th/2)];
	 		gl.applyObjectStyle(doc.objectStyles.item("gline"));
	 		// gl.properties = { strokeColor:doc.swatches.item(3),
				//  				strokeWeight:0.25*scale, 
				//  				itemLayer:testsitesLayer,strokeTint: 50,
				//  				endCap: EndCap.ROUND_END_CAP};
	 		// gl.endCap = EndCap.ROUND_END_CAP;

		// }

	if(DEBUG){
		delay(0.5);
		highlite.remove();}
	}// close i loop

testsitesLayer.locked = true;
}

 //   ______      ________ _____  _           __     _______ 
 //  / __ \ \    / /  ____|  __ \| |        /\\ \   / / ____|
 // | |  | \ \  / /| |__  | |__) | |       /  \\ \_/ / (___  
 // | |  | |\ \/ / |  __| |  _  /| |      / /\ \\   / \___ \ 
 // | |__| | \  /  | |____| | \ \| |____ / ____ \| |  ____) |
 //  \____/   \/   |______|_|  \_\______/_/    \_\_| |_____/ 
                                                          

function drawLegend(doc,pg, statistics,pw,ph,scale){
	var lyr = doc.layers.add("legend");
	var tf = pg.textFrames.add({geometricBounds:[-(ph/2),-(pw/2),(ph/10),(pw/2)]});

// an em_dash in german --> geviert
// is in  unicode is: \u2003

// this is some wired stuff i dont fully understand
// needs checking!
statistics.sort(comparator);


var str  ="";
for(var i = 0; i < statistics.length;i++){
 	str+= "country: "+statistics[i].value +" tests: " + statistics[i].count + "\u2003";
	}
tf.contents = str;
tf.paragraphs.everyItem().appliedParagraphStyle = doc.paragraphStyles.item("legend");

}

 //  _    _ _______ _____ _      _____ _______ _____ ______  _____ 
 // | |  | |__   __|_   _| |    |_   _|__   __|_   _|  ____|/ ____|
 // | |  | |  | |    | | | |      | |    | |    | | | |__  | (___  
 // | |  | |  | |    | | | |      | |    | |    | | |  __|  \___ \ 
 // | |__| |  | |   _| |_| |____ _| |_   | |   _| |_| |____ ____) |
 //  \____/   |_|  |_____|______|_____|  |_|  |_____|______|_____/ 
                                                                
/**
 * these utilitys do some fine work ;)
 */
function reset_activeView(page){
    
     app.activeWindow.activePage = page;  
     app.activeWindow.zoomPercentage = 100;
     app.activeWindow.zoom(ZoomOptions.FIT_PAGE);    
     app.activeWindow.screenMode = ScreenModeOptions.PRESENTATION_PREVIEW;
    }

function initConsole(){
var console = new Window("palette"); // for logging some data to the screen
console.prompt = console.add("statictext",[0,0,500,20]);
console.show();
return console;
}

function logToConsole(incoming){
	try{
	console.prompt.text = incoming+"";
	}catch(err){
		alert("Console is not initalized\n"+err);
	}
}


function findAndChange(doc){
	
	doc.layers.everyItem().locked = false;
	text_set_FindChange_opt();
var fGPref  = app.findGrepPreferences;
var cGPref = app.changeGrepPreferences;


var greps_ = new Array();
	// use json objects to keep it tidy
	// fw is the find what
	// to is the change to
	greps_.push({   "fw":"United States of America"	  ,		"to":"USA"});
	greps_.push({   "fw":"United Kingdom"	  ,		"to":"UK"});

	text_emptyFC();
	// now loop thru the object to get all the greps
	for(var j = 0;j < greps_.length;j++){
		fGPref.findWhat = greps_[j].fw;
		cGPref.changeTo = greps_[j].to;
		doc.changeGrep();
		text_emptyFC();
	}
	text_emptyFC();
	doc.layers.everyItem().locked = true;
}

function text_set_FindChange_opt(){
	
	text_emptyFC();
	//Set the find options.
	app.findChangeGrepOptions.includeFootnotes = true;
	app.findChangeGrepOptions.includeHiddenLayers = false;
	app.findChangeGrepOptions.includeLockedLayersForFind = false;
	app.findChangeGrepOptions.includeLockedStoriesForFind = true;
	app.findChangeGrepOptions.includeMasterPages = true;
	
}

function text_emptyFC(){
	//Clear the find/change grep preferences.
	app.findGrepPreferences = NothingEnum.nothing;
	app.changeGrepPreferences = NothingEnum.nothing;
	
	//Clear the find/change text preferences.
	app.findTextPreferences = NothingEnum.nothing;
	app.changeTextPreferences = NothingEnum.nothing;
}

function checkRange(c_lat, o_lat, c_lon, o_lon){
	var isInRange = false;
	var r = 3;// the range
	if(((o_lat > (c_lat - r)) && (o_lat < (c_lat + r)) )&&(o_lon > (c_lon - r)) && (o_lon < (c_lon + r)) ){
		isInRange = true
	}
return isInRange;
}




function getCountry(test_name){
		var pattern = "(.*?)_";
	var reg = new RegExp(pattern);
var result = "undefined";
	 if (reg.test(test_name)==true){
	 result = test_name.match(reg)[0];
	}
result  = result.slice(0, -1);
return result;
}

//
//
// this is unused but good to have
// not really debugged
function readInJSONFile(foldername , filename){
	
var path = (app.activeScript.parent.fsName);
var myFile = File( path+"/"+foldername+"/"+ filename);// app.ac
var text = "";
	myFile.open("r"); 
if (myFile != null){

	while (!myFile.eof){
		text = myFile.readln();
	}
	// close the file before exiting
	myFile.close();

}
var obj = eval("(" + text + ")");
return obj;
}

// this works fine
function readInCountries(){

var path = (app.activeScript.parent.fsName);
var myFile = File( path+"/world.geo.json/countries.geo.json");
var text = "";
	myFile.open("r"); 
if (myFile != null){

	while (!myFile.eof){
		text = myFile.readln();
	}
	// close the file before exiting
	myFile.close();

}
var obj = eval("(" + text + ")");
return obj;
}

// json object copy found here
// http://www.adp-gmbh.ch/web/js/variables/copying_objs.html
  function copy_obj(o) {
    var c = new Object();

    for (var e in o) {
      c[e] = o[e];
    }
    return c;
  }


// duplicate remover found here
// http://dreaminginjavascript.wordpress.com/2008/08/22/eliminating-duplicates/
function eliminateDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}


// delay function found here
//found here http://www.wer-weiss-was.de/theme157/article1143593.html

function delay(prmSec){
prmSec *= 1000;
var eDate = null;
var eMsec = 0;
var sDate = new Date();
var sMsec = sDate.getTime();
do {
eDate = new Date();
eMsec = eDate.getTime();
} while ((eMsec-sMsec)<prmSec);
} 


 // array compressor found here
 // http://ryanbosinger.com/blog/2011/javascript-count-duplicates-in-an-array/
function compressArray(original) {
 
	var compressed = [];
	// make a copy of the input array
	var copy = original.slice(0);
 
	// first loop goes over every element
	for (var i = 0; i < original.length; i++) {
 
		var myCount = 0;	
		// loop over every element in the copy and see if it's the same
		for (var w = 0; w < copy.length; w++) {
			if (original[i] == copy[w]) {
				// increase amount of times duplicate is found
				myCount++;
				// sets item to undefined
				delete copy[w];
			}
		}
 
		if (myCount > 0) {
			var a = new Object();
			a.value = original[i];
			a.count = myCount;
			compressed.push(a);
			logToConsole(" Country: "+ a.value + " made "+ a.count );
		}
	}
 
	return compressed;
};

// found here:
// http://stackoverflow.com/questions/979256/how-to-sort-an-array-of-javascript-objects
// down at the bottom
// a and be are object elements of your array
function comparator(a,b) {
  return parseInt(a.count) - parseInt(b.count);

}


 //   _____ _________     ___      _____ _   _  _____ 
 //  / ____|__   __\ \   / / |    |_   _| \ | |/ ____|
 // | (___    | |   \ \_/ /| |      | | |  \| | |  __ 
 //  \___ \   | |    \   / | |      | | | . ` | | |_ |
 //  ____) |  | |     | |  | |____ _| |_| |\  | |__| |
 // |_____/   |_|     |_|  |______|_____|_| \_|\_____|
                                                   
                                                   



function createStyles(doc, scale){

//object styles

var landmass  = doc.objectStyles.add();
landmass.properties = {
		name:"landmass",
		strokeWeight: 0.1*scale,
		strokeColor:doc.swatches.item(3),
		strokeTint: 50,
		fillColor:doc.swatches.item(2),
		transparencySettings:{
				blendingSettings:{
					opacity:100
					}
				}
		};


var bg  = doc.objectStyles.add();
bg.properties = {
		name:"bg",
		strokeWeight: 0,
		strokeColor:doc.swatches.item(2),
		strokeTint: 50,
		fillTint:42,
		fillColor:doc.swatches.item(3),
		transparencySettings:{
				blendingSettings:{
					opacity:100
					}
				}
		};

var marker  = doc.objectStyles.add();
	marker.properties = {
		name:"marker",
		strokeWeight: 0,
		strokeColor:doc.swatches.item(0),
		strokeTint: 50,
		fillColor:doc.swatches.item(0),
		transparencySettings:{
				blendingSettings:{
					opacity:100
					}
				}
		};




var gline  = doc.objectStyles.add();
	gline.properties = {
		name:"gline",
		strokeWeight: 0.25*scale,
		strokeColor:doc.swatches.item(3),
		strokeTint: 50,
		endCap: EndCap.ROUND_END_CAP,
		transparencySettings:{
				blendingSettings:{
					opacity:100
					}
				}
		};


	// NOW THE CHARACTER STYLES

	// type 0 = parstyle
	// type 1 = charstyle
	var styles = [{
		"type":0,
		"name":"numbers",
		"pointSize":3*scale,
		"font":"DejaVu Serif	Book",
		"fillTint":75,
		"just":Justification.LEFT_ALIGN,
		"fillColor":3,
		"strokeColor":2,
		"strokeWeight":0},
		{"type":0,
		"name":"legend",
		"pointSize":13*scale,
		"font":"DejaVu Serif	Bold",
		"fillTint":75,
		"just":Justification.CENTER_ALIGN,
		"fillColor":2,
		"strokeColor":2,
		"strokeWeight":0}
		];	

for (var i = styles.length - 1; i >= 0; i--) {
	var st = styles[i];
	var type;
	if (st.type==0) {
	type = doc.paragraphStyles;
	} else if (st.type==1) {
	type = doc.characterStyles;
	};

	try{
		var aSt = type.add();
		aSt.name = st.name;
		aSt.pointSize = st.pointSize;
		aSt.appliedFont = st.font;
		aSt.fillTint = st.fillTint;
		aSt.strokeColor = doc.swatches.item(st.strokeColor);
		aSt.fillColor = doc.swatches.item(st.fillColor);
		aSt.strokeWeight = st.strokeWeight;

		// from here on the character styles throw an error
		aSt.justification = st.just;

	}catch(err){

		if(DEBUG)alert(err);
	}
};

try{

	doc.paragraphStyles.item("numbers").tabStops.add({alignment:TabStopAlignment.leftAlign, position:9, leader:""});
}catch(err){
	if(DEBUG)alert(err);
}

}



// build a doc and set the center to zero
function createDocument( pw, ph, scale){
var doc = app.documents.add();
	doc.documentPreferences.pageWidth = pw*scale;
	doc.documentPreferences.pageHeight = ph*scale;

// set the 0/0 coordinate into the center of the page
// works good with lat lon
// only thing is the lat value has to flipped
// we will do this when reciving data from the files
	doc.zeroPoint = [ (pw*scale) / 2, (ph*scale) / 2 ];
return doc;
}


// create the BACKGROUND
function createBackground(pg,pw,ph){
var rect = pg.rectangles.add({geometricBounds:[0-(ph/2),0-(pw/2),ph/2,pw/2]});
// alert(pg.parent.name);
// the parent of a page is a masterspread not the document directly
rect.applyObjectStyle(pg.parent.parent.objectStyles.item("bg"));// fillColor:doc.swatches.item(3),strokeWeight:0,fillTint:42};


}



 //   _____  ____  _       ____  _____     _____ _____  ______       _______ _____  ____  _   _ 
 //  / ____|/ __ \| |     / __ \|  __ \   / ____|  __ \|  ____|   /\|__   __|_   _|/ __ \| \ | |
 // | |    | |  | | |    | |  | | |__) | | |    | |__) | |__     /  \  | |    | | | |  | |  \| |
 // | |    | |  | | |    | |  | |  _  /  | |    |  _  /|  __|   / /\ \ | |    | | | |  | | . ` |
 // | |____| |__| | |____| |__| | | \ \  | |____| | \ \| |____ / ____ \| |   _| |_| |__| | |\  |
 //  \_____|\____/|______|\____/|_|  \_\  \_____|_|  \_\______/_/    \_\_|  |_____|\____/|_| \_|
                                                                                             
                                                                                             



function colors_builder(d, color_names){

	for(var j = color_names.length -1; j >=0 ; j--){
         
    var s = 66;
    var l = 55;
    
    var hue = (360/(color_names.length +1)) *j;
    var rgb = color_hsl2rgb(hue, s, l);

    try{
    	// var colCMYK  = color_add(doc,color_names[j], ColorModel.PROCESS, [c,m,y,k]);
        var colRGB  = color_add(d,color_names[j], ColorModel.PROCESS, [rgb.r,rgb.g,rgb.b]);
		}catch(e){}
	}
}

 // this depends on how you set the argument "name" in drawPolygon() within drawMercatorMap()
 // use this for variuos ways to colorize the map
function colors_builder_mercator(d, color_names){

	for(var j = color_names.length -1; j >=0 ; j--){
         
    var s = 0;
    var l = 99;

    // use this if you want different colors
    // if((j%2)==0){
    // var l = 99;

    // }else{
    // var l = 95;

    // }
    
    var hue = (360/(color_names.length +1)) *j;

    var rgb = color_hsl2rgb(hue, s, l);

    try{
    	// var colCMYK  = color_add(doc,color_names[j], ColorModel.PROCESS, [c,m,y,k]);
    	// the naming of the colors is a bit dirty
    	// it depends on how you set the argument "name" in drawPolygon() within drawMercatorMap()
        var colRGB  = color_add(d,color_names[j].id+ " "+ color_names[j].name, ColorModel.PROCESS, [rgb.r,rgb.g,rgb.b]);
		}catch(e){if(DEBUG)alert(e);}
	}
}

// found on http://bit.ly/h5EobK indisnip.wordpress.com ->
// how to apply:

// add CMYK color
//color_add(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [80,50,30,10]);

// add RGB color
//color_add(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [33,66,99]);

// add HEX color
//color_add(app.activeDocument, "My Custom Color", ColorModel.PROCESS, "ABCDEF");

// add color directly
// add CMYK color to document
// and asign it to selected object
//app.selection[0].fillColor = color_add(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [80,50,30,10]);

function color_add(myDocument, myColorName, myColorModel, myColorValue){
	if(myColorValue instanceof Array == false){
		myColorValue = [(parseInt(myColorValue, 16) >> 16 ) & 0xff, (parseInt(myColorValue, 16) >> 8 ) & 0xff, parseInt(myColorValue, 16 ) & 0xff ];
		myColorSpace = ColorSpace.RGB;
	}else{
		if(myColorValue.length == 3)
		  myColorSpace = ColorSpace.RGB;
		else
		  myColorSpace = ColorSpace.CMYK;
	}
	try{
		myColor = myDocument.colors.item(myColorName);
		myName = myColor.name;
		// reasing colors if you dont want this remove the following line
		// myColor.colorValue = myColorValue;
	}
	catch (myError){
		myColor = myDocument.colors.add();
		myColor.properties = {name:myColorName, model:myColorModel, space:myColorSpace ,colorValue:myColorValue};
	}
	return myColor;
}

// color converiosn found here
// http://www.codingforums.com/showthread.php?t=11156

function color_hsl2rgb(h, s, l) {
	var m1, m2, hue;
	var r, g, b
	s /=100;
	l /= 100;
	if (s == 0)
		r = g = b = (l * 255);
	else {
		if (l <= 0.5)
			m2 = l * (s + 1);
		else
			m2 = l + s - l * s;
		m1 = l * 2 - m2;
		hue = h / 360;
		r = color_HueToRgb(m1, m2, hue + 1/3);
		g = color_HueToRgb(m1, m2, hue);
		b = color_HueToRgb(m1, m2, hue - 1/3);
	}
	return {r: r, g: g, b: b};
}

function color_HueToRgb(m1, m2, hue) {
	var v;
	if (hue < 0)
		hue += 1;
	else if (hue > 1)
		hue -= 1;

	if (6 * hue < 1)
		v = m1 + (m2 - m1) * hue * 6;
	else if (2 * hue < 1)
		v = m2;
	else if (3 * hue < 2)
		v = m1 + (m2 - m1) * (2/3 - hue) * 6;
	else
		v = m1;

	return 255 * v;
}



  //   ____  _      _____    _____       _______          _____ ______ _______ _____  
  //  / __ \| |    |  __ \  |  __ \   /\|__   __|/\      / ____|  ____|__   __/ ____| 
  // | |  | | |    | |  | | | |  | | /  \  | |  /  \    | (___ | |__     | | | (___   
  // | |  | | |    | |  | | | |  | |/ /\ \ | | / /\ \    \___ \|  __|    | |  \___ \  
  // | |__| | |____| |__| | | |__| / ____ \| |/ ____ \   ____) | |____   | |  ____) | 
  //  \____/|______|_____/  |_____/_/    \_\_/_/    \_\ |_____/|______|  |_| |_____/  
  //   ____  _      _____    _____       _______          _____ ______ _______ _____  
  //  / __ \| |    |  __ \  |  __ \   /\|__   __|/\      / ____|  ____|__   __/ ____| 
  // | |  | | |    | |  | | | |  | | /  \  | |  /  \    | (___ | |__     | | | (___   
  // | |  | | |    | |  | | | |  | |/ /\ \ | | / /\ \    \___ \|  __|    | |  \___ \  
  // | |__| | |____| |__| | | |__| / ____ \| |/ ____ \   ____) | |____   | |  ____) | 
  //  \____/|______|_____/  |_____/_/    \_\_/_/    \_\ |_____/|______|  |_| |_____/  
  //   ____  _      _____    _____       _______          _____ ______ _______ _____  
  //  / __ \| |    |  __ \  |  __ \   /\|__   __|/\      / ____|  ____|__   __/ ____| 
  // | |  | | |    | |  | | | |  | | /  \  | |  /  \    | (___ | |__     | | | (___   
  // | |  | | |    | |  | | | |  | |/ /\ \ | | / /\ \    \___ \|  __|    | |  \___ \  
  // | |__| | |____| |__| | | |__| / ____ \| |/ ____ \   ____) | |____   | |  ____) | 
  //  \____/|______|_____/  |_____/_/    \_\_/_/    \_\ |_____/|______|  |_| |_____/  


function drawWeatherStationsNA(doc , pg){
// you need to include
// #include "jsonfiles/stations.json"

var stationsLayer = doc.layers.add({name:"weather stations"});

for(var i in stations){
	var w = 0.5;
	var y1 = (stations[i].lat*-1)- ( w / 2);
	var x1 = (stations[i].lon )   - ( w / 2);
	    console.prompt.text = stations[i].name +" @ lat: " + stations[i].lat + " lon: "+stations[i].lon;

	var y2 = y1 + w;
	var x2 = x1 + w;
	var ov	= pg.ovals.add({geometricBounds:[y1,x1,y2,x2]});

	// ov.itemLayer = stationsLayer;
	ov.properties = { strokeWeight :0.1, strokeColor:doc.swatches.item(2), itemLayer:stationsLayer,fillTint:50, fillColor:doc.swatches.item(3) };

	if(stations[i].weather == null){
		//do nothing
	ov.transparencySettings.blendingSettings.opacity=23;
	}else{

	var tf = pg.textFrames.add({geometricBounds:[y1,x1+w,y1 + 10,x1 + 20]});
	tf.contents = stations[i].weather + "";
	tf.paragraphs.everyItem().properties = {appliedFont:"DejaVu Serif	Book",pointSize:2,
	strokeColor:doc.swatches.item(2) ,strokeWeight:0.1,justification:Justification.LEFT_ALIGN}; 
	tf.fit(FitOptions.FRAME_TO_CONTENT); 
}

}

}

function drawCapitals(doc, pg){

// you need to include
// #include "jsonfiles/capitals.json"

var capitalsLayer = doc.layers.add({name:"capitals"});
var grp = new Array();
for(var i in countries.Results){
	// try{

	var cntry = countries.Results[i].country;

	if(i == 0 ){
		//({ Name:"Bangladesh", 
		//Capital:{
		//	DLST:"null", 
		//	TD:6, 
		//	Flg:2, 
		//	Name:"Dhaka", 
		//	GeoPt:[23.43, 90.24]}
		//	, GeoRectangle:
		//	{West:88.0283279419, East:92.6736831665, North:26.6319484711, South:20.7433319092}
		//	, SeqID:19, 
		//	GeoPt:[24, 90], 
		//	TelPref:"880",
		//	 CountryCodes:
		//	 {
		//	 	tld:"bd", 
		//	 	iso3:"BGD", 
		//	 	iso2:"BD", 
		//	 	fips:"BG", 
		//	 	isoN:50}, 
		//	 	CountryInfo:"http://www.geognos.com/geo/en/cc/bd.html"
		// })

	alert("this is the data we can use\n"+
		"Name: for example " + countries.Results[i].country.Name + "\n"+
		"Capital (JSONObject):\n"+
		"{DLST || TD || Flg || Name || GeoPT (Array of two)[lat,lon]}\n"+
		"GeoRectangle (JSONObject):\n"+
		"{West: lat, East:lat, North:lon, South:lon}\n"+
		"SeqID || GeoPT (Array of two)[lat,lon] || TelPref \n"+
		 "CountryCodes (JSONObject)\n"+
		 "{tld || iso3 || iso2 || fips || isoN}\n"+
		 "CountryInfo (web url)");
// exit();
	}
	// console.prompt.text = cntry.Name;

try{
	var lat = cntry.Capital.GeoPt[0];
	var lon  = cntry.Capital.GeoPt[1];
	}catch(e){
// if ther are no lat lon data go on to the next countrie
	 console.prompt.text = "!No geo data for " + cntry.Name+"'s capital availabe!";
	 delay(1.5);
		continue;
	}
	var w = 1;
	var y1 = (lat*-1);
	var x1 = (lon );
	// var y2 = y1;
	// var x2 = x1;
	 
	 console.prompt.text = cntry.Name+"'s capital is: "+ cntry.Capital.Name +" @ lat: " + lat + " lon: "+ lon;




	var ov	= pg.ovals.add({geometricBounds:[y1-(w/2),x1-(w/2),y1+(w/2),x1+(w/2)]});

	ov.properties = { strokeWeight :0.5, strokeColor:doc.swatches.item(2), itemLayer:capitalsLayer, fillColor: doc.swatches.item(3) };
	ov.transparencySettings.blendingSettings.opacity=50;

	ov.label = String(i);
	grp.push(ov);

	// pg.groups.add(grp);



	var tw = 30;
	var tf = pg.textFrames.add({geometricBounds:[y1 + (w/4)*3 ,x1 - (tw/2),y1+5 +w,x1 + (tw/2)],contents:cntry.Capital.Name});
	tf.itemLayer = capitalsLayer;
	tf.paragraphs.everyItem().properties = {appliedFont:"DejaVu Serif	Book",pointSize:2,
	strokeColor:doc.swatches.item(2) ,strokeWeight:0.25,justification:Justification.CENTER_ALIGN}; 
//	tf.properties = { fillColor : doc.swatches.item(2),strokeWeight:1,strokeColor:doc.swatches.item(2), itemLayer:capitalsLayer};
	tf.fit(FitOptions.FRAME_TO_CONTENT);
	tf.transparencySettings.blendingSettings.opacity=50;
	tf.label = String(i);

	 // var gl = pg.graphicLines.add(); 
  //    var p1 = gl.paths[0].pathPoints[0];
  //    var p2 = gl.paths[0].pathPoints[1];
  //    p1.anchor = [x1 + (w/2) ,y1 +(w/2)];
  //    var gb = tf.geometricBounds;
	 // p2.anchor = [gb[1] + (gb[3]-gb[1])/2 , ((gb[2] - gb[0])/2) + gb[0]];
	 // gl.properties = {strokeColor:doc.swatches.item(3),strokeWeight:0.5, itemLayer:capitalsLayer,strokeTint: 50};
	 // gl.endCap = EndCap.ROUND_END_CAP;
	 // gl.label = String(i);
	// grp.push(gl);


	// grp.push(tf);
	// }catch(e){
	// 	console.prompt.text = (e + "\n" + cntry.Name);

	// }
}

}


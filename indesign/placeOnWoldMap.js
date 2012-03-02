// #include "stations.json"
// #include "countries.json"
// #include "worldmap_mercator.js"

var startDate = new Date();
 
#include "jsonfiles/World_nuclear_test_sites.json"
// var stations = data;
// var capitals = countries;
// we need to read in the "countries.geo.json" file like this.
// it is ti heavy to include

// these are some global variables that can be accesed everywhere
// beware to use ther names ;)

var countries = readInCountries(); // read in all the countries
var tests = nucleartests; // this gets data directly from the testsites file
var DEBUG = true; // adds some alerts an so on
var scale = 2; // for rescaling the whole thing if it is 1.0 the page will be 400x200 mm


// this is for quick testing and looking up data
// alert(countries.Results[10].country.Capital.toSource());
// or maybee
// alert (tests.toSource());
// exit();

var console = new Window("palette"); // for logging some data to the screen

console.prompt = console.add("statictext",[0,0,500,20]);
console.show();

// sometimes you have to add an delay to see whats goiing on
console.prompt.text = "main function start";
delay(3);
main();// everything happens in there
 
var endDate = new Date();
var timeTaken = endDate.getTime() - startDate.getTime();

logToConsole("main function end - logging of after: " + timeTaken/1000 + " seconds");
delay(7);
console.close();// and we are done


// this the main function where all the other stuff takes place



function main(){

var doc = createDocument(400,200,scale);
var pg = doc.pages.item(0);
var pw = doc.documentPreferences.pageWidth;
var ph = doc.documentPreferences.pageHeight;


createStyles(doc,scale);
logToConsole("Going to presentation mode. hit ESC when the script is done");
delay(2);
reset_activeView(pg);


// var statistics = calculateStatistics(tests);

logToConsole("recalculating tests to testsites");
var testsites =  calculateTestSites(doc, tests);
colors_builder(doc, testsites.uniqueNames);
// make the background
createBackground(pg,pw,ph);
// i didn't use his script but i'm quite thankfull for the logic have a look at
// http://forums.adobe.com/message/2538244#2538244
logToConsole("Draw Mercator Map - inspired by incredible Jongware");
drawMercatorMap(doc,pg,countries);
drawTestSites(doc, pg,testsites);

// these are other datasets.
// they are conected to some files in the folder jsonfiles
//
// drawWeatherStationsNA(doc, pg);
// drawCapitals(doc,pg);

}



// with some hints from the fine jongware
//DESCRIPTION:Draw a world map.
// Jongware, 22-Jan-2010
// thanx a lot
// see http://forums.adobe.com/message/2538244#2538244


function drawMercatorMap(doc, pg, countries ){

var lyr = doc.layers.item(0);
	lyr.name = "map mercator";
// alert(countries.features.length + "\n "+countries.features[0].geometry.toSource());

for (var i = 0; i < countries.features.length; i++) {
	var cnt = countries.features[i];
	var name = cnt.properties.name;
	var type = cnt.geometry.type;
	var coords = cnt.geometry.coordinates;

	// var pat1 = "Polygon";
	var pattern = "MultiPolygon";
	// var reg1 = new RegExp (pat1,"g");
	var reg = new RegExp(pattern,"g");

	// look for polygon or multipolygon
	if (reg.test(type)==true){
	
	console.prompt.text = ("type MultiPolygon Name: " + name + "\ntype: " +type+"\ncoords array num: "+ coords.length +"\ncoords: " + cnt.geometry.coordinates.toSource());

	for (var j = 0; j < coords.length; j++) {
		for (var k = 0; k < coords[j].length; k++) {
					drawPolygon(doc, coords[j][k]);

		};
	};

	}else{

	console.prompt.text = ("type polygon Name: " + name + "\ntype: " +type+"\ncoords array num: "+ coords.length  + "\n coords: " + coords[0].toSource());

	drawPolygon(doc, coords[0]);
	}
};
lyr.locked = true;
}

// This draws actual one polygon object
// and applys an objectstyle

function drawPolygon(doc, coords){
	var pt = new Array();
	for(var i =0;i < coords.length;i++){
		var x = (coords[i][0])*scale;
		var y =  (coords[i][1]*-1)*scale;
		pt.push([x,y]);
	}

	var pol = doc.polygons.add();
	pol.paths[0].entirePath = pt;
	pol.applyObjectStyle(doc.objectStyles.item("landmass"),true,true);
}



function calculateTestSites(doc, testsList){

	var checkList = testsList;


	for (var i = 0; i < checkList.length; i++) {

		if(checkList[i]!=null) { checkList[i].counter = 1; }

    console.prompt.text = "Checking site "+ i +" / "+checkList.length;

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

	var list = new Array();

for(var k = 0; k <  checkList.length;k++){
	if(checkList[k] == null){
		// do nothing;
	}else{

		list.push(checkList[k]);

	}
}


var cnNames = new Array();

	for (var l = 0; l < list.length; l++) {
		var name = list[l].name;
		cnNames.push(getCountry(name));
	};

var uniqueNames = eliminateDuplicates(cnNames);
// alert(uniqueNames);
logToConsole("Countries with nuclear tests: "+ uniqueNames);

list.uniqueNames = uniqueNames;
return list;
// close function

}

function calculateStatistics(testsList){

	// var pattern = "MultiPolygon";
	// // var reg1 = new RegExp (pat1,"g");
	// var reg = new RegExp(pattern,"g");

	// // look for polygon or multipolygon
	//  if (reg.test(type)==true){

var testStats = new Array();
alert(testsList.toSource());
logToConsole("in statistics");
for(var m = 0; m < uniqueNames.length;m++){
	logToConsole(uniqueNames[m]);
	var obj = {"countrie":uniqueNames[m],"num":0};
		var pattern = uniqueNames[m];
		var reg = new RegExp(pattern,"g");

	for(var n = 0; n < testsList.length;n++){

		var discr = getCountry( testsList[n].name); 
	
		alert(testsList[n].name);
	
		if(reg.test(discr)==true){
			obj.num++;
			alert("found it");
		}
	}

		testStats.push(obj);

}

	alert(testStats.toSource());

return testStats;
}



function drawTestSites(doc, pg,testsites){

var testsitesLayer = doc.layers.add({name:"testsites"});
	
		var w = 1*scale;
		var counter = 1;

var numsites = testsites.length;

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
	 // delay(1);
	 logToConsole("the used color: " + who);
	 // delay(2);

	 	if(DEBUG) {
	 		var hlw = 10;
	 		var highlite = pg.ovals.add({geometricBounds:[y1-hlw,x1-hlw,y1+hlw,x1+hlw],fillColor:doc.swatches[0],strokeWeight:10,strokeColor:doc.swatches[7]})
		}
		var ov = pg.ovals.add({ geometricBounds:[oy1 ,ox1 , oy2, ox2]});
		ov.properties = { fillColor:doc.swatches.item(0),
							itemLayer: testsitesLayer,
							strokeColor:doc.swatches.item(0),
							strokeWeight:0,
							strokeTint:50};
		// load the radiation image into the oval - colorize and fit it
		var path = (app.activeScript.parent.fsName);
		var radiation = File( path+"/radiation_warning.bmp");// app.ac
		ov.place(radiation);
		ov.images[0].fillColor = doc.swatches.item(who);
		ov.fit(FitOptions.CONTENT_TO_FRAME);
		ov.fit(FitOptions.CENTER_CONTENT);

		// if there is more than one test at the testsite
		// add a texbox with the number counted
		if(site.counter > 1){
		var tf = pg.textFrames.add({geometricBounds:[ty1 ,tx1 ,ty1 + 5, tx1 + 10],contents:String(site.counter)});
		// tf.contents = String(site.counter);
		tf.paragraphs.everyItem().appliedParagraphStyle = "body";
		tf.fit(FitOptions.FRAME_TO_CONTENT);

		// now draw a line
		var gl = pg.graphicLines.add();
	    var p1 = gl.paths[0].pathPoints[0];
  	    var p2 = gl.paths[0].pathPoints[1];
  	   		p1.anchor = [x1 ,y1];

  	    var gb = tf.geometricBounds;

  	    var th = gb[2] - gb[0];

	 		p2.anchor = [gb[1] - w/3,gb[0] + (th/2)];
	 		gl.properties = { strokeColor:doc.swatches.item(3),
				 				strokeWeight:0.25*scale, 
				 				itemLayer:testsitesLayer,strokeTint: 50,
				 				endCap: EndCap.ROUND_END_CAP};
	 		// gl.endCap = EndCap.ROUND_END_CAP;

		}

	if(DEBUG){
		delay(0.5);
		highlite.remove();}
	}// close i loop


}

// // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // 
// // // // // // // // STYLING  // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // 


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



	// NOW THE CHARACTER STYLES

	// type 0 = parstyle
	// type 1 = charstyle
	var styles = [{
		"type":0,
		"name":"body",
		"pointSize":3*scale,
		"font":"DejaVu Serif	Book",
		"fillTint":75,
		"just":Justification.LEFT_ALIGN,
		"fillColor":3,
		"strokeColor":2,
		"strokeWeight":0}];	

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

// // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // //   UTILITIES    // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // 


/**
 * This is just for resetting the view
 */


function reset_activeView(page){
    
     app.activeWindow.activePage = page;  
     // app.activeWindow.screenMode = ScreenModeOptions.PRESENTATION_PREVIEW;
     // app.activeWindow.zoomPercentage = 100;    
    }



function logToConsole(incoming){
	try{
	console.prompt.text = incoming+"";
	}catch(err){
		alert("Console is not initalized\n"+err);
	}
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
	// var reg1 = new RegExp (pat1,"g");
	var reg = new RegExp(pattern);
var result = "undefined";
	 if (reg.test(test_name)==true){
	 result = test_name.match(reg)[0];
	}
result  = result.slice(0, -1);
return result;
}




function readInCountries(){
var path = (app.activeScript.parent.fsName);
var myFile = File( path+"/world.geo.json/countries.geo.json");// app.ac
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

// http://www.adp-gmbh.ch/web/js/variables/copying_objs.html
  function copy_obj(o) {
    var c = new Object();

    for (var e in o) {
      c[e] = o[e];
    }
    return c;
  }


// code found here
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


// // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // 
// COLOR CREATION  COLOR CREATION  COLOR CREATION  COLOR CREATION // //
// // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // 


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
























// // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // 
// // // // OLD UNUESD FUNCTIONS // // // // //
// // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // 




// // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // 
// // // // OLD UNUESD FUNCTIONS // // // // //
// // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // 




// // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // 
// // // // OLD UNUESD FUNCTIONS // // // // //
// // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // 


function drawWeatherStationsNA(doc , pg){

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


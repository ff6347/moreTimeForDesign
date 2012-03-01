// #include "stations.json"
// #include "countries.json"
// #include "worldmap_mercator.js"

#include "jsonfiles/World_nuclear_test_sites.json"
// var stations = data;
// var capitals = countries;
// we need to read in the "countries.geo.json" file like this.
// it is ti heavy to include

var countries = readInCountries(); // read in all the countries

var tests = nucleartests;

var DEBUG = true;


// this is for quick testing and looking up data
// alert(countries.Results[10].country.Capital.toSource());

// exit();

var console = new Window("palette");
console.prompt = console.add("statictext",[0,0,500,20]);
console.show();


    console.prompt.text = "main function start";



main();
console.close();


// this the main function where all the other stuff takes place


function main(){
var doc = app.documents.add();

doc.documentPreferences.pageWidth = 400;
doc.documentPreferences.pageHeight = 200;

var pw = doc.documentPreferences.pageWidth;
var ph = doc.documentPreferences.pageHeight;

makeStyles(doc);

    console.prompt.text = "recalculating tests to testsites";

var testsites =  calculateTestSites(doc, tests);

var pg = doc.pages.item(0);
var rect = pg.rectangles.add({geometricBounds:[0,0,ph,pw]});
rect.properties = { fillColor:doc.swatches.item(3),strokeWeight:0,fillTint:42};
doc.zeroPoint = [ pw / 2, ph / 2 ];

	    console.prompt.text = "Draw Mercator Map - thanx 2 the incredible Jongware";

drawMercatorMap(doc,pg,countries);

  doc.layers.item(0).locked = true;

 // drawWeatherStationsNA(doc, pg);
 drawTestSites(doc, pg,testsites);
//drawCapitals(doc,pg);
// replaceLabels(doc,pg);


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
alert(uniqueNames);

colors_builder(doc, uniqueNames);
return list;
// close function

}


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




function checkRange(c_lat, o_lat, c_lon, o_lon){
	var isInRange = false;
	var r = 3;// the range
	if(((o_lat > (c_lat - r)) && (o_lat < (c_lat + r)) )&&(o_lon > (c_lon - r)) && (o_lon < (c_lon + r)) ){

		isInRange = true
	}
return isInRange;
}


function colors_builder(d, color_names){

	for(var j = color_names.length -1; j >=0 ; j--){
        
        
        // var topdown = ((100/(color_names.length -1)) *j);
        // var downtop =  100 - ((100/(color_names.length -1)) *j);
        
      
       
    var s = 66;
    var l = 55;
    
    var hue = (360/(color_names.length +1)) *j;

    var rgb = color_hsl2rgb(hue, s, l);

//~ 	var r = 255 - Math.abs(val -j)/amplitude ;
//~ 	var g = 255 -((Math.abs(val-j))* (255/ amplitude));
//~ 	var b =  255//;j*(255.0/(meta.db.projects.length - 1));
    try{		
//~         var colCMYK  = color_add(d,""+ meta.db.projects[j].id, ColorModel.PROCESS, [c,m,y,k]);
        var colRGB  = color_add(d,color_names[j], ColorModel.PROCESS, [rgb.r,rgb.g,rgb.b]);

		}catch(e){
   //        
		}
	}
}

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



function drawTestSites(doc, pg,testsites){

var testsitesLayer = doc.layers.add({name:"testsites"});
	
		var w = 1;
		var counter = 1;

var numsites = testsites.length;

	for(var i =0; i < numsites;i++){
		var site = testsites[i];
		var name = site.name;
		var who = getCountry(name);

		var desc = site.description;
		var y1 = site.lat*-1;
		var x1 = site.lon;

		var oy1 = y1- (w/2);
		var ox1 = x1- (w/2);
		var oy2 = y1+ (w/2);
		var ox2 = x1 + (w/2);

		
		var ty1 = y1 - w;
		var tx1 = x1 + w;

	 console.prompt.text = "("+ i +"/"+testsites.length+") site: "+ name+ " @ lat: " + site.lat + " lon: "+ site.lon;


		var ov = pg.ovals.add({ geometricBounds:[oy1 ,ox1 , oy2, ox2]});
		ov.properties = { fillColor:doc.swatches.item(0), strokeColor:doc.swatches.item(0),strokeWeight:0,strokeTint:50};
		var path = (app.activeScript.parent.fsName);
		var radiation = File( path+"/radiation_warning.bmp");// app.ac
		ov.place(radiation);
		ov.images[0].fillColor = doc.swatches.item(who);
		ov.fit(FitOptions.CONTENT_TO_FRAME);

		ov.fit(FitOptions.CENTER_CONTENT);

		ov.itemLayer = testsitesLayer;

		if(site.counter > 1){

		var tf = pg.textFrames.add({geometricBounds:[ty1 ,tx1 ,ty1 + 5, tx1 + 10]});
		tf.contents = String(site.counter);
		tf.paragraphs.everyItem().appliedParagraphStyle = "body";
		tf.fit(FitOptions.FRAME_TO_CONTENT);

		var gl = pg.graphicLines.add();
	    var p1 = gl.paths[0].pathPoints[0];
  	    var p2 = gl.paths[0].pathPoints[1];

  	   		p1.anchor = [x1 ,y1];

  	    var gb = tf.geometricBounds;

  	    var th = gb[2] - gb[0];

	 		p2.anchor = [gb[1] - w/3,gb[0] + (th/2)];
	 		gl.properties = {strokeColor:doc.swatches.item(3),strokeWeight:0.25, itemLayer:testsitesLayer,strokeTint: 50};
	 		gl.endCap = EndCap.ROUND_END_CAP;

		}

	}// close i loop


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

	 if (reg.test(type)==true){
	

	console.prompt.text = ("type MultiPolygon Name: " + name + "\ntype: " +type+"\ncoords array num: "+ coords.length +"\ncoords: " + cnt.geometry.coordinates.toSource());

	for (var j = 0; j < coords.length; j++) {

		for (var k = 0; k < coords[j].length; k++) {
					drawPolygon(coords[j][k]);

		};
	};

	}else{

	console.prompt.text = ("type polygon Name: " + name + "\ntype: " +type+"\ncoords array num: "+ coords.length  + "\n coords: " + coords[0].toSource());

	drawPolygon(coords[0]);
	}
};

lyr.locked = true;
}


function drawPolygon(coords){

	var pt = new Array();
	for(var i =0;i < coords.length;i++){
		var x = coords[i][0];
		var y =  coords[i][1]*-1;
		pt.push([x,y]);

	}

	var pol = app.activeDocument.polygons.add();
	pol.paths[0].entirePath = pt;
	pol.properties = {
		fillColor: pol.parent.parent.swatches[2],
		strokeWeight:0.1,
		strokeTint:50,
		strokeColor: pol.parent.parent.swatches[3]
	};
	// pol.fillColor = app.activeDocument.swatches[2];
	// pol.strokeWeight = 0.1;
	// pol.strokeTint = 50;
	// pol.strokeColor = app.activeDocument.swatches[3];

}

function makeStyles(doc){
	// type 0 = parstyle
	// type 1 = charstyle
	var styles = [{
		"type":0,
		"name":"body",
		"pointSize":3,
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


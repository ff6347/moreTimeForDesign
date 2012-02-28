#include "stations.json"
#include "countries.json"
#include "worldmap_mercator.js"
#include "World_nuclear_test_sites.json"
var stations = data;
var capitals = countries;
var sites = testsites;


// this is for quick testing and looking up data
// alert(countries.Results[10].country.Capital.toSource());

// exit();

var counter = new Window("palette");
counter.prompt = counter.add("statictext",[0,0,500,20]);
counter.show();


    counter.prompt.text = "main function start";

main();
counter.close();

function main(){
var doc = app.documents.add();

doc.documentPreferences.pageWidth = 400;
doc.documentPreferences.pageHeight = 200;

var pw = doc.documentPreferences.pageWidth;
var ph = doc.documentPreferences.pageHeight;

// this is created by jongware
// thanx a lot
// see http://forums.adobe.com/message/2538244#2538244
var pg = doc.pages.item(0);
var rect = pg.rectangles.add({geometricBounds:[0,0,ph,pw]});
rect.properties = { fillColor:doc.swatches.item(3),strokeWeight:0};
doc.zeroPoint = [ pw / 2, ph / 2 ];

	    counter.prompt.text = "Draw Mercator Map - thanx 2 the incredible Jongware";

 DrawMercatorMap();
 // drawWeatherStationsNA(doc, pg);
 drawTestSites(doc, pg);
//drawCapitals(doc,pg);
// replaceLabels(doc,pg);


}


function drawTestSites(doc, pg){
var capitalsLayer = doc.layers.add({name:"testsites"});
	
	alert(sites.toSource());

	for(var i in sites){
		var site = sites[i];
		var name = site.name;
		var desc = site.description;
		var y1 = site.lat*-1;
		var x1 = site.lon;
		var w = 2;

	 counter.prompt.text ="site: "+ name+ " @ lat: " + site.lat + " lon: "+ site.lon;

		var ov = pg.ovals.add({geometricBounds:[y1- (w/2),x1- (w/2),y1+ (w/2),x1 + (w/2)]});
		ov.properties = {fillColor:doc.swatches.item(2),strokeColor:doc.swatches.item(3),};



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
	// counter.prompt.text = cntry.Name;

try{
	var lat = cntry.Capital.GeoPt[0];
	var lon  = cntry.Capital.GeoPt[1];
	}catch(e){
// if ther are no lat lon data go on to the next countrie
	 counter.prompt.text = "!No geo data for " + cntry.Name+"'s capital availabe!";
	 delay(1.5);
		continue;
	}
	var w = 1;
	var y1 = (lat*-1);
	var x1 = (lon );
	// var y2 = y1;
	// var x2 = x1;
	 
	 counter.prompt.text = cntry.Name+"'s capital is: "+ cntry.Capital.Name +" @ lat: " + lat + " lon: "+ lon;




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
	// 	counter.prompt.text = (e + "\n" + cntry.Name);

	// }
}

}

function drawWeatherStationsNA(doc , pg){

var stationsLayer = doc.layers.add({name:"weather stations"});

for(var i in stations){
	var w = 0.5;
	var y1 = (stations[i].lat*-1)- ( w / 2);
	var x1 = (stations[i].lon )   - ( w / 2);
	    counter.prompt.text = stations[i].name +" @ lat: " + stations[i].lat + " lon: "+stations[i].lon;

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

//found here http://www.wer-weiss-was.de/theme157/article1143593.html

function delay(prmSec)
{
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


function reset_activeView(page){
    
     app.activeWindow.activePage = page;  
            app.activeWindow.zoomPercentage = 100;    
    }


// function replaceLabels(doc, pg){

// for(var i =0; i < pg.textFrames.length; i++){

// 	var currTF = pg.textFrames.item(i);

// 	for(var j =0; j < pg.textFrames.length;j++){
// 		var checkTF = pg.textFrames.item(j);

// 	    counter.prompt.text =  (parseInt(currTF.label) +" << current | --- | checking >> "+  parseInt(checkTF.label));
// 		if( parseInt(currTF.label) ==  parseInt(checkTF.label)){
// 			// do nothing. this is the same frame

// 		}else{
// 			if(((checkTF.geometricBounds[1] > currTF.geometricBounds[1]) 
// 							&& (checkTF.geometricBounds[1] < currTF.geometricBounds[3] ))
// 				&&((checkTF.geometricBounds[0] > currTF.geometricBounds[0]) 
// 							&& (checkTF.geometricBounds[0] < currTF.geometricBounds[2] ))){
// 			 counter.prompt.text =  (("moving textFrame number: " + checkTF.contents) );

// 			checkTF.move(undefined, [(currTF.geometricBounds[3] - currTF.geometricBounds[1]) + 3, 0]);

// 		  		}// close position check

// 			}// close else

// 		}// close j

// 	}// close i

// }
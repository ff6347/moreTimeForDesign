//growth.js

// typo.js

main();

function main(){


error0 = "Please open a document";
error1 = "Please select at least one non-compound path item";
error2 = "Please release all groups and compound path items";


if ( app.documents.length == 0 ) {
	alert(error0);
return;
}
var doc = app.activeDocument;

if (doc.selection.length == 0){
	alert(error1);
	return;
}
for (var i = doc.selection.length-1; i >=0; i--) {
	var theSelItem = doc.selection[i];
 // if (app.activeDocument.selection[i].typename != "PathItem"){
	// alert(alert1);
	if((theSelItem.typename == "GroupItem"||(theSelItem.typename=="CompoundPathItem"))){
		alert(error2);
		return;
 	};

 	if(theSelItem.typename=="PathItem"){
 		// alert(theSelItem.pathPoints);
 		var points = get_pathPoints(theSelItem.selectedPathPoints);
 		// theSelItem.strokeColor = theSelItem.fillColor;
 		// theSelItem.filled = false;
 		var swbuff = theSelItem.strokeWidth;

 		theSelItem.strokeWidth = 5;
 		var weight = theSelItem.strokeWidth;
 		var opacity = theSelItem.opacity;
 			var rgbColor = new RGBColor();
		rgbColor.red = 255;
		rgbColor.green = 255;
		rgbColor.blue = 255;
        theSelItem.strokeColor = rgbColor;

 		var splits = 23;//parseInt(Math.random()*23);
 		var children = 23;//parseInt(Math.random()*30);
 		growth(doc,points, children, splits,weight,opacity);
 	// 	theSelItem.strokeWidth = swbuff;

		// rgbColor.red = 0;
		// rgbColor.green = 0;
		// rgbColor.blue = 0;
  //       theSelItem.strokeColor = rgbColor;		// theSelItem.stroked = false;
 		}

	};// end of i loop

	// for (var i = doc.selection.length-1; i >=0; i--) {
	// 	var theSelItem = doc.selection[i];
	// 	theSelItem.remove();
	// }

};// close main


function growth(doc, points, childNum, splitNum,weight,opacity){

	for(var i = 0; i < points.length; i ++){
		var w = weight;
		var o = opacity;
		var x1 = points[i][0];
		var y1 = points[i][1];

		var p1 = points[i];
		var p2 = p1; // this is an bug some how
		for(var n = 0; n < childNum; n++){

			w*=0.9;
			o*=0.9;
		var l = doc.pathItems.add()
		var path = new Array();
		for(var s = 0; s < splitNum; s++){
		var p2 = new Array(x1+ (Math.random()*30)-15,y1 + (Math.random()*30)-15);
		path.push(new Array(p1,p2));
        // l.pathPoints[0].pointType = PointType.SMOOTH;
        // l.pathPoints[1].pointType = PointType.SMOOTH;
    
        }
        l.strokeWidth = w;
        l.opacity = o;
        l.strokeCap = StrokeCap.ROUNDENDCAP;
        for(var p in path){
        l.setEntirePath(path[p]);
        try{
        l.pathPoints[p].pointType = PointType.SMOOTH;
    	}catch(e){}
		}
        p1 = p2;
        x1 = p2[0];
        y1 = p2[1];


	}

}


}

function get_pathPoints(points){
	var list = new Array();
	for (var i = 0; i < points.length; i++) {
		var p = points[i];

		var a = p.anchor;
		var x = a[0];
		var y = a[1]; 
		list.push([x,y]);
		
	};

return list;
}
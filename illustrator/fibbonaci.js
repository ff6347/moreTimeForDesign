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
 		var points = get_pathPoints(theSelItem.pathPoints);
 		theSelItem.strokeColor = theSelItem.fillColor;
 		theSelItem.filled = false;
 		draw_lines(doc,points);
		theSelItem.stroked = false;
 		}

	};// end of i loop

};// close main

function draw_lines(doc,points){

for (var i = 0; i < points.length-1; i++) {

	if(i==0) {
		var pp = points[points.length-1]; 
	}else{
	var pp = points[i-1];

	}

	var p  = points[i];

	make_lines(doc,p,pp);


        			// myLine.opacity = o;
					// myLine.zOrder(ZOrderMethod.SENDTOBACK)
}


// void rotate (angle: number
// 	[, changePositions: bool=true]
// 	[, changeFillPatterns: bool=true]
// 	[, changeFillGradients: bool=true]
// 	[, changeStrokePattern: bool=true]
// 	[, rotateAbout: Transformation=Transformation.CENTER])

function make_lines(doc,p1,p2){
	// this is a math constant
	var phi = (Math.sqrt(5)+1)/2; // Calculate Phi

	var myLine = doc.pathItems.add();
       	myLine.stroked = true;
        myLine.setEntirePath( new Array(p1,p2));
	var rgbColor = new RGBColor();
		rgbColor.red = 0;
		rgbColor.green = 0;
		rgbColor.blue = 0;
        myLine.strokeColor = rgbColor;
        myLine.filled = false;
        // myLine.strokeWidth = 0.25;
    var rotations = 360*3;
        for(var i = 0; i < rotations; i ++){
  //       var newrgbColor = new RGBColor();
		// newrgbColor.red = (255/rotations)*i;
		// newrgbColor.green = (255/rotations)*i;
		// newrgbColor.blue = (255/rotations)*i;
        var l = myLine.duplicate();
       // l.fillColor = newrgbColor;
      var angle = degrees_2radians(i); 
      var sinval = Math.sin(angle);
      var cosval = Math.cos(angle);
      var x = cosval * (Math.pow(phi, (2/Math.PI)*(angle)));
      var y = sinval * (Math.pow(phi, (2/Math.PI)*(angle)));
        l.pathPoints[0].anchor = [x,y];
        var p1 = l.pathPoints[0].anchor;
        var p2 = l.pathPoints[1].anchor;

        // var middle = get_m_of_ab(p1[0],p1[1],p2[0],p2[1]); 
       	// l.pathPoints[1].anchor = middle;


       	       // l.rotate(i,undefined,undefined,undefined,undefined,Transformation.CENTER);

        // l.strokeColor = rgbColor;
        l.opacity = (100/rotations)*i;

        }
        // myLine.remove();
	};
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

function get_m_of_ab(x1,y1,x2,y2){

var m = [(x2+x1)/2,(y2+y1)/2];

return m;
}

function radians_2degrees(rad){
        var degrees = rad * (180/Math.PI);
	return degrees;

}


function degrees_2radians(deg){
	var radians = deg * (Math.PI/180);

return radians;
}
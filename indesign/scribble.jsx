var arr = new Array();
arr.push("Hello");
arr.push("my name is fabiantheblind a.k.a. Fabian Morón Zirfas.");
arr.push("I am a freelance designer, motion grapher and coder living in Berlin who was born on his birthday and occasionally does stuff that involves things.");
arr.push("If you'd like to contact me use one of the social networks or write me an email.");



var doc = app.documents.add(
	{
		documentPreferences:{
			pageWidth:160,
			pageHeight:160
		}
	}
);

var step = 5;
var margin = 45;
var y1 = margin;
var x1 = margin;
var y2 = doc.documentPreferences.pageHeight - margin;
var x2 = doc.documentPreferences.pageWidth - margin;
var ovals = new Array();

for (var i= 0;i < arr.length + 2;i++){
		ovals.push(
			doc.pages.item(0).ovals.add(
			{
				geometricBounds:[y1,x1,y2,x2],
				strokeWeight:0
			}
			)
		);
		var tp = ovals[i].textPaths.add();

		var horiz = app.transformationMatrices.add(
			{
				horizontalTranslation : 5*i
			});
		var tm = app.transformationMatrices.add(
			{
				counterclockwiseRotationAngle : 180 + (i*step) 
			});

		ovals[i].transform(
			CoordinateSpaces.pasteboardCoordinates, AnchorPoint.CENTER_ANCHOR, tm
			);
		ovals[i].transform(
			CoordinateSpaces.pasteboardCoordinates, AnchorPoint.LEFT_CENTER_ANCHOR, horiz
			);

		if(i > 0){
			tp.previousTextFrame = ovals[i-1].textPaths.item(0);
		};



y1+=step;
x1+=step;
y2-=step;
x2-=step;


};

ovals[0].textPaths[0].contents = arr.join("\n");

ovals[0].textPaths[0].words[0].pointSize = 23;
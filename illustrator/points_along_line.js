// points_along_line.js
// based on this processing sketch:
// http://processing.org/discourse/yabb2/YaBB.pl?num=1260544401

points_along_line(0,0, 100,100);
function points_along_line(x1,y1,x2,y2){
var a, b;
var x, y, px, py;
var step = 1;

  a = y2 - y1;
  if (x1 == x2){
    a = 0;
  }else{
     a = a /( x2 - x1);
   }
  b = y1 - x1 * a;
  px = x1; 
  py = y1;

while(x < x2){
	  x = px + step;

  y = fun(x,a,b);
  line(px, py, x, y);
  	px = x;
  	py = y;

	}

}




function fun(x,a,b){
  return a * x + b;
}


  function line(px, py, x, y){

  		var doc = app.activeDocument;
  		var myLine = doc.pathItems.add();
       	myLine.stroked = true;
        myLine.setEntirePath( new Array([px,py],[x,y]));

  }
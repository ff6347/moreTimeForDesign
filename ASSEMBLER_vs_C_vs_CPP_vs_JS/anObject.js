main();

function main(){

var myObject = {
	name:"Hello World",
	compare : function(a,b){var res = (a>b)? a :  b;return res;}
    /* this is the same as:
    function(a,b){if(a>b){return a;}else{return b;}}
         or
     function(a,b){if(a>b) return a; else return b;}
        */
	};
// or use: new Object();
// and fill the variables like this
// myObject.name = "Hello World";
// myObject.compare = function(a,b){if(a>b){return a;}else{return b;}};

var a = 23, b = 5;

alert("The Object named: "+ 
	myObject.name +"\nCompared: "
	+ a +" with "+ b +
	"\n" + myObject.compare(a,b) 
	+ " is bigger\n");
myObject = null;
return 0;

}
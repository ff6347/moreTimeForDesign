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
// quickscribble
// var doc = app.activeDocument;
findAndChange(app.activeDocument);

function findAndChange(doc){
	
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

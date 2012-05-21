// This scipt creates lines on the lower edge of a book per every page
// its like an position viewer in a book

// Copyright (c)  2012 
// Fabian "fabiantheblind" Morón Zirfas  
// Permission is hereby granted, free of charge, to any 
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights 
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to 
// whom the Software is furnished to do so, subject to 
// the following conditions:  
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.  
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  

// see also http://www.opensource.org/licenses/mit-license.php


main();

function main(){

    // check if there is a book
    if ( app.books.length < 1 ){
    errorExit( "you need at least one book with a document in it" );
    };
// now go thru the books content
       for ( var b = 0; b < app.books.length; b++ ){
            doBook( app.books[b]); 
            };

}; // end main


/**
 *  this does one book
 *
 */ 
function doBook( aBook ){

    var fullfill = 42;
    var lowfill = 10;

    // this loop is to get the number of pages.
    // i think if your pages have some special names
    // it wont work later
	var len = 0;
    for ( var i = 0; i < aBook.bookContents.length; i++ ){
// thnx to Neil77 from HDS
    var content = aBook.bookContents[i];

    var doc = app.open(content.fullName);
    len += doc.pages.length;
    };


    // loop the book again to work loop every doc
    for(var i = 0; i < aBook.bookContents.length;i++ ){
    // get the document
    var content = aBook.bookContents[i];
    // open the doc
    var doc = app.open(content.fullName);
    // make a new layer
    var newLayer = doc.layers.add({name:"pages bar"});

    // hm this is a problem. i don't want to change the doc settings
    // but it does not come back
    // so we just set it
    // var rulerOriginBuffer = doc.viewPreferences.rulerOrigin;

    doc.viewPreferences.properties = {
    horizontalMeasurementUnits: MeasurementUnits.MILLIMETERS,
    verticalMeasurementUnits:MeasurementUnits.MILLIMETERS,
    rulerOrigin: RulerOrigin.PAGE_ORIGIN
    };

    // doc.documentPreferences.facingPages = false;


    var mp = doc.marginPreferences; // for better handling

    var top = mp.top; // 
    var left = mp.left; //
    var right = mp.right; //
    var bttm = mp.bottom; //


    var ph = doc.documentPreferences.pageHeight;
    var pw = doc.documentPreferences.pageWidth;

    var step =    (pw - (left + right)) / len; 
    // use this if you want it on the side
    // var step = (ph - (top + bttm)) / len; 
// ------------ now loop the pages ------------
    for (var j = 0; j < doc.pages.length; j++) {
    	var pg = doc.pages[j];

    // use this if you want it on the side
    	// var x1 = 3;
        // var x2 = 8;
    	// var y1 = top + (step/2);

        var y1 = ph - 5;
        var y2 = ph + 5;
        var x1 = left + (step/2);

// ------------ the graphicline loop ------------
    	for(var k = 0; k < len; k++){

            var gl = pg.graphicLines.add({
            itemLayer : newLayer
                }); 

            if((k+1) == Number(pg.name) ){
            // use this if you want it on the side
            // x1 = x1  - 11;
            y1 = ph - 8;
            gl.strokeTint = fullfill;
            // add the pagenumber
            var tf = pg.textFrames.add({
                        geometricBounds:[y1 - 5 , x1, y1+7,x1 + 10],
                        contents: pg.name,
                        label: "1", /* use this later for styling */
                        itemLayer: newLayer /* to keep it tidy */
                    });
            // style it a bit
            try { tf.paragraphs.item(0).appliedFont = doc.paragraphStyles.item("Pagina links");}catch(e){};
            try { tf.paragraphs.item(0).fillTint = fullfill;}catch(e){};

            }else{
            // use this if you want it on the side
            // x1 = 3;
            y1 = ph - 5;
            gl.strokeTint = lowfill;
            };

// ------------ left edge ------------
    // use this if you want it on the side
    	// gl.paths[0].pathPoints[0].anchor = [x1 , y1]; 
		// gl.paths[0].pathPoints[1].anchor = [x2, y1]; 
        // use this if you want it on the side
        // y1+=step;// increase

// ------------ lower edge ------------
        gl.paths[0].pathPoints[0].anchor = [x1 , y1]; 
        gl.paths[0].pathPoints[1].anchor = [x1, y2]; 
        x1+=step; // increase

    		}; // graphicline loop

    	}; // end pages loop
            // doc.documentPreferences.facingPages = true;


    }; // books contents loop end

}; // end doBook
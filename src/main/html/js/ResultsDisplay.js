function ResultsDisplay() {	
	// GWT vars
	
	
	// Forms 
	
	// Buttons 
	
	// jQuery objects
	this.$panel = jQuery("#resultsDisplay");
		
	// Bind handlers
	
	// Init
	this.$panel.hide();
}

ResultsDisplay.prototype.show = function() {
	this.$panel.show();
}

/*
 * GUI FUNCTIONS
 */



/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

ResultsDisplay.prototype.clear = function () {
	console.log("clear");
}

ResultsDisplay.prototype.init = function () {
	console.log("init");
}

ResultsDisplay.prototype.plot = function () {
	console.log("init");
}

ResultsDisplay.prototype.setTree = function (json) {
	console.log("setTree"+json);
}


/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */


/*
 * EVENT HANDLERS
 */

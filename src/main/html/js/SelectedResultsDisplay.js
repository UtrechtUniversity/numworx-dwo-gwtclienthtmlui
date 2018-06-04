function SelectedResultsDisplay() {	
	// GWT vars
	this.resultTree = null;
	
	
	// Forms 
	
	
	// Buttons 
	
	// jQuery objects
	this.$panel = jQuery("#selectedResultsDisplay");
	
	this.$selectedResultsTable = $("#selectedResultsTable");
	this.$selectedResultsTableBody = this.$selectedResultsTable.find("tbody");	
	this.$selectedResultsTableHead = this.$selectedResultsTable.find("thead");	
	this.$selectedResultsRow = this.$selectedResultsTable.find("tbody tr").detach();
	this.$selectedResultsColumn = this.$selectedResultsTable.find("#selectedResultsTableRepeatableColumn").detach();
	this.$selectedResultsColumnHeader = this.$selectedResultsTable.find("#selectedResultsTableRepeatableColumnHeader").detach();	
		
	// Bind handlers
	
	
	// Init
	this.$panel.hide();
}

SelectedResultsDisplay.prototype.show = function() {
	this.$panel.show();
	
}

/*
 * GUI FUNCTIONS
 */




/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

SelectedResultsDisplay.prototype.clear = function () {
	console.log("clear");
	
}

SelectedResultsDisplay.prototype.setResultTree = function (resultsTree, studentsTree) {
	console.log(resultsTree);
	console.log(studentsTree);
}


/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */



/*
 * EVENT HANDLERS
 */



function AddPersonDisplay() {
	
	// GWT vars
	
	
	// Forms 
	this.addPersonForm = document.forms["addPerson"];	
	
	// jQuery objects
	this.$panel = jQuery("#addPersonDisplay");
	
	this.$addPersonForm = $(this.addPersonForm);
		
	// Bind handlers
	
	// Init
	this.$panel.hide();
	
}

AddPersonDisplay.prototype.show = function() {
	this.$panel.show();
}


/*
 * GUI Functions
 * Map to java implementation
 */




/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

AddPersonDisplay.prototype.clear = function () {
	console.log("clear");
	
}
AddPersonDisplay.prototype.init = function () {
	console.log("clear");
	
}

AddPersonDisplay.prototype.setEmptyTableMessage = function (json) {
	console.log("setEmptyTableMessage");
}
AddPersonDisplay.prototype.setLoadingTableMessage = function (json) {
	console.log("setLoadingTableMessage");
}





/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */





/*
 * EVENT HANDLERS
 */


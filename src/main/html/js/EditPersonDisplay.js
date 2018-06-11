function EditPersonDisplay() {
	
	// GWT vars
	
	
	// Forms 
	this.editPersonDetailsForm = document.forms["editPersonDetails"];
	this.editPersonSchoolclassesForm = document.forms["editPersonSchoolclasses"];
	
	
	// jQuery objects
	this.$panel = jQuery("#editPersonDisplay");
	
	this.$editPersonDetails = $(this.editPersonDetails);
	this.$editPersonSchoolclasse = $(this.editPersonSchoolclasse);
	
	// Bind handlers
	
	
	// Init
	this.$panel.hide();
	
}

EditPersonDisplay.prototype.show = function() {
	this.$panel.show();
}


/*
 * GUI Functions
 * Map to java implementation
 */

EditPersonDisplay.prototype.disableAllInputFields = function () {	
	for (var id in this.editPersonDetailsForm.elements) {
		this.editPersonDetailsForm.elements[id].disabled = true;	
	}
}



/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

EditPersonDisplay.prototype.clear = function () {
	console.log("clear");
	
}

EditPersonDisplay.prototype.setUser = function (json) {
	//var email = json.email;
	var userName = json.userName;
	var familyName = json.familyName;
	var givenName = json.givenName;
	var insertion = json.insertion;

	//this.editPersonDetailsForm.elements["email"].value = this.email;
	this.editPersonDetailsForm.elements["userName"].value = userName;
	this.editPersonDetailsForm.elements["familyName"].value = familyName;
	this.editPersonDetailsForm.elements["givenName"].value = givenName;
	this.editPersonDetailsForm.elements["insertion"].value = insertion;
	
	if (true) { // docent
		this.disableAllInputFields();
	}
}

EditPersonDisplay.prototype.setSingleSchoolStudent = function (json) {
	console.log("setSingleSchoolStudent");
}


EditPersonDisplay.prototype.setSchoolClasses = function (json) {
	console.log("setSchoolClasses");
}

EditPersonDisplay.prototype.setEmptyTableMessage = function (json) {
	console.log("setEmptyTableMessage");
}
EditPersonDisplay.prototype.setLoadingTableMessage = function (json) {
	console.log("setLoadingTableMessage");
}





/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */





/*
 * EVENT HANDLERS
 */


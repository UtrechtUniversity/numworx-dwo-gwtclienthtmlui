function EditSchoolclassesDisplay() {	
	// GWT vars
	
	
	// Forms 
	this.changeStudentsForm = document.forms["changeStudents"];
	this.changeTeachersForm = document.forms["changeTeachers"];
	this.changeModulesForm = document.forms["changeModules"];
	
	// jQuery objects
	this.$panel = jQuery("#editSchoolclassesDisplayPanel");
	
	this.$changeStudentsForm = $(this.changeStudentsForm);
	this.$changeTeachersForm = $(this.changeTeachersForm);
	this.$changeModulesForm = $(this.changeModulesForm);
		
	// Bind handlers
	
	// Init
	this.$panel.hide();
}

EditSchoolclassesDisplay.prototype.show = function() {
	this.$panel.show();
}

/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

EditSchoolclassesDisplay.prototype.clear = function () {
}

EditSchoolclassesDisplay.prototype.init = function () {
	console.log("init");
}

EditSchoolclassesDisplay.prototype.showSchoolClass = function(json) {	
	console.log(json);
}

EditSchoolclassesDisplay.prototype.showStudents = function(json) {	
}

EditSchoolclassesDisplay.prototype.showTeachers = function(json) {	
}

EditSchoolclassesDisplay.prototype.showModules = function(json) {	
}

/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */



/*
 * EVENT HANDLERS 
 */


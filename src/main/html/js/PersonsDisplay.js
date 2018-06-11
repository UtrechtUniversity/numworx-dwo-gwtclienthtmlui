function PersonsDisplay() {
	
	// GWT vars
	
	
	// Forms 
	this.personsSearchForm = document.forms["personsSearch"];
	this.personsEditForm = document.forms["personsEdit"];
	this.personsAddForm = document.forms["personsAdd"];
	this.personsImportForm = document.forms["personsImport"];
	
	// jQuery objects
	this.$panel = jQuery("#personsDisplay");
	
	this.$personsSearchForm = $(this.personsSearchForm);
	
	this.$personsAddForm = $(this.personsAddForm);
	this.$personsImportForm = $(this.personsImportForm);
	
	// Bind handlers
	this.$personsSearchForm.on('submit', $.proxy(this.submitPersonsSearchForm, this));
	this.$personsSearchForm.find('input[type="radio"]').on('change', $.proxy(this.changePersonsSearchRole, this));
	this.$personsAddForm.on('submit', $.proxy(this.submitPersonsAddForm, this));
	this.$personsImportForm.on('submit', $.proxy(this.submitPersonsImportForm, this));
	
	// Init
	this.$panel.hide();
	
}

PersonsDisplay.prototype.show = function() {
	this.$panel.show();
}


/*
 * GUI Functions
 * Map to java implementation
 */

PersonsDisplay.prototype.filterPersonsList = function () {
	console.log("filter");
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

PersonsDisplay.prototype.clear = function () {
	console.log("clear");
	this.personsSearchFormToggle(false);	
}

PersonsDisplay.prototype.init = function (json) {
	console.log("init");
	//Helpers.stretchHeight( [ this.$schoolLoginsTableBody ] )
}

PersonsDisplay.prototype.showPersons = function(json) {
	console.log("showPersons");
	console.log(json);
	this.filterPersonsList();
	
}

PersonsDisplay.prototype.setEmptyTableMessage = function(json) {
	console.log("setEmptyTableMessage");
	
}
PersonsDisplay.prototype.setLoadingTableMessage = function(json) {
	console.log("setLoadingTableMessage");
	
}




/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */

PersonsDisplay.prototype.searchPersons = function() {
	if (this.personsSearchForm.elements["role"].value == "L") app.getPresenterFactory().getPersonsPresenter().showStudentList();
	if (this.personsSearchForm.elements["role"][1].value == "D") app.getPresenterFactory().getPersonsPresenter().showTeacherList();
	
}


PersonsDisplay.prototype.addPerson = function() {
	app.getPresenterFactory().getPersonsPresenter().addPerson();
}
PersonsDisplay.prototype.importPersons = function() {
	app.getPresenterFactory().getPersonsPresenter().importPersons();
}




/*
 * EVENT HANDLERS - SEARCH
 */

PersonsDisplay.prototype.submitPersonsSearchForm = function(event) {
	event.preventDefault();	
	this.searchPersons();
}

PersonsDisplay.prototype.changePersonsSearchRole = function(event) {
	if (this.personsSearchForm.elements["role"].value != "") this.personsSearchFormToggle(true);
	else this.personsSearchFormToggle(false);	
}

// helpers
PersonsDisplay.prototype.personsSearchFormToggle = function(value) {
	if (value) this.$personsSearchForm.find(':submit').prop('disabled','');
	else this.$personsSearchForm.find(':submit').prop('disabled','disabled');
}

/*
 * EVENT HANDLERS - EDIT
 */



/*
 * EVENT HANDLERS - ADD & IMPORT
 */

PersonsDisplay.prototype.submitPersonsAddForm = function(event) {
	event.preventDefault();	
	this.addPerson();
}
PersonsDisplay.prototype.submitPersonsImportForm = function(event) {
	event.preventDefault();	
	this.importPersons();
}



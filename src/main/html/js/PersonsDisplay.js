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
	this.$personsEditForm = $(this.personsEditForm);
	this.$personsAddForm = $(this.personsAddForm);
	this.$personsImportForm = $(this.personsImportForm);
	
	this.$personsRow = this.$personsEditForm.find("tbody tr").detach();
	this.$personsTableBody = this.$personsEditForm.find("tbody");
	
	// Bind handlers
	this.$personsSearchForm.on('submit', $.proxy(this.submitPersonsSearchForm, this));
	this.$personsSearchForm.find('input[type="radio"]').on('change', $.proxy(this.changePersonsSearchRole, this));
	this.$personsEditForm.on('submit', $.proxy(this.submitPersonsEditForm, this));
	this.$personsAddForm.on('submit', $.proxy(this.submitPersonsAddForm, this));
	this.$personsImportForm.on('submit', $.proxy(this.submitPersonsImportForm, this));
	
	// Init
	this.$panel.hide();
	
}

PersonsDisplay.prototype.show = function() {
	this.$panel.show();
	Helpers.stretchHeight([ this.$personsTableBody ]);
}


/*
 * GUI Functions
 * Map to java implementation
 */

PersonsDisplay.prototype.filterPersonsList = function () {
	console.log("filter");
	var personsSearchForm = this.personsSearchForm; // for the inline function
	
	if ( this.personsSearchForm.elements["userName"].value == "" &&
		 this.personsSearchForm.elements["givenName"].value == "" &&
		 this.personsSearchForm.elements["insertion"].value == "" &&
		 this.personsSearchForm.elements["familyName"].value == "" ) {
			$result = this.$personsTableBody.find("tr");
	} else {	
		var $result = this.$personsTableBody.find("td span").filter(function() {
			el = $(this).get(0);
						
			if (el.parentElement.cellIndex == 0) val = personsSearchForm.elements["userName"].value;
			if (el.parentElement.cellIndex == 1) val = personsSearchForm.elements["givenName"].value;
			if (el.parentElement.cellIndex == 2) val = personsSearchForm.elements["insertion"].value;
			if (el.parentElement.cellIndex == 3) val = personsSearchForm.elements["familyName"].value;
			
			return el.innerHTML.toLowerCase() == val.toLowerCase();
		}).closest("tr");
	}
	
	this.$personsTableBody.find("tr").hide();
	$result.show();
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

PersonsDisplay.prototype.clear = function () {
	console.log("clear");
	this.personsSearchFormToggle(false);	
	this.$personsTableBody.html("");
	this.personsEditFormToggle(false);
	
	this.personsSearchForm.elements["role"][0].checked = true;
	this.personsSearchForm.elements["role"][1].checked = false;
	this.changePersonsSearchRole();
	
	this.personsSearchForm.elements["userName"].value == "";
	this.personsSearchForm.elements["givenName"].value == "";
	this.personsSearchForm.elements["insertion"].value == "";
	this.personsSearchForm.elements["familyName"].value == "";
}

PersonsDisplay.prototype.init = function (json) {
	console.log("init");
	
}

PersonsDisplay.prototype.showPersons = function(json) {
	var persons = json, personName;
	
	console.log(persons);
	
	this.$personsTableBody.html("");
	
	// No Results
	if ($.isEmptyObject(persons)) {
		$row = this.$personsRow.clone();
		this.$personsTableBody.html('<tr colspan="4" class="empty"><td>Geen leerlingen gevonden.</td></tr>');
		return;
	}
	
	var i = 1;
	for (var id in persons) { 
		$row = this.$personsRow.clone();		
		$row.find("#personsTableId").val( id ).removeAttr("id");
		$row.find("#personsTableUserName").html( persons[id].userName ).removeAttr("id");
		$row.find("#personsTableGivenName").html( persons[id].givenName ).removeAttr("id");
		$row.find("#personsTableInsertion").html( persons[id].insertion ).removeAttr("id");
		$row.find("#personsTableFamilyName").html( persons[id].familyName ).removeAttr("id");
		$row.find("#personsTableSingleSchool").html( persons[id].singleSchool ? "ja" : "" ).removeAttr("id");
				 
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});
		
		$row.on('click keypress', $.proxy(this.clickPersonsRow, this));
		this.$personsTableBody.append($row);
		i++;
	}
	
	this.personsEditFormToggle(false);	
	
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
	this.stateRole = this.personsSearchForm.elements["role"].value;
	console.log(this.stateRole);
	if (this.personsSearchForm.elements["role"].value == "L") app.getPresenterFactory().getPersonsPresenter().showStudentList();
	if (this.personsSearchForm.elements["role"].value == "D") app.getPresenterFactory().getPersonsPresenter().showTeacherList();
	
}

PersonsDisplay.prototype.editPerson = function(id) {
	console.log(id);
	if (this.stateRole == "L") app.getPresenterFactory().getPersonsPresenter().editStudent(id);
	if (this.stateRole == "D") app.getPresenterFactory().getPersonsPresenter().editTeacher(id);
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

PersonsDisplay.prototype.submitPersonsEditForm = function(event) {
	event.preventDefault();	
	this.editPerson(this.personsEditForm.elements["id"].value);
}

PersonsDisplay.prototype.clickPersonsRow = function(event) {
	Helpers.selectTableRow(event);
	if (this.personsEditForm.elements["id"].value != "") this.personsEditFormToggle(true);
	else this.personsEditFormToggle(false);	
}

PersonsDisplay.prototype.personsEditFormToggle = function(value) {
	if (value) this.$personsEditForm.find(':submit').prop('disabled','');
	else this.$personsEditForm.find(':submit').prop('disabled','disabled');
}


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



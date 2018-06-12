function EditPersonDisplay() {
	
	// GWT vars
	this.role = "";
	
	// Forms 
	this.editPersonDetailsForm = document.forms["editPersonDetails"];
	this.editPersonSchoolclassesForm = document.forms["editPersonSchoolclasses"];
	
	//Buttons
	this.removeButton = this.editPersonDetailsForm.elements["remove"];
	
	// jQuery objects
	this.$panel = jQuery("#editPersonDisplay");
	
	this.$editPersonDetailsForm = $(this.editPersonDetailsForm);
	this.$editPersonSchoolclassForm = $(this.editPersonSchoolclassForm);
	
	this.$removeButton = $(this.removeButton);
	
	this.$editPersonSchoolclassesRow = this.$addPersonSchoolclassesForm.find("tbody tr").detach();
	this.$editPersonSchoolclassesTableBody = this.$addPersonSchoolclassesForm.find("tbody");
	
	// Bind handlers
	this.$editPersonDetailsForm.on('submit', $.proxy(this.submitEditPersonDetails,this));	
	this.$removeButton.on('click', $.proxy(this.clickRemoveButton,this));	
	
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
	
	var schoolclasses = json;
	
	this.$editPersonSchoolclassesTableBody.html("");
	
	var i = 1;
	for (var id in schoolclasses) { 
		el = schoolclasses[id];
		//console.log(el); console.log(id);
		$row = this.$editPersonSchoolclassesRow.clone();
		$row.prop('tabindex', i);
		$row.find("#addPersonSchoolclassName").html( el ).removeAttr("id");

		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});

		$row.find("input[name='active[]']").on('change', $.proxy(this.changeActiveCheckbox,this));
		this.$editPersonSchoolclassesTableBody.append($row);
		i++;
	}
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

AccountDisplay.prototype.submitPersonToSchoolClass = function(id) {
	if (this.role == "D") app.getPresenterFactory().getEditTeacherPresenter().submitTeacherToSchoolClass(id);
	if (this.role == "L") app.getPresenterFactory().getEditStudentPresenter().submitStudentToSchoolClass(id);
}
AccountDisplay.prototype.removePersonFromSchoolClass = function(id) {
	if (this.role == "D") app.getPresenterFactory().getEditTeacherPresenter().removeTeacherFromSchoolClass(id);
	if (this.role == "L") app.getPresenterFactory().getEditStudentPresenter().removeStudentFromSchoolClass(id);
}

AccountDisplay.prototype.updatePerson = function() {
	if (this.role == "D") return;
	
	// save student
}
AccountDisplay.prototype.removePerson = function() {
	if (this.role == "D") return;
	
	// remove student
}


/*
 * EVENT HANDLERS - Details
 */

AccountDisplay.prototype.submitEditPersonDetails = function(event) {
	event.preventDefault();		
	if (this.role == "L") this.updatePerson();
}
AccountDisplay.prototype.clickRemoveButton = function(event) {
	event.preventDefault();		
	if (this.role == "L") this.removePerson();
}

/*
 * EVENT HANDLERS - Schoolclasses
 */

AccountDisplay.prototype.changeActiveCheckbox = function(event) {
	if (event.target.checked) {
		this.submitPersonToSchoolClass(event.target.value);
	} else {
		this.removePersonFromSchoolClass(event.target.value);
	}
}



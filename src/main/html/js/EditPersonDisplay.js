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
	this.$editPersonSchoolclassesForm = $(this.editPersonSchoolclassesForm);
	
	this.$removeButton = $(this.removeButton);
	
	this.$editPersonSchoolclassesRow = this.$editPersonSchoolclassesForm.find("tbody tr").detach();
	this.$editPersonSchoolclassesTableBody = this.$editPersonSchoolclassesForm.find("tbody");
	
	// Bind handlers
	this.$editPersonDetailsForm.on('submit', $.proxy(this.submitEditPersonDetails,this));	
	this.$removeButton.on('click', $.proxy(this.clickRemoveButton,this));	
	
	// Init
	this.$panel.hide();
	
}

EditPersonDisplay.prototype.show = function() {
	this.$panel.show();
	Helpers.stretchHeight([ this.$editPersonSchoolclassesTableBody ]);
}


/*
 * GUI Functions
 * Map to java implementation
 */

EditPersonDisplay.prototype.disableInputFieldsTeacher = function () {	
	for (var id in this.editPersonDetailsForm.elements) {
		this.editPersonDetailsForm.elements[id].disabled = true;	
	}
}
EditPersonDisplay.prototype.disableInputFieldsStudent = function () {	
	this.editPersonDetailsForm.elements["password"].disabled = true;	
	this.editPersonDetailsForm.elements["role"].disabled = true;	
}
EditPersonDisplay.prototype.removeButtons = function () {	
	$(this.editPersonDetailsForm.elements["submit"]).remove();
	$(this.editPersonDetailsForm.elements["remove"]).remove();
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

EditPersonDisplay.prototype.clear = function () {
	console.log("clear");
	this.editPersonDetailsForm.elements["userName"].value = "";
	this.editPersonDetailsForm.elements["familyName"].value = "";
	this.editPersonDetailsForm.elements["givenName"].value = "";
	this.editPersonDetailsForm.elements["insertion"].value = "";
	this.editPersonDetailsForm.elements["role"].value = "";	
}

EditPersonDisplay.prototype.setUser = function (role,json) {
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
	this.editPersonDetailsForm.elements["role"].value = role == "TEACHER" ? "docent" : "leerling";
	
	this.role = role;
	
	console.log(this.role);
	
	if (this.role == "TEACHER") { 
		this.disableInputFieldsTeacher();
		this.removeButtons();
	}
	if (this.role == "STUDENT") { 
		this.disableInputFieldsStudent();	
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

EditPersonDisplay.prototype.submitPersonToSchoolClass = function(id) {
	if (this.role == "TEACHER") app.getPresenterFactory().getEditTeacherPresenter().submitTeacherToSchoolClass(id);
	if (this.role == "STUDENT") app.getPresenterFactory().getEditStudentPresenter().submitStudentToSchoolClass(id);
}
EditPersonDisplay.prototype.removePersonFromSchoolClass = function(id) {
	if (this.role == "TEACHER") app.getPresenterFactory().getEditTeacherPresenter().removeTeacherFromSchoolClass(id);
	if (this.role == "STUDENT") app.getPresenterFactory().getEditStudentPresenter().removeStudentFromSchoolClass(id);
}

EditPersonDisplay.prototype.updatePerson = function() {
	if (this.role == "TEACHER") return;
	
	// save student
}
EditPersonDisplay.prototype.removePerson = function() {
	if (this.role == "TEACHER") return;
	
	// remove student
}


/*
 * EVENT HANDLERS - Details
 */

EditPersonDisplay.prototype.submitEditPersonDetails = function(event) {
	event.preventDefault();		
	if (this.role == "L") this.updatePerson();
}
EditPersonDisplay.prototype.clickRemoveButton = function(event) {
	event.preventDefault();		
	if (this.role == "L") this.removePerson();
}

/*
 * EVENT HANDLERS - Schoolclasses
 */

EditPersonDisplay.prototype.changeActiveCheckbox = function(event) {
	if (event.target.checked) {
		this.submitPersonToSchoolClass(event.target.value);
	} else {
		this.removePersonFromSchoolClass(event.target.value);
	}
}



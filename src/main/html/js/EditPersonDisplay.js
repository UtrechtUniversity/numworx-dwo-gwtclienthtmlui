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
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
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

EditPersonDisplay.prototype.disableAndHideInputFieldsTeacher = function () {	
	for (var id in this.editPersonDetailsForm.elements) {
		this.editPersonDetailsForm.elements[id].disabled = true;	
	}
	$(this.editPersonDetailsForm.elements["email"].parentNode).hide();
	$(this.editPersonDetailsForm.elements["newPassword"].parentNode).hide();
}
EditPersonDisplay.prototype.disableAndHideInputFieldsRegularStudent = function () {	
	for (var id in this.editPersonDetailsForm.elements) {
		this.editPersonDetailsForm.elements[id].disabled = true;	
	}
	$(this.editPersonDetailsForm.elements["email"].parentNode).hide();
	$(this.editPersonDetailsForm.elements["newPassword"].parentNode).hide();
}
EditPersonDisplay.prototype.disableAndHideInputFieldsSingleSchoolStudent = function () {	
	$(this.editPersonDetailsForm.elements["email"].parentNode).show();
	$(this.editPersonDetailsForm.elements["newPassword"].parentNode).show();
	this.editPersonDetailsForm.elements["userName"].disabled = true;
	this.editPersonDetailsForm.elements["role"].disabled = true;
}
	
EditPersonDisplay.prototype.hideSubmitButton = function () {	
	$(this.editPersonDetailsForm.elements["submit"]).hide();
}
EditPersonDisplay.prototype.hideRemoveButton = function () {	
	$(this.editPersonDetailsForm.elements["remove"]).css('visibility', 'hidden');
}


EditPersonDisplay.prototype.showSubmitButton = function () {	
	$(this.editPersonDetailsForm.elements["submit"]).show();
}
EditPersonDisplay.prototype.showRemoveButton = function () {	
	$(this.editPersonDetailsForm.elements["remove"]).css('visibility', 'visible');
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
	
	for (var id in this.editPersonDetailsForm.elements) {
		this.editPersonDetailsForm.elements[id].disabled = false;	
	}
	this.showSubmitButton();
	this.hideRemoveButton();
}
EditPersonDisplay.prototype.setHelp = function(url) {
	this.$helpContentIFrame.attr('src', url );
}

EditPersonDisplay.prototype.setUser = function (role,json) {
	console.log("set user");
	console.log(json);
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
		this.disableAndHideInputFieldsTeacher();
		this.hideSubmitButton();
	}
	if (this.role == "STUDENT") { 
		this.disableAndHideInputFieldsRegularStudent();	
	}
}

EditPersonDisplay.prototype.setSingleSchoolStudent = function (json) {
	console.log("setSingleSchoolStudent");
	console.log(json);
	
	var userName = json.userName;
	var familyName = json.familyName;
	var givenName = json.givenName;
	var insertion = json.insertion;

	//this.editPersonDetailsForm.elements["email"].value = this.email;
	this.editPersonDetailsForm.elements["userName"].value = userName;
	this.editPersonDetailsForm.elements["familyName"].value = familyName;
	this.editPersonDetailsForm.elements["givenName"].value = givenName;
	this.editPersonDetailsForm.elements["insertion"].value = insertion;
	this.editPersonDetailsForm.elements["role"].value = "leerling";
	
	//this.role = "STUDENT";
	
	this.disableAndHideInputFieldsSingleSchoolStudent();	
}


EditPersonDisplay.prototype.setSchoolClasses = function (json) {
	console.log("setSchoolClasses");
	console.log(json);
	var schoolclasses = json;
	
	this.$editPersonSchoolclassesTableBody.html("");
	
	var i = 1;
	for (var id in schoolclasses) { 
		el = schoolclasses[id].schoolClass;
		console.log(el); console.log(id);
		$row = this.$editPersonSchoolclassesRow.clone();
		$row.prop('tabindex', i);
		$row.find("#editPersonSchoolclassName").html( el.schoolClassName ).removeAttr("id");
		
		if (schoolclasses[id].tag == true) $row.find("input[type='checkbox'],input[type='radio']").attr("checked", "checked");

		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
			
			// Change ID and label for-attributes
			this.id = this.id + i;				
			oldFor = this.nextElementSibling.getAttribute("for");
			this.nextElementSibling.setAttribute("for", oldFor + i);
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
	//String givenName, String insertion, String familyName, String email, String curPassword, String newPassword, String newPasswordAgain
	//app.getPresenterFactory().getEditStudentPresenter().saveUser(id);
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



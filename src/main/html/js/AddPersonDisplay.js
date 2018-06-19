function AddPersonDisplay() {
	
	// GWT vars
	
	
	// Forms 
	this.addPersonForm = document.forms["addPerson"];	
	// this.addPersonSchoolclassesForm = document.forms["addPersonSchoolclasses"];
	
	// jQuery objects
	this.$panel = jQuery("#addPersonDisplay");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	this.$addPersonForm = $(this.addPersonForm);
	// this.$addPersonSchoolclassesForm = $(this.addPersonSchoolclassesForm);
	
	this.$addPersonSchoolclassesRow = this.$addPersonForm.find("tbody tr").detach();
	this.$addPersonSchoolclassesTableBody = this.$addPersonForm.find("tbody");
		
	// Bind handlers
	this.$addPersonForm.on('submit', $.proxy(this.submitAddPersonForm,this));	
	this.$addPersonForm.find("input").on('change', $.proxy(this.changeInputField,this));	
	
	// Init
	this.$panel.hide();
	
}

AddPersonDisplay.prototype.show = function() {
	this.$panel.show();
	Helpers.stretchHeight([ this.$addPersonSchoolclassesTableBody ]);
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
	if (this.addPersonForm.elements['schoolclass']) {
		for (var i = 0; i < this.addPersonForm.elements['schoolclass'].length; i++) this.addPersonForm.elements['schoolclass'][i].checked = false;
	}
	this.addPersonForm.elements['userName'].value = "";
	this.addPersonForm.elements['givenName'].value = "";
	this.addPersonForm.elements['insertion'].value = "";
	this.addPersonForm.elements['familyName'].value = "";
	this.addPersonForm.elements['email'].value = "";
	this.addPersonForm.elements['password'].value = "";
	this.updateSchoolLoginsViewFormSubmitToggle();
}
AddPersonDisplay.prototype.init = function () {
	console.log("init");
}
AddPersonDisplay.prototype.setHelp = function(url) {
	this.$helpContentIFrame.attr('src', url );
}

AddPersonDisplay.prototype.showSchoolClasses = function(json) {
	console.log("showSchoolClasses");
	console.log(json);
	
	var schoolclasses = json;
	
	this.$addPersonSchoolclassesTableBody.html("");
	
	var i = 1;
	for (var id in schoolclasses) { 
		el = schoolclasses[id].schoolClass;
		//console.log(el); console.log(id);
		$row = this.$addPersonSchoolclassesRow.clone();
		$row.prop('tabindex', i);
		$row.find("#addPersonSchoolclassName").html( el.schoolClassName ).removeAttr("id");
	
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			
			this.value = id;
			
			// Change ID and label for-attributes
			this.id = this.id + i;				
			oldFor = this.nextElementSibling.getAttribute("for");
			this.nextElementSibling.setAttribute("for", oldFor + i);
		});
		
		$row.find("input[type='checkbox'],input[type='radio']").on('change', $.proxy(this.changeInputField,this));	

		this.$addPersonSchoolclassesTableBody.append($row);
		i++;
	}
	this.updateSchoolLoginsViewFormSubmitToggle();
	
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

AddPersonDisplay.prototype.addPerson = function() {
	//String schoolClassId, String username, String givenName, String insertion, String familyName, String eMail, String password
	app.getPresenterFactory().getAddStudentPresenter().submitSingleSchoolStudent( 
		this.addPersonForm.elements['schoolclass'].value,
		this.addPersonForm.elements['userName'].value,
		this.addPersonForm.elements['givenName'].value,
		this.addPersonForm.elements['insertion'].value,
		this.addPersonForm.elements['familyName'].value,
		this.addPersonForm.elements['email'].value,
		this.addPersonForm.elements['password'].value
	);	
}



/*
 * EVENT HANDLERS
 */

AddPersonDisplay.prototype.submitAddPersonForm = function(event) {
	event.preventDefault();		
	this.addPerson();
}

AddPersonDisplay.prototype.changeInputField = function(event) {
	console.log("change");
	this.updateSchoolLoginsViewFormSubmitToggle();
}

// Helpers
AddPersonDisplay.prototype.updateSchoolLoginsViewFormSubmitToggle = function() {
	if (this.requiredFields()) this.$addPersonForm.find(':submit').prop('disabled','');
	else this.$addPersonForm.find(':submit').prop('disabled','disabled');
}

AddPersonDisplay.prototype.requiredFields = function() {
	if (!this.addPersonForm.elements['schoolclass']) return false;
	return 	this.addPersonForm.elements['schoolclass'].value != "" &&
		   	this.addPersonForm.elements['userName'].value != "" &&
		   	this.addPersonForm.elements['givenName'].value != "" &&
			this.addPersonForm.elements['familyName'].value != "" &&
			this.addPersonForm.elements['email'].value != "" &&
			this.addPersonForm.elements['password'].value != "";
}

/*
AccountDisplay.prototype.uncheckSchoolLoginsViewFormCheckboxes = function() {
	for (i = 0; i < this.updateSchoolLoginsViewForm.elements.length; i++) {
		if ( (this.updateSchoolLoginsViewForm.elements[i].name == "active[]" || this.updateSchoolLoginsViewForm.elements[i].name == "remove[]")
			&& !this.updateSchoolLoginsViewForm.elements[i].disabled) this.updateSchoolLoginsViewForm.elements[i].checked = "";
	}
}*/


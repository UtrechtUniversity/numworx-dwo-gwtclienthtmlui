function AddPersonDisplay() {
	
	// GWT vars
	
	
	// Forms 
	this.addPersonDetailsForm = document.forms["addPersonDetails"];	
	this.addPersonSchoolclassesForm = document.forms["addPersonSchoolclasses"];	
	
	// jQuery objects
	this.$panel = jQuery("#addPersonDisplay");
	
	this.$addPersonDetailsForm = $(this.addPersonDetailsForm);
	this.$addPersonSchoolclassesForm = $(this.addPersonSchoolclassesForm);
	
	this.$addPersonSchoolclassesRow = this.$addPersonSchoolclassesForm.find("tbody tr").detach();
	this.$addPersonSchoolclassesTableBody = this.$addPersonSchoolclassesForm.find("tbody");
		
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

		$row.find("input[name='active[]']").on('change', $.proxy(this.changeActiveCheckbox,this));
		this.$addPersonSchoolclassesTableBody.append($row);
		i++;
	}
	this.addPersonSchoolclassesFormToggle(false);
	
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
}



/*
 * EVENT HANDLERS
 */

AddPersonDisplay.prototype.submitAddPerson = function(event) {
	event.preventDefault();		
	this.addPerson();
}

AddPersonDisplay.prototype.changeActiveCheckbox = function(event) {
	// do something?
}

// Helpers
AddPersonDisplay.prototype.updateSchoolLoginsViewFormSubmitToggle = function() {
	if (this.addPersonSchoolclassesStateChanged()) this.$addPersonSchoolclassesForm.find(':submit').prop('disabled','');
	else this.$addPersonSchoolclassesForm.find(':submit').prop('disabled','disabled');
}
AddPersonDisplay.prototype.updateSchoolLoginsViewFormStateChanged = function () {
	for (i = 0; i < this.addPersonSchoolclassesForm.elements.length; i++) {
		if (this.addPersonSchoolclassesForm.elements[i].name == "active[]" && this.addPersonSchoolclassesForm.elements[i].checked && !this.addPersonSchoolclassesForm.elements[i].disabled) return true;
	}
	return false;
}
/*
AccountDisplay.prototype.uncheckSchoolLoginsViewFormCheckboxes = function() {
	for (i = 0; i < this.updateSchoolLoginsViewForm.elements.length; i++) {
		if ( (this.updateSchoolLoginsViewForm.elements[i].name == "active[]" || this.updateSchoolLoginsViewForm.elements[i].name == "remove[]")
			&& !this.updateSchoolLoginsViewForm.elements[i].disabled) this.updateSchoolLoginsViewForm.elements[i].checked = "";
	}
}*/


function AddPersonDisplay() {
	// Forms 
	this.addPersonForm = document.forms["addPerson"];	
	
	// jQuery objects
	this.$panel = jQuery("#addPersonDisplay");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	this.$addPersonForm = $(this.addPersonForm);
	
	this.$addPersonSchoolclassesRow = this.$addPersonForm.find("tbody tr").detach();
	this.$addPersonSchoolclassesTableBody = this.$addPersonForm.find("tbody");
	this.$addPersonSchoolclassesTableHead = this.$addPersonForm.find("thead");
		
	// Bind handlers
	this.$addPersonForm.on('submit', $.proxy(this.submitAddPersonForm,this));	
	this.$addPersonForm.find("input").on('change', $.proxy(this.changeInputField,this));	
	this.$addPersonSchoolclassesTableHead.find(".sortButton").click(Helpers.clickSortButton);	
	
	// Init
	this.$panel.hide();
	
}

AddPersonDisplay.prototype.show = function() {
    this.localize();
	this.$panel.show();
}

AddPersonDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

AddPersonDisplay.prototype.resetSorting = function() {
	this.$addPersonSchoolclassesTableHead.find(".sortButton").removeClass("active");
}

/*
 * GUI Functions
 * Map to java implementation
 */




/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

AddPersonDisplay.prototype.init = function () {
	app.mainDisplay.registerStretchables( [ this.$addPersonSchoolclassesTableBody ] );
	this.resetSorting();
}

AddPersonDisplay.prototype.clear = function () {
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
	this.resetSorting();
}

AddPersonDisplay.prototype.setHelp = function(url) {
	this.$helpContentIFrame.attr('src', 'https://localhost:8888/local/helppage/helpindex_nl.html'+url );
}

AddPersonDisplay.prototype.showSchoolClasses = function(json) {
	var schoolclasses = json;
	
	this.$addPersonSchoolclassesTableBody.html("");
	
	var i = 1;
	for (var id in schoolclasses) { 
		el = schoolclasses[id].schoolClass;
		$row = this.$addPersonSchoolclassesRow.clone();
		$row.prop('tabindex', i);
		$row.find("#addPersonSchoolclassName").html( el.schoolClassName ).attr('data-sortvalue', el.schoolClassName).removeAttr("id");
	
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
	this.$addPersonSchoolclassesTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
}
AddPersonDisplay.prototype.setLoadingTableMessage = function (json) {	
	this.$addPersonSchoolclassesTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}


/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */

AddPersonDisplay.prototype.addPerson = function() {
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
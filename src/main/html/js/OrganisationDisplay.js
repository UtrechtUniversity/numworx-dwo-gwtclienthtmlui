/**
 * OrganisationDisplay
 */

function OrganisationDisplay() {
	
	// Forms 
	this.settingsForm = document.forms["organisationSettings"];
	this.personsFilterForm = document.forms["organisationPersonsFilter"];
	this.personsForm = document.forms["organisationPersons"];
	
	
	// Buttons
	this.chooseClassButton = this.settingsForm.elements["chooseClass"];
	this.editModulesButton = this.settingsForm.elements["editModules"];

	// jQuery objects
	this.$panel = jQuery("#organisationDisplayPanel");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	// Forms
	this.$settingsForm = $(this.settingsForm);
	this.$personsFilterForm = $(this.personsFilterForm);
	this.$personsForm = $(this.personsForm);
	
	this.$chooseClassButton = $(this.chooseClassButton);
	this.$editModulesButton = $(this.editModulesButton);
	
	// Table
	this.$personsTableRow = this.$personsForm.find("tbody tr").detach();
	this.$personsTableBody = this.$personsForm.find("tbody");
	this.$personsTableHead = this.$personsForm.find("thead");
	
	// Bind Handlers
	this.$chooseClassButton.on('change', $.proxy(this.changeChooseClassButton,this));
	this.$editModulesButton.on('change', $.proxy(this.changeEditModulesButton,this));
	this.$personsFilterForm.on('submit', $.proxy(this.submitPersonsFilterForm,this));
	this.$personsForm.on('submit', $.proxy(this.submitPersonsForm,this));
	
	// Init
	this.$panel.hide();
}

/**
 * called by MainDisplay to show the panel
 */
OrganisationDisplay.prototype.show = function() {
    //this.localize();
	this.$panel.show();
}

/*
 * Localizes all labels
 */

OrganisationDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

OrganisationDisplay.prototype.filterPersonsList = function () {
	//this is where the filtering happens
	console.log("filter!");
}


/*
 * API of jsOrganisationDisplay
 */

/**
 * Initializes the ui.
 */
OrganisationDisplay.prototype.init = function() {
	app.mainDisplay.registerStretchables( [ this.$personsTableBody ] );
}

/**
 * Clears all UI states
 */
OrganisationDisplay.prototype.clear = function() {
	
}

/**
 * setHelp shows help url
 */
OrganisationDisplay.prototype.setHelp = function(url) {
	this.$helpContentIFrame.attr('src', url );
}

/**
 * setEmptyTableMessage show an indicator that the table is empty.
 */
OrganisationDisplay.prototype.setEmptyTableMessage = function() {
	this.$personsTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
}

/**
 * setLoadingTableMessage show an indicator that we are fetching data.
 */
OrganisationDisplay.prototype.setLoadingTableMessage = function() {
	this.$personsTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}

/**
 * Fills the list view with the list of persons. It requires a JSONObject
 * with each field the item key, and a converted TaggedDomUser as value.
 *
 * @param data a StudentsTree, a TeacherTree, a SchoolAdminTree,
 * @param role STUDENT, TEACHER, SCHOOLADMIN
 */
OrganisationDisplay.prototype.showPersons = function(data, role) {
	var persons = json, personName;
		
	this.$personsTableBody.html("");
	
	// No Results
	if ($.isEmptyObject(persons)) {
		this.$personsTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
		return;
	}
	
	var i = 1;
	for (var id in persons) { 
		$row = this.$personsRow.clone();		
		$row.find("#personsTableId").val( id ).removeAttr("id");
		$row.find("#personsTableUserName").html( persons[id].userName ).attr('data-sortvalue', persons[id].userName).removeAttr("id");
		$row.find("#personsTableGivenName").html( persons[id].givenName ).attr('data-sortvalue', persons[id].givenName).removeAttr("id");
		$row.find("#personsTableInsertion").html( persons[id].insertion ).attr('data-sortvalue', persons[id].insertion).removeAttr("id");
		$row.find("#personsTableFamilyName").html( persons[id].familyName ).attr('data-sortvalue', persons[id].familyName).removeAttr("id");		
		$row.find("#organisationPersonsRemove").val( id ).removeAttr("id");
				 
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});
		
		//$row.on('click keypress', $.proxy(this.clickPersonsRow, this));
		this.$personsTableBody.append($row);
		i++;
	}

	this.personsFormToggle(false);	
	
	//this.filterPersonsList();	
	
	this.$personsForm.find(".sortButton.default").trigger('click');
}

/**
 * initialise the set schoolclass radio buttons.
 * @param bool ja/nee
 */
OrganisationDisplay.prototype.initChooseClass = function(bool) {
	this.chooseClassButton[0].checked = bool;
	this.chooseClassButton[1].checked = !bool;
	return;
}

/**
 * initialise the edit modules radio buttons.
 * @param bool ja/nee
 */
OrganisationDisplay.prototype.initEditModules = function(bool) {
	this.editModulesButton[0].checked = bool;
	this.editModulesButton[1].checked = !bool;
	return;
}

/**
 * Extra: showSchoolClasses. Voor de filtering.
 */
OrganisationDisplay.prototype.showSchoolClasses = function(json) {
	var schoolclasses = json;
	
	// Work in progress by Teunis
}
/*
 * API of OrganisationPresenter
*/

/**
 * a true/false voor: "Leerling kunnen zelf klas kiezen".
 * upcall naar presenter
 */
OrganisationDisplay.prototype.setChooseClass = function(bool) {
	app.getPresenterFactory().getOrganisationPresenter().setChooseClass(bool);
}

/**
 * a true/false voor: "docenten kunnen zelf modules aanpassen".
 * upcall naar presenter
 */
OrganisationDisplay.prototype.setEditModules = function(bool) {
	app.getPresenterFactory().getOrganisationPresenter().setEditModules(bool);
}

/**
 * select role. 
 * role = { STUDENT, TEACHER, SCHOOLADMIN }
 * upcall to presenter.
 * presenter calls setLoadingTablemessage followed by showPersons/setEmptyTableMessage
 */
OrganisationDisplay.prototype.selectRole = function(role) {
	app.getPresenterFactory().getOrganisationPresenter().selectRole(role);
}


/**
 * delete Persons, with list of persons (ids) and role
 * role = { STUDENT, TEACHER, SCHOOLADMIN }
 * upcall to presenter
 * presenter calls showPersons, with a reduced list of persons (or setEmptyTableMessage
 */
OrganisationDisplay.prototype.deletePersons = function(persons, role) {
	app.getPresenterFactory().getOrganisationPresenter().deletePersons(persons, role);
}


/*
 * EVENT HANDLERS 
 */

OrganisationDisplay.prototype.changeChooseClassButton = function(event) {
	event.preventDefault();	
	var value = this.chooseClassButton.value == 'Y' ? true : false;
	this.setChooseClass(value);
}

OrganisationDisplay.prototype.changeEditModulesButton = function(event) {
	event.preventDefault();	
	var value = this.editModulesButton.value == 'Y' ? true : false;
	this.setEditModules(value);
}

OrganisationDisplay.prototype.submitPersonsFilterForm = function(value) {
	event.preventDefault();	
	this.filterPersonsList();
}



OrganisationDisplay.prototype.personsFormToggle = function(value) {
	if (value) this.$personsForm.find(':submit').prop('disabled','');
	else this.$personsForm.find(':submit').prop('disabled','disabled');
}

OrganisationDisplay.prototype.submitPersonsForm = function(value) {
	event.preventDefault();	
	
	var role = this.personsForm.elements["organisationPersonsFilterRole"].value,
		persons = [];
	for (i = 0; i < this.personsForm.elements.length; i++) {
		if (this.personsForm.elements[i].name == "remove[]" && this.personsForm.elements[i].checked) persons.push(this.personsForm.elements[i].value);
	}
	console.log(persons);
	console.log(role);
		
	this.deletePersons(persons, role);
}



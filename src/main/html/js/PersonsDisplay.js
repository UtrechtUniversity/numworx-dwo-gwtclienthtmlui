function PersonsDisplay() {
	// Forms 
	this.personsSearchForm = document.forms["personsSearch"];
	this.personsEditForm = document.forms["personsEdit"];
	this.personsAddForm = document.forms["personsAdd"];
	this.personsImportForm = document.forms["personsImport"];
	
	// jQuery objects
	this.$panel = jQuery("#personsDisplay");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	this.$personsSearchForm = $(this.personsSearchForm);
	this.$personsEditForm = $(this.personsEditForm);
	this.$personsAddForm = $(this.personsAddForm);
	this.$personsImportForm = $(this.personsImportForm);
	
	this.$personsRow = this.$personsEditForm.find("tbody tr").detach();
	this.$personsTableBody = this.$personsEditForm.find("tbody");
	this.$personsTableHead = this.$personsEditForm.find("thead");
	
	// Bind handlers
	this.$personsSearchForm.on('submit', $.proxy(this.submitPersonsSearchForm, this));
	this.$personsSearchForm.find('input[type="radio"]').on('change', $.proxy(this.changePersonsSearchRole, this));
	this.$personsEditForm.on('submit', $.proxy(this.submitPersonsEditForm, this));
	this.$personsAddForm.on('submit', $.proxy(this.submitPersonsAddForm, this));
	this.$personsImportForm.on('submit', $.proxy(this.submitPersonsImportForm, this));
	this.$personsTableHead.find(".sortButton").click(Helpers.clickSortButton);
	
	// Init
	this.$panel.hide();
	// this.$panel.css('visibility', 'hidden');
}

PersonsDisplay.prototype.show = function() {
    this.localize();
	this.$panel.show();
	// this.$panel.css('visibility', 'visible');
	
	if (!app.getPresenterFactory().getPersonsPresenter().hasImportPersons()) this.$personsImportForm.hide();
}

PersonsDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

PersonsDisplay.prototype.resetSorting = function() {
	this.$personsTableHead.find(".sortButton").removeClass("active");
}


/*
 * GUI Functions
 * Map to java implementation
 */

PersonsDisplay.prototype.filterPersonsList = function () {
	var personsSearchForm = this.personsSearchForm; // for the inline function
	
	if ( this.personsSearchForm.elements["userName"].value == "" &&
		 this.personsSearchForm.elements["givenName"].value == "" &&
		 this.personsSearchForm.elements["insertion"].value == "" &&
		 this.personsSearchForm.elements["familyName"].value == "" ) {
			$result = this.$personsTableBody.find("tr");
	} else {	
                var $result;
                var rows = this.$personsTableBody.find("tr");
//                var rowList = rows.find("td span");
                $result = rows.filter(function() {
                    var el = $(this);
                    var result = true;
                    result = result && Helpers.searchCompare(el.get(0).children.item(0).innerText, personsSearchForm.elements["familyName"].value);
                    result = result && Helpers.searchCompare(el.get(0).children.item(1).innerText, personsSearchForm.elements["givenName"].value);
                    result = result && Helpers.searchCompare(el.get(0).children.item(2).innerText, personsSearchForm.elements["insertion"].value);
                    result = result && Helpers.searchCompare(el.get(0).children.item(3).innerText, personsSearchForm.elements["userName"].value);
                    return result;
                }                   
//		var $result = this.$personsTableBody.find("td span").filter(function() {
//			var el = $(this).get(0);
//			var val = "";
//						
//			if (el.parentElement.cellIndex == 3) val = personsSearchForm.elements["userName"].value;
//			if (el.parentElement.cellIndex == 1) val = personsSearchForm.elements["givenName"].value;
//                        if (el.parentElement.cellIndex == 2) val = personsSearchForm.elements["insertion"].value;
//                        if (el.parentElement.cellIndex == 0) val = personsSearchForm.elements["familyName"].value;
//                        return Helpers.searchCompare(el.innerHTML, val);
//		}
//                
                ).closest("tr");
            //$result = rows;
	}
	
	this.$personsTableBody.find("tr").hide();
	$result.show();
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

PersonsDisplay.prototype.init = function (json) { 
	app.mainDisplay.registerStretchables( [ this.$personsTableBody ] );
}

PersonsDisplay.prototype.clear = function () {	
	this.personsSearchForm.elements["role"][0].checked = true;
	this.personsSearchForm.elements["role"][1].checked = false;
	this.personsSearchForm.elements["userName"].value = "";
	this.personsSearchForm.elements["givenName"].value = "";
	this.personsSearchForm.elements["insertion"].value = "";
	this.personsSearchForm.elements["familyName"].value = "";
	
	this.resetSorting();	
	this.personsSearchFormToggle(false);	
	this.personsEditFormToggle(false);
	this.changePersonsSearchRole();
}

PersonsDisplay.prototype.setHelp = function(url) { 
	this.$helpContentIFrame.attr('src', 'https://teuniz.dwo.nl/gwtclient/'+url );
}

PersonsDisplay.prototype.showPersons = function(json) {  
	var persons = json, personName;
		
	this.$personsTableBody.html("");
	
	// No Results
	if ($.isEmptyObject(persons)) {
		$row = this.$personsRow.clone();
		this.$personsTableBody.html('<tr colspan="4" class="empty"><td>Geen studenten gevonden.</td></tr>');
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
		
		
		if (persons[id].singleSchool) $row.find("#personsTableEditDetails").addClass("active");
		$row.find("#personsTableEditSchoolClasses").addClass("active").removeAttr("id");
		$row.find("#personsTableEditDetails").removeAttr("id");
				 
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
	this.$personsTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');
}
PersonsDisplay.prototype.setLoadingTableMessage = function(json) {
	this.$personsTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}


/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */

PersonsDisplay.prototype.searchPersons = function() {
	this.stateRole = this.personsSearchForm.elements["role"].value;
	if (this.personsSearchForm.elements["role"].value == "L") app.getPresenterFactory().getPersonsPresenter().showStudentList();
	if (this.personsSearchForm.elements["role"].value == "D") app.getPresenterFactory().getPersonsPresenter().showTeacherList();
}

PersonsDisplay.prototype.editPerson = function(id) {
	this.stateRole = this.personsSearchForm.elements["role"].value;
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
        this.searchPersons();        
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



/**
 * OrganisationDisplay
 */

function OrganisationDisplay() {
	
	this.schoolClasses = null;
	
	// Forms 
	this.settingsForm = document.forms["organisationSettings"];
	this.personsFilterForm = document.forms["organisationPersonsFilter"];
	this.personsForm = document.forms["organisationPersons"];
	
	
	// Buttons
	this.chooseClassButton = this.settingsForm.elements["chooseClass"];
	this.editModulesButton = this.settingsForm.elements["editModules"];
	this.selectRoleButton = this.personsFilterForm.elements["role"];
	this.schoolClassSelect = this.personsFilterForm.elements["schoolClass"];

	// jQuery objects
	this.$panel = jQuery("#organisationDisplayPanel");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	this.$personsFormRemoveAll = $("#organisationPersonsRemoveAll")
	
	// Forms
	this.$settingsForm = $(this.settingsForm);
	this.$personsFilterForm = $(this.personsFilterForm);
	this.$personsForm = $(this.personsForm);
	
	this.$chooseClassButton = $(this.chooseClassButton);
	this.$editModulesButton = $(this.editModulesButton);
	this.$selectRoleButton = $(this.selectRoleButton);
	this.$schoolClassSelect = $(this.schoolClassSelect);
	this.$schoolClassSelectOption = this.$schoolClassSelect.find("option").detach();
	
	
	// Table
	this.$personsTableRow = this.$personsForm.find("tbody tr").detach();
	this.$personsTableBody = this.$personsForm.find("tbody");
	this.$personsTableHead = this.$personsForm.find("thead");
	
	// Bind Handlers
	this.$chooseClassButton.on('change', $.proxy(this.changeChooseClassButton,this));
	this.$editModulesButton.on('change', $.proxy(this.changeEditModulesButton,this));
	this.$selectRoleButton.on('change', $.proxy(this.changeSelectRoleButton,this));
	this.$personsFilterForm.on('submit', $.proxy(this.submitPersonsFilterForm,this));
	this.$personsForm.on('submit', $.proxy(this.submitPersonsForm,this));
	this.$personsFormRemoveAll.on('click', $.proxy(this.clickSelectAllPersons, this));
	
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

OrganisationDisplay.prototype.resetSorting = function() {
	this.$personsTableHead.find(".sortButton").removeClass("active");
}

OrganisationDisplay.prototype.filterPersonsList = function () {	
	var personsFilterForm = this.personsFilterForm; // for the inline function
	
	if ( this.personsFilterForm.elements["userName"].value == "" &&
		 this.personsFilterForm.elements["givenName"].value == "" &&
		 this.personsFilterForm.elements["insertion"].value == "" &&
		 this.personsFilterForm.elements["familyName"].value == "" &&
		 this.personsFilterForm.elements["schoolClass"].value == "" ) {
			$result = this.$personsTableBody.find("tr");
	} else {	
        var $result;
  		this.$personsTableBody.find(".empty").remove();
        var rows = this.$personsTableBody.find("tr");

        $result = rows.filter(function() {
            var el = $(this);
            var result = true;
			var schoolClasses = $(el.get(0).children.item(4)).find("span").attr('data-ids');
			if (schoolClasses) schoolClasses = JSON.parse( schoolClasses );
			
            result = result && Helpers.searchCompare(el.get(0).children.item(0).innerText, personsFilterForm.elements["familyName"].value);
            result = result && Helpers.searchCompare(el.get(0).children.item(1).innerText, personsFilterForm.elements["givenName"].value);
            result = result && Helpers.searchCompare(el.get(0).children.item(2).innerText, personsFilterForm.elements["insertion"].value);
            result = result && Helpers.searchCompare(el.get(0).children.item(3).innerText, personsFilterForm.elements["userName"].value);					
			if (schoolClasses && personsFilterForm.elements["schoolClass"].value !== "" && schoolClasses.length > 0) {
				result = result && schoolClasses.indexOf(personsFilterForm.elements["schoolClass"].value) != -1;
			} else if (personsFilterForm.elements["schoolClass"].value == "NONE") {
				result = result && (!schoolClasses || schoolClasses.length == 0)
			} else {
				result = result && personsFilterForm.elements["schoolClass"].value == "";
			}
			
            return result;
        }                   
       
        ).closest("tr");
	}
	
	this.$personsTableBody.find("tr").hide();
	if ($result.length > 0) {
		$result.show();
		this.$personsTableBody.find(".empty").remove();
	} else {
		if ( this.$personsTableBody.find(".empty").length > 0 ) this.$personsTableBody.find(".empty").show();
		else this.$personsTableBody.append('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
	}
}


/*
 * API of jsOrganisationDisplay
 */

/**
 * Initializes the ui.
 */
OrganisationDisplay.prototype.init = function() {
	app.mainDisplay.registerStretchables( [ this.$personsTableBody ] );
	document.body.scrollTop = 0;
}

/**
 * Clears all UI states
 */
OrganisationDisplay.prototype.clear = function() {	
	this.personsFilterForm.elements["userName"].value = "";
	this.personsFilterForm.elements["givenName"].value = "";
	this.personsFilterForm.elements["insertion"].value = "";
	this.personsFilterForm.elements["familyName"].value = "";
	
	this.personsFilterForm.elements["role"][0].checked = "checked";
	//this.selectRole("STUDENT"); not needed
	
	this.resetSorting();	
	this.$personsForm.find(".sortButton.default").trigger('click');
}

/**
 * setHelp shows help url
 */
OrganisationDisplay.prototype.setHelp = function(url) {
		Helpers.setIframeSrc(this.$helpContentIFrame, url)
}

/**
 * setEmptyTableMessage show an indicator that the table is empty.
 */
OrganisationDisplay.prototype.setEmptyTableMessage = function() {
	//console.log("empty");
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
	var persons = data, personName, oldFor, schoolClassName;
	
	console.log(data);
	this.$personsTableBody.html("");
	
	// No Results
	if ($.isEmptyObject(persons)) {
		this.$personsTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
		return;
	}
	
	var i = 1;
	for (var id in persons) { 		
		$row = this.$personsTableRow.clone();		
		//$row.find("#organisationPersonsTableId").val( id ).removeAttr("id");
		$row.find("#organisationPersonsTableUserName").html( Helpers.htmlEscape(persons[id].user.userName )).attr('data-sortvalue', persons[id].user.userName).removeAttr("id");
		$row.find("#organisationPersonsTableGivenName").html( Helpers.htmlEscape(persons[id].user.givenName )).attr('data-sortvalue', persons[id].user.givenName).removeAttr("id");
		$row.find("#organisationPersonsTableInsertion").html( Helpers.htmlEscape(persons[id].user.insertion )).attr('data-sortvalue', persons[id].user.insertion).removeAttr("id");
		$row.find("#organisationPersonsTableFamilyName").html( Helpers.htmlEscape(persons[id].user.familyName )).attr('data-sortvalue', persons[id].user.familyName).removeAttr("id");		

		if (persons[id].memberOf.length > 0) {
			schoolClassName = "";
			for (var j = 0; j < persons[id].memberOf.length; j++) {
				schoolClassName += this.schoolClasses[ persons[id].memberOf[j] ].schoolClass.schoolClassName+", ";
			}
			schoolClassName = schoolClassName.substr(0, schoolClassName.length - 2);

			$row.find("#organisationPersonsTableSchoolClass").attr( "data-ids", JSON.stringify(persons[id].memberOf) ).html( Helpers.htmlEscape(schoolClassName) ).attr('data-sortvalue', schoolClassName).attr("title", schoolClassName).removeAttr("id");
		} else {
			$row.find("#organisationPersonsTableSchoolClass").attr( "data-ids", JSON.stringify(persons[id].memberOf) ).html( "" ).attr('data-sortvalue', "").removeAttr("id");
		}
				 
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
			
			// Change ID and label for-attributes
			this.id = this.id + i;				
			oldFor = this.nextElementSibling.getAttribute("for");
			this.nextElementSibling.setAttribute("for", oldFor + i);
		});
		
		$row.prop('tabindex', i);
				
		//$row.on('click keypress', $.proxy(this.clickPersonsRow, this));
		this.$personsTableBody.append($row);
		i++;
	}

	this.personsFormToggle(false);	
	
	this.$personsForm.find("input[type='checkbox'],input[type='radio']").on('change', $.proxy(this.changePersonsRemoveCheckbox,this));
	
	this.filterPersonsList();
	
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
OrganisationDisplay.prototype.initEditModules = function(bool, xs, premium) {
	this.editModulesButton[0].checked = bool;
	this.editModulesButton[1].checked = !bool && !xs;
	this.editModulesButton[2].checked = xs;
	var p = $("#editModulesPremium");
	if (premium) p.show(); else p.hide();
	return;
}

/**
 * Extra: showSchoolClasses. Voor de filtering.
 */
OrganisationDisplay.prototype.showSchoolClasses = function(json) {
	var $option;
	this.schoolClasses = json;
	console.log(json);
	this.$schoolClassSelect.html("");
	
	$option = this.$schoolClassSelectOption.clone();		
	$option.val( "" ).removeAttr("id").html( "" );
	this.$schoolClassSelect.append($option);
	
	for (var id in this.schoolClasses) { 
		$option = this.$schoolClassSelectOption.clone();		
		$option.val( id ).removeAttr("id").html( Helpers.htmlEscape(this.schoolClasses[id].schoolClass.schoolClassName) );
		this.$schoolClassSelect.append($option);
	}
	$option = this.$schoolClassSelectOption.clone();
	var noclass = app.getTranslator().translate( "NUM_LBL_ORGANISATION_NOCLASS" )
	$option.val("NONE").removeAttr("id").html(noclass); // translate
	this.$schoolClassSelect.append($option);
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
OrganisationDisplay.prototype.setEditModules = function(bool, xs) {
	app.getPresenterFactory().getOrganisationPresenter().setEditModules(bool, xs);
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
	var xs    = this.editModulesButton.value == 'M' ? true : false;
	this.setEditModules(value, xs);
}

OrganisationDisplay.prototype.changeSelectRoleButton = function(event) {
	event.preventDefault();	
	var role = this.selectRoleButton.value;
	role = document.querySelector('form[name=organisationPersonsFilter] input[name=role]:checked').value;
	this.selectRole(role);
}

OrganisationDisplay.prototype.submitPersonsFilterForm = function(event) {
	event.preventDefault();	
	this.filterPersonsList();
}



OrganisationDisplay.prototype.personsFormToggle = function(value) {
	if (value) this.$personsForm.find(':submit').prop('disabled','');
	else this.$personsForm.find(':submit').prop('disabled','disabled');
}

OrganisationDisplay.prototype.changePersonsRemoveCheckbox = function(event) {
	this.personsFormToggle(false);
	for (i = 0; i < this.personsForm.elements.length; i++) {
		if (this.personsForm.elements[i].name == "remove[]" && this.personsForm.elements[i].checked) {
			this.personsFormToggle(true);
			return;	
		}
	}
}

OrganisationDisplay.prototype.submitPersonsForm = function(event) {
	event.preventDefault();	
	
	var role = this.selectRoleButton.value, // undefined in IE11
		persons = [];
	role = document.querySelector('form[name=organisationPersonsFilter] input[name=role]:checked').value
	
	for (i = 0; i < this.personsForm.elements.length; i++) {
		if (this.personsForm.elements[i].name == "remove[]" && this.personsForm.elements[i].checked) persons.push(this.personsForm.elements[i].value);
	}
		
	this.deletePersons(persons, role);
}

OrganisationDisplay.prototype.clickSelectAllPersons = function(event) {
	event.preventDefault();
	if (typeof this.personsForm.elements["remove[]"] == 'undefined' ) return;
	if (typeof this.personsForm.elements["remove[]"].length != 'undefined'  && this.personsForm.elements["remove[]"].length == 0) return;
	
	$el = $(event.target);
	
	// Check if select all is active, based on the last visible element
	var selectAllActive = false;
	if (typeof this.personsForm.elements["remove[]"].length == 'undefined' && this.personsForm.elements["remove[]"].checked) selectAllActive = true;
	else if (typeof this.personsForm.elements["remove[]"].length != 'undefined'  ) {
		for (var i = 0; i < this.personsForm.elements["remove[]"].length; i++ ) {
			if ( $(this.personsForm.elements["remove[]"][i]).is(':visible') ) {
				selectAllActive = 	this.personsForm.elements["remove[]"][i].checked;
			}
		}
	}
	if (selectAllActive) {
		if (typeof this.personsForm.elements["remove[]"].length == 'undefined') {
			this.personsForm.elements["remove[]"].checked = false;
		} else {
			for (var i=0 ; i < this.personsForm.elements["remove[]"].length; i++) {
				this.personsForm.elements["remove[]"][i].checked = false;
			}
		}
		this.personsFormToggle(false);
	} else {
		if (typeof this.personsForm.elements["remove[]"].length == 'undefined') {
			this.checkIfVisible(this.personsForm.elements["remove[]"], true);
		} else {
			for (var i=0 ; i < this.personsForm.elements["remove[]"].length; i++) {
				if (!this.personsForm.elements["remove[]"][i].checked) {
					this.checkIfVisible(this.personsForm.elements["remove[]"][i],true);
				}  
			}
		}
		
	}
	this.changePersonsRemoveCheckbox(event)
}

OrganisationDisplay.prototype.checkIfVisible = function(element, value) {
	if ( $(element).is(':visible') ) {
		element.checked = value;
	}
}

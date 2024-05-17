function StudentSchoolclassesDisplay() {	
	// Forms 
	this.updateSchoolclassViewForm = document.forms["updateSchoolclassView"];
	this.addSchoolclassForm = document.forms['addStudentSchoolclass'];

	// Buttons
	
	// jQuery objects
	this.$panel = jQuery("#studentSchoolclassesPanel");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	// Edit form elements
	this.$schoolclassRow = $(this.updateSchoolclassViewForm).find("tbody tr").detach();
	this.$schoolclassTableBody = $(this.updateSchoolclassViewForm).find("tbody");
	this.$schoolclassTableHead = $(this.updateSchoolclassViewForm).find("thead");
	this.$updateSchoolclassViewForm = $(this.updateSchoolclassViewForm);
	this.$addSchoolclassForm = $(this.addSchoolclassForm);
	this.$registerkey = this.$addSchoolclassForm.find('')

	this.schoolClassSelect = this.addSchoolclassForm.elements["schoolClass"];
	this.$schoolClassSelect = $(this.schoolClassSelect);
	this.$schoolClassSelectOption = this.$schoolClassSelect.find("option").detach();
	
	// Bind handlers
	this.$updateSchoolclassViewForm.on('submit', $.proxy(this.submitSchoolclass,this));
	this.$addSchoolclassForm.on('submit', $.proxy(this.addSchoolclass, this));
	
	this.$schoolclassTableHead.find(".sortButton").click(Helpers.clickSortButton);

	// Init
	this.$panel.hide();
}

StudentSchoolclassesDisplay.prototype.show = function() {
    this.localize();
	this.$panel.show();
}

StudentSchoolclassesDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

StudentSchoolclassesDisplay.prototype.setEmptyTableMessage = function() {
	this.$schoolclassTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
}

StudentSchoolclassesDisplay.prototype.setLoadingTableMessage = function() {
	this.$schoolclassTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');		
}



/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

StudentSchoolclassesDisplay.prototype.clear = function () {
	this.addSchoolclassForm.elements["registerkey"].value = "";
}

StudentSchoolclassesDisplay.prototype.init = function () {
	app.mainDisplay.registerStretchables( [ this.$schoolclassTableBody ] );
	document.body.scrollTop = 0;
}

StudentSchoolclassesDisplay.prototype.setHelp = function(url) {
		if (this.$helpContentIFrame.attr('src') != url) this.$helpContentIFrame.attr('src', url );
}

StudentSchoolclassesDisplay.prototype.setSchoolClasses = function (json) {
	var schoolclasses = json;
	
	this.$schoolclassTableBody.html("");
	
	var i = 1;
	for (var id in schoolclasses) { 
		el = schoolclasses[id].schoolClass;
		$row = this.$schoolclassRow.clone();
		$row.prop('tabindex', i);
		$row.find("#updateSchoolclassViewClass").html( Helpers.htmlEscape(el.schoolClassName) ).attr('data-sortvalue', el.schoolClassName).removeAttr("id");
		
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
			
			// Change ID and label for-attributes
			this.id = this.id + i;				
			oldFor = this.nextElementSibling.getAttribute("for");
			this.nextElementSibling.setAttribute("for", oldFor + i);
		});

		$row.find("input[name='active[]']").on('change', $.proxy(this.changeActiveCheckbox,this));
		$row.find("input[name='remove[]']").on('change', $.proxy(this.changeRemoveCheckbox,this));
		this.$schoolclassTableBody.append($row);
		
		if (schoolclasses[id].tag == true) {
			$row.find("input[name='active[]']").prop('checked','checked').prop('disabled','disabled').parent();
		}
		
		i++;
	}
	
	this.$schoolclassTableHead.find(".sortButton.default").trigger('click');
	this.updateSchoolclassViewFormSubmitToggle();

}

/**
 * Extra: showSchoolClasses. Voor de filtering.
 */
StudentSchoolclassesDisplay.prototype.showSchoolClasses = function(json) {
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
}


//Helpers
StudentSchoolclassesDisplay.prototype.updateSchoolclassViewFormStateChanged = function () {
	for (i = 0; i < this.updateSchoolclassViewForm.elements.length; i++) {
		if (this.updateSchoolclassViewForm.elements[i].name == "active[]" && this.updateSchoolclassViewForm.elements[i].checked && !this.updateSchoolclassViewForm.elements[i].disabled) return true;
		if (this.updateSchoolclassViewForm.elements[i].name == "remove[]" && this.updateSchoolclassViewForm.elements[i].checked) return true;
	}
	return false;
}

StudentSchoolclassesDisplay.prototype.updateSchoolclassViewFormSubmitToggle = function() {
	if (this.updateSchoolclassViewFormStateChanged()) this.$updateSchoolclassViewForm.find(':submit').prop('disabled','');
	else this.$updateSchoolclassViewForm.find(':submit').prop('disabled','disabled');
}

StudentSchoolclassesDisplay.prototype.uncheckSchoolclassViewFormCheckboxes = function() {
	for (i = 0; i < this.updateSchoolclassViewForm.elements.length; i++) {
		if ( (this.updateSchoolclassViewForm.elements[i].name == "active[]" || this.updateSchoolclassViewForm.elements[i].name == "remove[]")
			&& !this.updateSchoolclassViewForm.elements[i].disabled) this.updateSchoolclassViewForm.elements[i].checked = "";
	}
}

StudentSchoolclassesDisplay.prototype.changeRemoveCheckbox = function(event) {
	if (event.target.checked) {
		// Set others unchecked
		this.uncheckSchoolclassViewFormCheckboxes();
		
		// Set current checked
		event.target.checked = "checked";
	} else {
		event.target.checked = "";
	}
	this.updateSchoolclassViewFormSubmitToggle();
}

/*
 * RETURN FUNCTIONS
 */


/*
 * EVENT HANDLERS - Edit Schoolclass
 */

StudentSchoolclassesDisplay.prototype.saveSchoolclass = function(event) {
	var value = "";
	for (i = 0; i < this.updateSchoolclassViewForm.elements.length; i++) {
		if (this.updateSchoolclassViewForm.elements[i].name == "active[]" && this.updateSchoolclassViewForm.elements[i].checked && !this.updateSchoolclassViewForm.elements[i].disabled) value = this.updateSchoolclassViewForm.elements[i].value;
	}
	console.log("set active: "+value);
	if (value != "") app.getPresenterFactory().getStudentSchoolclassPresenter().switchSchoolclass( value );
	
	for (i = 0; i < this.updateSchoolclassViewForm.elements.length; i++) {
		if (this.updateSchoolclassViewForm.elements[i].name == "remove[]" && this.updateSchoolclassViewForm.elements[i].checked) {
			app.getPresenterFactory().getStudentSchoolclassPresenter().removeASchoolclass(this.updateSchoolclassViewForm.elements[i].value);
		}
	}
}


StudentSchoolclassesDisplay.prototype.submitSchoolclass = function(event) {
	event.preventDefault();		
	this.saveSchoolclass(event);
}

StudentSchoolclassesDisplay.prototype.addSchoolclass = function(event) {
	event.preventDefault();
	var key = this.addSchoolclassForm.elements['registerkey'].value
	var id =  this.addSchoolclassForm.elements['schoolClass'].value

	if (id != '' )
		app.getPresenterFactory().getStudentSchoolclassPresenter().addSchoolclass(id, key);
}

StudentSchoolclassesDisplay.prototype.changeActiveCheckbox = function(event) {
	if (event.target.checked) {
		// Set others unchecked
		this.uncheckSchoolclassViewFormCheckboxes();
		
		// Set remove unchecked
		var $row = $(event.target.parentElement.parentElement.parentElement);
		$row.find("input[name='remove[]']").prop('checked','');
		
		// Set current checked
		event.target.checked = "checked";
		$(event.target).parent().addClass('temporary');
	} else {
		event.target.checked = "";
	}
	this.updateSchoolclassViewFormSubmitToggle();
}

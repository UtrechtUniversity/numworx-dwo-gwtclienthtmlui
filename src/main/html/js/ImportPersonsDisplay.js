/**
 * ImportPersonsDisplay
 */

function ImportPersonsDisplay() {
	// jQuery objects
	this.$panel = jQuery("#importPersonsDisplay");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	this.$schoolclassesTable = $("#importPersonsSchoolClassesTable");
	this.$schoolclassesRow = this.$schoolclassesTable.find("tbody tr").first().detach();
	this.$schoolclassesTableBody = this.$schoolclassesTable.find("tbody");
	this.$schoolclassesTableHead = this.$schoolclassesTable.find("thead");
	this.$schoolclassesTableHead.find(".sortButton").click(Helpers.clickSortButton);
	
	this.$personsTable = $("#importPersonsTable");
	this.$personsRow   = this.$personsTable.find("tbody tr").first().detach();
	this.$personsTableBody = this.$personsTable.find("tbody");
	this.$personsTableHead = this.$personsTable.find("thead");

	this.form = document.forms['importPersonsForm'];
	this.$form = $(this.form);
	this.$form.on('submit', $.proxy(this.submitImportPersonsForm, this));
	
	this.$roles = $("#importPersonsRoles");
	
}

ImportPersonsDisplay.prototype.show = function() {
	if (true) // for Teacher, false for SchoolAdmin
		this.$roles.hide();
	this.$panel.show();
}

ImportPersonsDisplay.prototype.clear = function () {	
	this.$schoolclassesTableHead.find(".sortButton").removeClass("active");
}

ImportPersonsDisplay.prototype.init = function() {}

ImportPersonsDisplay.prototype.setEmptyPeopleTableMessage = function() {
	this.$personsTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');		
}

ImportPersonsDisplay.prototype.setLoadingPeopleTableMessage = function() {
	this.$personsTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}

ImportPersonsDisplay.prototype.setEmptySchoolClassesTableMessage = function() {	
	this.$schoolclassesTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');		
}

ImportPersonsDisplay.prototype.setLoadingSchoolClassesTableMessage = function() {
	this.$schoolclassesTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}

ImportPersonsDisplay.prototype.setHelp = function(url) {
	this.$helpContentIFrame.attr('src', url );
}

ImportPersonsDisplay.prototype.setPersonImportList = function(json) {
	var persons = json;
	this.$personsTableBody.html("");
	var length = persons.length;
	for (var i = 0; i < length; i++) {
		var person = persons[i];
		var $row = this.$personsRow.clone();
		$row.prop('tabindex', i);
		var input;
		input = $row.find("#importPersonsUsername");
		input.val(person.userName); input.removeAttr('id');

		input = $row.find("#importPersonsGivenName");
		input.val(person.givenName); input.removeAttr('id');

		input = $row.find("#importPersonsInsertion");
		input.val(person.insertion); input.removeAttr('id');

		input = $row.find("#importPersonsSurname");
		input.val(person.familyName); input.removeAttr('id');

		input = $row.find("#importPersonsMail");
		input.val(person.email); input.removeAttr('id');

		input = $row.find("#importPersonsPassword");
		input.val(person.password); input.removeAttr('id');

		this.$personsTableBody.append($row);
	}
	
	
}

ImportPersonsDisplay.prototype.changeInputField = function(event) {
	// validate all fields.
}


ImportPersonsDisplay.prototype.showSchoolClasses = function(json) {
	var schoolclasses = json;
	
	this.$schoolclassesTableBody.html("");
	
	var i = 1;
	for (var id in schoolclasses) { 
		el = schoolclasses[id].schoolClass;
		$row = this.$schoolclassesRow.clone();
		$row.prop('tabindex', i);
		$row.find("#importPersonsSchoolclassName").html( el.schoolClassName ).attr('data-sortvalue', el.schoolClassName).removeAttr("id");
	
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			
			this.value = id;
			
			// Change ID and label for-attributes
			this.id = this.id + i;				
			oldFor = this.nextElementSibling.getAttribute("for");
			this.nextElementSibling.setAttribute("for", oldFor + i);
		});
		
		$row.find("input[type='checkbox'],input[type='radio']").on('change', $.proxy(this.changeInputField,this));	

		this.$schoolclassesTableBody.append($row);
		i++;
	}
	this.$schoolclassesTableHead.find(".sortButton.default").trigger('click');
}


ImportPersonsDisplay.prototype.importPersons = function() {
	var persons = []
	this.$personsTableBody.find('tr').each( function() {
		var $tr = $(this);
		var person = {}
		$tr.find('input').each( function() {
			var name = this.name;
			var value = this.value;
			person[name] = value;
		})
		persons.push(person)
	})
	var schoolclass;
	for (var i = 0; i < this.form.elements["schoolclass"].length; i++) 
	{	schoolclass = this.form.elements["schoolclass"][i]
		if (schoolclass.checked) break;
	}

	var role;
	for (var i = 0; i < this.form.elements["role"].length; i++) 
	{	role = this.form.elements["role"][i]
		if (role.checked) break;
	}
	
	console.log("voor ImportPersonsPresenter")
	console.log(JSON.stringify(persons))
	console.log(JSON.stringify(schoolclass.value))
	console.log(JSON.stringify(role.value))

	if (role.value === 'L')
		app.getPresenterFactory().getImportPersonsPresenter().submitInputStudents(persons, schoolclass.value);
	else if (role.value == 'D')
		app.getPresenterFactory().getImportPersonsPresenter().submitInputTeachers(persons, schoolclass.value);
}

/// Events

ImportPersonsDisplay.prototype.submitImportPersonsForm = function(event) {
	event.preventDefault()
	this.importPersons()
}

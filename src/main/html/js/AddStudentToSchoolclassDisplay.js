function AddStudentToSchoolclassDisplay() {	
	// Forms 
	this.addStudentSearchForm = document.forms["addStudentSearch"];
	this.addStudentAddForm = document.forms["addStudentAdd"];
	
	// Buttons 
	
	// jQuery objects
	this.$panel = jQuery("#addStudentToSchoolclassDisplay");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
		
	this.$addStudentSearchForm = $(this.addStudentSearchForm);
	this.$addStudentAddForm = $(this.addStudentAddForm);
	
	this.$addStudentRow = this.$addStudentAddForm.find("tbody tr").detach();
	this.$addStudentTableBody = this.$addStudentAddForm.find("tbody");
		
	// Bind handlers
	this.$addStudentAddForm.on('submit', $.proxy(this.submitAddStudentAddForm, this));
	this.$addStudentSearchForm.on('submit', $.proxy(this.submitAddStudentSearchForm, this));
	
	// Init
	this.$panel.hide();
}

AddStudentToSchoolclassDisplay.prototype.show = function() {
	this.$panel.show();
}

/*
 * GUI FUNCTIONS
 */

AddStudentToSchoolclassDisplay.prototype.searchStudent = function() {
	var addStudentSearchForm = this.addStudentSearchForm; // for the inline function
	
	if ( this.addStudentSearchForm.elements["username"].value == "" &&
		 this.addStudentSearchForm.elements["givenName"].value == "" &&
		 this.addStudentSearchForm.elements["insertion"].value == "" &&
		 this.addStudentSearchForm.elements["familyName"].value == "" ) {
			$result = this.$addStudentTableBody.find("tr");
	} else {	
		var $result = this.$addStudentTableBody.find("td span").filter(function() {
			el = $(this).get(0);
						
			if (el.parentElement.cellIndex == 0) val = addStudentSearchForm.elements["username"].value;
			if (el.parentElement.cellIndex == 1) val = addStudentSearchForm.elements["givenName"].value;
			if (el.parentElement.cellIndex == 2) val = addStudentSearchForm.elements["insertion"].value;
			if (el.parentElement.cellIndex == 3) val = addStudentSearchForm.elements["familyName"].value;
			
			return el.innerHTML.toLowerCase() == val.toLowerCase();
		}).closest("tr");
	}
	
	this.$addStudentTableBody.find("tr").hide()
	$result.show();
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

AddStudentToSchoolclassDisplay.prototype.init = function () {
	Helpers.stretchHeight([ this.$addStudentTableBody ]);
}

AddStudentToSchoolclassDisplay.prototype.clear = function () {
	this.addStudentSearchForm.elements["username"].value == "";
	this.addStudentSearchForm.elements["givenName"].value == "";
	this.addStudentSearchForm.elements["insertion"].value == "";
	this.addStudentSearchForm.elements["familyName"].value == "";
}

AddStudentToSchoolclassDisplay.prototype.setHelp = function(url) {
	this.$helpContentIFrame.attr('src', url );
}

AddStudentToSchoolclassDisplay.prototype.showStudents = function(json) {	
	var students = json, studentName;
	
	this.$addStudentTableBody.html("");
	
	// No Results
	if ($.isEmptyObject(students)) {
		$row = this.$addStudentRow.clone();
		this.$addStudentTableBody.html('<tr colspan="4" class="empty"><td>Geen leerlingen gevonden.</td></tr>');
		return;
	}
	
	var i = 1;
	for (var id in students) { // TODO: probably change to array
		$row = this.$addStudentRow.clone();		
		$row.find("#addStudentAddId").val( id ).removeAttr("id");
		$row.find("#addStudentAddUsername").html( students[id].userName ).removeAttr("id");
		$row.find("#addStudentAddGivenName").html( students[id].givenName ).removeAttr("id");
		$row.find("#addStudentAddInsertion").html( students[id].insertion ).removeAttr("id");
		$row.find("#addStudentAddFamilyName").html( students[id].familyName ).removeAttr("id");
				 
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});
		
		$row.on('click keypress', $.proxy(this.clickAddStudentAddRow, this));
		this.$addStudentTableBody.append($row);
		i++;
	}
	this.addStudentAddFormToggle(false);
}

AddStudentToSchoolclassDisplay.prototype.setEmptyTableMessage = function() {
	this.$addStudentTableBody.html('<tr class="empty"><td>Geen leerlingen gevonden</td></tr>');
}

AddStudentToSchoolclassDisplay.prototype.setLoadingTableMessage = function() {
	this.$addStudentTableBody.html('<tr class="loading"><td>Leerlingen worden geladen.</td></tr>');
}


/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */
AddStudentToSchoolclassDisplay.prototype.addStudent = function(id) {
	app.getPresenterFactory().getAddStudentToSchoolclassPresenter().AddStudentToSchoolClass(id);
}

/*
 * EVENT HANDLERS - add
 */

AddStudentToSchoolclassDisplay.prototype.submitAddStudentAddForm = function(event) {
	event.preventDefault();	
	this.addStudent(this.addStudentAddForm.elements["id"].value);
}
AddStudentToSchoolclassDisplay.prototype.clickAddStudentAddRow = function(event) {
	Helpers.selectTableRow(event);
	if (this.addStudentAddForm.elements["id"].value != "") this.addStudentAddFormToggle(true);
	else this.addStudentAddFormToggle(false);	
}

// helpers
AddStudentToSchoolclassDisplay.prototype.addStudentAddFormToggle = function(value) {
	if (value) this.$addStudentAddForm.find(':submit').prop('disabled','');
	else this.$addStudentAddForm.find(':submit').prop('disabled','disabled');
}


/*
 * EVENT HANDLERS - search
 */

AddStudentToSchoolclassDisplay.prototype.submitAddStudentSearchForm = function(event) {
	event.preventDefault();	
	this.searchStudent();
}

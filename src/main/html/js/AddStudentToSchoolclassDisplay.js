function AddStudentToSchoolclassDisplay() {	
	// Forms 
	this.addStudentSearchForm = document.forms["addStudentSearch"];
	this.addStudentAddForm = document.forms["addStudentAdd"];
	
	// jQuery objects
	this.$panel = jQuery("#addStudentToSchoolclassDisplay");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
		
	this.$addStudentSearchForm = $(this.addStudentSearchForm);
	this.$addStudentAddForm = $(this.addStudentAddForm);
	
	this.$addStudentRow = this.$addStudentAddForm.find("tbody tr").detach();
	this.$addStudentTableBody = this.$addStudentAddForm.find("tbody");
	this.$addStudentTableHead = this.$addStudentAddForm.find("thead");

	// Buttons 
    this.$resetButton = $(this.addStudentSearchForm.elements["reload"]);

	// Bind handlers
	this.$addStudentAddForm.on('submit', $.proxy(this.submitAddStudentAddForm, this));
	this.$addStudentSearchForm.on('submit', $.proxy(this.submitAddStudentSearchForm, this));
	this.$addStudentTableHead.find(".sortButton").click(Helpers.clickSortButton);
	//this.$addStudentTableHead.find(".sortButton").click(Helpers.clickSortButton);
    this.$resetButton.on('click', $.proxy(this.clickReset,this));
	
	// Init
	this.$panel.hide();
}

AddStudentToSchoolclassDisplay.prototype.show = function() {
    this.localize();
	this.$panel.show();
}


AddStudentToSchoolclassDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

AddStudentToSchoolclassDisplay.prototype.resetSorting = function() {
	this.$addStudentTableHead.find(".sortButton").removeClass("active");
}

/*
 * GUI FUNCTIONS
 */

AddStudentToSchoolclassDisplay.prototype.searchStudent = function() {
	var addStudentSearchForm = this.addStudentSearchForm; // for the inline function
	if ( this.addStudentSearchForm.elements["addStudentSearchFamilyName"].value == "" &&
		 this.addStudentSearchForm.elements["addStudentSearchGivenName"].value == "" &&
		 this.addStudentSearchForm.elements["addStudentSearchInsertion"].value == "" &&
		 this.addStudentSearchForm.elements["addStudentSearchUserName"].value == "" ) {
			$result = this.$addStudentTableBody.find("tr");
	} else {	
                var $result;
                var rows = this.$addStudentTableBody.find("tr");
//                var rowList = rows.find("td span");
                $result = rows.filter(function() {
                    var el = $(this);
                    var result = true;
                    result = result && Helpers.searchCompare(el.get(0).children.item(0).innerText, addStudentSearchForm.elements["familyName"].value);
                    result = result && Helpers.searchCompare(el.get(0).children.item(1).innerText, addStudentSearchForm.elements["givenName"].value);
                    result = result && Helpers.searchCompare(el.get(0).children.item(2).innerText, addStudentSearchForm.elements["insertion"].value);
                    result = result && Helpers.searchCompare(el.get(0).children.item(3).innerText, addStudentSearchForm.elements["username"].value);
                    return result;
                }                   
                ).closest("tr");
            //$result = rows;
	}
//        
//	if ( this.addStudentSearchForm.elements["username"].value == "" &&
//		 this.addStudentSearchForm.elements["givenName"].value == "" &&
//		 this.addStudentSearchForm.elements["insertion"].value == "" &&
//		 this.addStudentSearchForm.elements["familyName"].value == "" ) {
//			$result = this.$addStudentTableBody.find("tr");
//	} else {	
//		var $result = this.$addStudentTableBody.find("td span").filter(function() {
//			var el = $(this).get(0);
//			var val = "";
//						
//			if (el.parentElement.cellIndex == 3) val = addStudentSearchForm.elements["username"].value;
//			if (el.parentElement.cellIndex == 1) val = addStudentSearchForm.elements["givenName"].value;
//			if (el.parentElement.cellIndex == 2) val = addStudentSearchForm.elements["insertion"].value;
//			if (el.parentElement.cellIndex == 0) val = addStudentSearchForm.elements["familyName"].value;
//			
//			return Helpers.searchCompare(el.innerHTML, val);			
//		}).closest("tr");
//	}
	
	this.$addStudentTableBody.find("tr").hide()
	$result.show();
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

AddStudentToSchoolclassDisplay.prototype.init = function () {
	app.mainDisplay.registerStretchables( [ this.$addStudentTableBody ] );
	this.resetSorting();
	this.addStudentAddFormToggle(false);
}

AddStudentToSchoolclassDisplay.prototype.clear = function () {
	console.log("AddStudentToSchoolclassDisplayCLEAR");
	this.addStudentSearchForm.elements["username"].value == "";
	this.addStudentSearchForm.elements["givenName"].value == "";
	this.addStudentSearchForm.elements["insertion"].value == "";
	this.addStudentSearchForm.elements["familyName"].value == "";
	this.$addStudentTableHead.find(".sortButton").removeClass('active');
	this.resetSorting();
	this.addStudentAddFormToggle(false);
}


AddStudentToSchoolclassDisplay.prototype.clickReset = function(event) {
	this.addStudentSearchForm.elements["username"].value = "";
	this.addStudentSearchForm.elements["givenName"].value = "";
	this.addStudentSearchForm.elements["insertion"].value = "";
	this.addStudentSearchForm.elements["familyName"].value = "";
	this.$addStudentTableHead.find(".sortButton").removeClass('active');
	this.resetSorting();
	this.searchStudent();
}


AddStudentToSchoolclassDisplay.prototype.setSchoolClass = function(schoolClass) {
	console.log("setting schooclass: "+schoolClass);
}

AddStudentToSchoolclassDisplay.prototype.setHelp = function(url) {
	if (this.$helpContentIFrame.attr('src') != url) this.$helpContentIFrame.attr('src', url );
}

AddStudentToSchoolclassDisplay.prototype.showStudents = function(json) {	
	var students = json, studentName;
	
	this.$addStudentTableBody.html("");
	
	// No Results
	if ($.isEmptyObject(students)) {
		$row = this.$addStudentRow.clone();
		this.$addStudentTableBody.html('<tr colspan="4" class="empty"><td><span data-translate="NUM_TBL_EMPTYTABLE">Geen items gevonden</span></td></tr>');
		return;
	}
	
	var i = 1;
	for (var id in students) { // TODO: probably change to array
		$row = this.$addStudentRow.clone();		
		$row.find("#addStudentAddId").val( id ).removeAttr("id");
		$row.find("#addStudentAddUsername").html( students[id].userName ).attr('data-sortvalue',  students[id].userName).removeAttr("id");
		$row.find("#addStudentAddGivenName").html( students[id].givenName ).attr('data-sortvalue',  students[id].givenName).removeAttr("id");
		$row.find("#addStudentAddInsertion").html( students[id].insertion ).attr('data-sortvalue',  students[id].insertion).removeAttr("id");
		$row.find("#addStudentAddFamilyName").html( students[id].familyName ).attr('data-sortvalue',  students[id].familyName).removeAttr("id");
				 
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});
		
		$row.on('click keypress', $.proxy(this.clickAddStudentAddRow, this));
		this.$addStudentTableBody.append($row);
		i++;
	}
	
	this.$addStudentTableHead.find(".sortButton.default").trigger('click');
	this.addStudentAddFormToggle(false);
}

AddStudentToSchoolclassDisplay.prototype.setEmptyTableMessage = function() {
	this.$addStudentTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
}

AddStudentToSchoolclassDisplay.prototype.setLoadingTableMessage = function() {
	this.$addStudentTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
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
	
	for (var i = 0; i < this.addStudentAddForm.elements["id"].length; i++) 
		if (this.addStudentAddForm.elements["id"][i].checked) break;
	
	this.addStudent(this.addStudentAddForm.elements["id"][i].value);
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

function AddTeacherToSchoolclassDisplay() {	
	// Forms 
	this.addTeacherSearchForm = document.forms["addTeacherSearch"];
	this.addTeacherAddForm = document.forms["addTeacherAdd"];
	
	// jQuery objects
	this.$panel = jQuery("#addTeacherToSchoolclassDisplay");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	this.$addTeacherSearchForm = $(this.addTeacherSearchForm);
	this.$addTeacherAddForm = $(this.addTeacherAddForm);
	
	this.$addTeacherRow = this.$addTeacherAddForm.find("tbody tr").detach();
	this.$addTeacherTableBody = this.$addTeacherAddForm.find("tbody");
	this.$addTeacherTableHead = this.$addTeacherAddForm.find("thead");
		
	// Buttons 
    this.$resetButton = $(this.addTeacherSearchForm.elements["reload"]);

	// Bind handlers
	this.$addTeacherAddForm.on('submit', $.proxy(this.submitAddTeacherAddForm, this));
	this.$addTeacherSearchForm.on('submit', $.proxy(this.submitAddTeacherSearchForm, this));
	this.$addTeacherTableHead.find(".sortButton").click(Helpers.clickSortButton);
    this.$resetButton.on('click', $.proxy(this.clickReset,this));
	
	// Init
	this.$panel.hide();
}

AddTeacherToSchoolclassDisplay.prototype.show = function() {
    this.localize();
    this.$panel.show();
}

AddTeacherToSchoolclassDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

AddTeacherToSchoolclassDisplay.prototype.resetSorting = function() {
	this.$addTeacherTableHead.find(".sortButton").removeClass("active");
}

/*
 * GUI FUNCTIONS
 */

AddTeacherToSchoolclassDisplay.prototype.searchTeacher = function() {
	var addTeacherSearchForm = this.addTeacherSearchForm;
        
        if ( this.addTeacherSearchForm.elements["familyName"].value == "" &&
		 this.addTeacherSearchForm.elements["givenName"].value == "" &&
		 this.addTeacherSearchForm.elements["insertion"].value == "" &&
		 this.addTeacherSearchForm.elements["userName"].value == "" ) {
			$result = this.$addTeacherTableBody.find("tr");
	} else {	
                var $result;
                var rows = this.$addTeacherTableBody.find("tr");
//                var rowList = rows.find("td span");
                $result = rows.filter(function() {
                    var el = $(this);
                    var result = true;
                    result = result && Helpers.searchCompare(el.get(0).children.item(0).innerText, addTeacherSearchForm.elements["familyName"].value);
                    result = result && Helpers.searchCompare(el.get(0).children.item(1).innerText, addTeacherSearchForm.elements["givenName"].value);
                    result = result && Helpers.searchCompare(el.get(0).children.item(2).innerText, addTeacherSearchForm.elements["insertion"].value);
                    result = result && Helpers.searchCompare(el.get(0).children.item(3).innerText, addTeacherSearchForm.elements["userName"].value);
                    return result;
                }                   
                ).closest("tr");
            //$result = rows;
	}
//        
//	if ( addTeacherSearchForm.elements["userName"].value == "" &&
//		 addTeacherSearchForm.elements["givenName"].value == "" &&
//		 addTeacherSearchForm.elements["insertion"].value == "" &&
//	addTeacherSearchForm.elements["familyName"].value == "" ) {
//			$result = this.$addTeacherTableBody.find("tr");
//	} else {	
//		var $result = this.$addTeacherTableBody.find("td span").filter(function() {
//			var el = $(this).get(0);
//			var val = "";
//						
//			if (el.parentElement.cellIndex == 3) val = addTeacherSearchForm.elements["userName"].value;
//			if (el.parentElement.cellIndex == 1) val = addTeacherSearchForm.elements["givenName"].value;
//			if (el.parentElement.cellIndex == 2) val = addTeacherSearchForm.elements["insertion"].value;
//			if (el.parentElement.cellIndex == 0) val = addTeacherSearchForm.elements["familyName"].value;
//			
//			return Helpers.searchCompare(el.innerHTML, val);			
//		}).closest("tr");
//	}
	
	this.$addTeacherTableBody.find("tr").hide()
	$result.show();
}

/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

AddTeacherToSchoolclassDisplay.prototype.init = function () {
	app.mainDisplay.registerStretchables( [ this.$addTeacherTableBody ] );
	this.resetSorting();
	this.addTeacherAddFormToggle(false);
}

AddTeacherToSchoolclassDisplay.prototype.clear = function () {
	console.log("AddTeacherToSchoolclassDisplayCLEAR");
	this.addTeacherSearchForm.elements["userName"].value == "";
	this.addTeacherSearchForm.elements["givenName"].value == "";
	this.addTeacherSearchForm.elements["insertion"].value == "";
	this.addTeacherSearchForm.elements["familyName"].value == "";
	this.$addTeacherTableHead.find(".sortButton").removeClass('active');
	this.resetSorting();
	this.addTeacherAddFormToggle(false);
}

AddTeacherToSchoolclassDisplay.prototype.clickReset = function(event) {
        this.searchTeacher();
	this.addTeacherSearchForm.elements["userName"].value = "";
	this.addTeacherSearchForm.elements["givenName"].value = "";
	this.addTeacherSearchForm.elements["insertion"].value = "";
	this.addTeacherSearchForm.elements["familyName"].value = "";
	this.$addTeacherTableHead.find(".sortButton").removeClass('active');
	this.resetSorting();
	
}

AddTeacherToSchoolclassDisplay.prototype.setHelp = function(url) {
		this.$helpContentIFrame.attr('src', url );
}

AddTeacherToSchoolclassDisplay.prototype.setSchoolClass = function(schoolClass) {
	console.log("setting schooclass: "+schoolClass);
}

AddTeacherToSchoolclassDisplay.prototype.showTeachers = function(json) {
	var teachers = json, teacherName;
	
	this.$addTeacherTableBody.html("");
	
	// No Results
	if ($.isEmptyObject(teachers)) {
		$row = this.$changeTeachersRow.clone();
		$row.find("#addTeacherAddUserName").html( "Geen docenten gekoppeld" ).removeAttr("id");
		this.$addTeacherTableBody.append($row);
		return;
	}
	
	var i = 1;
	for (var id in teachers) { // TODO: probably change to array
		$row = this.$addTeacherRow.clone();		
		$row.find("#addTeacherAddId").val( id ).removeAttr("id");
		$row.find("#addTeacherAddFamilyName").html( teachers[id].familyName ).attr('data-sortvalue',  teachers[id].familyName).removeAttr("id");
		$row.find("#addTeacherAddGivenName").html( teachers[id].givenName ).attr('data-sortvalue',  teachers[id].givenName).removeAttr("id");
		$row.find("#addTeacherAddInsertion").html( teachers[id].insertion ).attr('data-sortvalue',  teachers[id].insertion).removeAttr("id");
		$row.find("#addTeacherAddUserName").html( teachers[id].userName ).attr('data-sortvalue',  teachers[id].userName).removeAttr("id");
		 
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});
		
		$row.on('click keypress', $.proxy(this.clickAddTeacherAddRow, this));
		this.$addTeacherTableBody.append($row);
		i++;
	}
	
	this.$addTeacherTableHead.find(".sortButton.default").trigger('click');
	this.addTeacherAddFormToggle(false);
}

AddTeacherToSchoolclassDisplay.prototype.setEmptyTableMessage = function() {
	this.$addTeacherTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
}

AddTeacherToSchoolclassDisplay.prototype.setLoadingTableMessage = function() {
	this.$addTeacherTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}


/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */
AddTeacherToSchoolclassDisplay.prototype.addTeacher = function(id) {
	app.getPresenterFactory().getAddTeacherToSchoolclassPresenter().AddTeacherToSchoolClass(id);
}


/*
 * EVENT HANDLERS - add
 */

AddTeacherToSchoolclassDisplay.prototype.submitAddTeacherAddForm = function(event) {
	event.preventDefault();	
	
	for (var i = 0; i < this.addTeacherAddForm.elements["id"].length; i++) 
		if (this.addTeacherAddForm.elements["id"][i].checked) break;
	
	this.addTeacher(this.addTeacherAddForm.elements["id"][i].value);
}
AddTeacherToSchoolclassDisplay.prototype.clickAddTeacherAddRow = function(event) {
	Helpers.selectTableRow(event);
	if (this.addTeacherAddForm.elements["id"].value != "") this.addTeacherAddFormToggle(true);
	else this.addTeacherAddFormToggle(false);	
}

// helpers
AddTeacherToSchoolclassDisplay.prototype.addTeacherAddFormToggle = function(value) {
	if (value) this.$addTeacherAddForm.find(':submit').prop('disabled','');
	else this.$addTeacherAddForm.find(':submit').prop('disabled','disabled');
}


/*
 * EVENT HANDLERS - search
 */

AddTeacherToSchoolclassDisplay.prototype.submitAddTeacherSearchForm = function(event) {
	event.preventDefault();	
	this.searchTeacher();
}

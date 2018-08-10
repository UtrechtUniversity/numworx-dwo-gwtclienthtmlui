function EditSchoolclassesDisplay() {	
	// Forms 
	this.editSchoolclassForm = document.forms["editSchoolclass"];
	this.changeStudentsForm = document.forms["changeStudents"];
	this.changeTeachersForm = document.forms["changeTeachers"];
	this.changeModulesForm = document.forms["changeModules"];
	
	// Buttons 
	this.editSchoolclassFormSaveButton = this.editSchoolclassForm.elements["save"];
	this.editSchoolclassFormDeleteButton = this.editSchoolclassForm.elements["delete"];
	
	this.changeStudentsFormShowButton = this.changeStudentsForm.elements["show"];
	this.changeStudentsFormConnectButton = this.changeStudentsForm.elements["connect"];
	this.changeStudentsFormCopyOrMoveButton = this.changeStudentsForm.elements["copyOrMove"];
	
	this.changeTeachersFormShowButton = this.changeTeachersForm.elements["show"];
	this.changeTeachersFormConnectButton = this.changeTeachersForm.elements["connect"];
	
	this.changeModulesFormShowButton = this.changeModulesForm.elements["show"];
	this.changeModulesFormConnectButton = this.changeModulesForm.elements["connect"];

	
	// jQuery objects
	this.$panel = jQuery("#editSchoolclassesDisplayPanel");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	// Edit form elements
	this.$editSchoolclassForm = $(this.editSchoolclassForm);	
	this.$changeStudentsForm = $(this.changeStudentsForm);
	this.$changeTeachersForm = $(this.changeTeachersForm);
	this.$changeModulesForm = $(this.changeModulesForm);	
	this.$editSchoolclassFormSaveButton = $(this.editSchoolclassFormSaveButton);
	this.$editSchoolclassFormDeleteButton = $(this.editSchoolclassFormDeleteButton);
	
	// Student box elements
	this.$changeStudentsFormShowButton = $(this.changeStudentsFormShowButton);
	this.$changeStudentsFormConnectButton = $(this.changeStudentsFormConnectButton);
	this.$changeStudentsFormCopyOrMoveButton = $(this.changeStudentsFormCopyOrMoveButton);	
	this.$changeStudentsRow = this.$changeStudentsForm.find("tbody tr").detach();
	this.$changeStudentsTableBody = this.$changeStudentsForm.find("tbody");	
	this.$changeStudentsTableHead = this.$changeStudentsForm.find("thead");	
	
	// Teacher box elements
	this.$changeTeachersFormShowButton = $(this.changeTeachersFormShowButton);
	this.$changeTeachersFormConnectButton = $(this.changeTeachersFormConnectButton);	
	this.$changeTeachersRow = this.$changeTeachersForm.find("tbody tr").detach();
	this.$changeTeachersTableBody = this.$changeTeachersForm.find("tbody");
	this.$changeTeachersTableHead = this.$changeTeachersForm.find("thead");
	
	// Modules box elements
	this.$changeModulesFormShowButton = $(this.changeModulesFormShowButton);
	this.$changeModulesFormConnectButton = $(this.changeModulesFormConnectButton);	
	this.$changeModulesRow = this.$changeModulesForm.find("tbody tr").detach();
	this.$changeModulesTableBody = this.$changeModulesForm.find("tbody");
	this.$changeModulesTableHead = this.$changeModulesForm.find("thead");
		
	// Bind handlers
	this.$editSchoolclassForm.on('submit', $.proxy(this.submitEditSchoolclass, this));
	this.$editSchoolclassFormSaveButton.on('click', $.proxy(this.clickEditSchoolclassFormSaveButton, this));
	this.$editSchoolclassFormDeleteButton.on('click', $.proxy(this.clickEditSchoolclassFormDeleteButton, this));
	
	this.$changeStudentsForm.on('submit', $.proxy(this.submitChangeStudentsForm, this));
	this.$changeStudentsFormShowButton.on('click', $.proxy(this.clickChangeStudentsFormShowButton, this));
	this.$changeStudentsFormConnectButton.on('click', $.proxy(this.clickChangeStudentsFormConnectButton, this));
	this.$changeStudentsFormCopyOrMoveButton.on('click', $.proxy(this.clickChangeStudentsFormCopyOrMoveButton, this));
	this.$changeStudentsTableHead.find(".sortButton").click(Helpers.clickSortButton);
	
	this.$changeTeachersForm.on('submit', $.proxy(this.submitChangeTeachersForm, this));
	this.$changeTeachersFormShowButton.on('click', $.proxy(this.clickChangeTeachersFormShowButton, this));
	this.$changeTeachersFormConnectButton.on('click', $.proxy(this.clickChangeTeachersFormConnectButton, this));
	this.$changeTeachersTableHead.find(".sortButton").click(Helpers.clickSortButton);
	
	this.$changeModulesForm.on('submit', $.proxy(this.submitChangeModulesForm, this));
	this.$changeModulesFormShowButton.on('click', $.proxy(this.clickChangeModulesFormShowButton, this));
	this.$changeModulesFormConnectButton.on('click', $.proxy(this.clickChangeModulesFormConnectButton, this));
	this.$changeModulesTableHead.find(".sortButton").click(Helpers.clickSortButton);
	
	// Init
	this.$panel.hide();
}

EditSchoolclassesDisplay.prototype.show = function() {
        this.localize();
	this.$panel.show();
	
	
	//Helpers.stretchHeight( [ this.$changeStudentsTableBody, this.$changeTeachersTableBody, this.$changeModulesTableBody ]);
}


EditSchoolclassesDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

EditSchoolclassesDisplay.prototype.resetSorting = function() {
	this.$changeStudentsTableHead.find(".sortButton").removeClass("active");
	this.$changeTeachersTableHead.find(".sortButton").removeClass("active");
	this.$changeModulesTableHead.find(".sortButton").removeClass("active");
}

/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

EditSchoolclassesDisplay.prototype.clear = function () {
	console.log("clear!");
	this.editSchoolclassForm.elements["classname"].value = "";
		
	this.editSchoolclassForm.elements["useClasskey"][0].checked = false;
	this.editSchoolclassForm.elements["useClasskey"][1].checked = true;
	
	this.editSchoolclassForm.elements["useClasstree"][0].checked = false;
	this.editSchoolclassForm.elements["useClasstree"][1].checked = true;
	
	this.editSchoolclassForm.elements["classkey"].value  = "";
	
	this.$changeStudentsTableBody.html("");
	this.$changeTeachersTableBody.html("");
	this.$changeModulesTableBody.html("");
	
	this.$changeStudentsTableHead.find(".sortButton").removeClass('active');
	this.$changeTeachersTableHead.find(".sortButton").removeClass('active');
	this.$changeModulesTableHead.find(".sortButton").removeClass('active');
	
	this.resetSorting();
}

EditSchoolclassesDisplay.prototype.init = function () {
	console.log("init2!");
	//this.$changeStudentsTableBody.html("");
	//this.$changeTeachersTableBody.html("");
	//this.$changeModulesTableBody.html("");
	
	app.mainDisplay.registerStretchables( [ this.$changeStudentsTableBody, this.$changeTeachersTableBody, this.$changeModulesTableBody ] );
	this.resetSorting();
}

EditSchoolclassesDisplay.prototype.setHelp = function(url) {
	this.$helpContentIFrame.attr('src', url );
}

EditSchoolclassesDisplay.prototype.showSchoolClass = function(json) {	
	var schoolclass = json;
	
	this.editSchoolclassForm.elements["classname"].value = schoolclass.schoolClassName;
	
	if (schoolclass.registrationKey != "") {
		this.editSchoolclassForm.elements["useClasskey"][0].checked = true; //yes
		this.editSchoolclassForm.elements["useClasskey"][1].checked = false;
	} else {
		this.editSchoolclassForm.elements["useClasskey"][0].checked = false;
		this.editSchoolclassForm.elements["useClasskey"][1].checked = true;
	} 
	
	if (schoolclass.iconizer == true) {
		this.editSchoolclassForm.elements["useClasstree"][0].checked = true;
		this.editSchoolclassForm.elements["useClasstree"][1].checked = false;
	} else {
		this.editSchoolclassForm.elements["useClasstree"][0].checked = false;
		this.editSchoolclassForm.elements["useClasstree"][1].checked = true;
	} 
		
	this.editSchoolclassForm.elements["classkey"].value = schoolclass.registrationKey;
}

EditSchoolclassesDisplay.prototype.showStudents = function(json) {	
	var students = json, studentName;
	
	this.$changeStudentsTableBody.html("");
	
	// No Results
	if ($.isEmptyObject(students)) {
		this.$changeStudentsTableBody.html('<tr class="empty"><td>Geen studenten in deze klas</td></tr>');
		return;
	}
	
	// > 0 results
	var i = 1;
	for (var id in students) { // TODO: probably change to array
		studentName = students[id].givenName + (students[id].insertion ? " "+students[id].insertion : "") + " " + students[id].familyName;
		studentSortName = students[id].familyName + (students[id].insertion ? " "+students[id].insertion : "") + " " + students[id].givenName;
		$row = this.$changeStudentsRow.clone();
		$row.find("#chooseStudentName").html( studentName ).attr('data-sortvalue', studentSortName).removeAttr("id");
		this.$changeStudentsTableBody.append($row);
		i++;
	}
	
}

EditSchoolclassesDisplay.prototype.showTeachers = function(json) {	
	var teachers = json;//, teacherName;
	var teacherName;
	this.$changeTeachersTableBody.html("");
	
	// No Results
	if ($.isEmptyObject(teachers)) {
		this.$changeTeachersTableBody.html('<tr class="empty"><td>Geen docenten gekoppeld</td></tr>');
		return;
	}
	
	var i = 1;
	for (var id in teachers) { // TODO: probably change to array
		teacherName = teachers[id].givenName + (teachers[id].insertion ? " "+teachers[id].insertion : "") + " " + teachers[id].familyName;
		teacherSortName = teachers[id].familyName + (teachers[id].insertion ? " "+teachers[id].insertion : "") + " " + teachers[id].givenName;
		
		$row = this.$changeTeachersRow.clone();
		$row.find("#chooseTeacherName").html( teacherName ).attr('data-sortvalue', teacherSortName).removeAttr("id");
		this.$changeTeachersTableBody.append($row);
		i++;
	}
	
}

EditSchoolclassesDisplay.prototype.showShowModels = function(json) { // TODO: change function name @Gert
	var modules = json, moduleName;
	this.$changeModulesTableBody.html("");
	
	// No Results
	if ($.isEmptyObject(modules)) {
		$row = this.$changeModulesRow.clone();
		$row.find("#chooseModulesName").html( "Geen modules gekoppeld" ).removeAttr("id");
		this.$changeModulesTableBody.append($row);
		return;
	}
	
	var i = 1;
	for (var id in modules) { // TODO: probably change to array
		//console.log(modules[id]);
		moduleName = modules[id].name;
		$row = this.$changeModulesRow.clone();
		$row.find("#chooseModuleName").html( moduleName ).attr('data-sortvalue', moduleName).removeAttr("id");
		this.$changeModulesTableBody.append($row);
		i++;
	}	
}



EditSchoolclassesDisplay.prototype.setEmptyStudentTableMessage = function (json) {	
   this.$changeStudentsTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
}
EditSchoolclassesDisplay.prototype.etLoadingStudentTableMessage = function (json) {	
   this.$changeStudentsTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}

EditSchoolclassesDisplay.prototype.setEmptyTeacherTableMessage = function (json) {	
   this.$changeTeachersTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
}
EditSchoolclassesDisplay.prototype.setLoadingTeacherTableMessage = function (json) {	
   this.$changeTeachersTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}

EditSchoolclassesDisplay.prototype.setEmptyModulesTableMessage = function (json) {	
   this.$changeModulesTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
}
EditSchoolclassesDisplay.prototype.setLoadingModulesTableMessage = function (json) {	
   this.$changeModulesTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}


/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */

// Edit form 
EditSchoolclassesDisplay.prototype.saveSchoolclass = function() {
	if (this.editSchoolclassForm.elements["useClasskey"].value == 0) this.editSchoolclassForm.elements["classkey"].value = "";
	
	app.getPresenterFactory().getEditSchoolclassPresenter().updateAndRefresh(this.editSchoolclassForm.elements["classname"].value,
																	this.editSchoolclassForm.elements["useClasstree"].value == 1 ? true : false,
																	this.editSchoolclassForm.elements["useClasskey"].value == 1 ? true : false, // TODO: doesnt work
																	this.editSchoolclassForm.elements["classkey"].value);
}
EditSchoolclassesDisplay.prototype.deleteSchoolclass = function() {
	app.getPresenterFactory().getEditSchoolclassPresenter().removeSchoolClass();
}

// Students
EditSchoolclassesDisplay.prototype.showStudentsRequest = function() {
	app.getPresenterFactory().getEditSchoolclassPresenter().showStudents();
}
EditSchoolclassesDisplay.prototype.connectStudents = function() {
	app.getPresenterFactory().getEditSchoolclassPresenter().connectStudents();
}
EditSchoolclassesDisplay.prototype.copyOrMoveStudents = function() {
	app.getPresenterFactory().getEditSchoolclassPresenter().copyOrMoveStudents();	
}

// Teachers
EditSchoolclassesDisplay.prototype.showTeachersRequest = function() {
	app.getPresenterFactory().getEditSchoolclassPresenter().showTeachers();
}
EditSchoolclassesDisplay.prototype.connectTeachers = function() {
	app.getPresenterFactory().getEditSchoolclassPresenter().connectTeachers();
}

// Modules
EditSchoolclassesDisplay.prototype.showModulesRequest = function() {
	app.getPresenterFactory().getEditSchoolclassPresenter().showModules();
}
EditSchoolclassesDisplay.prototype.connectModules = function() {
	app.getPresenterFactory().getEditSchoolclassPresenter().editModules();
}


/*
 * EVENT HANDLERS - Edit Schoolclass
 */
EditSchoolclassesDisplay.prototype.submitEditSchoolclass = function(event) {
	event.preventDefault();	
	this.saveSchoolclass();	
}
EditSchoolclassesDisplay.prototype.clickEditSchoolclassFormSaveButton = function(event) {
	event.preventDefault();		
	this.saveSchoolclass();
}
EditSchoolclassesDisplay.prototype.clickEditSchoolclassFormDeleteButton = function(event) {
	event.preventDefault();		
	this.deleteSchoolclass();
}

/*
 * EVENT HANDLERS - Students
 */
EditSchoolclassesDisplay.prototype.submitChangeStudentsForm = function(event) {
	event.preventDefault();		
}
EditSchoolclassesDisplay.prototype.clickChangeStudentsFormShowButton = function(event) {
	event.preventDefault();		
	this.showStudentsRequest();
}
EditSchoolclassesDisplay.prototype.clickChangeStudentsFormConnectButton = function(event) {
	event.preventDefault();		
	this.connectStudents();
}
EditSchoolclassesDisplay.prototype.clickChangeStudentsFormCopyOrMoveButton = function(event) {
	event.preventDefault();		
	this.copyOrMoveStudents();
}


/*
 * EVENT HANDLERS - Teachers
 */
EditSchoolclassesDisplay.prototype.submitChangeTeachersForm = function(event) {
	event.preventDefault();		
}
EditSchoolclassesDisplay.prototype.clickChangeTeachersFormShowButton = function(event) {
	event.preventDefault();		
	this.showTeachersRequest();
}
EditSchoolclassesDisplay.prototype.clickChangeTeachersFormConnectButton = function(event) {
	event.preventDefault();		
	this.connectTeachers();
}

/*
 * EVENT HANDLERS - Modules
 */
EditSchoolclassesDisplay.prototype.submitChangeModulesForm = function(event) {
	event.preventDefault();		
}
EditSchoolclassesDisplay.prototype.clickChangeModulesFormShowButton = function(event) {
	event.preventDefault();		
	this.showModulesRequest();
}
EditSchoolclassesDisplay.prototype.clickChangeModulesFormConnectButton = function(event) {
	event.preventDefault();		
	this.connectModules();
}


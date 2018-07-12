function CopyOrMoveStudentToSchoolclassDisplay() {	
	// GWT vars
	this.classBSet = false;
	
	// Forms 
	this.classAForm = document.forms["copyOrMoveStudentToSchoolclassClassA"];
	this.classBForm = document.forms["copyOrMoveStudentToSchoolclassClassB"];
	this.classesForm = document.forms["updateSchoolLoginscopyOrMoveStudentToSchoolclassClassBSelect"];
	
	// jQuery objects
	this.$panel = jQuery("#copyOrMoveStudentToSchoolclassDisplay");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	this.classAMoveButton = this.classAForm.elements["move"];
	this.classACopyButton = this.classAForm.elements["copy"];
	
	this.classBMoveButton = this.classBForm.elements["move"];
	this.classBCopyButton = this.classBForm.elements["copy"];
	
	this.classesChooseButton = this.classBForm.elements["choose"];
	
	this.$classAClassName = $("#copyOrMoveStudentToSchoolclassClassAClassname");
	this.$classBClassName = $("#copyOrMoveStudentToSchoolclassClassBClassname");
		
	// Class A elements
	this.$classAForm = $(this.classAForm);
	this.$classAMoveButton = $(this.classAMoveButton);
	this.$classACopyButton = $(this.classACopyButton);
	this.$classARow = this.$classAForm.find("tbody tr").detach();
	this.$classATableBody = this.$classAForm.find("tbody");	
	this.$classATableHead = this.$classAForm.find("thead");	
	
	// Class B elements
	this.$classBForm = $(this.classBForm);
	this.$classBMoveButton = $(this.classBMoveButton);
	this.$classBCopyButton = $(this.classBCopyButton);
	this.$classBRow = this.$classBForm.find("tbody tr").detach();
	this.$classBTableBody = this.$classBForm.find("tbody");	
	this.$classBTableHead = this.$classBForm.find("thead");	
	
	// Classes elements
	this.$classesForm = $(this.classesForm);
	this.$classesChooseButton = $(this.classesChooseButton);	
	this.$classesRow = this.$classesForm.find("tbody tr").detach();
	this.$classesTableBody = this.$classesForm.find("tbody");	
	this.$classesTableHead = this.$classesForm.find("thead");	
			
	// Bind handlers
	this.$classesForm.on('submit', $.proxy(this.submitClassesForm,this));	
	this.$classAForm.on('submit', $.proxy(this.submitOrClickABFormOrButton,this));	
	this.$classBForm.on('submit', $.proxy(this.submitOrClickABFormOrButton,this));	
	this.$classAMoveButton.on('click', $.proxy(this.submitOrClickABFormOrButton,this));	
	this.$classACopyButton.on('click', $.proxy(this.submitOrClickABFormOrButton,this));	
	this.$classBMoveButton.on('click', $.proxy(this.submitOrClickABFormOrButton,this));	
	this.$classBCopyButton.on('click', $.proxy(this.submitOrClickABFormOrButton,this));	
	
	this.$classATableHead.find(".sortButton").click(Helpers.clickSortButton);
	this.$classBTableHead.find(".sortButton").click(Helpers.clickSortButton);
	this.$classesTableHead.find(".sortButton").click(Helpers.clickSortButton);
	
	// Init
	this.$panel.hide();
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.show = function() {
        this.localize();
	this.$panel.show();
	
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.resetSorting = function() {
	this.$classATableHead.find(".sortButton").removeClass("active");
	this.$classBTableHead.find(".sortButton").removeClass("active");
	this.$classesTableHead.find(".sortButton").removeClass("active");
}

/*
 * GUI FUNCTIONS
 */

CopyOrMoveStudentToSchoolclassDisplay.prototype.showStudents = function(json, $tableBody, $templateRow, nameId, changeCallback) {
	var students = json, studentName;
	
	$tableBody.html("");
	
	// No Results
	if ($.isEmptyObject(students)) {
		$tableBody.html('<tr class="empty"><td>Geen leerlingen in deze klas</td></tr>');
		return;
	}
	
	// > 0 results
	var i = 1;
	for (var id in students) { 
		studentName = students[id].givenName + (students[id].insertion ? " "+students[id].insertion : "") + " " + students[id].familyName;
		studentSortName = students[id].familyName + (students[id].insertion ? " "+students[id].insertion : "") + " " + students[id].givenName;
		
		$row = $templateRow.clone();
		$row.find(nameId).html( studentName ).attr('data-sortvalue', studentSortName).removeAttr("id");
		
		
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
			
			// Change ID and label for-attributes
			this.id = this.id + i;				
			oldFor = this.nextElementSibling.getAttribute("for");
			this.nextElementSibling.setAttribute("for", oldFor + i);
		});
		
		$row.find("input[name='students[]']").on('change', $.proxy(changeCallback,this));
		
		$tableBody.append($row);
		i++;
	}
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

CopyOrMoveStudentToSchoolclassDisplay.prototype.clear = function () {
	console.log("clear!");
	this.classAFormToggle(false);
	this.classBFormToggle(false);
	this.$classATableBody.html("");
	this.$classBTableBody.html("");
	this.$classAClassName.val("");
	this.$classBClassName.val("");
	this.resetSorting();
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.init = function () {
	console.log("clear!");
	this.classAFormToggle(false);
	this.classBFormToggle(false);
	this.$classATableBody.html("");
	this.$classBTableBody.html("");
	this.$classAClassName.val("");
	this.$classBClassName.val("");
	app.mainDisplay.registerStretchables( [ this.$classATableBody, this.$classBTableBody, this.$classesTableBody ] );
	this.resetSorting();
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.setHelp = function(url) {
	this.$helpContentIFrame.attr('src', url );
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setSchoolClassA = function(schoolclass) {
	this.$classAClassName.val(schoolclass.schoolClassName);
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setSchoolClassB = function(schoolclass) {
	this.$classBClassName.val(schoolclass.schoolClassName);
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setEmptyTableMessageClasses = function() {
	this.$classesTableBody.html('<tr class="empty"><td><span data-translate="NUM_TBL_EMPTYTABLE">Geen items gevonden</span></td></tr>');
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.setLoadingTableMessageClasses = function() {
	this.$classesTableBody.html('<tr class="empty"><td><span data-translate="NUM_TBL_FETCHINGDATA">Items worden opgevraagd</span></td></tr>');
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setEmptyTableMessageA = function() {
	this.$classATableBody.html('<tr class="empty"><td><span data-translate="NUM_TBL_EMPTYTABLE">Geen items gevonden</span></td></tr>');
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setEmptyTableMessageB = function() {
	this.$classBTableBody.html('<tr class="empty"><td><span data-translate="NUM_TBL_EMPTYTABLE">Geen items gevonden</span></td></tr>');
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setLoadingTableMessageA = function() {
	this.$classATableBody.html('<tr class="empty"><td><span data-translate="NUM_TBL_FETCHINGDATA">Items worden opgevraagd</span></td></tr>');
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setLoadingTableMessageB = function() {
	this.$classBTableBody.html('<tr class="empty"><td><span data-translate="NUM_TBL_FETCHINGDATA">Items worden opgevraagd</span></td></tr>');
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.showStudentsClassA = function(json) {
	this.showStudents(json, this.$classATableBody, this.$classARow, "#updateSchoolLoginscopyOrMoveStudentToSchoolclassClassAStudentName", this.changeSelectACheckbox);
	this.classAFormToggle(false);
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.showStudentsClassB = function(json) {
	this.showStudents(json, this.$classBTableBody, this.$classBRow, "#updateSchoolLoginscopyOrMoveStudentToSchoolclassClassBStudentName", this.changeSelectBCheckbox);
	this.classBSet = true;
	this.classBFormToggle(false);
	this.classAFormToggle(true); // checks only if selected
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setClassList = function(schoolclasses) {		
	this.$classesTableBody.html("");
	
	//for (i = 0; i < this.schoolclasses.length; i++) {
	var i = 1;
	for (var id in schoolclasses) { // TODO: probably change to array
		el = schoolclasses[id];
		//console.log(el); console.log(id);
		$row = this.$classesRow.clone();
		$row.prop('tabindex', i);
		$row.find("#updateSchoolLoginscopyOrMoveStudentToSchoolclassClassBSelectId").val( id ).removeAttr("id");
		$row.find("#updateSchoolLoginscopyOrMoveStudentToSchoolclassClassBSelectClassName").html( el.schoolClassName ).attr('data-sortvalue', el.schoolClassName).removeAttr("id");

		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});

		$row.on('click keypress', $.proxy(this.clickClassesRow, this));
		this.$classesTableBody.append($row);
		i++;
	}
	this.classesFormToggle(false);
}


/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */

CopyOrMoveStudentToSchoolclassDisplay.prototype.setClass = function(classId) {
	app.getPresenterFactory().getCopyOrMoveStudentToSchoolclassPresenter().SelectClassB(classId);
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.copyAtoB = function(list) {
	app.getPresenterFactory().getCopyOrMoveStudentToSchoolclassPresenter().CopyStudentsToClassB(list);
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.moveAtoB = function(list) {
	app.getPresenterFactory().getCopyOrMoveStudentToSchoolclassPresenter().MoveStudentsToClassB(list);
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.copyBtoA = function(list) {
	app.getPresenterFactory().getCopyOrMoveStudentToSchoolclassPresenter().CopyStudentsToClassA(list);
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.moveBtoA = function(list) {
	app.getPresenterFactory().getCopyOrMoveStudentToSchoolclassPresenter().MoveStudentsToClassA(list);
}


/*
 * EVENT HANDLERS - classes
 */

CopyOrMoveStudentToSchoolclassDisplay.prototype.clickClassesRow = function(event) {
	Helpers.selectTableRow(event);
	if (this.classesForm.elements["schoolclass"].value != "") {
		this.setClass(this.classesForm.elements["schoolclass"].value); // bypass submit
		//this.classesFormToggle(true);
	} else this.classesFormToggle(false);	
}

// helpers - bypassed
// CopyOrMoveStudentToSchoolclassDisplay.prototype.classesFormToggle = function(value) {
// 	if (value) this.$classesForm.find(':submit').prop('disabled','');
// 	else this.$classesForm.find(':submit').prop('disabled','disabled');
// }

/*
 * EVENT HANDLERS - class A or B
 */

CopyOrMoveStudentToSchoolclassDisplay.prototype.changeSelectACheckbox = function(event) {
	event.preventDefault();		
	if (event.target.form.elements["students[]"].length > 0) this.classAFormToggle(true);
	else this.classAFormToggle(false);
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.changeSelectBCheckbox = function(event) {
	event.preventDefault();		
	if (event.target.form.elements["students[]"].length > 0) this.classBFormToggle(true);
	else this.classBFormToggle(false);
}

// This thing is bypassed
// CopyOrMoveStudentToSchoolclassDisplay.prototype.submitClassesForm = function(event) {
// 	event.preventDefault();
// 	this.setClass(this.classesForm.elements["schoolclass"].value);
// }

CopyOrMoveStudentToSchoolclassDisplay.prototype.submitOrClickABFormOrButton = function(event) {
	event.preventDefault();		
	if (event.target.form.name == "copyOrMoveStudentToSchoolclassClassA" && event.target.name == "copy") this.copyAtoB( this.getClassList(event.target.form) );
	if (event.target.form.name == "copyOrMoveStudentToSchoolclassClassA" && event.target.name == "move") this.moveAtoB( this.getClassList(event.target.form) );
	if (event.target.form.name == "copyOrMoveStudentToSchoolclassClassB" && event.target.name == "copy") this.copyBtoA( this.getClassList(event.target.form) );
	if (event.target.form.name == "copyOrMoveStudentToSchoolclassClassB" && event.target.name == "move") this.moveBtoA( this.getClassList(event.target.form) );
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.getClassList = function(form) {
	var list = [];
	for (i = 0; i < form.elements["students[]"].length; i++) {
		if (form.elements["students[]"][i].checked) list.push(form.elements["students[]"][i].value);
	}	
	return list;
}

// helpers
CopyOrMoveStudentToSchoolclassDisplay.prototype.classAFormToggle = function(value) {
	var aChecked = false;
	if (!this.classAForm.elements["students[]"]) return;
	for (i = 0; i <  this.classAForm.elements["students[]"].length; i++) {
		if (this.classAForm.elements["students[]"][i].checked) { 
			aChecked = true 
			break; 
		}
	}
	if (this.classBSet && aChecked && value) this.$classAForm.find(':submit, :button').prop('disabled','');
	else this.$classAForm.find(':submit, :button').prop('disabled','disabled');
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.classBFormToggle = function(value) {
	if (value) this.$classBForm.find(':submit, :button').prop('disabled','');
	else this.$classBForm.find(':submit, :button').prop('disabled','disabled');
}



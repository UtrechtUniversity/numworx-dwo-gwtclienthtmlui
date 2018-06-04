function CopyOrMoveStudentToSchoolclassDisplay() {	
	// GWT vars
	
	
	// Forms 
	this.classAForm = document.forms["copyOrMoveStudentToSchoolclassClassA"];
	this.classBForm = document.forms["copyOrMoveStudentToSchoolclassClassB"];
	this.classesForm = document.forms["updateSchoolLoginscopyOrMoveStudentToSchoolclassClassBSelect"];
		
	
	// Buttons 
	
	// jQuery objects
	this.$panel = jQuery("#copyOrMoveStudentToSchoolclassDisplay");
	
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
	
	// Class B elements
	this.$classBForm = $(this.classBForm);
	this.$classBMoveButton = $(this.classBMoveButton);
	this.$classBCopyButton = $(this.classBCopyButton);
	this.$classBRow = this.$classBForm.find("tbody tr").detach();
	this.$classBTableBody = this.$classBForm.find("tbody");	
	
	// Classes elements
	this.$classesForm = $(this.classesForm);
	this.$classesChooseButton = $(this.classesChooseButton);	
	this.$classesRow = this.$classesForm.find("tbody tr").detach();
	this.$classesTableBody = this.$classesForm.find("tbody");	
			
	// Bind handlers
	this.$classesForm.on('submit', $.proxy(this.submitClassesForm,this));	
	
	// Init
	this.$panel.hide();
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.show = function() {
	this.$panel.show();
	Helpers.stretchHeight( [ this.$classATableBody, this.$classBTableBody, this.$classesTableBody ]);
}

/*
 * GUI FUNCTIONS
 */

CopyOrMoveStudentToSchoolclassDisplay.prototype.showStudents = function(json, $tableBody, $templateRow, nameId) {
	console.log("show!");
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
		$row = $templateRow.clone();
		$row.find(nameId).html( studentName ).removeAttr("id");
		
		
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
			
			// Change ID and label for-attributes
			this.id = this.id + i;				
			oldFor = this.nextElementSibling.getAttribute("for");
			this.nextElementSibling.setAttribute("for", oldFor + i);
		});
		
		$tableBody.append($row);
		i++;
	}
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

CopyOrMoveStudentToSchoolclassDisplay.prototype.clear = function () {
	console.log("clear");
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.init = function () {
	console.log("init");
	Helpers.stretchHeight([ this.$addStudentTableBody ]);
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setSchoolClassA = function(schoolclass) {
	console.log("setSchoolClass");
	console.log(schoolclass);
	this.$classAClassName.value(schoolclass)
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setSchoolClassB = function(schoolclass) {
	console.log("setSchoolClass");
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setEmptyTableMessageClasses = function() {
	console.log("empty table classes");
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.setLoadingTableMessageClasses = function() {
	console.log("loading table classes");
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setEmptyTableMessageA = function() {
	console.log("empty table A");
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setEmptyTableMessageB = function() {
	console.log("empty table B");
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setLoadingTableMessageA = function() {
	console.log("loading table A");
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setLoadingTableMessageB = function() {
	console.log("loading table B");
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.showStudentsClassA = function(json) {
	this.showStudents(json, this.$classATableBody, this.$classARow, "#updateSchoolLoginscopyOrMoveStudentToSchoolclassClassAStudentName");
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.showStudentsClassB = function(json) {
	this.showStudents(json, this.$classBTableBody, this.$classBRow, "#updateSchoolLoginscopyOrMoveStudentToSchoolclassClassBStudentName");
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setClassList = function(schoolclasses) {
	console.log(schoolclasses);
		
	this.$classesTableBody.html("");
	
	//for (i = 0; i < this.schoolclasses.length; i++) {
	var i = 1;
	for (var id in schoolclasses) { // TODO: probably change to array
		el = schoolclasses[id];
		//console.log(el); console.log(id);
		$row = this.$classesRow.clone();
		$row.prop('tabindex', i);
		$row.find("#updateSchoolLoginscopyOrMoveStudentToSchoolclassClassBSelectId").val( id ).removeAttr("id");
		$row.find("#updateSchoolLoginscopyOrMoveStudentToSchoolclassClassBSelectClassName").html( el.schoolClassName ).removeAttr("id");

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
	console.log("set class!");
	console.log(classId);
	app.getPresenterFactory().getCopyOrMoveStudentToSchoolclassPresenter().SelectClassB(classId);
}


/*
 * EVENT HANDLERS 
 */

CopyOrMoveStudentToSchoolclassDisplay.prototype.clickClassesRow = function(event) {
	Helpers.selectTableRow(event);
	if (this.classesForm.elements["schoolclass"].value != "") this.classesFormToggle(true);
	else this.classesFormToggle(false);	
}

// helpers
CopyOrMoveStudentToSchoolclassDisplay.prototype.classesFormToggle = function(value) {
	if (value) this.$classesForm.find(':submit').prop('disabled','');
	else this.$classesForm.find(':submit').prop('disabled','disabled');
}


CopyOrMoveStudentToSchoolclassDisplay.prototype.submitClassesForm = function(event) {
	console.log("submit classesform!")
	event.preventDefault();		
	console.log(this.classesForm.elements["schoolclass"].value);
	this.setClass(this.classesForm.elements["schoolclass"].value);
}


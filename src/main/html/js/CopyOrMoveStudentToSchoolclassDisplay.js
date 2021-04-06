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
	this.$classASelectAll = $("#copyOrMoveStudentToSchoolclassClassASelectAll");
	
	// Class B elements
	this.$classBForm = $(this.classBForm);
	this.$classBMoveButton = $(this.classBMoveButton);
	this.$classBCopyButton = $(this.classBCopyButton);
	this.$classBRow = this.$classBForm.find("tbody tr").detach();
	this.$classBTableBody = this.$classBForm.find("tbody");	
	this.$classBTableHead = this.$classBForm.find("thead");	
	this.$classBSelectAll = $("#copyOrMoveStudentToSchoolclassClassBSelectAll");
	
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
	
	this.$classASelectAll.on('click', $.proxy(this.clickClassASelectAll, this));
	this.$classBSelectAll.on('click', $.proxy(this.clickClassBSelectAll, this));	
	
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
	console.log(students);
	// No Results
	if ($.isEmptyObject(students)) {
		$tableBody.html('<tr class="empty"><td>Geen studenten in deze klas</td></tr>');
		return;
	}
	
	// > 0 results
	var i = 1;
	for (var id in students) { 
		studentName = students[id].givenName + (students[id].insertion ? " "+students[id].insertion : "") + " " + students[id].familyName;
		studentSortName = students[id].familyName + " " + students[id].givenName + (students[id].insertion ? " "+students[id].insertion : "");
		
		$row = $templateRow.clone();
		$row.find(nameId).html( Helpers.htmlEscape(studentName) ).attr('data-sortvalue', studentSortName).removeAttr("id");
		
		
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
	this.classAFormToggle();
	this.classBFormToggle();
	this.$classATableBody.html("");
	this.$classBTableBody.html("");
	this.$classAClassName.val("");
	this.$classBClassName.val("");
	this.classBSet = false;
	this.resetSorting();
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.init = function () {
	this.classAFormToggle();
	this.classBFormToggle();
	this.$classATableBody.html("");
	this.$classBTableBody.html("");
	this.$classAClassName.val("");
	this.$classBClassName.val("");
	this.classBSet = false;
	app.mainDisplay.registerStretchables( [ this.$classATableBody, this.$classBTableBody, this.$classesTableBody ] );
	this.resetSorting();
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.setHelp = function(url) {
		if (this.$helpContentIFrame.attr('src') != url) this.$helpContentIFrame.attr('src', url );
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setSchoolClassA = function(schoolclass) {
	this.$classAClassName.val(schoolclass.schoolClassName);
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setSchoolClassB = function(schoolclass) {
	this.$classBClassName.val(schoolclass.schoolClassName);
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setEmptyTableMessageClasses = function() {
	this.$classesTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.setLoadingTableMessageClasses = function() {
	this.$classesTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setEmptyTableMessageA = function() {
	this.$classATableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	;
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setEmptyTableMessageB = function() {
	this.$classBTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	;
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setLoadingTableMessageA = function() {
	this.$classATableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.setLoadingTableMessageB = function() {
	this.$classBTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.showStudentsClassA = function(json) {
	this.showStudents(json, this.$classATableBody, this.$classARow, "#updateSchoolLoginscopyOrMoveStudentToSchoolclassClassAStudentName", this.changeSelectACheckbox);
	this.$classATableHead.find(".sortButton.default").trigger('click');
	this.classAFormToggle();
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.showStudentsClassB = function(json) {
	this.showStudents(json, this.$classBTableBody, this.$classBRow, "#updateSchoolLoginscopyOrMoveStudentToSchoolclassClassBStudentName", this.changeSelectBCheckbox);
	this.classBSet = true;
	this.classBFormToggle();
	this.classAFormToggle();
	this.$classBTableHead.find(".sortButton.default").trigger('click'); 
//	this.resetSorting();
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
		$row.find("#updateSchoolLoginscopyOrMoveStudentToSchoolclassClassBSelectClassName").html( Helpers.htmlEscape(el.schoolClassName) ).attr('data-sortvalue', el.schoolClassName).removeAttr("id");

		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});

		$row.on('click keypress', $.proxy(this.clickClassesRow, this));
		this.$classesTableBody.append($row);
		i++;
	}
	
	this.$classesTableHead.find(".sortButton.default").trigger('click');
	//this.classesFormToggle(false);
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
//	console.log($(event.target).closest("tr"));
	if ($(event.target).closest("tr").find("input").get(0).checked == true) return;
	
	Helpers.selectTableRow(event);
	
//	for (var i = 0; i < this.classesForm.elements["schoolclass"].length; i++) 
//		if (this.classesForm.elements["schoolclass"][i].checked) break;
//	
//	this.setClass(this.classesForm.elements["schoolclass"][i].value); // bypass submit
	var value = $(event.target).closest("tr").find("input").get(0).value;
	this.setClass(value);
	this.classAFormToggle();
	this.classBFormToggle();
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
	this.classAFormToggle();
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.changeSelectBCheckbox = function(event) {
	event.preventDefault();		
	this.classBFormToggle();	
}

CopyOrMoveStudentToSchoolclassDisplay.prototype.clickClassASelectAll = function(event) {
	event.preventDefault();		
	if (typeof this.classAForm.elements["students[]"] == 'undefined') return;	
	
	$el = $(event.target);
	
	if ($el.hasClass('active')) {
		if (typeof this.classAForm.elements["students[]"].length == 'undefined') {
			this.classAForm.elements["students[]"].checked = false;			
		} else {
			for (var i = 0; i < this.classAForm.elements["students[]"].length; i++) {
				this.classAForm.elements["students[]"][i].checked = false;
			}
		}
		$el.removeClass("active");
	} else {
		if (typeof this.classAForm.elements["students[]"].length == 'undefined') {
			this.classAForm.elements["students[]"].checked = true;
		} else {
			for (var i = 0; i < this.classAForm.elements["students[]"].length; i++) {
				this.classAForm.elements["students[]"][i].checked = true;
			}
		}
		$el.addClass("active");
	}
	
	this.classAFormToggle();
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.clickClassBSelectAll = function(event) {
	event.preventDefault();		
	if (typeof this.classBForm.elements["students[]"] == 'undefined') return;	
	
	$el = $(event.target);
	
	if ($el.hasClass('active')) {
		if (typeof this.classBForm.elements["students[]"].length == 'undefined') {
			this.classBForm.elements["students[]"].checked = false;			
		} else {
			for (var i = 0; i < this.classBForm.elements["students[]"].length; i++) {
				this.classBForm.elements["students[]"][i].checked = false;
			}
		}
		$el.removeClass("active");
	} else {
		if (typeof this.classBForm.elements["students[]"].length == 'undefined') {
			this.classBForm.elements["students[]"].checked = true;
		} else {
			for (var i = 0; i < this.classBForm.elements["students[]"].length; i++) {
				this.classBForm.elements["students[]"][i].checked = true;
			}
		}
		$el.addClass("active");
	}	
	
	this.classBFormToggle();
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
	if ( typeof form.elements["students[]"].length == "undefined" ) {
		list.push(form.elements["students[]"].value);
	} else {
	for (i = 0; i < form.elements["students[]"].length; i++) {
		if (form.elements["students[]"][i].checked) list.push(form.elements["students[]"][i].value);
	}	
	}
	return list;
}

// helpers
CopyOrMoveStudentToSchoolclassDisplay.prototype.classAFormToggle = function() {
	
	var studentChosen = false;
	
	if (typeof this.classAForm.elements["students[]"] == 'undefined') {
		studentChosen = false;
	} else if (typeof this.classAForm.elements["students[]"].length == 'undefined') {
		studentChosen = this.classAForm.elements["students[]"].checked;
	} else {
		for (i = 0; i <  this.classAForm.elements["students[]"].length; i++) {
			if (this.classAForm.elements["students[]"][i].checked) { 
				studentChosen = true 
				break; 
			}
		}
	}
	
	if (this.classBSet && studentChosen) this.$classAForm.find(':submit, :button').prop('disabled','');
	else this.$classAForm.find(':submit, :button').prop('disabled','disabled');
}
CopyOrMoveStudentToSchoolclassDisplay.prototype.classBFormToggle = function() {
	
	var studentChosen = false;
	
	if (typeof this.classBForm.elements["students[]"] == 'undefined') {
		studentChosen = false;
	} else if (typeof this.classBForm.elements["students[]"].length == 'undefined') {
		studentChosen = this.classBForm.elements["students[]"].checked;
	} else {
		for (i = 0; i <  this.classBForm.elements["students[]"].length; i++) {
			if (this.classBForm.elements["students[]"][i].checked) { 
				studentChosen = true 
				break; 
			}
		}
	}
	
	if (this.classBSet && studentChosen) this.$classBForm.find(':submit, :button').prop('disabled','');
	else this.$classBForm.find(':submit, :button').prop('disabled','disabled');
}



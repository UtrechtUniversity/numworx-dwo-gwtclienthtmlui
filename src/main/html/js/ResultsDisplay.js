function ResultsDisplay() {	
	this.resultState = {};
	this.resultState.resultTree = null;
	this.resultState.studentsTree = null;
	this.resultState.showOpenModules = false;
	this.resultState.showClosedModules = false;
	this.resultState.activeSchoolClass = null;
	this.resultState.activeCourses = false;
	
	// Forms 
	this.chooseClassModuleForm = document.forms["chooseClassAndModules"];
	
	// Buttons 
	
	// jQuery objects
	this.$panel = jQuery("#resultsDisplay");
	
	this.$chooseClassModuleForm = $(this.chooseClassModuleForm);	
	
	this.$chooseClassRow = this.$chooseClassModuleForm.find("#resultsDisplayChooseClass tbody tr").detach();
	this.$chooseClassTableBody = this.$chooseClassModuleForm.find("#resultsDisplayChooseClass tbody");
	
	this.$chooseModulesRow = this.$chooseClassModuleForm.find("#resultsDisplayChooseModules tbody tr").detach();
	this.$chooseModulesTableBody = this.$chooseClassModuleForm.find("#resultsDisplayChooseModules tbody");
		
	// Bind handlers
	this.$chooseClassModuleForm.on('submit', $.proxy(this.submitChooseClassModuleForm,this));
	
	// Init
	this.$panel.hide();
}

ResultsDisplay.prototype.show = function() {
	this.$panel.show();
	this.chooseClassModuleFormToggle();
	Helpers.stretchHeight( [ this.$chooseClassTableBody, this.$chooseModulesTableBody  ] )
}

/*
 * GUI FUNCTIONS
 */

ResultsDisplay.prototype.setChooseClassTable = function() {
	var i = 0;
	
	this.$chooseClassTableBody.html("");
	
	for (var id in this.resultState.resultTree.children) {
		$row = this.$chooseClassRow.clone();
		$row.find("#chooseClassAndModulesClassname").html( this.resultState.resultTree.children[id].label ).removeAttr("id");
		
		$row.find("input[type='checkbox'],input[type='radio']").each( function(index, el) {
			el.value = id;
			
			// Change ID and label for-attributes
			this.id = this.id + i;				
			oldFor = this.nextElementSibling.getAttribute("for");
			this.nextElementSibling.setAttribute("for", oldFor + i);
		});
		
		$row.find("input[name='open[]']").on('change', $.proxy(this.changeCheckboxOpenClosed,this));
		$row.find("input[name='closed[]']").on('change', $.proxy(this.changeCheckboxOpenClosed,this));
		
		this.$chooseClassTableBody.append($row);
		i++;
	}	
	
	this.$chooseModulesTableBody.html("");
}

ResultsDisplay.prototype.setChooseModulesTable = function() {
	//console.log(this.activeClass);
	//console.log(this.resultState.resultTree.children[ this.activeClass ]); 
	
	var i = 0, course;
	
	this.$chooseModulesTableBody.html("");
	

	for (var id in this.resultState.resultTree.children[ this.resultState.activeSchoolClass ].children) { // loop over modules
		course = this.resultState.resultTree.children[ this.resultState.activeSchoolClass ].children[id];

		$row = this.$chooseModulesRow.clone();
	
		$row.find("#chooseClassAndModulesModuleName").html( course.label ).removeAttr("id");
	
		$row.find("input[type='checkbox'],input[type='radio']").each( function(index, el) {
			el.value = id;
		
			// Change ID and label for-attributes
			this.id = this.id + i;				
			oldFor = this.nextElementSibling.getAttribute("for");
			this.nextElementSibling.setAttribute("for", oldFor + i);
		});
	
		$row.find("input[name='select[]']").on('change', $.proxy(this.changeCheckboxSelect,this));
	
		this.$chooseModulesTableBody.append($row);
		i++;
	}
	
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

ResultsDisplay.prototype.clear = function () {
	console.log("clear");
	if (this.chooseClassModuleForm.elements['open']) {
		for (var i = 0; i < this.chooseClassModuleForm.elements['open'].length; i++) this.chooseClassModuleForm.elements['open'][i].checked = false;
	}
	if (this.chooseClassModuleForm.elements['closed']) {
		for (var i = 0; i < this.chooseClassModuleForm.elements['closed'].length; i++) this.chooseClassModuleForm.elements['closed'][i].checked = false;
	}
	if (this.chooseClassModuleForm.elements['select[]']) {
		for (var i = 0; i < this.chooseClassModuleForm.elements['select[]'].length; i++) this.chooseClassModuleForm.elements['select[]'][i].checked = false;
	}
	this.chooseClassModuleFormToggle();
}

ResultsDisplay.prototype.setResultTree = function (resultTree, studentsTree) {
	this.resultState.resultTree = resultTree;
	this.resultState.studentsTree = studentsTree;	
	this.setChooseClassTable();
}

ResultsDisplay.prototype.setEmptyTableMessage = function () {
	console.log("setEmptyTableMessage");
}
ResultsDisplay.prototype.setLoadingTableMessage = function () {
	console.log("setLoadingTableMessage");
}

// ResultsDisplay.prototype.setEmptyTableMessageModules = function () {
// 	console.log("setEmptyTableMessageModules");
// }
// ResultsDisplay.prototype.setLoadingTableMessageModules = function () {
// 	console.log("setLoadingTableMessageModules");
// }
// ResultsDisplay.prototype.setEmptyTableMessageSelected = function () {
// 	console.log("setEmptyTableMessageSelected");
// }
// ResultsDisplay.prototype.setLoadingTableMessageSelected = function () {
// 	console.log("setLoadingTableMessageSelected");
// }


/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */

ResultsDisplay.prototype.showSelectedResults = function() {	
	app.getPresenterFactory().getResultsPresenter().showSelectedResults( this.resultState );
}


/*
 * EVENT HANDLERS
 */

ResultsDisplay.prototype.changeCheckboxOpenClosed = function(event) {		
	if (event.target.checked) {
		this.uncheckCheckboxOpenClosed();
		event.target.checked = "checked";
		
		this.resultState.showOpenModules = false;
		this.resultState.showClosedModules = false;
		if (event.target.name=="open[]") this.resultState.showOpenModules = true;
		if (event.target.name=="closed[]") this.resultState.showClosedModules = true;		
		
		this.resultState.activeSchoolClass = event.target.value;
	} else {
		this.resultState.activeSchoolClass = null;
	}		
	
	this.setChooseModulesTable();	
}
ResultsDisplay.prototype.uncheckCheckboxOpenClosed = function() {
	for (i = 0; i < this.chooseClassModuleForm.elements.length; i++) {
		if ( (this.chooseClassModuleForm.elements[i].name == "open[]" || this.chooseClassModuleForm.elements[i].name == "closed[]")
			&& !this.chooseClassModuleForm.elements[i].disabled) this.chooseClassModuleForm.elements[i].checked = "";
	}
}

ResultsDisplay.prototype.changeCheckboxSelect = function(event) {
	console.log(this.chooseClassModuleForm.elements["select[]"].length);
	this.resultState.activeCourses = [];
	
	if (!this.chooseClassModuleForm.elements["select[]"].length) {
		if (this.chooseClassModuleForm.elements["select[]"].checked)  this.resultState.activeCourses.push(this.chooseClassModuleForm.elements["select[]"].value);
	} else {
		for (var i=0 ; i < this.chooseClassModuleForm.elements["select[]"].length; i++) {
			console.log(this.chooseClassModuleForm.elements["select[]"][i]);
			if (this.chooseClassModuleForm.elements["select[]"][i].checked)  this.resultState.activeCourses.push(this.chooseClassModuleForm.elements["select[]"][i].value);
		}
	}
		
	this.chooseClassModuleFormToggle();
}

ResultsDisplay.prototype.submitChooseClassModuleForm = function() {
	event.preventDefault();
	if (this.resultState.activeCourses.length > 0) this.showSelectedResults();	
}

//helpers 
ResultsDisplay.prototype.chooseClassModuleFormToggle = function() {
	console.log("TOGGLE");
	if ( this.resultState.activeCourses.length > 0 ) this.$chooseClassModuleForm.find(':submit').prop('disabled','');
	else this.$chooseClassModuleForm.find(':submit').prop('disabled','disabled');
}


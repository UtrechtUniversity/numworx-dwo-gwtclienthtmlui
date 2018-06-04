function ResultsDisplay() {	
	// GWT vars
	this.resultTree = null;
	
	// Return values
	this.activeClass = null;
	this.showOpenModules = false;
	this.showClosedModules = false;
	this.courseIds = [];
	
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
}

/*
 * GUI FUNCTIONS
 */

ResultsDisplay.prototype.setChooseClassTable = function() {
	var i = 0;
	
	this.$chooseClassTableBody.html("");
	
	for (var id in this.resultTree.children) {
		$row = this.$chooseClassRow.clone();
		$row.find("#chooseClassAndModulesClassname").html( this.resultTree.children[id].label ).removeAttr("id");
		
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
}

ResultsDisplay.prototype.setChooseModulesTable = function() {
	//console.log(this.activeClass);
	//console.log(this.resultTree.children[ this.activeClass ]); 
	
	var i = 0, course;
	
	this.$chooseModulesTableBody.html("");
	

	for (var id in this.resultTree.children[ this.activeClass ].children) { // loop over modules
		course = this.resultTree.children[ this.activeClass ].children[id];

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
	//console.log("clear");
	this.chooseClassModuleFormToggle();
}

// ResultsDisplay.prototype.init = function () {
// 	console.log("init");
// 	this.chooseClassModuleFormToggle();
// }

// ResultsDisplay.prototype.plot = function () {
// 	console.log("PLOT");
// }

ResultsDisplay.prototype.setResultTree = function (json) {
	//console.log("setTree results");
	//console.log(json)
	
	this.resultTree = json.jsObject;
	
	this.setChooseClassTable();
}

ResultsDisplay.prototype.setEmptyTableMessageModules = function () {
	//console.log("setEmptyTableMessageModules");
}
ResultsDisplay.prototype.setLoadingTableMessageModules = function () {
	//console.log("setLoadingTableMessageModules");
}
ResultsDisplay.prototype.setEmptyTableMessageSelected = function () {
	//console.log("setEmptyTableMessageSelected");
}
ResultsDisplay.prototype.setLoadingTableMessageSelected = function () {
	//console.log("setLoadingTableMessageSelected");
}


/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */

ResultsDisplay.prototype.showSelectedResults = function() {
	//String schoolClassId, boolean showOpenModules, boolean showClosedModules, JSONObject courseIds	
	
	//console.log(this.activeClass);
	//console.log(this.showOpenModules);
	//console.log(this.showClosedModules);
	//console.log(this.courseIds);
	
	app.getPresenterFactory().getResultsPresenter().showSelectedResults(
		this.activeClass,
		this.showOpenModules,
		this.showClosedModules,
		this.courseIds
	)
}


/*
 * EVENT HANDLERS
 */

ResultsDisplay.prototype.changeCheckboxOpenClosed = function(event) {		
	if (event.target.checked) {
		this.uncheckCheckboxOpenClosed();
		event.target.checked = "checked";
		
		this.showOpenModules = false;
		this.showClosedModules = false;
		if (event.target.name=="open[]") this.showOpenModules = true;
		if (event.target.name=="closed[]") this.showClosedModules = true;		
		
		this.activeClass = event.target.value;
	} else {
		this.activeClass = null;
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
	this.courseIds = [];
	
	for (i=0 ; i < this.chooseClassModuleForm.elements["select[]"].length ; i++) {
		if (this.chooseClassModuleForm.elements["select[]"][i].checked)  this.courseIds.push(this.chooseClassModuleForm.elements["select[]"][i].value);
	}
		
	this.chooseClassModuleFormToggle();
}

ResultsDisplay.prototype.submitChooseClassModuleForm = function() {
	event.preventDefault();
	if (this.courseIds.length > 0) this.showSelectedResults();	
}

//helpers 
ResultsDisplay.prototype.chooseClassModuleFormToggle = function() {
	//console.log("TOGGLE");
	if ( this.courseIds.length > 0 ) this.$chooseClassModuleForm.find(':submit').prop('disabled','');
	else this.$chooseClassModuleForm.find(':submit').prop('disabled','disabled');
}


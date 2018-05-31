function ResultsDisplay() {	
	// GWT vars
	this.resultTree = null;
	this.activeClass = [];
	//this.activeClassClosed = [];
	
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
	
	// Init
	this.$panel.hide();
}

ResultsDisplay.prototype.show = function() {
	this.$panel.show();
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
		//$row.find("input[name='closed[]']").on('change', $.proxy(this.changeCheckboxOpenClosed,this));
		
		this.$chooseClassTableBody.append($row);
		i++;
	}	
}

ResultsDisplay.prototype.setChooseModulesTable = function() {
	console.log(this.activeClass);
//	console.log(this.activeClassClosed);
	
	var i = 0;
	
	this.$chooseModulesTableBody.html("");
	
	for (classId in this.activeClass) {	 // Loop over classes
		for (var id in this.activeClass[classId].children) { // loop over modules

			$row = this.$chooseModulesRow.clone();
		
			$row.find("#chooseClassAndModulesModuleName").html( this.activeClass[classId].children[id].label ).removeAttr("id");
		
			$row.find("input[type='checkbox'],input[type='radio']").each( function(index, el) {
				el.value = id;
			
				// Change ID and label for-attributes
				this.id = this.id + i;				
				oldFor = this.nextElementSibling.getAttribute("for");
				this.nextElementSibling.setAttribute("for", oldFor + i);
			});
		
			//$row.find("input[name='select[]']").on('change', $.proxy(this.changeCheckboxOpenClosed,this));
		
			this.$chooseModulesTableBody.append($row);
			i++;
		}	
	}
	
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

ResultsDisplay.prototype.clear = function () {
	console.log("clear");
}

ResultsDisplay.prototype.init = function () {
	console.log("init");
}

ResultsDisplay.prototype.plot = function () {
	console.log("PLOT");
}

ResultsDisplay.prototype.setResultTree = function (json) {
	console.log("setTree results");
	console.log(json)
	
	this.resultTree = json.jsObject;
	
	this.setChooseClassTable();
	
	
	
	
}

ResultsDisplay.prototype.setEmptyTableMessageModules = function () {
	console.log("setEmptyTableMessageModules");
}
ResultsDisplay.prototype.setLoadingTableMessageModules = function () {
	console.log("setLoadingTableMessageModules");
}
ResultsDisplay.prototype.setEmptyTableMessageSelected = function () {
	console.log("setEmptyTableMessageSelected");
}
ResultsDisplay.prototype.setLoadingTableMessageSelected = function () {
	console.log("setLoadingTableMessageSelected");
}


/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */


/*
 * EVENT HANDLERS
 */

ResultsDisplay.prototype.changeCheckboxOpenClosed = function(event) {	
	//if (event.target.name == "open[]") {
		if (event.target.checked) this.activeClass[ event.target.value ] = this.resultTree.children[ event.target.value ];
		else delete this.activeClass[ event.target.value ];
		//}
	// if (event.target.name == "closed[]") {
	// 	if (event.target.checked) this.activeClassClosed[ event.target.value ] = this.resultTree.children[ event.target.value ];
	// 	else delete this.activeClassClosed[ event.target.value ];
	// }
	
	this.setChooseModulesTable();	
}

function SelectedResultsDisplay() {		
	this.resultState = null;
	this.studentsTree = null;
	
	// Buttons 
	
	// jQuery objects
	this.$panel = jQuery("#selectedResultsDisplay");
	
	this.$selectResultsTableWrap = $("#selectedResultsTableWrap");
	
	
	//this.$selectedResultsTableBody = this.$selectedResultsTable.find("tbody");	
	//this.$selectedResultsTableHead = this.$selectedResultsTable.find("thead");	
	this.$selectedResultsTable = $("#selectedResultsTable").detach();	
	this.$selectedResultsColumnHeaderName = this.$selectedResultsTable.find("#selectedResultsTableRepeatableColumnHeaderName").detach();	
	this.$selectedResultsColumnHeaderSorting = this.$selectedResultsTable.find("#selectedResultsTableRepeatableColumnHeaderSorting").detach();	
	
	
	this.$selectedResultsRowHeader = this.$selectedResultsTable.find("#selectedResultsTableRowHeader").detach();
	this.$selectedResultsRowCell = this.$selectedResultsTable.find("#selectedResultsTableRepeatableCell").detach();
	this.$selectedResultsRow = this.$selectedResultsTable.find("tbody tr").detach();
	
	
	// Bind handlers
	
	
	// Init
	this.$panel.hide();
}

SelectedResultsDisplay.prototype.show = function() {
	this.$panel.show();	
}

/*
 * GUI FUNCTIONS
 */

SelectedResultsDisplay.prototype.plotMatrix = function (matrix) {
	console.log("PLOT!");
	console.log(matrix);
	var $table = this.$selectedResultsTable.clone(),
		$tbody = $table.find('tbody');
		$theadRow2 = $table.find('thead tr:nth-child(2)'),
		$theadRow3 = $table.find('thead tr:nth-child(3)'),
		$tableRowHeader = null, 
		$row = null,
		$rowCell = null,
		$value = null;
	
	for (var i = 1; i < matrix[0].length; i++) {
		$headerName = this.$selectedResultsColumnHeaderName.clone();
		$headerName.html("<span>" + matrix[0][i].label + "</span>");
		$theadRow2.append($headerName);
	}
	
	for (var i = 1; i < matrix.length; i++) {
		
		$row = this.$selectedResultsRow.clone();
		
		$tableRowHeader = this.$selectedResultsRowHeader.clone();
		console.log($tableRowHeader);
		$tableRowHeader.html("");
		$tableRowHeader.append("<span>" + matrix[i][0].label + "</span>");
		$row.append($tableRowHeader);
		
		for (var j = 1; j < matrix[i].length; j++) {
			$rowCell = this.$selectedResultsRowCell.clone();
			$rowCell.html("");
			$value = $("<a class=\"resultIndicator\">" + matrix[i][j].label +"</a>");
			$value.attr("data-score", matrix[i][j].label );
			$rowCell.append($value);
			$row.append($rowCell);
		} 		
		$tbody.append($row);
	}
	
	this.$selectResultsTableWrap.html("");
	this.$selectResultsTableWrap.append($table);
	
}

SelectedResultsDisplay.prototype.buildMatrixModulesStudentsForClass = function() {
	var matrix = [], i = 1, j = 1;
	students = this.resultState.studentsTree.children[ this.resultState.activeSchoolClass ].children; //should be children
	modules = this.resultState.resultTree.children[ this.resultState.activeSchoolClass ].children;
	activeModules = this.resultState.activeCourses;
	
	matrix[0] = [];
	matrix[0][0] = "colsname";
	
	
	for (var amId in activeModules) {
		matrix[0][j] = {};
		matrix[0][j].label = modules[ activeModules[amId] ].label;
		j++;
	}
	
	for (var studentId in students) {
		matrix[i] = [];
		matrix[i][0] = {};
		matrix[i][0].label = students[studentId].givenName + " " + (students[studentId].insertion ? students[studentId].insertion+" ":"")  + students[studentId].familyName;
		
		j = 1;
		for (var amId in activeModules) {
			matrix[i][j] = {};
			matrix[i][j].label = this.computeModuleScoreForStudent(modules[ activeModules[amId] ], studentId);
			j++;
		}	
		i++;	
	}
	
	return matrix;
	//resultState.studentsTree.schoolclasses[ resultState.activeSchoolClass ].children // students
}
SelectedResultsDisplay.prototype.computeModuleScoreForStudent = function(module, studentId) {
	var total = 0, totalCount = 0;
	console.log("score berekenen voor: "+studentId)
	console.log(module);
	for (var id in module.children) {
		if (module.children[id].children) {
			console.log("loop over activiteiten")
			for (var scoId in module.children[id].children) {
				console.log(module.children[id].children[scoId]);
				if (module.children[id].children[scoId]["user-id"] == studentId) {
					console.log(module.children[id].children[scoId]);
					total += parseInt(module.children[id].children[scoId].sumScore);
				}	
			}
		}
		totalCount++;
	}
	return Math.round(total / totalCount);
}



/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

SelectedResultsDisplay.prototype.clear = function () {
	console.log("clear");	
}

SelectedResultsDisplay.prototype.init = function(resultState) {
	console.log("init");
	console.log(resultState);
	this.resultState = resultState;
	var matrix = this.buildMatrixModulesStudentsForClass();
	this.plotMatrix(matrix);
}

SelectedResultsDisplay.prototype.updateResultTree = function (resultsTree, studentsTree) {
	this.resultState.resultsTree = resultsTree;
	this.resultState.studentsTree = studentsTree;
}

/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */



/*
 * EVENT HANDLERS
 */



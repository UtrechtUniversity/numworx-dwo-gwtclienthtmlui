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
	
	// BUILD HEADER
	for (var i = 1; i < matrix[0].length; i++) {
				// Header names
		$headerName = this.$selectedResultsColumnHeaderName.clone();
		$value = $("<span>" + matrix[0][i].label + "</span>");
		$headerName.html("").append($value);		
		if (matrix[0][i].callback) {
			$value.on('click', $.proxy(matrix[0][i].callback, this));
		}
		if (matrix[0][i].linkLabel && matrix[0][i].linkCallback) {
			$link = $('<a href="javascript:void(0);">'+matrix[0][i].linkLabel+'</a>');
			$value.append($link);
			$link.on('click', $.proxy(matrix[0][i].linkCallback, this));
		}
		$value.hover($.proxy(this.hoverColumnHeader, this));		
		$theadRow2.append($headerName);
		
		// Sort buttons
		$headerSorting = this.$selectedResultsColumnHeaderSorting.clone();
		$theadRow3.append($headerSorting);		
		$theadRow3.find(".sortButton").click(Helpers.clickSortButton);
	}
	
	// BUILD BODY
	for (var i = 1; i < matrix.length; i++) {
		
		$row = this.$selectedResultsRow.clone();
		
		// row first column
		$tableRowHeader = this.$selectedResultsRowHeader.clone();
		$tableRowHeader.html("");
		$value = $("<span>" + matrix[i][0].label + "</span>");
		$value.attr("data-sortvalue", matrix[i][0].label );		
		$tableRowHeader.append($value);
		$row.append($tableRowHeader);
		
		// row rest of the columns
		for (var j = 1; j < matrix[i].length; j++) {
			$rowCell = this.$selectedResultsRowCell.clone();
			$rowCell.html("");
			if (matrix[i][j].label != "") {
				$value = $("<a class=\"resultIndicator\">" + matrix[i][j].label +"</a>");
				$value.attr("data-score", matrix[i][j].label );
				$value.attr("data-sortvalue", matrix[i][j].label );
				Helpers.setResultIndicatorColor($value);
				
				if (matrix[i][j].callback) {
					$value.on('click', $.proxy(matrix[i][j].callback, this));
				}

				$rowCell.append($value);
			} else {
				$rowCell.html("&nbsp;");
			}
			console.log($rowCell);
			$row.append($rowCell);
		} 		
		$tbody.append($row);
	}
	
	// Sizing
	if (matrix[0].length > 10) this.$selectResultsTableWrap.addClass("overflow");
	else this.$selectResultsTableWrap.removeClass("overflow");
	
	this.$selectResultsTableWrap.removeClass(function (index, className) {
    	return (className.match (/(^|\s)size-\S+/g) || []).join(' ');
	});
	this.$selectResultsTableWrap.addClass("size-"+matrix[0].length);
	
	this.$selectResultsTableWrap.html("");
	this.$selectResultsTableWrap.append($table);
	
}

SelectedResultsDisplay.prototype.buildMatrixModulesStudentsForClass = function() {
	var matrix = [], i = 1, j = 1;
	students = this.resultState.studentsTree.children[ this.resultState.activeSchoolClass ].children; 
	modules = this.resultState.resultTree.children[ this.resultState.activeSchoolClass ].children;
	activeModules = this.resultState.activeCourses;
	
	matrix[0] = [];
	matrix[0][0] = "colsname";
	
	
	for (var amId in activeModules) {
		matrix[0][j] = {};
		matrix[0][j].label = modules[ activeModules[amId] ].label;
		matrix[0][j].callback = function(event) { event.stopPropagation(); event.preventDefault();	this.activitiesStudents( modules[ activeModules[amId] ] ); };
		matrix[0][j].linkLabel = "activiteiten";
		matrix[0][j].linkCallback = function() {  event.stopPropagation(); event.preventDefault();	this.activitiesStudents( modules[ activeModules[amId] ] ); };
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
			matrix[i][j].callback = function() { this.activitiesStudent(modules[ activeModules[amId] ], studentId) };
			j++;
		}	
		i++;	
	}
	
	return matrix;
	//resultState.studentsTree.schoolclasses[ resultState.activeSchoolClass ].children // students
}

SelectedResultsDisplay.prototype.buildMatrixActivitiesStudentInModule = function(module, studentId) {
	var matrix = [], i = 1, j = 1;
	var students = this.resultState.studentsTree.children[ this.resultState.activeSchoolClass ].children;
	
	matrix[0] = [];
	matrix[0][0] = "colsname";
	
	// Set row header
	for (var stuId in students) {
		if (stuId == studentId) {
			matrix[1] = [];
			matrix[1][0] = {};
			matrix[1][0].label = students[studentId].givenName + " " + (students[studentId].insertion ? students[studentId].insertion+" ":"")  + students[studentId].familyName;
		}
	}
	
	for (var actId in module.children) {
		matrix[0][j] = {};

		// set col headers
		matrix[0][j].label = module.children[actId].label;

		// set single row
		for (var stuScoId in module.children[actId].children) { 
			if (module.children[actId].children[stuScoId]["user-id"] == studentId) {
				matrix[1][j] = {};
				matrix[1][j].label = module.children[actId].children[stuScoId].sumScore;
			}
		}
		
		if (matrix[1][j] == undefined) {
			matrix[1][j] = {};
			matrix[1][j].label = "";
		}
		
		j++;
	}
	
	return matrix;
}

SelectedResultsDisplay.prototype.buildMatrixActivitiesStudentsInModule = function(module) {
	var matrix = [], i = 1, j = 1;
	var students = this.resultState.studentsTree.children[ this.resultState.activeSchoolClass ].children;
	
	matrix[0] = [];
	matrix[0][0] = "colsname";
	
	for (var actId in module.children) {
		matrix[0][j] = {};
		matrix[0][j].label = module.children[actId].label;
		j++;
	}
	
	console.log(module);
	
	for (var studentId in students) {
		matrix[i] = [];
		matrix[i][0] = {};
		matrix[i][0].label = students[studentId].givenName + " " + (students[studentId].insertion ? students[studentId].insertion+" ":"")  + students[studentId].familyName;
		
		j = 1;
		for (var actId in module.children) {
			console.log("i:"+i+" j:"+j);
			console.log(module.children[actId]);
			matrix[i][j] = {};
			matrix[i][j].label = this.computeActivityScoreForStudent(module.children[actId], studentId);
			matrix[i][j].callback = function() { console.log("callback"); };
			j++;
		}		
		
		// if (matrix[i][j] == undefined) {
// 			matrix[i][j] = {};
// 			matrix[i][j].label = "";
// 		}
		
		i++;	
	}
	
	return matrix;
}


SelectedResultsDisplay.prototype.computeModuleScoreForStudent = function(module, studentId) {
	var total = 0, totalCount = 0, scoreSet = false;

	for (var id in module.children) { // Loop over modules
		if (module.children[id].children) { 
			for (var scoId in module.children[id].children) { // Loop over activities
				if (module.children[id].children[scoId]["user-id"] == studentId) { // Select student
					scoreSet = true;
					total += parseInt(module.children[id].children[scoId].sumScore); // Sum of scores
				}	
			}
		}
		totalCount++;
	}
	if (!scoreSet) return "";
	return Math.round(total / totalCount);
}

SelectedResultsDisplay.prototype.computeActivityScoreForStudent = function(activity, studentId) {
	var total = 0, totalCount = 0, scoreSet = false;
	
	for (var scoId in activity.children) { // Loop over activities
		if (activity.children[scoId]["user-id"] == studentId) { // Select student
			scoreSet = true;
			total += parseInt(activity.children[scoId].sumScore); // Sum of scores
		}	
		totalCount++;
	}
	if (!scoreSet) return "";
	return Math.round(total / totalCount);
}

/*
 * VIEWS
 */

SelectedResultsDisplay.prototype.modulesStudents = function() {
	var matrix = this.buildMatrixModulesStudentsForClass();
	this.plotMatrix(matrix);
}

SelectedResultsDisplay.prototype.activitiesStudent = function(module, studentId) {
	var matrix = this.buildMatrixActivitiesStudentInModule(module, studentId);
	this.plotMatrix(matrix);
}

SelectedResultsDisplay.prototype.activitiesStudents = function(module) {
	console.log(module);
	var matrix = this.buildMatrixActivitiesStudentsInModule(module);
	this.plotMatrix(matrix);
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

SelectedResultsDisplay.prototype.clear = function () {
	console.log("clear");	
}

SelectedResultsDisplay.prototype.init = function(resultState) {
	console.log(resultState);
	this.resultState = resultState;
	
	this.modulesStudents();
	
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

SelectedResultsDisplay.prototype.hoverColumnHeader = function(event) {
	console.log("hover");
	var $target = $(event.target);
	if ($target.hasClass('active')) {
		$target.removeClass('active');
		$target.find('a').hide();
	} else {
		$target.addClass('active');
		$target.find('a').show();
	}	
}

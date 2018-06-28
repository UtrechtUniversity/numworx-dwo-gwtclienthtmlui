function SelectedResultsDisplay() {		
	this.resultState = null;
	//this.studentsTree = null;
	
	// Form
	this.sealModuleActivitiesForm = document.forms["sealModuleActivities"];
	this.startCompareClassForm = document.forms["startCompareClass"];
	 
	
	// jQuery objects
	this.$panel = jQuery("#selectedResultsDisplay");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	// Bottom bars
	this.$bars = this.$panel.find(".bar");
	this.$barModulesStudents = $("#barModulesStudents").hide();
	
	this.$barActivitiesStudent = $("#barActivitiesStudent").hide();
	this.$barActivitiesStudentBacklink = $("#barActivitiesStudentBacklink");
	this.$barActivitiesStudents = $("#barActivitiesStudents").hide();
	this.$barActivitiesStudentsBacklink = $("#barActivitiesStudentsBacklink");
		
	this.$selectResultsTableWrap = $("#selectedResultsTableWrap");
	
	this.$selectedResultsTable = $("#selectedResultsTable").detach();	
	this.$selectedResultsColumnHeaderName = this.$selectedResultsTable.find("#selectedResultsTableRepeatableColumnHeaderName").detach();	
	this.$selectedResultsColumnHeaderSorting = this.$selectedResultsTable.find("#selectedResultsTableRepeatableColumnHeaderSorting").detach();	
		
	this.$selectedResultsRowHeader = this.$selectedResultsTable.find("#selectedResultsTableRowHeader").detach();
	this.$selectedResultsRowCell = this.$selectedResultsTable.find("#selectedResultsTableRepeatableCell").detach();
	this.$selectedResultsRow = this.$selectedResultsTable.find("tbody tr").detach();
	
	this.$filterIndicators = $(".filterIndicators");
	
	this.$startCompareClassForm = $(this.startCompareClassForm);
	
	// Bind handlers
	this.$filterIndicators.on('click', $.proxy(this.clickFilterIndicator, this));
	this.$startCompareClassForm.on('submit', $.proxy(this.submitStartCompareClassForm, this));
	
	// Init
	this.$panel.hide();
}

SelectedResultsDisplay.prototype.show = function() {
	this.$panel.show();	
	
	if (!app.getPresenterFactory().getSelectedResultsPresenter().hasCompareClasses()) this.$startCompareClassForm.hide();
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
			$value.on('click', $.proxy(matrix[0][i].callback, this, matrix[0][i].params));
		}
		if (matrix[0][i].linkLabel && matrix[0][i].linkCallback) {
			$link = $('<a href="javascript:void(0);">'+matrix[0][i].linkLabel+'</a>');
			$value.append($link);
			$link.on('click', $.proxy(matrix[0][i].linkCallback, this, matrix[0][i].linkParams));
		}
		$value.hover($.proxy(this.hoverColumnHeader, this));		
		$theadRow2.append($headerName);
		
		// Sort buttons
		$headerSorting = this.$selectedResultsColumnHeaderSorting.clone();
		$theadRow3.append($headerSorting);	
		$theadRow3.find(".sortButton").click(Helpers.clickSortButton);
	}
	$theadRow3.append('<th class="fill">&nbsp;</th>');	
	$theadRow2.append('<th class="fill">&nbsp;</th>');	
	
	$table.find(".tableTitle").html(matrix[0][0].label);
	
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
				$value = $("<a class=\"resultIndicator\" title=\""+matrix[i][j].label+"\">" + matrix[i][j].label +"</a>");
				$value.attr("data-score", matrix[i][j].label );
				$value.attr("data-sortvalue", matrix[i][j].label );
				Helpers.setResultIndicatorColor($value);
				
				if (matrix[i][j].callback) {
					$value.on('click', $.proxy(matrix[i][j].callback, this, matrix[i][j].params));
				}

				$rowCell.append($value);
			} else {
				$rowCell.html("&nbsp;");
			}
			$row.append($rowCell);
		} 		
		$row.append('<td class="fill">&nbsp;</td>');
		$tbody.append($row);
	}
	
	// Sizing
	if (matrix[0].length > 11) this.$selectResultsTableWrap.addClass("overflow");
	else this.$selectResultsTableWrap.removeClass("overflow");
	
	this.$selectResultsTableWrap.removeClass(function (index, className) {
    	return (className.match (/(^|\s)size-\S+/g) || []).join(' ');
	});
	this.$selectResultsTableWrap.addClass("size-"+matrix[0].length);
	
	this.$selectResultsTableWrap.html("");
	this.$selectResultsTableWrap.append($table);
	
	//console.log(JSON.stringify(this.resultState));
	
}

SelectedResultsDisplay.prototype.buildMatrixModulesStudentsForClass = function() {
	var matrix = [], i = 1, j = 1;
	students = this.resultState.studentsTree.children[ this.resultState.activeSchoolClass ].children; 
	modules = this.resultState.resultsTree.children[ this.resultState.activeSchoolClass ].children;
	activeModules = this.resultState.activeCourses;
	
	matrix[0] = [];
	matrix[0][0] = {};
	matrix[0][0].label = "Modules"
	
	
	
	for (var amId in activeModules) {
		matrix[0][j] = {};
		matrix[0][j].label = modules[ activeModules[amId] ].label;
		matrix[0][j].callback = this.activitiesStudents;
		matrix[0][j].params = { module: modules[ activeModules[amId] ]  };
		matrix[0][j].linkLabel = "activiteiten";
		matrix[0][j].linkCallback = this.activitiesStudents;
		matrix[0][j].linkParams = { module: modules[ activeModules[amId] ]  };
		
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
			//matrix[i][j].callback = function() { this.activitiesStudent(modules[ activeModules[amId] ], studentId) };
			//matrix[i][j].callback = $.proxy(this.activitiesStudent, this, modules[ activeModules[amId] ], studentId );
			matrix[i][j].callback = this.activitiesStudent;
			matrix[i][j].params = { moduleId: activeModules[amId], module: modules[ activeModules[amId] ], studentId: studentId };
			j++;
		}	
		i++;	
	}
	
	//console.log(JSON.stringify(this.resultState));
	
	return matrix;
	//resultState.studentsTree.schoolclasses[ resultState.activeSchoolClass ].children // students
}

SelectedResultsDisplay.prototype.buildMatrixActivitiesStudentInModule = function(module, studentId) {
	var matrix = [], i = 1, j = 1;
	var students = this.resultState.studentsTree.children[ this.resultState.activeSchoolClass ].children;
	
	matrix[0] = [];
	matrix[0][0] = {};
	matrix[0][0].label = "Activities"
	
	// Set row header
	for (var stuId in students) {
		if (stuId == studentId) {
			matrix[1] = [];
			matrix[1][0] = {};
			matrix[1][0].label = students[studentId].givenName + " " + (students[studentId].insertion ? students[studentId].insertion+" ":"")  + students[studentId].familyName;
		}
	}
	
	// module.children[Symbol.iterator] = function() {
// 	    var keys = [];
// 	    var ref = this;
// 	    for (var key in this) {
// 	        keys.push(key);
// 	    }
//
// 	    return {
// 	        next: function() {
// 	            if (this._keys && this._obj && this._index < this._keys.length) {
// 	                var key = this._keys[this._index];
// 	                this._index++;
// 	                return { key: key, value: this._obj[key], done: false };
// 	            } else {
// 	                return { done: true };
// 	            }
// 	        },
// 	        _index: 0,
// 	        _keys: keys,
// 	        _obj: ref
// 	    };
// 	}
	
	for (var actId in module.children) {
		matrix[0][j] = {};

		// set col headers
		matrix[0][j].label = module.children[actId].label;

		// set single row
		//matrix[1] = [];
		for (var stuScoId in module.children[actId].children) { 
			if (module.children[actId].children[stuScoId]["user-id"] == studentId) {
				matrix[1][j] = {};
				matrix[1][j].label = module.children[actId].children[stuScoId].sumScore+" in "+module.children[actId].children[stuScoId].totalTime;
				
				matrix[1][j].callback = this.clickResultIndicator;		
				matrix[1][j].params = { scoId: actId, studentId: studentId };
			}
		}
		
		if (matrix[1][j] == undefined) {
			matrix[1][j] = {};
			matrix[1][j].label = "";
		}
		
		j++;
	}
	
	//console.log(JSON.stringify(this.resultState));
	
	return matrix;
}

SelectedResultsDisplay.prototype.buildMatrixActivitiesStudentsInModule = function(module) {
	var matrix = [], i = 1, j = 1;
	var students = this.resultState.studentsTree.children[ this.resultState.activeSchoolClass ].children;
	
	matrix[0] = [];
	matrix[0][0] = {};
	matrix[0][0].label = "Activities";
	
	for (var actId in module.children) {
		matrix[0][j] = {};
		matrix[0][j].label = module.children[actId].label;
		j++;
	}
	
	for (var studentId in students) {
		matrix[i] = [];
		matrix[i][0] = {};
		matrix[i][0].label = students[studentId].givenName + " " + (students[studentId].insertion ? students[studentId].insertion+" ":"")  + students[studentId].familyName;
		
		j = 1;
		for (var actId in module.children) {
			matrix[i][j] = {};
			score = null;
			time = null;
			
			for (var scoId in module.children[actId].children) { // Loop over activities
				if (module.children[actId].children[scoId]["user-id"] == studentId) { // Select student
					scoreSet = true;
					score = module.children[actId].children[scoId].sumScore; 
					time = module.children[actId].children[scoId].totalTime; 
				}	
			}
			
			if (score != null || time != null) {
				matrix[i][j].label = score + " in " + time;
				matrix[i][j].callback = this.clickResultIndicator;
			} else {
				matrix[i][j].label = "";
			}
						
			matrix[i][j].params = { scoId: actId, studentId: studentId };
			j++;
		}		
				
		i++;	
	}
	
	//console.log(JSON.stringify(this.resultState));
	
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

SelectedResultsDisplay.prototype.filterIndicator = function(nr) {
	this.$selectResultsTableWrap.find(".resultIndicator").hide();
	this.$selectResultsTableWrap.find(".result"+nr).show();
}
SelectedResultsDisplay.prototype.filterIndicatorReset = function() {
	console.log("reset");
	this.$selectResultsTableWrap.find(".resultIndicator").show();
}


/*
 * VIEWS
 */

SelectedResultsDisplay.prototype.modulesStudents = function() {
	var matrix = this.buildMatrixModulesStudentsForClass();
	this.plotMatrix(matrix);
	this.$bars.hide();
	this.$barModulesStudents.show();
}

SelectedResultsDisplay.prototype.activitiesStudent = function(params) {
	var matrix = this.buildMatrixActivitiesStudentInModule(params.module, params.studentId);
	this.resultState.activeModule = params.moduleId;
	this.plotMatrix(matrix);
	this.$bars.hide();
	this.$barActivitiesStudent.show();
	//this.$barActivitiesStudentBacklink.html("Terug naar <b>Alle geselecteerde modules</b>");
	this.$barActivitiesStudentBacklink.click($.proxy(this.clickBackToModulesStudents, this));
}

SelectedResultsDisplay.prototype.activitiesStudents = function(params) {
	var matrix = this.buildMatrixActivitiesStudentsInModule(params.module);
	this.resultState.activeModule = params.moduleId;
	this.plotMatrix(matrix);
	this.$bars.hide();
	this.$barActivitiesStudents.show();
	//this.$barActivitiesStudentsBacklink.html("Terug naar <b>Alle geselecteerde modules</b>");
	this.$barActivitiesStudentsBacklink.click($.proxy(this.clickBackToModulesStudents, this));
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

SelectedResultsDisplay.prototype.clear = function () {
	console.log("clear");	
}

SelectedResultsDisplay.prototype.init = function(resultState) {
	console.log("init SelectedResultsDisplay");
	console.log(resultState);
	this.resultState = resultState;
	this.modulesStudents();	
}

SelectedResultsDisplay.prototype.setHelp = function(url) {
	this.$helpContentIFrame.attr('src', url );
}

SelectedResultsDisplay.prototype.updateResultTree = function (resultsTree, studentsTree) {
	console.log("updateTree");
	console.log(studentsTree);
	this.resultState.resultsTree = resultsTree;
	this.resultState.studentsTree = studentsTree;
}

/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */

SelectedResultsDisplay.prototype.showStudentResults = function(scoId, studentId) {
	this.resultState.activeActivity = scoId;
	this.resultState.activeStudent = studentId;
	//console.log(JSON.stringify(this.resultState));
	console.log(scoId);
	console.log(studentId);
	console.log(this.resultState.activeSchoolClass); 
	app.getPresenterFactory().getSelectedResultsPresenter().showStudentResults(this.resultState, scoId, studentId, this.resultState.activeSchoolClass);
}

SelectedResultsDisplay.prototype.compareClass = function() {
	app.getPresenterFactory().getSelectedResultsPresenter().compareSchoolClasses(this.resultState);
}

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

SelectedResultsDisplay.prototype.clickBackToModulesStudents = function(event) {
	event.preventDefault();		
	this.modulesStudents();
}

SelectedResultsDisplay.prototype.clickResultIndicator = function(event) {
//	event.preventDefault();		
	console.log(event)
	this.showStudentResults(event.scoId, event.studentId);	
}

SelectedResultsDisplay.prototype.clickFilterIndicator = function(event) {
	event.preventDefault();
	$el = $(event.target);
	hadClass = $el.hasClass("active");
	
	this.$filterIndicators.find("a").removeClass("active");

	if (hadClass) {		
		this.filterIndicatorReset();
	} else {
		var nr = $el.data('filter');
		if (nr < -1 || nr > 4) return;	
		$el.addClass("active")	
		this.filterIndicator(nr);
	}	
}

SelectedResultsDisplay.prototype.submitStartCompareClassForm = function(event) {
	event.preventDefault();			
	this.compareClass();
}


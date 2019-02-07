function SelectedResultsDisplay() {		
	this.resultState = null;
	this.prevLeft = 0; // Scroll state
	this.scrollTimer = null; //scroll Timer
	
	// Form
	// disabled this.sealModuleActivitiesForm = document.forms["sealModuleActivities"];
	this.sealSingleActivityForm = document.forms["sealSingleActivity"];
	this.activitiesStudentsClearResultsForm = document.forms["activitiesStudentsClearResults"];
	this.startCompareClassForm = document.forms["startCompareClass"];
	 
	
	// jQuery objects
	this.$panel = jQuery("#selectedResultsDisplay");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	this.$sectionTitle = $("#selectedResultsSectionTitle");
	
	//this.$sealModuleActivitiesForm = $(this.sealModuleActivitiesForm);
	this.$sealSingleActivityForm = $(this.sealSingleActivityForm);
	
	// Bottom bars
	this.$bars = this.$panel.find(".bar");
	this.$barModulesStudents = $("#barModulesStudents").hide();
	this.$barModulesStudentsBacklink = $("#barModulesStudentsBacklink");
	this.$barModulesStudentsDownload = this.initModulesStudentsDownload("#barModulesStudentsDownload");
	this.$barActivitiesStudent = $("#barActivitiesStudent").hide();
	this.$barActivitiesStudentBacklink = $("#barActivitiesStudentBacklink");
	this.$barActivitiesStudents = $("#barActivitiesStudents").hide();
	this.$barActivitiesStudentsBacklink = $("#barActivitiesStudentsBacklink");
	this.$barActivitiesStudentsDownload = this.initActivitiesStudentsDownload("#barActivitiesStudentsDownload");
	this.$barPagesStudents = $("#barPagesStudents").hide();
	this.$barPagesStudentsBacklink = $("#barPagesStudentsBacklink");
	this.$barPagesStudentsDownload = this.initPagesStudentsDownload("#barPagesStudentsDownload")
	
	this.$selectedResultsTitle = $("#selectedResultsTitle");

	this.$selectResultsTableWrap = $("#selectedResultsTableWrap");
	
	this.$selectedResultsTable = $("#selectedResultsTable").detach();	
	this.$selectedResultsColumnHeaderName = this.$selectedResultsTable.find("#selectedResultsTableRepeatableColumnHeaderName").detach().removeAttr("id");	
	this.$selectedResultsColumnHeaderSorting = this.$selectedResultsTable.find("#selectedResultsTableRepeatableColumnHeaderSorting").detach().removeAttr("id");	
		
	this.$selectedResultsRowHeader = this.$selectedResultsTable.find("#selectedResultsTableRowHeader").detach().removeAttr("id");
	this.$selectedResultsRowCell = this.$selectedResultsTable.find("#selectedResultsTableRepeatableCell").detach().removeAttr("id");
	this.$selectedResultsRow = this.$selectedResultsTable.find("tbody tr").detach();
	
	this.$allFilterIndicators = $(".filterIndicators");
	
	this.$startCompareClassForm = $(this.startCompareClassForm);
	this.$activitiesStudentsClearResultsForm = $(this.activitiesStudentsClearResultsForm);
	this.$studentsLog = $('#barPagesStudentsLog')
	
	
	// disabled this.$sealCheckbox = $(this.sealModuleActivitiesForm.elements['seal']);
	this.$sealSingleActivityCheckbox = $(this.sealSingleActivityForm.elements['seal']);
	
	// Bind handlers
	this.$allFilterIndicators.on('click', $.proxy(this.clickFilterIndicator, this));
	
	this.$startCompareClassForm.on('submit', $.proxy(this.submitStartCompareClassForm, this));
	this.$activitiesStudentsClearResultsForm.on('submit', $.proxy(this.submitActivitiesStudentsClearResultsForm, this));
	// disabled this.$sealCheckbox.on('change', $.proxy(this.changeSealCheckbox, this));
	this.$sealSingleActivityCheckbox.on('change', $.proxy(this.changeSealSingleActivityCheckbox, this));
	this.$selectResultsTableWrap.on('scroll', $.proxy(this.scrollTableWrap, this));
	this.$studentsLog.on('click', $.proxy(this.logResultsClick, this));
	
	// Init
	this.$panel.hide();
}

SelectedResultsDisplay.prototype.show = function() {
        this.localize();
	this.$panel.show();	
	
	if (!app.getPresenterFactory().getSelectedResultsPresenter().hasCompareClasses()) this.$startCompareClassForm.css('visibility','hidden');
	if (!app.getPresenterFactory().getSelectedResultsPresenter().hasLogResults()) this.$studentsLog.css('visibility', 'hidden');

	this.$activitiesStudentsClearResultsForm.css('visibility','hidden'); // Not implemented?
}


SelectedResultsDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}
/*
 * GUI FUNCTIONS
 */

SelectedResultsDisplay.prototype.plotMatrix = function (matrix) {
	var $table = this.$selectedResultsTable.clone(),
		$tbody = $table.find('tbody');
		$theadRow2 = $table.find('thead tr:nth-child(2)'),
		$theadRow3 = $table.find('thead tr:nth-child(3)'),
		$tableRowHeader = null, 
		$row = null,
		$rowCell = null,
		$value = null;
	
	// set title above table 
	if (matrix[0][0].resultsTitle) this.$selectedResultsTitle.find(".text").html(matrix[0][0].resultsTitle); 
	else this.$selectedResultsTitle.find(".text").html("");
	if (matrix[0][0].resultsTitlePrefix) this.$selectedResultsTitle.find(".prefix").html(matrix[0][0].resultsTitlePrefix); 
	else this.$selectedResultsTitle.find(".prefix").html("");
	
	
	// set extra table class
	if (matrix[0][0].tableClass) $table.addClass(matrix[0][0].tableClass);
	
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
		$theadRow3.find(".sortButton").off('click').click(Helpers.clickSortButton);
	}
	$theadRow3.append('<th class="fill">&nbsp;</th>');	
	$theadRow2.append('<th class="fill">&nbsp;</th>');	
	
	$table.find(".tableTitle").html(matrix[0][0].label);
	
	// BUILD BODY
	$tbody.html("");
	
	for (var i = 1; i < matrix.length; i++) {
		
		$row = this.$selectedResultsRow.clone();
		
		// row first column
		$tableRowHeader = this.$selectedResultsRowHeader.clone();
		$tableRowHeader.html("");
		
		$value = $("<span title=\""+matrix[i][0].label+"\">" + matrix[i][0].label + "</span>");
		if (matrix[i][0].sortValue) $value.attr("data-sortvalue", matrix[i][0].sortValue );		
		else $value.attr("data-sortvalue", matrix[i][0].sortValue );		
		
		$tableRowHeader.append($value);
		$row.append($tableRowHeader);
		
		// row rest of the columns
		for (var j = 1; j < matrix[i].length; j++) {
			
			// Create fresh new row
			$rowCell = this.$selectedResultsRowCell.clone();
			$rowCell.html("");
			
			if (matrix[i][j].label != "") {
				
				// Label
				$value = $("<a class=\"resultIndicator\" title=\""+matrix[i][j].label+"\">" + matrix[i][j].label +"</a>");
				
				// Coloring
				if (matrix[i][j].score) $value.attr("data-score", matrix[i][j].score );
				else $value.attr("data-score", matrix[i][j].label );
				Helpers.setResultIndicatorColor($value);
				
				// Sorting
				if (matrix[i][j].sortValue || matrix[i][j].sortValue === 0) $value.attr("data-sortvalue", matrix[i][j].sortValue );
				else if (matrix[i][j].score) $value.attr("data-sortvalue", matrix[i][j].score );
				else $value.attr("data-sortvalue", matrix[i][j].label );
				
				// Click callback				
				if (matrix[i][j].callback) {
					$value.on('click', $.proxy(matrix[i][j].callback, this, matrix[i][j].params));
				}

				$rowCell.append($value);
			} else {
				// No result? Create invisible SPAN, used for sorting
				$value = $("<a>&nbsp;</a>");
				if (matrix[i][j].sortValue) $value.attr("data-sortvalue", matrix[i][j].sortValue );
				else if (matrix[i][j].score) $value.attr("data-sortvalue", matrix[i][j].score );
				else $value.attr("data-sortvalue", "-1" );
				$rowCell.append($value);
			}
			
			// Add new cell to row
			$row.append($rowCell);
		} 
		
		// add filler cell
		$row.append('<td class="fill">&nbsp;</td>');
		
		// append row to table
		$tbody.append($row);
		
		$theadRow3.find(".sortButton.default").trigger('click');	
	}
	
	
	
	// Sizing
	if (matrix[0].length > 11) this.$selectResultsTableWrap.addClass("overflow");
	else this.$selectResultsTableWrap.removeClass("overflow");
	
	this.$selectResultsTableWrap.removeClass(function (index, className) {
    	return (className.match (/(^|\s)size-\S+/g) || []).join(' ');
	});
	this.$selectResultsTableWrap.addClass("size-"+matrix[0].length);
	this.$selectResultsTableWrap.removeClass("active");
	this.$selectResultsTableWrap.html("");
	this.$selectResultsTableWrap.append($table);
	
	// Add overflow class to names
	$tbody.find(".studentName span").each( Helpers.addClassIfOverflown );
	
	app.mainDisplay.registerStretchables( [ $tbody ] );
	
	this.changeFiltering();
}

SelectedResultsDisplay.prototype.buildMatrixModulesStudentsForClass = function() {
	var matrix = [], i = 1, j = 1;
	students = this.resultState.studentsTree.children[ this.resultState.activeSchoolClass ].children; 
	modules = this.resultState.resultsTree.children[ this.resultState.activeSchoolClass ].children;
	activeModules = this.resultState.activeCourses;
	
	matrix[0] = [];
	matrix[0][0] = {};
	matrix[0][0].label = matrix[0][0].value = app.getTranslator().translate("NUM_TBL_SELECTEDRESULTS_Modules");
	
	matrix[0][0].resultsTitle = "";
	matrix[0][0].resultsTitlePrefix = app.getTranslator().translate("NUM_TBL_SELECTEDRESULTS_AllModules");
		
	for (var amId in activeModules) {
		matrix[0][j] = {};
		matrix[0][j].label = matrix[0][j].value = modules[ activeModules[amId] ].label;
		matrix[0][j].callback = this.clickModuleColumnHeader; //this.activitiesStudents;
		matrix[0][j].params = { moduleId: activeModules[amId], module: modules[ activeModules[amId] ]  };
		matrix[0][j].linkLabel = app.getTranslator().translate("NUM_TBL_SELECTEDRESULTS_Activiteiten");
		matrix[0][j].linkCallback = this.clickModuleColumnHeader;//this.activitiesStudents;
		matrix[0][j].linkParams = { moduleId: activeModules[amId], module: modules[ activeModules[amId] ]  };
		j++;
	}
	
	for (var studentId in students) {
		matrix[i] = [];
		matrix[i][0] = {};
		matrix[i][0].label = matrix[i][0].value = students[studentId].givenName + " " + (students[studentId].insertion ? students[studentId].insertion+" ":"")  + students[studentId].familyName;
		matrix[i][0].sortValue = students[studentId].familyName + " " + students[studentId].givenName + (students[studentId].insertion ? " "+students[studentId].insertion : "") ;
		
		j = 1;
		for (var amId in activeModules) {
			matrix[i][j] = {};
			matrix[i][j].score = matrix[i][j].label = matrix[i][j].value = this.computeModuleScoreForStudent(modules[ activeModules[amId] ], studentId);
			//matrix[i][j].callback = function() { this.activitiesStudent(modules[ activeModules[amId] ], studentId) };
			//matrix[i][j].callback = $.proxy(this.activitiesStudent, this, modules[ activeModules[amId] ], studentId );
			matrix[i][j].callback = this.clickModuleResultIndicator;
			matrix[i][j].params = { moduleId: activeModules[amId], module: modules[ activeModules[amId] ], studentId: studentId };
			j++;
		}	
		i++;	
	}
	
	return matrix;
}

SelectedResultsDisplay.prototype.buildMatrixActivitiesStudentInModule = function(module, studentId) {
	var matrix = [], i = 1, j = 1;
	var students = this.resultState.studentsTree.children[ this.resultState.activeSchoolClass ].children;
	
	matrix[0] = [];
	matrix[0][0] = {};
	matrix[0][0].label = matrix[0][0].value = app.getTranslator().translate("NUM_TBL_SELECTEDRESULTS_Activiteiten")
	matrix[0][0].tableClass = "alternativeHeader";
	
	// Set row header
	for (var stuId in students) {
		if (stuId == studentId) {
			matrix[1] = [];
			matrix[1][0] = {};
			matrix[1][0].label = matrix[1][0].value = students[studentId].givenName + " " + (students[studentId].insertion ? students[studentId].insertion+" ":"")  + students[studentId].familyName;
			matrix[1][0].sortValue = students[studentId].familyName + " " + students[studentId].givenName + (students[studentId].insertion ? " "+students[studentId].insertion : "");
			
		}
	}
	
	var sortedModuleChildren = Helpers.getIndexedSortedArray(module.children);
			
	for (var n = 0; n < sortedModuleChildren.length; n++) {
		matrix[0][j] = {};

		// set col headers
		matrix[0][j].label = matrix[0][j].value = sortedModuleChildren[n].label;
		matrix[0][j].callback = this.clickActivityColumnHeader;
		matrix[0][j].params = { scoId: sortedModuleChildren[n].id  };
		

		// set single row
		for (var stuScoId in sortedModuleChildren[n].children) { 
			if (sortedModuleChildren[n].children[stuScoId]["user-id"] == studentId) {
				matrix[1][j] = {};
				matrix[1][j].label = sortedModuleChildren[n].children[stuScoId].sumScore+" in "+sortedModuleChildren[n].children[stuScoId].totalTime;				
				matrix[1][j].score = matrix[1][j].value = sortedModuleChildren[n].children[stuScoId].sumScore;
				matrix[1][j].sortValue = sortedModuleChildren[n].children[stuScoId].sumScore;
								
				matrix[1][j].callback = this.clickResultIndicator;		
				matrix[1][j].params = { scoId: sortedModuleChildren[n].id, studentId: studentId };
			}
		}
		
		if (matrix[1][j] == undefined) {
			matrix[1][j] = {};
			matrix[1][j].label = matrix[1][j].value = "";
		}
		
		j++;
	}
		
	return matrix;
}

SelectedResultsDisplay.prototype.buildMatrixActivitiesStudentsInModule = function(module) {
	var matrix = [], i = 1, j = 1;
	var students = this.resultState.studentsTree.children[ this.resultState.activeSchoolClass ].children;
	
	matrix[0] = [];
	matrix[0][0] = {};
	matrix[0][0].label = matrix[0][0].value = app.getTranslator().translate("NUM_TBL_SELECTEDRESULTS_Activiteiten");
	matrix[0][0].tableClass = "alternativeHeader";
	
	matrix[0][0].resultsTitle = module.label;
	matrix[0][0].resultsTitlePrefix = app.getTranslator().translate("NUM_TBL_SELECTEDRESULTS_Module");
	
	var sortedModuleChildren = Helpers.getIndexedSortedArray(module.children);
			
	for (var n = 0; n < sortedModuleChildren.length; n++) {
		matrix[0][j] = {};
		matrix[0][j].label = matrix[0][j].value = sortedModuleChildren[n].label;
		matrix[0][j].callback = this.clickActivityColumnHeader;
		matrix[0][j].params = { scoId: sortedModuleChildren[n].id  };
		matrix[0][j].linkLabel = app.getTranslator().translate("NUM_TBL_SELECTEDRESULTS_Paginas");
		matrix[0][j].linkCallback = this.clickActivityColumnHeader;//this.activitiesStudents;
		matrix[0][j].linkParams = { scoId: sortedModuleChildren[n].id  };
		j++;
	}
	
	for (var studentId in students) {
		matrix[i] = [];
		matrix[i][0] = {};
		matrix[i][0].label = matrix[i][0].value = students[studentId].givenName + " " + (students[studentId].insertion ? students[studentId].insertion+" ":"")  + students[studentId].familyName;
		matrix[i][0].sortValue = students[studentId].familyName + " " + students[studentId].givenName + (students[studentId].insertion ? " "+students[studentId].insertion : "") ;
		
		j = 1;

		for (var n = 0; n < sortedModuleChildren.length; n++) {
			matrix[i][j] = {};
			score = null;
			time = null;
			
			for (var scoId in sortedModuleChildren[n].children) { // Loop over activities
				if (sortedModuleChildren[n].children[scoId]["user-id"] == studentId) { // Select student
					score = sortedModuleChildren[n].children[scoId].sumScore; 
					time = sortedModuleChildren[n].children[scoId].totalTime; 

					if ( (score == 0 && time == "0s") ||  sortedModuleChildren[n].children[scoId].completion_status == "not-attempted") {
						score = null;
						time = null;
					}
				}	
			}
			
			if (score != null || time != null) {
				matrix[i][j].label = score + " in " + time;
				matrix[i][j].score = matrix[i][j].value = score;
				matrix[i][j].sortValue = score;
				matrix[i][j].callback = this.clickResultIndicator;
			} else {
				matrix[i][j].label = matrix[i][j].value = "";
			}
						
			matrix[i][j].params = { scoId: sortedModuleChildren[n].id, studentId: studentId };
			j++;
		}		
				
		i++;	
	}
		
	return matrix;
}

// Below is not in use anymore
SelectedResultsDisplay.prototype.getSealStateActivitiesStudentsInModule = function(module) {
	var students = this.resultState.studentsTree.children[ this.resultState.activeSchoolClass ].children;
	var sealed = 0, unsealed = 0, state = 0;
	for (var studentId in students) {
		for (var actId in module.children) {
			for (var scoId in module.children[actId].children) { // Loop over activities
				if (module.children[actId].children[scoId]["user-id"] == studentId) { 
					if (module.children[actId].children[scoId].completionStatus == "completed") sealed++;
					else unsealed++;				
				}
			}	
		}
	}
	
	if (sealed == 0) return 0; // none sealed
	if (sealed > 0 && unsealed > 0) return 1; // some sealed
	if (sealed > 0 && unsealed == 0) return 2; // all sealed	
}

SelectedResultsDisplay.prototype.buildMatrixPagesActivityStudentsInModule = function(activity) {
	var matrix = [], i = 1, j = 1, maxPages = 0;
	var students = this.resultState.studentsTree.children[ this.resultState.activeSchoolClass ].children;
	var sortedStudentScoChildren = null;
	
	matrix[0] = [];
	matrix[0][0] = {};
	matrix[0][0].label = matrix[0][0].value = app.getTranslator().translate("NUM_TBL_SELECTEDRESULTS_Paginas");
	matrix[0][0].tableClass = "alternativeHeader";
	
	matrix[0][0].resultsTitle = activity.label;
	matrix[0][0].resultsTitlePrefix = app.getTranslator().translate("NUM_TBL_SELECTEDRESULTS_Activity");
	
	
	
	for (var studenScoId in activity.children) {
		
		if (activity.children[studenScoId].children) {  // first studentsco with children
			
			sortedStudentScoChildren = Helpers.getIndexedSortedArray(activity.children[studenScoId].children);
			
			for (var n = 0; n < sortedStudentScoChildren.length; n++) {
				matrix[0][j] = {};
				matrix[0][j].label = matrix[0][j].value = sortedStudentScoChildren[n].label;
				j++;
			}
			break;
		}
	}
	maxPages = j;
	
	for (var studentId in students) {
		matrix[i] = [];
		matrix[i][0] = {};
		matrix[i][0].label = matrix[i][0].value = students[studentId].givenName + " " + (students[studentId].insertion ? students[studentId].insertion+" ":"")  + students[studentId].familyName;
		matrix[i][0].sortValue = students[studentId].familyName + " " + (students[studentId].insertion ? students[studentId].insertion+" ":"")  + students[studentId].givenName;//
		j = 1;
		
		for (var studenScoId in activity.children) {
			if (activity.children[studenScoId]["user-id"] == studentId) { // Select student
				j = 1;
				
				sortedStudentScoChildren = Helpers.getIndexedSortedArray(activity.children[studenScoId].children);
				
				for (var n = 0; n < sortedStudentScoChildren.length; n++) {
					matrix[i][j] = {};
					matrix[i][j].label = sortedStudentScoChildren[n].sumScore + ( sortedStudentScoChildren[n].bonus > 0 ? "+"+sortedStudentScoChildren[n].bonus : "") +" / " + sortedStudentScoChildren[n].maxScore;
					matrix[i][j].score = (sortedStudentScoChildren[n].sumScore + ( sortedStudentScoChildren[n].bonus > 0 ? sortedStudentScoChildren[n].bonus : 0) ) / sortedStudentScoChildren[n].maxScore * 100;
					matrix[i][j].sortValue = matrix[i][j].value = sortedStudentScoChildren[n].sumScore + ( sortedStudentScoChildren[n].bonus > 0 ?sortedStudentScoChildren[n].bonus : 0);
					matrix[i][j].callback = this.clickPageResultIndicator;
					matrix[i][j].params = { scoId: this.resultState.activeActivity, studentId: studentId, pageSequence: sortedStudentScoChildren[n].sequence };
					j++;
				}	
			}			
		}
		
		if (j == 1) { // apparantly no pages
			for (var j = 1; j < maxPages; j++) {
				matrix[i][j] = {};
				matrix[i][j].label = matrix[i][j].value = "";
			}
		}		
				
		i++;	
	}
		
	return matrix;	
}

SelectedResultsDisplay.prototype.getSealStateSingleActivity = function(activity) {
	var students = this.resultState.studentsTree.children[ this.resultState.activeSchoolClass ].children;
	var sealed = 0, unsealed = 0, state = 0;
	for (var studentId in students) {
		for (var studenScoId in activity.children) { // Loop over activities
			if (activity.children[studenScoId]["user-id"] == studentId) { 
				console.log(activity.children[studenScoId].completionStatus);
				if (activity.children[studenScoId].completionStatus == "completed") sealed++;
				else unsealed++;				
			}
		}	
		
	}
	
	if (sealed == 0) return 0; // none sealed
	if (sealed > 0 && unsealed > 0) return 1; // some sealed
	if (sealed > 0 && unsealed == 0) return 2; // all sealed	
}


SelectedResultsDisplay.prototype.computeModuleScoreForStudent = function(module, studentId) {
	var total = 0, totalCount = 0, scoreSet = false, allZero = true;

	for (var id in module.children) { // Loop over modules
		if (module.children[id].children) { 
			for (var scoId in module.children[id].children) { // Loop over activities
				if (module.children[id].children[scoId]["user-id"] == studentId) { // Select student
					scoreSet = true;
					total += parseInt(module.children[id].children[scoId].sumScore); // Sum of scores
					
					if ( ! ( ( parseInt(module.children[id].children[scoId].sumScore) == 0 && parseInt(module.children[id].children[scoId].totalTime) == "0s") 
								||  module.children[id].children[scoId].completion_status == "not-attempted" ) ) {
								allZero = false;
					}
				}	
			}
		}
		totalCount++;
	}
	
	if (!scoreSet || allZero) return "";
	return Math.round(total / totalCount);
}

SelectedResultsDisplay.prototype.allFilterIndicatorsReset = function() {
	this.resultState.activeIndicators = [1, 2, 3, 4];
}
SelectedResultsDisplay.prototype.showFilteredIndicators = function() {
	//console.log(this.resultState.activeIndicators);
	this.$selectResultsTableWrap.find(".resultIndicator").hide();
	for (var i = 0; i < this.resultState.activeIndicators.length; i++) {
		this.$selectResultsTableWrap.find(".result"+this.resultState.activeIndicators[i]).show();
	}
}
SelectedResultsDisplay.prototype.setActiveFilters = function() {
	this.$allFilterIndicators.removeClass("active");
	for (var i = 0; i < this.resultState.activeIndicators.length; i++) {		
		$(".filterIndicators.result"+this.resultState.activeIndicators[i]).addClass("active");
	}
}
SelectedResultsDisplay.prototype.changeFiltering = function() {
	this.setActiveFilters();
	this.showFilteredIndicators();
}


/*
 * VIEWS
 */

SelectedResultsDisplay.prototype.modulesStudents = function() {
	var matrix = this.buildMatrixModulesStudentsForClass();
	this.$bars.hide();
	this.$barModulesStudentsBacklink.click($.proxy(this.clickBackToResults, this));
	this.$barModulesStudents.show();
	this.plotMatrix(matrix);
	//this.filterIndicatorModulesStudents();
}

SelectedResultsDisplay.prototype.activitiesStudent = function(params) {
	var matrix = this.buildMatrixActivitiesStudentInModule(params.module, params.studentId);
	this.resultState.activeModule = params.moduleId;
	
	this.$bars.hide();
	this.$barActivitiesStudent.show();
	//this.$barActivitiesStudentBacklink.html("Terug naar <b>Alle geselecteerde modules</b>");
	this.$barActivitiesStudentBacklink.click($.proxy(this.clickBackToModulesStudents, this));
	this.plotMatrix(matrix);
}

SelectedResultsDisplay.prototype.activitiesStudents = function(params) {
	//console.log(params);
	
	var matrix = this.buildMatrixActivitiesStudentsInModule(params.module);
	//var sealState = this.getSealStateActivitiesStudentsInModule(params.module);
	
	this.resultState.activeModule = params.moduleId;
	
	this.$bars.hide();
	this.$barActivitiesStudents.show();
	//this.$barActivitiesStudentsBacklink.html("Terug naar <b>Alle geselecteerde modules</b>");
	this.$barActivitiesStudentsBacklink.click($.proxy(this.clickBackToModulesStudents, this));
	
	// Sealed checkbox
	// disabled this.$sealCheckbox.parent().removeClass("thirdState");
	// disabled this.$sealCheckbox.parent().removeAttr("checked");
	// disabled if (sealState == 1) this.$sealCheckbox.parent().addClass("thirdState");
	// disabled else if (sealState == 2) {
	// disabled 	this.$sealCheckbox.parent().attr("checked", "checked");
	// disabled 	this.$sealCheckbox.attr("disabled", "disabled");
	// disabled }
	
	this.plotMatrix(matrix);
	//this.filterIndicatorActivitiesStudentsInModule();
}

SelectedResultsDisplay.prototype.pagesStudents = function(params) {
	var activity = this.resultState.resultsTree.children[ this.resultState.activeSchoolClass ].children[ this.resultState.activeModule ].children[ this.resultState.activeActivity ];
	var matrix = this.buildMatrixPagesActivityStudentsInModule(activity);
	
	var sealState = this.getSealStateSingleActivity(activity);
	console.log(sealState);
	
	this.$bars.hide();
	this.$barPagesStudents.show();
	
	// Build backlink
	var params = {};
	params.module = this.resultState.resultsTree.children[ this.resultState.activeSchoolClass ].children[ this.resultState.activeModule ];
	params.moduleId = this.resultState.activeModule;
	this.$barPagesStudentsBacklink.click($.proxy(this.activitiesStudents, this, params));
	
	// Sealed checkbox
	this.$sealSingleActivityCheckbox.parent().removeClass("thirdState");
	this.$sealSingleActivityCheckbox.removeAttr("checked");
	this.$sealSingleActivityCheckbox.removeAttr("disabled");
	if (sealState == 1) this.$sealSingleActivityCheckbox.parent().addClass("thirdState");
	else if (sealState == 2) {
		this.$sealSingleActivityCheckbox.attr("checked", "checked");
		this.$sealSingleActivityCheckbox.attr("disabled", "disabled");
	}
	
	this.plotMatrix(matrix);
}

/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

SelectedResultsDisplay.prototype.clear = function () {
}

SelectedResultsDisplay.prototype.init = function(resultState) {
	this.resultState = resultState;	
	this.allFilterIndicatorsReset();	
	this.modulesStudents();	
		
	schoolClassName = this.resultState.resultsTree.children[ this.resultState.activeSchoolClass ].label;
	this.$sectionTitle.html( app.getTranslator().translate("NUM_SEC_SELECTEDRESULTS")+" "+schoolClassName );
}

SelectedResultsDisplay.prototype.setHelp = function(url) {
	if (this.$helpContentIFrame.attr('src') != url) this.$helpContentIFrame.attr('src', url );
}

SelectedResultsDisplay.prototype.updateResultTree = function (resultsTree, studentsTree) {
	this.resultState.resultsTree = resultsTree;
	this.resultState.studentsTree = studentsTree;	
}

SelectedResultsDisplay.prototype.showPages = function(resultsTree) {
	this.resultState.resultsTree = resultsTree;
	this.pagesStudents();	
}

SelectedResultsDisplay.prototype.setLoadingTableMessage = function () {
	this.$selectedResultsTable.find("tbody").html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}

SelectedResultsDisplay.prototype.setEmtpyTableMessage = function () {
	this.$selectedResultsTable.find("tbody").html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
}

/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */

SelectedResultsDisplay.prototype.showStudentResults = function(scoId, studentId) {
	this.resultState.activeActivity = scoId;
	this.resultState.activeStudent = studentId;
	app.getPresenterFactory().getSelectedResultsPresenter().showStudentResults(this.resultState, scoId, studentId, this.resultState.activeSchoolClass);
}
SelectedResultsDisplay.prototype.showStudentResultsPage = function(scoId, studentId, page) {
	this.resultState.activeActivity = scoId;
	this.resultState.activeStudent = studentId;
	app.getPresenterFactory().getSelectedResultsPresenter().showStudentResultsPage(this.resultState, scoId, studentId, this.resultState.activeSchoolClass, page);
}

SelectedResultsDisplay.prototype.compareClass = function() {
	app.getPresenterFactory().getSelectedResultsPresenter().compareSchoolClasses(this.resultState);
}

SelectedResultsDisplay.prototype.print = function() {
	app.getPresenterFactory().getSelectedResultsPresenter().print(this.resultState); // TODO more params
}

SelectedResultsDisplay.prototype.sealModuleActivities = function() {
	app.getPresenterFactory().getSelectedResultsPresenter().sealModuleActivities(this.resultState.activeModule, this.resultState.activeSchoolClass);
}

SelectedResultsDisplay.prototype.sealSingleActivity = function() {
	app.getPresenterFactory().getSelectedResultsPresenter().sealSingleActivity(this.resultState.activeActivity, this.resultState.activeSchoolClass);
}

SelectedResultsDisplay.prototype.getPages = function(scoId) {
	this.resultState.activeActivity = scoId;
	app.getPresenterFactory().getSelectedResultsPresenter().preparePages(scoId, this.resultState.activeSchoolClass);	
}

SelectedResultsDisplay.prototype.backToResults = function(scoId) {
	app.getPresenterFactory().getSelectedResultsPresenter().back(this.resultState);	
}

SelectedResultsDisplay.prototype.clearStudentScoResults = function() {
	app.getPresenterFactory().getSelectedResultsPresenter().clearStudentScoResults(this.resultState.activeModule, this.resultState.activeSchoolClass);
}

SelectedResultsDisplay.prototype.logResults = function() {
	var context = this.resultState;
	var scoid = this.resultState.activeActivity;
	var classid = this.resultState.activeSchoolClass;
	app.getPresenterFactory().getSelectedResultsPresenter().showLogResults(context, scoid, classid);
}

/*
 * EVENT HANDLERS
 */

SelectedResultsDisplay.prototype.scrollTableWrap = function(event) {
	var $el = $(event.target);
	var left = event.target.scrollLeft;
	
	if (left + event.target.offsetWidth + 100 > event.target.scrollWidth) {
		$el.addClass('end');
	} else {
		$el.removeClass('end');
	}
	
	if (left < 18) {
		$el.removeClass('active');
		this.setStickyColumn($el,'');
		$el.find('td:first-child span, th:first-child').css('opacity', '1');
	}
	else {
		$el.addClass('active');
		clearTimeout(this.scrollTimer);
		
		if (left > this.prevLeft) {
			$el.find('td:first-child span, th:first-child').css('opacity', '1');
			this.scrollTimer = setTimeout($.proxy(function() { this.setStickyColumn($el,left); }, this), 300);
		}
		else {
			$el.find('td:first-child span, th:first-child').css('opacity', '0');
			this.setStickyColumn($el,left);			
			this.scrollTimer = setTimeout($.proxy(function() { $el.find('td:first-child span, th:first-child').css('opacity', '1'); }, this), 250);
		}
	}
	
	this.prevLeft = left;
}

SelectedResultsDisplay.prototype.setStickyColumn = function($el,leftOffset) {
	if (leftOffset) $el.find('td:first-child span, th:first-child').css('left',(leftOffset-4)+'px');
	else $el.find('td:first-child span, th:first-child').css('left','');
}

SelectedResultsDisplay.prototype.hoverColumnHeader = function(event) {
	var $target = $(event.target);
	
	// Avoid multiple active headers on quick mouse hovers over headers 
	$(".headers .active").not($target).removeClass("active");
	
	if ($target.hasClass('active')) {
		$target.removeClass('active');
		$target.find('a').hide();
	} else {
		$target.addClass('active');
		$target.find('a').show();
	}	
}



// Class / module
SelectedResultsDisplay.prototype.clickModuleResultIndicator = function(params, event) {
	event.preventDefault();		
	//this.activitiesStudent(params);	old single student implementation
	this.activitiesStudents(params);	
}
SelectedResultsDisplay.prototype.clickModuleColumnHeader = function(params, event) {
	event.preventDefault();		
	this.activitiesStudents(params);	
}

SelectedResultsDisplay.prototype.clickBackToResults = function(event) {
	event.preventDefault();		
	this.backToResults();
}

// Activities
SelectedResultsDisplay.prototype.clickResultIndicator = function(params, event) {
	event.preventDefault();		
	this.showStudentResults(params.scoId, params.studentId);	
}

SelectedResultsDisplay.prototype.clickActivityColumnHeader = function(params, event) {
	event.preventDefault();	
	this.getPages(params.scoId);
}

SelectedResultsDisplay.prototype.clickPrintButton = function(event) {
	event.preventDefault();		
	this.print();
}

SelectedResultsDisplay.prototype.clickBackToModulesStudents = function(event) {
	event.preventDefault();		
	this.modulesStudents();
}

// Pages
SelectedResultsDisplay.prototype.clickPageResultIndicator = function(params, event) {
	event.preventDefault();		
	this.showStudentResultsPage(params.scoId, params.studentId, params.pageSequence);	
}


SelectedResultsDisplay.prototype.clickFilterIndicator = function(event) {
	event.preventDefault();	
	var nr = $(event.target).parent().data("filter");	
	if (this.resultState.activeIndicators.indexOf(nr) == -1) this.resultState.activeIndicators.push(nr);
	else {
		this.resultState.activeIndicators.splice(this.resultState.activeIndicators.indexOf(nr),1)	
	} 
	this.changeFiltering();
}

SelectedResultsDisplay.prototype.submitStartCompareClassForm = function(event) {
	event.preventDefault();			
	this.compareClass();
}


SelectedResultsDisplay.prototype.changeSealCheckbox = function(event) {
	event.preventDefault();			
	if (event.target.checked == 1) {
		event.target.disabled = true;
		this.sealModuleActivities();
	}
}

SelectedResultsDisplay.prototype.changeSealSingleActivityCheckbox = function(event) {
	event.preventDefault();			
	if (event.target.checked == 1) {
		event.target.disabled = true;
		this.sealSingleActivity();
	}
}

SelectedResultsDisplay.prototype.submitActivitiesStudentsClearResultsForm = function(event) {
	event.preventDefault();			
	this.clearStudentScoResults();
}


SelectedResultsDisplay.prototype.buildMatrix = function(matrix) {
	var result = "";
	var SEP = "\t";
	var LINE = "\n";
	
	for( var i = 0; i < matrix.length; i++ ) {
		var row = matrix[i];
		for (var j = 0; j < row.length; j++ )  {
			if(j > 0) 
				result = result += SEP;
			result +=  row[j].value
		}
		result = result + LINE;
	}
	return result;
}





SelectedResultsDisplay.prototype.modulesStudentsDownload = function(trigger) {
	console.log("ModulesStudentsDownload trigger");
	var matrix = this.buildMatrixModulesStudentsForClass();
	return this.buildMatrix(matrix);
}

SelectedResultsDisplay.prototype.initModulesStudentsDownload = function(node) {
	var display = this;
	return new ClipboardJS(node, {
	    text: $.proxy(display.modulesStudentsDownload, display)
	});
}

SelectedResultsDisplay.prototype.activitiesStudentsDownload = function(trigger) {
	console.log("ActivitiesStudentsDownload trigger");
	var module = this.resultState.resultsTree.children[ this.resultState.activeSchoolClass ].children[ this.resultState.activeModule ]
	var matrix = this.buildMatrixActivitiesStudentsInModule(module);
	return this.buildMatrix(matrix);
}

SelectedResultsDisplay.prototype.initActivitiesStudentsDownload = function(node) {
	var display = this;
	return new ClipboardJS(node, {
	    text: $.proxy(display.activitiesStudentsDownload, display)
	});
}

SelectedResultsDisplay.prototype.pagesStudentsDownload = function(trigger) {
	console.log("PagesStudentsDownload trigger");
	var module = this.resultState.resultsTree.children[ this.resultState.activeSchoolClass ].children[ this.resultState.activeModule ]
	var activity = module.children[ this.resultState.activeActivity ];
	var matrix = this.buildMatrixPagesActivityStudentsInModule(activity);
	return this.buildMatrix(matrix);
}

SelectedResultsDisplay.prototype.initPagesStudentsDownload = function(node) {
	var display = this;
	return new ClipboardJS(node, {
	    text: $.proxy(display.pagesStudentsDownload, display)
	});
}

SelectedResultsDisplay.prototype.logResultsClick = function(event) {
	event.preventDefault();
	console.log("PagesStudentsLog trigger");
	this.logResults();
}



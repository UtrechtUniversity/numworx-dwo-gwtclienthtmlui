function ResultsDisplay() {	
	this.resultState = {};
	this.resultState.resultsTree = null;
	this.resultState.studentsTree = null;
	this.resultState.activeSchoolClass = null;
	this.resultState.activeCourses = [];
	
	// Forms 
	this.chooseClassModuleForm = document.forms["chooseClassAndModules"];
		
	// jQuery objects
	this.$panel = jQuery("#resultsDisplay");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	this.$chooseClassModuleForm = $(this.chooseClassModuleForm);	
	
	this.$chooseClassRow = this.$chooseClassModuleForm.find("#resultsDisplayChooseClass tbody tr").detach();
	this.$chooseClassTableHead = this.$chooseClassModuleForm.find("#resultsDisplayChooseClass thead");
	this.$chooseClassTableBody = this.$chooseClassModuleForm.find("#resultsDisplayChooseClass tbody");	
	
	this.$chooseModulesRow = this.$chooseClassModuleForm.find("#resultsDisplayChooseModules tbody tr").detach();
	this.$chooseModulesTableHead = this.$chooseClassModuleForm.find("#resultsDisplayChooseModules thead");
	this.$chooseModulesTableBody = this.$chooseClassModuleForm.find("#resultsDisplayChooseModules tbody");
	
	this.$selectAllModules = $("#resultsDisplayChooseModulesSelectAll");
	
			
	// Bind handlers
	this.$chooseClassModuleForm.on('submit', $.proxy(this.submitChooseClassModuleForm,this));
	this.$chooseClassTableHead.find(".sortButton").click(Helpers.clickSortButton);
	this.$chooseModulesTableHead.find(".sortButton").click(Helpers.clickSortButton);
	this.$selectAllModules.on('click', $.proxy(this.clickSelectAllModules,this));
	
	
	// Init
	this.$panel.hide();
}

ResultsDisplay.prototype.show = function() {
    this.localize();
	this.$panel.show();
	this.chooseClassModuleFormToggle();	
	
	//app.mainDisplay.registerStretchables( [ this.$chooseClassTableBody, this.$chooseModulesTableBody  ] );	
	//Helpers.stretchHeight( [ this.$chooseClassTableBody, this.$chooseModulesTableBody  ] )
}


ResultsDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

ResultsDisplay.prototype.resetSorting = function() {
	this.$chooseClassTableHead.find(".sortButton").removeClass("active");
	this.$chooseModulesTableHead.find(".sortButton").removeClass("active");
}

/*
 * GUI FUNCTIONS
 */

ResultsDisplay.prototype.setChooseClassTable = function() {
	var i = 0;
	
	this.$chooseClassTableBody.html("");
	
	for (var id in this.resultState.resultsTree.children) {
		$row = this.$chooseClassRow.clone();
		$row.find("#chooseClassAndModulesClassname").html( Helpers.htmlEscape(this.resultState.resultsTree.children[id].label) ).attr('data-sortvalue', this.resultState.resultsTree.children[id].label).removeAttr("id");
		
		$row.find("input[type='checkbox'],input[type='radio']").each( function(index, el) {
			el.value = id;
			
			// Change ID and label for-attributes
			this.id = this.id + i;				
			oldFor = this.nextElementSibling.getAttribute("for");
			this.nextElementSibling.setAttribute("for", oldFor + i);
		});
		
		if (id == this.resultState.activeSchoolClass) {
			var ms = this.resultState.moduleState + 1
			if ( (ms & 1) == 1)  $row.find("input[name='closed[]']").prop('checked', 'checked');
			if ( (ms & 2) == 2)  $row.find("input[name='open[]']").prop('checked', 'checked');
		}
		
		$row.find("input[name='open[]']").on('click', $.proxy(this.changeCheckboxOpenClosed,this));
		$row.find("input[name='closed[]']").on('click', $.proxy(this.changeCheckboxOpenClosed,this));
		
		this.$chooseClassTableBody.append($row);
		i++;
	}
	
	this.$chooseClassTableHead.find(".sortButton.default").trigger('click');	
	
	this.$chooseModulesTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_NOSELECTEDCLASS' )+'</td></tr>');	
}

ResultsDisplay.prototype.setChooseModulesTable = function() {	
	var i = 0, course, sortedSchoolClassChildren;
	
	this.$chooseModulesTableBody.html("");
	
	if (this.resultState.resultsTree.children[ this.resultState.activeSchoolClass ].children == undefined) {
		this.$chooseModulesTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYMODULES' )+'</td></tr>');	
		return;
	}
	
	sortedSchoolClassChildren = Helpers.getIndexedSortedArray(this.resultState.resultsTree.children[ this.resultState.activeSchoolClass ].children);
	
	for (var n = 0; n < sortedSchoolClassChildren.length; n++) {

		course = sortedSchoolClassChildren[n];
		var ms = this.resultState.moduleState + 1; // invisibile = 1 , normal = 2, remedy = 4
		
		if ( (   (ms & 1) == 0 && course.viewState == "invisible")
	         || ( (ms & 2) == 0 && course.viewState == "studentsAndTeachers")
	         || ( (ms & 4) == 0 && course.viewState == "students")
	          ) {
			// remove from list if previously selected
			if (typeof this.resultState.activeCourses != "undefined" && this.resultState.activeCourses.indexOf(sortedSchoolClassChildren[n].id) != -1) this.resultState.activeCourses.splice(this.resultState.activeCourses.indexOf(sortedSchoolClassChildren[n].id), 1);
			continue; 
		}
		
		var $row = this.$chooseModulesRow.clone();
	
		$row.find("#chooseClassAndModulesModuleName").html( Helpers.htmlEscape(course.label) ).attr('data-sortvalue', course.label).removeAttr("id");
	
		$row.find("input[type='checkbox'],input[type='radio']").each( function(index, el) {
			el.value = sortedSchoolClassChildren[n].id;
		
			// Change ID and label for-attributes
			this.id = this.id + i;				
			oldFor = this.nextElementSibling.getAttribute("for");
			this.nextElementSibling.setAttribute("for", oldFor + i);
		});
		
		if (typeof this.resultState.activeCourses != "undefined" && this.resultState.activeCourses.indexOf(sortedSchoolClassChildren[n].id) != -1) $row.find("input[name='select[]']").prop('checked', 'checked');
	
		$row.find("input[name='select[]']").on('change', $.proxy(this.changeCheckboxSelect,this));
	
		this.$chooseModulesTableBody.append($row);
		i++;
	}
	
	this.$selectAllModules.children().removeClass("active");
	this.$chooseModulesTableHead.find(".sortButton.default").trigger('click');	
	this.chooseClassModuleFormToggle();
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

ResultsDisplay.prototype.init = function () {
	app.mainDisplay.registerStretchables( [ this.$chooseClassTableBody, this.$chooseModulesTableBody  ] );
	this.resultState = {};
	this.resultState.activeCourses = [];
	this.chooseClassModuleFormToggle();
	this.$selectAllModules.removeClass("active");
}

ResultsDisplay.prototype.clear = function () {
	if (this.chooseClassModuleForm.elements['open']) {
		for (var i = 0; i < this.chooseClassModuleForm.elements['open'].length; i++) this.chooseClassModuleForm.elements['open'][i].checked = false;
	}
	if (this.chooseClassModuleForm.elements['closed']) {
		for (var i = 0; i < this.chooseClassModuleForm.elements['closed'].length; i++) this.chooseClassModuleForm.elements['closed'][i].checked = false;
	}
	if (this.chooseClassModuleForm.elements['select[]']) {
		for (var i = 0; i < this.chooseClassModuleForm.elements['select[]'].length; i++) this.chooseClassModuleForm.elements['select[]'][i].checked = false;
	}
	this.resetSorting();
	this.resultState.activeCourses = [];
	this.chooseClassModuleFormToggle();
	this.$selectAllModules.children().removeClass("active");
}

ResultsDisplay.prototype.setHelp = function(url) {
		if (this.$helpContentIFrame.attr('src') != url) this.$helpContentIFrame.attr('src', url );
}

ResultsDisplay.prototype.setResultTree = function (resultTree, studentsTree) {
	this.resultState.resultsTree = resultTree;
	this.resultState.studentsTree = studentsTree;	
	this.setChooseClassTable();
}

ResultsDisplay.prototype.setResultTreeWithContext = function (resultTree, studentsTree, context) {
	this.resultState = context;
	this.resultState.resultsTree = resultTree;
	this.resultState.studentsTree = studentsTree;
	this.setChooseClassTable();
	this.setChooseModulesTable();
	console.log(this.resultState);
}

ResultsDisplay.prototype.setEmptyTableMessage = function () {
	this.$chooseClassTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
}

ResultsDisplay.prototype.setLoadingTableMessage = function () {
	this.$chooseClassTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
	this.$chooseModulesTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}


/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */

ResultsDisplay.prototype.showSelectedResults = function() {	
	app.getPresenterFactory().getResultsPresenter().showSelectedResults( this.resultState, this.resultState.activeSchoolClass, this.resultState.activeCourses );
}


/*
 * EVENT HANDLERS
 */

ResultsDisplay.prototype.changeCheckboxOpenClosed = function(event) {
	var openModules = false, closedModules = false;

	
	
	this.chooseClassModuleFormToggle();
	var ms = this.resultState.moduleState + 1
	if ( (ms & ~1) != 0 && (ms&1)==1 && event.target.name == "closed[]" && this.resultState.activeSchoolClass == event.target.value) {
		this.chooseClassModuleForm.elements["closed[]"][this.chooseClassModuleForm.elements["closed[]"].length-1].checked = true;
		this.resultState.moduleState = ms -1 - 1 ;
	}
	else if ( (ms & ~2) != 0 && (ms&2)==2 && event.target.name == "open[]" && this.resultState.activeSchoolClass == event.target.value) {
		this.chooseClassModuleForm.elements["open[]"][this.chooseClassModuleForm.elements["open[]"].length-1].checked = true;
		this.resultState.moduleState = ms -2 - 1;
	}
	
	if (event.target.checked) {
		// else {
			if (this.resultState.activeSchoolClass != event.target.value) {
				this.resultState.activeCourses = [];
				this.resultState.activeSchoolClass = event.target.value;
			}
			
			
			this.uncheckCheckboxOpenClosedExcept(event.target.value);
			
			for (i = 0; i < this.chooseClassModuleForm.elements["closed[]"].length; i++) {
				if (this.chooseClassModuleForm.elements["closed[]"][i].checked) {				
					closedModules = true;
				}
			}
			
			for (i = 0; i < this.chooseClassModuleForm.elements["open[]"].length; i++) {
				if (this.chooseClassModuleForm.elements["open[]"][i].checked) {				
					openModules = true;
				}
			}
			var ms = 0;
			if (closedModules) ms += 1;
			if (openModules)   ms += 2;
			this.resultState.moduleState = ms-1; // open = 1, closed = 0, both = 2
			
		
	} 

	app.getPresenterFactory().getResultsPresenter().setChooseModulesTable( this.resultState.activeSchoolClass);
}
ResultsDisplay.prototype.uncheckCheckboxOpenClosedExcept = function(id) {
	for (i = 0; i < this.chooseClassModuleForm.elements.length; i++) {
		if ( (this.chooseClassModuleForm.elements[i].name == "open[]" || this.chooseClassModuleForm.elements[i].name == "closed[]")
			&& !this.chooseClassModuleForm.elements[i].disabled && this.chooseClassModuleForm.elements[i].value != id) this.chooseClassModuleForm.elements[i].checked = "";
	}
}

ResultsDisplay.prototype.changeCheckboxSelect = function(event) {
	this.resultState.activeCourses = [];
	
	if (!this.chooseClassModuleForm.elements["select[]"].length) {
		if (this.chooseClassModuleForm.elements["select[]"].checked)  this.resultState.activeCourses.push(this.chooseClassModuleForm.elements["select[]"].value);
	} else {
		for (var i=0 ; i < this.chooseClassModuleForm.elements["select[]"].length; i++) {
			if (this.chooseClassModuleForm.elements["select[]"][i].checked)  this.resultState.activeCourses.push(this.chooseClassModuleForm.elements["select[]"][i].value);
		}
	}
		
	this.chooseClassModuleFormToggle();
}

ResultsDisplay.prototype.submitChooseClassModuleForm = function(event) {
	event.preventDefault();
	if (this.resultState.activeCourses.length > 0) this.showSelectedResults();	
}

ResultsDisplay.prototype.clickSelectAllModules = function(event) {
	event.preventDefault();
	if (typeof this.chooseClassModuleForm.elements["select[]"] == 'undefined' ) return;
	
	$el = $(event.target);
	
	// Check if select all is active, based on the last element
	var selectAllActive = false;
	if (typeof this.chooseClassModuleForm.elements["select[]"].length == 'undefined' && this.chooseClassModuleForm.elements["select[]"].checked) selectAllActive = true;
	else if (typeof this.chooseClassModuleForm.elements["select[]"].length != 'undefined'  && this.chooseClassModuleForm.elements["select[]"][this.chooseClassModuleForm.elements["select[]"].length-1].checked) selectAllActive = true;
	
	if (selectAllActive) {
		if (typeof this.chooseClassModuleForm.elements["select[]"].length == 'undefined') {
			this.chooseClassModuleForm.elements["select[]"].checked = false;
		} else {
			for (var i=0 ; i < this.chooseClassModuleForm.elements["select[]"].length; i++) {
				this.chooseClassModuleForm.elements["select[]"][i].checked = false;
			}
		}
		this.resultState.activeCourses = [];
	} else {
		if (typeof this.chooseClassModuleForm.elements["select[]"].length == 'undefined') {
			this.chooseClassModuleForm.elements["select[]"].checked = true;
			this.resultState.activeCourses.push(this.chooseClassModuleForm.elements["select[]"].value);
		} else {
			for (var i=0 ; i < this.chooseClassModuleForm.elements["select[]"].length; i++) {
				if (!this.chooseClassModuleForm.elements["select[]"][i].checked) {
					this.chooseClassModuleForm.elements["select[]"][i].checked = true;
					this.resultState.activeCourses.push(this.chooseClassModuleForm.elements["select[]"][i].value);
				}  
			}
		}
	}
	
	this.chooseClassModuleFormToggle();
}

//helpers 
ResultsDisplay.prototype.chooseClassModuleFormToggle = function() {
	if ( this.resultState.activeCourses.length > 0 ) this.$chooseClassModuleForm.find(':submit').prop('disabled','');
	else this.$chooseClassModuleForm.find(':submit').prop('disabled','disabled');
}


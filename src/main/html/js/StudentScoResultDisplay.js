function StudentScoResultDisplay() {
	this.resultState = [];
	
	this.studentScoResultActionsForm = document.forms["studentScoResultActions"];
		
	// jQuery objects
	this.$panel = jQuery("#studentScoResult");
	this.$iframe = this.$panel.find("iframe");
	this.$studentScoResultActionsForm = $("this.studentScoResultActionsForm");
	
	this.$closeButton = $("#studentScoResultCloseButton");	
	this.$closeButton.on('click', $.proxy(this.clickStudentScoResultCloseButton, this));
	
	this.$sealButton = $(this.studentScoResultActionsForm.elements["seal"]);
	this.$printButton = $("#studentScoResultPrint");
	this.$downloadButton = $("#studentScoResultDownload");
	this.$logButton = $("#studentScoResultLog");
	this.$nextButton = $("#studentScoResultNext");
	this.$previousButton = $("#studentScoResultPrevious");
	
	this.$nameHeader = $("#studentScoResultName");
	this.$activityHeader = $("#studentScoResultActivity");
	
	// Bind handlers
	this.$sealButton.on('change', $.proxy(this.changeSealButton,this));
	this.$printButton.on('click', $.proxy(this.clickPrintButton, this));	
	this.$downloadButton.on('click', $.proxy(this.clickDownloadButton, this));	
	this.$logButton.on('click', $.proxy(this.clickLogButton, this));	
	this.$nextButton.on('click', $.proxy(this.clickNextButton, this));	
	this.$previousButton.on('click', $.proxy(this.clickPreviousButton, this));	
	
	// Init
	this.$panel.hide();
}

StudentScoResultDisplay.prototype.show = function() {
	window.app.mainDisplay.openLightboxView(this);
    this.localize();
	this.$panel.show();	
	Helpers.stretchIframeHeight( this.$iframe ); // TODO: Action on Resizing
	
	// Temporary hides - TODO: implement
	this.$printButton.hide();
	this.$downloadButton.hide();
	this.$logButton.hide();
}


StudentScoResultDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

StudentScoResultDisplay.prototype.showHideNextAndPrevious = function() { 
	
	this.$previousButton.show();
	this.$nextButton.show()
	
	var first = this.resultState.studentOrder[0]
	var last  = this.resultState.studentOrder[this.resultState.studentOrder.length-1]
	var name = this.resultState.studentsTree.children[this.resultState.activeSchoolClass].children[this.resultState.activeStudent].userName
	if (first == name) this.$previousButton.hide();
	if (last == name) this.$nextButton.hide();
	
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

StudentScoResultDisplay.prototype.init = function (state) {
	var activeActivity, activeStudent;
	this.resultState = state;
	
	// Set header titles
	activeActivity = this.resultState.resultsTree.children[this.resultState.activeSchoolClass].children[this.resultState.activeModule].children[this.resultState.activeActivity];
	activeStudent = this.resultState.studentsTree.children[this.resultState.activeSchoolClass].children[this.resultState.activeStudent];		
	
	
	this.$nameHeader.html(Helpers.htmlEscape(activeStudent.givenName + " " + (activeStudent.insertion ? activeStudent.insertion+" ":"")  + activeStudent.familyName));
	this.$activityHeader.html(Helpers.htmlEscape(activeActivity.label));
	
	this.studentScoResultActionsForm.elements["seal"][1].checked = true;
	for (scoContextId in activeActivity.children) {
		//console.log(activeActivity.children[scoContextId]);
		if (activeActivity.children[scoContextId]["user-id"] == this.resultState.activeStudent && activeActivity.children[scoContextId].completionStatus == "completed") {
			this.studentScoResultActionsForm.elements["seal"][1].checked = false;
			this.studentScoResultActionsForm.elements["seal"][0].checked = true;
			break;
		} 
	}	
	
	this.showHideNextAndPrevious();
	
	this.$iframe.attr('src', '' );
	document.body.scrollTop = 0;
}

StudentScoResultDisplay.prototype.clear = function () {
	this.$iframe.attr('src', '' );
}

StudentScoResultDisplay.prototype.openUrl = function (url) {
	this.$iframe.attr('src', url );
}

StudentScoResultDisplay.prototype.resetSeal = function (bool) {
	this.studentScoResultActionsForm.elements["seal"][1].checked = !bool;
	this.studentScoResultActionsForm.elements["seal"][0].checked = bool;

}


StudentScoResultDisplay.prototype.updateResultTree = function (resultsTree, studentsTree) {
	this.resultState.resultsTree = resultsTree;
	this.resultState.studentsTree = studentsTree;
}

StudentScoResultDisplay.prototype.hide = function () {
	this.$iframe.attr('src', '' );
	window.app.mainDisplay.closeLightboxView(this);
	this.$panel.hide();		
}

StudentScoResultDisplay.prototype.close = function () { console.log("check of je een close doet"); }


/*
 * RETURN FUNCTIONS
 */

StudentScoResultDisplay.prototype.requestClose = function () {
	app.getPresenterFactory().getStudentScoResultPresenter().close(this.resultState);
}

StudentScoResultDisplay.prototype.seal = function (state) {
	app.getPresenterFactory().getStudentScoResultPresenter().sealSingleActivity(state);
}

StudentScoResultDisplay.prototype.print = function () {
	app.getPresenterFactory().getStudentScoResultPresenter().print(this.resultState); 
}

StudentScoResultDisplay.prototype.download = function () {
	app.getPresenterFactory().getStudentScoResultPresenter().download(this.resultState); 
}

StudentScoResultDisplay.prototype.log = function () {
	app.getPresenterFactory().getStudentScoResultPresenter().log(this.resultState); 
}

StudentScoResultDisplay.prototype.showNextStudent = function () {

	var children = this.resultState.studentsTree.children[this.resultState.activeSchoolClass].children;
	var name = children[this.resultState.activeStudent].userName
	for( var id=0; id<this.resultState.studentOrder.length; id++) {
		if (name == this.resultState.studentOrder[id]) {
			name = this.resultState.studentOrder[id+1]
			break;
		}
	}
	
	for (var studentId in children) {
		if (children[studentId].userName == name) break;
	}
	this.resultState.activeStudent = studentId;
	
	app.getPresenterFactory().getStudentScoResultPresenter().showStudentResults(this.resultState, studentId, this.resultState.activeActivity, this.resultState.activeSchoolClass); 
}

StudentScoResultDisplay.prototype.showPreviousStudent = function () {
	var children = this.resultState.studentsTree.children[this.resultState.activeSchoolClass].children;
	var name = children[this.resultState.activeStudent].userName
	for( var id=1; id<this.resultState.studentOrder.length; id++) {
		if (name == this.resultState.studentOrder[id]) {
			name = this.resultState.studentOrder[id-1]
			break;
		}
	}
	
	for (var studentId in children) {
		if (children[studentId].userName == name) break;
	}
	this.resultState.activeStudent = studentId;
	
	app.getPresenterFactory().getStudentScoResultPresenter().showStudentResults(this.resultState, studentId, this.resultState.activeActivity, this.resultState.activeSchoolClass); 
}


/*
 * EVENT HANDLERS
 */

StudentScoResultDisplay.prototype.resizeIframe = function(e) {
	Helpers.stretchHeight( [ this.$iframe ] );
}

StudentScoResultDisplay.prototype.clickStudentScoResultCloseButton = function(event) {
	event.preventDefault();
	this.requestClose();	
}

StudentScoResultDisplay.prototype.changeSealButton = function(event) {
	event.preventDefault();
	if (event.target.value == 1) this.seal(true);	
	else this.seal(false);
}

StudentScoResultDisplay.prototype.clickPrintButton = function(event) {
	event.preventDefault();
	this.print();
}

StudentScoResultDisplay.prototype.clickDownloadButton = function(event) {
	event.preventDefault();
	this.download();
}

StudentScoResultDisplay.prototype.clickLogButton = function(event) {
	event.preventDefault();
	this.log();
}

StudentScoResultDisplay.prototype.clickNextButton = function(event) {
	event.preventDefault();
	this.showNextStudent();
}

StudentScoResultDisplay.prototype.clickPreviousButton = function(event) {
	event.preventDefault();
	this.showPreviousStudent();
}
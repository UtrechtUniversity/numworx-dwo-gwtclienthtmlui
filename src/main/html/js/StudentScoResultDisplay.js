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
	
	this.$nameHeader = $("#studentScoResultName");
	this.$activityHeader = $("#studentScoResultActivity");
	
	// Bind handlers
	this.$sealButton.on('change', $.proxy(this.changeSealButton,this));
	this.$printButton.on('click', $.proxy(this.clickPrintButton, this));	
	this.$downloadButton.on('click', $.proxy(this.clickDownloadButton, this));	
	this.$logButton.on('click', $.proxy(this.clickLogButton, this));	
	
	// Init
	this.$panel.hide();
}

StudentScoResultDisplay.prototype.show = function() {
	window.app.mainDisplay.openLightboxView(this);
	this.$panel.show();	
	Helpers.stretchIframeHeight( this.$iframe ); // TODO: Action on Resizing
	
	//$(window).on('resize', $.proxy(Helpers.resizeHelpSection, this));
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

StudentScoResultDisplay.prototype.clear = function () {
	this.$iframe.attr('src', '' );
}

StudentScoResultDisplay.prototype.init = function (state) {
	console.log("init StudentScoResultDisplay");
	console.log(state);
	
	var activeActivity, activeStudent;
	this.resultState = state;
	
	//console.log(this.resultState.resultsTree.children[this.resultState.activeSchoolClass].children[this.resultState.activeModule].children[this.resultState.activeActivity]);
	//console.log(this.resultState.studentsTree.children[this.resultState.activeSchoolClass].children[this.resultState.activeStudent]);
	
	// Set header titles
	activeActivity = this.resultState.resultsTree.children[this.resultState.activeSchoolClass].children[this.resultState.activeModule].children[this.resultState.activeActivity];
	activeStudent = this.resultState.studentsTree.children[this.resultState.activeSchoolClass].children[this.resultState.activeStudent];		
	
	
	this.$nameHeader.html(activeStudent.givenName + " " + (activeStudent.insertion ? activeStudent.insertion+" ":"")  + activeStudent.familyName);
	this.$activityHeader.html(activeActivity.label);
	
	this.studentScoResultActionsForm.elements["seal"][1].checked = true;
	for (scoContextId in activeActivity.children) {
		console.log(activeActivity.children[scoContextId]);
		if (activeActivity.children[scoContextId]["user-id"] == this.resultState.activeStudent && activeActivity.children[scoContextId].completionStatus == "completed") {
			this.studentScoResultActionsForm.elements["seal"][1].checked = false;
			this.studentScoResultActionsForm.elements["seal"][0].checked = true;
			break;
		} 
	}	
	
	this.$iframe.attr('src', '' );
}


StudentScoResultDisplay.prototype.openUrl = function (url) {
	console.log(url);
	this.$iframe.attr('src', url );
}

StudentScoResultDisplay.prototype.updateResultTree = function (resultsTree, studentsTree) {
	console.log("update trees StudentScoResultDisplay");
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


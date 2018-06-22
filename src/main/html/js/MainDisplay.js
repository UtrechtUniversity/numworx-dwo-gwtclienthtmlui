function MainDisplay() {
	this.activeDialogs = [];
	this.activeLightboxes = [];

	// Bind DOM elements with jQuery
	this.$body = $("body");
	this.$panel = jQuery("#mainPanel");
	this.$panels = this.$panel.find(".panel");	
	this.$subpanels = this.$panel.find(".subpanel");	
	this.$logo = this.$panel.find("#logo");
	this.$nav = this.$panel.find("nav");

	this.$accountMenuSchoolName = jQuery("#accountMenuSchoolName");
	this.$accountMenuUserRole = jQuery("#accountMenuUserRole");
	this.$accountMenuPresentationName = jQuery("#accountMenuPresentationName");
	this.$accountMenuBox = jQuery("#accountMenuBox");
	this.$accountMenuToggle = $("#accountMenuToggle");
	
	
	// Setup Display objects
	this.loginDisplay = new LoginDisplay();
	window.jsLoginDisplay = this.loginDisplay;		
	this.welcomeDisplay = new WelcomeDisplay();
	window.jsWelcomeDisplay = this.welcomeDisplay;
	this.accountDisplay = new AccountDisplay();
	window.jsAccountDisplay = this.accountDisplay;	
	
	// SCHOOLCLASSES
	this.schoolclassesDisplay = new SchoolclassesDisplay();
	window.jsSchoolClassesDisplay = this.schoolclassesDisplay;
	this.editSchoolclassesDisplay = new EditSchoolclassesDisplay();
	window.jsEditSchoolclassDisplay	= this.editSchoolclassesDisplay; 
	// OLD this.studentsInSchoolclassDisplay = new StudentsInSchoolclassDisplay(); // TODO: remove?
	// OLD window.JsStudentsInSchoolclassDisplay	= this.studentsInSchoolclassDisplay; // TODO: remove?
	this.addStudentToSchoolclassDisplay = new AddStudentToSchoolclassDisplay();
	window.jsAddStudentToSchoolclassDisplay	= this.addStudentToSchoolclassDisplay; 
	this.copyOrMoveStudentToSchoolclassDisplay = new CopyOrMoveStudentToSchoolclassDisplay();
	window.jsCopyOrMoveStudentToSchoolclassDisplay = this.copyOrMoveStudentToSchoolclassDisplay;	
	this.addTeacherToSchoolclassDisplay = new AddTeacherToSchoolclassDisplay();
	window.jsAddTeacherToSchoolclassDisplay	= this.addTeacherToSchoolclassDisplay;	
	this.modulesOfSchoolclassDisplay = new ModulesOfSchoolclassDisplay();
	window.jsModulesOfSchoolclassDisplay = this.modulesOfSchoolclassDisplay;
	
	// PERSONS
	this.personsDisplay = new PersonsDisplay();
	window.jsPersonsDisplay = this.personsDisplay;
	this.editPersonDisplay = new EditPersonDisplay();
	window.jsEditPersonDisplay = this.editPersonDisplay;
	this.addPersonDisplay = new AddPersonDisplay();
	window.jsAddPersonDisplay = this.addPersonDisplay;
	
	// RESULTS
	this.resultsDisplay = new ResultsDisplay();
	window.jsResultsDisplay = this.resultsDisplay;
	this.selectedResultsDisplay = new SelectedResultsDisplay();
	window.jsSelectedResultsDisplay = this.selectedResultsDisplay;
	this.studentScoResultDisplay = new StudentScoResultDisplay();
	window.jsStudentScoResultDisplay = this.studentScoResultDisplay;
	this.selectStudentResultsDisplay = new SelectStudentResultsDisplay();
	window.jsSelectStudentResultsDisplay = this.selectStudentResultsDisplay;
	
	// MODULES
	this.modulesDisplay = new ModulesDisplay();
	window.jsModulesDisplay = this.modulesDisplay;
	
		
	// Dialog Displays
	this.msgDialogDisplay = new MsgDialogDisplay();
	window.jsMsgDialogDisplay = this.msgDialogDisplay;
	this.msgDialogWithConfirmDisplay = new MsgDialogWithConfirmDisplay();
	window.jsMessageDialogWithConfirmDisplay = this.msgDialogWithConfirmDisplay;		
	this.alertDialogWithConfirmCancelDisplay = new AlertDialogWithConfirmCancelDisplay();
	window.jsAlertDialogWithConfirmCancelDisplay = this.alertDialogWithConfirmCancelDisplay;	
	this.alertDialogWithConfirmDisplay = new AlertDialogWithConfirmDisplay();
	window.jsAlertDialogWithConfirmDisplay = this.alertDialogWithConfirmDisplay;	
	this.progressDialogWithAbortDisplay = new ProgressDialogWithAbortDisplay();
	window.jsProgressDialogWithAbortDisplay = this.progressDialogWithAbortDisplay;
	
	// Bind events
	$(window).resize(Helpers.resizeHelpSection);
	$(".help h2").click(Helpers.toggleHelpSection);
	this.$logo.on('click', $.proxy(this.clickLogo, this));
	this.$nav.find('a').on('click', $.proxy(this.clickMenuItem, this));
	this.$accountMenuBox.find('a').on('click', $.proxy(this.clickAccountMenuItem, this));
	this.$accountMenuToggle.on('click', $.proxy(this.clickAccountMenuToggle, this));
	
	// Trigger window resize for initial help sizing
	$(window).trigger('resize');
}



MainDisplay.prototype.initMainView = function() { // TODO:	remember state
	this.$panels.hide();
	this.$panel.show();	
	this.$subpanels.hide();
	this.loginDisplay.hide();
	this.setDefaultNavSize();
}

MainDisplay.prototype.setActiveView = function(view) {
	if (view == "LOGOUT") app.getPresenterFactory().getMainPresenter().logout();
}



/*
 * SET MAIN DISPLAY VARIABLES
 * Maps to java implementation
 */

MainDisplay.prototype.setSchoolName = function (schoolName) {
	this.$accountMenuSchoolName.html(schoolName);
};
MainDisplay.prototype.setUserRole = function (role) {
    this.$accountMenuUserRole.html(role);
};
MainDisplay.prototype.setPresentationName = function (presentationName) {
	this.$accountMenuPresentationName.html(presentationName);
};


/*
 * VIEW FUNCTIONS
 * Maps to java implementation
 */

MainDisplay.prototype.showLoginView = function() {
	this.$panel.hide();
	this.loginDisplay.show();
}

MainDisplay.prototype.showWelcomeView = function() {
	this.initMainView();
	this.setExpandedNavSize();
	this.welcomeDisplay.show();
}

MainDisplay.prototype.showAccountView = function(vars) {
	this.initMainView(); 
	this.accountDisplay.show();
}

MainDisplay.prototype.showSchoolclassesView = function(vars) {
	this.initMainView(); 
	this.schoolclassesDisplay.show();
}

MainDisplay.prototype.showEditSchoolclassView = function(vars) { 
	this.initMainView(); 
	this.editSchoolclassesDisplay.show();
}

MainDisplay.prototype.showAddStudentToSchoolClassView = function(vars) { // TODO: Change function name @Gert, capital C
	this.initMainView(); 
	this.addStudentToSchoolclassDisplay.show();
}

MainDisplay.prototype.showCopyOrMoveStudentToSchoolClassView = function() {
	this.initMainView(); 
	this.copyOrMoveStudentToSchoolclassDisplay.show();
}

MainDisplay.prototype.showAddTeacherToSchoolClassView = function(vars) { // TODO: Change function name @Gert, capital C
	this.initMainView(); 
	this.addTeacherToSchoolclassDisplay.show();
}

MainDisplay.prototype.showEditCoursesOfSchoolClassView = function() {
	this.initMainView(); 
	this.modulesOfSchoolclassDisplay.show();
}

MainDisplay.prototype.showPersonsView = function() {
	this.initMainView(); 
	this.personsDisplay.show();
}
MainDisplay.prototype.showEditPersonView = function() {
	this.initMainView(); 
	this.editPersonDisplay.show();
}
MainDisplay.prototype.showAddPersonView = function() {
	this.initMainView(); 
	this.addPersonDisplay.show();
}

MainDisplay.prototype.showResultsView = function() {
	this.initMainView(); 
	this.resultsDisplay.show();
}

MainDisplay.prototype.showSelectedResultsView = function() {
	this.initMainView(); 
	this.selectedResultsDisplay.show();
}

MainDisplay.prototype.showStudentScoResultView = function() {
	this.initMainView(); 
	this.studentScoResultDisplay.show();
}

MainDisplay.prototype.showSelectStudentResultsView = function() {
	this.initMainView(); 
	this.selectStudentResultsDisplay.show();
}

MainDisplay.prototype.showModulesView = function() {
	this.initMainView(); 
	this.modulesDisplay.show();
}



/*
 * DIALOG VIEW HELPERS
 */

MainDisplay.prototype.openDialogView = function(dialog) {
	this.activeDialogs.push(dialog);
	this.$body.addClass("overlay");
}
MainDisplay.prototype.closeDialogView = function(dialog) {
	dialog = this.activeDialogs.pop();
	if (this.activeDialogs.length == 0) this.$body.removeClass("overlay"); // remove overlay
	else this.activeDialogs[this.activeDialogs.length - 1].setFocus(); // or set focus to next dialog
}

/*
 * LIGHTBOX VIEW HELPERS
 */

MainDisplay.prototype.openLightboxView = function(dialog) {
	this.activeLightboxes.push(dialog);
	this.$body.addClass("overlay");
}
MainDisplay.prototype.closeLightboxView = function(dialog) {
	dialog = this.activeLightboxes.pop();
	if (this.activeLightboxes.length == 0) this.$body.removeClass("overlay"); // remove overlay
	else this.activeLightboxes[this.activeLightboxes.length - 1].setFocus(); // or set focus to next dialog
}

/*
 * MENU HELPER
 */

MainDisplay.prototype.setExpandedNavSize = function() {
	this.$panel.addClass("expandedNav");
}
MainDisplay.prototype.setDefaultNavSize = function() {
	this.$panel.removeClass("expandedNav");
}


/*
 * EVENT HANDLERS
 */

MainDisplay.prototype.clickMenuItem = function(event) {
	event.preventDefault();
	var view = event.currentTarget.hash.substr(1);
	if (view) this.setActiveView(view)
}
MainDisplay.prototype.clickAccountMenuItem = function(event) {
	event.preventDefault();
	var view = event.currentTarget.hash.substr(1);
	if (view) {
		this.$accountMenuBox.toggle();
		this.setActiveView(view);
	}
}
MainDisplay.prototype.clickAccountMenuToggle = function(event) {
	this.$accountMenuBox.toggle();
}
MainDisplay.prototype.clickLogo = function(event) {
	event.preventDefault();
	var view = event.currentTarget.hash.substr(1);
	if (view) this.setActiveView(view)
}


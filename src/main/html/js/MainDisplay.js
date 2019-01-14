function MainDisplay() {
	this.activeDialogs = [];
	this.activeLightboxes = [];
	this.stretchables = [];

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
	this.importPersonsDisplay = new ImportPersonsDisplay();
	window.jsImportPersonsDisplay = this.importPersonsDisplay;
	
	// RESULTS
	this.resultsDisplay = new ResultsDisplay();
	window.jsResultsDisplay = this.resultsDisplay;
	this.selectedResultsDisplay = new SelectedResultsDisplay();
	window.jsSelectedResultsDisplay = this.selectedResultsDisplay;
	this.studentScoResultDisplay = new StudentScoResultDisplay();
	window.jsStudentScoResultDisplay = this.studentScoResultDisplay;
	this.selectStudentResultsDisplay = new SelectStudentResultsDisplay();
	window.jsSelectStudentResultsDisplay = this.selectStudentResultsDisplay;
	this.logResultsDisplay = new LogResultsDisplay();
	window.jsLogResultsDisplay = this.logResultsDisplay;
	
	// MODULES
	this.modulesDisplay = new ModulesDisplay();
	window.jsModulesDisplay = this.modulesDisplay;
	
	// ORGANISATION
	this.organisationDisplay = new OrganisationDisplay();
	window.jsOrganisationDisplay = this.organisationDisplay;
	
		
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
	$(window).resize( $.proxy(this.resizeWindow, this) );
	$(".help h2").click(Helpers.toggleHelpSection);
	$(".help .closeButton").click(Helpers.toggleHelpSection);
	this.$logo.on('click', $.proxy(this.clickLogo, this));
	this.$nav.find('a').on('click', $.proxy(this.clickMenuItem, this));
	this.$accountMenuBox.find('a').on('click', $.proxy(this.clickAccountMenuItem, this));
	this.$accountMenuToggle.on('mouseenter', $.proxy(this.mouseEnterAccountMenuIcon, this));
	this.$accountMenuToggle.on('touchstart', $.proxy(this.touchStartAccountMenuIcon, this));
	this.$accountMenuBox.on('mouseleave', $.proxy(this.mouseLeaveAccountMenuIcon, this));
	$(document).on('click, touchstart', $.proxy(this.clickWherever, this));
	
	$("input").focus(function(event) {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		event.preventDefault();
	});
		
	// Trigger window resize for initial help sizing
	$(window).trigger('resize');
}

MainDisplay.prototype.init = function() {
	// Localize title
	document.title = "Numworx " + app.getTranslator().translate( 'NUM_APP_TEACHER' );
	
	// Localize logo
	if (Helpers.getUrlParameter('locale') == 'en') {
		this.$body.addClass("localeEn");
		this.$logo.find('img').attr('src', 'images/header-logoNumworxTeacher.png');
	}
}

MainDisplay.prototype.initMainView = function() { // TODO:	remember state
	this.$panels.hide();
		
	if (!this.$panel.is(":visible")) {
		this.$panel.show();
	} 
	this.$subpanels.hide();
	this.loginDisplay.hide();
	this.setDefaultNavSize();
	this.removeHoverableOnTouchDevices();
    this.localize();
}

MainDisplay.prototype.setActiveView = function(view) {
	if (view == "LOGOUT") app.getPresenterFactory().getMainPresenter().logout();
	else app.getPresenterFactory().getMainPresenter().selectView(view);
}



/*
 * SET MAIN DISPLAY VARIABLES
 * Maps to java implementation
 */

MainDisplay.prototype.setSchoolName = function (schoolName) {
	this.$accountMenuSchoolName.html(schoolName);
};
MainDisplay.prototype.setUserRole = function (role) {
	this.$body.removeClass("ANONYMOUS");
	this.$body.removeClass("TEACHER");
	this.$body.removeClass("SCHOOLADMIN");
	this.$body.addClass(role);
	role = app.getTranslator().translate( 'NUM_APP_' + role);
    this.$accountMenuUserRole.html(role);
	document.title = "Numworx " + role;
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
	this.$panel.show();
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

MainDisplay.prototype.showLogResultsView = function() {
	this.initMainView();
	this.logResultsDisplay.show();
}

MainDisplay.prototype.showSelectStudentResultsView = function() {
	this.initMainView(); 
	this.selectStudentResultsDisplay.show();
}

MainDisplay.prototype.showModulesView = function() {
	this.initMainView(); 
	this.modulesDisplay.show();
}

MainDisplay.prototype.showImportPersonsView = function() {
	this.initMainView();
	this.importPersonsDisplay.show();
}

MainDisplay.prototype.showOrganisationView = function() {
	this.initMainView();
	this.organisationDisplay.show();
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
	//this.activeLightboxes.push(dialog);
	this.$body.addClass("overlay");
}
MainDisplay.prototype.closeLightboxView = function(dialog) {
	//dialog = this.activeLightboxes.pop();
	//if (this.activeLightboxes.length == 0) this.$body.removeClass("overlay"); // remove overlay
	//else this.activeLightboxes[this.activeLightboxes.length].setFocus(); // or set focus to next dialog
	// 
	 this.$body.removeClass("overlay");
}

/*
 * HELP HELPERS
 */

MainDisplay.prototype.openHelp = function(dialog) {	
	this.$body.addClass("overlay");
	this.$body.addClass("helpOpen");
}
MainDisplay.prototype.closeHelp = function(dialog) {	
	 this.$body.removeClass("overlay");
	 this.$body.removeClass("helpOpen");
}

/*
 * MENU HELPER
 */

MainDisplay.prototype.setExpandedNavSize = function() {
	this.$panel.addClass("expandedNav");
	// this.$panel.removeClass("collapsedNav");
}
MainDisplay.prototype.setDefaultNavSize = function() {
	this.$panel.removeClass("expandedNav");
	// this.$panel.addClass("collapsedNav");
}

MainDisplay.prototype.hideNav = function() {
	this.$panel.addClass("hiddenNav");
}
MainDisplay.prototype.showNav = function() {
	this.$panel.removeClass("hiddenNav");
}
MainDisplay.prototype.isNavVisible = function() {
	return this.$panel.hasClass("hiddenNav") ? false : true; 
}


/*
 * OTHER HELPERS
 */

MainDisplay.prototype.removeHoverableOnTouchDevices = function() {
	var isTouchDevice = ('ontouchstart' in window || 'onmsgesturechange' in window);
	if (isTouchDevice) {
		$("table.hoverable").removeClass("hoverable");
	}
}


/*
 * RESIZING
 */

MainDisplay.prototype.resizeWindow = function(event) {
	Helpers.resizeHelpSection();
	this.closeHelp();
	this.resizeStrechables();
		
}
MainDisplay.prototype.registerStretchables = function( elements ) {
	if (elements.length < 1) return;
	
	for (i=0; i<elements.length; i++) {
		if ( this.stretchables.indexOf(elements[i]) === -1) {
			this.stretchables.push( elements[i] );
		}
	}
	this.resizeStrechables();
}
MainDisplay.prototype.resizeStrechables = function() {
	if (this.stretchables.length < 1) return; 
	
	bodyHeight = $(document.body).outerHeight();
		
	for(i=0; i<this.stretchables.length; i++) {
		subpanel = this.stretchables[i].closest('.subpanel');
		
		if (subpanel.data('originalHeight')) subpanelHeight = subpanel.data('originalHeight');
		else {
			subpanelHeight = subpanel.outerHeight();
			subpanel.data('originalHeight', subpanelHeight);
		}
		freeSpace = bodyHeight - subpanelHeight;
				
		newHeight = this.stretchables[i].height() + freeSpace;
		this.stretchables[i].height(newHeight+"px");
	}
	this.$subpanels.removeData('originalHeight');
	return;
}


/*
 * EVENT HANDLERS
 */

MainDisplay.prototype.clickMenuItem = function(event) {
	event.preventDefault();
	var view = event.currentTarget.hash.substr(1);
	if (view) this.setActiveView(view);
}
MainDisplay.prototype.clickAccountMenuItem = function(event) {
	event.preventDefault();
	var view = event.currentTarget.hash.substr(1);
	if (view) {
		this.$accountMenuBox.toggle();
		this.setActiveView(view);
	}
}
MainDisplay.prototype.mouseEnterAccountMenuIcon = function(event) {
	this.$accountMenuBox.show();
}
MainDisplay.prototype.touchStartAccountMenuIcon = function(event) {
	if (this.$accountMenuBox.is(":visible")) this.$accountMenuBox.hide();
	else this.$accountMenuBox.show();
}
MainDisplay.prototype.mouseLeaveAccountMenuIcon = function(event) {
	this.$accountMenuBox.hide();
}
MainDisplay.prototype.clickWherever = function(event) {
	if (this.$accountMenuBox.is(":visible")) {
		$el = $(event.target)
		if ($el.closest("#accountMenuToggle").length == 0
			&& $el.closest("#accountMenuBox").length == 0) {
			this.$accountMenuBox.hide();
		}
		//event.preventDefault();
	}
}


MainDisplay.prototype.clickLogo = function(event) {
	event.preventDefault();
	var view = event.currentTarget.hash.substr(1);
	if (view) this.setActiveView(view)
}

MainDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}
	
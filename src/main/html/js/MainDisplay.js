function MainDisplay() {
	this.activeDialogs = [];
	this.activeLightboxes = [];
	this.stretchables = [];
	this.resizecallback = {};

	// Bind DOM elements with jQuery
	this.$body = $("body");
	this.$panel = jQuery("#mainPanel");
	this.$panels = this.$panel.find(".panel");	
	this.$subpanels = this.$panel.find(".subpanel");	
	this.$logo = this.$panel.find("#logo");
	this.$nav = this.$panel.find("nav");
	this.$menuToggle = $("#menuToggle");

	this.$accountMenuSchoolName = jQuery("#accountMenuSchoolName");
	this.$accountMenuUserRole = jQuery("#accountMenuUserRole");
	this.$accountMenuPresentationName = jQuery("#accountMenuPresentationName");
	this.$accountMenuBox = jQuery("#accountMenuBox");
	this.$accountMenuToggle = $("#accountMenuToggle");
	this.$headerPresentationName = $("#headerPresentationName");
	this.$headerArrowUp = $("#headerArrowUp");
	this.searchBox = document.forms['searchBox'];
	this.$searchBox = $(this.searchBox)
	this.$trails = jQuery("#headertrails")
	
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
	this.addStudentToSchoolclassDisplay = new AddStudentToSchoolclassDisplay();
	window.jsAddStudentToSchoolclassDisplay	= this.addStudentToSchoolclassDisplay; 
	this.copyOrMoveStudentToSchoolclassDisplay = new CopyOrMoveStudentToSchoolclassDisplay();
	window.jsCopyOrMoveStudentToSchoolclassDisplay = this.copyOrMoveStudentToSchoolclassDisplay;	
	this.addTeacherToSchoolclassDisplay = new AddTeacherToSchoolclassDisplay();
	window.jsAddTeacherToSchoolclassDisplay	= this.addTeacherToSchoolclassDisplay;	
	this.modulesOfSchoolclassDisplay = new ModulesOfSchoolclassDisplay();
	window.jsModulesOfSchoolclassDisplay = this.modulesOfSchoolclassDisplay;
	
	this.studentSchoolclassesDisplay = new StudentSchoolclassesDisplay();
	window.jsStudentSchoolclassDisplay = this.studentSchoolclassesDisplay;
	
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
	
	this.studentResultsDisplay = new StudentResultsDisplay();
	window.jsStudentResultsDisplay = this.studentResultsDisplay;
	this.studentResultsGraphDisplay = new StudentResultsGraphDisplay();
	window.jsStudentResultsGraphDisplay = this.studentResultsGraphDisplay;

	
	// MODULES
	this.modulesDisplay = new ModulesDisplay();
	window.jsModulesDisplay = this.modulesDisplay;
	this.editorDisplay = new EditorDisplay();
	window.jsEditorDisplay = this.editorDisplay;
	
	// ORGANISATION
	this.organisationDisplay = new OrganisationDisplay();
	window.jsOrganisationDisplay = this.organisationDisplay;
	
	// STUDENTMODEL
	this.teacherStudentModelDisplay = new TeacherStudentModelDisplay();
	window.jsTeacherStudentModelDisplay = this.teacherStudentModelDisplay;
	this.teacherSMClassResultsDisplay = new TeacherSMClassResultsDisplay();
	window.jsTeacherSMClassResultsDisplay = this.teacherSMClassResultsDisplay;
	this.teacherClassFilterDisplay = new TeacherClassFilterDisplay;
	window.jsTeacherClassFilterDisplay = this.teacherClassFilterDisplay;
	
	// CHATBOX
	this.chatboxDisplay = new ChatboxDisplay();
	window.jsChatboxDisplay = this.chatboxDisplay;
	
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
	//this.$menuToggle.on('mouseenter', $.proxy(this.mouseEnterMenuIcon, this));
	this.$menuToggle.on('click', $.proxy(this.touchStartMenuIcon, this));
	
	this.$accountMenuBox.find('a').on('click', $.proxy(this.clickAccountMenuItem, this));
	//this.$accountMenuToggle.on('mouseenter', $.proxy(this.mouseEnterAccountMenuIcon, this));
	this.$accountMenuToggle.on('click', $.proxy(this.touchStartAccountMenuIcon, this));
	//this.$accountMenuBox.on('mouseleave', $.proxy(this.mouseLeaveAccountMenuIcon, this));
	this.$headerArrowUp.on("click", $.proxy(this.onArrowUp, this));
	$(document).on('click, touchstart', $.proxy(this.clickWherever, this));
	this.$searchBox.on('submit' , $.proxy(this.search, this))
	this.$headerArrowUp.hide();
	this.$searchBox.hide();
	this.$trails.hide();
	
	/*$("input").focus(function(event) {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		event.preventDefault();
	});*/
		
	// Trigger window resize for initial help sizing
	$(window).trigger('resize');
	
	this.entree(); // patch a.href with=entree
}

MainDisplay.prototype.init = function() {
	// Localize title
	document.title = "Numworx";
	
	// Localize logo
	if (Helpers.getUrlParameter('locale') == 'en') {
		this.$body.addClass("localeEn");
		//this.$logo.find('img').attr('src', 'images/header-logoNumworxTeacher.png');
	}
}

MainDisplay.prototype.initMainView = function() { // TODO:	remember state
	this.$panels.hide();
	this.$headerArrowUp.hide();
	this.$searchBox.hide();
	this.$trails.hide();
		
	if (!this.$panel.is(":visible")) {
		//this.$panel.show();
		this.$panel.addClass("active");
	}

	this.$subpanels.hide();
	this.loginDisplay.hide();
	this.setDefaultNavSize();
	this.removeHoverableOnTouchDevices();
    this.localize();
    this.chatboxDisplay.setVisible(false);
    this.$body.removeClass("collapsed");
}

MainDisplay.prototype.setActiveView = function(view) {
	if (view == "SEARCH") app.getPresenterFactory().getMainPresenter().search(this.getSearchInput());
	else if (view == "LOGOUT") app.getPresenterFactory().getMainPresenter().logout();
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
	this.$body.removeClass("STUDENT");
	this.$body.removeClass("SINGLESTUDENT");
	this.$body.addClass(role);
	role = app.getTranslator().translate( 'NUM_APP_' + role);
    this.$accountMenuUserRole.html(role);
	document.title = "Numworx " + role;
	this.$logo.find("span").html(role);
};

MainDisplay.prototype.setPremium = function (set) {
	if (set) this.$body.addClass("premium");
	else this.$body.removeClass("premium");
}

MainDisplay.prototype.setModulesOnly = function (set) {
	if (set) this.$body.addClass("modules-only");
	else this.$body.removeClass("modules-only");
}

MainDisplay.prototype.setPresentationName = function (presentationName) {
	presentationName = Helpers.htmlEscape(presentationName)
	this.$accountMenuPresentationName.html(presentationName);
	this.$headerPresentationName.html(presentationName);
};

MainDisplay.prototype.getSearchInput = function() {
	return this.searchBox.elements["searchInput"].value;
}

MainDisplay.prototype.setTrails = function(row) {
	if (!row) {
		this.$trails.hide();
		this.$searchBox.show();
	} else {
		this.$trails.show();
		this.$searchBox.hide();
		this.$trails.html("")
		for(var i = 0; i < row.length; i++) {
			var item = row[i];
			var title = Helpers.htmlEscape(item.title);
			var command = Helpers.htmlEscape(item.command);
			var $a = $("<a href='#" + command + "'>" + title + "</a>");
			$a.on("click", $.proxy(this.clickMenuItem, this));
			this.$trails.append($a);
			this.$trails.append(" &gt; ");
		}
	}
	
}

MainDisplay.prototype.selectView = function(view) {
	this.$nav.find("ul").attr('class', view);
}

MainDisplay.prototype.setIdleTimeout = function(millis) {
    this.unsetIdleTimeout();
	this.$body.idle( {
		onIdle: $.proxy(this.onIdle, this),
		idle: millis
	});
}
MainDisplay.prototype.unsetIdleTimeout = function() {
	this.$body.trigger("idle:stop");
}


/*
 * VIEW FUNCTIONS
 * Maps to java implementation
 */

MainDisplay.prototype.showLoginView = function() {
	//this.$panel.hide();
	this.$panel.removeClass("active");
	this.loginDisplay.show();
}

MainDisplay.prototype.showWelcomeView = function() {
	this.initMainView();
	this.setExpandedNavSize();
	this.welcomeDisplay.show();
	//this.$panel.show();
	this.$panel.addClass("active");
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

MainDisplay.prototype.showStudentResultsView = function() {
	this.initMainView();
	this.studentResultsDisplay.show();
}
MainDisplay.prototype.showStudentResultsGraphView = function() {
	this.initMainView();
	this.studentResultsGraphDisplay.show();
}
MainDisplay.prototype.showSelectedResultsView = function() {
	this.initMainView(); 
	this.selectedResultsDisplay.show();
}

MainDisplay.prototype.showStudentScoResultView = function() {
	//this.initMainView(); 
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
	this.setArrowUp(true);
	this.setSearchBox(true); // optional, not for activities.
	this.$body.addClass("collapsed");
	this.modulesDisplay.show();
}

MainDisplay.prototype.showEditorView = function() {
	this.initMainView();
	this.editorDisplay.show();
}

MainDisplay.prototype.showImportPersonsView = function() {
	this.initMainView();
	this.importPersonsDisplay.show();
}

MainDisplay.prototype.showOrganisationView = function() {
	this.initMainView();
	this.organisationDisplay.show();
}

MainDisplay.prototype.showStudentSchoolclassView = function() {
	this.initMainView();
	this.studentSchoolclassesDisplay.show();
}

MainDisplay.prototype.showTeacherStudentModelView = function() {
	this.initMainView();
	this.teacherStudentModelDisplay.show();
}

MainDisplay.prototype.showTeacherSMClassResultsView = function() {
	this.initMainView();
	this.teacherSMClassResultsDisplay.show();
}

MainDisplay.prototype.showTeacherClassFilterView = function() {
	this.initMainView();
	this.teacherClassFilterDisplay.show();
}

MainDisplay.prototype.showChatboxView = function() {
	this.initMainView()
	this.chatboxDisplay.show()
}

MainDisplay.prototype.onArrowUp = function() {
	app.getPresenterFactory().getMainPresenter().onArrowUp()
}

MainDisplay.prototype.setArrowUp = function(show) {
	if (show)
		this.$headerArrowUp.show();
	else 
		this.$headerArrowUp.hide();
}
MainDisplay.prototype.setSearchBox = function(show) {
	this.$trails.hide()
	if (show)
		this.$searchBox.show();
	else 
		this.$searchBox.hide();
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

MainDisplay.prototype.hideChat = function() {
	this.$body.addClass("hiddenChat");
}
MainDisplay.prototype.showChat = function() {
	this.$body.removeClass("hiddenChat");
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
	this.resizeCallbacks();
	this.resizeTbodies();
}
MainDisplay.prototype.registerStretchables = function( elements ) {
	this.resizeTbodies();
	return; // turn off for now
	if (elements.length < 1) return;
	
	for (i=0; i<elements.length; i++) {
		if ( this.stretchables.indexOf(elements[i]) === -1) {
			this.stretchables.push( elements[i] );
		}
	}
	this.addClassToStretchables();
	this.resizeStrechables();	
}

MainDisplay.prototype.registerCallback = function (key,  f ) {
	this.resizecallback[key] = f;
}

MainDisplay.prototype.resizeCallbacks = function() {
	for( var key in this.resizecallback) {
	 if ( this.resizecallback.hasOwnProperty(key)) {
	 	var f = this.resizecallback[key];
	 	f();
	 }
	}
}


MainDisplay.prototype.resizeStrechables = function() {
	if (this.stretchables.length < 1) return; 
	
	bodyHeight = $(document.body).outerHeight();

	// First set height to 0, to be able to calculate the free space
	for(i=0; i<this.stretchables.length; i++) {
		this.stretchables[i].height("0px");
	}
	
	newHeight = Array();
	for(i=0; i<this.stretchables.length; i++) {
		subpanel = this.stretchables[i].closest('.subpanel');
		
		if (subpanel.data('originalHeight')) subpanelHeight = subpanel.data('originalHeight');
		else {
			subpanelHeight = subpanel.outerHeight();
			subpanel.data('originalHeight', subpanelHeight);
		}
		freeSpace = bodyHeight - subpanelHeight;
				
		//newHeight = this.stretchables[i].height() + freeSpace;
		newHeight[i] = this.stretchables[i].height() + freeSpace;
		//this.stretchables[i].height(newHeight+"px");
	}

	for(i=0; i<this.stretchables.length; i++) {
		this.stretchables[i].height(newHeight[i]+"px");
	}

	this.$subpanels.removeData('originalHeight');
	return;
}

MainDisplay.prototype.addClassToStretchables = function() {
	for(i=0; i<this.stretchables.length; i++) {
		this.stretchables[i].addClass('stretchable');
	}
}

MainDisplay.prototype.resizeTbodies = function() {
	$('section .grow > table tbody').css('height', '');
	$('section:visible .grow > table tbody tr').css('display', 'none');
	$('section:visible .grow > table tbody').each(function() {
		var $table = $(this);
		var $rows = $table.find('tr').detach();
		// Clear tbody
		$table.empty();
		
		// $table top offset relative to parent
		var offset = $table.offset().top - $table.parent().offset().top;		
		var height = $table.parent().outerHeight();
		height = height - offset;
		
		// set height
		$table.height(height);
		// Add rows
		$rows.each(function() {
			$table.append($(this));
		});
	});
	$('.grow > table tbody tr').css('display', 'table');
}

/*
 * EVENT HANDLERS
 */

MainDisplay.prototype.search = function(event) {
	event.preventDefault();
	var view = 'SEARCH';
	this.setActiveView(view)
}
MainDisplay.prototype.mouseEnterMenuIcon = function(event) {
	this.$nav.addClass('open');
	this.$accountMenuBox.hide();
}
MainDisplay.prototype.touchStartMenuIcon = function(event) {
	event.preventDefault();
	if (this.$nav.hasClass("open")) {
		this.$nav.removeClass("open");
	} else {
		this.$nav.addClass("open");
		this.$accountMenuBox.hide();
	} 
}
MainDisplay.prototype.clickMenuItem = function(event) {
	event.preventDefault();
	this.$nav.removeClass("open");
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
	else {
		this.$nav.removeClass("open");
		this.$accountMenuBox.show();
	} 
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
	this.$accountMenuBox.hide();
	this.$nav.removeClass("open");
	if (view) this.setActiveView(view)
}

MainDisplay.prototype.clickArrowUp = function(event) {
	event.preventDefault();
	this.onArrowUp();
}
MainDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}
	
MainDisplay.prototype.onIdle = function() {
	app.getPresenterFactory().getMainPresenter().onIdle();
}

MainDisplay.prototype.entree = function() {
	var entree = $("#withidphint");
	var hint = entree.attr("href");
	if (!hint) return;
    var h = ""
	var top = window.top.location.href;
	var query = top.indexOf("?");
	var hash = top.indexOf("#", query+1);
	if (hash >= 0) {
		h = top.substring(hash);
		top = top.substring(0, hash);
	}
	if (query >= 0) {
	  if (top.indexOf(hint.substring(1))<0) {
			top = top + "&" + hint.substring(1);
	  }
	} else {
		top = top + hint;
	}
	top = top + h;
	entree.attr("href", top);	
}
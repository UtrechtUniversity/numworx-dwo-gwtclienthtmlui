function DwoUiSchoolclasses() {	
	// Setup properties
	this.panel = jQuery("#sectionSchoolclasses");

	// Init
	this.panel.hide();
}

DwoUiSchoolclasses.prototype.show = function() {
	this.panel.show();
}
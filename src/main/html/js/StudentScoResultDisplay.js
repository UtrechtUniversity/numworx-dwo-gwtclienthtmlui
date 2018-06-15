function StudentScoResultDisplay() {
	this.resultState = [];
		
	// jQuery objects
	this.$panel = jQuery("#studentScoResult");
	this.$iframe = this.$panel.find("iframe");
	
	this.$closeButton = $("#studentScoResultCloseButton");
	
	this.$closeButton.on('click', $.proxy(this.clickStudentScoResultCloseButton, this));
	
	// Init
	this.$panel.hide();
}

StudentScoResultDisplay.prototype.show = function() {
	window.app.mainDisplay.openLightboxView(this);
	this.$panel.show();
	
	Helpers.stretchIframeHeight( this.$iframe );
	
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
	this.resultState = state;
	
	this.$iframe.attr('src', '' );
}


StudentScoResultDisplay.prototype.openUrl = function (url) {
	this.$iframe.attr('src', url );
}

StudentScoResultDisplay.prototype.updateResultTree = function (resultsTree, studentsTree) {
	this.resultState.resultsTree = resultsTree;
	this.resultState.studentsTree = studentsTree;
}

/*
 * EVENT HANDLERS
 */

StudentScoResultDisplay.prototype.resizeIframe = function(e) {
	Helpers.stretchHeight( [ this.$iframe ] );
}

StudentScoResultDisplay.prototype.clickStudentScoResultCloseButton = function(event) {
	event.preventDefault();
	window.app.mainDisplay.closeLightboxView(this);
	this.$panel.hide();		
	console.log("close");
}


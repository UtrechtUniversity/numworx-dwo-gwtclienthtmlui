function SelectStudentResultsDisplay() {	
	// jQuery objects
	this.$panel = jQuery("#modulesDisplayPanel");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	this.$iframe = this.$panel.find("iframe");
	
	// Init
	this.$panel.hide();
}

SelectStudentResultsDisplay.prototype.show = function() {
        this.localize();
	this.$panel.show();
	
	Helpers.stretchIframeHeight( this.$iframe );
	
	//$(window).on('resize', $.proxy(Helpers.resizeHelpSection, this));
}


SelectStudentResultsDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

SelectStudentResultsDisplay.prototype.clear = function () {
	this.$iframe.attr('src', '' );
}

SelectStudentResultsDisplay.prototype.init = function (context) {
	this.$iframe.attr('src', '' );
}

SelectStudentResultsDisplay.prototype.setHelp = function(url) {
		if (this.$helpContentIFrame.attr('src') != url) this.$helpContentIFrame.attr('src', url );
}


SelectStudentResultsDisplay.prototype.openUrl = function (url) {
	this.$iframe.attr('src', url );
}

/*
 * EVENT HANDLERS
 */

SelectStudentResultsDisplay.prototype.resizeIframe = function(e) {
	Helpers.stretchHeight( [ this.$iframe ] );
}
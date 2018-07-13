function ModulesDisplay() {	
	// jQuery objects
	this.$panel = jQuery("#modulesDisplayPanel");
	this.$iframe = this.$panel.find("iframe");
	
	// Init
	this.$panel.hide();
}

ModulesDisplay.prototype.show = function() {
        this.localize();
	this.$panel.show();
	Helpers.stretchIframeHeight( this.$iframe );
	$(window).on('resize', $.proxy(Helpers.resizeHelpSection, this));
}

ModulesDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

ModulesDisplay.prototype.init = function () {
	// do nothing
}
ModulesDisplay.prototype.clear = function () {
	this.$iframe.attr('src', '' );
}
ModulesDisplay.prototype.openUrl = function (url) {
	this.$iframe.attr('src', url );
}

ModulesDisplay.prototype.setMainNavVisible = function(b) {
	console.log("teunis implementeert setMainNavVisible " + b);
}

ModulesDisplay.prototype.isMainNavVisible = function() {
	return true; // dummy, totdat teunis bovenstaande heeft geimplementeerd.
}

/*
 * EVENT HANDLERS
 */

ModulesDisplay.prototype.resizeIframe = function(e) {
	Helpers.stretchHeight( [ this.$iframe ] );
}


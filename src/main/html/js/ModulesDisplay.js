function ModulesDisplay() {	
	// jQuery objects
	this.$panel = jQuery("#modulesDisplayPanel");
	this.$iframe = this.$panel.find("iframe");
	
	// Init
	this.$panel.hide();
}

ModulesDisplay.prototype.show = function() {
	app.mainDisplay.registerStretchables( [ this.$panel ] );
	this.$iframe.ready(function() { $(window).trigger('resize'); });
        this.localize();
	this.$panel.show();
	//$(window).on('resize', $.proxy(Helpers.resizeHelpSection, this));
}

ModulesDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

ModulesDisplay.prototype.init = function () {
	document.body.scrollTop = 0;
}
ModulesDisplay.prototype.clear = function () {
    this.$iframe.remove()
	this.$iframe.attr('src', '' );
	this.$panel.append(this.$iframe)
}
ModulesDisplay.prototype.openUrl = function (url) {
    this.$iframe.remove()
	this.$iframe.attr('src', url );
	this.$panel.append(this.$iframe)
}

ModulesDisplay.prototype.setMainNavVisible = function(b) {
	//console.log("teunis implementeert setMainNavVisible " + b);
	if (b) app.mainDisplay.showNav();
	else app.mainDisplay.hideNav();
}

ModulesDisplay.prototype.isMainNavVisible = function() {
	return app.mainDisplay.isNavVisible();
}

ModulesDisplay.prototype.sendMessage = function(message) {
	var domain = window.location.protocol + "//" + window.location.host;
	this.$iframe[0].contentWindow.postMessage(message, domain);
}

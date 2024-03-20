/**
 * Editor Display 
 */
 
function EditorDisplay() {
 	this.$panel = jQuery("#editorDisplay");
 	this.$iframe = this.$panel.find("iframe");
 	this.$panel.hide();
 }
 
EditorDisplay.prototype.show = function() {
	app.mainDisplay.registerStretchables( [ this.$iframe ] );
	this.$iframe.ready(function() { $(window).trigger('resize'); });
    this.localize();
	this.$panel.show();
	
	//$(window).on('resize', $.proxy(Helpers.resizeHelpSection, this));
}

EditorDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

EditorDisplay.prototype.init = function () {
	document.body.scrollTop = 0;
}
EditorDisplay.prototype.clear = function () {
	this.$iframe.attr('src', '' );
}
EditorDisplay.prototype.openUrl = function (url) {
	this.$iframe.attr('src', url );
}
 
EditorDisplay.prototype.sendMessage = function(message) {
	var domain = window.location.protocol + "//" + window.location.host;
	this.$iframe[0].contentWindow.postMessage(message, domain);
}
 
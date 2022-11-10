/**
 * Chatbox functions
 */
 function ChatboxDisplay() {
 	this.$panel = $("#chatboxDisplayPanel")
 	this.$iframe = this.$panel.find("#chatboxframe");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
 	this.$panel.hide()
 }
 
 ChatboxDisplay.prototype.show = function() {
 	app.mainDisplay.registerStretchables( [ this.$iframe ] );
 	this.$iframe.ready(function() { $(window).trigger('resize'); });
 	this.$panel.show();
 }
 
 ChatboxDisplay.prototype.init = function() {
 }
 
 ChatboxDisplay.prototype.clear = function() {
 	this.openUrl('about:blank')
 }
 
ChatboxDisplay.prototype.openUrl = function (url) {
	this.$iframe.attr('src', url );
}

ChatboxDisplay.prototype.setLogin = function(user) {
	window.chatUser = user;
}

ChatboxDisplay.prototype.setHelp = function(url) {
	if (this.$helpContentIFrame.attr('src') != url) this.$helpContentIFrame.attr('src', url );
}
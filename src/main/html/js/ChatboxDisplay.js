/**
 * Chatbox functions
 */
 function ChatboxDisplay() {
 	this.$panel = $("#chatboxDisplayPanel")
 	this.$iframe = this.$panel.find("#chatboxframe");
 	this.$panel.hide()
 }
 
 ChatboxDisplay.prototype.show = function() {
 	this.$panel.show();
 	Helpers.stretchIframeHeight( this.$iframe );
 }
 
 ChatboxDisplay.prototype.init = function() {
 	app.mainDisplay.registerStretchables( [ this.$iframe ] );
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
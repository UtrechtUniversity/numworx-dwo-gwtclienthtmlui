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
 }
 
 ChatboxDisplay.prototype.init = function() {
 }
 
 ChatboxDisplay.prototype.clear = function() {
 	this.openUrl('about:blank')
 }
 
 ChatboxDisplay.prototype.openUrl = function (url) {
	this.$iframe.attr('src', url );
}
 
/**
 * Chatbox functions
 */
 function ChatboxDisplay() {
 	this.$panel = $("#chatboxDisplayPanel")
 	
 	this.$panel.hide()
 }
 
 ChatboxDisplay.prototype.show = function() {
 	this.$panel.show();
 }
 
 ChatboxDisplay.prototype.init = function() {
 }
 
 ChatboxDisplay.prototype.clear = function() {
 }
 
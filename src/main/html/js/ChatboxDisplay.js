/**
 * Chatbox functions
 */
 function ChatboxDisplay() {
 	this.$panel = $("#chatboxDisplayPanel")
 	this.$iframe = this.$panel.find("#chatboxframe");
 	this.$nav = $('#chatboxNav');
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
 	this.$panel.hide()
 }
 
 ChatboxDisplay.prototype.show = function() {
 	app.mainDisplay.registerStretchables( [ this.$iframe ] );
 	this.$iframe.ready(function() { $(window).trigger('resize'); });
 	this.$panel.show();
 	this.setVisible(true);
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

ChatboxDisplay.prototype.setUnseen = function (b) {
	if (b) this.$nav.addClass('unseen')
	else this.$nav.removeClass('unseen');
}

ChatboxDisplay.prototype.setChatVisible = function (o) {
	this.$chat = o;
}

ChatboxDisplay.prototype.setVisible = function(b) {
	if (this.$chat) {
		if (b) {
			this.$chat.shown();
		} else {
			this.$chat.hidden();
		}
	}
}
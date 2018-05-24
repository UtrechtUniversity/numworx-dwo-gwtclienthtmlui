function WelcomeDisplay() {
	
	// Setup properties
	this.$panel = jQuery("#welcomeDisplayPanel");
	this.$welcomeText = jQuery("#welcomeText");
	
	// Init
	this.$panel.hide();
}

WelcomeDisplay.prototype.show = function() {
	console.log("show welcome");
	this.$panel.show();
	Helpers.stretchHeight( [ this.$welcomeText ]);
}

WelcomeDisplay.prototype.clear = function() {
	//this.$panel.find(".content").html("");
}

WelcomeDisplay.prototype.setWelcomeText = function(html) {
	this.$welcomeText.html(html);
}
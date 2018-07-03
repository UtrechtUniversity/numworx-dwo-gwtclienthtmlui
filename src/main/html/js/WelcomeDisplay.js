function WelcomeDisplay() {
	
	// Setup properties
	this.$panel = jQuery("#welcomeDisplayPanel");
	this.$welcomeText = jQuery("#welcomeText");
	
	// Init
	this.$panel.hide();
}

WelcomeDisplay.prototype.show = function() {
        this.localize();
	this.$panel.show();
	Helpers.stretchHeight( [ this.$welcomeText ]);
}

WelcomeDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

WelcomeDisplay.prototype.clear = function() {
	this.$welcomeText.html("");
}

WelcomeDisplay.prototype.setWelcomeText = function(html) {
	this.$welcomeText.html(html);
}
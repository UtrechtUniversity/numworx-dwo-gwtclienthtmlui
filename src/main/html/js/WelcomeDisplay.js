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
}

WelcomeDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

WelcomeDisplay.prototype.init = function() {
	app.mainDisplay.registerStretchables( [ this.$welcomeText  ] );
	document.body.scrollTop = 0;
}

WelcomeDisplay.prototype.clear = function() {
	this.$welcomeText.html("");
}

WelcomeDisplay.prototype.setWelcomeText = function(html) {
	this.$welcomeText.append(html);
	this.$welcomeText.find("a").on('click', $.proxy(this.clickHyperlink, this));
}

/*
 * EVENTS
 */

WelcomeDisplay.prototype.clickHyperlink = function(event) {
	var view = event.currentTarget.hash.substr(1);
	if (view) {
		event.preventDefault(); // Only prevent default if navigation link
		app.mainDisplay.setActiveView(view);
	}
}
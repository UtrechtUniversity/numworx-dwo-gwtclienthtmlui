/**
 * Tried to follow Google's Javascript Styleguide
 * https://google.github.io/styleguide/javascriptguide.xml?showone=Nested_functions#Nested_functions
 *
 * Variables starting with a $ tells you they are jQuery objects.
 *
 * @author T.D. van Wijngaarden
 */

function MainApp() {	
	this.mainDisplay = new MainDisplay();
	window.jsMainDisplay = this.mainDisplay; // make it available for API
	
	this.NAV_WIDTH = 200;	
}

MainApp.prototype.getPresenterFactory = function() {
	if (this.presenterFactory) return this.presenterFactory;
	this.presenterFactory = window.dwoAPI.DwoPresenterFactory.getDwoPresenterFactory();
	return this.presenterFactory = this.presenterFactory.getFac();
}

$(document).ready(function(){ 
	window.app = new MainApp();
	
	setTimeout(function() { app.getPresenterFactory().loginPresenter.loginClicked("teuniz", "nizteu2", false); }, 1000); // temporary auto login
	//setTimeout(function() { app.getPresenterFactory().loginPresenter.loginClicked("teuniz2", "niz2-adm", false); }, 1000); // temporary auto login
});
	
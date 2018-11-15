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
	
	
	this.presenterFactory = null;
	this.translator = null;
	
	this.NAV_WIDTH = 200;	
}

MainApp.prototype.reset = function() {
	this.presenterFactory = null;
	this.translator = null;	
}

MainApp.prototype.getPresenterFactory = function() {
	if (this.presenterFactory) return this.presenterFactory;
	this.presenterFactory = window.dwoAPI.DwoPresenterFactory.getDwoPresenterFactory();
	return this.presenterFactory = this.presenterFactory.getFac();
}

MainApp.prototype.getTranslator = function() {
	if (this.translator) return this.translator;
	this.translator = new window.dwoAPI.jsDwoMessageTranslator();
	return this.translator;
}

//$(document).ready(function(){ 
//	window.app = new MainApp();	
//});

window.jsInitMainApp = function() {
	window.app = new MainApp();	
	app.mainDisplay.init();
}

window.jsResetMainApp = function() {
	app.reset();
}


	
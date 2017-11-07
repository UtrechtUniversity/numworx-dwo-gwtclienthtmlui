/*
 * Tried to follow Google's Javascript Styleguide
 * https://google.github.io/styleguide/javascriptguide.xml?showone=Nested_functions#Nested_functions
 */

function DwoUi() {

	// Setup Views
	this.loginObj = new DwoUiLogin($.proxy(this.loggedIn, this));
	this.schoolclassesObj = new DwoUiSchoolclasses();
	
	this.init();
}

DwoUi.prototype.init = function() {
	this.loginObj.show();
}
DwoUi.prototype.loggedIn = function() {
	this.schoolclassesObj.show();
}

$(document).ready(function(){ 
	new DwoUi();
});

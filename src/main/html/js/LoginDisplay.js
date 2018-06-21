function LoginDisplay() {
	
	this.loginForm = document.forms["login"];
	
	
	// Setup properties
	this.$panel = jQuery("#loginDisplayPanel");
	this.$loginForm = $(this.loginForm);
	this.usernameField = this.loginForm.elements["username"];
	this.passwordField = this.loginForm.elements["password"];
	
	this.$warningBox = $("#loginDisplayPanelWarningBox");
	this.$messageBox = $("#loginDisplayPanelMessageBox");

	// Bind handlers
	this.$loginForm.on('submit', $.proxy(this.submitLoginForm,this));
	
	// Init
	this.$warningBox.hide();
	this.$messageBox.hide();
	this.$panel.hide();
}

/*
 * GUI FUNCTIONS
 */

LoginDisplay.prototype.show = function() {
	this.$panel.show();
}

LoginDisplay.prototype.disable = function() {
	this.usernameField.disabled = true;
	this.passwordField.disabled = true;
}
LoginDisplay.prototype.enable = function() {
	this.usernameField.value = "";
	this.passwordField.value = "";
	this.usernameField.disabled = false;
	this.passwordField.disabled = false;
}

/*
 * VIEW FUNCTIONS
 */

LoginDisplay.prototype.hide = function() {	
	this.$panel.hide();
}
LoginDisplay.prototype.init = function() {	
}


LoginDisplay.prototype.showMessage = function(msg) {
	this.$messageBox.find(".content").html(msg);
	this.$messageBox.show();
}
LoginDisplay.prototype.showWarning = function(msg) {
	this.$warningBox.html(msg);
	this.$warningBox.show();
	this.enable();
}
LoginDisplay.prototype.hideMsgBox = function(msg) {
	this.$messageBox.hide();
}

/*
 * RETURN FUNCTIONS
 */

LoginDisplay.prototype.loginAttempt = function(username, password) {
	app.getPresenterFactory().getLoginPresenter().loginClicked(username, password, false);
}

/*
 * EVENT HANDLERS
 */

LoginDisplay.prototype.submitLoginForm = function(event) {
	event.preventDefault();
	
	var username = this.usernameField.value, 
	    password = this.passwordField.value;
	
	this.disable();
	
	console.log(username);
	console.log(password);
	
	this.loginAttempt(username, password);	
};



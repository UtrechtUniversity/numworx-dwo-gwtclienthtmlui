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
	var loginGuestBtn = this.loginForm.elements["guestlogin"];
	
	$(loginGuestBtn).on('click', $.proxy(this.submitLoginGuest, this));
	
	$("#loginLinks").find("a").on('click', $.proxy(this.clickHyperlink, this));
	
	// Init
	this.$warningBox.hide();
	this.$messageBox.hide();
	this.$panel.hide();
}

/*
 * GUI FUNCTIONS
 */

LoginDisplay.prototype.show = function() {
	this.localize();
		
	this.$panel.show();
}

LoginDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
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

LoginDisplay.prototype.clickHyperlink = function(event) {
	var view = event.currentTarget.hash.substr(1);
	if (view) {
		event.preventDefault(); // Only prevent default if navigation link
		app.getPresenterFactory().getLoginPresenter().hyperlink(view);
	}
}

/*
 * VIEW FUNCTIONS
 */

LoginDisplay.prototype.hide = function() {	
	this.$panel.hide();
}
LoginDisplay.prototype.init = function() {	
	this.enable();
}


LoginDisplay.prototype.showMessage = function(msg) {
	this.$messageBox.find(".content").html(msg);
	this.$messageBox.show();
	this.enable();
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
LoginDisplay.prototype.loginGuest = function() {
	app.getPresenterFactory().getLoginPresenter().loginGuest();
}
/*
 * EVENT HANDLERS
 */

LoginDisplay.prototype.submitLoginForm = function(event) {
	event.preventDefault();
	
	var username = this.usernameField.value, 
	    password = this.passwordField.value;
	
	this.disable();

//security bug    
//	console.log(username);
//	console.log(password);
	
	this.loginAttempt(username, password);	
};

LoginDisplay.prototype.submitLoginGuest = function(event) {
	event.preventDefault();
	this.disable();
	this.loginGuest();
}


function DwoUiLogin(callback) {
	
	// Setup properties
	this.panel = jQuery("#sectionLogin");
	this.form = jQuery("#formLogin");

	this.success = callback;

	// Bind handlers
	this.form.on('submit', $.proxy(this.login,this));
	
	// Init
	this.panel.hide();
}

DwoUiLogin.prototype.show = function() {
	this.panel.show();
}

DwoUiLogin.prototype.login = function(event) {
	event.preventDefault();
	
	var username = this.form.find('input[name="username"]').val(), password = this.form.find('input[name="password"]').val();
	
	usr = DwoLoginPresenter.loginClicked(username,password);
	if (usr == "done") {
		this.panel.hide();
		this.success();
	} else {
		alert("fout");
		return;
	} 
};


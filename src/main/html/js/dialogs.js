/*
 * DIALOG
 * 
 * Classes for five types of dialogs:
 * - MsgDialogDisplay
 * - MsgDialogWithConfirmDisplay
 * - AlertDialogWithConfirmCancelDisplay
 * - AlertDialogWithConfirmDisplay
 * - ProgressDialogWithAbortDisplay
 *
 */


/*
 * MsgDialogDisplay
 */

function MsgDialogDisplay() {
	this.active = false;
	
	// jQuery objects
	this.$dialog = $("#MsgDialogDisplay");
	this.$message = $("#MsgDialogDisplayMessage");
	this.$confirmButton = $("#MsgDialogDisplayConfirmButton");
	
	// Bind handlers
	this.$confirmButton.on('click', $.proxy(this.clickConfirm,this));
	
	// Init
	this.$dialog.hide();
}
MsgDialogDisplay.prototype.clear = function() {
}
MsgDialogDisplay.prototype.init = function() {
}
MsgDialogDisplay.prototype.showDialog = function(text) {	
	if(this.active == false) window.app.mainDisplay.openDialogView(this);
	this.$dialog.show();
	this.$message.html(text);
	this.$confirmButton.focus();
	this.active = true;	
	
}
MsgDialogDisplay.prototype.hideDialog = function(event) {
	this.$dialog.hide();	
	this.$message.html("");
	this.active = false;
	window.app.mainDisplay.closeDialogView(this);
}
MsgDialogDisplay.prototype.clickConfirm = function(event) {
	app.getPresenterFactory().msgDialogDisplayPresenter.confirm();
	//this.hideDialog();
}
MsgDialogDisplay.prototype.setFocus = function() {
	this.$confirmButton.focus();
}


/*
 * MsgDialogWithConfirmDisplay
 */

function MsgDialogWithConfirmDisplay() {
	this.active = false;
	
	// jQuery objects
	this.$dialog = $("#MsgDialogWithConfirmDisplay");
	this.$message = $("#MsgDialogWithConfirmDisplayMessage");
	this.$confirmButton = $("#MsgDialogWithConfirmDisplayConfirmButton");
	
	// Bind handlers
	this.$confirmButton.on('click', $.proxy(this.clickConfirm,this));
	
	// Init
	this.$dialog.hide();
	
}
MsgDialogWithConfirmDisplay.prototype.clear = function() {}
MsgDialogWithConfirmDisplay.prototype.init = function() {}
MsgDialogWithConfirmDisplay.prototype.showDialog = function(text) {	
	if(this.active == false) window.app.mainDisplay.openDialogView(this);
	this.$dialog.show();
	this.$message.html(text);
	this.$confirmButton.focus();
	this.active = true;	
	
}
MsgDialogWithConfirmDisplay.prototype.hideDialog = function() {
	this.$dialog.hide();	
	this.$message.html("");
	this.active = false;
	window.app.mainDisplay.closeDialogView(this);
}
MsgDialogWithConfirmDisplay.prototype.clickConfirm = function(event) {
	app.getPresenterFactory().msgDialogWithConfirmPresenter.confirm();
	//this.hideDialog();
}
MsgDialogWithConfirmDisplay.prototype.setFocus = function() {
	this.$confirmButton.focus();
}


/*
 * AlertDialogWithConfirmCancelDisplay
 */

function AlertDialogWithConfirmCancelDisplay() {
	this.active = false;
	
	// jQuery objects
	this.$dialog = $("#AlertDialogWithConfirmCancelDisplay");
	this.$message = $("#AlertDialogWithConfirmCancelDisplayMessage");
	this.$confirmButton = $("#AlertDialogWithConfirmCancelDisplayConfirmButton");
	this.$cancelButton = $("#AlertDialogWithConfirmCancelDisplayCancelButton");
	
	// Bind handlers
	this.$confirmButton.on('click', $.proxy(this.clickConfirm,this));
	this.$cancelButton.on('click', $.proxy(this.clickCancel,this));
	
	// Init
	this.$dialog.hide();
}
AlertDialogWithConfirmCancelDisplay.prototype.clear = function() {}
AlertDialogWithConfirmCancelDisplay.prototype.init = function() {}
AlertDialogWithConfirmCancelDisplay.prototype.showDialog = function(text) {	
	if(this.active == false) window.app.mainDisplay.openDialogView(this);
	this.$dialog.show();
	this.$message.html(text);
	this.$confirmButton.focus();
	this.active = true;	
	
}
AlertDialogWithConfirmCancelDisplay.prototype.hideDialog = function(event) {
	this.$dialog.hide();	
	this.$message.html("");
	this.active = false;
	window.app.mainDisplay.closeDialogView(this);
}
AlertDialogWithConfirmCancelDisplay.prototype.clickConfirm = function(event) {
	app.getPresenterFactory().alertDialogWithConfirmCancelPresenter.confirm();
	//this.hideDialog();	
}
AlertDialogWithConfirmCancelDisplay.prototype.clickCancel = function(event) {
	app.getPresenterFactory().alertDialogWithConfirmCancelPresenter.cancel();
	//this.hideDialog();	
}
AlertDialogWithConfirmCancelDisplay.prototype.setFocus = function() {
	this.$confirmButton.focus();
}


/*
 * AlertDialogWithConfirmDisplay
 */

function AlertDialogWithConfirmDisplay() {
	this.active = false;
	
	// jQuery objects
	this.$dialog = $("#AlertDialogWithConfirmDisplay");
	this.$message = $("#AlertDialogWithConfirmDisplayMessage");
	this.$confirmButton = $("#AlertDialogWithConfirmDisplayConfirmButton");
	
	// Bind handlers
	this.$confirmButton.on('click', $.proxy(this.clickConfirm,this));
	
	// Init
	this.$dialog.hide();
}
AlertDialogWithConfirmDisplay.prototype.clear = function() {}
AlertDialogWithConfirmDisplay.prototype.init = function() {}
AlertDialogWithConfirmDisplay.prototype.showDialog = function(text) {	
	if(this.active == false) window.app.mainDisplay.openDialogView(this);
	this.$dialog.show();
	this.$message.html(text);
	this.$confirmButton.focus();
	this.active = true;
	
}
AlertDialogWithConfirmDisplay.prototype.hideDialog = function(event) {
	this.$dialog.hide();	
	this.$message.html("");
	this.active = false;
	window.app.mainDisplay.closeDialogView(this);
}
AlertDialogWithConfirmDisplay.prototype.clickConfirm = function(event) {
	app.getPresenterFactory().alertDialogWithOKPresenter.hide();
	//this.hideDialog();
}
AlertDialogWithConfirmDisplay.prototype.setFocus = function() {
	this.$confirmButton.focus();
}


/*
 * ProgressDialogWithAbortDisplay
 */

function ProgressDialogWithAbortDisplay() {
	this.active = false;
	
	// jQuery objects
	this.$dialog = $("#progressDialogWithAbortDisplay");
	this.$message = $("#ProgressDialogWithAbortDisplayMessage");
	this.$abortButton = $("#ProgressDialogWithAbortDisplayAbortButton");
	this.$progressBarBar = $("#ProgressBarBar");
	
	// Bind handlers
	this.$abortButton.on('click', $.proxy(this.clickAbort,this));
	
	// Init
	this.$dialog.hide();
}
ProgressDialogWithAbortDisplay.prototype.clear = function() {
	this.$progressBarBar.width(0+"px");
	this.$message.html("");
}
ProgressDialogWithAbortDisplay.prototype.init = function() {
	this.$progressBarBar.width(0+"px");
	this.$message.html("");
}
ProgressDialogWithAbortDisplay.prototype.showDialog = function(text) {	
	if(this.active == false) window.app.mainDisplay.openDialogView(this);
	this.$dialog.show();
	this.$message.html(text);
	this.$abortButton.focus();
	this.active = true;
	
}
ProgressDialogWithAbortDisplay.prototype.hideDialog = function() {
	this.$dialog.hide();	
	this.$message.html("");
	this.active = false;
	window.app.mainDisplay.closeDialogView(this);
}

ProgressDialogWithAbortDisplay.prototype.updateDialog = function(progress, actMsg) {
 	this.$message.html(actMsg);
	this.$progressBarBar.width(progress+'%');
}
ProgressDialogWithAbortDisplay.prototype.clickAbort = function(event) {
	app.getPresenterFactory().ProgressDialogWithAbortPresenter.abort();
	//this.hideDialog();

}
ProgressDialogWithAbortDisplay.prototype.setFocus = function() {
	this.$abortButton.focus();
}


/**
 * LogResultsDisplay
 */


function LogResultsDisplay() {
	this.$panel = jQuery("#logResultsDisplay");
	this.$activityHeader = $("#logResultsActivity");
	this.$activitySchoolclass = $("#logResultsName");
	this.$closeButton = $("#logResultsCloseButton")
	this.$closeButton.on('click', $.proxy(this.clickLogResultsCloseButton, this));

	this.$panel.hide();

}

LogResultsDisplay.prototype.show = function() {
	window.app.mainDisplay.openLightboxView(this);
	this.$panel.show();
}

LogResultsDisplay.prototype.hide = function() {
	window.app.mainDisplay.closeLightboxView(this);
	this.$panel.hide();		

}

LogResultsDisplay.prototype.clear = function() {
}

LogResultsDisplay.prototype.init = function (state) {
	this.resultState = state;
	var activeSchoolClass = this.resultState.resultsTree.children[this.resultState.activeSchoolClass];
	var activeActivity = activeSchoolClass.children[this.resultState.activeModule].children[this.resultState.activeActivity];
	this.$activityHeader.html(activeActivity.label);
	this.$activitySchoolclass.html(activeSchoolClass.label);

}

/*
 * RETURN FUNCTIONS
 */

LogResultsDisplay.prototype.requestClose = function () {
	app.getPresenterFactory().getLogResultsPresenter().close(this.resultState);
}

/*
 * EVENT FUNCTIONS
 */


LogResultsDisplay.prototype.clickLogResultsCloseButton = function(event) {
	event.preventDefault();
	this.requestClose();	
}
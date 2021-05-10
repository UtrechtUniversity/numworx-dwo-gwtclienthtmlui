/**
 * Student Results Graph, aka DomainModels for students Graph lightbox
 */
 
function StudentResultsGraphDisplay() {
 	this.resultState = {};
 	this.$panel = jQuery("#studentResultsGraphDisplayPanel");
 	this.$widget = $( "#"+ this.getId() );
 	this.$title  = $("#studentResultsGraphDomain");
 	this.$user   = $("#studentResultsGraphUser");
 	this.$panel.hide();
	this.$closeButton = $("#studentResultsGraphCloseButton");	
	this.$closeButton.on('click', $.proxy(this.clickCloseButton, this));
}
 
StudentResultsGraphDisplay.prototype.getId = function() {
 	return "studentResultsGraph";
}
 
StudentResultsGraphDisplay.prototype.init = function (state) {
	this.resultState = state;
	this.$title.html(Helpers.htmlEscape(state.title));
	this.$user.html(Helpers.htmlEscape(state.user||""));
}

StudentResultsGraphDisplay.prototype.clear = function () {
	this.$widget.html("");
}


StudentResultsGraphDisplay.prototype.show = function() {
	window.app.mainDisplay.openLightboxView(this);
	app.mainDisplay.registerStretchables( [ this.$widget ] );
    this.localize();
	this.$panel.show();
	Helpers.stretchHeight([ this.$widget ]);
}

StudentResultsGraphDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

StudentResultsGraphDisplay.prototype.hide = function () {
	window.app.mainDisplay.closeLightboxView(this);
	this.$panel.hide();		
}

StudentResultsGraphDisplay.prototype.close = function () { console.log("check of je een close doet"); }

/*
 * RETURN FUNCTIONS
 */

StudentResultsGraphDisplay.prototype.requestClose = function () {
	app.getPresenterFactory().getResultsGraphPresenter().close(this.resultState);
}

/*
 * EVENT HANDLERS
 */


StudentResultsGraphDisplay.prototype.clickCloseButton = function(event) {
	event.preventDefault();
	this.requestClose();	
}


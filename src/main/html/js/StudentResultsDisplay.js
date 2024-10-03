/**
 * Student Results, aka DomainModels for students.
 */
 
function StudentResultsDisplay() {
 	this.$panel = jQuery("#studentResultsDisplayPanel");
 	this.$widget = $( "#"+ this.getId() );
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
 	this.$panel.hide();
}
 
StudentResultsDisplay.prototype.getId = function() {
 	return "studentResultsWidget";
}
 
StudentResultsDisplay.prototype.init = function () {
    this.localize();
	document.body.scrollTop = 0;
}

StudentResultsDisplay.prototype.clear = function () {
	this.$widget.html("");
}


StudentResultsDisplay.prototype.show = function() {
	app.mainDisplay.registerStretchables( [ this.$widget ] );
	this.$panel.show();
	Helpers.stretchHeight([ this.$widget ]);
}

StudentResultsDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

/**
 * setHelp shows help url
 */
StudentResultsDisplay.prototype.setHelp = function(url) {
		Helpers.setIframeSrc(this.$helpContentIFrame, url)
}

StudentResultsDisplay.prototype.setTitle = function(title) {
	$('#studentResultsDisplayTitle').text(title)
}


/**
 * ImportPersonsDisplay
 */

function ImportPersonsDisplay() {
	this.$panel = jQuery("#importPersonsDisplay");

}

ImportPersonsDisplay.prototype.show = function() {

	console.log("display imports persons");
	this.$panel.show();

}
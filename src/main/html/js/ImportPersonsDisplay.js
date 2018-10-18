/**
 * ImportPersonsDisplay
 */

function ImportPersonsDisplay() {
	this.$panel = jQuery("#importPersonsDisplay");
}

ImportPersonsDisplay.prototype.show = function() {
	this.$panel.show();
}

ImportPersonsDisplay.prototype.clear = function () {	
}

ImportPersonsDisplay.prototype.init = function() {}
ImportPersonsDisplay.prototype.setSchoolClasses = function(data) {}
ImportPersonsDisplay.prototype.setEmptyPeopleTableMessage = function() {}
ImportPersonsDisplay.prototype.setLoadingPeopleTableMessage = function() {}
ImportPersonsDisplay.prototype.setEmptySchoolClassesTableMessage = function() {}
ImportPersonsDisplay.prototype.setLoadingSchoolClassesTableMessage = function() {}
ImportPersonsDisplay.prototype.setHelp = function(url) {}
ImportPersonsDisplay.prototype.setPersonImportList = function(listObject) {}
ImportPersonsDisplay.prototype.showSchoolClasses = function(mapObject) {}

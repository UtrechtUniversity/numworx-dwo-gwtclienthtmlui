function ModulesOfSchoolclassDisplay() {	
	// GWT vars
	
	
	// Forms 
	
	// Buttons 
	
	// jQuery objects
	this.$panel = jQuery("#modulesOfSchoolclassDisplay");
		
	// Bind handlers
	
	// Init
	this.$panel.hide();
}

ModulesOfSchoolclassDisplay.prototype.show = function() {
	this.$panel.show();
}

/*
 * GUI FUNCTIONS
 */



/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

ModulesOfSchoolclassDisplay.prototype.clear = function () {
	console.log("clear");
}

ModulesOfSchoolclassDisplay.prototype.init = function () {
	console.log("init");
}

ModulesOfSchoolclassDisplay.prototype.setEmptyTableMessageModules = function () {
	console.log("setEmptyTableMessageModules");
}
ModulesOfSchoolclassDisplay.prototype.setLoadingTableMessageModules = function () {
	console.log("setLoadingTableMessageModules");
}
ModulesOfSchoolclassDisplay.prototype.setEmptyTableMessageSelected = function () {
	console.log("setEmptyTableMessageSelected");
}
ModulesOfSchoolclassDisplay.prototype.setLoadingTableMessageSelected = function () {
	console.log("setLoadingTableMessageSelected");
}


ModulesOfSchoolclassDisplay.prototype.updateTable = function(json) {
	console.log("UPDATE!");
	console.log(json);	
}
ModulesOfSchoolclassDisplay.prototype.setTree = function(json) {
	console.log("SET TREE");
	console.log(json);	
}



/*
 * RETURN FUNCTIONS
 * Use java callbacks

@JsMethod
   void detachItemFromSchoolClass(ClassCourseItem classCourseItem) 
@JsMethod
   void attachItemToSchoolClass(ClassCourseItem classCourseItem)
@JsMethod
   void setModuleSettings(String key, String typeString, String fromData, String toData, String accessKey)
 */


/*
 * EVENT HANDLERS
 */

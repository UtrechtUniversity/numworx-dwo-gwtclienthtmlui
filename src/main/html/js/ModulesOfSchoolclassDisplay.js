function ModulesOfSchoolclassDisplay() {	
	// GWT vars
	
	
	// Forms 
	
	// Buttons 
	
	// jQuery objects
	this.$panel = jQuery("#modulesOfSchoolclassDisplay");
	this.$treeWrapper = jQuery("#modulesOfSchoolclassDisplayTreeWrapper");
		
	// Bind handlers
	
	// Init
	this.$panel.hide();
}

ModulesOfSchoolclassDisplay.prototype.show = function() {
	console.log("#show")
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
	window.jsMainDisplay.showEditCoursesOfSchoolClassView(); // TODO: REMOVE!!
	
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
	
	var tree = json.jsObject, result, $result;
	
	var result = this.recursiveTreeBuilder(tree);
	
	result = '<ul id ="modulesOfSchoolclassDisplayTree" class="tree">'+result+'</li>';
	$result = $(result);
	$result.find("li.hasSub a").click(Helpers.clickTreeNode);
	
	this.$treeWrapper.html("");
	this.$treeWrapper.append($result);
	Helpers.stretchHeight( [this.$treeWrapper] );
}

ModulesOfSchoolclassDisplay.prototype.recursiveTreeBuilder = function(tree, depth = 0, checkboxId = 0) {
	var result, subtree, liClass, aClass, checkboxId, checked;
	
	if (!tree) return; //sometimes it is undefined
	
	if (depth > 0) {
		result = "<ul>";
	} else {
		result = "";
		checkboxId = "modulesOfSchoolclassDisplayTreeCheckbox";
	} 
			
	i = 0;
	
	for (var id in tree) {
		checkboxId += "" + depth + i
		liClass = "";
		aClass = "";
		
		if (tree[id].data.course.withChildren == true) {
			subtree = this.recursiveTreeBuilder(tree[id].children, depth + 1, checkboxId);
			liClass = "hasSub";
			aClass = "folder";			
		}
		else {
			aClass="set";
		}
		
		if (tree[id].data.classcourse != null) checked = 'checked="checked"';
		else checked = "";
		
		result += '<li class="'+liClass+'">';
		result += '<a class="icon '+aClass+'">';
		result += tree[id].data.course.name;		
		result += '</a>';
		
		result += '<div class="checkbox">';
		result += '<input type="checkbox" name="module" id="'+checkboxId+'" value="'+tree[id].data.course.id.idString+'" '+checked+'>';
		result += '<label class="icon" for="'+checkboxId+'"></label>';
		result += '</div>';
		
		if (subtree) result += subtree;		
		
		result += "</li>";
		
		i++;
	}
	
	if (depth > 0) result += "</ul>";
		
	return result;
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

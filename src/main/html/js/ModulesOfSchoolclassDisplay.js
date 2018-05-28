function ModulesOfSchoolclassDisplay() {	
	// GWT vars
	
	
	// Forms 
	this.selectForm = document.forms["modulesOfSchoolclassDisplaySelect"];
	
	// Buttons 
	
	// jQuery objects
	this.$panel = jQuery("#modulesOfSchoolclassDisplay");
	this.$treeWrapper = jQuery("#modulesOfSchoolclassDisplayTreeWrapper");
	
	this.$selectForm = $(this.selectForm);
	this.$selectRow = this.$selectForm.find("tbody tr").detach();
	this.$selectTableBody = this.$selectForm.find("tbody");
		
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
	
	var modules = json;
	
	this.$selectTableBody.html("");
	
	var i = 1;
	for (var id in modules) { 
		el = modules[id];
		
		$row = this.$selectRow.clone();
		$row.prop('tabindex', i);
		$row.find("#modulesOfSchoolclassDisplaySelectId").val( id ).removeAttr("id");
		$row.find("#modulesOfSchoolclassDisplaySelectName").html( el ).removeAttr("id");

		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});

		$row.on('click keypress', $.proxy(this.clickSelectRow, this));
		this.$selectTableBody.append($row);
		i++;
	}
	//this.selectFormToggle(false);
	Helpers.stretchHeight( [this.$treeWrapper, this.$selectTableBody] );
}
ModulesOfSchoolclassDisplay.prototype.setTree = function(json) {
	console.log("SET TREE");
	console.log(json);	
	
	var tree = json.jsObject, result, $result;
	
	var result = this.recursiveTreeBuilder(tree);
	
	result = '<ul id ="modulesOfSchoolclassDisplayTree" class="tree">'+result+'</li>';
	$result = $(result);
	$result.find("li.hasSub a").click(Helpers.clickTreeNode);
	$result.find("input").on('change', $.proxy(this.toggleTreeCheckbox, this));
	
	this.$treeWrapper.html("");
	this.$treeWrapper.append($result);
	Helpers.stretchHeight( [this.$treeWrapper, this.$selectTableBody] );
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
 */

ModulesOfSchoolclassDisplay.prototype.attachItem = function(id) {
	app.getPresenterFactory().modulesOfSchoolclassPresenter.attachItemToSchoolClass(id);
}

ModulesOfSchoolclassDisplay.prototype.detachItem = function(id) {
	app.getPresenterFactory().modulesOfSchoolclassPresenter.detachItemFromSchoolClass(id);
}

/*
 * EVENT HANDLERS - tree checkboxes
 */

ModulesOfSchoolclassDisplay.prototype.toggleTreeCheckbox = function(event) {
	if (event.target.checked) this.attachItem(event.target.value);
	else this.detachItem(event.target.value);			
}


/*
 * EVENT HANDLERS - select table
 */

ModulesOfSchoolclassDisplay.prototype.clickSelectRow = function(event) {
	Helpers.selectTableRow(event);
	//if (this.SelectForm.elements["module"].value != "") this.selectFormToggle(true);
	//else this.chooseSchoolclassFormToggle(false);	
}

// helpers
ModulesOfSchoolclassDisplay.prototype.chooseSchoolclassFormToggle = function(value) {
	//if (value) this.$chooseSchoolclassForm.find(':submit').prop('disabled','');
	//else this.$chooseSchoolclassForm.find(':submit').prop('disabled','disabled');
}


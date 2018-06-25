function ModulesOfSchoolclassDisplay() {	
	// GWT vars	
	this.nodes = [];
	this.selectedNodeId = "";
	
	// Forms 
	this.selectForm = document.forms["modulesOfSchoolclassDisplaySelect"];
	this.settingsForm = document.forms["modulesOfSchoolclassDisplaySettings"];
	this.searchForm = document.forms["modulesOfSchoolclassDisplaySearch"];
			
	// jQuery objects
	this.$panel = jQuery("#modulesOfSchoolclassDisplay");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	this.$treeWrapper = jQuery("#modulesOfSchoolclassDisplayTreeWrapper");
	this.$tree = null;
	
	this.$selectForm = $(this.selectForm);
	this.$selectRow = this.$selectForm.find("tbody tr").detach();
	this.$selectTableBody = this.$selectForm.find("tbody");
	
	this.$settingsForm = $(this.settingsForm);	
	this.$searchForm = $(this.searchForm);
	
	this.$reloadButton = $(this.searchForm.elements["reload"]);
	
	// Bind handlers
	this.$settingsForm.on('submit', $.proxy(this.submitSettings,this));	
	this.$searchForm.on('submit', $.proxy(this.submitSearch,this));	
	this.$reloadButton.on('click', $.proxy(this.clickReload,this))
	
	// Init
	this.$panel.hide();
}

ModulesOfSchoolclassDisplay.prototype.show = function() {
	this.$panel.show();
}

/*
 * GUI FUNCTIONS
 */

ModulesOfSchoolclassDisplay.prototype.searchModule = function() {
	// Collapse tree
	this.collapseTree();
	
	// Iterate over all li-s
	this.$tree.find("li a").each( $.proxy(this.iterateNodesForSearch, this));
}

ModulesOfSchoolclassDisplay.prototype.iterateNodesForSearch = function(index, el) {
	searchWord = this.searchForm.elements["name"].value;
	
	if ( el.innerHTML.toLowerCase() == searchWord.toLowerCase() ) {
		$el = $(el);
		$el.addClass("open");
		if (this.nodes[$el.data("id")]) this.nodes[$el.data("id")].open = true;

		$el.parents().each( $.proxy( function(index, el) {
			$el = $(el);
			$el.addClass("open");
			if (this.nodes[$el.data("id")]) this.nodes[$el.data("id")].open = true;
		}, this));
	}
}

ModulesOfSchoolclassDisplay.prototype.collapseTree = function() {
	this.$tree.find("li").removeClass("open");
	for (var id in this.nodes) {
		this.nodes[id].open = false;
	}
}
ModulesOfSchoolclassDisplay.prototype.reloadTree = function() {
	this.collapseTree();
}

ModulesOfSchoolclassDisplay.prototype.updateTable = function() {
	var modules = this.nodes;
		
	this.$selectTableBody.html("");
	
	var i = 1;
	for (var id in modules) { 
		el = modules[id];
		
		if (el.active == true) {
		
			$row = this.$selectRow.clone();
			$row.prop('tabindex', i);
			$row.find("#modulesOfSchoolclassDisplaySelectId").val( id ).removeAttr("id");
			$row.find("#modulesOfSchoolclassDisplaySelectName").html( el.course.name ).removeAttr("id");
		
			$row.find("input[type='checkbox'],input[type='radio']").each( function() {
				this.value = id;
			});
		
			$row.on('click keypress', $.proxy(this.clickSelectRow, this));
		
			this.$selectTableBody.append($row);
			
			if (id === this.selectedNodeId) $row.trigger('click');

			i++;
		}
	}
	
	this.settingsFormToggle(false);
	
	return;
}
ModulesOfSchoolclassDisplay.prototype.setSettings = function(id) {
	if (!this.nodes.hasOwnProperty(id)) return;
		
	this.settingsForm.elements["key"].value = id;
	this.settingsForm.elements["accessKey"].value = this.nodes[id].classCourse.accessKey ? this.nodes[id].classCourse.accessKey : "";
	this.settingsForm.elements["from"].value = this.nodes[id].classCourse.notBefore ? this.nodes[id].classCourse.notBefore : "";
	this.settingsForm.elements["to"].value = this.nodes[id].classCourse.notAfter ? this.nodes[id].classCourse.notAfter : "";
	if (this.nodes[id].classCourse.courseType == "normal") {
		this.settingsForm.elements["locked[]"][0].checked = "";
		this.settingsForm.elements["locked[]"][1].checked = "checked";
	} else  {
		this.settingsForm.elements["locked[]"][0].checked = "checked";
		this.settingsForm.elements["locked[]"][1].checked = "";
	}
}


/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

ModulesOfSchoolclassDisplay.prototype.init = function () {
	Helpers.stretchHeight( [this.$treeWrapper, this.$selectTableBody] );
}

ModulesOfSchoolclassDisplay.prototype.clear = function () {
	this.settingsForm.elements["key"] = "";
	this.settingsForm.elements["accessKey"] = "";
	this.settingsForm.elements["from"] = "";
	this.settingsForm.elements["to"] = "";
	this.settingsForm.elements["name"] = "";
}

ModulesOfSchoolclassDisplay.prototype.setHelp = function(url) {
	this.$helpContentIFrame.attr('src', url );
}

ModulesOfSchoolclassDisplay.prototype.setEmptyTableMessageModules = function () {
	this.$treeWrapper.html('Geen beschikbare modules.');
}
ModulesOfSchoolclassDisplay.prototype.setLoadingTableMessageModules = function () {
	this.$treeWrapper.html('Beschikbare modules worden geladen.');
}
ModulesOfSchoolclassDisplay.prototype.setEmptyTableMessageSelected = function () {
	this.$selectTableBody.html('<tr class="empty"><td>Geen modules toegekend.</td></tr>');
}
ModulesOfSchoolclassDisplay.prototype.setLoadingTableMessageSelected = function () {
	this.$selectTableBody.html('<tr class="empty"><td>Modules worden geladen.</td></tr>');
}

ModulesOfSchoolclassDisplay.prototype.setTree = function(json) {
	var tree = json, result, $result;
		
	var result = this.recursiveTreeBuilder(tree.children);
	
	result = '<ul id ="modulesOfSchoolclassDisplayTree" class="tree">'+result+'</li>';
	$result = $(result);
	$result.find("li.hasSub a").on('click', $.proxy(this.clickTreeNode, this)); 
	$result.find("input").on('change', $.proxy(this.toggleTreeCheckbox, this));
	
	this.$tree = $result;
	this.$treeWrapper.html("");
	this.$treeWrapper.append($result);
	
	this.updateTable();
}

// Helper:
ModulesOfSchoolclassDisplay.prototype.recursiveTreeBuilder = function(tree, depth = 0, checkboxId = 0) {
	var result, subtree, liClass, aClass, checkboxId, checked, checkboxClass, checkboxDisabled;
	
	if (!tree) return; //sometimes it is undefined
	
	if (depth > 0) {
		result = "<ul>";
	} else {
		result = "";
		checkboxId = "modulesOfSchoolclassDisplayTreeCheckbox";
	} 
			
	i = 0;
	
	for (var id in tree) {
		
		// initiate variables
		checkboxId += "" + depth + i
		liClass = "";
		aClass = "";
		checkboxClass = "";
		checkboxDisabled = "";
		checked = "";
		
		// Update the node list
		if (this.nodes[id]) {
			tree[id].data.active = this.nodes[id].active;
			tree[id].data.open = this.nodes[id].open;
		}		
		this.nodes[id]=tree[id].data;		
		
				
		if (tree[id].data.course.withChildren == true) { // Folder
			subtree = this.recursiveTreeBuilder(tree[id].children, depth + 1, checkboxId);
			liClass = "hasSub";
			aClass = "folder";
			checkboxDisabled = " disabled";
		} else { // Set (course)
			aClass="set";
		}
		
		if (this.nodes[id].open == true) liClass += " open";

		if (tree[id].data.classCourse != null) {
			if (tree[id].data.classCourse.viewState === "invisible") {
				checkboxClass += " previouslyChecked";
				this.nodes[id].active = false;
			 } else {
				 checked = 'checked="checked"';
				 if (!tree[id].data.course.withChildren) this.nodes[id].active = true;
				 //this.activeModuleList[id] = tree[id].data.course;
			 }
		} else {
			checked = "";
			this.nodes[id].active = false;
		}		
		
		result += '<li class="'+liClass+'" data-id="'+id+'">';
		result += '<a class="icon '+aClass+'">';
		result += tree[id].data.course.name;		
		result += '</a>';
		
		if (tree[id].data.course.withChildren != true) {
			result += '<div class="checkbox '+checkboxClass+'">';
			result += '<input type="checkbox" name="module" id="'+checkboxId+'" value="'+id+'" '+checked+checkboxDisabled+'>'; 
			result += '<label class="icon" for="'+checkboxId+'"></label>';
			result += '</div>';
		} else {
			if (checkboxClass || checked) result += '<span class="indicator '+checkboxClass+' '+(checked ? 'checked' : '')+'"></span>'; //
		}
		
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
	app.getPresenterFactory().getModulesOfSchoolclassPresenter().attachItemToSchoolClass(id);
}

ModulesOfSchoolclassDisplay.prototype.detachItem = function(id) {
	app.getPresenterFactory().getModulesOfSchoolclassPresenter().detachItemFromSchoolClass(id);
}

ModulesOfSchoolclassDisplay.prototype.setModuleSettings = function() {

	typeString = this.settingsForm.elements["locked[]"][0].checked ? "assesment" : "normal";
		
	app.getPresenterFactory().getModulesOfSchoolclassPresenter().setModuleSettings(  this.settingsForm.elements["key"].value,
																				typeString,
																				this.settingsForm.elements["from"].value,
																				this.settingsForm.elements["to"].value,
																				this.settingsForm.elements["accessKey"].value);
}


/*
 * EVENT HANDLERS - tree 
 */

ModulesOfSchoolclassDisplay.prototype.toggleTreeCheckbox = function(event) {
	if (event.target.checked) {
		this.attachItem(event.target.value);
		this.selectedNodeId = event.target.value;
	} else {
		this.detachItem(event.target.value);			
	} 
}

ModulesOfSchoolclassDisplay.prototype.clickTreeNode = function(event) {
	var $el = $(event.target).parent();
	console.log($el);
	if ($el.hasClass("open")) {
		$el.removeClass("open");
		//this.openNodes[$el.data("id")] = false;
		this.nodes[$el.data("id")].open = false;
	} else {
		$el.addClass("open");
		//this.openNodes[$el.data("id")] = true;
		this.nodes[$el.data("id")].open = true;
	}
}


/*
 * EVENT HANDLERS - select table
 */

ModulesOfSchoolclassDisplay.prototype.clickSelectRow = function(event) {
	Helpers.selectTableRow(event);
	
	if (this.selectForm.elements["module"].value) {
		this.setSettings(this.selectForm.elements["module"].value);
		this.selectedNodeId = this.selectForm.elements["module"].value;
		this.settingsFormToggle(true);
	} else {
		this.settingsFormToggle(false);
	}
}

// helpers
ModulesOfSchoolclassDisplay.prototype.settingsFormToggle = function(value) {
	if (value === true) this.$settingsForm.find(':submit').prop('disabled','');
	else this.$settingsForm.find(':submit').prop('disabled','disabled');
}


/*
 * EVENT HANDLERS - settings
 */

ModulesOfSchoolclassDisplay.prototype.submitSettings = function(event) {
	event.preventDefault();	
	this.setModuleSettings();
}


/*
 * EVENT HANDLERS - search & reload
 */

ModulesOfSchoolclassDisplay.prototype.submitSearch = function(event) {
	event.preventDefault();	
	this.searchModule();
}

ModulesOfSchoolclassDisplay.prototype.clickReload = function(event) {
	event.preventDefault();	
	this.reloadTree();
}




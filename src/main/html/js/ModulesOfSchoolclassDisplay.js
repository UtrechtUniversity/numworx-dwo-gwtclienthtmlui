function ModulesOfSchoolclassDisplay() {	
	// GWT vars
	
	this.openNodes = [];
	this.activeModuleList = [];
	
	// Forms 
	this.selectForm = document.forms["modulesOfSchoolclassDisplaySelect"];
	this.settingsForm = document.forms["modulesOfSchoolclassDisplaySettings"];
	this.searchForm = document.forms["modulesOfSchoolclassDisplaySearch"];
	
			
	// jQuery objects
	this.$panel = jQuery("#modulesOfSchoolclassDisplay");
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
	console.log("#show")
	this.$panel.show();
}

/*
 * GUI FUNCTIONS
 */

ModulesOfSchoolclassDisplay.prototype.searchModule = function() {
	console.log("zoeken maar!");
	var searchForm = this.searchForm;
	
	// Collapse tree
	this.$tree.find("li").removeClass("open");
	
	// Iterate over all li-s
	this.$tree.find("li a").each(function() {
		$this = $(this);
		el = $this.get(0);
		searchWord = searchForm.elements["name"].value;
		
		console.log(el.innerHTML);
		console.log(searchWord);
		
		if ( el.innerHTML.toLowerCase() == searchWord.toLowerCase() ) {
			$this.addClass("open");
			$this.parents().addClass("open");
		}
		
	});
}

ModulesOfSchoolclassDisplay.prototype.reloadTree = function() {
	// Collapse tree
	this.$tree.find("li").removeClass("open");	
}

ModulesOfSchoolclassDisplay.prototype.updateTable = function() {
	console.log("UPDATE!");
	
	var modules = this.activeModuleList;
	
	this.$selectTableBody.html("");
	
	var i = 1;
	for (var id in modules) { 
		el = modules[id];
		
		$row = this.$selectRow.clone();
		$row.prop('tabindex', i);
		$row.find("#modulesOfSchoolclassDisplaySelectId").val( id ).removeAttr("id");
		$row.find("#modulesOfSchoolclassDisplaySelectName").html( el.name ).removeAttr("id");
		
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});

		$row.on('click keypress', $.proxy(this.clickSelectRow, this));
		
		this.$selectTableBody.append($row);
		i++;
	}
	return;
}

/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

ModulesOfSchoolclassDisplay.prototype.clear = function () {
	console.log("clear");
}

ModulesOfSchoolclassDisplay.prototype.init = function () {
	console.log("init");
	Helpers.stretchHeight( [this.$treeWrapper, this.$selectTableBody] );
}

ModulesOfSchoolclassDisplay.prototype.setEmptyTableMessageModules = function () {
	console.log("setEmptyTableMessageModules");
}
ModulesOfSchoolclassDisplay.prototype.setLoadingTableMessageModules = function () {
	console.log("setLoadingTableMessageModules");
}
ModulesOfSchoolclassDisplay.prototype.setEmptyTableMessageSelected = function () {
	//this.$selectTableBody.html('<tr class="empty"><td>Geen modules gevonden</td></tr>');
}
ModulesOfSchoolclassDisplay.prototype.setLoadingTableMessageSelected = function () {
	this.$selectTableBody.html('<tr class="loading"><td>Laden...</td></tr>');
}

ModulesOfSchoolclassDisplay.prototype.setTree = function(json) {
	console.log("SET TREE");
	console.log(json);	
	
	var tree = json.jsObject, result, $result;
	
	var result = this.recursiveTreeBuilder(tree.children);
	
	result = '<ul id ="modulesOfSchoolclassDisplayTree" class="tree">'+result+'</li>';
	$result = $(result);
	$result.find("li.hasSub a").on('click', $.proxy(this.clickTreeNode, this)); //click(Helpers.clickTreeNode);
	$result.find("input").on('change', $.proxy(this.toggleTreeCheckbox, this));
	
	this.$tree = $result;
	this.$treeWrapper.html("");
	this.$treeWrapper.append($result);
	
	console.log(this.activeModuleList);
	this.updateTable();
	
	
}

// Helper:
ModulesOfSchoolclassDisplay.prototype.recursiveTreeBuilder = function(tree, depth = 0, checkboxId = 0) {
	var result, subtree, liClass, aClass, checkboxId, checked, checkboxClass;
	
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
		checkboxClass = "";
		
		if (tree[id].data.course.withChildren == true) {
			subtree = this.recursiveTreeBuilder(tree[id].children, depth + 1, checkboxId);
			liClass = "hasSub";
			aClass = "folder";			
		} else {
			aClass="set";
		}
		
		if ( this.openNodes != null && this.openNodes.hasOwnProperty(id)  ) {
			if (this.openNodes[id] === true) liClass += " open";
		}

		if (tree[id].data.classCourse != null) {
			if (tree[id].data.classCourse.viewState == "invisible") checkboxClass = "previouslyChecked";
			 else {
				 checked = 'checked="checked"';
				 this.activeModuleList[id] = tree[id].data.course;
			 }
		} else {
			checked = "";
		}		
		
		result += '<li class="'+liClass+'" data-id="'+id+'">';
		result += '<a class="icon '+aClass+'">';
		result += tree[id].data.course.name;		
		result += '</a>';
		
		result += '<div class="checkbox '+checkboxClass+'">';
		result += '<input type="checkbox" name="module" id="'+checkboxId+'" value="'+id+'" '+checked+'>'; //tree[id].data.course.id.idString
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
	console.log("attach "+id);
	app.getPresenterFactory().modulesOfSchoolclassPresenter.attachItemToSchoolClass(id);
}

ModulesOfSchoolclassDisplay.prototype.detachItem = function(id) {
	console.log("detach "+id);
	app.getPresenterFactory().modulesOfSchoolclassPresenter.detachItemFromSchoolClass(id);
}

// ModulesOfSchoolclassDisplay.prototype.detachItem = function(id) {
// 	app.getPresenterFactory().modulesOfSchoolclassPresenter.detachItemFromSchoolClass(id);
// }

ModulesOfSchoolclassDisplay.prototype.setModuleSettings = function() {
	//String key, String typeString, String fromData, String toData, String accessKey
	
	typeString = this.settingsForm.elements["locked"].value == 1 ? "unlocked" : "locked";
	app.getPresenterFactory().modulesOfSchoolclassPresenter.setModuleSettings(  this.settingsForm.elements["key"].value,
																				typeString,
																				this.settingsForm.elements["from"].value,
																				this.settingsForm.elements["to"].value,
																				this.settingsForm.elements["accesKey"].value);
}

/*
 * EVENT HANDLERS - tree 
 */

ModulesOfSchoolclassDisplay.prototype.toggleTreeCheckbox = function(event) {
	if (event.target.checked) this.attachItem(event.target.value);
	else this.detachItem(event.target.value);			
}

ModulesOfSchoolclassDisplay.prototype.clickTreeNode = function(event) {
	var $el = $(event.target).parent();
	console.log($el);
	if ($el.hasClass("open")) {
		$el.removeClass("open");
		this.openNodes[$el.data("id")] = false;
	} else {
		$el.addClass("open");
		this.openNodes[$el.data("id")] = true;
	}
}


/*
 * EVENT HANDLERS - select table
 */

ModulesOfSchoolclassDisplay.prototype.clickSelectRow = function(event) {
	Helpers.selectTableRow(event);
	//if (this.SelectForm.elements["module"].value != "") this.selectFormToggle(true);
	//else this.chooseSchoolclassFormToggle(false);	
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




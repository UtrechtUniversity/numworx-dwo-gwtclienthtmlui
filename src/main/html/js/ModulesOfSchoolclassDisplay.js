function ModulesOfSchoolclassDisplay() {	
	// GWT vars	
	this.nodes = [];
	this.selectedNodeId = "";
	this.dateTimePicker = null;
	this.$temporaryRow = null;
	
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
	
	this.$settingsFormFrom = $(this.settingsForm.elements["modulesOfSchoolclassDisplayValidityFrom"]);
	this.$settingsFormTo = $(this.settingsForm.elements["modulesOfSchoolclassDisplayValidityTo"]);
	this.$settingsFormLocked = $(this.settingsForm.elements["locked[]"]);
	
	this.$reloadButton = $(this.searchForm.elements["reload"]);
	
	// Bind handlers
	this.$settingsForm.on('submit', $.proxy(this.submitSettings,this));	
	this.$searchForm.on('submit', $.proxy(this.submitSearch,this));	
	this.$reloadButton.on('click', $.proxy(this.clickReload,this));
	this.$settingsFormFrom.on('click', $.proxy(this.clickDateField, this));
	this.$settingsFormTo.on('click', $.proxy(this.clickDateField, this));
	//this.$settingsFormLocked.on('click', $.proxy(this.clickLockedField, this));
	this.$settingsForm.find("input").on('keyup change', $.proxy(this.changeInputFieldSettingsForm,this));	
	this.$searchForm.find("input").on('keyup change', $.proxy(this.changeInputFieldSearchForm,this));	
	
	// Init
	this.$panel.hide();
}

ModulesOfSchoolclassDisplay.prototype.show = function() {
       this.localize();
	this.$panel.show();
}


ModulesOfSchoolclassDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
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
	
	if ( Helpers.searchCompare(el.innerHTML.toLowerCase(), searchWord.toLowerCase()) ){
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

ModulesOfSchoolclassDisplay.prototype.openTreeForId = function(id) {
	$el = this.$tree.find("[data-id='"+id+"']");	
	$el = $el.first();
	$el.addClass("open");
	
	if (this.nodes[$el.data("id")]) this.nodes[$el.data("id")].open = true;

	$el.parents().each( $.proxy( function(index, el) {
		$el = $(el);
		$el.addClass("open");
		if (this.nodes[$el.data("id")]) this.nodes[$el.data("id")].open = true;
	}, this));
}



ModulesOfSchoolclassDisplay.prototype.collapseTree = function() {
	if (!this.$tree) return;
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
			this.addRowToTable(el, id, i, false, false); // select the added element with id === this.selectedNodeId in the 4th parameter)
		}
		i++;
	}
	
	this.settingsFormAllFieldsToggle(false);
	
	return;
}
ModulesOfSchoolclassDisplay.prototype.addRowToTable = function(el, id, i, selected, newRow) {	
		$row = this.$selectRow.clone();
		$row.prop('tabindex', i);
		$row.find("#modulesOfSchoolclassDisplaySelectId").val( id ).removeAttr("id");
		$row.find("#modulesOfSchoolclassDisplaySelectName").html( el.course.name ).removeAttr("id");
	
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});
	
		$row.on('click keypress', $.proxy(this.clickSelectRow, this));
	
		if (newRow) {
			this.$selectTableBody.prepend($row);
			$row.addClass("new");
			//$row.find("input[type='checkbox'],input[type='radio']").prop('checked','checked');
		} else {
			this.$selectTableBody.append($row);
		}
		if (selected || newRow) $row.trigger( 'click' ); 
		
		return $row;
}


ModulesOfSchoolclassDisplay.prototype.setSettings = function(id) {
	if (!this.nodes.hasOwnProperty(id)) return;

	this.settingsForm.elements["key"].value = id;
	
	if (this.nodes[id].classCourse) {
		
		this.settingsForm.elements["accessKey"].value = this.nodes[id].classCourse.accessKey ? this.nodes[id].classCourse.accessKey : "";
		this.settingsForm.elements["from"].value = this.nodes[id].classCourse.notBefore ? this.nodes[id].classCourse.notBefore : "";
		this.settingsForm.elements["to"].value = this.nodes[id].classCourse.notAfter ? this.nodes[id].classCourse.notAfter : "";
		
		if (this.nodes[id].classCourse.courseType == "normal") {
			this.settingsForm.elements["locked[]"][0].checked = "";
			this.settingsForm.elements["locked[]"][1].checked = "checked";
			this.accessKeyToggle(false);
		} else  {
			this.settingsForm.elements["locked[]"][0].checked = "checked";
			this.settingsForm.elements["locked[]"][1].checked = "";
			this.accessKeyToggle(true);
		}
	}
}

ModulesOfSchoolclassDisplay.prototype.temporaryAddModule = function(id) {
	this.removeTemporaryRow();
	this.$temporaryRow = this.addRowToTable(this.nodes[id], id, 0, false, true);
	
	//this.$temporaryRow.trigger('click');
	
	// this.setSettings(id);
		
	// Go in edit settings mode
	// this.openTreeForId(this.selectForm.elements["module"].value);
	// this.setSettings(this.selectForm.elements["module"].value);
	// this.selectedNodeId = this.selectForm.elements["module"].value;
	// this.settingsFormAllFieldToggle(true);
	// this.settingsFormToggle();
}

ModulesOfSchoolclassDisplay.prototype.removeTemporaryRow = function() {
	if (this.$temporaryRow != null) {	
		this.$temporaryRow.remove();
		this.$temporaryRow = null;
	}
}





/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */

ModulesOfSchoolclassDisplay.prototype.init = function () {
	app.mainDisplay.registerStretchables( [this.$treeWrapper, this.$selectTableBody] );
		
	//Helpers.stretchHeight( [this.$treeWrapper, this.$selectTableBody] );
	this.dateTimePicker  = new MaterialDatetimePicker({});
	
	this.settingsFormAllFieldToggle(false);
	this.searchFormToggle();
	this.collapseTree();
}

ModulesOfSchoolclassDisplay.prototype.clear = function () {
	this.searchForm.elements["name"].value = "";
	this.settingsFormAllFieldToggle(false);
	this.searchFormToggle();
	this.selectedNodeId = null;
	this.$temporaryRow = null;
	this.collapseTree();
}

ModulesOfSchoolclassDisplay.prototype.setHelp = function(url) {
		this.$helpContentIFrame.attr('src', 'https://teuniz.dwo.nl/gwtclient/'+url );
}

ModulesOfSchoolclassDisplay.prototype.setEmptyTableMessageModules = function () {
	this.$treeWrapper.html(app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' ));		
}
ModulesOfSchoolclassDisplay.prototype.setLoadingTableMessageModules = function () {
	this.$treeWrapper.html(app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' ));	
}
ModulesOfSchoolclassDisplay.prototype.setEmptyTableMessageSelected = function () {
	this.$selectTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
}
ModulesOfSchoolclassDisplay.prototype.setLoadingTableMessageSelected = function () {
	this.$selectTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
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
ModulesOfSchoolclassDisplay.prototype.recursiveTreeBuilder = function(tree, depth, checkboxId) {
	var result, subtree, liClass, aClass, checkboxId, checked, checkboxClass, checkboxDisabled;
	
	depth = typeof depth !== 'undefined' ? depth : 0;
	checkboxId = typeof checkboxId !== 'undefined' ? checkboxId : 0;
	
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

	var typeString = this.settingsForm.elements["modulesOfSchoolclassDisplayTypeLocked"].checked ? "assesment" : "normal";
	
	var from = this.settingsForm.elements["from"].value;
	var to = this.settingsForm.elements["to"].value;
			
	app.getPresenterFactory().getModulesOfSchoolclassPresenter().setModuleSettings(  this.selectedNodeId,
																				typeString,
																				from,
																				to,
																				this.settingsForm.elements["accessKey"].value);
}

ModulesOfSchoolclassDisplay.prototype.addModule = function() {
	var typeString = this.settingsForm.elements["modulesOfSchoolclassDisplayTypeLocked"].checked ? "assesment" : "normal";
	
	var from = this.settingsForm.elements["from"].value;
	var to = this.settingsForm.elements["to"].value;
		
	app.getPresenterFactory().getModulesOfSchoolclassPresenter().addModule(  	this.selectedNodeId,
																				typeString,
																				from,
																				to,
																				this.settingsForm.elements["accessKey"].value);
		
	this.$temporaryRow = null;
	this.settingsFormAllFieldToggle(false);
																			
}

ModulesOfSchoolclassDisplay.prototype.reformatDate = function(oldDate) {
	var dateTime = oldDate.split(" ");
	var d = dateTime[0], t = dateTime[1];
	var ds = d.split("/");
	var ts = t.split(":");
        //Time
	return ds[2]+"-"+ds[1]+"-"+ds[0]+"T"+ts[0]+":"+ts[1]+":00.000+0100";
}


/*
 * EVENT HANDLERS - tree 
 */

ModulesOfSchoolclassDisplay.prototype.toggleTreeCheckbox = function(event) {
	if (event.target.checked) {
		this.selectedNodeId = event.target.value;
		
		if (!this.nodes.hasOwnProperty( this.selectedNodeId )) return;

		if ( this.nodes[this.selectedNodeId].classCourse &&  this.nodes[this.selectedNodeId].classCourse.viewState == "invisible" ) {
			// If this course has been selected before, attach
			this.attachItem( this.selectedNodeId );			
		} else {
			// If not selected before, edit setting before attach
			this.$tree.find(".temporary input").prop('checked','');			
			$(event.target).parent().addClass("temporary");
			this.temporaryAddModule( this.selectedNodeId );
		}	
				
	} else {
		// If the item is selected, then disable settingsform and detach
		this.settingsFormAllFieldToggle(false);		
		this.detachItem(event.target.value);			
	} 
}

ModulesOfSchoolclassDisplay.prototype.clickTreeNode = function(event) {
	var $el = $(event.target).parent();
	if ($el.hasClass("open")) {
		$el.removeClass("open");
		this.nodes[$el.data("id")].open = false;
	} else {
		$el.addClass("open");
		this.nodes[$el.data("id")].open = true;
	}
}


/*
 * EVENT HANDLERS - select table
 */

ModulesOfSchoolclassDisplay.prototype.clickSelectRow = function(event) {
	if (this.$temporaryRow != null && !$(event.target).hasClass("new")) return;
	
	Helpers.selectTableRow(event);
	
	// Remove other temporary row, if available	
	//this.$tree.find(".temporary input").prop('checked','');
	//	this.removeTemporaryRow();
	
	for (var i = 0; i < this.selectForm.elements["module"].length; i++) 
		if (this.selectForm.elements["module"][i].checked) break;		
			
	if (this.selectForm.elements["module"][i].value != "") {		
		// Go in edit settings mode
		this.settingsFormAllFieldToggle(true);
		this.settingsFormToggle();
		this.changeInputFieldSettingsForm();
		this.openTreeForId(this.selectForm.elements["module"][i].value);
		this.setSettings(this.selectForm.elements["module"][i].value);
		this.selectedNodeId = this.selectForm.elements["module"][i].value;
	} else {
		this.settingsFormAllFieldToggle(false);
	}
}

// helpers
ModulesOfSchoolclassDisplay.prototype.settingsFormAllFieldToggle = function(value) {
	if (value === true) {
		
		this.$settingsForm.find('input').prop('disabled','');
	//	this.settingsForm.elements["from"].focus();
	}
	else {
		this.settingsForm.elements["key"] = "";
		this.settingsForm.elements["accessKey"].value = "";
		this.settingsForm.elements["from"].value = "";
		this.settingsForm.elements["to"].value = "";
		this.settingsForm.elements["name"] = "";
		this.settingsForm.elements["locked[]"][0].checked = "";
		this.settingsForm.elements["locked[]"][1].checked = "checked";
		this.$settingsForm.find('input').prop('disabled','disabled');
	}
}


/*
 * EVENT HANDLERS - settings
 */

ModulesOfSchoolclassDisplay.prototype.submitSettings = function(event) {
	event.preventDefault();	
	
	if ( this.nodes[this.selectedNodeId].classCourse) { //&&  this.nodes[this.selectedNodeId].classCourse.viewState == "invisible" ) {
		this.setModuleSettings();
	} else {
		this.addModule();
	}
}

ModulesOfSchoolclassDisplay.prototype.clickDateField = function(event) {
	event.preventDefault();		
	this.dateTimePicker.off('submit');
	this.dateTimePicker.on('submit', function(d) { var el = event.target; el.value = d.format("YYYY-MM-DD HH:mm"); } );	
	this.dateTimePicker.open();
}

ModulesOfSchoolclassDisplay.prototype.clickLockedField = function(event) {
	//event.preventDefault();	
	if (this.settingsForm.elements["locked[]"][0].checked) this.accessKeyToggle(true);
	else this.accessKeyToggle(false);	
}

// ModulesOfSchoolclassDisplay.prototype.accessKeyToggle = function(value) {
// 	if (value === true) {
// 		this.settingsForm.elements["accessKey"].disabled = false;
// 		this.settingsForm.elements["accessKey"].focus();
// 	}
// 	else this.settingsForm.elements["accessKey"].disabled = true;
// }
 
 
ModulesOfSchoolclassDisplay.prototype.changeInputFieldSettingsForm = function(event) {
	this.settingsFormToggle();
	this.accessKeyToggle();
}

ModulesOfSchoolclassDisplay.prototype.settingsFormToggle = function(value) {
	if (this.requiredFieldsSettingsForm()) this.$settingsForm.find(':submit').prop('disabled','');
	else this.$settingsForm.find(':submit').prop('disabled','disabled');
}

ModulesOfSchoolclassDisplay.prototype.requiredFieldsSettingsForm = function() {
	// Required are: module selected and if access key yes, then an access key
	if (typeof this.selectForm.elements["module"] == "undefined") return false;

	return this.selectForm.elements["module"].value != "" 
			&& this.settingsForm.elements["locked[]"][0].checked ? this.settingsForm.elements["accessKey"].value  != "" : true;
}

ModulesOfSchoolclassDisplay.prototype.accessKeyToggle = function(value) {
	if (this.settingsForm.elements["locked[]"][0].checked) this.settingsForm.elements["accessKey"].disabled = false;
	else this.settingsForm.elements["accessKey"].disabled = true;
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

ModulesOfSchoolclassDisplay.prototype.changeInputFieldSearchForm = function(event) {
	this.searchFormToggle();
}
ModulesOfSchoolclassDisplay.prototype.searchFormToggle = function(value) {
	if (this.requiredFieldsSearchForm()) this.$searchForm.find(':submit').prop('disabled','');
	else this.$searchForm.find(':submit').prop('disabled','disabled');
}
ModulesOfSchoolclassDisplay.prototype.requiredFieldsSearchForm = function() {
	return this.searchForm.elements["name"].value != "";
}




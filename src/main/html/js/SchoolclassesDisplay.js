function SchoolclassesDisplay() {	
	// Forms 
	this.chooseSchoolclassForm = document.forms["chooseSchoolclass"];
	this.addSchoolclassForm = document.forms["addSchoolclass"];
	
	// jQuery objects
	this.$panel = jQuery("#schoolclassesDisplayPanel");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	this.$chooseSchoolclassForm = $(this.chooseSchoolclassForm);
	this.$chooseSchoolclassRow = this.$chooseSchoolclassForm.find("tbody tr").detach();
	this.$chooseSchoolclassTableBody = this.$chooseSchoolclassForm.find("tbody");
	this.$chooseSchoolclassTableHead = this.$chooseSchoolclassForm.find("thead");
	
	this.$addSchoolclassForm = $(this.addSchoolclassForm);
	
	
	// Bind handlers
	this.$chooseSchoolclassForm.on('submit', $.proxy(this.submitChooseSchoolclass,this));	
	this.$addSchoolclassForm.on('submit', $.proxy(this.submitAddSchoolclass,this));	
	this.$chooseSchoolclassTableHead.find(".sortButton").click(Helpers.clickSortButton);
		
	// Init
	this.$panel.hide();
}

SchoolclassesDisplay.prototype.show = function() {
        this.localize();
	this.$panel.show();
	
	
	//Helpers.stretchHeight( [ this.$chooseSchoolclassTableBody ]);
}


SchoolclassesDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}
/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */


SchoolclassesDisplay.prototype.init = function () {
	console.log("init!");
	this.addSchoolclassForm.elements["classname"].value = "";
	this.addSchoolclassForm.elements["classkey"].value = "";
	this.addSchoolclassForm.elements["useClasstree"][0].checked = false;
	this.addSchoolclassForm.elements["useClasstree"][1].checked = true;
	this.addSchoolclassForm.elements["useClasskey"][0].checked = false;
	this.addSchoolclassForm.elements["useClasskey"][1].checked = true;
	
	app.mainDisplay.registerStretchables( [ this.$chooseSchoolclassTableBody ] );
}

SchoolclassesDisplay.prototype.clear = function () {
	this.addSchoolclassForm.elements["classname"].value = "";
	this.addSchoolclassForm.elements["classkey"].value = "";
	this.addSchoolclassForm.elements["useClasstree"][0].checked = false;
	this.addSchoolclassForm.elements["useClasstree"][1].checked = true;
	this.addSchoolclassForm.elements["useClasskey"][0].checked = false;
	this.addSchoolclassForm.elements["useClasskey"][1].checked = true;
}

SchoolclassesDisplay.prototype.setHelp = function(url) {
	this.$helpContentIFrame.attr('src', url );
}

SchoolclassesDisplay.prototype.updateView = function(json) {
	var schoolclasses = json;
	
	this.$chooseSchoolclassTableBody.html("");
	
	var i = 1;
	for (var id in schoolclasses) { 
		el = schoolclasses[id];
		$row = this.$chooseSchoolclassRow.clone();
		$row.prop('tabindex', i);
		$row.find("#chooseSchoolclassId").val( id ).removeAttr("id");
		$row.find("#chooseSchoolclassName").html( el ).attr('data-sortvalue', el).removeAttr("id");

		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});

		$row.on('click keypress', $.proxy(this.clickChooseSchoolclassRow, this));
		this.$chooseSchoolclassTableBody.append($row);
		i++;
	}
	this.chooseSchoolclassFormToggle(false);
}

SchoolclassesDisplay.prototype.setEmptyTableMessage = function(json) {
	this.$chooseSchoolclassTableBody.html('<tr class="empty"><td><span data-translate="NUM_TBL_EMPTYTABLE">Geen items gevonden</span></td></tr>');
}
SchoolclassesDisplay.prototype.setLoadingTableMessage = function(json) {
	this.$chooseSchoolclassTableBody.html('<tr class="loading"><td><span data-translate="NUM_TBL_FETCHINGDATA">Items worden opgevraagd</span></td></tr>');
}

/*
 * RETURN FUNCTIONS
 * Use java callbacks
 */

SchoolclassesDisplay.prototype.chooseClass = function(id) {
	app.getPresenterFactory().getSchoolclassesPresenter().editSchoolClass(id);
}

SchoolclassesDisplay.prototype.addClass = function(id) {
	app.getPresenterFactory().getSchoolclassesPresenter().AddSchoolClass(this.addSchoolclassForm.elements["classname"].value,
																	this.addSchoolclassForm.elements["useClasstree"].value == 1 ? true : false,
																	this.addSchoolclassForm.elements["useClasskey"].value == 1 ? true : false,
																	this.addSchoolclassForm.elements["classkey"].value);
																	// TODO: function name start with capital?
}


/*
 * EVENT HANDLERS - CHOOSE SCHOOLCLASS
 */

SchoolclassesDisplay.prototype.submitChooseSchoolclass = function(event) {
	event.preventDefault();		
	this.chooseClass(this.chooseSchoolclassForm.elements["schoolclass"].value);
}
SchoolclassesDisplay.prototype.clickChooseSchoolclassRow = function(event) {
	Helpers.selectTableRow(event);
	if (this.chooseSchoolclassForm.elements["schoolclass"].value != "") this.chooseSchoolclassFormToggle(true);
	else this.chooseSchoolclassFormToggle(false);	
}

// helpers
SchoolclassesDisplay.prototype.chooseSchoolclassFormToggle = function(value) {
	if (value) this.$chooseSchoolclassForm.find(':submit').prop('disabled','');
	else this.$chooseSchoolclassForm.find(':submit').prop('disabled','disabled');
}


/*
 * EVENT HANDLERS - ADD SCHOOLCLASS
 */

SchoolclassesDisplay.prototype.submitAddSchoolclass = function(event) {
	event.preventDefault();		
	this.addClass();
}



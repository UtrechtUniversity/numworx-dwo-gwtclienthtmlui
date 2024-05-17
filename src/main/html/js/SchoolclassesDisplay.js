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
	this.$addSchoolclassForm.find("input").on('keyup change', $.proxy(this.changeInputFieldAddSchoolclassForm,this));	
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

SchoolclassesDisplay.prototype.resetSorting = function() {
	this.$chooseSchoolclassTableHead.find(".sortButton").removeClass("active");
}

/*
 * VIEW FUNCTIONS
 * Map to java implementation
 */


SchoolclassesDisplay.prototype.init = function () {
	this.addSchoolclassForm.elements["classname"].value = "";
	this.addSchoolclassForm.elements["classkey"].value = "";
	this.addSchoolclassForm.elements["useClasstree"][0].checked = false;
	this.addSchoolclassForm.elements["useClasstree"][1].checked = true;
	this.addSchoolclassForm.elements["useClasskey"][0].checked = false;
	this.addSchoolclassForm.elements["useClasskey"][1].checked = true;
	
	app.mainDisplay.registerStretchables( [ this.$chooseSchoolclassTableBody ] );
	
	this.changeInputFieldAddSchoolclassForm();
	
	this.resetSorting();
	document.body.scrollTop = 0;
}

SchoolclassesDisplay.prototype.clear = function () {	
	this.addSchoolclassForm.elements["classname"].value = "";
	this.addSchoolclassForm.elements["classkey"].value = "";
	this.addSchoolclassForm.elements["useClasstree"][0].checked = false;
	this.addSchoolclassForm.elements["useClasstree"][1].checked = true;
	this.addSchoolclassForm.elements["useClasskey"][0].checked = false;
	this.addSchoolclassForm.elements["useClasskey"][1].checked = true;
	
	this.changeInputFieldAddSchoolclassForm();
		
	this.resetSorting();
}

SchoolclassesDisplay.prototype.setHelp = function(url) {
	if (this.$helpContentIFrame.attr('src') != url) this.$helpContentIFrame.attr('src', url );
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
		$row.find("#chooseSchoolclassName").html( Helpers.htmlEscape(el) ).attr('data-sortvalue', el).removeAttr("id");

		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});

		$row.on('click keypress', $.proxy(this.clickChooseSchoolclassRow, this));
		this.$chooseSchoolclassTableBody.append($row);
		i++;
	}
	
	this.$chooseSchoolclassTableHead.find(".sortButton.default").trigger('click');
	
	this.chooseSchoolclassFormToggle(false);
}

SchoolclassesDisplay.prototype.setEmptyTableMessage = function(json) {	
	this.$chooseSchoolclassTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');	
}
SchoolclassesDisplay.prototype.setLoadingTableMessage = function(json) {
	this.$chooseSchoolclassTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
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
	
	for (var i = 0; i < this.chooseSchoolclassForm.elements["schoolclass"].length; i++) 
		if (this.chooseSchoolclassForm.elements["schoolclass"][i].checked) break;
	
	this.chooseClass(this.chooseSchoolclassForm.elements["schoolclass"][i].value);
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

SchoolclassesDisplay.prototype.changeInputFieldAddSchoolclassForm = function(event) {
	this.addSchoolclassFormToggle();
	this.classKeyToggle();
}

SchoolclassesDisplay.prototype.addSchoolclassFormToggle = function(value) {
	if (this.requiredFieldsAddSchoolclassForm()) this.$addSchoolclassForm.find(':submit').prop('disabled','');
	else this.$addSchoolclassForm.find(':submit').prop('disabled','disabled');
}

SchoolclassesDisplay.prototype.requiredFieldsAddSchoolclassForm = function() {
	return this.addSchoolclassForm.elements["classname"].value != ""
	 && ( this.addSchoolclassForm.elements["useClasskey"][0].checked ? this.addSchoolclassForm.elements["classkey"].value  != "" : true);
}

SchoolclassesDisplay.prototype.classKeyToggle = function(value) {
	if (this.addSchoolclassForm.elements["useClasskey"][0].checked) this.addSchoolclassForm.elements["classkey"].disabled = false;
	else this.addSchoolclassForm.elements["classkey"].disabled = true;
}



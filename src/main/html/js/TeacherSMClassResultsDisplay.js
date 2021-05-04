/**
 * student model klas results
 */
 function TeacherSMClassResultsDisplay() {
  	this.$panel = $("#teacherSMClassResultsDisplayPanel")
 	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
 
   	this.schoolclassForm = document.forms['teacherSMClassResultsKlas'];
   	this.$schoolclassForm = $(this.schoolclassForm);
 	this.schoolClassSelect = this.schoolclassForm.elements["schoolClass"];
	this.$schoolClassSelect = $(this.schoolClassSelect);
	this.$schoolClassSelectOption = this.$schoolClassSelect.find("option").detach();
 
 
  	this.studentModelForm = document.forms['teacherSMClassResultsTree']
 	this.$studentModelFilter = $(this.studentModelForm.elements['filter'])
  	this.$studentModelFilter.on('click', $.proxy(this.onFilter, this));
 
 	this.$classResultsWrapper = $("#teacherSMClassResultsWrapper");
 	
 	this.$personsRow = this.$classResultsWrapper.find("tbody tr").detach();
	this.$personsTableBody = this.$classResultsWrapper.find("tbody");
	this.$personsTableHead = this.$classResultsWrapper.find("thead");
 	
 	this.$schoolclassForm.on('submit', $.proxy(this.submitPersonsForm, this));
 	this.$personsTableHead.find(".sortButton").click(Helpers.clickSortButton);
    this.$personsMean = $("#teacherSMClassResultsMean")
 	this.$schoolClassSelect.on('change', $.proxy(this.onClassChange, this));
 
  }
  
 TeacherSMClassResultsDisplay.prototype.show = function() {
  	this.$panel.show();
 }
 
 TeacherSMClassResultsDisplay.prototype.setHelp = function(url) {
	if (this.$helpContentIFrame.attr('src') != url) this.$helpContentIFrame.attr('src', url );
}
 
  
 TeacherSMClassResultsDisplay.prototype.init = function() {
 	app.mainDisplay.registerStretchables( [ this.$personsTableBody ] );
 }
 TeacherSMClassResultsDisplay.prototype.clear = function() {}
 
 TeacherSMClassResultsDisplay.prototype.getTreeId = function() {
 	return "teacherSMClassResultsTreeWrapper";
 }
 
 TeacherSMClassResultsDisplay.prototype.setTitle = function(title) {}
 
 TeacherSMClassResultsDisplay.prototype.showSchoolclasses = function(json) {
 	var $option;
 	var current;
	this.schoolClasses = json;
	console.log(json);
	this.$schoolClassSelect.html("");
	
	$option = this.$schoolClassSelectOption.clone();		
	$option.val( "" ).removeAttr("id").html( "" );
	this.$schoolClassSelect.append($option);
	
	for (var id in this.schoolClasses) { 
		$option = this.$schoolClassSelectOption.clone();		
		$option.val( id ).removeAttr("id").html( Helpers.htmlEscape(this.schoolClasses[id].schoolClass.schoolClassName) );
		if (this.schoolClasses[id].tag) current = id;
		this.$schoolClassSelect.append($option);
	}
	this.schoolClassSelect.value = current;
 }
 
 TeacherSMClassResultsDisplay.prototype.getWidget = function(s) {
 	if (s.totalCount > 0) {
 		var red, green;
 		red = s.redPerc + "%"
 		green = s.greenPerc + "%"		
 		return "<span class='score-red'>" + red + "</span>" + s.widget + "<span class='score-green'>" +green +"</span>";
 	}
 	return ""
 }
 
 
 TeacherSMClassResultsDisplay.prototype.setScore = function(json, klas) {
 	console.log(json);
 	console.log(klas);
 	var persons = json, personName;
		
	this.$personsTableBody.html("");
	
	// No Results
	if ($.isEmptyObject(persons)) {
		$row = this.$personsRow.clone();
		this.$personsTableBody.html('<tr colspan="4" class="empty"><td>Geen studenten gevonden.</td></tr>');
		this.$personsMean.html("")
		return;
	}
	
	var i = 1;
	for (var id in persons) { 
		$row = this.$personsRow.clone();		
		$row.find("#teacherSMClassResultsTableId").val( id ).removeAttr("id");
		$row.find("#teacherSMClassResultsTableName").html( Helpers.htmlEscape(persons[id].id )).attr('data-sortvalue', persons[id].id).removeAttr("id");
		$row.find("#teacherSMClassResultsTableScore").html( this.getWidget(persons[id] )).attr('data-sortvalue', persons[id].greenPerc - persons[id].redPerc).removeAttr("id");
						 
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			this.value = id;
		});
		
		$row.on('click keypress', $.proxy(this.clickPersonsRow, this));
		this.$personsTableBody.append($row);
		i++;
	}
	this.$personsMean.html( this.getWidget(klas));
	this.personsEditFormToggle(false);			
	this.$classResultsWrapper.find(".sortButton.default").trigger('click');
 }
 

 
TeacherSMClassResultsDisplay.prototype.onFilter = function(ev) {
	ev.preventDefault();
	app.getPresenterFactory().getSMClassResultsPresenter().onFilter();
}
 
TeacherSMClassResultsDisplay.prototype.onPerson = function(id) {
	app.getPresenterFactory().getSMClassResultsPresenter().onPerson(id);
}
 
 
TeacherSMClassResultsDisplay.prototype.clickPersonsRow = function(event) {
	Helpers.selectTableRow(event);
	if (this.schoolclassForm.elements["id"].value != "") this.personsEditFormToggle(true);
	else this.personsEditFormToggle(false);	
}

TeacherSMClassResultsDisplay.prototype.personsEditFormToggle = function(value) {
	if (value) this.$schoolclassForm.find(':submit').prop('disabled','');
	else this.$schoolclassForm.find(':submit').prop('disabled','disabled');
}
 
 TeacherSMClassResultsDisplay.prototype.submitPersonsForm = function(event) {
	event.preventDefault();	
	
	for (var i = 0; i < this.schoolclassForm.elements["id"].length; i++) 
		if (this.schoolclassForm.elements["id"][i].checked) break;
	
	this.onPerson(this.schoolclassForm.elements["id"][i].value);
}

TeacherSMClassResultsDisplay.prototype.onClassChange = function(ev) {
	ev.preventDefault();
	var id =  this.schoolClassSelect.value;
	app.getPresenterFactory().getSMClassResultsPresenter().onChange(id);	
 }
 
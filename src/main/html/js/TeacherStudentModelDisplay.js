/**
 * Student models for teachers
 */
 function TeacherStudentModelDisplay() {
 	this.$panel = $("#teacherStudentModelDisplayPanel")
 	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
 	this.$treeWrapper = $("#teacherStudentModelTreeWrapper")
 	this.$description = $("#teacherStudentModelDescription")
 
 	this.schoolclassForm = document.forms['teacherStudentmodelKlas'];
 	this.schoolClassSelect = this.schoolclassForm.elements["schoolClass"];
	this.$schoolClassSelect = $(this.schoolClassSelect);
	this.$schoolClassSelectOption = this.$schoolClassSelect.find("option").detach();
 
 	this.studentModelForm = document.forms['teacherStudentModelSelect']
 	this.studentModelSelect = this.studentModelForm.elements['modelselect']
 	this.$studentModelGraph  = $(this.studentModelForm.elements['graph'])
 	this.$studentModelFilter = $(this.studentModelForm.elements['filter'])
 	this.studentModelMethod = (this.studentModelForm.elements['method'])
 	this.$studentModelMethod = $(this.studentModelMethod)
 	this.$studentModelMethodLabel = $("#teacherStudentModelMethod")
 	this.$studentModelSelect = $(this.studentModelSelect)
 	this.$studentModelSelectOption = this.$studentModelSelect.find("option").detach();
 	
 	this.studentModelKlasFilter = document.forms['teacherStudentmodelFilter']
 	this.$studentModelKlas = $(this.schoolclassForm.elements['submit'])
 	this.$studentModelKlasFilter = $(this.studentModelKlasFilter.elements['submit'])
 	
 
 	this.$studentModelSelect.on('change', $.proxy(this.onModelChange, this));
 	this.$schoolClassSelect.on('change', $.proxy(this.onClassChange, this));
 	this.$studentModelGraph.on('click', $.proxy(this.onGraph, this));
 	this.$studentModelFilter.on('click', $.proxy(this.onFilter, this));
 	this.$studentModelKlas.on('click', $.proxy(this.onKlas, this));
 	this.$studentModelKlasFilter.on('click', $.proxy(this.onKlasFilter, this));
 	this.$studentModelMethod.on('change', $.proxy(this.onMethodChange, this));
	
	this.$studentModelTitle = $("#teacherStudentmodelTitle")
 
 	// Init
	this.$panel.hide();
 }
 
 TeacherStudentModelDisplay.prototype.show = function() {
 	app.mainDisplay.registerStretchables( [ this.$treeWrapper ] );
    this.localize();
	this.$panel.show();
 	Helpers.stretchHeight([ this.$treeWrapper ])
}


TeacherStudentModelDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

TeacherStudentModelDisplay.prototype.init = function () {
	this.studentModelGraphToggle(false);
	this.studentModelClassToggle(false);
	this.$studentModelTitle.html('')
}

TeacherStudentModelDisplay.prototype.clear = function () {	
}

TeacherStudentModelDisplay.prototype.setHelp = function(url) {
	if (this.$helpContentIFrame.attr('src') != url) this.$helpContentIFrame.attr('src', url );
}


TeacherStudentModelDisplay.prototype.showSchoolClasses = function(json) {
	var $option;
	this.schoolClasses = json;
	this.$schoolClassSelect.html("");
	
	$option = this.$schoolClassSelectOption.clone();		
	$option.val( "" ).removeAttr("id").html( "" );
	this.$schoolClassSelect.append($option);
	
	for (var id in this.schoolClasses) { 
		$option = this.$schoolClassSelectOption.clone();		
		$option.val( id ).removeAttr("id").html( Helpers.htmlEscape(this.schoolClasses[id].schoolClass.schoolClassName) );
		this.$schoolClassSelect.append($option);
	}
}

TeacherStudentModelDisplay.prototype.showModels = function(json) {
	var $option;
	this.titles = json;
	this.$studentModelSelect.html("");
	$option = this.$schoolClassSelectOption.clone();		
	$option.val( "" ).removeAttr("id").html( "Kies eerst een model" );
	this.$studentModelSelect.append($option);
	
	for (var id in this.titles) { 
		$option = this.$studentModelSelectOption.clone();		
		$option.val( id ).removeAttr("id").html( Helpers.htmlEscape(this.titles[id]) );
		this.$studentModelSelect.append($option);
	}
}

TeacherStudentModelDisplay.prototype.showTree = function(json) {

}

TeacherStudentModelDisplay.prototype.getTreeId = function() {
	return "teacherStudentModelTreeWrapper"
}
TeacherStudentModelDisplay.prototype.getDescriptionId = function() {
	return "teacherStudentModelDescription"
}

TeacherStudentModelDisplay.prototype.setTitle = function(string) {
	this.$studentModelTitle.html( Helpers.htmlEscape(string))
}
TeacherStudentModelDisplay.prototype.setMethodLabel = function(string) {
	this.$studentModelMethodLabel.html( Helpers.htmlEscape(string))
}

TeacherStudentModelDisplay.prototype.setModelSelect = function(id) {
	this.studentModelSelect.value = id;
	this.studentModelGraphToggle(id != '');
}

// helpers
TeacherStudentModelDisplay.prototype.studentModelGraphToggle = function(value) {
	if (value) this.$studentModelGraph.prop('disabled','');
	else this.$studentModelGraph.prop('disabled','disabled');       

	if (value) this.$studentModelFilter.prop('disabled','');
	else this.$studentModelFilter.prop('disabled','disabled');
	
	if (value) this.$studentModelKlasFilter.prop('disabled', '');
	else this.$studentModelKlasFilter.prop('disabled', 'disabled'); 
}

TeacherStudentModelDisplay.prototype.studentModelClassToggle = function(value) {
	if (value) this.$studentModelKlas.prop('disabled','');
	else this.$studentModelKlas.prop('disabled', 'disabled');
}


//Events

TeacherStudentModelDisplay.prototype.onClassChange = function(ev) {
	ev.preventDefault();
	var id = this.schoolClassSelect.value;
	var id2 = this.studentModelSelect.value;
	this.studentModelClassToggle(id != '' && id2 != '');
}

TeacherStudentModelDisplay.prototype.onModelChange = function(ev) {
	this.onClassChange(ev)
	var id =  this.studentModelSelect.value;
	this.studentModelGraphToggle(id != '');
	app.getPresenterFactory().getStudentModelPresenter().selectModel(id);	
}

TeacherStudentModelDisplay.prototype.onGraph = function(ev) {
	ev.preventDefault();
	app.getPresenterFactory().getStudentModelPresenter().onGraph();	
}

TeacherStudentModelDisplay.prototype.onFilter = function(ev) {
	ev.preventDefault();
	app.getPresenterFactory().getStudentModelPresenter().onFilter();
}

TeacherStudentModelDisplay.prototype.isMethod = function() {
	var value = this.studentModelMethod.checked
	return value;
}

TeacherStudentModelDisplay.prototype.onMethodChange = function(ev) {
	ev.preventDefault();
	var value = this.isMethod()
	app.getPresenterFactory().getStudentModelPresenter().onMethod(value);
}

TeacherStudentModelDisplay.prototype.onKlas = function(ev) {
	ev.preventDefault();
	var id = this.schoolClassSelect.value;
	app.getPresenterFactory().getStudentModelPresenter().onSchoolClass(id);
}

TeacherStudentModelDisplay.prototype.onKlasFilter = function(ev) {
	ev.preventDefault();
	var id = this.schoolClassSelect.value;
	app.getPresenterFactory().getStudentModelPresenter().onSchoolClassFilter(id);
}



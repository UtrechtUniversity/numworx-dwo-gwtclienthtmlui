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
 	this.$studentModelSelect = $(this.studentModelSelect)
 	this.$studentModelSelectOption = this.$studentModelSelect.find("option").detach();
 	
 	this.studentModelKlasFilter = document.forms['teacherStudentmodelFilter']
 	this.$studentModelKlas = $(this.schoolclassForm.elements['submit'])
 	this.$studentModelKlasFilter = $(this.studentModelKlasFilter.elements['submit'])
 	
 
 	this.$studentModelSelect.on('change', $.proxy(this.onModelChange, this));
 	this.$studentModelGraph.on('click', $.proxy(this.onGraph, this));
 	this.$studentModelFilter.on('click', $.proxy(this.onFilter, this));
 	this.$studentModelKlas.on('click', $.proxy(this.onKlas, this));
 	this.$studentModelKlasFilter.on('click', $.proxy(this.onKlasFilter, this));
	
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
	console.log("init!");
}

TeacherStudentModelDisplay.prototype.clear = function () {	
}

TeacherStudentModelDisplay.prototype.setHelp = function(url) {
	if (this.$helpContentIFrame.attr('src') != url) this.$helpContentIFrame.attr('src', url );
}


TeacherStudentModelDisplay.prototype.showSchoolClasses = function(json) {
	var $option;
	this.schoolClasses = json;
	console.log(json);
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
	console.log(json);
	this.$studentModelSelect.html("");
	$option = this.$schoolClassSelectOption.clone();		
	$option.val( "" ).removeAttr("id").html( "" );
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


//Events

TeacherStudentModelDisplay.prototype.onModelChange = function(ev) {
	ev.preventDefault();
	var id =  this.studentModelSelect.value;
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



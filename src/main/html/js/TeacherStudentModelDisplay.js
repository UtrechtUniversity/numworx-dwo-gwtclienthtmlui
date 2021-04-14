/**
 * Student models for teachers
 */
 function TeacherStudentModelDisplay() {
 	this.$panel = $("#teacherStudentModelDisplayPanel")
 	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
 	this.$treeWrapper = $("#teacherStudentModelTreeWrapper")
 	this.$description = $("#teacherStudentModelDescription")
 
 	this.schoolclassForm = document.forms['studentmodelKlas'];
 	this.schoolClassSelect = this.schoolclassForm.elements["schoolClass"];
	this.$schoolClassSelect = $(this.schoolClassSelect);
	this.$schoolClassSelectOption = this.$schoolClassSelect.find("option").detach();
 
 	this.studentModelForm = document.forms['teacherStudentModelSelect']
 	this.studentModelSelect = this.studentModelForm.elements['modelselect']
 	this.$studentModelSelect = $(this.studentModelSelect)
 	this.$studentModelSelectOption = this.$studentModelSelect.find("option").detach();
 
 	this.$studentModelSelect.on('change', $.proxy(
 
 	// Init
	this.$panel.hide();
 }
 
 TeacherStudentModelDisplay.prototype.show = function() {
 	app.mainDisplay.registerStretchables( [ this.$treeWrapper, this.$description ] );
    this.localize();
	this.$panel.show();
 	Helpers.stretchHeight([ this.$treeWrapper, this.$description ])
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


//Events

TeacherStudentModelDisplay.prototype.onModelChange = function(ev) {
	ev.preventDefault();
	var id =  this.studentModelSelect.value;
	app.getPresenterFactory().getStudentModelPresenter().selectModel(id);
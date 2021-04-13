/**
 * Student models for teachers
 */
 function TeacherStudentModelDisplay() {
 	this.$panel = $("#teacherStudentModelDisplayPanel")
 	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
 	this.$treeWrapper = $("#teacherStudentModelTreeWrapper")
 	this.$description = $("#teacherStudentModelDescription")
 
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

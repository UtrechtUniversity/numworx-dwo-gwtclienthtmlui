/**
 * Student Results, aka DomainModels for students.
 */
 
function TeacherClassFilterDisplay() {
 	this.$panel = jQuery("#teacherKlasFilterDisplayPanel");
 	this.$widget = $( "#"+ this.getId() );
 	this.$back   = $( "#klasFilterBacklink");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	//this.$back.off('click');
	this.$back.on('click', $.proxy(this.backToSM, this));
//	var proxy = $.proxy(this.backToSM, this);
//	this.$back.click( function(ev) { 
//		console.log("EV " + ev); 
//		proxy(ev);
//	});
	
 	this.$panel.hide();
}
 
TeacherClassFilterDisplay.prototype.getId = function() {
 	return "teacherKlasFilterWrapper";
}
 
TeacherClassFilterDisplay.prototype.init = function () {
	document.body.scrollTop = 0;
}

TeacherClassFilterDisplay.prototype.clear = function () {
	this.$widget.html("");
}

TeacherClassFilterDisplay.prototype.backToSM = function (event) {
	event.preventDefault();
	app.getPresenterFactory().getTeacherClassFilterPresenter().back()
}


TeacherClassFilterDisplay.prototype.show = function() {
	app.mainDisplay.registerStretchables( [ this.$widget ] );
    this.localize();
	this.$panel.show();
	Helpers.stretchHeight([ this.$widget ]);
}

TeacherClassFilterDisplay.prototype.localize = function() {
	this.$panel.find("[data-translate]").each( Helpers.translate );
}

/**
 * setHelp shows help url
 */
TeacherClassFilterDisplay.prototype.setHelp = function(url) {
	if (this.$helpContentIFrame.attr('src') != url) this.$helpContentIFrame.attr('src', url );
}

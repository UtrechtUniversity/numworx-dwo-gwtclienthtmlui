/**
 * ImportPersonsDisplay
 */

function ImportPersonsDisplay() {
	// jQuery objects
	this.$panel = jQuery("#importPersonsDisplay");
	this.$helpContentIFrame = this.$panel.find(".help iframe").first();
	
	this.$schoolclassesTable = $("#importPersonsSchoolClassesTable");
	this.$schoolclassesRow = this.$schoolclassesTable.find("tbody tr").first().detach();
	this.$schoolclassesTableBody = this.$schoolclassesTable.find("tbody");
	this.$schoolclassesTableHead = this.$schoolclassesTable.find("thead");
	this.$schoolclassesTableHead.find(".sortButton").click(Helpers.clickSortButton);	

}

ImportPersonsDisplay.prototype.show = function() {
	this.$panel.show();
}

ImportPersonsDisplay.prototype.clear = function () {	
	this.$schoolclassesTableHead.find(".sortButton").removeClass("active");
}

ImportPersonsDisplay.prototype.init = function() {}

ImportPersonsDisplay.prototype.setEmptyPeopleTableMessage = function() {}

ImportPersonsDisplay.prototype.setLoadingPeopleTableMessage = function() {}

ImportPersonsDisplay.prototype.setEmptySchoolClassesTableMessage = function() {	
	this.$schoolclassesTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_EMPTYTABLE' )+'</td></tr>');		
}

ImportPersonsDisplay.prototype.setLoadingSchoolClassesTableMessage = function() {
	this.$schoolclassesTableBody.html('<tr class="empty"><td>'+app.getTranslator().translate( 'NUM_TBL_FETCHINGDATA' )+'</td></tr>');	
}

ImportPersonsDisplay.prototype.setHelp = function(url) {
	this.$helpContentIFrame.attr('src', url );
}


ImportPersonsDisplay.prototype.setPersonImportList = function(json) {
	var persons = json;
	
	
	
}

ImportPersonsDisplay.prototype.changeInputField = function(event) {
	// validate all fields.
}


ImportPersonsDisplay.prototype.showSchoolClasses = function(json) {
	var schoolclasses = json;
	
	this.$schoolclassesTableBody.html("");
	
	var i = 1;
	for (var id in schoolclasses) { 
		el = schoolclasses[id].schoolClass;
		$row = this.$schoolclassesRow.clone();
		$row.prop('tabindex', i);
		$row.find("#importPersonsSchoolclassName").html( el.schoolClassName ).attr('data-sortvalue', el.schoolClassName).removeAttr("id");
	
		$row.find("input[type='checkbox'],input[type='radio']").each( function() {
			
			this.value = id;
			
			// Change ID and label for-attributes
			this.id = this.id + i;				
			oldFor = this.nextElementSibling.getAttribute("for");
			this.nextElementSibling.setAttribute("for", oldFor + i);
		});
		
		$row.find("input[type='checkbox'],input[type='radio']").on('change', $.proxy(this.changeInputField,this));	

		this.$schoolclassesTableBody.append($row);
		i++;
	}
	this.$schoolclassesTableHead.find(".sortButton.default").trigger('click');
}

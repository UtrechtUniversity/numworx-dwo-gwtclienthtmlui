/**
 * OrganisationDisplay
 */

function OrganisationDisplay() {
	
}

/**
 * called by MainDisplay to show the panel
 */
OrganisationDisplay.prototype.show = function() {
	
}


/*
 * API of jsOrganisationDisplay
 */

/**
 * Initializes the ui.
 */
OrganisationDisplay.prototype.init = function() {
	
}

/**
 * Clears all UI states
 */
OrganisationDisplay.prototype.clear = function() {
	
}

/**
 * setHelp shows help url
 */
OrganisationDisplay.prototype.setHelp = function(url) {
	
}

/**
 * setEmptyTableMessage show an indicator that the table is empty.
 */
OrganisationDisplay.prototype.setEmptyTableMessage = function() {
	
}

/**
 * setLoadingTableMessage show an indicator that we are fetching data.
 */
OrganisationDisplay.prototype.setLoadingTableMessage = function() {
	
}

/**
 * Fills the list view with the list of persons. It requires a JSONObject
 * with each field the item key, and a converted TaggedDomUser as value.
 *
 * @param data a StudentsTree, a TeacherTree, a SchoolAdminTree,
 * @param role STUDENT, TEACHER, SCHOOLADMIN
 */
OrganisationDisplay.prototype.showPersons = function(data, role) {
	
}

/**
 * initialise the edit modules radio buttons.
 * @param bool ja/nee
 */
OrganisationDisplay.prototype.initEditModules = function(bool) {
	
}

/**
 * Extra: showSchoolClasses. Voor de filtering.
 */
OrganisationDisplay.prototype.showSchoolClasses = function(json) {
	var schoolclasses = json;
}
/*
 * API of OrganisationPresenter
*/

/**
 * a true/false voor: "Leerling kunnen zelf klas kiezen".
 * upcall naar presenter
 */
OrganisationDisplay.prototype.setChooseClass = function(bool) {
	app.getPresenterFactory().getOrganisationPresenter().setChooseClass(bool);
}

/**
 * a true/false voor: "docenten kunnen zelf modules aanpassen".
 * upcall naar presenter
 */
OrganisationDisplay.prototype.setEditModules = function(bool) {
	app.getPresenterFactory().getOrganisationPresenter().setEditModules(bool);
}

/**
 * select role. 
 * role = { STUDENT, TEACHER, SCHOOLADMIN }
 * upcall to presenter.
 * presenter calls setLoadingTablemessage followed by showPersons/setEmptyTableMessage
 */
OrganisationDisplay.prototype.selectRole = function(role) {
	app.getPresenterFactory().getOrganisationPresenter().selectRole(role);
}


/**
 * delete Persons, with list of persons (ids) and role
 * role = { STUDENT, TEACHER, SCHOOLADMIN }
 * upcall to presenter
 * presenter calls showPersons, with a reduced list of persons (or setEmptyTableMessage
 */
OrganisationDisplay.prototype.deletePersons = function(persons, role) {
	app.getPresenterFactory().getOrganisationPresenter().deletePersons(persons, role);
}


var hashChange = function() {
	$("section").hide();
	if(section = window.location.hash) {
		$(section).show();
	}
};

$(document).ready(function(){ 
	hashChange();				
	$(window).on('hashchange',hashChange);
});
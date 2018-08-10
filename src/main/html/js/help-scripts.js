var hashChange = function(event) {	
					$("section").hide();
					if(section = window.location.hash) {
						$(section).show();
					}
				};

$(document).ready(function(){ 
	hashChange();
	$(document).on('hashchange',hashChange);
});
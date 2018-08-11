var hashChange = function(event) {	
					$("section").hide();
					$(""+window.location.hash).show();
				};

$(document).ready(function(){ 
	hashChange();
	$(window).on('hashchange',hashChange);
});
var hashChange = function(event) {	
					$("section").hide();
					$(""+window.location.hash).attr("style", "display:block");
				};

$(document).ready(function(){ 
	hashChange();
	$(window).on('hashchange',hashChange);
});
function Helpers() {

}

Helpers.selectTableRow = function(event) {
	if (event.type == "keypress" && event.keyCode != 32) return;

	var $el = $(event.target);
	$el = $el.first();
	
	while ($el.get(0).tagName != "TR") {
		$el = $el.parent();
	}
	
	var $input = $el.find("input");
	var form = $input[0].form;
	
	if ($input[0].checked == false) $input[0].checked = true;
	else $input[0].checked = false;		
		
	for (i = 0; i < form.elements.length; i++) {
		el = form.elements[i];		
		if ( (el.type=="radio" || el.type=="checkbox") && el.checked ) $(el.parentElement.parentElement).addClass("selected");
		else $(el.parentElement.parentElement).removeClass("selected");
	}
}

Helpers.resizeHelpSection = function(event) {
	var $help = $(".help");
	if ($(window).outerWidth() > (1366)) {
		$help.addClass('active desktop');			
		if ($(window).outerWidth() > (1366 + 158)) $help.addClass('col-3'); else $help.removeClass('col-3');
		if ($(window).outerWidth() > (1366 + 158 + 1 * 79)) $help.addClass('col-4'); else $help.removeClass('col-4');
		if ($(window).outerWidth() > (1366 + 158 + 2 * 79)) $help.addClass('col-5'); else $help.removeClass('col-5');
		if ($(window).outerWidth() > (1366 + 158 + 3 * 79)) $help.addClass('col-6'); else $help.removeClass('col-6');
		if ($(window).outerWidth() > (1366 + 158 + 4 * 79)) $help.addClass('col-7'); else $help.removeClass('col-7');
		if ($(window).outerWidth() > (1366 + 158 + 5 * 79)) $help.addClass('col-8'); else $help.removeClass('col-8');
		if ($(window).outerWidth() > (1366 + 158 + 6 * 79)) $help.addClass('col-9'); else $help.removeClass('col-9');
		if ($(window).outerWidth() > (1366 + 158 + 7 * 79)) $help.addClass('col-10'); else $help.removeClass('col-10');
		if ($(window).outerWidth() > (1366 + 158 + 8 * 79)) $help.addClass('col-11'); else $help.removeClass('col-11');		
	}		
	else $help.removeClass('active desktop col-3 col-4 col-5 col-6');
}

Helpers.toggleHelpSection = function() {
	if (!$(this).parent().hasClass('desktop')) {
		$(this).closest('.help').toggleClass('active'); 
		
		//$(this).closest('.help').css('z-index','9999');
		if ($(this).closest('.help').hasClass('active')) {
			app.mainDisplay.openHelp();
		} else {
			app.mainDisplay.closeHelp();
		}  
		//$(this).parent().find("iframe").get(0).contentWindow.location.reload();
	}
}

Helpers.stretchHeight = function(elements) {
	if (elements.length < 1) return;
	subpanel = elements[0].closest('.subpanel');
	subpanelHeight = subpanel.outerHeight();
	bodyHeight = $(document.body).outerHeight();
	freeSpace = bodyHeight - subpanelHeight;
		
	for(i=0; i<elements.length; i++) {
		newHeight = elements[i].height() + freeSpace;
		elements[i].height(newHeight+"px");
	}
}

// Helpers.strechHeightResize = function(event) {
// 	subpanel = elements[0].closest('.subpanel');
// 	subpanelHeight = subpanel.outerHeight();
// 	bodyHeight = $(document.body).outerHeight();
// 	freeSpace = bodyHeight - subpanelHeight;
//
// 	var $el = $(event.target);
// 	newHeight = $el.height() + freeSpace;
// 	$el.height(newHeight+"px");
// }

Helpers.stretchIframeHeight = function(iframe) {
	console.log("STRETCH IFRAME!");
	//if (elements.length < 1) return;
	
	subpanel = iframe.closest('.subpanel');
	subpanelHeight = subpanel.outerHeight();
	
	iframe.outerHeight(subpanelHeight+"px");
}

Helpers.setResultIndicatorColor = function ($el) {
	// OLD STYLING smooth scale
	// var r, g, b, score;
	// 	score = parseInt($el.data("score"));
	//
	// 	if (score > 0) {
	//
	//        b = 0;
	//        g = parseInt( (255 * (score / 50)) );
	//        r = parseInt( (255 * (1 - (score - 50) / 50)) );
	//
	// 	   $el.css('border-color','rgb('+r+','+g+','+b+')' );
	//    }
	
	var score = parseInt($el.data("score"));
	
	if (score < 10) {
		$el.addClass('result4'); return
	} else if (score < 50) {
		$el.addClass('result3'); return
	}  else if (score < 80) {
		$el.addClass('result2'); return
	}  else if (score <= 100) {
		$el.addClass('result1'); return
	}
}


Helpers.tableSorterBubbleSort = function(tbody, index, attr, type, asc) { //bubblesort
	// In Vanilla JS for performance	
	console.log("bubblesort");
	
	switching = true;
	j = 0;
	while (switching) {
		j++; if (j > 250000) { break; } // safety stop to avoid endless loops, max 500 items to sort
		
		switching = false;
				
		tr = tbody.getElementsByTagName("TR");
		
		for (i = 0; i < tr.length; i++) {
			shouldSwitch = false;
			
			row1 = tr[i];
			row2 = tr[i+1];
			if (!row2) break;
			
			val1 = 0;
			val2 = 0;
			
			if (row1.children[index].firstChild && row1.children[index].firstChild.dataset) val1 = row1.children[index].firstChild.dataset[attr]; 
			if (row2.children[index].firstChild && row2.children[index].firstChild.dataset) val2 = row2.children[index].firstChild.dataset[attr];
												
			if (val1 != 0 && val2 != 0 && type == "string") {
				if ( (asc && val2.localeCompare(val1) < 0) || (!asc && val2.localeCompare(val1) > 0) ) { shouldSwitch = true; break; }
			} else {
				if ( (asc && val2 < val1) || (!asc && val2 > val1) ) { shouldSwitch = true; break; }
			}						
		}		
		if (shouldSwitch == true) {	
			if (asc) tr[i].parentNode.insertBefore(tr[i + 1], tr[i]);
			else {
				(tr[i].parentNode).insertBefore(tr[i], tr[i+1].nextSibling);
			}
			switching = true;
		}
	}
	return;
}

Helpers.tableSorterMergeSort = function($tbody, index, attr, type, asc) {	
	var tr = $tbody.find("tr").detach();
		
	// make an array of the nodelist
	var arr = [];
	for(var i = tr.length; i--; arr.unshift(tr[i]));
	
	arr = Helpers.tableSorterMergeSortRecursive(arr, index, attr, type, asc);
		
	$tbody.append(arr);//.append(tr);
} 

Helpers.tableSorterMergeSortRecursive = function(arr, index, attr, type, asc) {
	if (arr.length === 1) return arr;
	
    var middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
    var left = arr.slice(0, middle) // items on the left side
    var right = arr.slice(middle) // items on the right side
	
	return Helpers.tableSorterMergeSortMerge( 
		Helpers.tableSorterMergeSortRecursive(left, index, attr, type, asc),
		Helpers.tableSorterMergeSortRecursive(right, index, attr, type, asc), index, attr, type, asc );
}
Helpers.tableSorterMergeSortMerge = function(left, right, index, attr, type, asc) {
    var result = [];
    var indexLeft = 0;
    var indexRight = 0;
	var val1 = 0;
	var val2 = 0;

    while (indexLeft < left.length && indexRight < right.length) {
		
		if (left[indexLeft].children[index].children[0] && left[indexLeft].children[index].children[0].dataset) val1 = left[indexLeft].children[index].children[0].dataset[attr]; 
		if (right[indexRight].children[index].children[0] && right[indexRight].children[index].children[0].dataset) val2 = right[indexRight].children[index].children[0].dataset[attr];
		
		if (val1 != 0 && val2 != 0 && type == "string") { // string sort
			
			if ( (asc && val2.localeCompare(val1) < 0) || (!asc && val2.localeCompare(val1) > 0) ) { 
		        result.push(left[indexLeft])
		        indexLeft++
			} else {
		        result.push(right[indexRight])
		        indexRight++
			}
			
		} else { // integer sort
			
			if ( (asc && val2 < val1) || (!asc && val2 > val1) ) { 	
			    result.push(left[indexLeft])
			    indexLeft++				
			} else {
		        result.push(right[indexRight])
		        indexRight++
			}
		}
    }

    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}


Helpers.clickSortButton = function() {
	$this = $(this);
	$table = $this.parents('table');
	$tbody = $table.find('tbody');//.get(0);
	index = $this.parent().index();
	
	asc = true;
	if ($this.data("order") == "desc") asc = false;
	
	type = "int";
	if ($this.data("type") == "string") type = "string";
	
	attr = "sortvalue";
		
	//var t0 = performance.now();
	//Helpers.tableSorterBubbleSort(tbody, index, attr, type, asc);	
	Helpers.tableSorterMergeSort($tbody, index, attr, type, asc);	
	//var t1 = performance.now();
	//console.log("Call took " + (t1 - t0) + " milliseconds.")
	
	$this.closest("table").find('.sortButton').removeClass("active");
	$this.addClass("active");	
}

Helpers.translate = function(index, value) {
	var $el = $(value);
	var translation = app.getTranslator().translate( $el.data("translate") );
	if ($el.get(0).tagName == "SPAN" ||
		$el.get(0).tagName == "P" ||
		$el.get(0).tagName == "H1" ||
		$el.get(0).tagName == "H2") {
			$el.text(translation);
	} else if ( $el.get(0).tagName == "INPUT") {
		$el.val( translation );
	}
}

Helpers.getIndexedSortedArray = function(associativeArray) {
	var indexedArray = [];
	for (var id in associativeArray) {
		associativeArray[id].id = id;
		indexedArray.push(associativeArray[id]);
	}
	indexedArray.sort( Helpers.sortIndexedArrayOnSequenceNr );
	
	return indexedArray;
}

Helpers.sortIndexedArrayOnSequenceNr = function(a, b) {
	return parseInt(a.sequence) - parseInt(b.sequence);
}

Helpers.addClassIfOverflown = function(index, el) {
	console.log(el.scrollWidth);
	console.log(el.clientWidth);
	if (el.scrollWidth > (el.clientWidth + 10)) {
		$(el).addClass("overflown");
	}	
}

Helpers.searchCompare = function( val1, val2 ) {
	//if (val1 == "" || val2 == "") return true;
	
	regE = new RegExp( val2 , 'i' );
	return val1.search(regE) != -1;
}




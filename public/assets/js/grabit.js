//  ########################################################### image tabs ###############################################################

(function ($) {
    
    $.autofilter = function( options ) {

        var settings = $.extend({
            showClass: 'show',
            htmlAsFilter: false,
            subString: false,
            minChars: 3,
            caseSensitive: false,
            animation: true,
            duration: 0
        }, options );

        $('[data-filter]:not(input)').click(function() {
            if (settings.htmlAsFilter) {
                var filterValue = $(this).html().trim();
            } else {
                var filterValue = $(this).attr('data-filter').trim();
            }

            if (filterValue!='')
                af_filter(filterValue);
            else
                $('[data-tags],[data-to-filter]').fadeIn(settings.duration).addClass(settings.showClass);
        });

        $('input[data-filter]').keyup(function() {
            var value = $(this).val();
            settings.subString = true;

            if (value!='' && value.length>=settings.minChars) {
                af_filter(value);
            } else {
                $('[data-tags],[data-to-filter]').fadeIn(settings.duration).addClass(settings.showClass);
            }

        });

        function af_filter(filterValue) {
            $('[data-tags],[data-to-filter]').each(function() {
                var tags = $(this).attr('data-tags');
                var tofilter = Array();
                var valid = false;
                
                if (!settings.caseSensitive) 
                    filterValue = filterValue.toLowerCase();

                if (tags) {
                    tofilter = tags.split(',');
                } else {
                    tofilter.push($(this).html());
                }

                if (!settings.caseSensitive) 
                    tofilter = tofilter.map(v => v.toLowerCase());

                if (settings.subString) {
                    tofilter.forEach(function(toFilterOne) {
                        if (toFilterOne.replace(/(&lt;([^>]+)>)/gi, "").indexOf(filterValue) > -1) {
                            valid = true;
                        }
                    });
                } else {
                    valid = tofilter.includes(filterValue);
                }

                if (valid) {
                    if (settings.animation)
                        $(this).fadeIn(0);
                    
                    $(this).addClass(settings.showClass);
                } else {
                    if (settings.animation)
                        $(this).fadeOut(settings.duration);
                    
                    $(this).removeClass(settings.showClass);
                }

            });
        }
 
    };

}(jQuery));

// ##############################################################################filter in search box ########################################

/*####################### Filter Buttons ####################################### */

filterSelection("all")

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

// Show filtered elements
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}


/*####################### Filter Suche ####################################### */

function searchFunction() {
    // Declare variables
    var input, filter, list, i;
    input = document.getElementById('searchinput');

    filter = input.value.toUpperCase();
    list = document.getElementsByClassName('content');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < list.length; i++) {
        if (list[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            list[i].parentElement.parentElement.style.display = "";
        } else {
            list[i].parentElement.parentElement.style.display = "none";
        }
    }
}


var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}

// doctor search

function searchdoctorFunction() {
    // Declare variables
    var input, filter, list, i;
    input = document.getElementById('searchinputdoctor');

    filter = input.value.toUpperCase();
    list = document.getElementsByClassName('contentdoctor');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < list.length; i++) {
        if (list[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            list[i].parentElement.parentElement.style.display = "";
        } else {
            list[i].parentElement.parentElement.style.display = "none";
        }
    }
}


var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}


// communitypillar


function searchpillarFunction() {
    // Declare variables
    var input, filter, list, i;
    input = document.getElementById('searchinputpillar');

    filter = input.value.toUpperCase();
    list = document.getElementsByClassName('contentpillar');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < list.length; i++) {
        if (list[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            list[i].parentElement.parentElement.style.display = "";
        } else {
            list[i].parentElement.parentElement.style.display = "none";
        }
    }
}


var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}



// public Services 


function searchpublicFunction() {
    // Declare variables
    var input, filter, list, i;
    input = document.getElementById('searchinputpublic');

    filter = input.value.toUpperCase();
    list = document.getElementsByClassName('contentpublic');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < list.length; i++) {
        if (list[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            list[i].parentElement.parentElement.style.display = "";
        } else {
            list[i].parentElement.parentElement.style.display = "none";
        }
    }
}


var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}



// ######################################### sort ###################################################################################

// Select Change
$('#categoryFilter').change(function() {

    var category = $(this).val();
  
    if (category === 'all') {
      $('#parent > div').fadeIn(450);
    } else {
      $('#parent > div').fadeIn(450);
      $('#parent > div').not('.' + category).hide();
    }
  
  });
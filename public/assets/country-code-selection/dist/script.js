// -----Country Code Selection
$("#mobile_code").intlTelInput({
	initialCountry: "in",
	separateDialCode: true,
	// utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
});

$("#mobile_code1").intlTelInput({
	initialCountry: "in",
	separateDialCode: true,
	// utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
});

//var a = $("#mobile_code").intlTelInput();
//var ide = $('#mobile_code').attr('title');

//JSON.stringify(code);
//alert(code);

//var country_code = $('.iti__selected-flag').attr('title');
$(".iti__selected-dial-code").attr("name", country_code);

var b = $('.iti__dial-code').html();
$(".iti__selected-dial-code").attr("name", "");
//var code = $('.iti__selected-dial-code').html();

//console.log(country_code);


$(".iti__selected-flag").click(function country_code() {

	var title = $(this).attr('title').toLowerCase(); //this changed

	if (title.length != 0) {

		alert(title);
	}
});
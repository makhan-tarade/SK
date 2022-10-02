
// user login form desktop
$("#login-form").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.
    
    var form = $(this);
    var actionUrl = form.attr('action');
    // var actionUrl = '/mobile-verification';

    $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), // serializes the form's elements.
        success: function (data) { 
           
             //alert(data);
             if (data.status === 'success') {
                window.location.href = "/otp";
            }

            else if (data.status === 'failed') {
                alert(data.message);
                window.location.href = "/register";
            }

            
        },
        error: function (data) {
            console.log('Failed');
            alert('connection Failed');
        }
    });    

});

// user login form mobile
$("#login-form-mobile").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.
    
    var form = $(this);
    var actionUrl = form.attr('action');
    // var actionUrl = '/mobile-verification';

    $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), // serializes the form's elements.
        success: function (data) { 
           
             //alert(data);
             if (data.status === 'success') {
                window.location.href = "/otp";
            }

            else if (data.status === 'failed') {
                alert(data.message);
                window.location.href = "/register";
            }

            
        },
        error: function (data) {
            console.log('Failed');
            alert('connection Failed');
        }
    });    

});


// user registration form desktop
$("#user-restration-form").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var actionUrl = form.attr('action');

    $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), // serializes the form's elements.
        success: function (data) { 
             //alert(data);
             if (data.status === 'success') {
                window.location.href = "/login";
            }

            else if (data.status === 'failed') {
                alert(data.message);
                // window.location.href = "/user-registration";
            }
          
        },
        error: function (data) {
            console.log('Failed');
            alert('connection Failed');
        }
    });    

});

// user registration form mobile
$("#user-restration-form-mobile").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var actionUrl = form.attr('action');

    $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), // serializes the form's elements.
        success: function (data) { 
             //alert(data);
             if (data.status === 'success') {
                window.location.href = "/login";
            }

            else if (data.status === 'failed') {
                alert(data.message);
                // window.location.href = "/user-registration";
            }
          
        },
        error: function (data) {
            console.log('Failed');
            alert('connection Failed');
        }
    });    

});

// pincode validation
$(".pincode-input").change(function () {
    var pin = $(this).val();            

    $.get(`/find-pin/${pin}`, function (data) {
        
        if(pin !== data.result){
            $('.pin-validation').html('wrong pincode').css('color', 'red');
        }
        
        if(pin === data.result){
            $('.pin-validation').html('');
        }


    });
});   
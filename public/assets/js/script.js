// profile img changes start
$(document).ready(function () {


    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    $(".file-upload").on('change', function () {
        readURL(this);
        $("#profile_pic_form").submit();
    });

    $(".upload-button").on('click', function () {
        $(".file-upload").click();
    });

    // background image change
    var readURL1 = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic1').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    $(".file-upload").on('change', function () {
        readURL(this);
        $("#profile_pic_form").submit();
    });

    $(".upload-button").on('click', function () {
        $(".file-upload").click();
    });
});


// profile img changes end

$("#health-form1").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var actionUrl = form.attr('action');

    $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), // serializes the form's elements.
        success: function (data) { 
           

            // if(data.length>0) {
            //     data.forEach((e, index) => {               
            //         // $('.search-view').append('<p>' + e.fullname + '</p><br>'); 
            //         $('.search-popup').append('<p>' + e.fullname + '</p><br>');             
    
            //     });
            // } else {
            //     $('.search-popup').append('<p> user not found </p><br>'); 
            // }
            if (data.status === 'failed'){
                alert(data.massage)
            } else if (data.status === 'success') {
                alert(data.massage)
            }
            

            
        }
    });    

});
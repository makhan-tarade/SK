
// show result
// $('#comment-btn').on('click', (e) => {
//     e.preventDefault();
//     //start ajax request
//     $.ajax({
//         url: "/feed-like-show",
//         //force to handle it as texts
//         dataType: "text",
//         success: function (data) {

//             var json = $.parseJSON(data);

//             alert(data);

//             $('#like-show').html(json.like + ' likes');
//             // }
//         }
//     });
// });


// Form submit - post method
$('#myform').on('submit', (e) => {
    e.preventDefault();
    let email = $('#exampleInputEmail1');
    let pass = $('#exampleInputPassword1');
    let check = $('#exampleCheck1');

    $.ajax({
        url: '/ajax-save',
        method: 'POST',
        data: {
            email: email.val(),
            pass: pass.val(),
            check: check.val()
        },
        success: function (data) {
            // newProduct.val('');
            // $('#myform').click();
            alert('Your form submited successsfully !');

        },
        error: function (err) {
            console.log(err);
        }
    });
});


// // Like 
// $('#like-btn').on('click', (e) => {
//     e.preventDefault();
//     let id = $('#like-id');


//     $.ajax({
//         url: '/feed-like',
//         method: 'POST',
//         data: {
//             id: id.val(),
//         },
//         success: function (data) {
//             // newProduct.val('');
//             // $('#myform').click();
//             //alert(data.like);

//             //var json = $.parseInt(data);

//             alert(data.like + ' ' + data._id + ' ' + data.like_color + ' ' + data.post_text);

//             $('#like-show').html(data.like + ' likes');

//         },
//         error: function (err) {
//             console.log(err);
//         }
//     });

// });


// comment 
$('#comment-form').on('submit', (e) => {
    e.preventDefault();
    
    let id = $('#comment-id');
    let comment = $('#comment');


    $.ajax({
        url: '/feed-comment',
        method: 'POST',
        data: {
            id: id.val(),
            comment: comment.val(),
        },
        complete: function (data) {
            console.log('Process completed!');
            //alert('Process completed!');
        },
        success: function (data) {
            // console.log('Successfully');
            // alert('success');
           
            $("#comment-btn").click();
           
        },
        error: function (data) {
            console.log('Failed');
            alert('Failed');
        }
    });

    

    // $(".comment-form").on('submit', function () {
    //     readURL(this);
    //     $("#comment-btn").click();
    // });

});


// share 
$('#share-btn').on('click', (e) => {
    e.preventDefault();
    let id = $('#like-id');
    //let comment = $('#comment');


    $.ajax({
        url: '/feed-share',
        method: 'POST',
        data: {
            id: id.val(),
        },
        complete: function (data) {
            console.log('Process completed!');
            //alert('Process completed!');
        },
        success: function (data) {
            console.log('Successfully');
            alert(data);
        },
        error: function (data) {
            console.log('Failed');
            alert('Failed');
        }
    });

});


// Like post 
$('#like-btn').on('click', (e) => {
    e.preventDefault();
    let id = $('#like-id');
    //let comment = $('#comment');


    $.ajax({
        url: '/feed-like1',
        method: 'POST',
        data: {
            id: id.val(),
        },
        complete: function (data) {
            //console.log('Process completed!');
            //alert('Process completed!');
        },
        success: function (data) {

            // var json = $.parseJSON(data);

            alert(data);
            // var cmt;
            // for (let i = 0; i < json.like.length; i++) {
            //     //cmt += json[i] + "<br>";
            //     $('.like-show').append('<p>' + json.like[i]._id + '</p>' + '<p>' + json.comments[i].time + '</p><br>');
            // }
            // if (data === 'like succesfully') {
            //     $('#like-btn').html('unlike');
            //     $('#like-view').html('512 and you likes');
            //     alert('unlike');
            // }
            // else if (data === 'post already liked') {
            //     $('#like-btn').text('unlike');
            //     $('#like-btn').css('color', 'red');
            //     alert('unlike');
            // } else {
            //     $('#like-btn').html('like');
            //     alert('like');
            // }
        },
        error: function (data) {
            console.log('Failed');
            alert('Failed');
        }
    });

});



// like and unlike ajax code
$('a.mark_button').on('click', function (event) { //marking a topic
    event.preventDefault();
    $(this).html('Unmark').removeClass('mark_button').addClass('unmark_button');

    $.ajax({
        url: '/mark',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({ id: $(this).attr('id') }),
        complete: function () {
            console.log('Process completed!');
        },
        success: function () {
            console.log('Successfully');
        },
        error: function () {
            console.log('Failed');
        }
    });
});

$('a.unmark_button').on('click', function (event) { //unmarking a topic
    event.preventDefault();
    $(this).html('Mark').removeClass('unmark_button').addClass('mark_button');

    $.ajax({
        url: '/unmark',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({ id: $(this).attr('id') }),
        complete: function () {
            console.log('Process completed');
        },
        success: function () {
            console.log('Succesfully');
        },
        error: function () {
            console.log('Failed');
        }
    });
});


$('a.mark_button, a.unmark_button').on('click', function (e) {
    var $target = $(e.target);
    if ($target.hasClass('mark_button')) {
        onMarkedButtonClick($target);
    } else if ($target.hasClass('unmark_button')) {
        onUnmarkedButtonClick($target);
    }
});


//comment show
//show result
$('#comment-btn').on('click', (e) => {
    e.preventDefault();
    //start ajax request
    let id = $('#comment-id');
    $.ajax({
        url: "/feed-comment-show",
        //force to handle it as texts
        method: 'POST',
        data: {
            id: id.val(),
        },
        dataType: "text",
        success: function (data) {

            var json = $.parseJSON(data);

            //alert(json);
            var cmt;
            $('.comment-box').html('');
            var o = new Array();

            for (let i = 0; i < json.comments.length; i++) {
                o[json.comments.length - i] = json.comments[i];
            }
               
                o.forEach(function(c,ci) {               

                $('.comment-box').append(`<div class="row">

                <div class="col-lg-2">
                    <div class="comment-img">
                        <img src="profile_pic/${c.pic}" alt="">
                    </div>
                </div>
                <div class="col-lg-10">
                    <div>
                        <div class="com">
                            <p class="name">${c.name}</p>

                            <p class="name-com">${c.comment}</p>
                        </div>
                        <div class="like-c">                           
                            <span class="like-com">1 min ago</span>
                        </div>
                    </div>
                </div>
               
            </div>`);
        });

           

        }
    });

});


// this is the id of the form
$("#search_form").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var actionUrl = form.attr('action');

    $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), // serializes the form's elements.
        success: function (data) { 
            search_popup_open();         
            // $('.search-view').html('');
            $('.search-popup').html('');

            if(data.length>0) {
                data.forEach((e, index) => {               
                    // $('.search-view').append('<p>' + e.fullname + '</p><br>'); 
                    $('.search-popup').append('<p>' + e.fullname + '</p><br>');             
    
                });
            } else {
                $('.search-popup').append('<p> user not found </p><br>'); 
            }
            

            
        }
    });    

});

// Like and unlike feed post
$("#like-form").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var actionUrl = form.attr('action');

    $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), // serializes the form's elements.
        success: function (data) { 
                 
            // $('.search-view').html('');
            // $('.search-popup').html('');
            // data.forEach((e, index) => {               
            //     // $('.search-view').append('<p>' + e.fullname + '</p><br>'); 
            //     $('.search-popup').append('<p>' + e.fullname + '</p><br>');             

            // });
            // alert(data)
            $('#like-view').html(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 128 128">
            <defs>
              <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0" stop-color="#5b9092"/>
                <stop offset="1" stop-color="#ccd7b5"/>
              </linearGradient>
              <clipPath id="clip-iPhone_13_12_Pro_26">
                <rect width="128" height="128"/>
              </clipPath>
            </defs>
            <g id="iPhone_13_12_Pro_26" data-name="iPhone 13, 12 Pro – 26" clip-path="url(#clip-iPhone_13_12_Pro_26)">
              <g id="Group_20792" data-name="Group 20792" transform="translate(-8 -24)">
                <circle id="Ellipse_1245" data-name="Ellipse 1245" cx="64" cy="64" r="64" transform="translate(8 24)" fill="url(#linear-gradient)"/>
                <g id="Group_20791" data-name="Group 20791" transform="translate(37.257 56.914)">
                  <path id="Path_17205" data-name="Path 17205" d="M33.713,62.759S4.98,49.8,1.643,34.3,3.364,5,7.879,3.038,18.5-.461,21.832.128,34.67,1.381,34.67,1.381s18.515-1.963,20.284,0S69.17,14.666,67.6,21.536s-9.985,24.4-19.407,28.323S33.713,62.759,33.713,62.759Z" transform="translate(3.198 3.501)" fill="#fff" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
                  <g id="Iconly_Light-outline_Heart" data-name="Iconly/Light-outline/Heart" transform="translate(0 0)">
                    <g id="Heart" transform="translate(0)">
                      <path id="Heart-2" data-name="Heart" d="M35.488,67.729a2.6,2.6,0,0,1-1.334-.369l-.868-.526A123.285,123.285,0,0,1,11.992,50.177,44.013,44.013,0,0,1,1.44,33.257a27.79,27.79,0,0,1,.711-19.6A22.38,22.38,0,0,1,15.9,1.124,23.157,23.157,0,0,1,34.518,3.052l.935.565.951-.568A23.2,23.2,0,0,1,54.07.841l.945.282A22.4,22.4,0,0,1,68.776,13.67a27.86,27.86,0,0,1,.712,19.644A44.573,44.573,0,0,1,58.934,50.2,123.335,123.335,0,0,1,37.671,66.827l-.814.51A2.585,2.585,0,0,1,35.488,67.729ZM23.025,5.21a17.957,17.957,0,0,0-5.534.874A17.3,17.3,0,0,0,6.821,15.94a22.492,22.492,0,0,0-.463,15.668,39.3,39.3,0,0,0,9.268,14.857A118.006,118.006,0,0,0,35.976,62.38l-.5-.321,1.656-1.049A117.8,117.8,0,0,0,53.422,48.274l1.873-1.79a39.125,39.125,0,0,0,9.272-14.822,22.538,22.538,0,0,0-.458-15.71A17.323,17.323,0,0,0,53.425,6.084,18.027,18.027,0,0,0,37.014,8.865a2.59,2.59,0,0,1-3.067.032l-.7-.5A17.974,17.974,0,0,0,23.025,5.21Z" fill="#fff"/>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg> ${data.like.length} likes`)

            
        }
    });

});



function reset_f(){
    $('#comment-form').reset();
}


// 





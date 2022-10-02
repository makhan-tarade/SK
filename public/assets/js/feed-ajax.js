
 $.get("/find-feed-post", function (data) {

    // alert(data.post.length);
    var abc = new Array();
    data.post.forEach(function (pos, pi) {
        abc[data.post.length - pi] = pos;
    })

    abc.forEach(function (p, i) {
        // alert(p.post_text);
        // --------------------------------------commentbtn click-----------------------------
        $(`#comment-btn${i}`).on('click', (e) => {
            e.preventDefault();
            //start ajax request
            let id = $(`#comment-id${i}`);
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
                    
                    $(`.comment-box${i}`).html('');
                    var o = new Array();

                    for (let i = 0; i < json.comments.length; i++) {
                        o[json.comments.length - i] = json.comments[i];
                    }

                    o.forEach(function (c, ci) {

                        

                        $(`.comment-box${i}`).append(`<div class="row">

<div class="col-lg-2">
    <div class="comment-img">
        <img src="${c.userId.profile_pic ? c.userId.profile_pic : 'assets/img/avtar.png'}" alt="">
    </div>
</div>
<div class="col-lg-10">
    <div>
        <div class="com">
            <p class="name">${c.userId.fname + ' ' + c.userId.lname }</p>

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

        // --------------------------------------------------------------------------------
        // -----------------------------comment form ------------------------------------
        // comment 
        $(`#comment-form${i}`).on('submit', (e) => {
            e.preventDefault();

            let id = $(`#comment-id${i}`);
            let comment = $(`#comment${i}`);


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

                    $(`#comment-btn${i}`).click();
                    $(`#comment${i}`).val('');

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
        // ----------------------------------------------------------------------------
          // --------------------------------- share ----------------------------------------
          $(`#share-btn${i}`).click(function(){
            // $(`#share-box${i}`).css('display', 'block');
            $( `#share-box${i}` ).toggle( "slow", function() {
                // $(this).css('display', 'block');

                if ( this.display === 'none' ) {

                    $(this).css('display', 'block');

                  } else if ( this.display === 'block' ) {

                    $(this).css('display', 'none');

                  }


              });


          });

        // -----------------------------------------------------------------------------------

        // --------------------------------------------------------------------------
       
        // -----------------------------------------------------------------------


    })
});

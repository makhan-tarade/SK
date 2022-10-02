$(function(){
    $('#district').change(function(){
        
        
      var dist = $("#district option:selected").val();
      alert(dist + 'makhan');

       
        $.ajax({
            url: `/events-area-pincode/${dist}`,
           
            type: "get",
            success: function(data){
               

                $('#pincode').html('');


                data.pincode.forEach(function(p,i){

                    $('#pincode').append(`<option>${p.pincode}</option>`);
                   
                });

                   
            }
        });
    });
    });
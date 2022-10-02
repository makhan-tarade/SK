$(function () {
    $('.district').change(function () {

        var dist = $(".district option:selected").val();

       
            $('.pincode').css('display', 'none');
        


        $.ajax({
            url: `/area-pincode/${dist}`,

            type: "get",
            success: function (data) {

                $('.pincode').html('');

                data.pincode.forEach(function (p, i) {
                    // $('#pincode').append(`<option value="${p.pincode}">${p.pincode}</option>`);
                    // alert(`<p>${p.pincode}</p>`);
                    $('.pincode').css('display', 'block');

                    $('.pincode').append(`<input name="pincode[]" class="form-check-input" type="checkbox" value="${p.pin}" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                    ${p.pincode}
                                    </label><br>`)
                });

            }
        });
    });
});

$(function () {
    $('.district2').change(function () {

        var dist = $(".district2 option:selected").val();

       
            $('.pincode2').css('display', 'none');
        


        $.ajax({
            url: `/area-pincode/${dist}`,

            type: "get",
            success: function (data) {

                $('.pincode2').html('');

                data.pincode.forEach(function (p, i) {
                    // $('#pincode').append(`<option value="${p.pincode}">${p.pincode}</option>`);
                    // alert(`<p>${p.pincode}</p>`);
                    $('.pincode2').css('display', 'block');

                    $('.pincode2').append(`<input name="pincode[]" class="form-check-input" type="checkbox" value="${p.pin}" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                    ${p.pincode}
                                    </label><br>`)
                });

            }
        });
    });
});


$(function () {
    $('.district3').change(function () {

        var dist = $(".district3 option:selected").val();

       
            $('.pincode3').css('display', 'none');
        


        $.ajax({
            url: `/area-pincode/${dist}`,

            type: "get",
            success: function (data) {

                $('.pincode3').html('');

                data.pincode.forEach(function (p, i) {
                    // $('#pincode').append(`<option value="${p.pincode}">${p.pincode}</option>`);
                    // alert(`<p>${p.pincode}</p>`);
                    $('.pincode3').css('display', 'block');

                    $('.pincode3').append(`<input name="pincode[]" class="form-check-input" type="checkbox" value="${p.pin}" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                    ${p.pincode}
                                    </label><br>`)
                });

            }
        });
    });
});
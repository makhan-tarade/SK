// $("#health-form").submit(function (e) {

//     e.preventDefault(); // avoid to execute the actual submit of the form.
    
//     var form = $(this);
//     var actionUrl = form.attr('action');
//     // var actionUrl = '/mobile-verification';

//     $.ajax({
//         type: "POST",
//         url: actionUrl,
//         contentType: 'multipart/form-data',
//         data: form.serialize(), // serializes the form's elements.
//         success: function (data) { 
           
//              alert('your report uploded');
            
            
//         },
//         error: function (data) {
//             console.log('Failed');
//             alert(data.title+' '+ data.description+ ' '+ data.attachment);
//         }
//     });    

// });
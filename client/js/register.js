// function registerRequest() {
//     //Retrieving Value
//     const email = $('#email_reg').val();
//     const password = $('#password_reg').val();
//     const name = $('#name_reg').val();
//     const gender = $('.male').hasClass('active')?"male":"female";
//     $.post("/register", { email, name, gender, password }, function (data) {
//         if (data['msg'] === "success") {
//             $('form').hide();
//             if(!$('.sign-in').hasClass('inactive'))
//                 $('.sign-in').addClass('inactive');
//             if(!$('.sign-up').hasClass('inactive'))
//                 $('.sign-up').addClass('inactive');
//             $('.verification').html(`verification mail has been sent to `+email);
//             $('.verification').removeClass('inactive');
//             // window.location.href = '/dashboard';
//         }
//         else {
//             alert(data['msg']);
//         }
//     }).fail(function (data) {
//         console.log("error: " + data);
//     });
// }

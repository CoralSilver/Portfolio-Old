(function() {
  
  (function enableSend() {
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');
    name.addEventListener('input', toggleDisabled(name, email, message));
    email.addEventListener('input', toggleDisabled(name, email, message));
    message.addEventListener('input', toggleDisabled(name, email, message));
  })();

  function toggleDisabled(name, email, message) {
    return function() {
      var button = document.getElementById('submitButton');
      if(name.value && email.value && message.value) {
        button.removeAttribute('disabled','');
      } else {
        button.setAttribute('disabled', '');
      }
    };
  }

})()

//Refactor to remove jQuery
$(function() {

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  $('#submitButton').on('click', function() {

    event.preventDefault(); // prevent default submit behaviour
    // get values from FORM
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val() ? $("#phone").val() : 'No phone number submitted';
    var message = $("#message").val();
    var nameErrorSpan = $('#name').prev('span');
    var emailErrorSpan = $('#email').prev('span');
    var messageErrorSpan = $('#message').prev('span');

    name ? nameErrorSpan.text(''):nameErrorSpan.text('Please enter your name');
    validateEmail(email) ? emailErrorSpan.text(''):emailErrorSpan.text('Please enter a valid email address');
    message ? messageErrorSpan.text(''):messageErrorSpan.text('Please enter a message');

    if (name && validateEmail(email) && message) {
      var submitMessage = $('#success');
      $.ajax({
          url: "././mail/contact_me.php",
          type: "POST",
          data: {
              name: name,
              phone: phone,
              email: email,
              message: message
          },
          cache: false,
          success: function() {
              // Success message
              submitMessage.text('Your message has been sent.');
              submitMessage.addClass('submit-message');

              //clear all fields
              $('#contactForm').trigger("reset");
          },
          error: function() {
              // Fail message
              submitMessage.text('Sorry, it seems that my mail server is not responding. Please try again later.');
              submitMessage.addClass('submit-message');
              //clear all fields
              $('#contactForm').trigger("reset");
          },
      })
    } else {
      return false;
    }
  });

  /*When clicking on Full hide fail/success boxes */
  $('#name, #email, #phone, #message').focus(function() {
    var submitMessage = $('#success');
      submitMessage.text('');
      submitMessage.removeClass('submit-message');
  });

});

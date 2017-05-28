(function() {
  openModal();

  function openModal() {
    var portfolioLinks = document.querySelectorAll('.portfolio__item__link');
    portfolioLinks.forEach(function(node) {
      node.addEventListener('click', function() {
       var body = document.getElementById('page-top');
       var item = this.getAttribute('href').slice(1);
       var modal = document.getElementById(item);
       modal.style.display = 'block';
       modal.setAttribute('aria-hidden', false);
       body.className = 'body-modal-open';
       closeModal(modal, body);
      });
    });
  }

  function closeModal(modal, body) {
    var closeButtons = document.querySelectorAll('[data-dismiss="modal"]');
    closeButtons.forEach(function(node) {
      node.addEventListener('click', function() {
       modal.style.display = '';
       modal.setAttribute('aria-hidden', true);
       body.className = '';
      });
    });
  }
})()

//Refactor to remove jQuery
$(function() {
  // jQuery to collapse the navbar on scroll
  $(window).scroll(function() {
      if ($(".navbar").offset().top > 50) {
          $(".navbar-fixed-top").addClass("top-nav-collapse");
      } else {
          $(".navbar-fixed-top").removeClass("top-nav-collapse");
      }
  });

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('a.page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
  });

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').click(function() {
      $('.navbar-toggle:visible').click();
  });

  $('.credits-link').click(function() {
    $('footer').toggleClass('credits-link-expand');
    $('.credits').slideToggle('slow');
  });

});

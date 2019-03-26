"use strict";

$(() => {

  /* sticky menu on scroll */

  $(window).trigger('scroll');
        $(window).bind('scroll', function () {
            let pixels = 300; //number of pixels before modifying styles
            if ($(window).scrollTop() > pixels) {
                $('#main-navigation').addClass('fixed');
            } else {
                $('#main-navigation').removeClass('fixed');
            }
        }); 

  /* this sets up listeners for when the user clicks on services */

  let services = $('#services').children();
  let serviceId = '';
  
  $(services).on('click', (event) => {
    serviceId = `#${event.target.id}`;   
    showModal(serviceId);
  });


  /* open modal if cart clicked on */

  $('#open-cart-button').on('click', () => {
    $('#modal-container').show();
  });

  /* this function shows the modal where all the fun stuff will happen */

  let showModal = (serviceId) => {
    let modalContainer = $('#modal-container');
    modalContainer.show();
    let showService = serviceId;
    $('#service-title').text(showService);
  }


  /* close modal */

  $('#close-button').on('click', () => {
    $('#modal-container').hide();
  });

});
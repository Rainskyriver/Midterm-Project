$(()=> {
  $('#footer-track-button').click(function(event) {
   event.preventDefault();
   $("#order_div").slideToggle({
     start: function() {
       $(this).css({
         display: 'flex'
       })
     }
   });

  })

  $('#footer-cart-button').click(function(event) {
    event.preventDefault();
    $("#shopping-div").slideToggle();
   })
})



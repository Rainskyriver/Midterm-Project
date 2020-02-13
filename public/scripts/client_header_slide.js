$(()=> {
  $('#footer-track-button').click(function(event) {
   event.preventDefault();
  

   $("#order_div").slideToggle();


  })

  $('#footer-cart-button').click(function(event) {
    event.preventDefault();
    $("#shopping-div").slideToggle();
   })
}) 



$(()=> {
  $('#header-button').click(function(event) {
   event.preventDefault();
   $("#order_div").slideToggle();

  })

  $('#footer-button').click(function(event) {
    event.preventDefault();
    $("#shopping-div").slideToggle();
   })
}) 



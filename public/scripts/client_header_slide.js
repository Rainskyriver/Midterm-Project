$(()=> {
  $('#header-button').click(function(event) {
   event.preventDefault();
   $("#under-nav-div").slideToggle().addClass('display:inline-block');
  })


//   $('#header-track-button').click(function(event) {
//     event.preventDefault();
//     $("#under-nav-div").slideToggle();
//    })

  $('#footer-button').click(function(event) {
    event.preventDefault();
    $("#shopping-div").slideToggle();
   })
}) 



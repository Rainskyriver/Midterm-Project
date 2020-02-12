$(()=> {
  $('#header-button').click(function(event) {
   event.preventDefault();
   $("#under-nav-div").slideToggle(()=> {
    $("#under-nav-div").css(
        "display" , "inline"
        );
   });

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



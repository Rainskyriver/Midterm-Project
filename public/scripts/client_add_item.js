$(document).ready(()=> {

   $('header').on('click','.prevention',function(event) {
     event.preventDefault();
   });

  $('#menu-container').on('click', '.prevention',function(event) {
    event.preventDefault();
    console.log($(this).siblings()[0]);
  });

});

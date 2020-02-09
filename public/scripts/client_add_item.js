$(document).ready(()=> {

  $('#menu-container').on('click', '.prevention',function(event) {
    event.preventDefault();
    // console.log($(this).siblings()[0]);
    $('#shopping-div').css("visibility","visible");
    const $cartName = $('<td>')
    .text($(this).siblings()[0].innerHTML);
    const $cartPrice = $('<td>')
    .text($(this).siblings()[1].innerHTML);
    const $cartCalories = $('<td>')
    .text($(this).siblings()[2].innerHTML);
    const $cartQuantity = $('<td>')
    .text(1);

    const $cartItem = $('<tr>')
    .append($cartName,$cartPrice,$cartCalories,$cartQuantity);

    const $shoppingCart = $('#shopping-cart')
    .prepend($cartItem);
  });

  $('.hide-cart').on('click', ()=>{
    event.preventDefault();
     $('#shopping-div').css('visibility', 'hidden')
     
  })
  
 $("#checkout-form").on('submit', () => {

 })

});

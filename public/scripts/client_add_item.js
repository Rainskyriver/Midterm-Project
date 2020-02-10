let shoppingCartObject = [];
$(document).ready(()=> {

  $('#menu-container').on('click', '.prevention',function(event) {
    event.preventDefault();
    for (let i = 0; i < $('#shopping-cart').length; i++) {
      console.log($('#shopping-cart tr').length - 2)
      console.log($('.item-name').find(`${$(this).siblings()[0].innerHTML}`));
      if (($(this).siblings()[0].innerHTML) === $('.item-name').text()) {
        console.log($('.item-name')[i].innerHTML);
      }
    }
    // console.log($(this).siblings()[0]);
    $('#shopping-div').css("visibility","visible");
    const $cartName = $('<td>')
    .addClass('item-name')
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

//  $("#checkout-form").on('submit', () => {

//  })
  const generateShoppingCartTable = function(array) {
    const totalPrice = 0;
    const $tbody = $('#item-body');
    $tbody.empty();
    for (const item in array) {
      totalPrice += item.price;
      $('#shopping-div').css("visibility","visible");
      const $itemName = $('<td>')
      .addClass('item-name')
      .text(item.name);
      const $itemPrice = $('<td>')
      .text(item.price);
      const $itemCalories = $('<td>')
      .text(item.calories);
      const $itemQuantity = $('<td>')
      .text(1);
      const $rowItem = $('<tr>')
      .append($itemName,$itemPrice,$itemCalories,$itemQuantity);
      $tbody.prepend($rowItem);
    }
    const $totalData = $('<td>')
    .text('Total')
    const $totalPrice = $('<td>')
    .text(totalPrice)
    const $totalRow = $('<tr>')
    .append($totalData,$totalPrice)
    $tbody.append($totalRow);
  };
});

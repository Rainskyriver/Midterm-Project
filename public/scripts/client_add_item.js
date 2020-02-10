let shoppingCartArray = [];
$(document).ready(()=> {

  $('#menu-container').on('click', '.prevention',function(event) {
    event.preventDefault();
    // for (let i = 0; i < $('#shopping-cart').length; i++) {
    //   console.log($('#shopping-cart tr').length - 2)
    //   console.log($('.item-name').find(`${$(this).siblings()[0].innerHTML}`));
    //   if (($(this).siblings()[0].innerHTML) === $('.item-name').text()) {
    //     console.log($('.item-name')[i].innerHTML);
    //   }
    // }
    // console.log($(this).siblings()[0]);
    // $('#shopping-div').css("visibility","visible");
    const currentItemName = $(this).siblings()[0].innerHTML;
    const currentItemPrice = $(this).siblings()[1].innerHTML;
    const currentItemCalories = $(this).siblings()[2].innerHTML;

    addToShoppingCart(currentItemName,currentItemPrice,currentItemCalories);

    showShoppingCartTable(shoppingCartArray);
  });

  $('.hide-cart').on('click', ()=>{
    event.preventDefault();
     $('#shopping-div').css('visibility', 'hidden')

  })

//  $("#checkout-form").on('submit', () => {

//  })
  const showShoppingCartTable = function(array) {
    let totalPrice = 0;
    const $tbody = $('#item-body');
    $tbody.empty();
    for (const i in array) {
      const item = array[i];
      totalPrice += Number(item.price) * Number(item.quantity);
      const $itemName = $('<td>')
      .addClass('item-name')
      .text(item.name);
      const $itemPrice = $('<td>')
      .text(item.price);
      const $itemCalories = $('<td>')
      .text(item.calories);
      const $itemQuantity = $('<td>')
      .text(item.quantity);
      const $rowItem = $('<tr>')
      .append($itemName,$itemPrice,$itemCalories,$itemQuantity);
      $tbody.prepend($rowItem);
    }
    const $totalData = $('<td>')
    .text('Total');
    const $totalPrice = $('<td>')
    .text(totalPrice);
    const $totalRow = $('<tr>')
    .append($totalData,$totalPrice);
    $tbody.append($totalRow);
    $('#shopping-div').css("visibility","visible");
  };
  const addToShoppingCart = function(name, price, calories) {
    const found = shoppingCartArray.find(obj => obj.name === name);
    if (found) {
      found.quantity += 1;
    } else {
      const itemObject = {
        name,
        price,
        calories,
        quantity: 1
      };
      shoppingCartArray.push(itemObject);
    }
  }
});

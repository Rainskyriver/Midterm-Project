let shoppingCartArray = [];

$(document).ready(()=> {

  $('#menu-container').on('click', '.prevention',function(event) {
    event.preventDefault();

    const currentItemName = $(this).siblings()[1].innerHTML;
    const currentItemPrice = $(this).siblings()[2].innerHTML;
    const currentItemCalories = $(this).siblings()[3].innerHTML;
    addToShoppingCart(currentItemName,currentItemPrice,currentItemCalories);

    showShoppingCartTable(shoppingCartArray);
  });

  //hide menu
  $('.hide-cart').on('click', ()=>{
    event.preventDefault();
     $('#shopping-div').css('visibility', 'hidden')
  })
//minimize and reset shopping cart on checkout
  $('#shopping-div').on('click','.checkout-button', (event) => {
    event.preventDefault();
    //loop on the back end , send an object containing shoppingcartarray
    const newArray = deepCopyArray(shoppingCartArray);
    const shoppingObject = {
      shoppingCartArray: newArray
    }
    $.post("/api/checkout",shoppingObject, () => {
    })
    .done(()=> {
      shoppingCartArray = [];
      showShoppingCartTable(shoppingCartArray)
    })

  })
  //
  //Empty array function
  const deepCopyArray = function(array) {
    return array.slice(0);
  };
  const showShoppingCartTable = function(array) {
    let totalPrice = 0;
    const $tbody = $('#item-body');
    $tbody.empty();
    for (const i in array) {
      const item = array[i];
      totalPrice += Number(item.price) * Number(item.quantity);
      const $itemName = $('<td>')
      // .addClass('item-name')
      .text(item.name);
      const $itemPrice = $('<td>')
      .text(item.price);
      const $itemCalories = $('<td>')
      .text(item.calories);
      const $itemQuantity = $('<td>')
      .addClass("quantity-column")
      .text(item.quantity);
      const $addButton = $('<button>')
      .attr("type", "button")
      .addClass("btn btn-primary add-button cart-button")
      .text('+');
      const $subtractButton = $('<button>')
      .attr("type", "button")
      .addClass("btn btn-warning sub-button cart-button")
      .text('-');
      const $deleteButton = $('<button>')
      .attr("type", "button")
      .addClass("btn btn-danger del-button cart-button")
      .text('x');
      const $rowItem = $('<tr>')
      .append($itemName,$itemPrice,$itemCalories,$itemQuantity,$addButton,$subtractButton,$deleteButton);
      $tbody.prepend($rowItem);
    }
    const $totalData = $('<td>')
    .text('Total');
    const $totalPrice = $('<td>')
    .text(totalPrice + "$");
    const $totalRow = $('<tr>')
    .append($totalData,$totalPrice);
    $tbody.append($totalRow);
    //check if shopping cart is empty
    if (shoppingCartArray.length > 0) {
      $('#shopping-div').css("visibility","visible");
    } else {
      $('#shopping-div').css("visibility","hidden");
    }
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
  // table delete item button
  $('#shopping-div').on('click', '.del-button',function(event) {
    event.preventDefault();
    const itemName = $(this).siblings()[0].innerText;
    const index = shoppingCartArray.findIndex(obj => obj.name === itemName);
    shoppingCartArray.splice(index, 1);
    showShoppingCartTable(shoppingCartArray);
  });
  //table add one quantity button
  $('#shopping-div').on('click', '.add-button',function(event) {
    event.preventDefault();
    const itemName = $(this).siblings()[0].innerText;
    const index = shoppingCartArray.findIndex(obj => obj.name === itemName);
    // console.log(index,'index');
    // console.log(shoppingCartArray[index])
    shoppingCartArray[index].quantity += 1;
    showShoppingCartTable(shoppingCartArray);
  });
  //table subtract one quantity button

  $('#shopping-div').on('click', '.sub-button',function(event) {
    event.preventDefault();
    const itemName = $(this).siblings()[0].innerText;
    const index = shoppingCartArray.findIndex(obj => obj.name === itemName);
    console.log(index);
    shoppingCartArray[index].quantity -= 1;
    if (shoppingCartArray[index].quantity < 1) {
      shoppingCartArray.splice(index, 1);
    }
    showShoppingCartTable(shoppingCartArray);
  });
});


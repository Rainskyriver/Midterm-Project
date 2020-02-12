$(() => {

   const createMenuElement = (menu) => {
    const $itemName = $('<p>')
    .text(menu.name)
    .addClass('item-name text-warning');

    const $itemPrice = $('<p>')
    .text(menu.price)
    .addClass('item-price text-warning');

    const $price = $('<p>')
    .text('Price')
    .addClass('price-paragraph text-warning')

    const $itemCalories = $('<p>')
    .text(menu.calories)
    .addClass('item-calories text-warning');

    const $calories = $('<p>')
    .text('Calories')
    .addClass('calories-paragraph text-warning')

    const $itemButton = $('<button>')
    .attr('type', 'button')
    .attr('id', 'item-button')
    .addClass('prevention item-button btn btn-warning')
    .text('Add to Cart');

    const $itemImg = $('<img>')
    .attr('src',menu.picture)
    // .addClass('img-form');

    const $pictureDiv = $('<div>')
    .css('background-image', `url(${menu.picture})`)
    .addClass('img-form')
    // .append($itemImg);

    const $infoDiv = $('<div>')
    .append($itemName, $itemPrice, $itemCalories, $itemButton)

    const $menu = $('<div>')
    .addClass('menu-items')
    .append($pictureDiv,$calories,$price,$itemName, $itemPrice, $itemCalories, $itemButton);


    return $menu;
   }


  const renderMenuItems = (menu) => {
     for (const item of menu['items']) {
       $('#menu-container').append(createMenuElement(item));
     }
  }

  const loadMenu = () => {
    $.get("/api/items", (data) => {
      renderMenuItems(data);
  })};
  loadMenu();
});

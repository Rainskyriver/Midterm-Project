$(() => {

   const createMenuElement = (menu) => {
    const $itemName = $('<p>')
    .text(menu.name)
    .addClass('item-name');

    const $itemPrice = $('<p>')
    .text(menu.price)
    .addClass('item-price');

    const $itemCalories = $('<p>')
    .text(menu.calories)
    .addClass('item-calories');

    const $itemButton = $('<button>')
    .attr('type', 'button')
    .addClass('prevention item-button')
    .text('Buy now!');

    const $itemImg = $('<img>')
    .attr('src',menu.picture)
    .addClass('img-form');

    const $pictureDiv = $('<div>')
    .addClass('img-form')
    .append($itemImg);

    const $infoDiv = $('<div>')
    .append($itemName, $itemPrice, $itemCalories, $itemButton)

    const $menu = $('<div>')
    .addClass('menu-items')
    .append($itemImg,$itemName, $itemPrice, $itemCalories, $itemButton);


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

  })}
    loadMenu();
});

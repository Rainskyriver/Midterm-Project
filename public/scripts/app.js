$(() => {

   const createMenuElement = (menu) => {
    const $itemName = $('<p>')
    .text(menu.name);

    const $itemPrice = $('<p>')
    .text(menu.price);

    const $itemCalories = $('<p>')
    .text(menu.calories);

    const $itemButton = $('<button>')
    .attr('type', 'button')
    .addClass('prevention')
    .text('Buy now!');

    const $itemImg = $('<img>')
    .attr('src',menu.picture)

    const $pictureDiv = $('<div>')
    .addClass('img-form')
    .append($itemImg);

    const $infoDiv = $('<div>')
    .append($itemName, $itemPrice, $itemCalories, $itemButton)

    const $menu = $('<div>')
    .addClass('menu-items')
    .append($pictureDiv, $infoDiv);


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

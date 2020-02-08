$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users.users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
  
   const createMenuElement = (menu) => {
    const $itemName = $('<p>')
    .text(menu.name);

    const $itemPrice = $('<p>')
    .text(menu.price);

    const $itemCalories = $('<p>')
    .text(menu.calories);

    const $itemButton = $('<button>')
    .text('Buy now!')
    
    const $itemForm = $('<form>')
    .addClass('item-form')
    .append($itemButton)

    const $itemImg = $('<img>')
    .attr('src',menu.picture)
    
    const $pictureDiv = $('<div>')
    .addClass('img-form')
    .append($itemImg);
    
    const $infoDiv = $('<div>')
    .append($itemName, $itemPrice, $itemCalories, $itemForm)


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

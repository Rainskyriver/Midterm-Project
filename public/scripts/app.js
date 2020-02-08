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

    const $itemImg = $('<img>')
    .attr('src',menu.picture)
    
    const $pictureDiv = $('<div>')
    .append($itemImg);

    const $menu = $('<div>')
    .append();


    return $menu;
   }







  const renderMenuItems = (menu) => {
     for (const item of menu['items']) {
       console.log(item['calories'])
       $('#menu-container').append(createMenuElement(item));
     
     }
  }

  const loadMenu = () => {
    $.get("/api/items", (data) => {
      renderMenuItems(data);

  })}
    loadMenu();
});

$(()=> {
  let order = '';
  $('#order_div').on('click', '.track-order-button', event => {
    event.preventDefault();
    $.get('/api/track_order', (data) => {
      order = data.orderTime;
    })
    .then(() => {
      drawOrderStatus(order);
    });
  });
  //draw order div
  //append to footer
  const drawOrderStatus = function(orderStatus) {
    const $order_message = $('#order_message')
    .empty();
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}`;
    if (orderStatus) {
      const orderMessage = $('<p>')
      .text(`Your order will be ready in $1 minutes`, ([`${today.getHours()}:${today.getMinutes + Number(orderStatus)}`]));
      $order_message.prepend(orderMessage);
    } else {
      const orderMessage = $('<p>')
      .text(`Waiting for your order to be accepted by the restaurant ${time}`);
      $order_message.prepend(orderMessage);
    }

  }
});

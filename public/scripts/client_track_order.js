$(()=> {
  let order = '';
  $('#order_div').on('click', '.track-order-button', event => {
    event.preventDefault();
    $.get('/api/orders', (data) => {
      latestOrder = data.orders[data.orders.length - 1];
      console.log(latestOrder);
      const startTime = getHourMinutes(latestOrder.start_time);
      const endTime = getHourMinutes(latestOrder.end_time);
      //Test Data
      // const startTime = getHourMinutes(data.orders[0].start_time);
      // const endTime = getHourMinutes(data.orders[0].end_time);
      drawOrderStatus(startTime, endTime);
    })
  });
  //draw order div
  //append to footer
  const drawOrderStatus = function(orderTime, orderStatus) {
    const $order_message = $('#order_message')
    .empty();
    if (orderStatus) {
      const orderedAt = $('<p>')
      .text(`We started prep at ${orderTime}`)
      const orderMessage = $('<p>')
      .text(`Your order will be ready at ${orderStatus}`);
      $order_message.prepend(orderedAt, orderMessage);
    } else if (orderStatus) {

    } else {
      const orderMessage = $('<p>')
      .text(`Waiting for your order to be accepted by the restaurant`);
      $order_message.prepend(orderMessage);
    }
  }
  const getHourMinutes = function(string) {
    //split at T, split at :, grab 0 and 1
    if (string) {
      const time = string.split('T')[1];
      const hour = time.split(':')[0];
      const minute = time.split(':')[1];
      const returnString = `${hour}:${minute}`;
      return returnString;
    } else {
      return null;
    }
  };
});

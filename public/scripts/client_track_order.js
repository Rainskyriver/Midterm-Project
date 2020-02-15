$(()=> {
  let order = '';
  $('#order_div').on('click', '.track-order-button', event => {
    event.preventDefault();
    $.get('/api/orders', (data) => {
      latestOrder = data.orders[data.orders.length - 1];
      const startTime = latestOrder.start_time;
      const endTime = latestOrder.end_time;
      drawOrderStatus(startTime, endTime, latestOrder);
    })
  });
  const drawOrderStatus = function(startCook, readyPickup, order) {
    let today = new Date();
    //Conditionals for the minutes and seconds
    let fMin = '';
    let fSec = '';
    today.getMinutes() < 10 ? fMin = '0' : fMin = '';
    today.getSeconds() < 10 ? fSec = '0' : fSec = '';

    let currentTime = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}T${today.getHours()}:${fMin}${today.getMinutes()}:${fSec}${today.getSeconds()}.000Z`;
    const $order_message = $('#order_message').empty();
    const orderTime = getHourMinutes(startCook);
    const orderStatus = getHourMinutes(readyPickup);
    //CREATE new DATES FOR COMPARISON
    let currentTime1 = new Date(currentTime)
    let readyPickup1 = new Date(readyPickup)

      if (order.active === false) {
        const orderMessage = $('<p>')
        .text(`You do not have an active order`);
        $order_message.prepend(orderMessage);
      } else if (startCook === null|| readyPickup === null){
      const orderMessage = $('<p>')
      .text(`Waiting for your order to be accepted by the restaurant`);
      $order_message.prepend(orderMessage);
    } else if (currentTime1.getTime() > readyPickup1.getTime()) {
      const orderMessage = $('<p>')
      .text('Your order is ready for pickup!');
      $order_message.prepend(orderMessage);
    } else if (orderStatus) {
      const orderedAt = $('<p>')
      .text(`We started prep at ${orderTime}`)
      const orderMessage = $('<p>')
      .text(`Your order will be ready at ${orderStatus}`);
      $order_message.prepend(orderedAt, orderMessage);
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

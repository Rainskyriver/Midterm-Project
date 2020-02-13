$(()=> {
  let order = '';
  let today = new Date();
  console.log(today);
  let currentTime = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}T${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.000UTC`;
  console.log(currentTime, 'top')

  $('#order_div').on('click', '.track-order-button', event => {
    event.preventDefault();
    
    $.get('/api/orders', (data) => {
      console.log(data.orders, "data")
      latestOrder = data.orders[data.orders.length - 1];
      const startTime = latestOrder.start_time;
      const endTime = latestOrder.end_time;
      console.log(latestOrder.end_time, 'orders');

      
      drawOrderStatus(startTime, endTime);
    })
  });


  // $('#footer-track-button').click(function(event) {
  //   event.preventDefault();
  //   $.get('/api/active', (data) => {
  //    let state = data[0].active
  //    let start_time = data[0].start_time;
  //    let end_time = data[0].end_time;
  //    const $order_message = $('#order_message').empty();


  //   //  (currentTime1 >= readyPickup1)
  //    if (start_time === null || end_time === null) {

  //     const orderMessage = $('<p>')
  //     .text(`Waiting yousirfor your order to be accepted by the restaurant`);
  //     $order_message.prepend(orderMessage);

  //     //you have no orders
  //    } else if (currentTime > end_time) {
  //      // post (query insert active is now false)

  //    } else if (state) {
  //     //you have an order that is not ready
  //    }
  //   })
 
  //   $("#order_div").slideToggle();
 
 
  //  })



  const drawOrderStatus = function(startCook, readyPickup) {
    // let today = new Date();
    // let currentTime = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}T${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.000Z`;
    const $order_message = $('#order_message').empty();
    const orderTime = getHourMinutes(startCook);
    const orderStatus = getHourMinutes(readyPickup);
    //CREATE new DATES FOR COMPARISON
    console.log(currentTime)

    let readyPickup1 = new Date(readyPickup)
    console.log(readyPickup, "bot", readyPickup1)

    console.log(readyPickup1)    
    console.log(currentTime)    

 console.log(currentTime > readyPickup)    

      if (startCook === null || readyPickup === null){
      const orderMessage = $('<p>')
      .text(`Waiting for your order to be accepted by the restaurant`);
      $order_message.prepend(orderMessage);

    } else if (currentTime >= readyPickup) {
      const orderMessage = $('<p>')
      .text('Your order is ready for pickup!');
      $order_message.prepend(orderMessage);
//
      $.post('/api/deactivate')
//
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

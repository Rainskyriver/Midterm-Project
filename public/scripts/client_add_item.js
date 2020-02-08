$(document).ready(()=> {
  $('form').submit(function(event) {
    event.preventDefault();
    console.log(this);
  });
});

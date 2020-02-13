(() => {

    $('#footer-track-button').click((event) => {
        event.preventDefault();
        
            $.get('/api/active', (data) => {
                console.log(data, 'data');
                alert(data)
                
       })
    });
})
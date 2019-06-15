$('form').on('submit', function(e) {
	e.preventDefault();

	var date = $('input').val();
	apod.init(date);
});


var apod = {
    init: function(date) {
        this.load(date);
    },
    load: function(date) {
        var API_KEY = 'KR1va14h1PqLZwhfsKqImgBGT3VqGMfPDpMQhdNB';
        var showDate = date;

        $.ajax('https://api.nasa.gov/planetary/apod?api_key='+ API_KEY +'&date=' + date, {
            dataType: 'json',
            success: function(result) {
                console.log(result);
            
                var $title = $('<h1><strong>' + result.date + ' </strong>' + result.title + '</h1>');
                $('.apod').append($title);

                var $explanation = $('<div>' + result.explanation + '</div>').addClass('gen-text');
                $('.apod').append($explanation);
            
        		var $icon = $('<img>');
                $icon.attr('src', '' + result.url);
                $('.apod').append($icon);
            },
            error: function(error) {
                $('.apod').text(error.responseText);
                $('.logo').hide();
            },
            beforeSend: function() {
                $('.apod').empty();
                $('.loader').show();
                $('.logo').hide();
            }, 
            complete: function() {
                $('.loader').hide();
                $('.apod').show();
                $('.logo').show();
            }
        });
    }
}

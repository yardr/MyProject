$(document).ready(function() {
    $('input').hide();
    $('#sbutton').click(function() {
        $('input').animate({width: 'toggle'});
    })
    })
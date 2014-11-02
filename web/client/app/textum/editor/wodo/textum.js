$.fn.goTo = function() {
    $('#webodfeditor-canvascontainer1').animate({
        scrollTop: $(this).offset().top + 'px'
    }, 'fast');
    return this; // for chaining...
}

$(".annotationConnector.horizontal").position()
$('#webodfeditor-canvascontainer1').animate({scrollTop: '100px'}, 'fast');

var offsetTop = $('.annotationConnector.horizontal').position().top - $('.annotationConnector.horizontal').closest('#webodfeditor-canvascontainer1').position().top;


$(".annotationConnector.horizontal").offsetRelative("#webodfeditor-canvascontainer1");

$(".annotationConnector.horizontal").eq(1).goTo()


//*[@id="webodfeditor-canvas1"]/div[1]/document/body/text/p[86]/div/div[1]/annotation/list/list-item/p

// Get page number from tip
$(".annotationConnector.horizontal").parent().find("p").text()
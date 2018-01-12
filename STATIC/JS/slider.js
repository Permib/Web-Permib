$(function() {
    initSlider(2500,600)
})

function initSlider(stay,speed) {
    var imgGallery = [],
        slider = $('.slider'),
        count = 1,
        timeOut
    slider
        .find('img').each(function() {
            imgGallery.push($(this).attr('src'))
            $('.slider-panel').append('<a>●</a>')
            $(this).remove()
        })
    var firstImg = '<img src="' + imgGallery[0] + '">',
        imgNum = imgGallery.length
    $('.slider').append(firstImg).append(firstImg)
    $('.slider-panel').find('a:first').css('color', 'white')
    slideClick()
    setTimeout(function() {
        autoSlide()
    }, stay)


    function autoSlide() {

        slide(count % imgNum, imgGallery)
        timeOut = setTimeout(function() {
            count++
            autoSlide()
        }, stay + speed)
    }

    function slideClick() {
        $('.slider-panel').find('a').each(function(i) {
            $(this).on('click', function() {
                if (count % imgNum != i) {

                    if ($('.slider').hasClass('cantClick')) {
                        return
                    } else {
                        count = i
                        clearTimeout(timeOut)
                        autoSlide()
                    }
                }
            })
        })
    }

    function slide(num, imgAry) {
        console.log(num)
        var width = $('.slider').find('img').css('width'),
            lastImg = $('.slider').find('img:last').attr('src')
        if (!$('.slider').hasClass('first')) {
            $('.slider').find('img:first').attr('src', lastImg)
        }

        $('.slider')
            .css({
                left: '0'
            })
            .addClass('first')
            .find('img:last').remove()
        _panel(num)
        $('.slider').addClass('cantClick')
            .append('<img src="' + imgAry[num] + '">')            
            .animate({
                left: '-' + width
            }, speed, 'swing', function() {
                $(this).removeClass('first').removeClass('cantClick')
            })
    }
}



function _panel(num) {
    $('.slider-panel').find('a').css('color', 'lightskyblue').eq(num).css('color', 'white')
}

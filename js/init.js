/*-----------------------------------------------------------------------------------
/*
/* Init JS, se cargan módulos al iniciar la página web
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function($) {

    /*----------------------------------------------------*/
    /* Detecta si la versión es web o móvil
    ------------------------------------------------------ */
    var is_movile_browser = false;
    if (/Mobi/.test(navigator.userAgent)) {
        is_movile_browser = true;
        console.log('Utilizando versión móvil.')
    } else {
        console.log('Utilizando versión web.')
    }

    /*----------------------------------------------------*/
    /* FitText Configuraciones
    ------------------------------------------------------ */
    setTimeout(function() {
        $('h1.responsive-headline').fitText(1, {
            minFontSize: '40px',
            maxFontSize: '90px'
        });
    }, 100);


    /*----------------------------------------------------*/
    /* Smooth Scrolling
    ------------------------------------------------------ */
    $('.smoothscroll').on('click', function(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function() {
            window.location.hash = target;
        });
    });


    /*----------------------------------------------------*/
    /* Highlight the current section in the navigation bar
    ------------------------------------------------------*/
    var sections = $("section");
    var navigation_links = $("#nav-wrap a");

    sections.waypoint({
        handler: function(event, direction) {
            var active_section;
            active_section = $(this);
            if (direction === "up") active_section = active_section.prev();
            var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');
            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");

        },
        offset: '35%'
    });


    /*----------------------------------------------------*/
    /*	Make sure that #header-background-image height is
    /* equal to the browser height.
    ------------------------------------------------------ */
    $('header').css({
        'height': $(window).height()
    });
    if (!is_movile_browser) {
        $(window).on('resize', function() {
            $('header').css({
                'height': $(window).height()
            });
            $('body').css({
                'width': $(window).width()
            })
        });
    }else{
        console.log('INFO :: Se desactivó el ajuste de pantalla automático.')
    }


    /*----------------------------------------------------*/
    /*	Fade In/Out Primary Navigation
    ------------------------------------------------------*/
    $(window).on('scroll', function() {
        var h = $('header').height();
        var y = $(window).scrollTop();
        var nav = $('#nav-wrap');

        if ((y > h * .20) && (y < h) && ($(window).outerWidth() > 768)) {
            nav.fadeOut('fast');
        } else {
            if (y < h * .20) {
                nav.removeClass('opaque').fadeIn('fast');
            } else {
                nav.addClass('opaque').fadeIn('fast');
            }
        }
    });


    /*----------------------------------------------------*/
    /*	Modal Popup
    ------------------------------------------------------*/
    $('.item-wrap a').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        removalDelay: 200,
        showCloseBtn: false,
        mainClass: 'mfp-fade'
    });

    $(document).on('click', '.popup-modal-dismiss', function(e) {
        e.preventDefault();
        $.magnificPopup.close();
    });


    /*----------------------------------------------------*/
    /*	Flexslider
    /*----------------------------------------------------*/
    $('.flexslider').flexslider({
        namespace: "flex-",
        controlsContainer: ".flex-container",
        animation: 'slide',
        controlNav: true,
        directionNav: false,
        smoothHeight: true,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        randomize: false,
    });


    /*----------------------------------------------------*/
    /*	Se comprueba si es que se ha enviado un mensaje
    /*----------------------------------------------------*/
    check_if_msg_sent();


    /*----------------------------------------------------*/
    /*	Se establece el fondo y se añade el scroll
    /*----------------------------------------------------*/
    var images_background = [
        'header-background-5.jpg',
        'header-background-1-3.jpg',
        'header-background-3-2.jpg',
        'header-background-4-2.jpg',
        'header-background-6.jpg',
        'header-background-7.jpg'
    ];
    var images_indx_random = Math.floor(Math.random() * images_background.length);
    var image_url = 'images/background/' + images_background[images_indx_random];
    console.log('Estableciendo el fondo de pantalla ' + images_indx_random);

    // Se utiliza stellar
    // $('.scrollable-home').css('background-image', 'url(' + image_url + ')');
    // $(function() {
    //     $.stellar({
    //         horizontalScrolling: false,
    //         verticalOffset: 0
    //     });
    // });
    // $('.scrollable-home').stellar();

    // Se utiliza parallax.js
    $('.scrollable-home').parallax({
        imageSrc: image_url,
        speed: 0.15
    });


});

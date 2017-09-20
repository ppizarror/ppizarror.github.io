// Funciones al cargar la página web
jQuery(document).ready(function($) {

    // El fondo tiene misma altura que la ventana
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
    } else {
        $('header').css({
            'height': $(window).height()
        });
        $('body').css({
            'width': $(window).width()
        })
        console.log('Se desactivó el ajuste de pantalla automático')
    }

    // Escribe los banner sociales
    writeSocialBar();

    // Detecta si versión web o móvil
    var is_movile_browser = false;
    if (/Mobi/.test(navigator.userAgent)) {
        is_movile_browser = true;
        console.log('Utilizando versión móvil')
    } else {
        console.log('Utilizando versión web')
    }

    // Flittext config
    setTimeout(function() {
        $('h1.responsive-headline').fitText(1, {
            minFontSize: '40px',
            maxFontSize: '90px'
        });
    }, 100);

    // Smooth scroll
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

    // Subraya la sección en el menú
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

    // Se establece el fondo y se añade el scroll
    $('#background-page-header-colored').css('background-color', chosencolor);
    $('#background-page-header-colored').fadeIn(200);
    console.log('Estableciendo el fondo de pantalla ' + images_indx_random);
    if (!is_movile_browser) {
        var back_img = new Image();
        back_img.onload = function() {
            if (parallaxenabled) {
                $('#background-page-header').parallax({
                    imageSrc: image_url,
                    speed: 0.15
                });
            } else {
                $('#background-page-header').css('-webkit-background-size', 'cover');
                $('#background-page-header').css('-moz-background-size', 'cover');
                $('#background-page-header').css('-o-background-size', 'cover');
                $('#background-page-header').css('background-size', 'cover');
                $('#background-page-header').css('max-width', '100%');
                $('#background-page-header').css('width', $(window).width());
                $('#background-page-header').css('background-image', 'url(' + image_url + ')');
                random_blur('#background-page-header');
            }
            setTimeout(function() {
                $('#background-page-header-colored').fadeOut('slow');
            }, 500);
        }
        back_img.src = image_url;

    } else {
        $('#background-page-header').css('background-image', 'url(' + image_url + ')');
    }

    // Se añade evento resize del fondo
    $(window).resize(function() {
        $('#background-page-header').css('width', $(window).width());
    });

    // Navegación por fadein/out
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

    // Modal popup
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

    // Se comprueba si se envió un mensaje
    check_if_msg_sent();

});

/*
The MIT License (MIT)

Copyright 2017 Pablo Pizarro R.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Funciones al cargar la página web
jQuery(document).ready(function($) {

    // El fondo tiene misma altura que la ventana
    $('header').css({
        'height': $(window).height()
    });
    if (!is_movile_browser) {
        $(window).on('resize', function() {
            $('header').css('height', $(window).height());
            $('body').css('width', $(window).width());
        });
    } else {
        $('header').css('height', $(window).height());
        $('body').css('width', $(window).width());
        console.log('Se desactivó el ajuste de pantalla automático');
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
    var back_img = new Image();
    back_img.onload = function() {
        if (parallaxenabled && !is_movile_browser) {
            $('#background-page-header').parallax({
                imageSrc: image_url,
                speed: 0.15
            });
        } else {
            $('#background-page-header').css({
                'background': chosencolor + ' url(' + image_url + ') ' + image_pos + ' no-repeat fixed',
                'background-attachment': 'fixed',
            });
            $('#background-page-header').css('-webkit-background-size', 'cover');
            $('#background-page-header').css('-moz-background-size', 'cover');
            $('#background-page-header').css('-o-background-size', 'cover');
            $('#background-page-header').css('background-size', 'cover');
            $('#background-page-header').css('width', $(window).width());
            random_blur('#background-page-header');
        }
        setTimeout(function() {
            $('#background-page-header-colored').fadeOut('slow');
        }, timeoutFadeInWallpaperAferLoad);
    }
    back_img.src = image_url;

    // Se añade evento resize del fondo
    $(window).resize(function() {
        $('#background-page-header').css('width', $(window).width());
    });

    // Navegación por fadein/out
    navWrapTrigger();
    $(window).on('scroll', function() {
        navWrapTrigger();
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

    // Se agrega un bull a cada date
    $('#resume .date').before('<span class="bullOnExperience"> &bull; </span>');

});

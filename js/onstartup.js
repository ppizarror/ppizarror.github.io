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
jQuery(document).ready(function ($) {

    // Escribe los banners sociales
    writeSocialBar();

    // Muestra el resumen
    if (showresume) {
        $('#resume').attr('style', '');
        $('#resume').addClass('menuelem');
        $('#resumemenu').fadeIn(100);

        // Activa las skills
        var $animation_elements = $('.on-view-triggger');
        var $window = $(window);

        function activate_skills_bars() {
            var window_height = $window.height();
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + window_height);
            $.each($animation_elements, function () {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);
                if ((element_bottom_position >= window_top_position) &&
                    (element_top_position <= window_bottom_position)) {
                    if ($element.attr('data-viewed') == 'false') {
                        $element.addClass('triggered');
                        $element.attr('viewed', 'true');
                    }
                }
            });
        }

        $window.on('scroll resize', activate_skills_bars);
        $window.trigger('scroll');
    }

    // Detecta si versión web o móvil
    var is_movile_browser = false;
    if (/Mobi/.test(navigator.userAgent)) {
        is_movile_browser = true;
        console.log('Utilizando versión móvil')
    } else {
        console.log('Utilizando versión web')
    }

    // Subraya la sección en el menú
    var sections = $('.menuelem');
    var navigation_links = $('#nav-wrap a');
    sections.each(function () {
        new Waypoint({
            element: this,
            handler: function (direction) {
                var previousWaypoint = this.previous();
                var nextWaypoint = this.next();
                var activeWaypoint = this;
                if (direction == 'up') {
                    activeWaypoint = previousWaypoint;
                }
                active_link = $('#nav-wrap a[href="#' + activeWaypoint.element.id + '"]');
                navigation_links.parent().removeClass('current');
                active_link.parent().addClass('current');
            },
            offset: '35%',
            group: 'menuelem'
        });
    });

    // El fondo tiene misma altura que la ventana
    $('header').css({
        'height': $(window).height()
    });
    if (!is_movile_browser) {
        $(window).on('resize', function () {
            $('header').css('height', $(window).height());
            $('body').css('width', $(window).width());
        });
    } else {
        $('header').css('height', $(window).height());
        $('body').css('width', $(window).width());
        console.log('Se desactivó el ajuste de pantalla automático');
    }

    // Flittext config
    setTimeout(function () {
        $('h1.responsive-headline').fitText(1, {
            minFontSize: '40px',
            maxFontSize: '90px'
        });
    }, 100);

    // Smooth scroll
    $('.smoothscroll').on('click', function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function () {
            window.location.hash = target;
        });
    });

    // Se establece el fondo y se añade el scroll
    $('#background-page-header-colored').css('background-color', wallpaper_db.color);
    $('#background-page-header-colored').fadeIn(200);
    console.log(String.format('Estableciendo el fondo de pantalla {0} - ID {1}', wallpaper_db.image, wallpaper_db.index));
    var back_img = new Image();
    back_img.onload = function () {
        if (parallaxenabled && !is_movile_browser) {
            $('#background-page-header').parallax({
                imageSrc: image_url,
                speed: 0.15
            });
        } else {
            $('#background-page-header').css({
                'background': wallpaper_db.color + ' url(' + wallpaper_db.image + ') ' + wallpaper_db.position + ' no-repeat fixed',
                'background-attachment': 'fixed',
            });
            $('#background-page-header').css('-webkit-background-size', 'cover');
            $('#background-page-header').css('-moz-background-size', 'cover');
            $('#background-page-header').css('-o-background-size', 'cover');
            $('#background-page-header').css('background-size', 'cover');
            $('#background-page-header').css('width', $(window).width());
            wallpaper_db_random_blur('#background-page-header', blurprobability, blurlimits);
        }
        setTimeout(function () {
            $('#background-page-header-colored').fadeOut('slow');
        }, timeoutFadeInWallpaperAferLoad);
    }
    back_img.src = wallpaper_db.image;

    // Se añade evento resize del fondo
    $(window).resize(function () {
        $('#background-page-header').css('width', $(window).width());
    });

    // Navegación por fadein/out
    navWrapTrigger();
    $(window).on('scroll', function () {
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
    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    // Se agrega un bull a cada date
    $('#resume .date').before('<span class="bullOnExperience"> &bull; </span>');

    // Se comprueba si se envió un mensaje
    check_if_msg_sent();
});

/**
 The MIT License (MIT)

 Copyright 2017-2019 Pablo Pizarro R.

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


$(function () {

    /**
     * Escribe los banners sociales
     */
    writeSocialBar();

    /**
     * Muestra el resumen
     */
    if (showresume) {
        let $resume = ('#resume');
        $resume.attr('style', '');
        $resume.addClass('menuelem');
        $('#resumemenu').fadeIn(100);

        // Activa las skills
        let $animation_elements = $('.on-view-triggger');
        let $window = $(window);

        function activate_skills_bars() {
            let window_height = $window.height();
            // noinspection JSValidateTypes
            let window_top_position = $window.scrollTop();
            let window_bottom_position = (window_top_position + window_height);
            $.each($animation_elements, function () {
                let $element = $(this);
                let element_height = $element.outerHeight();
                let element_top_position = $element.offset().top;
                let element_bottom_position = (element_top_position + element_height);
                if ((element_bottom_position >= window_top_position) &&
                    (element_top_position <= window_bottom_position)) {
                    if ($element.attr('data-viewed') === 'false') {
                        $element.addClass('triggered');
                        $element.attr('viewed', 'true');
                    }
                }
            });
        }

        $window.on('scroll resize', activate_skills_bars);
        $window.trigger('scroll');
    }


    // noinspection ES6ConvertVarToLetConst
    /**
     * Detecta si versión web o móvil
     * @type {boolean}
     */
    var is_movile_browser = false;
    if (/Mobi/.test(navigator.userAgent)) {
        is_movile_browser = true;
        console.log('Utilizando versión móvil')
    } else {
        console.log('Utilizando versión web')
    }

    /**
     * Subraya la sección en el menú
     * @type {*|jQuery|HTMLElement}
     */
    let sections = $('.menuelem');
    let navigation_links = $('#nav-wrap a');
    // noinspection JSUnresolvedFunction
    sections.each(function () {
        new Waypoint({
            element: this,
            handler: function (direction) {
                let previousWaypoint = this.previous();
                // let nextWaypoint = this.next();
                let activeWaypoint = this;
                if (direction === 'up') {
                    activeWaypoint = previousWaypoint;
                }
                let active_link = $('#nav-wrap a[href="#' + activeWaypoint.element.id + '"]');
                navigation_links.parent().removeClass('current');
                active_link.parent().addClass('current');
            },
            offset: '35%',
            group: 'menuelem'
        });
    });

    /**
     * El fondo tiene misma altura que la ventana
     */
    let $header = $('header');
    $header.css({
        'height': $(window).height()
    });
    if (!is_movile_browser) {
        $(window).on('resize', function () {
            $header.css('height', $(window).height());
            $('body').css('width', $(window).width());
        });
    } else {
        $header.css('height', $(window).height());
        $('body').css('width', $(window).width());
        console.log('Se desactivó el ajuste de pantalla automático');
    }

    /**
     * Flittext config
     */
    setTimeout(function () {
        $('h1.responsive-headline').fitText(1, {
            minFontSize: '40px',
            maxFontSize: '90px'
        });
    }, 100);

    /**
     * Smooth scroll
     */
    $('.smoothscroll').on('click', function (e) {
        e.preventDefault();
        let target = this.hash,
            $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 5
        }, 800, 'swing', function () {
            window.location.hash = target;
        });
    });

    /**
     * Se establece el fondo y se añade el scroll
     */
    /* global wallpaper_db */
    let $bgheaderc = $('#background-page-header-colored');
    let $bgheader = $('#background-page-header');
    $bgheaderc.css('background-color', wallpaper_db.color);
    $bgheaderc.fadeIn(200);
    console.log(String.format('Estableciendo el fondo de pantalla {0} - ID {1}', wallpaper_db.image, wallpaper_db.index));
    if (parallaxenabled && !is_movile_browser) {
        // noinspection JSUnresolvedFunction
        $bgheader.parallax({
            src: wallpaper_db.image,
            positionX: 'center',
            positionY: 'bottom',
            speed: 0.175,
            afterRefresh: function () {
                $('#background-page-header-colored').fadeOut('slow');
            }
        });
        $('.parallax-mirror').attr('id', 'parallaxBg');
    } else {
        let back_img = new Image();
        back_img.onload = function () {
            $bgheader.css({
                'background': wallpaper_db.color + ' url(' + wallpaper_db.image + ') ' + wallpaper_db.position + ' no-repeat fixed',
                'background-attachment': 'fixed',
            });
            $bgheader.css('-webkit-background-size', 'cover');
            $bgheader.css('-moz-background-size', 'cover');
            $bgheader.css('-o-background-size', 'cover');
            $bgheader.css('background-size', 'cover');

            setTimeout(function () {
                $('#background-page-header-colored').fadeOut('slow');
            }, timeoutFadeInWallpaperAferLoad);
        };
        // noinspection JSValidateTypes
        back_img.src = wallpaper_db.image;
    }

    /**
     * Se aplica el blur
     */
    try {
        let $_bgheader;
        if (parallaxenabled && !is_movile_browser) {
            $_bgheader = 'parallaxBg';
        } else {
            $_bgheader = 'background-page-header';
        }
        // noinspection JSUnresolvedFunction
        wallpaper_db_random_blur($_bgheader, blurprobability, blurlimits);
    } catch ($e) {
    } finally {
    }

    /**
     * Se añade evento resize del fondo
     */
    let $resizeHeader = function () {
        let $bgheader;
        if (parallaxenabled && !is_movile_browser) {
            $bgheader = $('.parallax-mirror');
        } else {
            $bgheader = $('#background-page-header');
        }
        $bgheader.css('width', $(window).innerWidth() * 1.1 + 'px');
        $bgheader.css('height', $(window).innerHeight() * 1.1 + 'px');
    };
    $(window).on('resize', $resizeHeader);
    $resizeHeader();

    /**
     * Navegación por fadein/out
     */
    navWrapTrigger();
    $(window).on('scroll', function () {
        navWrapTrigger();
    });

    /**
     * Modal popup
     */
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

    /**
     * Se agrega un bull a cada date
     */
    $('#resume .date').before('<span class="bullOnExperience"> &bull; </span>');

    /**
     * Se comprueba si se envió un mensaje
     */
    check_if_msg_sent();
})
;

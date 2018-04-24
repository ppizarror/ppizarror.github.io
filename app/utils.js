/**
 The MIT License (MIT)

 Copyright 2017-2018 Pablo Pizarro R.

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

/**
 * Función String.format(...)
 */
if (!String.format) {
    String.format = function (format) {
        let args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ?
                args[number] :
                match;
        });
    };
}

// noinspection JSUnusedGlobalSymbols
/**
 * Genera un número aleatorio entero entre min y max.
 * @param min
 * @param max
 * @return {*}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Escribe los banner sociales.
 * @return
 */
function writeSocialBar() {
    let socialhtml = $('.social').html();
    $('.social-links').html(socialhtml);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Anima un elemento con css fadeIn.
 * @param idelem
 * @param t
 * @return
 */
function fadein_css(idelem, t) {
    $(idelem).css('animation-name', 'fadeIn');
    $(idelem).css('animation-iteration-count', 1);
    $(idelem).css('animation-timing-function', 'ease-in-out');
    $(idelem).css('animation-duration', t);
    $(idelem).css('animation-fill-mode', 'forwards');
}

/**
 * Activa o desactiva el nav-wrap.
 * @return
 */
function navWrapTrigger() {
    let h = $('header').height();
    // noinspection JSValidateTypes
    let y = $(window).scrollTop();
    let nav = $('#nav-wrap');
    if ((y > h * .20) && (y < h) && ($(window).outerWidth() > 768)) {
        nav.fadeOut('fast');
    } else {
        if (y < h * .20) {
            nav.removeClass('opaque').fadeIn('fast');
        } else {
            nav.addClass('opaque').fadeIn('fast');
        }
    }
}
// Función String.format(...)
if (!String.format) {
    String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    };
}

// Genera un número aleatorio entero entre min y max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Escribe los banner sociales
function writeSocialBar() {
    id_social = ['.social', '.social-links'];
    for (var i = 0; i < id_social.length; i++) {
        $(id_social[i]).html('<!--<li><a href="https://www.facebook.com/ppizarror1"><i class="fa fa-facebook" title="Facebook"></i></a></li>--><li><a href="https://github.com/ppizarror"><i class="fa fa-github" title="GitHub"></i></a></li><li><a href="https://www.linkedin.com/in/ppizarror"><i class="fa fa-linkedin" title="Linkedin"></i></a></li><li><a href="mailto:pablo.pizarro@ing.uchile.cl"><i class="fa fa-envelope" title="Correo electrónico"></i></a></li><!--<li><a href="https://twitter.com/_ppizarror"><i class="fa fa-twitter" title="Twitter"></i></a></li><li><a href="#"><i class="fa fa-google-plus"></i></a></li><li><a href="#"><i class="fa fa-instagram"></i></a></li><li><a href="#"><i class="fa fa-skype"></i></a></li>-->');
    }
}

// Anima un elemento con css fadeIn
function fadein_css(idelem, t) {
    $(idelem).css('animation-name', 'fadeIn');
    $(idelem).css('animation-iteration-count', 1);
    $(idelem).css('animation-timing-function', 'ease-in-out');
    $(idelem).css('animation-duration', t);
    $(idelem).css('animation-fill-mode', 'forwards');
}

// Genera aleatoriamente un elemento con blur
function random_blur(idelem) {
    if (Math.random() >= blurprobability / 100) {
        for (var i = 0; i < 100; i++) {
            blur = parseInt(Math.random() * 100);
            if (blur >= blurlimits[0] && blur <= blurlimits[1]) {
                $(idelem).css('filter', String.format('blur({0}px)', blur));
                $(idelem).css('transform', 'scale(1.05)');
                console.log(String.format('Se define blur en {0}px', blur));
                return;
            }
        }
    }
}

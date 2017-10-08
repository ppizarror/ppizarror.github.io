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

$(function() {
    $('form[name=\'contactForm\']').validate({
        rules: {
            name: {
                required: true,
                minlength: 5
            },
            _replyto: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 20
            }
        },
        messages: {
            firstname: 'Por favor ingrese su nombre',
            lastname: 'Por favor ingrese su apellido',
            password: {
                required: 'Por favor ingrese una contraseña',
                minlength: 'La contraseña debe tener al menos 5 caracteres'
            },
            email: 'Por favor ingrese un email válido'
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
});

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function message_sent() {
    $('.message-show-after-send').attr('style', 'display:block');
    $('.button-close-after-send').attr('style', 'display:none');
    $('.contactName').attr('disabled', 'disabled');
    $('.contactName').attr('style', 'background:#222');
    $('.contactEmail').attr('disabled', 'disabled');
    $('.contactEmail').attr('style', 'background:#222');
    $('.contactSubject').attr('disabled', 'disabled');
    $('.contactSubject').attr('style', 'background:#222');
    $('.contactMessage').attr('disabled', 'disabled');
    $('.contactMessage').attr('style', 'background:#222; resize: none;');
}

function check_if_msg_sent() {
    var vl = getURLParameter('msg_sent');
    if (vl == 1) {
        message_sent();
        console.log('Establecido en modo mensaje enviado');
    }
}

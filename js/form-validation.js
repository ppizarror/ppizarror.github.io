$(function() {
    $("form[name='contactForm']").validate({
        rules: {
            name: {
                required: true,
                minlength: 5
            },
            _replyto: {
                required: true,
                email: true
                // regx: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
            },
            message: {
                required: true,
                minlength: 20
            }
        },
        messages: {
            firstname: "Por favor ingrese su nombre",
            lastname: "Por favor ingrese su apellido",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            email: "Por favor inrese un email válido"
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
});

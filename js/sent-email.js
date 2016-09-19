function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function message_sent() {
    $(".message-show-after-send").attr('style', 'display:block');
    $(".button-close-after-send").attr('style', 'display:none');
    $(".contactName").attr('disabled', 'disabled');
    $(".contactName").attr('style', 'background:#222');
    $(".contactEmail").attr('disabled', 'disabled');
    $(".contactEmail").attr('style', 'background:#222');
    $(".contactSubject").attr('disabled', 'disabled');
    $(".contactSubject").attr('style', 'background:#222');
    $(".contactMessage").attr('disabled', 'disabled');
    $(".contactMessage").attr('style', 'background:#222; resize: none;');
}

function check_if_msg_sent() {
    var vl = getURLParameter("msg_sent");
    if (vl==1){
        message_sent();
        console.log('Establecido en modo mensaje enviado.');
    }
}

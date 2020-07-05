function validateAndSetReactionaryColors(id, valid) {
    if (!valid) {
        // make red outline
        $('#' + id).removeClass('is-success');
        $('#' + id).addClass('is-danger');

        // error message becomes visible
        $('#' + id + "Invalid").removeClass('is-hidden')
        $('#' + id + "Invalid").addClass('is-active')
    } else {
        // make green outline
        $('#' + id).removeClass('is-danger');
        $('#' + id).addClass('is-success');

        // error message goes away
        $('#' + id + "Invalid").addClass('is-hidden')
        $('#' + id + "Invalid").removeClass('is-active')
    }
    return valid;
}

function hideClass(name) {
    $("#" + idify(name)).removeClass("is-active")
    $("#" + idify(name)).addClass("is-hidden")
}

function showClass(name) {
    $("#" + idify(name)).removeClass("is-hidden")
    $("#" + idify(name)).addClass("is-active")
}

function markInvalid(id) {
    $('#' + id).removeClass('is-success')
    $('#' + id).addClass('is-danger')
    $('#' + id + "Invalid").addClass('is-active')
    $('#' + id + "Invalid").removeClass('is-hidden')
}

function markValid(id) {
    $("#" + id).removeClass('is-danger')
    $("#" + id).addClass('is-success')
    $('#' + id + "Invalid").removeClass('is-active')
    $('#' + id + "Invalid").addClass('is-hidden')
}

function goHome(msg) {
    $.post("set_message", {
        message: msg
    }, (x, y) => {
        window.location.href = "/home"
    })
}

function getMessage() {
    $.get("/get_message", (messageRes) => {
        message = messageRes
        if (message) {
            $('#msgBlock').addClass('is-active')
            $('#msgBlock').removeClass('is-hidden')
            $('#msg').html(message)
        }
    })
}

function deleteMessage() {
    $('#msgBlock').removeClass('is-active')
    $('#msgBlock').addClass('is-hidden')
}
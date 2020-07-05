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


function addAccountInfo(bank, accountName, currentBalance) {
    return box(idify('account' + bank + accountName), [], [
        label('Bank: ' + bank),
        label('Account Name: ' + accountName),
        label('Current Balance: $' + currentBalance),
    ])
}


function box(id, classesArr, children) {
    if (!classesArr) classesArr = []
    classesArr.push("box")
    start = '<div ' + idFormat(id) + ' ' + getClasses(classesArr) + ">"
    body = ""
    children.forEach(child => body += child)
    end = "</div>"
    return start + body + end
}

function idFormat(id) {
    return id ? 'id="' + id + '"' : ""
}

function getClasses(classesArr) {
    classes = ""
    if (classesArr) {
        classes = 'class="'
        classesArr.forEach(c => classes += c + ' ')
        classes += '"'
    }
    return classes
}

function idify(name) {
    if (name && name != "") {
        tokens = name.split(" ")
        out = ""
        tokens.forEach(token => out += token + "_")
        return out.substring(0, out.length - 1)
    } else return ""

}


function addTableRow(id, values) {
    html = "<tr>"
    values.forEach(value => html += "<td>" + value + "</td>")
    html += "</tr>"
    $("#" + id).append(html)
}

function line() {
    return '<hr>'
}

function columns(columns) {
    start = '<div class="columns">'
    body = ""
    columns.forEach(column => body += column)
    end = '</div>'
    return start + body + end
}

function column(children) {
    start = '<div class="column">'
    body = ""
    children.forEach(child => body += child)
    end = "</div>"
    return start + body + end
}

function field(children) {
    start = '<div class="field">'
    body = ""
    children.forEach(child => body += child)
    end = '</div>'
    return start + body + end
}

function subtitle(id, level, text) {
    return '<h' + level + ' class="subtitle is-' + level + '" ' + idFormat(id) + '>' + text + '</h' + level + '>'
}

function span(id) {
    return '<span ' + idFormat(id) + '></span>'
}

function ul(id) {
    return '<ul ' + idFormat(id) + '></ul>'
}

function ol(id, type) {
    return '<ol ' + idFormat(id) + ' type="' + type + '"></ol>'
}

function button(classes, onclickMethod, onclickFields, text) {
    classes.push("button")
    start = '<div class="control">'
    btn = '<button ' + getClasses(classes) + ' ' + onclickFormatButton(onclickMethod, onclickFields) + '>' + text + '</button>'
    end = '</div>'
    return start + btn + end
}

function input(id, onkeyupMethod) {
    return '<div class="control"><input class="input" type="text" id="' + id + '" onkeyup="' + onkeyupMethod + '()"></div>'
}

function inputIDOnly(id) {
    return '<div class="control"><input class="input" type="text" id="' + id + '"></div>'
}

function inputWithFields(id, onkeyupMethod, fields) {
    return '<div class="control"><input class="input" type="text" id="' + id + '" ' + onkeyup(onkeyupMethod, fields) + '></div>'
}

function label(text) {
    return '<label class="label">' + text + '</label>'
}

function p(id, classesArr, text) {
    classes = getClasses(classesArr)
    return '<p id="' + id + '" ' + classes + '>' + text + '</p>'
}

function anchorClientSide(id, onclickMethod, onclickFields, classesArr, text) {
    return '<a ' + idFormat(id) + ' ' + onclickFormatAnchor(onclickMethod, onclickFields) + ' ' + getClasses(classesArr) + '> ' + text + '</a>'
}

function onclickFormatButton(onclickMethod, onclickFields) {
    fields = ""
    onclickFields.forEach(field => fields += '\'' + field + '\',')
    return 'onclick="' + onclickMethod + '(' + fields + ')"'
}

function onkeyup(onclickMethod, fields) {
    fieldsTxt = ""
    fields.forEach(field => fieldsTxt += '\'' + field + '\',')
    return 'onkeyup="' + onclickMethod + '(' + fieldsTxt + ')"'
}

function onclickFormatAnchor(onclickMethod, onclickFields) {
    fields = ""
    onclickFields.forEach(field => fields += '\'' + field + '\',')
    return 'href="javascript:' + onclickMethod + '(' + fields + ')"'
}

function idFormat(id) {
    return id ? 'id="' + id + '"' : ""
}

function getClasses(classesArr) {
    classes = ""
    if (classesArr) {
        classes = 'class="'
        classesArr.forEach(c => classes += c + ' ')
        classes += '"'
    }
    return classes
}

function moreOptions(name) {
    showClass("moreOptions" + name)
    hideClass("moreOptionsLink" + name)
    showClass("hideOptionsLink" + name)
}

function hideOptions(name) {
    hideClass("moreOptions" + name)
    showClass("moreOptionsLink" + name)
    hideClass("hideOptionsLink" + name)
}

function showDangerZone(name) {
    showClass("dangerZone" + name)
    hideClass("showDangerZoneLink" + name)
    showClass("hideDangerZoneLink" + name)
}

function hideDangerZone(name) {
    hideClass("dangerZone" + name)
    showClass("showDangerZoneLink" + name)
    hideClass("hideDangerZoneLink" + name)
}

function idify(name) {
    if (name && name != "") {
        tokens = name.split(" ")
        out = ""
        tokens.forEach(token => out += token + "_")
        return out.substring(0, out.length - 1)
    } else return ""

}

function tagify(name) {
    return '<span class="tag">' + name + '</span>'
}

function buttonify(name, onClickMethod) {
    return '<input type="button" class="button" onclick=' + onClickMethod + ' value="' + name + '"/></br>'
}
function clearAlert() {
    window.clearTimeout(timeoutID);
}

function changeContent() {
    var d = new Date();
    document.getElementById("dispTime").innerHTML = d.getTime();
}

window.setInterval(changeContent, 2000);
clearAlert()

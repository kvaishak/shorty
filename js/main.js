var endPoint = "https://www.jsonstore.io/114384795ac84252a99ae5a943c3645c36534f10bb4f3ce909f1699d9cf34a79";

//function for getting random url string.
function getrandom() {
    var random_string = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);
    return random_string;
}

//additional function for random url string. Not used for now.
function getrandom2() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

//for checking if the url provided has http in the beggining if not appending it and returning.
function geturl() {
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http: //") || url.startsWith("https://") || url.startsWith("ftp://");
    if (!protocol_ok) {
        newurl = "http: //" + url;
        return newurl;
    } else {
        return url;
    }
}

//for creating the hash that is the anchor part of any URL.
function genhash() {
    if (window.location.hash == "") {
        window.location.hash = getrandom();
    }
}

//for sending the hash and the long url to the json end point.
function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endPoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
    })
}

//Main function.
function shorturl() {
    var longurl = geturl();
    genhash();
    send_request(longurl);
}

var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endPoint + "/" + hashh, function(data) {
        data = data["result"];

        if (data != null) {
            window.location.href = data;
        }

    });
}

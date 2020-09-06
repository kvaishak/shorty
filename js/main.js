const endPoint = "https://api.jsonbin.io/b";
const SECRET_KEY = '$2b$10$hTO81NojRpU6oqeX68HSbOZKh4k2t51Am5VHN5uHX1FkwbwhnKP12'; //Dvelopment purposes secret key for JSONBIn

//for redirecting any link that has been entered with any hash to its original lengthy URL.
var binId = window.location.hash.substr(1)

if (binId != "") {
    $(".se-pre-con").show();
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        let resp = JSON.parse(req.responseText);
        window.location.href = encodeURI(resp.url);
    }
    };

    req.open("GET", `${endPoint}/${binId}`, true);
    req.setRequestHeader("secret-key", SECRET_KEY);
    req.send();
}

// For Executing the function on ENTER.
var input = document.getElementById("urlinput");

input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("shorten").click();
    }
});

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
        newurl = "http://" + url;
        return newurl;
    } else {
        return url;
    }
}

//for creating the hash that is the anchor part of any URL.
function genhash() {
    if (window.location.hash == "") {
        this.shortHash = getrandom();
    }
}

//for sending the hash and the long url to the json end point. Also clearing the input.
function send_request(url) {
    this.url = url;
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        let resp = JSON.parse(req.responseText);
        let binId = resp.id;
        
        simplecopy(window.location.href + '#' + binId);
        alert();
    }
    };

    req.open("POST", endpoint, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("secret-key", SECRET_KEY);
    req.send(`{"url": ${JSON.stringify(url)}}`);

    var input = document.getElementById("urlinput");
    input.value = "";
}

//Main function.
function shorturl() {
    var longurl = geturl();
    send_request(longurl);
}


//for displaying the url has been shortened alert at the bottom.
function alert() {
    var alertPlaceHolder = document.getElementById('alertdialog');
    alertPlaceHolder.innerHTML = "URL Shortened and Copied.";
    setTimeout(function() {
        alertPlaceHolder.innerHTML = "";
    }, 5000);
}



//Simple Copy which is used for copying the shortened URL to your clipboard which can be simply used by pasting it.
var simplecopy = function() { // make a closure so we don't pollute the namespace
    var node = document.createElement("DIV");
    node.style.position = "fixed"; // doesn't interact with the DOM
    node.style.color = "rgba(0,0,0,0)"; // transparent

    function simplecopy(copyText, callback) {
        node.innerText = copyText;
        document.body.appendChild(node);
        var selectStatus = selectText(node);
        var copyStatus = document.execCommand("copy", false, null); // copy currently selected text
        document.body.removeChild(node);
        return selectStatus && copyStatus;
    }

    function selectText(node) {
        var range, selection;
        if (document.body.createTextRange) { // if the browser supports this old method
            range = document.body.createTextRange(); // create a text range
            range.moveToElementText(node);
            range.select();
            return true;
        } else if (window.getSelection) { // if the browser supports the newer method
            selection = window.getSelection(); // get a selection object
            range = document.createRange(); // create a blank range object
            range.selectNodeContents(node);
            selection.removeAllRanges(); // clear any current range from the selection
            selection.addRange(range); // select the contents of the range
            return true;
        } else {
            return false;
        }
    }
    return simplecopy;
}();
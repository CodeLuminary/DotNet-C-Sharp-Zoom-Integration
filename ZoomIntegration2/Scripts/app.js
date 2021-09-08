var body = document.querySelector("body"); var createClass = document.getElementById("createClass");
ShowSelectedMenu('a_dashboard', '#div_onlineClass');
createClass.onclick = createOnlineClass;

function ShowSelectedMenu(a_menuItem, div_menuContent) {
    let contentDiv = document.querySelectorAll("#div_mainContent > div"); for (let i = 0; i < contentDiv.length; i++) { contentDiv[i].style.display = "none"; }
    try { document.querySelector(div_menuContent).style.display = "block"; }
    catch (ex) { }
    let menuList = document.querySelectorAll(".adminList li"); for (let i = 0; i < menuList.length; i++) { menuList[i].classList.remove("li_activeBackground"); } document.querySelector("#" + a_menuItem).parentElement.className += " li_activeBackground"; //Add the hightlighted link
    let subMenuDiv = document.querySelectorAll(div_menuContent + " > div:nth-child(2) > div");
    try {
        for (let i = 0; i < subMenuDiv.length; i++) { subMenuDiv[i].style.display = "none"; }
        document.querySelector(div_menuContent + " > div:nth-child(2) > div:first-child").style.display = "block";
    } catch (ex) { }
    try {
        let subLinks = document.querySelectorAll(div_menuContent + " > div:first-child ul li a"); for (let i = 0; i < subLinks.length; i++) {
            subLinks[i].classList.remove("btn_changeBackground");
            //subLinks[i].style.display = "none";
        } document.querySelector(div_menuContent + " > div:first-child ul li a:first-child").className += " btn_changeBackground";
    }
    catch (ex) { }
}
function ShowSubSelectedMenu(a_menuItem, div_menuContent, div_subMenuContent) {
    let contentDiv = document.querySelectorAll(div_menuContent + " > div:nth-child(2) > div"); for (let i = 0; i < contentDiv.length; i++) { contentDiv[i].style.display = "none"; }
    document.querySelector(div_subMenuContent).style.display = "block"; let subLinks = document.querySelectorAll(div_menuContent + " > div:first-child ul li a");
    for (let i = 0; i < subLinks.length; i++) {
        subLinks[i].classList.remove("btn_changeBackground");
    } document.querySelector("#" + a_menuItem).className += " btn_changeBackground";
}
var tvid = "false"; var stvid = "false"; var allowSt = "false"; var muteSt = "false";
function hostVideo(n) {
    if (n == 0) {
        tvid = "false";
    }
    else if (n == 1) {
        tvid = "true";
    }
}
function stuVideo(n) {
    if (n == 0) {
        stvid = "false";
    }
    else if (n == 0) {
        stvid = "true";
    }
}
function allStud() {
    let astud = document.getElementById("allowStud");
    if (astud.checked) {
        allowSt = "true";
    }
    else {
        allowSt = "false";
    }
}
function muteStud() {
    let mStud = document.getElementById("mStud");
    if (mStud.checked) {
        muteSt = "true";
    }
    else {
        muteSt = "false";
    }
}
function createOnlineClass() {
    let classTopic = document.getElementById("classTopic").value;
    let dur = document.getElementById("onlineClassDur").value;
    let onlineDate = document.getElementById("onlineDate").value;
    let onlineTime = document.getElementById("onlineTime").value;
    if (classTopic.length > 0 && onlineDate.length > 0 && onlineTime.length > 0) {

        let zoom = {}
        zoom.duration = dur; zoom.topic = classTopic;
        zoom.hostvideo = tvid;
        zoom.parvideo = stvid;
        zoom.muteStud = muteSt;
        zoom.allowstud = allowSt;
        zoom.start_time = onlineDate + " " + onlineTime;
        ajaxApi(zoom)
       // si_webpiS(url, msg, document.querySelector(".div_viewOClass"));
    }
    else {
        alert("Please fill in all inputs!");
    }

    return false;
}

function ajaxApi(jsonObject) {
    let xhhtp = new XMLHttpRequest();
    xhhtp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let jsonResponse = JSON.parse(xhhtp.responseText);
            if (typeof jsonResponse === 'string') {//Check to see if the jsonResponse variable is still a string and not an object
                jsonResponse = JSON.parse(jsonResponse
                //Get response here
            }
        }
    }
    xhhtp.open("POST", '/api/zoom', true);
    xhhtp.setRequestHeader("Content-type", "application/json");
    xhhtp.send(JSON.stringify(jsonObject));
}
function fetchApi(jsonObject) {
    fetch(/api/zoom, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(jsonObject)
    }).then(response => response.json()).then(data => {
        //Get response here
    });
}
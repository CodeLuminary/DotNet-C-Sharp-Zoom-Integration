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
function createOnlineClass(url) {
    var classTopic = document.getElementById("classTopic").value;
    var dur = document.getElementById("onlineClassDur").value;
    var onlineDate = document.getElementById("onlineDate").value;
    var onlineTime = document.getElementById("onlineTime").value;
    if (classTopic.length > 0 && onlineDate.length > 0 && onlineTime.length > 0) {
       
       // si_webpiS(url, msg, document.querySelector(".div_viewOClass"));
    }
    else {
        alert("Please fill in all inputs!");
    }

    return false;
}
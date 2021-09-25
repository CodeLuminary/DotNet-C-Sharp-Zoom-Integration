const body = document.querySelector("body");

let meetConfig = {
    apiKey: 'Your api key here',
    meetingNumber: "",
    leaveUrl: 'Enter the url you want the user to be redirected to when the meeting finishes',
    userName: 'Your username here',
    passWord: 'Your password here',
    role: 1 // 1 for host, 0 for client
};

body.onload = () => {
    meetConfig.meetingNumber = "Put meetingNumber gotten after meeting creation";
    meetConfig.userName = "Your username here";
    ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.8.0/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    ZoomMtg.init({
        leaveUrl: meetConfig.leaveUrl,
        isSupportAV: true,
        // on success, call the join method
        success: function () {
            ZoomMtg.join({
                // pass your signature response in the join method
                signature: response,
                apiKey: meetConfig.apiKey,
                meetingNumber: meetConfig.meetingNumber,
                userName: meetConfig.userName,
                passWord: meetConfig.passWord,
                error(res) {
                    console.log(res)
                }
        }
    });
}
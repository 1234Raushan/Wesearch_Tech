function chatinit(uid,authToken,widgetID,appId,apiKey,cometchat_url,appRegion) {
    var request = new XMLHttpRequest();

    var url = cometchat_url + 'users/' + uid + '/auth_tokens';

    request.open('POST', url, true);
    request.setRequestHeader('appId', appId);
    request.setRequestHeader('apiKey', apiKey);
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        // Begin accessing JSON data here

        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            //cometchat(data["data"]["authToken"], uid);
            cometchat(uid,authToken,widgetID,appId,appRegion);

        } else {
            console.log('error')
        }
    }
    request.send()
}

function cometchat(uid,authToken,widgetID,appId,appRegion) {

    CometChatWidget.init({
        "appID": appId,
        "appRegion": appRegion,
    }).then(response => {
        console.log("Initialization completed successfully");
        //You can now call login function.
        CometChatWidget.login({
            "authToken": authToken
        }).then(response => {
            CometChatWidget.launch({
                "widgetID": widgetID,
                "docked": "true",
                "alignment": "left",
                "roundedCorners": "false",
                "height": "400px",
                "width": "300px",
                "defaultID": uid, //default UID (user) or GUID (group) to show,
                "defaultType": 'user' //user or group
            });
        }, error => {
            console.log("User login failed with error:", error);
            //Check the reason for error and take appropriate action.
        });
    }, error => {
        console.log("Initialization failed with error:", error);
        //Check the reason for error and take appropriate action.
    });

}

function chatlogout() {
    CometChatWidget.logout();
}

function groupChat(PatientTransactionNumber) {
    CometChatWidget.chatWithGroup(PatientTransactionNumber);
    CometChatWidget.openOrCloseChat(true);
}

function checkGroupChatValidation(groupid,usercode,cometchat_url,chat_maingroup,appId,apikey) {
    var request = new XMLHttpRequest();

    var url = cometchat_url + 'users/' + chat_maingroup +'/groups/' + groupid + '/members?searchKey=' + usercode;

    request.open('GET', url, true);
    request.setRequestHeader('appId', appId);
    request.setRequestHeader('apiKey', apikey);
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (data['data']) {
            data['data'].length > 0 ? groupChat(groupid) : alert('Error: You have no access to chat with this group.');
        } 
        else if (data['error']) {
            data['error'].message !== '' ? alert('Error: The group for selected Case does not exist.'):null;
        }
        else {
            alert('Error: You have no access to chat with this group.');
        }
    }
    request.send()
}
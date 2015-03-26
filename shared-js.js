function updateRecentPollsList() {
    $(".fetch-from-history .fetch-input").html(function () {
        var recentPolls = JSON.parse(window.localStorage.getItem("recent-polls"));
        var html = "";
        html += "<select class='recent-poll-options'>";
        html += "<option class='recent-poll-option dummy' value='0' selected>Recently viewed polls...</option>";
        if (recentPolls != null && recentPolls.length > 0) {
            for (var i = 0; i < recentPolls.length; i++) {
                html += "<option class='recent-poll-option' value='" + recentPolls[i].id + "'>" + recentPolls[i].title + "</option>";
            }
            html += "</select>";
        }
        return html;
    });
}

function extractIdFromFetchInput(input) {
    var new_id = ""
    if (input.indexOf("vote/?") > -1) {
        var regex = /vote\/\?id=(.+)#?.*/g;
        var match = regex.exec(input);
        new_id = match[1];
    } else {
        new_id = input;
    }
    return new_id;
}
$(document).on("click", ".create-button", function (e) {
    window.location = "/";
});
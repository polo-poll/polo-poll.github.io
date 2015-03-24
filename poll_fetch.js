var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};
function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

function resultsToLhsHtml(pollOption, colourIndex) {
    resetOrientationButtons();
    $(".position-image.left").addClass("selected");
    $(".graph-container").removeClass(m_graphOrientation);
    $(".graph-container").addClass("left");
    m_graphOrientation = "left";
    var html = "<div class='graph-title large-text white-text'>" + m_pollResults.title + "</div>";
    for (var i = 0; i < m_pollResults.options.length; i++) {
        var colourIndex = i % colors.length;
        var pollOption = m_pollResults.options[i];
        html += "<div class='flat row'>" +
                "<div class='option'><span class='option-text white-text medium-text'>" + pollOption.text + "</span></div>" +
                "<div class='vote-cell'>" +
                "<div class='vote' style='width:" + pollOption.portionOfVotes +
                    "%; background-color: " + colors[colourIndex] + "'>" +
                    "<span class='vote-count medium-text white-text'>" + pollOption.votes + "</span></div>" +
                "</div></div>";
    }
    $(".poll-wrapper .graph-wrapper").css({ "display": "block" });
    $(".graph-wrapper .graph-container").html(html);
    $(".graph-wrapper .vote").css({
        "border-top-left-radius": "0px",
        "border-bottom-left-radius": "0px",
        "border-top-right-radius": "5px",
        "border-bottom-right-radius": "5px",
        "float": "left"
    });
    $(".graph-wrapper .option").css({
        "text-align": "right"
    });
}
function resultsToRhsHtml(colourIndex) {
    resetOrientationButtons();
    $(".position-image.right").addClass("selected");
    $(".graph-container").removeClass(m_graphOrientation);
    $(".graph-container").addClass("right");
    m_graphOrientation = "right";

    var html = "<div class='graph-title large-text white-text'>" + m_pollResults.title + "</div>";
    for (var i = 0; i < m_pollResults.options.length; i++) {
        var colourIndex = i % colors.length;
        var pollOption = m_pollResults.options[i];
        html += "<div class='flat row'>" +
                "<div class='vote-cell'>" +
                "<div class='vote' style='width:" + pollOption.portionOfVotes +
                    "%; background-color: " + colors[colourIndex] + "'>" +
                    "<span class='vote-count medium-text white-text'>" + pollOption.votes + "</span></div>" +
                "</div>" +
                "<div class='option'><span class='option-text medium-text white-text'>" + pollOption.text + "</span></div>" +
            "</div>";
    }
    $(".poll-wrapper .graph-wrapper").css({ "display": "block" });
    $(".graph-wrapper .graph-container").html(html);
    $(".graph-wrapper .vote-cell").css({
        "display": "inline-block",
        "vertical-align": ""
    });
    $(".graph-wrapper .vote").css({
        "border-top-right-radius": "0px",
        "border-bottom-right-radius": "0px",
        "border-top-left-radius": "5px",
        "border-bottom-left-radius": "5px",
        "float": "right"
    });
    $(".graph-wrapper .option").css({
        "text-align": "left"
    });
}
function resultsToBottomHtml(colourIndex) {
    resetOrientationButtons();
    $(".position-image.bottom").addClass("selected");
    $(".graph-container").removeClass(m_graphOrientation);
    $(".graph-container").addClass("bottom");
    m_graphOrientation = "bottom";

    var html = "<div class='graph-title large-text white-text'>" + m_pollResults.title + "</div><div class='graph'>";
    for (var i = 0; i < m_pollResults.options.length; i++) {
        var colourIndex = i % colors.length;
        var pollOption = m_pollResults.options[i];
        html += "<div class='rotated-container bottom'>" +
                    "<div class='row'>" +
                        "<div class='vote-cell'>" +
                            "<div class='vote' style='height:" + pollOption.portionOfVotes +
                                "%; background-color: " + colors[colourIndex] + "'>" +
                                "<span class='vote-count medium-text white-text'>" + pollOption.votes + "</span></div>" +
                        "</div>" +
                        "<div class='option'><div class='option-span-wrapper'><span class='option-text medium-text white-text'>" + pollOption.text + "</span></div></div>" +
                    "</div></div>";
    }
    html += "<div class='rotated-container'><div class='row'><div class='vote-cell'></div>" +
                "<div class='option'><div class='option-span-wrapper'></div></div>" +
            "</div></div><div class='rotated-container'><div class='row'><div class='vote-cell'></div>" +
                "<div class='option'><div class='option-span-wrapper'></div></div>" +
            "</div></div>";
    $(".poll-wrapper .graph-wrapper").css({ "display": "flex" });
    $(".graph-wrapper .graph-container").html("</div>" + html);
    $(".rotated-container .option").css({
        "padding": "0"
    });
    $(".rotated-container .vote").css({
        "border-top-left-radius": "5px",
        "border-bottom-left-radius": "0px",
        "border-top-right-radius": "5px",
        "border-bottom-right-radius": "0px"
    });
    updateBarMaxHeight();
    $(".rotated-container.bottom .option-text").css({
        "padding": "4px 0 4px 24px"
    });
}
function resultsToTopHtml(colourIndex) {
    resetOrientationButtons();
    $(".position-image.top").addClass("selected");
    $(".graph-container").removeClass(m_graphOrientation);
    $(".graph-container").addClass("top");
    m_graphOrientation = "top";

    var html = "<div class='graph-title large-text white-text'>" + m_pollResults.title + "</div><div class='graph'>";
    for (var i = 0; i < m_pollResults.options.length; i++) {
        var colourIndex = i % colors.length;
        var pollOption = m_pollResults.options[i];
        html += "<div class='rotated-container top'>" +
                    "<div class='row'>" +
                        "<div class='option'><div class='option-span-wrapper'><span class='option-text medium-text white-text'>" + pollOption.text + "</span></div></div>" +
                        "<div class='vote-cell'>" +
                            "<div class='vote' style='height:" + pollOption.portionOfVotes +
                                "%; background-color: " + colors[colourIndex] + "'>" +
                                "<span class='vote-count medium-text white-text'>" + pollOption.votes + "</span></div>" +
                        "</div>" +
                    "</div></div>";
    }
    html += "<div class='rotated-container'><div class='row'><div class='vote-cell'></div>" +
                "<div class='option'><div class='option-span-wrapper'></div></div>" +
            "</div></div><div class='rotated-container'><div class='row'><div class='vote-cell'></div>" +
                "<div class='option'><div class='option-span-wrapper'></div></div>" +
            "</div></div>";
    $(".poll-wrapper .graph-wrapper").css({ "display": "flex" });
    $(".graph-wrapper .graph-container").html("</div>" + html);
    $(".rotated-container .vote").css({
        "border-top-left-radius": "0px",
        "border-bottom-left-radius": "5px",
        "border-top-right-radius": "0px",
        "border-bottom-right-radius": "5px"
    });
    updateBarMaxHeight();
    $(".rotated-container.top .option-span-wrapper span").css({
        "padding": "4px 0 4px 4px"
    });
}


    $(document).on("click", ".fetch-button", function (e) {
        e.stopPropagation();
        var inputValue = $.trim($(".url-input").val());
        var new_id = "";
        if (inputValue.indexOf("pollo.com") > -1) {
            var regex = /api\/poll\/(.+)/g;
            var match = regex.exec(url);
            new_id = match[1];
        } else {
            new_id = inputValue;
        }
        m_viewGraph = false;

        if (new_id != "" && m_pollId != new_id) {
            getPollResults(new_id).then(function () {
                m_pollId = new_id;
                resetVotePage();
                displayVoteOptions();
                resetGraphPage();
                appendPollToRecentlyViewed();
            });
        } else {
            if (!$.isEmptyObject(m_pollResults)) {
                resetGraphPage();
                $(".poll-wrapper .vote-wrapper").css({ "display": "flex" });
            }
        }
    });

    $(document).on("change", ".view-mode", function (e) {
        e.stopPropagation();
        var selectedItem = $(this).find(':selected').val();
        m_size = selectedItem;
    });
    $(document).on('click', '.position-image.left', function (e) {
        e.stopPropagation();
        orientationToDisplay("left");
    });
    $(document).on('click', '.position-image.top', function (e) {
        e.stopPropagation();
        orientationToDisplay("top");
    });
    $(document).on('click', '.position-image.right', function (e) {
        e.stopPropagation();
        orientationToDisplay("right");
    });
    $(document).on('click', '.position-image.bottom', function (e) {
        e.stopPropagation();
        orientationToDisplay("bottom");
    });
    $(document).on('change', '.recent-poll-options', function (e) {
        var pollId = $(this).val();
        if (pollId != 0 && pollId != m_pollId) {
            m_pollId = pollId;
            window.clearTimeout(m_timeoutId);
            $("input.url-input").val(m_pollId);
            getPollResults(m_pollId).then(function () {
                if (!m_viewGraph) {
                    resetGraphPage();
                    resetVotePage();
                    displayVoteOptions();
                } else {
                    resetVotePage();
                    displayVoteOptions();
                    $(".poll-wrapper .vote-wrapper").hide();
                }
            });
        }
    });

    function orientationToDisplay(orientation) {
        if (orientation === "top") {
            resultsToTopHtml();
        } else if (orientation === "right") {
            resultsToRhsHtml();
        } else if (orientation === "bottom") {
            resultsToBottomHtml()
        } else {
            resultsToLhsHtml();
        }
    }

    function resetOrientationButtons() {
        $(".position-image.top").removeClass("selected");
        $(".position-image.right").removeClass("selected");
        $(".position-image.bottom").removeClass("selected");
        $(".position-image.left").removeClass("selected");
    }
    function updateBarMaxHeight() {
        var pollWrapperHeight = $(".vote-cell").height();
        $(".rotated-container .vote-cell").css({
            "height": pollWrapperHeight
        });
    }

    function getPollResults(pollId) {
        if (pollId.length > 1) {
            return $.ajax({
                type: "GET",
                url: "http://trmonks-pollo.appspot.com/api/poll/" + pollId,
                dataType: "json"
            }).then(function (json) {
                $(".fetch-error-wrapper").hide();
                jsonToPollResults(json);
                if (m_viewGraph) {
                    orientationToDisplay(m_graphOrientation);
                    //m_timeoutId = setTimeout(function () { getPollResults(pollId) }, (60 * 1000));
                }
            }, function (error) {
                $(".fetch-error-wrapper").show();
            });
        }
    }
    function jsonToPollResults(json) {
        var title = escapeHtml(json.success.title);
        var pollId = json.success.id;
        var options = [];
        m_pollId = pollId;

        var biggestValue = json.success.options.reduce(function (previousValue, currentValue, index, array) {
            return Math.max(currentValue.vote_count, previousValue.vote_count);
        });
        if (isNaN(biggestValue)) {
            biggestValue = 1;
        }
        for (var i = 0; i < json.success.options.length; i++) {
            var option = json.success.options[i];
            var pollOption = {
                rank: option.rank,
                id: option.id,
                votes: option.vote_count,
                text: escapeHtml(option.text),
                portionOfVotes: ((option.vote_count / biggestValue)*100)
            }
            options.push(pollOption);
        }
        var date = json.success.date;
        m_pollResults = {
            title: title,
            id: pollId,
            options: options,
            date: date
        }
    }

    function displayVoteOptions() {
        $(".poll-wrapper .vote-wrapper").css({ "display": "flex" });
        var voteWrapper = $(".poll-wrapper .vote-wrapper");
        $(".vote-wrapper .title").text(m_pollResults.title);
        var html = "";
        for (var i = 0; i < m_pollResults.options.length; i++) {
            var option = m_pollResults.options[i];
            html += "<div class='option-row active'>" + 
                    "<div class='option medium-text white-text'>" + option.text + "</div>" +
                    "<div class='vote-button-wrapper'><div class='vote-button' data-id='" + option.id + "'></div></div>" +
                    "</div>";
        }
        $(".vote-wrapper .options").prepend(html);

    }

    function appendPollToRecentlyViewed() {
        var recentPolls = JSON.parse(window.localStorage.getItem("recent-polls"));
        var pollToStore = { id: m_pollResults.id, title: m_pollResults.title };
        if (recentPolls === null) {
            window.localStorage.setItem("recent-polls", JSON.stringify([pollToStore]));
        } else {
            var pollAlreadySaved = -1;
            for (var i = 0; i < recentPolls.length; i++) {
                if (recentPolls[i].id === pollToStore.id) {
                    pollAlreadySaved = i;
                }
            }
            if (pollAlreadySaved > -1) {
                recentPolls.push(pollToStore);
                recentPolls.splice(pollAlreadySaved, 1);
            } else {
                recentPolls.push(pollToStore);
                if (recentPolls.length > 6) {
                    recentPolls.splice(0, 1);
                }
            }
            window.localStorage.setItem("recent-polls", JSON.stringify(recentPolls));
        }
        updateRecentPollsList();
    }
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
    var html = "<div class='graph-title large-text white-text'>" + m_pollResults.title + "</div>";
    var maxOptionSize = 0;
    for (var i = 0; i < m_pollResults.options.length; i++) {
        var colourIndex = i % colors.length;
        var pollOption = m_pollResults.options[i];
        if (pollOption.text.length > maxOptionSize) {
            maxOptionSize = pollOption.text.length;
        }
        html += "<div class='row'>" +
                "<div class='option'><span class='option-text white-text medium-text'>" + pollOption.text + "</span></div>" +
                "<div class='vote-cell'>" +
                "<div class='vote' style='width:" + pollOption.portionOfVotes +
                    "%; background-color: " + colors[colourIndex] + "'>" +
                    "<span class='vote-count medium-text white-text'>" + pollOption.votes + "</span></div>" +
                "</div></div>";
    }
    $(".poll-wrapper .graph-wrapper").css({ "display": "block" });
    $(".graph-wrapper .graph-container").html(html);
    if (maxOptionSize < 20) {
        $(".graph-wrapper .option").css({ "flex": "0 1 140px" });
    } else if (maxOptionSize < 50) {
        $(".graph-wrapper .option").css({ "flex": "0 1 240px" });
    } else if (maxOptionSize > 50) {
        $(".graph-wrapper .option").css({ "flex": "0 1 320px" });
    }
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
                    resultsToLhsHtml();
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
        if (biggestValue == 0) {
            biggestValue = 1;
        }
        for (var i = 0; i < json.success.options.length; i++) {
            var option = json.success.options[i];
            var calculatedPortion = ((option.vote_count / biggestValue) * 100);
            var pollOption = {
                rank: option.rank,
                id: option.id,
                votes: option.vote_count,
                text: escapeHtml(option.text),
                portionOfVotes: calculatedPortion
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
            html += "<div class='option-row active' data-id='" + option.id + "'>" +
                    "<div class='option medium-text white-text'>" + option.text + "</div>" +
                    "<div class='vote-button-wrapper'><div class='vote-button'></div></div>" +
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
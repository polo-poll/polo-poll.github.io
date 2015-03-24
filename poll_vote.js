$(document).on("click", ".option-row.active .vote-button", function (e) {
    var id = $(this).data("id");
    var parent = $(this).parents(".option-row");
    var clickedButton = this;
    if ($(parent).hasClass("active")) {
        $.ajax({
            url: "http://trmonks-pollo.appspot.com/api/option/" + id + "/vote",
            type: "POST",
            dataType: "json"
        }).then(function (data) {
            m_viewGraph = true;
            $(".fetch-error-wrapper").hide();
            $("input.url-input").val(m_pollId);
            $(".option-row").removeClass("active");
            if (!data.hasOwnProperty("error")) {
                $(clickedButton).addClass("selected");
            }
            $(".poll-wrapper .vote-wrapper").hide();
            getPollResults(m_pollId);
        });
    }
});

$(document).on("mouseenter", ".vote-button", function () {
    $(this).parent().siblings().addClass("hover");
});
$(document).on("mouseleave", ".vote-button", function () {
    $(this).parent().siblings().removeClass("hover");
});

$(document).on("click", ".skip-voting", function () {
    $(".fetch-error-wrapper").hide();
    $("input.url-input").val(m_pollId);
    $(".poll-wrapper .vote-wrapper").hide();
    m_viewGraph = true;
    getPollResults(m_pollId);
});
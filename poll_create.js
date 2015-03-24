$(document).on("keyup", "textarea.error", function (e) {
    if ($.trim($(this).val()) != '') {
        $(this).removeClass("error");
        $(this).css({ "border-color": "silver" });
    }
});
$(document).on("keyup", ".option.last", function (e) {
    autosize($("textarea.option"));
    var value = "";
    try {
        value = $.trim($(this).val());
    } catch (e) {
        value = "";
    }
    if (value != "") {
        addNewOption();
    }
});

function addNewOption() {
    $(".options-wrapper .option.last").removeClass("last");
    $(".options-wrapper .options").append(function () {
        return "<div class='option-row'>" +
                "<textarea class='option last medium-text' rows='1' type='text'></textarea>" +
                "<div class='delete-option'>" +
                "<div class='delete-button small-text'></div></div>" +
                "</div>";
    });
    autosize($("textarea.option"));
}

$(document).on("click", ".delete-option .button", function () {
    if ($(".option-row").length > 2) {
        $(this).parents(".option-row").remove();
    }
});

$(document).on("click", "button.submit", function () {
    var error = false;
    var title = $("textarea.title").val();
    if ($.trim(title) == '') {
        error = true;
        $("textarea.title").addClass("error");
        $("textarea.title").css({ "border-color": "red" });
    }
    var options = [];
    var optionFields = $(".options-wrapper textarea.option");

    for (var i = 0; i < optionFields.length; i++) {
        var value = optionFields[i].value;
        if ($.trim(value) != "") {
            options.push($.trim(value));
        } else {
            if (!$(optionFields[i]).hasClass("last")) {
                error = true;
                $(optionFields[i]).addClass("error");
                $(optionFields[i]).css({ "border-color": "red" });
            }
        }
    }
    if (!error) {
        $.ajax({
            url: 'http://trmonks-pollo.appspot.com/api/poll',
            type: 'post',
            dataType: 'json',
            data: {
                title: title,
                options: options
            }
        }).then(function (json) {
            var newPollId = json.success.id;
            window.location = "vote.html?id=" + newPollId + "#true";
        });
    }
});
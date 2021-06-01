$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
            debugger;
        },
        submitSuccess: function ($form, event) {
            debugger;
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#contact-name").val();
            var email = $("input#contact-email").val();
            var phone = $("input#contact-phone").val();
            var message = $("textarea#contact-message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbxjMfCo-mHRIMweLoJthWGDfLiIbn09GyNeOrDx1wA0LVbWiGry/exec",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                },
                cache: false,
                success: function () {
                    debugger;
                    // Success message
                    $("#success").html("<div class='alert alert-success'>");
                    $("#success > .alert-success")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-success").append(
                        "<strong>ההודעה שלך נשלחה. </strong>"
                    );
                    $("#success > .alert-success").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                error: function () {
                    debugger;
                    // Fail message
                    $("#success").html("<div class='alert alert-danger'>");
                    $("#success > .alert-danger")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-danger").append(
                        $("<strong>").text(
                            "סליחה " +
                                firstName +
                                ", זה נראה כאילו שרת המייל שלי לא מגיב. נסו שוב מאוחר יותר!"
                        )
                    );
                    $("#success > .alert-danger").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});

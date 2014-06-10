function FacebookLogin() {
    FB.login(function (e) {
        e.authResponse && (FB.api("/me", function (e) {
            var t = e.name,
                o = e.id,
                n = Parse.Object.extend("FacebookID"),
                a = new Parse.Query(n);
            a.equalTo("userID", o), a.find({
                success: function (e) {
                    if (console.log(e.length), 0 === e.length) {
                        var a = new n;
                        a.set("username", t), a.set("userID", o), a.save()
                    }
                },
                error: function (e) {
                    alert("Error: " + e.code + " " + e.message)
                }
            })
        }), $(".info").html("Wait we'll sent you back...."), setTimeout(function () {
            window.location.reload()
        }, 2e3))
    }, {
        scope: "user_likes,user_photos,publish_actions"
    })
}

function PostImageToFacebook(e) {
    var t = document.getElementById("canvas"),
        o = t.toDataURL("image/png");
    try {
        blob = dataURItoBlob(o)
    } catch (n) {
        console.log(n)
    }
    var a = new FormData;
    a.append("access_token", e), a.append("source", blob), a.append("message", "這是HTML5 canvas和Facebook API結合教學");
    try {
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + e,
            type: "POST",
            data: a,
            processData: !1,
            contentType: !1,
            cache: !1,
            success: function (e) {
                console.log("success " + e), $(".info").html("Posted Canvas Successfully")
            },
            error: function (e, t, o) {
                $(".info").html("error " + o + " Status " + e.status)
            },
            complete: function () {
                $(".info").append("Posted to facebook")
            }
        })
    } catch (n) {
        console.log(n)
    }
}

function dataURItoBlob(e) {
    for (var t = atob(e.split(",")[1]), o = new ArrayBuffer(t.length), n = new Uint8Array(o), a = 0; a < t.length; a++) n[a] = t.charCodeAt(a);
    return new Blob([o], {
        type: "image/png"
    })
}
Parse.initialize("odGEpyGG0YHEJRL7oRpHZBqs5T6gV29a7RPf5E7M", "Q2vZNBtDOIGIfrDtYiXHUNkYGlKU4GjeQt7QLTOh"), window.fbAsyncInit = function () {
    function e(e) {
        canMouseX = parseInt(e.clientX - l), canMouseY = parseInt(e.clientY - u), m = !0
    }

    function t(e) {
        canMouseX = parseInt(e.clientX - l), canMouseY = parseInt(e.clientY - u), m = !1
    }

    function o(e) {
        canMouseX = parseInt(e.clientX - l), canMouseY = parseInt(e.clientY - u)
    }

    function n(e) {
        if (canMouseX = parseInt(e.clientX - l), canMouseY = parseInt(e.clientY - u), m) {
            a.clearRect(0, 0, p, f);
            var t = document.getElementById("preview1");
            a.drawImage(t, canMouseX - 64, canMouseY - 60), a.drawImage(c, 200, 400), a.drawImage(s, 0, 0);
            var o = $("#inputed").val();
            a.fillStyle = "black", a.font = '20px "微軟正黑體"', a.fillText(o, 275, 445)
        }
    }
    FB.init({
        appId: "615789688470381",
        status: !0,
        cookie: !0,
        xfbml: !0,
        version: "v1.0"
    }), FB.getLoginStatus(function (e) {
        "connected" === e.status ? (window.authToken = e.authResponse.accessToken, FB.api("/me/picture?type=large", function (e) {
            console.log(e), $("#preview1").attr("src", e.data.url)
        })) : "not_authorized" === e.status ? ($("#main").html("<h1>Please authorized this apps</h1><h4> p/s: please allow browser popup for this website and refresh to use this apps</h4>"), $("#facebookname,#Sent,label").remove(), FacebookLogin()
        ): ($("#main").html("<h1>Please login to use this apps</h1><h4> p/s: please allow browser popup for this website and refresh to use this apps</h4>"), $("#facebookname,#Sent,label").remove(), FacebookLogin())
    });
    var a = document.getElementById("canvas").getContext("2d");
    a.font = '20px "Arial"', a.fillText("Click here to start fill with Facebook Profile Picture", 40, 270);
    var s = new Image;
    s.src = "img/overlayback.png";
    var c = new Image;
    c.src = "img/typography.png";
    var i = document.getElementById("canvas"),
        a = i.getContext("2d"),
        r = $("#canvas").offset(),
        l = r.left,
        u = r.top,
        p = i.width,
        f = i.height,
        m = !1;
    $("#canvas").mousedown(function (t) {
        e(t)
    }), $("#canvas").mousemove(function (e) {
        n(e)
    }), $("#canvas").mouseup(function (e) {
        t(e)
    }), $("#canvas").mouseout(function (e) {
        o(e)
    })
},
function (e, t, o) {
    var n, a = e.getElementsByTagName(t)[0];
    e.getElementById(o) || (n = e.createElement(t), n.id = o, n.src = "//connect.facebook.net/en_US/all.js", a.parentNode.insertBefore(n, a))
}(document, "script", "facebook-jssdk");
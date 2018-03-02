
function initCalendar()
{
    $(".long.years").text(new Number(parseInt((0x7FFFFFFFFFFFFFFF - (new Date())/1000)/60/60/24/365)).toLocaleString());
    $(".ulong.years").text(new Number(parseInt((0xFFFFFFFFFFFFFFFF - (new Date())/1000)/60/60/24/365)).toLocaleString());
    setDateTime();


    setInterval(setDateTime, 1000);
}

function setDateTime()
{
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    var d = date.getDate();
    var M = date.toLocaleString(navigator.language, { month: "long" });
    var N = date.getMonth() + 1;
    var Y = Math.abs(date.getFullYear() - 1970) + 1;
    var W = date.toLocaleString(navigator.language, { weekday: "long" });
    var ampm  = h >= 12 ? 'pm' : 'am';
    var ampm_h = h % 12;
    ampm_h = ampm_h ? ampm_h : 12

    $("#hour").text(h < 10 ? "0" + h : h);
    $("#hour_ampm").text((ampm_h < 10 ? "0" + ampm_h : ampm_h) + " " + ampm);
    $("#min").text(m < 10 ? "0" + m : m);
    $("#sec").text(s < 10 ? "0" + s : s);

    $("#date").text(d < 10 ? "0" + d : d);
    $("#weekday").text(W);
    $("#month").text(M);
    $("#month-no").text(N < 10 ? "0" + N : N);
    $("#year").text(Y < 10 ? "0" + Y : Y);
    $("#timestamp").text(parseInt(date.getTime()/1000));

    updateCounters(".int", new Date(0x7FFFFFFF * 1000));
    updateCounters(".uint", new Date(0xFFFFFFFF * 1000));
    // var int_limit = new Date(new Date(0x7FFFFFFF * 1000) - date);
    //
    //
    // if (int_limit > 0) {
    //     $(".int.years").text(int_limit.getUTCFullYear() - 1970);
    //     $(".int.days").text(getCountDays(int_limit));
    //     $(".int.clock").text(zerofil(int_limit.getUTCHours())
    //         + ":" + zerofil(int_limit.getUTCMinutes())
    //         + ":" + zerofil(int_limit.getUTCSeconds()))
    // }
}

function zerofil(num) {
    return num < 10 ? "0" + num : num;
}

function getCountDays(date)
{
    var days = 0;
    for (var month = 1; month < date.getMonth(); month++) {
        days += (new Date(date.getUTCFullYear(), month, 0)).getDate();
    }
    days += date.getUTCDate();

    return days;
}

function updateCounters(cls, date)
{
    var diff = new Date(date - new Date());

    if (diff > 0) {
        $(cls + ".years").text(diff.getUTCFullYear() - 1970);
        $(cls + ".days").text(getCountDays(diff));
        $(cls + ".clock").text(zerofil(diff.getUTCHours())
            + ":" + zerofil(diff.getUTCMinutes())
            + ":" + zerofil(diff.getUTCSeconds()))
    }
}

$(document)
    .ready(function() {

        // fix menu when passed
        $('.calendar')
            .visibility({
                once: false,
                onBottomPassed: function() {
                    $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function() {
                    $('.fixed.menu').transition('fade out');
                }
            })
        ;

        // create sidebar and attach to menu open
        $('.ui.sidebar')
            .sidebar('attach events', '.toc.item')
        ;
    })
;
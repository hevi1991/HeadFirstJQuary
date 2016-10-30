$(document).ready(function () {
    var repeat = true;
    var FREQ = 10000;

    function startAJAXcalls() { //会等待上一次操作完成后,再等待FREQ后才会执行
        if (repeat) {
            window.setTimeout(function () {
                getXMLRacers();
                startAJAXcalls();
            }, FREQ);
        }
    };
    
    getXMLRacers(); //开始的时候先取得一次值
    startAJAXcalls(); //然后开始计时10秒一次的刷新
    showFrequency();

    function getTime() {
        var a_p = "";
        var d = new Date();
        var curr_hour = d.getHours();
        (curr_hour < 12) ? a_p = "AM": a_p = "PM";
        (curr_hour == 0) ? curr_hour = 12: curr_hour = curr_hour;
        (curr_hour > 12) ? curr_hour = curr_hour - 12: curr_hour = curr_hour;
        var curr_min = d.getMinutes().toString();
        var curr_sec = d.getSeconds().toString();
        if (curr_min.length == 1) {
            curr_min = "0" + curr_min;
        }
        if (curr_sec.length == 1) {
            curr_sec = "0" + curr_sec;
        }
        $('#updatedTime').html(curr_hour + ":" + curr_min + ":" + curr_sec + " " + a_p);
    }

    function getXMLRacers() {
        //http://api.jquery.com/jQuery.ajax/
        $.ajax({
            url: "finishers.xml", //通过ajax获取数据的url,相对路径和绝对路径都可以
            cache: false
            , dataType: "xml"
            , success: function (xml) {
                $('#finishers_m').empty(); //清空不等于清除
                $('#finishers_f').empty();
                $('#finishers_all').empty();
                $(xml).find('runner').each(function () {
                    var info = '<li>Name:' + $(this).find('fname').text() + ' ' + $(this).find('lname').text() + '. Time:' + $(this).find('time').text() + '</li>';
                    if ($(this).find('gender').text() == 'm') {
                        $('#finishers_m').append(info); //append加入.如果用html则是替代
                    }
                    else if ($(this).find('gender').text() == 'f') {
                        $('#finishers_f').append(info);
                    }
                    $('#finishers_all').append(info);
                });
                getTimeAjax(); //getTimeAjax() 要放在localhost所在的文件夹才有效
            }
        });
    }

    function showFrequency() {
        $("#freq").html("Page refreshes every " + FREQ / 1000 + " second(s).");
    }

    function getTimeAjax() {
        $("#updatedTime").load("time.php");
    }
    
    $("#btnStop").click(function(){
        repeat = false;
        $("#freq").html("update paused");
    });
    $("#btnStart").click(function(){
        repeat = true;
        startAJAXcalls();
        showFrequency();
    });
});
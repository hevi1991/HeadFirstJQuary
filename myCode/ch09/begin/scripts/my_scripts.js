$(document).ready(function () {
    var FREQ = 10000;
    var repeat = true;

    function showFrequency() {
        $("#freq").html("Page refreshes every " + FREQ / 1000 + " second(s).");
    }

    function startAJAXcalls() {
        if (repeat) {
            setTimeout(function () {
                getDBRacers();
                startAJAXcalls();
            }, FREQ);
        }
    }
    
    function getDBRacers(){
        $.getJSON("service.php?action=getRunners",function(json){
            
            $('#finishers_m').empty();
            $('#finishers_f').empty();
            $('#finishers_all').empty();
            
            if(json.runners.length>0){
                $.each(json.runners,function(){
                    var info = '<li>Name: ' + this['fname'] + ' ' + this['lname'] + '. Time:' + this['time'] + '</li>';
                    if(this['gender'] == 'm'){
                        $('#finishers_m').append(info);
                    }else if(this['gender'] == 'f'){
                        $('#finishers_f').append(info);
                    }
                    $('#finishers_all').append(info);
                });
            }
            getTimeAjax();
        });
    }
    

    function getTimeAjax() {
        var time = "";
        $.ajax({
            url: "time.php"
            , cache: false
            , success: function (data) {
                $('#updatedTime').html(data);
            }
        });
    }
    
    $("#btnStop").click(function () {
        repeat = false;
        $("#freq").html("Updates paused.");
    });
    $("#btnStart").click(function () {
        repeat = true;
        startAJAXcalls();
        showFrequency();
    });
    showFrequency();
    getDBRacers();
    startAJAXcalls();
    
    
	$('#btnSave').click(function() {

		var data = $("#addRunner :input").serializeArray();
        
        //$("#addRunner").attr('action') 就是form的目标文件路径
		$.post($("#addRunner").attr('action'), data, function(json){
			
			if (json.status == "fail") {
				alert(json.message);
			}
			if (json.status == "success") {
				alert(json.message);
				clearInputs();
			}
            
            getDBRacers();
            
		}, "json");

	});	
    
    function clearInputs(){
        
        $('#addRunner input').each(function(){
            $(this).attr('value','');
        });
    }
    
    $('#addRunner').submit(function(){//让表单的submit不提交,用submit的button做别的事情,调用ajax异步刷新数据
        return false;
    });
    
});
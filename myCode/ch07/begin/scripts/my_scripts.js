$(document).ready(function(){
    
    //一,背景,闪电部分
    //开始的时候必须调用,否则不会启动定时器
    goLightning();
    
    window.onblur = stopLightning;
    window.onfocus = goLightning;
    
	var int1,int2,int3;
    function goLightning(){
        int1 = window.setInterval(function(){
            lightning_one();
        },4000);
        int2 = window.setInterval(function(){
            lightning_two();
        },5000);
        int3 = window.setInterval(function(){
            lightning_three();
        },7000); 
    }
    function stopLightning(){
        window.clearInterval(int1);
        window.clearInterval(int2);
        window.clearInterval(int3);
    }
    function lightning_one(){
        $("#container #lightning1").fadeIn(250).fadeOut(250);
    }
    function lightning_two(){
        $("#container #lightning2").fadeIn(250).fadeOut(250);
    }
    function lightning_three(){
        $("#container #lightning3").fadeIn(250).fadeOut(250);
    }
    
    //二,用户交互部分
    //代表第几副器官,0表第一张,head,eyes,nose,mouth
    var clix = [0,0,0,0];
    $("#head").click(function(){
        moveMe(0,this);
    });
    $("#eyes").click(function(){
        moveMe(1,this);
    });
    $("#nose").click(function(){
        moveMe(2,this);
    });
    $("#mouth").click(function(){
        moveMe(3,this);
    });

    function moveMe(i,obj){
        
        if(clix[i] < 9){
            $(obj).animate({left:"-=367px"},500);
            clix[i] = clix[i]+1;
        }else{
            clix[i] = 0;
            $(obj).animate({left:"0px"},500);
        }
    }
    
    //三,随机器官
    var w = 367;//器官图片长度
    var m = 10;//有几份部分器官
    
    $("#btnRandom").click(randomize);
    $("#btnReset").click(reset);
    
    function getRandom(num){
        var my_num = Math.floor((Math.random()*num));
        return my_num;
    }
    function randomize(){
        $(".face").each(function(index){
            //index,在该类里面按顺序器官位置
            var target_postion = getRandom(m);
            var current_position = clix[index];
            clix[index] = target_postion;
            
//            var move_to = (current_position - target_postion) * w; $(this).animate({left:"+="+move_to+"px"},500);
            
            var move_to = -(target_postion * w); $(this).animate({left:move_to+"px"},500);
            
        });
    }
    function reset(){
        $(".face").each(function(index){
            clix[index] = 0;
            $(this).animate({left:"0px"},500);
        });
    }
    
});//end doc.onready function

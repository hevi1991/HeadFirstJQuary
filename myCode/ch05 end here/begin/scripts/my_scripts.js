$(document).ready(function () {

    /*各个按钮的调用事件，第十次点击，返回第一张图片*/

    var headclix = 0;
    var eyesclix = 0;
    var noseclix = 0;
    var mouthclix = 0;

    $("#head").click(function () {
        if (headclix < 9) {
            $(this).animate({left:"-=367px"},200);
            headclix += 1;
        } else {
            $(this).animate({left:"0px"},200);
            headclix = 0;
        }
        console.log('head' + headclix);
    });

    $("#eyes").click(function () {
        if (eyesclix < 9) {
            $(this).animate({left:"-=367px"},200);
            eyesclix += 1;
        } else {
            $(this).animate({left:"0px"},200);
            eyesclix = 0;
        }
        console.log('eyes' + eyesclix);
    });

    $("#nose").click(function () {
        if (noseclix < 9) {
            $(this).animate({left:"-=367px"},200);
            noseclix += 1;
        } else {
            $(this).animate({left:"0px"},200);
            noseclix = 0;
        }
        console.log('nose' + noseclix);
    });

    $("#mouth").click(function () {
        if (mouthclix < 9) {
            $(this).animate({left:"-=367px"},200);
            mouthclix += 1;
        } else {
            $(this).animate({left:"0px"},200);
            mouthclix = 0;
        }
        console.log('mouth' + mouthclix);
    });


    /*背景闪电部分*/
    setInterval("lightning_one()",4000);
    setInterval("lightning_two()",5000);
    setInterval("lightning_three()",7000);
    
    //page 215
    
}); //end doc.onready function

function lightning_one() {
    $("#container #lightning1").fadeIn(250).fadeOut(250);
}

function lightning_two() {
    $("#container #lightning2").fadeIn("fast").fadeOut("fast");
}

function lightning_three() {
    $("#container #lightning3").fadeIn("fast").fadeOut("fast");
}

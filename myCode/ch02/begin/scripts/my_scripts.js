/*取随机数*/
function getRandom(num) {
    return Math.floor(Math.random() * num);
}

/*标记正确的p段落*/
var hideCode = function () {
    var numRand = getRandom(4);
    $(".guess_box").each(function (index, value) {
        if (numRand === index) {
            $(this).append("<span id='has_discount'></span>");

            return false;
        };
        return true;
    });
}

/*验证是否选对了，选对才有奖*/
function checkForCode() {

    var discount;
    
    if ($.contains(this, document.getElementById("has_discount"))) {
        
        var my_num = getRandom(100);
        discount = "<p>Your CODE: CODE" + my_num + "</p>";
    } else {
        discount = "<p>Sorry, no discount this time!</p>";
    }
    
    /*遍历所有.guess_box 遇到包含has_discountId的元素，添加进.discount，否则进入.no_discount*/
    $(".guess_box").each(function(){
        if($.contains(this, document.getElementById("has_discount"))){
            $(this).addClass("discount");
        }else{
            $(this).addClass("no_discount");
        }
    });
    
    $("#result").append(discount);

    //$(".guess_box").unbind("click");//与下行代码效果相同。
    $(".guess_box").each(function () {
        $(this).unbind("click");
    });
}


$(document).ready(function () {
    hideCode();
    $(".guess_box").click(checkForCode);

    /*当鼠标滑过时，添加进my_hover得类中，离开时移除出my_hover类*/
    $(".guess_box").hover(
        function () {
            $(this).addClass("my_hover");
        },
        function () {
            $(this).removeClass("my_hover");
        }
    )
});

$(document).ready(function () {
    function Card(name, suit, value) {
        this.name = name;
        this.suit = suit;
        this.value = value;
    }
    //Ace-11,Jack-10,Queen-10,King-10.Spades黑桃,Clubs梅花,Diamonds方块,Hearts红桃
    var suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    var names = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
    var cards = new Array();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 13; j++) {
            var card = new Card(names[j], suits[i], j + 1 > 10 ? 10 : j + 1);
            cards[cards.length] = card;
        }
    }
    
    var user_cards = new Array();//用户有的卡
    
    //手上有的卡
    var hand = {
            cards: new Array()
            , current_total: 0
            , sumCardTotal: function () { //计算总点数
                this.current_total = 0;
                for (var i = 0; i < this.cards.length; i++) {
                    var c = this.cards[i];
                    this.current_total += c.value;
                }
                
                $("#hdrTotal").html("Total: " + this.current_total);
                
                if (this.current_total > 21) {
                    $("#btnStick").trigger("click");
                    $("#imgResult").attr('src', 'images/x2.png');
                    $("#hdrResult").html("BUST!").attr('class', 'lose');
                }
                else if (this.current_total == 21) {
                    $("#btnStick").trigger("click");
                    $("#imgResult").attr('src', 'images/check.png');
                    $("#hdrResult").html("BlackJack!").attr('class', 'win');
                }
                else if (this.current_total <= 21 && this.cards.length == 5) {
                    $("#btnStick").trigger("click");
                    $("#imgResult").attr('src', 'images/check.png');
                    $("#hdrResult").html("BlackJack - 5 card trick!").attr('class', 'win');
                }
                else {}
            }
        }
    
    
    //点击按钮事件
    $("#btnDeal").click(function () {
        deal();
        $(this).toggle(); //隐藏的开关
        $("#btnHit").toggle();
        $("#btnStick").toggle();//结束这个游戏
    });
    $("#btnHit").click(function () {
        hit();
    });
    function end() {
        $("#btnHit").toggle();
        $("#btnStick").toggle();
        $("#btnRestart").toggle();
    }
    $("#btnStick").click(function () {
        $("#hdrResult").html('Stick!').attr('class', 'win');
        $("#result").toggle();
        end();
    });
    $("#btnRestart").click(function () {//重新开始
        $("#result").toggle();
        $(this).toggle();
        $("#my_hand").empty();//清空my_hand内的所有标签
        $("#hdrResult").html('');
        $("#imgResult").attr('src', 'images/check.png');
        user_cards.length = 0;
        hand.cards.length = 0;
        hand.current_total = 0;
        $("#btnDeal").toggle().trigger('click');//trigger触发btnDeal按钮事件
    });
    
    
    //开局抽俩
    function deal() {
        for (var i = 0; i < 2; i++) {
            hit();
        }
    }
    //抽卡
    function hit() {
        var good_card = false;
        var chance = 0;
        do {
            chance++;
            var index = getRandom(52);
            if ($.inArray(index, user_cards) == -1) {
                good_card = true;
                var c = cards[index];
                user_cards[user_cards.length] = index;
                hand.cards[hand.cards.length] = c;
                var $d = $("<div>"); $d.addClass("current_hand").appendTo("#my_hand");
                //.attr为该标签增加属性
                $("<img>").attr('alt', c.name + ' of ' + c.suit).attr('title', c.name + ' of ' + c.suit).attr('src', 'images/cards/' + c.suit + '/' + c.name + '.jpg').appendTo($d).fadeOut('slow').fadeIn('slow');
            }
        } while (good_card == false);
        good_card = false;
        hand.sumCardTotal();
        
    }
    //取随机数
    function getRandom(num) {
        var my_num = Math.floor(Math.random() * num);
        return my_num;
    }
});
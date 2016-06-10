function getEle(ele){
    return document.querySelector(ele);
}
var main=getEle("#main");
var winW = window.innerWidth;
var winH = window.innerHeight;

/*设备的高*/
var desW = 640;
/*设计稿的宽*/
var desH = 1008;

/*设计稿的高*/
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
~function(){
    function fnLoad(){
        var arr=['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png', 'phoneBtn.png', 'phoneKey.png', 'messageText.png'];
        var loading=getEle("#loading");
        var process=getEle(".process"), phoneHead=document.getElementById("phoneHead");
        var n = 0;//用来记录加载完图片的个数
        arr.forEach(function(){
            var oImg = new Image();
            oImg.src ="images/"+arguments[0];
            oImg.onload = function(){
                n++;
                process.style.width = n/arr.length*100+"%";
                process.addEventListener("webkitTransitionEnd",function(){
                    this.style.webkitTransition = "";
                },false);
                if(n==arr.length&&loading){
                    window.setTimeout(function(){
                        main.removeChild(loading);
                        fnPhone.init();
                      $(phoneHead).addClass("animated rubberBand");
                        window.setTimeout(function () {
                            musicBefore.play();
                            bell.play();
                        },500);
                    },1000);
                }
            }
        })
    }
    fnLoad();

    var sound = document.getElementById("sound");
    var bell=getEle("#bell"),say=getEle("#say"),music=getEle("#music"),musicBefore=getEle("#musicBefore");
    var phone = getEle("#phone");
    var speak = getEle(".speak");

    var fnPhone = {
        init : function(){
            phone.addEventListener("click",this.touch,false);
        },
        touch : function(e){
            var target = e.target;

            bell.pause();
            music.play();
            musicBefore.pause();

            target.parentNode.style.display = "none";
            speak.style.webkitTransform = "translate(0,0)";
            phone.style.webkitTransform = "translate(0,"+desH+"px)";
            phone.style.webkitTransition = "1s";
            window.setTimeout(function(){
                main.removeChild(phone);
                bell.pause();
                musicBefore.pause();
                music.play();
                message();
            },1000)
        }
    };

    var cubeBox = getEle("#cubeBox");
    var cube=document.getElementById("cube");
    var resume=getEle("#resume");
    var left=document.getElementById("left");
    function message() {
        var message = getEle("#message");
        var timer = window.setInterval(function () {
            left.style.opacity = 1;
            left.style.webkitTransform = "translate(0,0)";
        });
        var img1=document.getElementById("img1");
        $(img1).addClass("animated flipInX");
        window.setTimeout(function(){
            window.clearTimeout(timer);
            main.removeChild(message);
            fnCube();
            window.setTimeout(function(){
                main.removeChild(cube);
                resumeFn();
            },6000)
        },6000)


    }

}();


var cubeBox = getEle("#cubeBox");
var cube=document.getElementById("cube");
var resume=getEle("#resume");
var oLis=document.querySelectorAll("#resume>ul>li");
function resumeFn(){
    var $one= $("#one");
    var $p=$one.find("p");
    $("p:nth-child(even)").addClass("animated fadeInLeft");
    $("p:nth-child(odd)").addClass("animated fadeInRight");

    var $two= $("#two");
    $two.children("div").addClass("animated fadeInUp");

    var $three= $("#three");
    $three.children("div").addClass("animated bounceInLeft");

    var $four= $("#four");
    $four.children("div").addClass("animated zoomIn");

    var $five= $("#five");
    $five.children("div").addClass("animated bounceInDown");


    [].forEach.call(oLis, function () {
        var oLi = arguments[0];
        oLi.index = arguments[1];
        oLi.addEventListener("touchstart", start, false);
        oLi.addEventListener("touchmove", move, false);
        oLi.addEventListener("touchend", end, false);

    });
    function start(e) {
        this.startY = e.changedTouches[0].pageY;

    }
    function move(e) {
        this.flag = true;//如果是点击不是滑动,不会触发touchmove事件
        e.preventDefault();
        var moveY = e.changedTouches[0].pageY;
        var movePos = moveY - this.startY;
        var index = this.index;
        [].forEach.call(oLis,function(){
            if(arguments[1]!=index){//除了自已,所有的li都隐藏
                arguments[0].style.display = "none";
            }
            arguments[0].className = "";//把所有li的类名清空
            arguments[0].firstElementChild.id = "";//滑动时把li下的第一个子元素的id名清空
        });
        if (movePos > 0) {/*下滑*/
            this.prevsIndex = index == oLis.length - 1 ? 0 : index + 1;
            var duration = -winH + movePos;//winH是自己随便设置的,可以写480都行
        } else if (movePos < 0) {/*上滑*/
            this.prevsIndex = index == 0 ? oLis.length - 1 : index - 1;
            duration = winH + movePos;
        }
        oLis[this.prevsIndex].style.display  ="block";
        oLis[this.prevsIndex].className = "zIndex";
        oLis[this.prevsIndex].style.webkitTransform = "translate(0," + duration + "px)";
        //处理当前这一张
        //缩放的倍数 = 1- 移动的距离/设备的高度
        oLis[index].style.webkitTransform = "scale("+(1-Math.abs(movePos)/winH*1/2)+") translate(0,"+movePos+"px)";

    }
    function end(e) {
        if(this.flag){
            //回到原始点的位置
            oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
            oLis[this.prevsIndex].style.webkitTransition = "0.7s";
            oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(){
                this.style.webkitTransition = " ";//相当于清除动画的积累
                this.firstElementChild.id = "a"+this.index;
            });
            this.flag = false;

        }

    }
}

    function fnCube(){
        cubeBox.style.webkitTransform = "scale(0.7) rotateX(-135deg) rotateY(-165deg)";
        //滑动的距离就是魔方转动的角度
        var startX = -135; /*记录初始X轴滑动的距离*/
        var startY = -145;/*记录初始y轴滑动的距离*/
        var x = null;/*记录x轴移动的距离*/
        var y = null;/*记录y轴移动的距离*/
        document.addEventListener("touchstart",start,false);
        document.addEventListener("touchmove",move,false);
        document.addEventListener("touchend",end,false);

        function start(e){
            this.startTouch = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            }
        }
        function move(e){
            this.flag = true;
            e.preventDefault();
            var moveTouch = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };
            x = moveTouch.x-this.startTouch.x;
            y = moveTouch.y-this.startTouch.y;
            cubeBox.style.webkitTransform = "scale(0.8) rotateX("+(-startY-y)+"deg) rotateY("+(-startX-x)+"deg)";
        }
        function end(e){
            if(this.flag) {
                //重新初始化起始的值
                startX += x;
                startY += y;
                this.flag = false;
            }
        }
    }










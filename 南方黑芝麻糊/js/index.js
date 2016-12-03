


//首页图片加载
var arrBgName = ["win-center.png","over-bg.png","01-bg.png","TW-bg.png",'A.png','B.png','C.png','D.png','T.png','F.png'];
var arrBg = [];

for(var i=0;i<arrBgName.length;i++){
	var newImg2 = new Image();
	newImg2.onload = function(){}
	newImg2.src = "img/"+arrBgName[i];
}
//问题图片预加载
var arrQuestionImgName =['pic1.png','pic2.png','pic3.png','pic4.png','pic5.png','pic6.png','pic7.png','pic8.png','pic9.png','pic10.png','pic11.png','pic12.png','pic13.png','pic14.png','pic15.png','pic16.png','pic17.png','pic18.png','pic19.png','pic20.png','pic21.png','pic22.png','pic23.png','pic24.png','pic25.png','pic26.png','pic27.png','pic28.png','pic29.png','pic30.png'];
var arrQuestionImg = [];

var numImg = 0;
var loodings = 0;
for(var i=0;i<arrQuestionImgName.length;i++){
	var newImg = new Image();
	arrQuestionImg.push(newImg);
	newImg.onload = function(){
		numImg++;
		loodings = parseInt(numImg/arrQuestionImgName.length*100);
//		console.log(loodings);
		$("#loodings").html(loodings);
		$(".looding-strip").css("width",loodings+"%")
		if(loodings==100){
			$(".looding").css("display","none");
			$(".star-wrap").css("display","block");//测试关闭
		}
	}
	newImg.src = "img/"+arrQuestionImgName[i];
}
//点击进入答题界面
$(".star-go").on("click",function(){
//$(".que-name-wrap").on("click",function(){//测试时使用
	
	$(".star-wrap").css("display","none");
	$(".Tw-que-wrap").css("display","block");
	//写入第一题
	writeBrand();
	for(var i=0;i<4;i++){
		$(".option li")[i].addEventListener("touchstart",ToR,false);
		$(".option li")[i].index = i;
	}
})

//产生10个题目
var q = {
	arrS1:[],
	arrS2:[],
	TF:0,
	No:1,
	S1:0,
	S2:-1,
	fen:0,
	cj:1,
	Q:1,//判断题目选择类别
	Dt:true//禁止多次触发标志
}
//suiji
q.arrS1 = getRArr(0,8,3);
q.arrS2 = getRArr(0,20,7);

//写入答题框Brand

function writeBrand(){
	
	console.log(q.arrS1);
	if(q.S1<q.arrS1.length){
			//写入题目
		$(".que-name").html(questionList.brand[q.arrS1[q.S1]].question);
			//写入图片
		$(".que-image").html("");
		$(".que-image").append(arrQuestionImg[questionList.brand[q.arrS1[q.S1]].icon-1]);
		for (var i=0;i<4;i++) {
			//写入答案
			$(".option li span").eq(i).html(questionList.brand[q.arrS1[q.S1]].answer[i][0]);
		}
	}else if(q.S1>=q.arrS1.length){
		//开始加载西游的题目
		writeXiyou();
		
	}
	console.log("span字数："+$(".option li span")[0].innerHTML.length);
}

//写入答题框xiyou
function writeXiyou(){
	console.log(q.arrS2);
		//写入题目
	$(".que-name").html(questionList.xiyou[q.arrS2[q.S2]].question)
	//写入图片
		$(".que-image").html("");
		$(".que-image").append(arrQuestionImg[questionList.xiyou[q.arrS2[q.S2]].icon-1]);
	for (var i=0;i<4;i++) {
		//写入答案
		$(".option li span").eq(i).html(questionList.xiyou[q.arrS2[q.S2]].answer[i][0]);
	}
}

var indexs;
//判断有没有选择正确
function ToR(e){
	var e=e||window.event;
	e.preventDefault();
	if(q.Dt==true){
		q.Dt=false;
		
		console.log(this.index);
		indexs = this.index;//this不能带入到函数里
		if(q.Q==1){
			q.TF=questionList.brand[q.arrS1[q.S1]].answer[this.index][1];
			change();
		}else if(q.Q==2){	
			q.TF=questionList.xiyou[q.arrS2[q.S2]].answer[this.index][1];
			change();
		}
		$(".option li div").eq(this.index).css("display","block");
		//判断之后再增加题目刷新下标,否则答案下标是下一题
				q.S1++;
				if(q.S1>=q.arrS1.length){
					q.Q=2;//标志位
					q.S2++;
				}
		//显示结果之后0.3S进入下一题,答题结束之后关闭
		setTimeout(function(){
			$(".option li div").css("display","none");
			q.No++;
			$(".que-No").html(q.No);
			q.Dt=true;
			if(q.S2<q.arrS2.length){
				writeBrand();
				
			}else{
				$(".Tw-que-wrap").css("display","none");
				$(".gameover-wrap").css("display","block");
				if(q.fen>=8){
					$(".win").css("display","block");
					$(".win p .endFen").html(q.fen);
				}else{
					$(".lose").css("display","block");
					$(".lose p .endFen").html(q.fen);
				}
			}
		},900);
	}
}

//积分和更换ToF
function change(){
	if(q.TF==1){
		q.fen++;
		console.log(q.fen);
		$(".option li div").eq(indexs).css("background-image","url(img/T.png)");
	}else{
		$(".option li div").eq(indexs).css("background-image","url(img/F.png)");
	}
}

//再来一次
$(".btn-recur").on("click",function(){
	q.arrS1=[];
	q.arrS2=[];
	q.TF=0;
	q.S1 =0;
	q.S2 =-1;
	q.Q=1;
	q.Dt=true;
	q.fen=0;
	q.No=1;
	$(".que-No").html(q.No);
	q.arrS1 = getRArr(0,8,3);
	q.arrS2 = getRArr(0,20,7);
	$(".gameover-wrap").css("display","none");
	$(".Tw-que-wrap").css("display","block");
	$(".win-money").css("display","none");
	$(".message-wrap").css("display","none");
	$(".win").css("display","none");
	$(".lose").css("display","none");
	//写入第一题
	writeBrand();
})

//点击抽奖
$(".btn-CJ").on("click",function(){
	$(".win").css("display","none");
	
	q.cj=Math.round(Math.random()*(10-1)+1);
	console.log(q.cj);
	if(q.cj<2){
		$(".win-money").css("display","block");
		$(".win-5").css("display","block");
	}else if(q.cj>=2&&q.cj<9){
		$(".win-money").css("display","block");
		$(".win-15").css("display","block");
	}else if(q.cj>=9){
		$(".win-money").css("display","none");
		$(".message-wrap").css("display","block");
	}
})




//随机数
//不重复随机数
function getRArr(min,max,leg){
	leg=max-min+1<leg?max-min+1:leg;
	var arr = [];
	while(arr.length<leg){
		var r = Math.round(Math.random()*(max-min)+min);
		for(var i=0;i<arr.length;i++){
			if(r==arr[i]){
				break;
			}
		}
		if(i==arr.length){
			arr.push(r);
		}
	}
	return arr;
}


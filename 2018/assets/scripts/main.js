//手機menu相關
$(".m-menu-opener").on("click", function() {
	$(".menu").toggleClass('active');
	$(".black-screen").toggleClass('active');
	$(".m-menu-opener").toggleClass('close');
})

$(".menu-btn,.black-screen").on("click", function() {
	$(".menu").removeClass('active');
	$(".black-screen").removeClass('active');
	$(".m-menu-opener").removeClass('close');
})

//firefox bug
$(window).on("load resize", function(){
	if($("header").height()==100) {
		$("#landing .title-logo").width($("#landing .empty").width());
	} else {
		$("#landing .title-logo").width("");
	}
})

//landing bg light

if($(".mask")[0].complete) {
	$("#landing .light").addClass('active');
}
$(".mask").on("load", function(){
	$("#landing .light").addClass('active');
})


//glitch
var frequency = 5;
var glitchCount = 0;
function glitch() {
	requestAnimationFrame(glitch);
	glitchCount++;
	if(glitchCount == frequency) {
		if(Math.random() < 0.1) {
			var ran = Math.round(Math.random()*4);
			$(".glitch").removeClass('active');
			$("#logo"+ran).addClass('active');
		} else {
			$(".glitch").removeClass('active');
			$("#logo0").addClass('active');
		}
		glitchCount = 0;
	}
}
glitch();

//scrollmagic init
var controller = new ScrollMagic.Controller();

//header sticky
var sectionHeight = $("#landing").height() - ($("header").height()==100?100:0);
var sceneHeader = new ScrollMagic.Scene({triggerElement: "#landing", duration: sectionHeight, triggerHook: 0})
.setClassToggle("header", "atLanding")
.addTo(controller);
$(window).on("resize", function(){
	sectionHeight = $("#landing").height() - ($("header").height()==100?100:0);
	sceneHeader.remove();
	sceneHeader = new ScrollMagic.Scene({triggerElement: "#landing", duration: sectionHeight, triggerHook: 0})
	.setClassToggle("header", "atLanding")
	.addTo(controller);
})

//導航列位置指示
var sections = [$("#description"),$("#intro"),$("#program"),$("#registration"),$("#taichi"),$("#crew"),$("#organizer")];

for(i=0; i<sections.length; i++) {
	var sectionId = sections[i].attr("id");
	var sectionHeight = sections[i].outerHeight();
	var scene = new ScrollMagic.Scene({triggerElement: "#"+sectionId, duration: sectionHeight, triggerHook: 0.5})
	.setClassToggle("#menu"+i, "menu-here")
	.addTo(controller);
}


//section animate

//description
var scene1 = new ScrollMagic.Scene({triggerElement: "#description",triggerHook: 0.5,reverse: false});
scene1.addTo(controller);
scene1.on("enter", scene1Enter);

function scene1Enter(event) {
	var tl = new TimelineMax({repeat:0});
	tl.to($("#description .descript-left p"), 1, {className:"+=colorAnimate"});
	tl.to($("#description .descript-content p.a1"), 0.5, {className:"+=colorAnimate"});
	tl.to($("#description .descript-content p.a2"), 0.5, {className:"+=colorAnimate"});
}

//intro
var scene2 = new ScrollMagic.Scene({triggerElement: "#intro",triggerHook: 0.5,reverse: false});
scene2.addTo(controller);
scene2.on("enter", scene2Enter);

function scene2Enter(event) {
	var tl = new TimelineMax({repeat:0});
	tl.to($("#intro .video-frame"), 1, {opacity:1});
	tl.staggerTo($("#intro .title"), 1, {className:"+=colorAnimate"},0.5,"+0");
	tl.staggerTo($("#intro .content"), 1, {className:"+=colorAnimate"},0.5,"+0");
}

//program
var scene3 = new ScrollMagic.Scene({triggerElement: "#program",triggerHook: 0.5,reverse: false});
scene3.addTo(controller);
scene3.on("enter", scene3Enter);

function scene3Enter(event) {
	var tl = new TimelineMax({repeat:0});
	tl.staggerFromTo($("#program .tabs .tab"), 0.5, {y:-50,opacity:0},{y:0,opacity:1},0.2);
	tl.fromTo($("#program .program-content.active .program-img"), 0.5, {x:-30,opacity:0},{x:0,opacity:1});
	tl.to($("#program .program-content.active .schedule-title p"), 0.2, {className:"+=colorAnimate"});
	tl.staggerTo($("#program .program-content.active .schedule-content p"), 1, {className:"+=colorAnimate"},0.05);
}

//registration
var scene4 = new ScrollMagic.Scene({triggerElement: "#registration",triggerHook: 0.5,reverse: false});
scene4.addTo(controller);
scene4.on("enter", scene4Enter);

function scene4Enter(event) {
	var tl = new TimelineMax({repeat:0});
	tl.to($("#registration .registration-title"), 0.5, {className:"+=colorAnimate"});
	tl.staggerFromTo($("#registration .step"), 0.5, {x:-30,opacity:0},{x:0,opacity:1},0.3);
}

//taichi
var scene5 = new ScrollMagic.Scene({triggerElement: "#taichi",triggerHook: 0.5,reverse: false});
scene5.addTo(controller);
scene5.on("enter", scene5Enter);

function scene5Enter(event) {
	var tl = new TimelineMax({repeat:0});
	tl.to($("#taichi .section-right,#taichi .breakpoint-block"), 0.5, {opacity:1},"+0");
	tl.staggerTo($("#taichi .title,#taichi p"), 0.5, {className:"+=colorAnimate"},0.3,"+0");
}

//crew
var scene6 = new ScrollMagic.Scene({triggerElement: "#crew",triggerHook: 0.5,reverse: false});
scene6.addTo(controller);
scene6.on("enter", scene6Enter);

function scene6Enter(event) {
	var tl = new TimelineMax({repeat:0});
	tl.to($("#crew .crew-title"), 0.5, {className:"+=colorAnimate"});
	tl.fromTo($("#crew .crew-content,#crew .crew-button"), 0.5, {x:-30,opacity:0},{x:0,opacity:1});
}

//organizer
var scene7 = new ScrollMagic.Scene({triggerElement: "#organizer",triggerHook: 0.5,reverse: false});
scene7.addTo(controller);
scene7.on("enter", scene7Enter);

function scene7Enter(event) {
	var tl = new TimelineMax({repeat:0});
	tl.to($("#organizer .og-section-title"), 0.8, {className:"+=colorAnimate"});
	tl.fromTo($("#organizer .logo-block, #organizer .logo-small"), 0.5, {x:-10,opacity:0},{x:0,opacity:1});
}

//contact
var scene8 = new ScrollMagic.Scene({triggerElement: "#contact",triggerHook: 0.8,reverse: false});
scene8.addTo(controller);
scene8.on("enter", scene8Enter);

function scene8Enter(event) {
	var tl = new TimelineMax({repeat:0});
	tl.fromTo($("#contact .section-wrapper"), 1, {y:20,opacity:0},{y:0,opacity:1});
}



//過場標準字動畫
var tl = new TimelineMax({repeat:0});
tl.fromTo($("#interlude .moving"), 1, {x:0}, {x:-1000, ease:Linear.easeNone}, 0);
var sceneInterlude = new ScrollMagic.Scene({
		triggerElement: "#interlude",
		duration: 1500,
		triggerHook: 1
});
sceneInterlude.setTween(tl);
sceneInterlude.addTo(controller);


//taichi 動畫
var stickyOffset = $(window).innerHeight()/2 - $("#taichi .fixed").height()/2;
var upTrigger = $("#taichi .section-left").offset().top - stickyOffset;
var downTrigger = $("#taichi .section-left").offset().top + $("#taichi .section-left").height() - ($(window).innerHeight()/2 + $("#taichi .fixed").height()/2);
$(window).on("resize",function(){
	stickyOffset = $(window).innerHeight()/2 - $("#taichi .fixed").height()/2;
	upTrigger = $("#taichi .section-left").offset().top - stickyOffset;
	downTrigger = $("#taichi .section-left").offset().top + $("#taichi .section-left").height() - ($(window).innerHeight()/2 + $("#taichi .fixed").height()/2);
})

$(window).on("scroll",function(){
	var scrolltop = $(window).scrollTop();
	
	//上緣判斷
	if(scrolltop >= upTrigger) {
		$("#taichi .fixed").addClass('sticky');
	} else if(scrolltop < upTrigger) {
		$("#taichi .fixed").removeClass('sticky');
	}

	//下緣判斷
	if(scrolltop >= downTrigger) {
		//要留下了
		$("#taichi .fixed").addClass('stay');
	} else if(scrolltop < downTrigger) {
		//回來了
		$("#taichi .fixed").removeClass('stay');
	}
})

//smooth scroll
var isScrolling = false;
//滾動偏移量
// var scrollOffset = $("header").height();
$(function() {
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
			  	ga('send', 'event','menu','click', 'menu_'+$(this).attr('href').substring(1));
				isScrolling = true;// 確保animate就算先做執行 也不會做完ga
				$('html, body').animate({
				scrollTop: target.offset().top - ($("header").height()==100?100:0)
				}, 400, function(){
					setTimeout(function(){
						isScrolling = false;
					},100);
	        	});
				return false;
			}
		}
	});
});

//ga
var section_arr = [$("#landing"), $("#description"), $("#intro"), $("#program"), $("#registration"), $("#taichi"), $("#crew"), $("#organizer"), $("#contact")];
var nowSectionID = 999;
// any number!=0 1 2 3 4 (array)

$(window).on("scroll", scrollHandler);

function scrollHandler() {
	if( isScrolling == true ) return;//避免同一個section因快速來回滾動計算多次 true會直接離開

	var nowScrollTop = $(window).scrollTop();
	// var wh = $(window).height();
	for( var i=section_arr.length-1; i>=0; i-- ) {
    	if( nowScrollTop + $(window).height() >= section_arr[i].offset().top + 100) {
      		if( nowSectionID !== i ) {
        		ga('send', 'pageview', 'page_'+section_arr[i].attr("id") );
        		nowSectionID = i;
      		}
      		break;
    	}
  	}
}

$("#sign-up").on("click",function(){
	$(".lightbox").addClass('active');
	var tl = new TimelineMax({repeat:0});
	tl.fromTo($(".lightbox .info"), 0.5, {x:-30,opacity:0},{x:-30,opacity:0});
	tl.fromTo($(".lightbox .info"), 0.5, {x:-30,opacity:0},{x:0,opacity:1});
	tl.fromTo($(".lightbox .list:nth-child(2) .title"), 0.5, {x:-30,opacity:0},{x:0,opacity:1});
	tl.fromTo($(".lightbox .list:nth-child(2) .content"), 0.5, {x:-30,opacity:0},{x:0,opacity:1});
	tl.fromTo($(".lightbox .list:nth-child(3) .title"), 0.5, {x:-30,opacity:0},{x:0,opacity:1});
	tl.fromTo($(".lightbox .list:nth-child(3) .content"), 0.5, {x:-30,opacity:0},{x:0,opacity:1});
})

$(".lightbox .close").on("click",function(){
	$(".lightbox").removeClass('active');
	
})

//steps accordion
var stepOpenTime = 500;
var isStepChanging = false;
$(".step-header").on("click", function(argument) {
	if(!isStepChanging) {
		if($(this).parents(".step-container").hasClass('active')) {
			toggleAccordion($(".step-container.active"));
		} else {
			toggleAccordion($(".step-container.active"));
			toggleAccordion($(this).parents(".step-container"));
		}	
	}
})

function toggleAccordion(container) {
	// var container = $(this).parents(".step-container");
	var wrapper = container.find('.step-content-wrapper');
	var content = container.find('.step-content');
	
	var contentHeight = content.height() + 40;

	isStepChanging = true;
	if(container.hasClass('active')) {
		wrapper.animate({"height":"0"}, stepOpenTime, "linear", function(){
			isStepChanging = false;
		});
	} else {
		wrapper.animate({"height":contentHeight+"px"}, stepOpenTime, "linear", function(){
			isStepChanging = false;
		});
	}
	container.toggleClass('active');
}


//program tabs
$("#program .tab").on("click", function(){
	if($(this).hasClass('active')) return;
	var index = $(this).data("index");
	$("#program .tab").removeClass('active');
	$(this).addClass('active');
	$(".program-content").removeClass('active');
	setTimeout(function(){
		$(".program-content[data-index="+index+"]").addClass('active');
		tabAnimate();
	},500);
	
})

function tabAnimate(){
	var tl = new TimelineMax({repeat:0});
	tl.fromTo($("#program .program-content.active .program-img"), 0.5, {x:-30,opacity:0},{x:0,opacity:1});
	tl.to($("#program .program-content.active .schedule-title p"), 0.2, {className:"+=colorAnimate"});
	tl.staggerTo($("#program .program-content.active .schedule-content p"), 1, {className:"+=colorAnimate"},0.05);
}

//intro section
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('our-video', {
		videoId: '9Nyb16IrJQM', //Youtube 影片ID
		playerVars: { 'autoplay': 0, 'controls': 1,'showinfo':0,'rel':0,'modestbranding':0,'loop':1}
	});
}

function detect_at_video_now() {
    if( ($(this).scrollTop() >= $('#intro').position().top - 300) && ($(this).scrollTop() <= $('#interlude').position().top - 300 ) ){
		player.mute();
		player.playVideo();
		$(document).off("scroll", detect_at_video_now);
	}
}

$(document).on('scroll', detect_at_video_now);

//crew section
var crew = 0;
var block_list = $("#crew-slide-id").children();
var block_list_length = block_list.length;

// for button
var button_left_able = 0;
var button_right_able = 1;

// variable for block of more than one line
var variable_for_tech_studio = 0;
var tech_studio_right_div = $(block_list[6]).children(".crew-content-block-right")[0];
var tech_studio_right_div_width = $(tech_studio_right_div).width();

var variable_for_TA_team_design = 0;
var TA_team_design_first_right_div = $(block_list[22]).children(".crew-content-block-right")[0];
var TA_team_design_first_right_div_width = $(TA_team_design_first_right_div).width();
var TA_team_design_second_right_div = $(block_list[22]).children(".crew-content-block-right2")[0];
var TA_team_design_second_right_div_width = $(TA_team_design_second_right_div).width();

var variable_for_TA_team_tech = 0;
var TA_team_tech_first_right_div = $(block_list[24]).children(".crew-content-block-right")[0];
var TA_team_tech_first_right_div_width = $(TA_team_tech_first_right_div).width();
var TA_team_tech_second_right_div = $(block_list[24]).children(".crew-content-block-right2")[0];
var TA_team_tech_second_right_div_width = $(TA_team_tech_second_right_div).width();

$("#button-crew-left").click(function(){

	// console.log("from:" + crew);
	var document_width = $(document).width();

	//如果是最左了，則不進行任何動作
	if(crew == 0){ return; }
	
	//上面沒被return的話，就表示可以滑了，所以右按鈕開啟
	$("#button-crew-right").css("opacity","1");
	button_right_able = 1;

	// //判斷是TA_team_tech的時候
	if( variable_for_TA_team_tech == 2 && crew == 24){
		$(TA_team_tech_second_right_div).animate({left: 0,width: TA_team_tech_second_right_div_width,marginLeft: '+=130px'},500);
		variable_for_TA_team_tech = 1;
		return;
	}
	if( variable_for_TA_team_tech == 1 && crew == 24){
		$(TA_team_tech_first_right_div).animate({left: 0,width: TA_team_tech_first_right_div_width,marginLeft: '+=130px'},500);
		variable_for_TA_team_tech = 0;
		return;
	}
	// //判斷是TA_team_design的時候
	if( variable_for_TA_team_design == 2 && crew == 22){
		$(TA_team_design_second_right_div).animate({left: 0,width: TA_team_design_second_right_div_width,marginLeft: '+=130px'},500);
		variable_for_TA_team_design = 1;
		return;
	}
	if( variable_for_TA_team_design == 1 && crew == 22){
		$(TA_team_design_first_right_div).animate({left: 0,width: TA_team_design_first_right_div_width,marginLeft: '+=130px'},500);
		variable_for_TA_team_design = 0;
		return;
	}
	// //判斷是tech的時候
	if( variable_for_tech_studio == 1 && crew == 6){
		$(tech_studio_right_div).animate({left: 0,width: tech_studio_right_div_width,marginLeft: '+=130px'},500);
		variable_for_tech_studio = 0;
		return;
	}
	
	// console.log(crew);
	if(document_width > 1150 && crew == 24){
		crew = 	crew - 2;
	}
	else if(document_width > 1150 && crew == 22){
		crew = 	crew - 6;
	}
	else if(document_width > 1150 && crew == 10){
		crew = 	crew - 4;
	}
	else if(document_width > 1150){
		crew = 	crew - 6;
	}
	else{
		crew = crew - 2;
	}
	
	//計算位移的大小（crew-content-block & empty-block & 5)
	var total_size_need_to_slide = 0;
	for(var i=0;i<crew;i++) {
		total_size_need_to_slide += $(block_list[i]).width() + 6;
	}

	//do scroll
	$(".slide-block").css("left",-total_size_need_to_slide+"px");
	
	//如果是最左了，就讓左按鈕暗
	if(crew == 0){ 
		$("#button-crew-left").css("opacity","0.6");
		$("#button-crew-left").attr("src","assets/images/crew-section/icon-left.svg");
		button_left_able = 0;
	}
});

$("#button-crew-right").click(function(){	

	// console.log("from:" + crew);
	var document_width = $(document).width();

	//如果是最左了，則不進行任何動作
	if(document_width <  1060 && crew == 24 && variable_for_TA_team_tech == 2){ return; }
	if(document_width >= 1060 && crew == 24){ return; }

	//上面沒被return的話，就表示可以滑了，所以右按鈕開啟
	$("#button-crew-left").css("opacity","1");
	button_left_able = 1;

	// //判斷是tech-studio的時候
	if( document_width < 630 && variable_for_tech_studio == 0 && crew == 6){
		$(tech_studio_right_div).animate({left: -tech_studio_right_div_width,width: 0,marginLeft: '-=130px'},500);
		variable_for_tech_studio = 1;
		return;
	}
	// //判斷是TA_team_design的時候
	if( document_width < 1060 && variable_for_TA_team_design == 0 && crew == 22){
		$(TA_team_design_first_right_div).animate({left: -TA_team_design_first_right_div_width,width: 0,marginLeft: '-=130px'},500);
		variable_for_TA_team_design = 1;
		return;
	}
	if( document_width < 1060 && variable_for_TA_team_design == 1 && crew == 22){
		$(TA_team_design_second_right_div).animate({left: -TA_team_design_second_right_div_width,width: 0,marginLeft: '-=130px'},500);
		variable_for_TA_team_design = 2;
		return;
	}
	// //判斷是TA_team_tech的時候
	if( document_width < 1060 && variable_for_TA_team_tech == 0 && crew == 24){
		$(TA_team_tech_first_right_div).animate({left: -TA_team_tech_first_right_div_width,width: 0,marginLeft: '-=130px'},500);
		variable_for_TA_team_tech = 1;
		return;
	}
	if( document_width < 1060 && variable_for_TA_team_tech == 1 && crew == 24){
		$(TA_team_tech_second_right_div).animate({left: -TA_team_tech_second_right_div_width,width: 0,marginLeft: '-=130px'},500);
		variable_for_TA_team_tech = 2;
		$("#button-crew-right").css("opacity","0.6"); //因為最右了，所以直接讓右按鈕暗
		$("#button-crew-right").attr("src","assets/images/crew-section/icon-right.svg");
		button_right_able = 0;
		return;
	}

	// console.log(crew);
	if(document_width > 1150 && crew == 6){
		crew = 	crew + 4;
	}
	else if(document_width > 1150 && crew == 22){
		crew = 	crew + 2;
	}
	else if(document_width > 1150){
		crew = 	crew + 6;
	}
	else{
		crew = crew + 2;
	}

	//計算位移的大小（crew-content-block & empty-block & 5)
	var total_size_need_to_slide = 0;
	for(var i=0;i<crew;i++){
		total_size_need_to_slide += $(block_list[i]).width() + 6;
	}

	//do scroll
	$(".slide-block").css("left",-total_size_need_to_slide+"px");

	//如果是最右了，就讓右按鈕暗
	if(document_width >= 1060 && crew == 24){ 
		$("#button-crew-right").css("opacity","0.6");
		$("#button-crew-right").attr("src","assets/images/crew-section/icon-right.svg");
		button_right_able = 0;
	}
});

//crew button
var leftbtn = document.getElementById('button-crew-left');
var rightbtn = document.getElementById('button-crew-right');
var slide_block = document.getElementById('crew-content-id');

// create a simple instance
// by default, it only adds horizontal recognizers
var Hammer_leftbtn = new Hammer(leftbtn);
var Hammer_rightbtn = new Hammer(rightbtn);
var Hammer_slide_block = new Hammer(slide_block);
var left_pan = 0, right_pan = 0, dist = 0, dist_base = 50;

// listen to events...
Hammer_slide_block.on("panend panleft panright", function(ev) {
	if(ev.type == "panleft") {
		left_pan = 1;
		right_pan = 0;
	}
	if(ev.type == "panright") {
		left_pan = 0;
		right_pan = 1;
	}
	if(ev.type == "panend") {
		if(left_pan) dist = -ev.deltaX;
		if(right_pan) dist = ev.deltaX;
		if($("#crew").width() > 1000) 
			dist_base = 100;
		else 
			dist_base = 135;
		
		for(i = 0; i < dist/dist_base; i++) {
			if(left_pan) $(rightbtn).click();
			if(right_pan) $(leftbtn).click();
		}
	}
});


$(leftbtn).mouseover(function(){
	if(button_left_able == 1 && $("#crew").width() > 1000){
		$(this).attr("src","assets/images/crew-section/icon-left-red.svg");
	}
});
$(leftbtn).mouseout(function(){
	$(this).attr("src","assets/images/crew-section/icon-left.svg");
});
$(rightbtn).mouseover(function(){
	if(button_right_able == 1 && $("#crew").width() > 1000){
		$(this).attr("src","assets/images/crew-section/icon-right-red.svg");
	}
});
$(rightbtn).mouseout(function(){
	$(this).attr("src","assets/images/crew-section/icon-right.svg");
});


Hammer_leftbtn.on("tap", function(ev) {
    if(ev.type == "tap") {
		if(button_left_able == 1 && $("#crew").width() <= 1000){
			$(leftbtn).attr("src","assets/images/crew-section/icon-left-red.svg");
			setTimeout(function(){
				$(leftbtn).attr("src","assets/images/crew-section/icon-left.svg");
			},500);
		}
	}
});

Hammer_rightbtn.on("tap", function(ev) {
    if(ev.type == "tap") {
		if(button_right_able == 1 && $("#crew").width() <= 1000){
			$(rightbtn).attr("src","assets/images/crew-section/icon-right-red.svg");
			setTimeout(function(){
				$(rightbtn).attr("src","assets/images/crew-section/icon-right.svg");
			},500);
		}
	}
});

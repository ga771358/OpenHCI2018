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
var sectionHeight = $("#landing").height() - $("header").height();
var sceneHeader = new ScrollMagic.Scene({triggerElement: "#landing", duration: sectionHeight, triggerHook: 0})
.setClassToggle("header", "atLanding")
.addTo(controller);
$(window).on("resize", function(){
	sectionHeight = $("#landing").height() - $("header").height();
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
var scene2 = new ScrollMagic.Scene({triggerElement: "#intro",triggerHook: 0.2,reverse: false});
scene2.addTo(controller);
scene2.on("enter", scene2Enter);

function scene2Enter(event) {
	var tl = new TimelineMax({repeat:0});
	tl.to($("#intro #our-video"), 1, {opacity:1});
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
	tl.to($("#program .program-content.active .schedule-title p"), 0.5, {className:"+=colorAnimate"});
	tl.staggerTo($("#program .program-content.active .schedule-content p"), 1, {className:"+=colorAnimate"},0.1);
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
	tl.to($("#organizer .og-section-title").eq(0), 0.8, {className:"+=colorAnimate"});
	tl.staggerFromTo($("#organizer .og-section-logo-wrapper").eq(0).find('.logo-block'), 0.2, {x:-10,opacity:0},{x:0,opacity:1},0.2);
	tl.to($("#organizer .og-section-title").eq(1), 0.8, {className:"+=colorAnimate"});
	tl.staggerFromTo($("#organizer .og-section-logo-wrapper").eq(1).find('.logo-block'), 0.2, {x:-10,opacity:0},{x:0,opacity:1},0.2);
	tl.to($("#organizer .og-section-title").eq(2), 0.8, {className:"+=colorAnimate"});
	tl.staggerFromTo($("#organizer .og-section-logo-wrapper").eq(2).find('.logo-small'), 0.2, {x:-10,opacity:0},{x:0,opacity:1},0.2);
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
var scrollOffset = $("header").height();
$(function() {
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
			  	// ga('send', 'event','menu','click', 'menu_'+$(this).attr('href').substring(1));
				isScrolling = true;// 確保animate就算先做執行 也不會做完ga
				$('html, body').animate({
				scrollTop: target.offset().top - scrollOffset
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
	tl.to($("#program .program-content.active .schedule-title p"), 0.5, {className:"+=colorAnimate"});
	tl.staggerTo($("#program .program-content.active .schedule-content p"), 1, {className:"+=colorAnimate"},0.1);
}

//intro section
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('our-video', {
		videoId: 'kfXdP7nZIiE', //Youtube 影片ID
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
var total_block_size = 0;
var temp_left_now;

  // variable for tect block
var variable_for_six = 0;
var first_content_div = $(block_list[6]).children(".crew-content-block-right")[0];
var first_content_div_width = $(first_content_div).width();

// calc the total width
for(var j=0;j<block_list_length;j++){
	total_block_size += $(block_list[j]).width() + 5;
}

$("#button-crew-left").click(function(){
	//最右邊了
	if(crew == 0){
		return;
	}
	
	//判斷是tech的時候
	if($(document).width() <501 && variable_for_six == 1 && crew == 6){
		$(first_content_div).css("margin-left","16px");
		$(first_content_div).animate({left: 0,width: first_content_div_width},500);
		variable_for_six = 0;
		return;
	}

	crew = crew - 2;

	//計算位移的大小（crew-content-block & empty-block)
	var total_size_need_to_slide = 0;
	for(var i=0;i<crew;i++){
		total_size_need_to_slide += $(block_list[i]).width() + 5;
	}

	//record left size
	temp_left_now = total_size_need_to_slide;
	//變負數
	total_size_need_to_slide = -total_size_need_to_slide;
	$(".slide-block").css("left",total_size_need_to_slide+"px");
	console.log(crew);
});

$("#button-crew-right").click(function(){
	
	//最右邊了
	var parent_width = $("#crew-slide-id").width();
	var document_width = $(document).width();
	
	if(crew == 22 ){
		return;
	}
	if( document_width <= 800  && total_block_size < (parent_width + temp_left_now - 80) ){
		return;
	}
	if( total_block_size < (parent_width + temp_left_now - 140) ){
		return;
	}

	//判斷是tech的時候
	if($(document).width() <501 && variable_for_six == 0 && crew == 6){
		$(first_content_div).css("margin-left","0px");
		$(first_content_div).animate({left: -first_content_div_width,width: 0},500);
		variable_for_six = 1;
		return;
	}
	crew = crew + 2;

	//計算位移的大小（crew-content-block & empty-block)
	var total_size_need_to_slide = 0;
	for(var i=0;i<crew;i++){
		total_size_need_to_slide += $(block_list[i]).width() + 5;
	}

	//record left size
	temp_left_now = total_size_need_to_slide;
	//變負數
	total_size_need_to_slide = -total_size_need_to_slide;
	$(".slide-block").css("left",total_size_need_to_slide+"px");
	console.log(crew);
});

// map section
var map, styledMapType;
function initMap() {
  styledMapType = new google.maps.StyledMapType(
	[
		{
			"featureType": "all",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#ffffff"
				}
			]
		},
		{
			"featureType": "all",
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 13
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#000000"
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#144b53"
				},
				{
					"lightness": 14
				},
				{
					"weight": 1.4
				}
			]
		},
		{
			"featureType": "administrative.locality",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "administrative.locality",
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "all",
			"stylers": [
				{
					"color": "#08304b"
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#0c4152"
				},
				{
					"lightness": 5
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#000000"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#0b434f"
				},
				{
					"lightness": 25
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#000000"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#0b3d51"
				},
				{
					"lightness": 16
				}
			]
		},
		{
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#000000"
				}
			]
		},
		{
			"featureType": "transit",
			"elementType": "all",
			"stylers": [
				{
					"color": "#146474"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "all",
			"stylers": [
				{
					"color": "#021019"
				}
			]
		}
	],
	{name: 'OPEN HCI'});
  var pos = {lat: 25.013462, lng: 121.541603};
  map = new google.maps.Map(document.getElementById('map'), {
	center: pos,
	zoom: 18,
  });

  map = new google.maps.Map(document.getElementById('map'), {
	center: pos,
	zoom: 18,
  });
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
  var marker = new google.maps.Marker({
    position: pos,
	map: map,
	animation: google.maps.Animation.DROP,
	icon: '../assets/images/icon-location.png'
  });
  
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
  marker.addListener('click', toggleBounce);
}

function toggleBounce() {
	if (marker.getAnimation() !== null) {
	  marker.setAnimation(null);
	} else {
	  marker.setAnimation(google.maps.Animation.BOUNCE);
	}
  }
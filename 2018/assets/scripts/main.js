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
	},500);
	
})

//intro section
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('our-video', {
		videoId: 'kfXdP7nZIiE' //Youtube 影片ID
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
var temp_left_now;

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

// calc the total width
var total_block_list_size = 0;
for(var j=0;j<block_list_length;j++){
	total_block_list_size += $(block_list[j]).width() + 5;
}

$("#button-crew-left").click(function(){

	console.log("from:" + crew);

	//如果是最左了，則不進行任何動作
	if(crew == 0){ return;}
	
	//上面沒被return的話，就表示可以滑了，所以右按鈕開啟
	$("#button-crew-right").css("opacity","1");

	// //判斷是TA_team_tech的時候
	if( variable_for_TA_team_tech == 2 && crew == 24){
		$(TA_team_tech_second_right_div).animate({left: 0,width: TA_team_tech_second_right_div_width,marginLeft: '+=16px'},500);
		variable_for_TA_team_tech = 1;
		return;
	}
	if( variable_for_TA_team_tech == 1 && crew == 24){
		$(TA_team_tech_first_right_div).animate({left: 0,width: TA_team_tech_first_right_div_width,marginLeft: '+=16px'},500);
		variable_for_TA_team_tech = 0;
		return;
	}
	// //判斷是TA_team_design的時候
	if( variable_for_TA_team_design == 2 && crew == 22){
		$(TA_team_design_second_right_div).animate({left: 0,width: TA_team_design_second_right_div_width,marginLeft: '+=16px'},500);
		variable_for_TA_team_design = 1;
		return;
	}
	if( variable_for_TA_team_design == 1 && crew == 22){
		$(TA_team_design_first_right_div).animate({left: 0,width: TA_team_design_first_right_div_width,marginLeft: '+=16px'},500);
		variable_for_TA_team_design = 0;
		return;
	}
	// //判斷是tech的時候
	if( variable_for_tech_studio == 1 && crew == 6){
		$(tech_studio_right_div).animate({left: 0,width: tech_studio_right_div_width,marginLeft: '+=16px'},500);
		variable_for_tech_studio = 0;
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
	//do scroll
	$(".slide-block").css("left",-total_size_need_to_slide+"px");
	
	//如果是最左了，就讓左按鈕暗
	if(crew == 0){ $("#button-crew-left").css("opacity","0.6"); }
});

$("#button-crew-right").click(function(){	

	console.log("from:" + crew);
	var parent_width = $("#crew-slide-id").width();
	var document_width = $(document).width();


	//如果是最左了，則不進行任何動作
	if(crew == 24 && variable_for_TA_team_tech == 2){ return; }
	// if( document_width <= 800  && total_block_list_size < (parent_width + temp_left_now - 80) ){ return; }
	// if( total_block_list_size < (parent_width + temp_left_now - 130) ){ return; }

	//上面沒被return的話，就表示可以滑了，所以右按鈕開啟
	$("#button-crew-left").css("opacity","1");
	

	// //判斷是tech-studio的時候
	if( variable_for_tech_studio == 0 && crew == 6){
		// $(tech_studio_right_div).css("margin-left","0px");
		$(tech_studio_right_div).animate({left: -tech_studio_right_div_width,width: 0,marginLeft: '-=16px'},500);
		variable_for_tech_studio = 1;
		return;
	}
	// //判斷是TA_team_design的時候
	if( variable_for_TA_team_design == 0 && crew == 22){
		// $(TA_team_design_first_right_div).css("margin-left","0px");
		$(TA_team_design_first_right_div).animate({left: -TA_team_design_first_right_div_width,width: 0,marginLeft: '-=16px'},500);
		variable_for_TA_team_design = 1;
		return;
	}
	if( variable_for_TA_team_design == 1 && crew == 22){
		// $(TA_team_design_second_right_div).css("margin-left","0px");
		$(TA_team_design_second_right_div).animate({left: -TA_team_design_second_right_div_width,width: 0,marginLeft: '-=16px'},500);
		variable_for_TA_team_design = 2;
		return;
	}
	// //判斷是TA_team_tech的時候
	if( variable_for_TA_team_tech == 0 && crew == 24){
		// $(TA_team_tech_first_right_div).css("margin-left","0px");
		$(TA_team_tech_first_right_div).animate({left: -TA_team_tech_first_right_div_width,width: 0,marginLeft: '-=16px'},500);
		variable_for_TA_team_tech = 1;
		return;
	}
	if( variable_for_TA_team_tech == 1 && crew == 24){
		// $(TA_team_tech_second_right_div).css("margin-left","0px");
		$(TA_team_tech_second_right_div).animate({left: -TA_team_tech_second_right_div_width,width: 0,marginLeft: '-=16px'},500);
		variable_for_TA_team_tech = 2;
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
	//do scroll
	$(".slide-block").css("left",-total_size_need_to_slide+"px");

	//如果是最左了，就讓右按鈕暗
	if(crew == 24 && variable_for_TA_team_tech == 2){ $("#button-crew-right").css("opacity","0.6"); }
	// if( total_block_list_size < (parent_width + temp_left_now - 130) ){ $("#button-crew-right").css("opacity","0.6"); }
	// if( document_width <= 800  && total_block_list_size < (parent_width + temp_left_now - 80) ){ $("#button-crew-right").css("opacity","0.6") }

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
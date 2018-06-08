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

	console.log(crew);
	
	//最右邊了
	if(crew == 0){
		return;
	}
	
	//判斷是tech的時候
	// if($(document).width() <501 && variable_for_six == 1 && crew == 6){
	// 	$(first_content_div).css("margin-left","16px");
	// 	$(first_content_div).animate({left: 0,width: first_content_div_width},500);
	// 	variable_for_six = 0;
	// 	return;
	// }

	crew = crew - 2;

	//計算位移的大小（crew-content-block & empty-block)
	var total_size_need_to_slide = 0;
	for(var i=0;i<crew;i++){
		total_size_need_to_slide += $(block_list[i]).width() + 5;
	}

	//record left size
	// temp_left_now = total_size_need_to_slide;
	//變負數
	$(".slide-block").css("left",-total_size_need_to_slide+"px");
	// console.log(crew);
});

$("#button-crew-right").click(function(){	
	console.log(crew);
	//最右邊了
	// var parent_width = $("#crew-slide-id").width();
	// var document_width = $(document).width();
	
	// if(crew == 22 ){
	// 	return;
	// }
	// if( document_width <= 800  && total_block_size < (parent_width + temp_left_now - 80) ){
	// 	return;
	// }
	// if( total_block_size < (parent_width + temp_left_now - 140) ){
	// 	return;
	// }

	// //判斷是tech的時候
	// if($(document).width() <501 && variable_for_six == 0 && crew == 6){
	// 	$(first_content_div).css("margin-left","0px");
	// 	$(first_content_div).animate({left: -first_content_div_width,width: 0},500);
	// 	variable_for_six = 1;
	// 	return;
	// }
	crew = crew + 2;

	//計算位移的大小（crew-content-block & empty-block)
	var total_size_need_to_slide = 0;
	for(var i=0;i<crew;i++){
		total_size_need_to_slide += $(block_list[i]).width() + 5;
	}

	//record left size
	// temp_left_now = total_size_need_to_slide;
	//變負數
	// total_size_need_to_slide = -total_size_need_to_slide;
	$(".slide-block").css("left",-total_size_need_to_slide+"px");
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
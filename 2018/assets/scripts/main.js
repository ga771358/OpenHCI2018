//手機menu相關
$(".m-menu-opener").on("click", function() {
	$(".menu").toggleClass('active');
	$(".lightbox").toggleClass('active');
	$(".m-menu-opener").toggleClass('close');
})

$(".menu-btn,.lightbox").on("click", function() {
	$(".menu").removeClass('active');
	$(".lightbox").removeClass('active');
	$(".m-menu-opener").removeClass('close');
})

//切換menu動畫樣式
function changeMenuAnimate(index) {
	$(".menu").removeClass('menu-cir');
	$(".menu").removeClass('menu-fadein');
	$(".menu").removeClass('menu-slidein');
	switch(index) {
		case 1:
			$(".menu").addClass('menu-cir');
			break;
		case 2:
			$(".menu").addClass('menu-fadein');
			break;
		case 3:
			$(".menu").addClass('menu-slidein');
			break;
	}
}

//menu隱藏＆出現
var canHideHeader = false;

var prevScrollpos = window.pageYOffset;
$(window).on("scroll", function(e){
	if(!canHideHeader) return;
	if(isScrolling) return;
	var currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		$("header").removeClass('hide');
	} else {
		$("header").addClass('hide');
	}
	prevScrollpos = currentScrollPos;
})

//導航列位置指示
var controller = new ScrollMagic.Controller();
var sections = [$("#intro"),$("#program"),$("#registration"),$("#taichi"),$("#crew"),$("#organizer"),$("#contact")];

for(i=0; i<sections.length; i++) {
	var sectionId = sections[i].attr("id");
	var sectionHeight = sections[i].outerHeight();
	var scene = new ScrollMagic.Scene({triggerElement: "#"+sectionId, duration: sectionHeight, triggerHook: 0.5})
	.setClassToggle("#menu"+(i+1), "menu-here")
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

//taichi animation
var tlTaichi, sceneTaichi;

//網頁載入(load)後與改變視窗大小(resize)後皆會觸發的事件
$(window).on("load resize", function(){
	
	// 算出要移動的那張圖與旁邊文字區塊的高度差 = offset
	var taichiImg = $("#taichi .section-left");
	var taichiTextContainer = $("#taichi .section-right");
	var offset = taichiTextContainer.height() - taichiImg.height();

	//建立tweenmax動畫：讓圖片從y=0移動到y=offset（對齊文字的頭->對齊文字的底）
	tlTaichi = new TimelineMax({repeat:0});
	tlTaichi.fromTo(taichiImg, 1, {y:0}, {y:offset, ease:Linear.easeNone}, 0);

	//如果已經建立過scrollmagic的scene就要先將他移除（不然會重複）
	if(sceneTaichi !== undefined) {
		sceneTaichi.remove();
	}

	//建立scrollmagic的scene：
	sceneTaichi = new ScrollMagic.Scene({
		triggerElement: "#taichi",  //觸發區域是#taichi這個section
		duration: offset, 	    	//影響期間是offset這個範圍內
		triggerHook: 0.2 		    //觸發點是#taichi的頂碰到螢幕高度從上面開始10%的地方
	}); 

	//把剛剛的tweenmax動畫交給scrollmagic使用（本來tweenmax是隨著時間做動畫，交給scrollmagic使用變成隨著滾動向下的程度做動畫）
	sceneTaichi.setTween(tlTaichi);
	sceneTaichi.addTo(controller);

	//最後就會變成：在滑過這區域時，每往下滾動1px，圖片就會跟著向下移動1px，直到圖片的底對齊文字區塊的底，所以看起來會像是圖片固定在螢幕上不動！
})

// var scaneToCrew;
// $(window).on("load resize", function(){

// 	//如果已經建立過scrollmagic的scene就要先將他移除（不然會重複）
// 	if(scaneToCrew !== undefined) {
// 		scaneToCrew.remove();
// 	}

// 	//建立scrollmagic的scene：
// 	scaneToCrew = new ScrollMagic.Scene({
// 		triggerElement: "#crew",  //觸發區域是#taichi這個section
// 		// duration: offset, 	    	//影響期間是offset這個範圍內
// 		// triggerHook: 0.1 		    //觸發點是#taichi的頂碰到螢幕高度從上面開始10%的地方
// 	}); 

// 	//把剛剛的tweenmax動畫交給scrollmagic使用（本來tweenmax是隨著時間做動畫，交給scrollmagic使用變成隨著滾動向下的程度做動畫）
// 	sceneTaichi.setTween("#crew",0.5,{visibility:"initial"});
// 	sceneTaichi.addTo(controller);

// 	//最後就會變成：在滑過這區域時，每往下滾動1px，圖片就會跟著向下移動1px，直到圖片的底對齊文字區塊的底，所以看起來會像是圖片固定在螢幕上不動！
// })

//crew section
var crew = -1;
var all_block = $('.crew-content-block');
var total_block_size = 0; // total size of all crew block
var temp_left_now; // record slide block 's left now

for(var j=0;j<12;j++){
	total_block_size += 150;
	total_block_size += $(all_block[i]).width();
}

$("#button-crew-left").click(function(){
	//最右邊了
	if(crew == -1){
		return;
	}
	
	crew--;

	//計算位移的大小（包括margin）
	var total_size_need_to_slide = 150;
	for(var i=0;i<=crew;i++){
		total_size_need_to_slide += 150;
		total_size_need_to_slide += $(all_block[i]).width();
	}

	temp_left_now = total_size_need_to_slide;
	//變負數
	total_size_need_to_slide = -total_size_need_to_slide;

	$(".slide-block").css("left",total_size_need_to_slide+"px");
	temp_left_now = -total_size_need_to_slide;
});

$("#button-crew-right").click(function(){
	//最右邊了
	var screen_size_now = $(".crew-content").width();
	if((total_block_size - screen_size_now) < (temp_left_now - 450)){
		return;
	}

	crew++;

	//計算位移的大小（包括margin）
	var total_size_need_to_slide = 150;
	for(var i=0;i<=crew;i++){
		total_size_need_to_slide += 150;
		total_size_need_to_slide += $(all_block[i]).width();
	}

	//變負數
	total_size_need_to_slide = -total_size_need_to_slide;
	
	$(".slide-block").css("left",total_size_need_to_slide+"px");
	temp_left_now = -total_size_need_to_slide;
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
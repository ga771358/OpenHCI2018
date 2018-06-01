//手機menu相關
$(".m-menu-opener").on("click", function() {
	$(".menu").toggleClass('active');
	$(".m-menu-opener").toggleClass('close');
})

$(".menu-btn").on("click", function() {
	$(".menu").removeClass('active');
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
		var container = $(this).parents(".step-container")
		var wrapper = container.find('.step-content-wrapper');
		var content = container.find('.step-content');
		
		var contentHeight = content.height() + 40;

		container.toggleClass('active');
		if(container.hasClass('active')) {
			isStepChanging = true;
			wrapper.animate({"height":contentHeight+"px"}, stepOpenTime, "linear", function(){
				isStepChanging = false;
			});
		} else {
			isStepChanging = true;
			wrapper.animate({"height":"0"}, stepOpenTime, "linear", function(){
				isStepChanging = false;
			});
		}
	}
})


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
	if((total_block_size - screen_size_now) < (temp_left_now - 300)){
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

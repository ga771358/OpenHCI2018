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
var canHideHeader = true;

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
tl.fromTo($("#interlude img"), 1, {x:500}, {x:-500, ease:Linear.easeNone}, 0);
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
//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

var ww = 1600;
var wh = 900;

var stage = new Container();
var renderer = autoDetectRenderer(ww, wh, { transparent: true,view: document.querySelector('#screen'), resolution: window.devicePixelRatio < 2 ? 2 : window.devicePixelRatio });
var screenContainer = new Container();
stage.addChild(screenContainer);

//resize
renderer.autoResize = true;
$(window).resize(function() {
    // renderer.resize(window.innerWidth, window.innerHeight);
})


loader
    .add("./assets/images/logo1.png")
    .add("./assets/images/logo2.png");
loader.load(setup);



function setup() {
	drawScreen();
    render();
}

var cirRadius = 20;
function drawScreen() {
	var marginTop = cirRadius*2/Math.sqrt(2);
	var marginLeft = cirRadius*4/Math.sqrt(2);

	var numInRow = parseInt(ww/marginLeft)+1;
	var numInCol = parseInt(wh/marginTop)+1;
	for (var j = 0; j < numInCol/4; j++) {
		var marginRow = j*cirRadius*8/Math.sqrt(2);
		//第1排
		for (var i = 0; i < numInRow; i++) {
			if(i%2==0) {
				var c = cir(1,i*marginLeft,marginRow);
			} else {
				var c = cir(2,i*marginLeft,marginRow);
			}
			screenContainer.addChild(c);
		}
		//第2排
		for (var i = 0; i < numInRow; i++) {
			if(i%2==0) {
				var c = cir(4,marginLeft/2+i*marginLeft,marginRow+marginTop);
			} else {
				var c = cir(5,marginLeft/2+i*marginLeft,marginRow+marginTop);
			}
			screenContainer.addChild(c);
		}
		//第3排
		for (var i = 0; i < numInRow; i++) {
			if(i%2==0) {
				var c = cir(3,i*marginLeft,marginRow+marginTop*2);
			} else {
				var c = cir(1,i*marginLeft,marginRow+marginTop*2);
			}
			screenContainer.addChild(c);
		}
		//第4排
		for (var i = 0; i < numInRow; i++) {
			if(i%2==0) {
				var c = cir(5,marginLeft/2+i*marginLeft,marginRow+marginTop*3);
			} else {
				var c = cir(4,marginLeft/2+i*marginLeft,marginRow+marginTop*3);
			}
			screenContainer.addChild(c);
		}
	}
}

// type 1:o, 2:-, 3:|, 4:\, 5:/
function cir(type,x,y) {
	if(type == 1) {
		var c = new Sprite(resources["./assets/images/logo1.png"].texture);
		c.anchor.set(0.5, 0.5);
		c.tint = 0x28286E;
		c.width = c.height = cirRadius;
		c.x = x;
		c.y = y;
		// c.alpha = 0.2;
	} else {
		var c = new Sprite(resources["./assets/images/logo2.png"].texture);
		c.anchor.set(0.5, 0.5);
		c.tint = 0x28286E;
		c.width = cirRadius*2;
		c.height = cirRadius/2;
		c.x = x;
		c.y = y;
		// c.alpha = 0.2;
		if(type==3){
			c.rotation = Math.PI/2;
		}
		if(type==4){
			c.rotation = Math.PI/4;
		}
		if(type==5){
			c.rotation = -Math.PI/4;
		}
	}


	c.interactive = true;
	// c.on('mouseover', onHover);
	c.on('pointerover', onHover);
	c.on('touchmove', onHover);
	// c.on('mouseout', onHoverOut);
	function onHover(e) {
		// console.log(e);
		if(e.target) {
			// var hex = componentToHex(e.target.tint);
			TweenMax.to(e.target,0.3,{colorProps:{tint: 0xd70050, format:"number"}});
			setTimeout(off,2000,e.target);

			function off(target) {
				TweenMax.to(target,0.3,{colorProps:{tint: 0x28286E, format:"number"}});
			}
		}
		// else if(e.currentTarget) {
		// 	TweenMax.to(e.currentTarget,0.3,{alpha:1});
		// 	setTimeout(off,2000,e.currentTarget);

		// 	function off(target) {
		// 		TweenMax.to(target,0.3,{alpha:0.2});
		// 	}
		// }		
	}
	return c;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


//render
function render() {
    requestAnimationFrame(render);
    renderer.render(stage);
}
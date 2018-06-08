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

// var numInRow,numInCol;
// var cirRadius = 20;
// function drawScreen() {
// 	var marginTop = cirRadius*2/Math.sqrt(2);
// 	var marginLeft = cirRadius*4/Math.sqrt(2);

// 	numInRow = parseInt(ww/marginLeft)+1;
// 	numInCol = parseInt(wh/marginTop)+1;
// 	for (var j = 0; j < numInCol/4; j++) {
// 		var marginRow = j*cirRadius*8/Math.sqrt(2);
// 		if(j>3){
// 			//第1排
// 			for (var i = 0; i < numInRow; i++) {
// 				if(i%2==0) {
// 					var c = cir(1,i*marginLeft,marginRow,0x191455);
// 				} else {
// 					var c = cir(2,i*marginLeft,marginRow,0x191455);
// 				}
// 				c.screenPos = {x:i,y:j};
// 				screenContainer.addChild(c);
// 			}
// 			//第2排
// 			for (var i = 0; i < numInRow; i++) {
// 				if(i%2==0) {
// 					var c = cir(4,marginLeft/2+i*marginLeft,marginRow+marginTop,0x191455);
// 				} else {
// 					var c = cir(5,marginLeft/2+i*marginLeft,marginRow+marginTop,0x191455);
// 				}
// 				c.screenPos = {x:i,y:j+1};
// 				screenContainer.addChild(c);
// 			}
// 			//第3排
// 			for (var i = 0; i < numInRow; i++) {
// 				if(i%2==0) {
// 					var c = cir(3,i*marginLeft,marginRow+marginTop*2,0x191455);
// 				} else {
// 					var c = cir(1,i*marginLeft,marginRow+marginTop*2,0x191455);
// 				}
// 				c.screenPos = {x:i,y:j+2};
// 				screenContainer.addChild(c);
// 			}
// 			//第4排
// 			for (var i = 0; i < numInRow; i++) {
// 				if(i%2==0) {
// 					var c = cir(5,marginLeft/2+i*marginLeft,marginRow+marginTop*3,0x191455);
// 				} else {
// 					var c = cir(4,marginLeft/2+i*marginLeft,marginRow+marginTop*3,0x191455);
// 				}
// 				c.screenPos = {x:i,y:j+3};
// 				screenContainer.addChild(c);
// 			}
// 		} else {
// 			//第1排
// 			for (var i = 0; i < numInRow; i++) {
// 				if(i%2==0) {
// 					var c = cir(1,i*marginLeft,marginRow,0x0F0A32);
// 				} else {
// 					var c = cir(2,i*marginLeft,marginRow,0x0F0A32);
// 				}
// 				c.screenPos = {x:i,y:j};
// 				screenContainer.addChild(c);
// 			}
// 			//第2排
// 			for (var i = 0; i < numInRow; i++) {
// 				if(i%2==0) {
// 					var c = cir(4,marginLeft/2+i*marginLeft,marginRow+marginTop,0x0F0A32);
// 				} else {
// 					var c = cir(5,marginLeft/2+i*marginLeft,marginRow+marginTop,0x0F0A32);
// 				}
// 				c.screenPos = {x:i,y:j+1};
// 				screenContainer.addChild(c);
// 			}
// 			//第3排
// 			for (var i = 0; i < numInRow; i++) {
// 				if(i%2==0) {
// 					var c = cir(3,i*marginLeft,marginRow+marginTop*2,0x0F0A32);
// 				} else {
// 					var c = cir(1,i*marginLeft,marginRow+marginTop*2,0x0F0A32);
// 				}
// 				c.screenPos = {x:i,y:j+2};
// 				screenContainer.addChild(c);
// 			}
// 			//第4排
// 			for (var i = 0; i < numInRow; i++) {
// 				if(i%2==0) {
// 					var c = cir(5,marginLeft/2+i*marginLeft,marginRow+marginTop*3,0x0F0A32);
// 				} else {
// 					var c = cir(4,marginLeft/2+i*marginLeft,marginRow+marginTop*3,0x0F0A32);
// 				}
// 				c.screenPos = {x:i,y:j+3};
// 				screenContainer.addChild(c);
// 			}
// 		}
		
// 	}
// }

var numInRow,numInCol;

var cirRadius = 20;
function drawScreen() {
	var marginTop = cirRadius*2/Math.sqrt(2);
	var marginLeft = cirRadius*4/Math.sqrt(2);

	numInRow = parseInt(ww/marginLeft)+1;
	numInCol = (parseInt(wh/marginTop)+1) + 4 - (parseInt(wh/marginTop)+1)%4;
	// console.log(numInCol);
	for (var j = 0; j < numInCol; j+=4) {
		var marginRow = j*cirRadius*2/Math.sqrt(2);
		if(j>12){
			//第1排
			for (var i = 0; i < numInRow; i++) {
				if(i%2==0) {
					var c = cir(1,i*marginLeft,marginRow,0x191455);
				} else {
					var c = cir(2,i*marginLeft,marginRow,0x191455);
				}
				c.orgColor = 0x191455;
				c.screenPos = {x:i,y:j};
				screenContainer.addChild(c);
			}
			//第2排
			for (var i = 0; i < numInRow; i++) {
				if(i%2==0) {
					var c = cir(4,marginLeft/2+i*marginLeft,marginRow+marginTop,0x191455);
				} else {
					var c = cir(5,marginLeft/2+i*marginLeft,marginRow+marginTop,0x191455);
				}
				c.orgColor = 0x191455;
				c.screenPos = {x:i,y:j+1};
				screenContainer.addChild(c);
			}
			//第3排
			for (var i = 0; i < numInRow; i++) {
				if(i%2==0) {
					var c = cir(3,i*marginLeft,marginRow+marginTop*2,0x191455);
				} else {
					var c = cir(1,i*marginLeft,marginRow+marginTop*2,0x191455);
				}
				c.orgColor = 0x191455;
				c.screenPos = {x:i,y:j+2};
				screenContainer.addChild(c);
			}
			//第4排
			for (var i = 0; i < numInRow; i++) {
				if(i%2==0) {
					var c = cir(5,marginLeft/2+i*marginLeft,marginRow+marginTop*3,0x191455);
				} else {
					var c = cir(4,marginLeft/2+i*marginLeft,marginRow+marginTop*3,0x191455);
				}
				c.orgColor = 0x191455;
				c.screenPos = {x:i,y:j+3};
				screenContainer.addChild(c);
			}
		} else {
			//第1排
			for (var i = 0; i < numInRow; i++) {
				if(i%2==0) {
					var c = cir(1,i*marginLeft,marginRow,0x0F0A32);
				} else {
					var c = cir(2,i*marginLeft,marginRow,0x0F0A32);
				}
				c.orgColor = 0x0F0A32;
				c.screenPos = {x:i,y:j};
				screenContainer.addChild(c);
			}
			//第2排
			for (var i = 0; i < numInRow; i++) {
				if(i%2==0) {
					var c = cir(4,marginLeft/2+i*marginLeft,marginRow+marginTop,0x0F0A32);
				} else {
					var c = cir(5,marginLeft/2+i*marginLeft,marginRow+marginTop,0x0F0A32);
				}
				c.orgColor = 0x0F0A32;
				c.screenPos = {x:i,y:j+1};
				screenContainer.addChild(c);
			}
			//第3排
			for (var i = 0; i < numInRow; i++) {
				if(i%2==0) {
					var c = cir(3,i*marginLeft,marginRow+marginTop*2,0x0F0A32);
				} else {
					var c = cir(1,i*marginLeft,marginRow+marginTop*2,0x0F0A32);
				}
				c.orgColor = 0x0F0A32;
				c.screenPos = {x:i,y:j+2};
				screenContainer.addChild(c);
			}
			//第4排
			for (var i = 0; i < numInRow; i++) {
				if(i%2==0) {
					var c = cir(5,marginLeft/2+i*marginLeft,marginRow+marginTop*3,0x0F0A32);
				} else {
					var c = cir(4,marginLeft/2+i*marginLeft,marginRow+marginTop*3,0x0F0A32);
				}
				c.orgColor = 0x0F0A32;
				c.screenPos = {x:i,y:j+3};
				screenContainer.addChild(c);
			}
		}
		
	}
}

// type 1:o, 2:-, 3:|, 4:\, 5:/
function cir(type,x,y,color) {
	if(type == 1) {
		var c = new Sprite(resources["./assets/images/logo1.png"].texture);
		c.anchor.set(0.5, 0.5);
		c.tint = color;
		c.width = c.height = cirRadius;
		c.x = x;
		c.y = y;
		// c.alpha = 0.2;
	} else {
		var c = new Sprite(resources["./assets/images/logo2.png"].texture);
		c.anchor.set(0.5, 0.5);
		c.tint = color;
		c.width = cirRadius*2.3;
		c.height = c.width/4;
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

	c.on('mouseover', onHover);
	// c.on('pointerover', onHover);
	// c.on('touchmove', onHover);
	// c.on('mouseout', onHoverOut);
	function onHover(e) {
		if(e.target) {
			TweenMax.to(e.target,0.3,{colorProps:{tint: 0xd70050, format:"number"}});
			setTimeout(off,5000,e.target);
		}
		else if(e.currentTarget) {
			TweenMax.to(e.currentTarget,0.3,{colorProps:{tint: 0xd70050, format:"number"}});
			setTimeout(off,5000,e.currentTarget);
		}	

		function off(target) {
			TweenMax.to(target,0.3,{colorProps:{tint: color, format:"number"}});
		}	
	}

	// var isPressing = false;
	// $(window).on('mousedown', press);
	// $(window).on('mouseup', release);
	// c.on('mousedown', press2);
	// c.on('mouseover', toggle);

	// function press(e) {
	// 	isPressing = true;
	// 	// toggle(e);
	// }
	// function press2(e) {
	// 	console.log("@");
	// 	isPressing = true;
	// 	toggle(e);
	// }
	// function release(e) {
	// 	isPressing = false;
	// }

	// function toggle(e) {
	// 	if(isPressing) {
	// 		// console.log(e);
	// 		if(e.target) {
	// 			if(!e.target.stat || e.target.stat == 0) {
	// 				// TweenMax.to(e.target,0.3,{alpha:1});
	// 				TweenMax.to(e.target,0.3,{colorProps:{tint: 0xd70050, format:"number"}});
	// 				e.target.stat = 1;
	// 			} else {
	// 				// TweenMax.to(e.target,0.3,{alpha:0.2});
	// 				TweenMax.to(e.target,0.3,{colorProps:{tint: color, format:"number"}});
	// 				e.target.stat = 0;
	// 			}
	// 		}
	// 	} else {
	// 		if(e.target) {
	// 			if(!e.target.stat || e.target.stat == 0) {
	// 				TweenMax.to(e.target,0.3,{colorProps:{tint: 0xd70050, format:"number"},alpha: 0.5});
	// 				setTimeout(off,1000,e.target);
	// 			}
	// 		}

	// 		function off(target) {
	// 			if(!target.stat || target.stat == 0) {
	// 				TweenMax.to(target,0.3,{colorProps:{tint: color, format:"number"},alpha: 1});
	// 			}
				
	// 		}
	// 	}
	// }

	return c;
}



function getCirFromPos(pos) {
	var c = screenContainer.children.find(c => {
		return (c.screenPos.x == pos.x && c.screenPos.y == pos.y)
	})
	return c;
}


function changeColor(pos,color) {
	var c = getCirFromPos(pos);
	if(color == 0) {
		color = c.orgColor;
	}
	var ran = Math.random()/2;
	setTimeout(function(){
		TweenMax.to(c,0.3,{colorProps:{tint: color, format:"number"}});
	},ran*1000,color);
}


function animateMase() {
	// clear();
	for (var i = 0; i < numInCol; i++) {
		for (var j = 0; j < numInRow; j++) {
			var pos = {x:j,y:i};
			if(i%4 == 1 || i%4 == 3) {
				if(j%2 == Math.round(Math.random())) {
					changeColor(pos,0xd70050);
				} else {
					changeColor(pos,0);
				}
			}
			if(i%4 == 0) {
				if(j%2 == 0) {
					changeColor(pos,0xd70050);
				} 
			} 
			if(i%4 == 2) {
				if(j%2 == 1) {
					changeColor(pos,0xd70050);
				} 
			}
		}
	}
	setTimeout(animateMase,1000);
}

//render
function render() {
    requestAnimationFrame(render);
    renderer.render(stage);
}
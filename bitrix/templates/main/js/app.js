$(window).load(function(){
	setTimeout(function(){
		$("body").addClass("show");
	}, 500);
	setTimeout(function(){
		$('.viewport').addClass('load');
		$('.pjax').addClass('complete visible');
		$("body").addClass("show");
	}, 1000);
});

function Menu(){
	var trigger = $('.navigation__trigger'),
		area = $('.navigation-area'),
		content = $('.navigation-content'),
		view = $('.viewport'),
		tl = new TimelineLite();
	tl
			.set(area, {autoAlpha: 0, visibility: 'hidden'})
			.set(content, {width: '0'})
	trigger.on('click', function(){
		var _ = $(this);
		if(_.hasClass("open-popup")) return false;
		if(!_.hasClass('open')) {
			view.addClass('return');
			tl
				.set(_, {className: '+=open'})
				.to(area, 0.2, {autoAlpha: 1, ease: Power0.easeNone})
				.to(content, 0.2, {width: '33.75rem', ease: Power0.easeNone}, 0)
				// $()
		} else {
			view.removeClass('return');
			tl
				.set(_, {className: '-=open'})
				.to(content, 0.2, {width: '0', ease: Power0.easeNone}, 0)
				.to(area, 0.2, {autoAlpha: 0, delay: 0.1, ease: Power0.easeNone})
		}

			
	});
	area.on('click', function(){
		tl
			.set(trigger, {className: '-=open'})
			.to(content, 0.2, {width: '0', ease: Power0.easeNone}, 0)
			.to(area, 0.2, {autoAlpha: 0, delay: 0.2, ease: Power0.easeNone})
		view.removeClass('return');
	});
	content.on('click', function(event){
		event.stopPropagation();
	})
};	

function menuNumbers(){
	var container = $('.navigation-layer'),
		numbers = $('.navigation-numbers'),
		list = $('.navigation-list'),
		numbersItem = $('.navigation-items'),
		numbersItemLength = +numbersItem.length,
		active = container.find('.active'),
		index = active.data('number'),
		trigger = $('.navigation__trigger'),
		area = container.parents('.navigation-area'),
		content = container.parents('.navigation-content'),
		view = $('.viewport'),
		tl = new TimelineLite();

	for(var i = 0; i <= numbersItemLength - 1; i++) {
		numbers.append('<div class="numb-item">0' + (i + 1) + '</div>')
	}

	active.addClass("under");

	var activeIndex = list.find('.active').index();
	if (activeIndex === -1) {
		activeIndex = 0;
	}
	numbers.children().eq(activeIndex).addClass('visible');

	numbersItem.on('mouseenter', function(){
		var _ = $(this),
			index = _.index();
		numbers.children().eq(index).addClass('visible').siblings().removeClass('visible');
		_.addClass("under").siblings().removeClass("under");
	});

	numbersItem.parent().on('mouseleave', function(){
		var _ = $(this),
			index = _.find('.active').index();

		if(index === -1) {
			index = 0;
		}
		numbers.children().eq(index).addClass('visible').siblings().removeClass('visible');
		_.parent().find(".active").addClass("under").siblings().removeClass("under");
	});

	tl
		.set(container, {autoAlpha: 1});

	numbersItem.on('click', function(event){
		var _ = $(this);

		_.addClass('active').siblings().removeClass('active');

		view.removeClass('return');

		tl
			.to(content, 0.2, {width: '100%', ease: Power0.easeNone})
			.to(area, 0.2, {autoAlpha: 0, ease: Power0.easeNone})

			.set(content, {width: '0', delay: 0.2})
			.set(trigger, {className: '-=open'})
			
		event.preventDefault();

	});
};

function bindMenu() {
	var numbers = $('.navigation-list');

	numbers.find(".active").addClass("under").siblings().removeClass("under");
}

function videoInit(index){
	var i = $("[data-swiper-slide-index=" + index + "]");
	if(!i.find("video").length) {
		var p = i.data("poster"),
			v = i.data("videos");
		var t = '<video muted loop="loop" poster="'+ p +'" preload="auto"><source src="' + v +'"  type="video/mp4"></video>'
		i.append(t);
	};
};
function appendVideo() {
	var i = $("[data-swiper-slide-index]");
	$.each(i, function(){
		var p = $(this).data("poster"),
			v = $(this).data("videos");
		var t = '<video muted loop="loop" poster="'+ p +'" preload="auto"><source src="' + v +'"  type="video/mp4"></video>'
		if(!$(this).find("video").length) {
			$(this).append(t);
		}
		
	});
};


var swiperVideo;
function swiperIndex(){
	if($('.rotator').length){
		var gRotator = $('.rotator').find('.swiper-container');

		var videoSettings = {
			pagination: '.rotator .pagination',
			paginationClickable: true,
			autoplay: 7000,
			speed: 1200,
			loop: true,
			noSwiping: false,
			runCallbacksOnInit: false,
			effect: 'fade',
			noSwiping: false,
			autoplayDisableOnInteraction: false,
			onInit: function(swiper) {
				videoInit($('.swiper-slide-active').data("swiper-slide-index"));
				createShadow();				
				setTimeout(function(){
					var initVideo = $('.swiper-slide-active').find('video')[0];
					initVideo.play();
					
				},100);
				setTimeout(function(){
					appendVideo();
				}, 400);
					
			},
			onSlideChangeStart: function(swiper) {
				var nextVideo = $('.swiper-slide-active').find('video')[0];
				nextVideo.play();
				bulletsShadow();
				nextPunch($('.swiper-slide-active').data('swiper-slide-index'));
				
			},
			onSlideChangeEnd: function(swiper){
				if($('.swiper-slide-prev').length) {
					var prevVideo = $('.swiper-slide-prev').find('video')[0];
					prevVideo.pause();
				};
				if($('.swiper-slide-next').length) {
					var nextVideo = $('.swiper-slide-next').find('video')[0];
					nextVideo.pause();
				};	
				slidesAutoplay();
			}
		};

		var imagesSettings = {
			pagination: '.rotator .pagination',
			paginationClickable: true,
			autoplay: 5000,
			speed: 800,
			loop: true,
			noSwiping: false,
			runCallbacksOnInit: false,
			effect: 'fade',
			onInit: function(swiper) {
				createShadow();
			},
			onSlideChangeStart: function(swiper){
				bulletsShadow();
				nextPunch($('.swiper-slide-active').data('swiper-slide-index'));
				$(".swiper-slide-active").find(".img").addClass("animateIn");

			},
			onSlideChangeEnd: function(swiper){
				slidesAutoplay();
				$(".swiper-slide-active").siblings().find(".img").removeClass("animateIn");
			},
			onProgress: function(swiper, progress){
				
			}
		};

		var imagesSettingsSingle = {
			pagination: '.rotator .pagination',
			paginationClickable: true,
			autoplay: 5000,
			loop: true,
			noSwiping: false,
			runCallbacksOnInit: false,
			effect: 'fade',
			onInit: function(swiper) {
				createShadow();
			},
			onSlideChangeStart: function(swiper, event){
				bulletsShadow();
			},
			onSlideChangeEnd: function(swiper){
				slidesAutoplay();
			}
		};

		var imagesSettingsNews = {
			pagination: '.rotator .pagination',
			paginationClickable: true,
			speed: 1200,
			loop: false,
			noSwiping: false,
			runCallbacksOnInit: false,
			parallax: true,
			onInit: function(swiper) {
				createShadow();
			},
			onSlideChangeStart: function(swiper, event){
				bulletsShadow();
			},
			onSlideChangeEnd: function(swiper){
				slidesAutoplay();
			}
		};

		if(typeof $('.rotator-video') == 'object' && $('.rotator-video').length > 0) {
			if(typeof swiperVideo == 'object') {
				swiperVideo.destroy();
			}
			setTimeout(function(){
				swiperVideo = new Swiper(gRotator, videoSettings);
			},10)
			$(window).on('resize', function(){
				swiperVideo.onResize();
				createShadow();
			});
				
		} 
		if(typeof $('.rotator-image') == 'object' && $('.rotator-image').length > 0) {
			if(typeof swiperVideo == 'object') {
				swiperVideo.destroy();
			}
			setTimeout(function(){
				swiperVideo = new Swiper(gRotator, imagesSettings);
				$(".rotator-image_item").on("click", function(){
					swiperVideo.slideNext(true, 1200);
				});
			},10)
			$(window).on('resize', function(){
				swiperVideo.onResize();
				createShadow();
			});
		};

		if(typeof $('.rotator-image_single') == 'object' && $('.rotator-image_single').length > 0) {
			if(typeof swiperVideo == 'object') {
				swiperVideo.destroy();
			}
			setTimeout(function(){
				swiperVideo = new Swiper(gRotator, imagesSettingsSingle);
				$(".rotator-image_item").on("click", function(){
					swiperVideo.slideNext(false, 1200);
				})
			},10)
			$(window).on('resize', function(){
				swiperVideo.onResize();
				createShadow();
			});
		};

		if(typeof $('.rotator-news_single') == 'object' && $('.rotator-news_single').length > 0) {
			if(typeof swiperVideo == 'object') {
				swiperVideo.destroy();
			}
			setTimeout(function(){
				swiperVideo = new Swiper(gRotator, imagesSettingsNews);
				$(".rotator-image_item").on("click", function(){
					swiperVideo.slideNext();
				})
			},10)
			$(window).on('resize', function(){
				swiperVideo.onResize();
				createShadow();
			});
		};
		
		function slidesAutoplay() {
			swiperVideo.stopAutoplay();
			swiperVideo.params.autoplay = 7000;
			swiperVideo.startAutoplay();
		}
		
		function bulletsShadow() {
			if($('.swiper-pagination-bullet-active').length) {
				var left = $('.swiper-pagination-bullet-active').position().left;
				$('.pagination').find('.shadow').css('left', left + 6);
			}
		};
		var time;
		$(window).on("resize", function(){
			clearTimeout(time);
			time = setTimeout(function(){
				createShadow()
				bulletsShadow()
			}, 10);
			
		});

		function createShadow() {
			if($('.rotator .swiper-pagination-bullet').length === 1) {
				$('.rotator .pagination').css('display', 'none');
			}	
			$('.pagination').append('<div class="shadow"></div>')
		};
	};
};

function initPunch() {
	var rotator = $('.punchline-rotator');

	rotator.each(function(){
		var _ = $(this),
			item = _.find('.item'),
			fItem = item.first(),
			tl = new TimelineLite();

		tl	
			.set(item, {y: '25px', className: '-=active', zIndex: 1, autoAlpha: 0})
			.set(fItem, {y: '0px', autoAlpha: 1, className: '+=active', zIndex: 4})		
	});
};

function nextPunch(item){
	var rotator = $('.punchline-rotator');

	rotator.each(function(){
		var textOut = $(this).find('.item').eq(item),
			textIn = textOut.siblings('.item'), 
			delay;

		if ($(this).hasClass('punchline-top')){
			delay = 0.1;
		} else {
			delay = 0.2;
		}

		slideText(textOut, textIn, delay);
	}) 
};

function slideText(textOut, textIn, delay) {
	var tl = new TimelineLite(),
		$first = $('.item:first-of-type');

	if(textIn.length !== 0) {
		tl
			.set(textOut, {y: '25px', className: '+=active', zIndex: 4, delay: delay})
			.set(textIn, {className: '-=active', zIndex: 1, delay: delay})

			.to(textOut, 0.3, {y: '-=25px', autoAlpha: 1, ease: Power0.easeNone, delay: delay}, 0)
			.to(textIn, 0.3, {y: '-=50px', autoAlpha: 0, ease: Power0.easeNone, zIndex: 1, delay: 0}, 0)

			.set(textIn, {delay: 0, y: '25px'})
	} 
	// else {
	// 	tl
	// 		.set($first, {y: '50px', autoAlpha: 0, className: '+=active', zIndex: 4})
	// 		.set(textOut, {className: '-=active', zIndex: 1, autoAlpha: 1})

	// 		.to($first, 0.4, {y: '-=50px', autoAlpha: 1, ease: Power0.easeNone, delay: delay}, 0)
	// 		.to(textOut, 0.4, {y: '-=50px', autoAlpha: 0, zIndex: 1, ease: Power0.easeNone, delay: delay}, 0)

	// 		.set(textOut, {delay: 1, y: '50px'})
	// }
};

function initMap() {
	$(window).bind(initialize());
};

function ZoomControl(controlDiv, map) {
	controlDiv.style.padding = "20px 35px";

	var controlWrapper = document.createElement('div');
		controlWrapper.style.cursor = 'pointer';
		controlWrapper.style.textAlign = 'center';
		controlWrapper.style.width = '25px'; 
		controlWrapper.style.height = '50px';
		controlDiv.appendChild(controlWrapper);

	var zoomInButton = document.createElement('div');
		zoomInButton.classList.add("zoomIn");
		zoomInButton.style.width = '25px'; 
		zoomInButton.style.height = '25px';
		controlWrapper.appendChild(zoomInButton);

	var zoomOutButton = document.createElement('div');
		zoomOutButton.classList.add("zoomOut");
		zoomOutButton.style.width = '25px'; 
		zoomOutButton.style.height = '25px';
		controlWrapper.appendChild(zoomOutButton);

	google.maps.event.addDomListener(zoomInButton, 'click', function() {
		map.setZoom(map.getZoom() + 1);
	});

	google.maps.event.addDomListener(zoomOutButton, 'click', function() {
		map.setZoom(map.getZoom() - 1);
	});
}

function initialize(){
	var stylez = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"lightness":"13"},{"color":"#30070c"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ec1235"},{"lightness":"-44"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#d66776"},{"lightness":"-33"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#aa3838"},{"lightness":"-41"},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#a71623"},{"lightness":"-26"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#821620"},{"lightness":"-23"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"color":"#821620"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ca1a30"},{"lightness":"-34"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#570f11"},{"lightness":"-27"},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#a01628"},{"lightness":"-41"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#800516"},{"lightness":"-22"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#711214"},{"lightness":"-29"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#590c15"},{"lightness":"0"}]}];
	var mapOptions = {
		zoom: 14,
		disableDefaultUI: true,
		scrollwheel: false,
		panControl: false,
		zoomControl: false,
		scaleControl: true,
		center: new google.maps.LatLng(55.872686, 37.43495)
	};

	map = new google.maps.Map(document.getElementById('maps'), mapOptions);
	var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });
	map.mapTypes.set('tehgrayz', mapType);
	map.setMapTypeId('tehgrayz');
	var image = '../img/icons/baloon.png';
	var myLatLng = new google.maps.LatLng(55.872686, 37.43495);
	var beachMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image,
		title:""
	});

	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center); 
	});

	var zoomControlDiv = document.createElement('div');
  	var zoomControl = new ZoomControl(zoomControlDiv, map);

  	zoomControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);

};

function gMaps(){
	var sct_tag = document.createElement("script");
	if(typeof(google) != 'object') {
		sct_tag.setAttribute("type", "text/javascript");
		sct_tag.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyCcDrkEbKdrAWUT7ZorYyn-NwTj9YD6DN4&callback=initMap");
		$(".maps").parent().append(sct_tag);
	}
	else {
		$(initialize);
	}
};


function initMapAnimate() {
	var pull = new AnimatedMap;		
	pull.init();
};


function gMapsAnimated(){
	var sct_tag = document.createElement("script");
	if(typeof(google) != 'object') {
		sct_tag.setAttribute("type", "text/javascript");
		sct_tag.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyCcDrkEbKdrAWUT7ZorYyn-NwTj9YD6DN4&callback=initMapAnimate");
		$(".map-logistic").append(sct_tag);
	}
	else {
		var pull = new AnimatedMap;		
		pull.init();
	}
};

var AnimatedMap = function(){
	var pins,
		projection,
		sw, ne,
		gmap,
		place,
		pins,
		interval;

	MapOverlay.prototype = new google.maps.OverlayView();

	function MapOverlay(bounds, map, pointStart) {
		this.bounds_ = bounds;
		this.svg_ = null;
		this.pointStart_ = pointStart;
		this.setMap(gmap);
	};

	MapOverlay.prototype.onAdd = function(){
		var svg = document.createElement("svg");

		svg.setAttribute("id","svg");
		this.svg_ = svg;

		var panes = this.getPanes();
		panes.overlayLayer.appendChild(svg);
	};

	MapOverlay.prototype.draw = function(){
		projection = this.getProjection();

		sw = projection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
		ne = projection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

		var svg = this.svg_;

		svg.style.left = sw.x + "px";
		svg.style.top = ne.y + "px";
		svg.style.width = ne.x - sw.x + "px";
		svg.style.height = sw.y - ne.y + "px";

		runTracers();
	};

	function runTracers() {
		var paper = SVG("svg");

		trace = {};

		var i = 0;

		if(interval) clearInterval(interval);

		interval = setInterval(function(){
			pins = _.shuffle(pins);

			if(typeof(pins[0].color) == 'undefined') {
				console.log(pins);
			}
			if(typeof(pins[1].color) == 'undefined') {
				console.log(pins)
			}

			trace.from = pins[0].coord.split(',');
			trace.to = pins[1].coord.split(',');

			if(trace.from[1] < trace.to[1]) {
				trace.colorStart = pins[0].color;
				trace.colorEnd = pins[1].color;
			} else {
				trace.colorStart = pins[1].color;
				trace.colorEnd = pins[0].color;
			}

			trace.side = 1

			var pfLatLng = new google.maps.LatLng(trace.from[0], trace.from[1]),
				ptLatLng = new google.maps.LatLng(trace.to[0], trace.to[1]);

			var pfProj = projection.fromLatLngToDivPixel(pfLatLng),
				ptProj = projection.fromLatLngToDivPixel(ptLatLng);

			var pfPaper = convertToPaperCoord(pfProj),
				ptPaper = convertToPaperCoord(ptProj);	

			trace.gradOffset = pfPaper.x > pfPaper.x ? 1.1 : 0.1;

			try {
				var gradient = paper.gradient('linear', function(stop) {
					stop.at({
						offset: 0,
						color: trace.colorStart,
						opacity: trace.gradOffset
					})
					stop.at({
						offset: 1,
						color: trace.colorEnd,
						opacity: 1.1 - trace.gradOffset
					})
				});

				var path = "M"+ pfPaper.x+","+pfPaper.y+" A"+500+","+500+" 0,0,"+trace.side+" "+ptPaper.x+","+ptPaper.y;

				paper.path(path)
					.stroke("#e77c13")
					.fill("none")
					.drawAnimated({
						duration: 5000
					})
			} catch(e) {

			}

		}, 2000)

		function convertToPaperCoord(point) {
			var nPoint = {};
			nPoint.x = point.x - sw.x;
			nPoint.y = point.y - ne.y

			return nPoint;
		}
	};

	// return {
	this.init = function(){
		var map = document.getElementById("l-map");

		var swBound = new google.maps.LatLng(-45.584621,-144.889331);
		var neBound = new google.maps.LatLng(71.397641,135.965568);

		var center = new google.maps.LatLng(23.3172593,-1.0899557);
		var zoom = 3;
		var stylez = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"lightness":"13"},{"color":"#30070c"},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#ec1235"},{"lightness":"-44"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#d66776"},{"lightness":"-33"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#aa3838"},{"lightness":"-41"},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#a71623"},{"lightness":"-26"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#821620"},{"lightness":"-23"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"color":"#821620"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ca1a30"},{"lightness":"-34"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#570f11"},{"lightness":"-27"},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#a01628"},{"lightness":"-41"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#800516"},{"lightness":"-22"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#711214"},{"lightness":"-29"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#590c15"},{"lightness":"0"}]}];
	
		pins = JSON.parse($(".pins").html());

		var mapOptions = {
			zoom: zoom,
			center: center,
			disableDefaultUI: true,
			scrollwheel: false,
			panControl: false,
			zoomControl: false,
			scaleControl: true
		};

		gmap = new google.maps.Map(map, mapOptions);
		var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });
		gmap.mapTypes.set('tehgrayz', mapType);
		gmap.setMapTypeId('tehgrayz');

		// $.each(pins, function(ind, obj){
		// 	var coords = obj.coord.split(',');

		// 	new google.maps.Marker({
		// 		position: new google.maps.LatLng(coords[0], coords[1]),
		// 		map: gmap
		// 	});
		// })

		google.maps.event.addListenerOnce(gmap, 'tilesloaded', function () {
			$('.l-map').addClass('animated');
			var bounds = new google.maps.LatLngBounds(swBound, neBound);
			overlay = new MapOverlay(bounds);
		});

		google.maps.event.addDomListener(window, "resize", function() {
			var center = gmap.getCenter();
			google.maps.event.trigger(gmap, "resize");
			gmap.setCenter(center); 
		});

	}
	// }
};

function imgFader(){
	var fader = $(".products-fader"),
		imgFader = fader.find(".imgFader"),
		itemFader = fader.find(".itemFader"),
		timer;

	itemFader.on("mouseenter", "a", function(){
		
		setIndex($(this).index());
	});

	itemFader.on("mouseleave", "a", function(){
		clearTimeout(timer);
	});

	function setIndex(index) {
		timer = setTimeout(function(){
			imgFader.find(".img").eq(index).fadeIn(350).siblings().fadeOut(350);
		},200);
	}
};

function cycleRotator() {
	$('.cycle').slick({
		autoplay: true,
		slidesToShow: 10,
		slidesToScroll: 1,
		autoplaySpeed: !0,
		arrows: false,
		speed: 3500, 
		infinite: true,
		cssEase: 'linear',
		vertical: true,
		adaptiveHeight: true
	});
}

function accordion() {
	var accordion = $('.accordion').find('.head');

	accordion.each(function(){
		var _ = $(this),
			parent = _.parent(),
			container = parent.find('.container');

		_.on('click', function(){
			if($(this).hasClass('open')) {
				container.stop(true,true).slideUp(300);
				$(this).removeClass('open');
			} else {
				container.stop(true,true).slideDown(300);
				$(this).addClass('open');
				$(this).parents('.news-item').siblings().find('.container').slideUp(300);
				$(this).parents('.news-item').siblings().find('.head').removeClass('open');

			}
		})
	});
}

var transitionsEvents = {
	'WebkitTransition': 'webkitTransitionEnd',
	'MozTransition': 'transitionend',
	'OTransition': 'oTransitionEnd',
	'msTransition': 'MSTransitionEnd',
	'transition': 'transitionend'
},
transitionsEvent = transitionsEvents[Modernizr.prefixed("transition")],
support = { transitions : Modernizr.csstransitons };
function extend( a, b ) {
	for( var key in b ) { 
		if( b.hasOwnProperty( key ) ) {
			a[key] = b[key];
		}
	}
	return a;
}

function stepForm(el, options) {
	this.el = el
	this.options = extend( {}, this.options );
  	extend( this.options, options );
	this._init();
};

stepForm.prototype.options = {
	onSubmit : function() {
		return false;
	}
}

stepForm.prototype._init = function () {
	this.current = 0

	this.quest = [].slice.call($(this.el).find("ol.form-area > li"));
	this.questCount = this.quest.length

	$(this.quest[0]).addClass("current");

	this.btnNext = $(this.el).find(".next");

	this.progress = $(this.el).find(".progress");

	this.questStatus = $(this.el).find(".pagin");
	this.currentNum = $(this.el).find(".pagin-current");
	$(this.currentNum).text("0" + (this.current + 1));

	this.totalNum = $(this.el).find(".pagin-total");
	$(this.totalNum).text("0" + this.questCount);

	this.error = $(this.el).find(".error-message");

	this.crossClose = $(".open-popup");
	this.close = $(".overlay");
 
	this._initEvents();

};

stepForm.prototype._initEvents = function(){
	var self = this;

	firstEL = $(this.quest[this.current]).find("input");

	focusStartFn = function(){
		// firstEL.unbind("focus", focusStartFn);
		$(self.btnNext).addClass("show");
	};

	firstEL.on("focus", focusStartFn);

	this.btnNext.on("click", function(ev){
		ev.preventDefault();
		self._nextStep();
	});

	this.crossClose.add(this.close).on("click", function(ev){
		ev.preventDefault()
		setTimeout(function(){
			self._close();
		}, 300);
	});

	firstEL.on("keydown", function(ev){
		var codeKey = ev.keyCode;

		if(codeKey === 13) {
			ev.preventDefault();
			self._nextStep();
		}
	});

	$(this.el).on("keydown", function(ev){
		var codeKey = ev.keyCode;

		if(codeKey === 9) {
			ev.preventDefault();
		}
	});
};

stepForm.prototype._nextStep = function(){

	if(!this._validate()) {
		return false;
	}

	if(this.current === this.questCount - 1) {
		this.isFilled = true;
	}

	this._clearError();

	var currentQuest = this.quest[this.current];

	++this.current;

	this._progress();

	if(!this.isFilled){

		this._updateNumbers();

		$(this.el).find(".form-container__inner").addClass("show-next");

		var nextQuest = this.quest[this.current];

		$(currentQuest).removeClass("current");
		$(nextQuest).addClass("current");
	};


	var self = this,
		onTransitionsEventFn = function(ev){
			if( support.transitions ) {
				$(this).unbind(transitionsEvent, onTransitionsEventFn);
			}
		
			if(self.isFilled) {
				self._submit()
			} else {
				$(self.el).find(".form-container__inner").removeClass("show-next");

				$(self.currentNum).text($(self.nextQuestNum).text());

				$(self.questStatus).find(self.nextQuestNum).remove();
				$(nextQuest).find("input").focus();
			}
		};
	if(support.transition) {
		$(this.progress).on(transitionsEvent, onTransitionsEventFn);
	} else {
		onTransitionsEventFn();
	}
};

stepForm.prototype._progress = function(){
	$(this.progress).css("width", this.current * (100 / this.questCount) + "%")
};

stepForm.prototype._updateNumbers = function(){
	this.nextQuestNum = document.createElement("span");
	$(this.nextQuestNum).addClass("pagin-next");
	$(this.nextQuestNum).text("0" + (this.current + 1));

	$(this.questStatus).append(this.nextQuestNum);
};

stepForm.prototype._submit = function(){
	this.options.onSubmit(this.el);
};

stepForm.prototype._validate = function(){
	var input = $(this.quest[ this.current ]).find("input").data("validation"),
		val = $(this.quest[ this.current ]).find("input").val();
	if(val === "") {
		this._showError("EMPTYSTR");
		return false;
	}

	return true;
};

stepForm.prototype._showError = function(err){
	var message = "";
	switch(err) {
		case "EMPTYSTR" :
			message = "Please fill the field before continuing";
			break;
		case "COMBINESTR" :
			message = "Please correct e-mail or phone";
			break;
	};
	$(this.error).text(message);
	$(this.error).addClass("show");
};

stepForm.prototype._clearError = function(){
	$(this.error).removeClass("show");
}

stepForm.prototype._close = function(){
	this.current = 0
	$(this.el).trigger("reset");
	$(".form-container__inner").removeClass("hide");
	$(".final-message").removeClass("show");
	$(this.quest[0]).addClass("current").siblings().removeClass("current");
	$(this.progress).css("width", "0");
	$(this.currentNum).text("0" + (this.current + 1));
	this.isFilled = false;
	$(this.btnNext).removeClass("show");
}

window.stepForm = stepForm;

$(document).ready(function () {
	// function Direction() {
	// 	$('.viewport').mousewheel(function(event) {
	// 		if(event.deltaY === 1) {
	// 			if($(this).hasClass("return") || $('#pager-top').hasClass('inactive')) return false;
	// 			//up
	// 			$('#pager-top').trigger('click');
	// 			trigger.animTop($('#pager-top'));
	// 		} else {
	// 			if($(this).hasClass("return") || $('#pager-bottom').hasClass('inactive')) return false;
	// 			//down
	// 			$('#pager-bottom').trigger('click');
	// 			trigger.animBottom($('#pager-bottom'));
	// 		}
	// 		$(this).addClass('return')
	// 	});
	// };
	// Direction();
	function scrollEvent() {
		var curCount = 0,
			lastTime = 0,
			minCount = 5,
			minTime = 500,
			lastDir = false;

		$(window).on('DOMMouseScroll mousewheel', scrollEvent);

		function scrollEvent(e) {

			var curTime = e.timeStamp,
				curDirection = e.originalEvent.deltaY;

			if(((curTime - lastTime) < minTime) || !lastTime) {

				if(!lastDir || curDirection*lastDir > 0  ) {
					lastDir = curDirection;
					lastTime = curTime;
					curCount++;
				}	
				else {
					curCount = 1;
					lastTime = curTime;
					lastDir = curDirection;
				}

			}
			else {
				curCount = 0;
				lastTime = 0;
			}

			if(curCount >= minCount) {

				if(curDirection > 0) {
					if($('.viewport').hasClass("return") || $('#pager-bottom').hasClass('inactive')) return false;
					pressNext();
				} else {		
					if($('.viewport').hasClass("return") || $('#pager-top').hasClass('inactive')) return false;			
					pressPrev();
				}

				resetScroll();
			}
		};

		function pressNext() {
			
			$('#pager-bottom').trigger('click');
			trigger.animBottom($('#pager-bottom'));
			$('.viewport').addClass('return');
			
		};

		function pressPrev() {
			
			$('#pager-top').trigger('click');
			trigger.animTop($('#pager-top'));
			$('.viewport').addClass('return');
			
		}

		function resetScroll() {
			curCount = 0;
			lastTime = 0;
			lastDir = false
		};
	}
	scrollEvent();

	function btnEvents() {
		$(document).on("keydown", function(e){
			var key = e.which || e.charCode;

			if($.inArray(+key, [37, 38, 40]) != -1) {
				if(+key == 40) {
					if($('.viewport').hasClass("return") || $('#pager-bottom').hasClass('inactive')) return false;
					$('#pager-bottom').trigger('click');
					trigger.animBottom($('#pager-bottom'));
					$('.viewport').addClass('return');
				}

				else if(+key == 38) {
					if($('.viewport').hasClass("return") || $('#pager-top').hasClass('inactive')) return false;	
					$('#pager-top').trigger('click');
					trigger.animTop($('#pager-top'));
					$('.viewport').addClass('return');
				}

				else if(+key == 37) {
					$('#pager-left').trigger('click');
					trigger.animLeft($('#pager-left'));
					$('.viewport').addClass('return');
				};
				e.preventDefault();
			}

			
		});
	} btnEvents();

	Menu();
	menuNumbers();
	
	function loadProject(link) {
		var l = $(link).attr('href');
		$.ajax({
			url: l,
			dataType:"html",
			beforeSend: function(){
				loaders(link);
			},
			success: function(b){
				var h = $(b).find('#container');
				window.history.pushState("page" + l, l, l);
				window.history.replaceState("page" + l, l, l);
				setTimeout( function(){
					$('.pjax').html(h).promise().done(function(){
						setTimeout(function(){
							var v = $('video');							
							if(v.length) {
								v.get(0).addEventListener('loadeddata', function() {
									setTimeout(function(){
										$("body").addClass("show").removeClass("animation");
									}, 600);								
									setTimeout(function(){
										$('.pjax').removeClass('loading').addClass('complete visible');
										
									}, 1000);	
									setTimeout(function(){
										$('.viewport').removeClass('return');
									}, 1800);
								});
							} else {
								setTimeout(function(){
									$("body").addClass("show").removeClass("animation");
								}, 600);								
								setTimeout(function(){
									$('.pjax').removeClass('loading').addClass('complete visible');
									if(h.data('logistics')) {
										$('.viewport').addClass('logistics');
									} else {
										$('.viewport').removeClass('logistics');
									};
									;
								}, 1000);
								setTimeout(function(){
									$('.viewport').removeClass('return');
								}, 1800);
								bindMenu();
								$(window).trigger('load'); 
							};
						},100);
					});
					replaceNav(h);
					replaceAttr(b);
				},700);
			}
		});
	};

	function loaders(link) {
		if($(link).is("[data-ajax]")) {
			var ajaxName = $(link).data("ajax");

			$('body').addClass("animation");

		} else {
			setTimeout(function(){
				$("body").removeClass("show");
			},400);
				$('.pjax').addClass('loading').removeClass('complete visible');
				$('.viewport').removeClass('logistics');
		}			
	};

	$(window).bind("popstate", function(e) {
		var newPageArray = window.location.pathname;
		loadProject('<a href="' + newPageArray + '"></a>')
	});


	$('body').on('click','.ajaxtrigger', function(event){
		loadProject($(this));
		if($(this).hasClass("pager__item-left")) {
			trigger.animLeft($("#pager-left"));
		}
		$('.viewport').addClass("return");
		event.preventDefault();
	});
	$('.navigation-items').on('click', function(event){
		loadProject($(this));
		$('.viewport').addClass("return");
		event.preventDefault();
	});
	function replaceNav(h) {
		if( $(h).hasClass('inner') ) {
			$('.page-navigation').addClass('hidden');
			setTimeout(function(){
				$('.page-navigation').find('.pager__item').addClass('inactive');
			}, 300)
		} else {
			$('.page-navigation').removeClass('hidden');
			if(!$('.page-navigation').find('.pager__item').attr('href') === ''){
				$('.page-navigation').find('.pager__item').removeClass('inactive');
			}
			
		}
	} replaceNav($('#container'));

	function replaceAttr(b) {
		var top = $(b).find('#pager-top'),
			bottom = $(b).find('#pager-bottom'),
			topHref = top.attr('href'),
			bottomHref = bottom.attr('href'),
			topClass = top.attr('class'),
			bottomClass = bottom.attr('class'),
			curTop = $('#pager-top'),
			curBottom = $('#pager-bottom'),
			list = $(b).find('.navigation-list'),
			r = list.find('.active').index(),
			curlist = $('.navigation-list');

		curTop.attr('href', topHref).attr('class', topClass);
		curBottom.attr('href', bottomHref).attr('class', bottomClass);
			
		curlist.find('.navigation-items').eq(r).addClass('active').siblings().removeClass('active');
		curlist.prev().find('.numb-item').eq(r).addClass('visible').siblings().removeClass('visible');
	};

	function naviTrigger(trigger) {
		var _ = this;

		_.init = function(){

			trigger.on('mouseup', function(e){
				console.log(e.type)
				var $this = $(this),
					id = $this.attr('id');

				if(id === 'pager-top') {
					_.animTop($('#' + id));
				};

				if(id === 'pager-left') {
					_.animLeft($('#' + id));
				};

				if(id === 'pager-bottom'){
					_.animBottom($('#' + id));
				}
				e.preventDefault();
			});

		};
		_.animTop = function(item){
			var _ = item,
				tl = new TimelineLite();

			tl
				.set(_, {y: 0})
				.to(_, 0.1, {y: '-10px', ease: Power0.easeNone}, 0)
				.to(_, 0.1, {y: 0, delay: 0.1, ease: Power0.easeNone})
		};
		_.animBottom = function(item){
			var _ = item,
				tl = new TimelineLite();

			tl
				.set(_, {y: 0})
				.to(_, 0.1, {y: '10px', ease: Power0.easeNone}, 0)
				.to(_, 0.1, {y: 0, delay: 0.1, ease: Power0.easeNone})
		}
		_.animLeft = function(item){
			var _ = $(item),
				i = _.find("i");
				tl = new TimelineLite();

			tl
				.set(i, {x: 0})
				.to(i, 0.1, {x: '-10px', ease: Power0.easeNone}, 0)
				.to(i, 0.1, {x: 0, delay: 0.1, ease: Power0.easeNone})
		}
		_.init();
	};

	var trigger = $('.pager__item');
	trigger = new naviTrigger(trigger);


	function cap() {
		if(head.mobile) {
			$('.cap').show()
		}
	} cap();

	$('body').on("click", "[data-popup]",  function(){
		popups($(this).data("popup"));
	});

	function popups(popup) {
		var pContainer = $("[data-popupWrapper="+ popup +"]"),
			close = $(".navigation__trigger"),
			overlay = $(".overlay"),
			w = $("columns").width(),
			tl = new TimelineLite();

		showOverlay();

			TweenLite.set(close, {className: '+=open open-popup'})
			TweenLite.set($(".viewport"), {className: "+=return"})

			TweenLite.to(pContainer, 0.5, {y: '105%', ease: Power3.easeInOut, onComplete:onComplete});

		overlay.add($(".open-popup")).on("click", function(){
			hideOverlay()
				TweenLite.set(close, {className: '-=open open-popup'})
				TweenLite.set($(".viewport"), {className: "-=return"})
				TweenLite.to(pContainer, 0.5, {y: '-105%', ease: Power3.easeInOut});
		});
		function onComplete() {
			setTimeout(function(){
				pContainer.find(".current input").focus();
			}, 200);
		}
	};

	function showOverlay(){
		var o = $(".overlay");
		TweenLite.to(o, 0.5, {autoAlpha: 1, ease: Power3.easeInOut});
	};

	function hideOverlay(){
		var o = $(".overlay");
		
		TweenLite.to(o, 0.5, {autoAlpha: 0, ease: Power3.easeInOut});
	}

});
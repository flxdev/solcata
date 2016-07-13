$(window).load(function(){
	setTimeout(function(){
		$('.viewport').addClass('load');
		$('.pjax').addClass('complete visible');
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
		view.addClass('return');
		if(!_.hasClass('open')) {
			tl
				.set(_, {className: '+=open'})
				.to(area, 0.3, {autoAlpha: 1, ease:Power3.easeInOut})
				.to(content, 0.3, {width: '540px', ease:Power3.easeInOut}, 0)
		} else {
			tl
				.set(_, {className: '-=open'})
				.to(content, 0.3, {width: '0', ease:Power3.easeInOut}, 0)
				.to(area, 0.3, {autoAlpha: 0, delay: 0.2, ease:Power3.easeInOut})
		}

			
	});
	area.on('click', function(){
		tl
			.set(trigger, {className: '-=open'})
			.to(content, 0.3, {width: '0', ease:Power3.easeInOut}, 0)
			.to(area, 0.3, {autoAlpha: 0, delay: 0.2, ease:Power3.easeInOut})
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
		numbers.append('<div class="numb-item">0' + (i +1) + '</div>')
	}

	var activeIndex = list.find('.active').index();
	if (activeIndex === -1) {
		activeIndex = 0;
	}
	numbers.children().eq(activeIndex).addClass('visible');

	numbersItem.on('mouseenter', function(){
		var _ = $(this),
			index = _.index();
		numbers.children().eq(index).addClass('visible').siblings().removeClass('visible');
	});

	numbersItem.parent().on('mouseleave', function(){
		var _ = $(this),
			index = _.find('.active').index();
			if(index === -1) {
				index = 0;
			}
		numbers.children().eq(index).addClass('visible').siblings().removeClass('visible');
	});

	tl
		.set(container, {autoAlpha: 1});

	numbersItem.on('click', function(event){
		var _ = $(this);

		_.addClass('active').siblings().removeClass('active');

		view.removeClass('return');

		tl
			.to(content, 0.5, {width: '100%', ease:Power3.easeInOut})
			.to(area, 0.5, {autoAlpha: 0, ease:Power3.easeInOut})

			.set(content, {width: '0', delay: 0.5})
			.set(trigger, {className: '-=open'})

		event.preventDefault();

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
			onInit: function(swiper) {
				createShadow();
				var initVideo = $('.swiper-slide-active').find('video')[0];
				setTimeout(function(){
						initVideo.play();

				},10);
				
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
			}
		};

		var imagesSettings = {
			pagination: '.rotator .pagination',
			paginationClickable: true,
			autoplay: 5000,
			speed: 1200,
			loop: true,
			noSwiping: false,
			runCallbacksOnInit: false,
			effect: 'fade',
			onInit: function(swiper) {
				createShadow();
			},
			onSlideChangeStart: function(swiper, event){
				bulletsShadow();
				nextPunch($('.swiper-slide-active').data('swiper-slide-index'));
			}
		};

		var imagesSettingsSingle = {
			pagination: '.rotator .pagination',
			paginationClickable: true,
			autoplay: 5000,
			speed: 1200,
			loop: true,
			noSwiping: false,
			runCallbacksOnInit: false,
			effect: 'fade',
			onInit: function(swiper) {
				createShadow();
			},
			onSlideChangeStart: function(swiper, event){
				bulletsShadow();
			}
		};

		if(typeof $('.rotator-video') == 'object' && $('.rotator-video').length > 0) {
			if(typeof swiperVideo == 'object') {
				swiperVideo.destroy();
			}
			setTimeout(function(){
				swiperVideo = new Swiper(gRotator, videoSettings);
			},10)
				
		} 
		if(typeof $('.rotator-image') == 'object' && $('.rotator-image').length > 0) {
			if(typeof swiperVideo == 'object') {
				swiperVideo.destroy();
			}
			setTimeout(function(){
				swiperVideo = new Swiper(gRotator, imagesSettings);
			},10)
			
		};

		if(typeof $('.rotator-image_single') == 'object' && $('.rotator-image_single').length > 0) {
			if(typeof swiperVideo == 'object') {
				swiperVideo.destroy();
			}
			setTimeout(function(){
				swiperVideo = new Swiper(gRotator, imagesSettingsSingle);
			},10)
			
		};
		

		if($('.rotator .pagination span').length === 1) {
			$('.rotator .pagination').css('display', 'none');
		}
		function bulletsShadow() {
			if($('.swiper-pagination-bullet-active').length) {
				var left = $('.swiper-pagination-bullet-active').position().left;
				$('.pagination').find('.shadow').css('left', left + 6);
			}
		};

		function createShadow() {
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
			delay = 0;
		} else {
			delay = 0.1;
		}

		slideText(textOut, textIn, delay);
	}) 
};

function slideText(textOut, textIn, delay) {
	var tl = new TimelineLite(),
		$first = $('.item:first-of-type');

	if(textIn.length !== 0) {
		tl
			.set(textOut, {y: '25px', autoAlpha: 0, className: '+=active', zIndex: 4})
			.set(textIn, {className: '-=active', zIndex: 1, autoAlpha: 1, delay: delay})

			.to(textOut, 0.5, {y: '-=25px', autoAlpha: 1, ease: Power0.easeNone, delay: delay}, 0)
			.to(textIn, 0.3, {y: '-=50px', autoAlpha: 0, ease: Power0.easeNone, zIndex: 1, delay: delay}, 0)

			.set(textIn, {delay: 0.5, y: '25px'})
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


$(document).ready(function () {
	function Direction() {
		$('.viewport').mousewheel(function(event) {
			if(event.deltaY === 1) {
				if($(this).hasClass("return") || $('#pager-top').hasClass('inactive')) return false;
				//up
				$('#pager-top').trigger('click');
				trigger.animTop($('#pager-top'));
			} else {
				if($(this).hasClass("return") || $('#pager-bottom').hasClass('inactive')) return false;
				//down
				$('#pager-bottom').trigger('click');
				trigger.animBottom($('#pager-bottom'));
			}
			$(this).addClass('return')
		});
	};
	Direction();
	Menu();
	menuNumbers();
	function loadProject(link) {
		$.ajax({
			url: link,
			dataType:"html",
			beforeSend: function(){
				$('.pjax').addClass('loading').removeClass('visible');
				//setTimeout(function(){
					$('.pjax').removeClass('complete')
				//},1000);
			},
			success: function(b){
				var h = $(b).find('#container');
				window.history.replaceState("page" + link, link, link);
				setTimeout( function(){	
					$('.pjax').html(h);
					replaceNav(h);
					replaceAttr(b);
					
					setTimeout(function(){
						$('.pjax').removeClass('loading').addClass('complete visible');
					}, 1000);
					setTimeout(function(){
						$('.viewport').removeClass('return');
					}, 2000);
				},1000);
			}
		});
	};

	$('body').on('click','.ajaxtrigger', function(event){
		console.log(true)
		loadProject($(this).attr('href'));

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
			$('.page-navigation').find('.pager__item').removeClass('inactive');
		}
	} replaceNav($('#container'))

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
	}

	function naviTrigger(trigger) {
		var _ = this;

		_.init = function(){

			trigger.on('click', function(e){
				var $this = $(this),
					id = $this.attr('id');

				if(id === 'pager-top') {
					_.animTop($('#' + id));
				} else {
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
				.to(_, 0.2, {y: '-10px', ease:Circ.easeOut}, 0)
				.to(_, 0.2, {y: 0, delay: 0.2, ease:Circ.easeOut})
		};
		_.animBottom = function(item){
			var _ = item,
				tl = new TimelineLite();

			tl
				.set(_, {y: 0})
				.to(_, 0.2, {y: '10px', ease:Circ.easeOut}, 0)
				.to(_, 0.2, {y: 0, delay: 0.2, ease:Circ.easeOut})
		}
		_.init();
	};

	var trigger = $('.pager__item');
	trigger = new naviTrigger(trigger);
	

})
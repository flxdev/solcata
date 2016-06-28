$(window).load(function(){
	setTimeout(function(){
		$('.viewport').addClass('load');
		$('.pjax').addClass('complete');
	}, 1000);
});
$(document).ready(function () {

	function Menu(){
		var trigger = $('.navigation__trigger'),
			area = $('.navigation-area'),
			content = $('.navigation-content'),
			tl = new TimelineLite();
		tl
				.set(area, {autoAlpha: 0, visibility: 'hidden'})
				.set(content, {width: '0'})
		trigger.on('click', function(){
			var _ = $(this);
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
		});
		content.on('click', function(event){
			event.stopPropagation();
		})
	}
	Menu();

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
			tl = new TimelineLite();

		for(var i = 0; i <= numbersItemLength - 1; i++) {
			numbers.append('<div class="numb-item">0' + (i +1) + '</div>')
		}

		var activeIndex = list.find('.active').index();
		numbers.children().eq(activeIndex).addClass('visible');




		numbersItem.on('mouseenter', function(){
			var _ = $(this),
				index = _.index();
			numbers.children().eq(index).addClass('visible').siblings().removeClass('visible');
		});

		numbersItem.parent().on('mouseleave', function(){
			var _ = $(this),
				index = _.find('.active').index();
			numbers.children().eq(index).addClass('visible').siblings().removeClass('visible');
		});

		tl
			.set(container, {autoAlpha: 1});

		numbersItem.on('click', function(){
			var _ = $(this);

			_.addClass('active').siblings().removeClass('active');

			tl
				.to(content, 0.5, {width: '100%', ease:Power3.easeInOut})
				.to(area, 0.5, {autoAlpha: 0, ease:Power3.easeInOut})

				.set(content, {width: '0', delay: 0.5})
				.set(trigger, {className: '-=open'})

			return false;

		});

	} menuNumbers();

	function Direction() {
		$('.viewport').mousewheel(function(event) {
			if(event.deltaY === 1) {
				if($(this).hasClass("return")) return false
				//console.log('up')
			} else {
				if($(this).hasClass("return")) return false
				//console.log('down')
			}
			//$(this).addClass('return')
		});
	} Direction();


	function swiperIndex(){
		var video = $('.rotator-video').find('.swiper-container');
		
		var swiperVideo = new Swiper(video, {
			pagination: '.rotator-video .pagination',
			paginationClickable: true,
			autoplay: 7000,
			loop: true,
			noSwiping: false,
			// allowSwipeToNext: false,
			onInit: function(swiper) {
				var initVideo = $('.swiper-slide-active').find('video')[0];
				setTimeout(function(){
					if($('video')) {
						initVideo.play()
					}
				},1000);
				createShadow();
				initPunch();
			},
			onTransitionStart: function(swiper) {
				var nextVideo = $('.swiper-slide-active').find('video')[0];
					if($('video').length) {
						nextVideo.play();
					}
				bulletsShadow();
				nextPunch($('.swiper-slide-active').data('swiper-slide-index'));
				//slideText($('.swiper-slide-prev').data('swiper-slide-index'), $('.swiper-slide-active').data('swiper-slide-index'), $('.swiper-slide-next').data('swiper-slide-index'))
			},
			onTransitionEnd: function(swiper){
				if($('.swiper-slide-prev').length) {
					var prevVideo = $('.swiper-slide-prev').find('video')[0];
					prevVideo.pause();
				};
				if($('.swiper-slide-next').length) {
					var nextVideo = $('.swiper-slide-next').find('video')[0];
					nextVideo.pause();
				};			
			}
		});

		if($('.rotator-video .pagination span').length === 1) {
			$('.rotator-video .pagination').css('display', 'none');
		}
		
	} swiperIndex();

	function bulletsShadow() {
		var index = $('.swiper-pagination-bullet-active').index(),
			left = $('.swiper-pagination-bullet').eq(index).position().left;
		$('.pagination').find('.shadow').css('left', left+6);
	};
	function createShadow() {
		$('.pagination').append('<div class="shadow"></div>')
	}


	function initPunch() {
		var rotator = $('.punchline-rotator');

		rotator.each(function(){
			var _ = $(this),
				item = _.find('.item'),
				fItem = item.first(),
				tl = new TimelineLite();

			tl	
				.set(item, {y: '25px', className: '-=active', zIndex: 1, autoAlpha: 0})
				.set(fItem, {y: '25px', autoAlpha: 1, className: '+=active', zIndex: 4})		
		});
	}

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
	}

	function slideText(textOut, textIn, delay) {
		var tl = new TimelineLite(),
			$first = $('.item:first-of-type');

		if(textIn.length !== 0) {
			tl
				.set(textOut, {y: '25px', autoAlpha: 0, className: '+=active', zIndex: 4})
				.set(textIn, {className: '-=active', zIndex: 1, autoAlpha: 1, delay: delay})

				.to(textOut, 0.3, {y: '-=25px', autoAlpha: 1, ease: Power0.easeNone, delay: delay}, 0)
				.to(textIn, 0.3, {y: '-=50px', autoAlpha: 0, ease: Power0.easeNone, zIndex: 1, delay: delay}, 0)

				.set(textIn, {delay: 1, y: '25px'})
		} 
		// else {
		// 	tl
		// 		.set($first, {y: '50px', autoAlpha: 0, className: '+=active', zIndex: 4})
		// 		.set(textOut, {className: '-=active', zIndex: 1, autoAlpha: 1})

		// 		.to($first, 0.4, {y: '-=50px', autoAlpha: 1, ease: Power0.easeNone, delay: delay}, 0)
		// 		.to(textOut, 0.4, {y: '-=50px', autoAlpha: 0, zIndex: 1, ease: Power0.easeNone, delay: delay}, 0)

		// 		.set(textOut, {delay: 1, y: '50px'})
		// }
	}
	
	
	function bigSlider(element, settings) {
		this.config = {
			rotator: '.rotator-wrapper',
			item: '.rotator_item',
			pagin: '.pagination',
			direction: 5000
		};

		$.extend(this.config || {});
		this.$el  = element instanceof jQuery ? element : $(element);

		this.init()		
	}

	bigSlider.prototype = {
		constructor: bigSlider,

		init: function(){
			var _ = this;

				_.$rotator = _.$el.find(_.config.rotator);
				_.$item = _.$el.find(_.config.item);
				_.$pagin = _.$el.find(_.config.pagin);
				_.$direction = _.$el.find(_.config.direction);


			_.pagination(_.$item, _.$pagin);
			_.initAnimation(_.$item, _.$pagin);
			_.initVideoPlay(_.$item);
			_.initEvents();
		},
		initAnimation: function(item, pagin){
			var tl = new TimelineLite();

			item.first().addClass('current');

			var index = item.parent().find('.current').index();

			pagin.children().eq(index).addClass('pagin-current');
			pagin.append('<div class="shadow"></div>');



			tl
				.set(item, {x: '50%', zIndex: 5, autoAlpha: 0})
				.set(item.first(), {x: '-=50%', zIndex: 1, autoAlpha: 1})
		},
		initVideoPlay: function(item) {
			if(!item.find('video').length) return false;

			var video = item.find('video')[0];

			video.play();
		},
		videoStop: function(){

		},
		shadowAction: function(current){
			var index = current.index(),
				left  = current.position().left;
			console.log(left)
			//alert();
		},
		pagination(item, pagin) {
			var length = item.length,
			i;

			if(length === 1) return false;

			for(i = 0; i < length; i++) {
				pagin.append('<span class="pagin-item" data-item="'+ i + '"></span>')
			}

		},
		initEvents: function(){
			var _ = this;
			var timeout;
			var rotator = this.$rotator;
			var pagin = this.$pagin;
			if(_.config.direction === '') return false
			timeout = setInterval(function(){
				_.motion(rotator, pagin);
			},_.config.direction);

		},
		motion: function(rotator, pagin) {
			var current = rotator.find('.current'),
				next = current.next(),
				$first = current.parent().children().first(),
				tl = new TimelineLite({onStart: this.shadowAction(current)}),
				index = current.index();

			

			if(next.length !== 0) {
				tl
					.to(current, 1.5, {x: '-=50%', autoAlpha: 0, className: '-=current', zIndex: 1, ease:Power3.easeInOut})
					.to(next, 1.5, {x: '-=50%', autoAlpha: 1, className: '+=current', zIndex: 5, ease:Power3.easeInOut}, 0)

					.set(current, { x: '50%', zIndex: 1, delay: this.$direction})
					.set(next, {zIndex: 5})
			} else {
				tl
					.set($first, {x: '50%', autoAlpha: 1, className: '+=current', zIndex: 5})
					.set(current, {className: '-=current', zIndex: 1})

					.to(current, 1.5, {x: '-=50%', autoAlpha: 0, className: '-=current', zIndex: 1, ease:Power3.easeInOut})
					.to($first, 1.5, {x: '-=50%', autoAlpha: 1, className: '+=current', zIndex: 4, ease:Power3.easeInOut}, 0)

					.set(current, { x: '50%', zIndex: 1, delay: this.$direction})
					.set($first, {zIndex: 5})
			}			
			pagin.children().eq(index).addClass('pagin-current').siblings().removeClass('pagin-current');	
		}
	}

	// var slider = $('.rotator');
	// slider = new bigSlider(slider);

	function loadProject(link, id) {
		$.ajax({
			url: link,
			dataType:"html",
			beforeSend: function(){
				$('.pjax').addClass('loading').removeClass('complete');
			},
			success: function(b){
				var h = $(b).find('#' + id);
				
				if(id === 'index') {
					window.history.replaceState("page" + id, id, link);
				} else {
					window.history.replaceState("page" + id, id, link);
				}
				setTimeout( function(){	
					$('.pjax').html(h);
					$('.pjax').removeClass('loading').addClass('complete');
				},1500);
				
			}
		})
	}

	$('.ajaxtrigger').on('click', function(){
		
		loadProject($(this).attr('href'), $(this).data('id'));

		return false;
	});

})
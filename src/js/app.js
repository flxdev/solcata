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
			onInit: function(swiper) {				
				setTimeout(function(){
					initVideo = $(swiper).find('.swiper-slide-active').find('video')[0];
					initVideo.play();
				},100);
			}
		});
		if($('.rotator-video .pagination span').length === 1) {
			$('.rotator-video .pagination').css('display', 'none');
		}
	} swiperIndex();

})
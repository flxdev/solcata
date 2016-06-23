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
			numbersItem = $('.navigation-items'),
			active = container.find('.active'),
			index = active.data('number'),
			trigger = $('.navigation__trigger'),
			area = container.parents('.navigation-area'),
			content = container.parents('.navigation-content'),
			tl = new TimelineLite();

		numbers.html(index);

		numbersItem.on('mouseenter', function(){
			var _ = $(this),
				index = _.data('number');
			numbers.html(index);
		});

		numbersItem.parent().on('mouseleave', function(){
			var _ = $(this),
				index = _.find('.active').data('number');
			numbers.html(index);
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
})
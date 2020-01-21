function hasJqueryObject($elem) { return $elem.length > 0 }
function trace() { console.log(([].join.call(arguments)).toUpperCase() + ' Initialize') }
var app = app || {};

// 	GNB TOGGLE
app.gnbToggle = {
	namespace: 'header',
	events: {
		GNB_OPEN: 'click.btnOpen',
		GNB_CLOSE: 'click.btnClose'
	},
	init: function() {
		trace(this.namespace);
		this.header = '#header';
		this.gnb = '#gnb';
		this.btnOpen = '.btnOpen';
		this.btnClose = '.btnClose';
		this.active = 'active';

		this.$header = app.$body.find(this.header);
		this.$gnb = this.$header.find(this.gnb);
		this.$btnOpen = app.$body.find(this.btnOpen);
		this.$btnClose = app.$body.find(this.btnClose);

		this.addEvent();
	},
	addEvent: function() {
		var _this = this;
		_this.$btnOpen.off(_this.events.GNB_OPEN).on(_this.events.GNB_OPEN, function() {
			_this.$btnOpen.addClass(_this.active);
			// open
			if( _this.$btnOpen.hasClass(_this.active) ) {
				TweenMax.to( $('#gnb'), .5, {left:0});
				// _this.$btnOpen.removeClass(_this.active);
			}
		});
		_this.$btnClose.off(_this.events.GNB_CLOSE).on(_this.events.GNB_CLOSE, function() {
			_this.$btnClose.addClass(_this.active);
			if( _this.$btnClose.hasClass(_this.active) ) {
				TweenMax.to($('#gnb'), .5, {left:'100%'});
			}
		});
	}
}
// 좋아요 버튼 && 클릭 시 active 클래스 추가
app.clickEvent = {
	namespace: 'clickEvent',
	events: {
		CLICK_THIS: 'click.clickEvn'
	},
	init: function() {
		trace(this.namespace);
		this.clickItem = '.clickEvn';
		this.activeClass = 'active';

		this.$item = app.$body.find(this.clickItem);

		this.addEvent();
	},
	addEvent: function() {
		var _this = this;

		function clickEvented() { 
			$(this).toggleClass(_this.activeClass);
		}
		_this.$item.off(_this.events.CLICK_THIS).on(_this.events.CLICK_THIS, clickEvented);
	}
}
// 메인 상단 슬라이드
app.slideWrap = {
	namespace: 'slideItem',
	events: {
		CARD_CLICK: 'click.cardWrap'
	},
	init: function() {
		trace(this.namespace);

		this.slideWrap = '.slideWrapMian';
		this.slideWrapper = '.swiper-wrapper';
		this.slideNavi = '.slideNavi';

		this.cardWrap = '.slideItem';
		this.cardClass = '.cardWrap';
		this.activeClass = 'active';
		this.swipeActive = '.swiper-slide-active';

		this.$slideWrap = app.$body.find(this.slideWrap);
		this.$slideWrapper = this.$slideWrap.find(this.slideWrapper);
		this.$slideNavi = this.$slideWrap.find(this.slideNavi);

		this.$cardWrap = app.$body.find(this.cardWrap);
		this.$card = this.$cardWrap.find(this.cardClass);
		
		this.swiper();//스와이퍼
		
		if( $('#wrap').hasClass('main') ) {
			this.addEvent();//아코디언
		}
	},
	addEvent: function() {
		var _this = this;
		function handleClicked() {
			var $item = $(this).closest(_this.$cardWrap);
			// this 외 카드 접기
			TweenMax.to($item.siblings().find('.info'), .01, {opacity:0, display:'none'});
			$item.toggleClass(_this.activeClass).siblings().removeClass(_this.activeClass);
			// open
			if( $item.toggleClass(_this.activeClass).hasClass(_this.activeClass) !== true ) {
				TweenMax.to($(this).find('.info'), .5, {opacity:1, display:'block'});
				TweenMax.to($item.siblings(), .5, {backgroundColor:'rgba(0,0,0,0.7)'})
				$item.siblings().addClass('dim');
				if($item.hasClass('dim')) $item.removeClass('dim')
			}
			// close
			if( $item.toggleClass(_this.activeClass).hasClass(_this.activeClass) === false ) {
				TweenMax.to($(this).find('.info'), .01, {opacity:0, display:'none'});
				$item.siblings().removeClass('dim');
			}
		}
		_this.$card.off(_this.events.CARD_CLICK).on(_this.events.CARD_CLICK, handleClicked);
	},
	handleRemove: function() {
		this.$card.removeClass(this.activeClass);
		TweenMax.to(this.$card.find('.info'), .05, {opacity:0, display:'none'});
		this.$cardWrap.removeClass('dim');
	},
	swiper: function() {
		// 메인 슬라이드
		var swiper = new Swiper(this.$slideWrap, {
			parallax: true,
			spaceBetween: 30,
			pagination: {
				el: this.$slideNavi,
			},
			spaceBetween: 350,
			on: { // 슬라이드 이벤트 주는 방법
				slideChange: function() {
					// 메인 슬라이드 일 경우 활성화
					if( $('#wrap').hasClass('main') ) {
						app.slideWrap.handleRemove();
					}
				}
			}
		});
	}
}
// 서브 슬라이드
app.normalSlide = {
	swiper01: function() { //detail.html view
		var slideWrapDetile = new Swiper('.slideWrapDetile', {slidesPerView:'auto', pagination:{el:'.slideNavi',}});
	},
	swiper03: function() { //detail.html popup
		var slideWrap03 = new Swiper('.slideWrap03', {slidesPerView:2.5, spaceBetween:10});
	}
}
// 지도 dot 선택 이벤트
app.locationMap = {
	namespace: 'dotted',
	events: {
		CLICK_INDI: 'click.dot'
	},
	init: function() {
		trace(this.namespace);
		this.dotWrap = '.dotWrap';
		this.dot = '.dot';
		this.mapSlide = '.mapSlide'
		this.activeClass = 'active';

		this.$wrap = app.$body.find(this.dotWrap);
		this.$dot = this.$wrap.find(this.dot);
		this.$mapSlide = app.$body.find(this.mapSlide);

		this.addEvent();
	},
	addEvent: function() {
		var _this = this;

		function handleOnSlide() {
			var idx = $(this).index();
			$(this).toggleClass(_this.activeClass).siblings().removeClass(_this.activeClass);
			_this.$mapSlide.find('.swiper-slide').eq(idx).addClass(_this.activeClass).siblings().removeClass(_this.activeClass);

			if( _this.$mapSlide.find('.swiper-slide').hasClass(_this.activeClass) ) {
				TweenMax.to($('.swiper-slide'), .5, {y:0});
				TweenMax.to(_this.$mapSlide.find('.swiper-slide').eq(idx), .5, {y:-20});
			}
			if ( _this.$dot.hasClass(_this.activeClass) !== true ) {
				TweenMax.to($('.swiper-slide'), .5, {y:0});
			}
		}
		_this.$dot.off(_this.events.CLICK_INDI).on(_this.events.CLICK_INDI, handleOnSlide)
	}
}
app.locationBounce = {
	namespace: 'navi',
	events: {
		CLICK_NAVI: 'click.iconNavi'
	},
	init: function() {
		trace(this.namespace);
		this.mapArea = '.mapArea';
		this.naviBtn = '.iconNavi';
		this.myLocation = '.myLocation';
		this.activeClass = 'active';

		this.$mapArea = app.$body.find(this.mapArea);
		this.$naviBtn = this.$mapArea.find(this.naviBtn);
		this.$bounceArea = this.$mapArea.find(this.myLocation);
		// myLocation

		this.addEvent();
	},
	addEvent: function() {
		var _this = this;
		function handlerBounce() {_this.$bounceArea.toggleClass(_this.activeClass);}
		_this.$naviBtn.off(_this.events.CLICK_NAVI).on(_this.events.CLICK_NAVI, handlerBounce)
	}
	
}
// 인풋 클리어
app.clearInput = {
	namespace: 'clearInput',
	events: {
		INSERT_INPUT: 'keyup.input',
		CLEAR_INPUT: 'click.clearBtn'
	},
	init: function() {
		this.wrapClass = ".inputArea";
		this.inputTag = "input";
		this.clearBtn = ".clearBtn";

		this.$wrapClass = app.$body.find(this.wrapClass);
		this.inputTag = this.$wrapClass.find(this.inputTag);
		this.$clearBtn = this.$wrapClass.find(this.clearBtn);

		this.addEvent()
	},
	addEvent: function() {
		var _this = this;

		function handleFocus() {
			_this.$clearBtn.show();
		}
		function handleClear() {
			_this.inputTag.val('');
			_this.$clearBtn.hide();
			_this.inputTag.focus();
		}
		_this.inputTag.off(_this.events.INSERT_INPUT).on(_this.events.INSERT_INPUT, handleFocus);
		_this.$clearBtn.off(_this.events.CLEAR_INPUT).on(_this.events.CLEAR_INPUT, handleClear);
	}
}
// 검색 페이지 하단 리스트 활성화
app.resultAction = {
	namespace: 'listAction',
	events: {
		LIST_ACTION : 'click.schBtn'
	},
	init: function() {
		this.actionBtn = '.schBtn';
		this.listWrap = '.actionType';
		this.itemClass = '.item';
		this.activeClass = 'active';

		this.$button = app.$body.find(this.actionBtn);
		this.$listWrap = app.$body.find(this.listWrap);
		this.$itemClass = this.$listWrap.find(this.itemClass);
		this.$pressInput = this.$button.closest('input');

		this.addEvent();
	},
	addEvent: function() {
		var _this = this;

		function handleactioned() {
			_this.$listWrap.toggleClass(_this.activeClass);
			if( _this.$listWrap.hasClass(_this.activeClass) ) {
				_this.action(_this.$itemClass);
			} else {
				_this.$listWrap.removeClass(_this.activeClass);
				_this.removeAction(_this.$itemClass);
			}
		}

		_this.$button.off(_this.events.LIST_ACTION).on(_this.events.LIST_ACTION, handleactioned);
	},
	action: function(item) {
		TweenMax.staggerTo(item, 1, {y:0, opacity:1, delay:.1}, .3);
	},
	removeAction: function(item) {
		TweenMax.to(item, .01, {y:50, opacity:0});
	}
}
// 탭
app.tab = {
	namespace: 'tab',
	events: {
		TAB_CLICK: 'click.tab'
	},
	init: function() {
		this.tabWrap = '.tabWrap';
		this.tabArea = '.tabArea';
		this.tabBtn = '.tabBtn';
		this.tabcon = '.tabcon';
		this.activeClass = 'active';

		this.$Wrap = app.$body.find(this.tabWrap);
		this.$tabArea = this.$Wrap.find(this.tabArea);
		this.$tabBtn = this.$tabArea.find(this.tabBtn);
		this.$tabcon = this.$Wrap.find(this.tabcon);

		this.addEvent();
	},
	addEvent: function() {
		var _this = this;
		
		function handletabed () {
			var idx = $(this).index();
			var artList = '.artList';
			var item = '.item';
			$(artList).removeClass(_this.activeClass);
			app.resultAction.removeAction(item);
			$(this).addClass(_this.activeClass).siblings().removeClass(_this.activeClass);
			_this.$tabcon.eq(idx).addClass(_this.activeClass).show().siblings(_this.tabcon).removeClass(_this.activeClass).hide();

			if ( _this.$tabcon.eq(idx).hasClass(_this.activeClass) ) {
				_this.$tabcon.eq(idx).find(artList).addClass(_this.activeClass);
				app.resultAction.action(_this.$tabcon.eq(idx).find(item));
			} else {
				$(artList).removeClass(_this.activeClass);
			}
		}

		_this.$tabBtn.off(_this.events.TAB_CLICK).on(_this.events.TAB_CLICK, handletabed);
	}
}
// layerPopup
app.layerPopup = {
	namespace: 'layerPop',
	events: {
		CLICK_BTN: 'click.openPop',
		CLOSE_BTN: 'click.closePop'
	},
	init: function() {
		this.openBtn = '.openPop';
		this.closeBtn = '.closePop';
		this.layer = '.layerPopup';

		this.$openBtn = app.$body.find(this.openBtn);
		this.$layer = app.$body.find(this.layer);
		this.$closeBtn = this.$layer.find(this.closeBtn);
		
		this.addEvent()
	},
	addEvent: function() {
		var _this = this;
	
		function openedLayer() {
			var laypopData = $(this).attr('data-popBtn');
			var layer = $('.layerPopup[data-layerpop="' + laypopData + '"]');
			layer.fadeIn().show().siblings(_this.layer).fadeOut();
			
			if( app.$body.find('.slideWrap03' )) { //detail.html popup
				app.normalSlide.swiper03(); 
			}
		}
		function closedLayer() {
			$(this).parent('.layerPopup').fadeOut();
		}

		_this.$openBtn.off(_this.events.CLICK_BTN).on(_this.events.CLICK_BTN, openedLayer);
		_this.$closeBtn.off(_this.events.CLOSE_BTN).on(_this.events.CLOSE_BTN, closedLayer);
	}
}
// 페이지 로드 되자마자 이벤트 활성화
app.windowLoad = {
	poptag: function() {
		TweenMax.staggerTo($('.popLabel .word'), .5, {y:0, opacity:1, delay:.1}, .2);
	},
	loadartlist: function() {
		if ( $('.actionType').hasClass('active') ) {
			app.resultAction.action('.active .item');
		} else {
			app.resultAction.removeAction('.active .item');
		}
	},
	mainEffect: function() {
		TweenMax.to($('.slideItem').eq(3), .5, {x:0});
		TweenMax.to($('.slideItem').eq(2), .5, {x:0, delay:.5}, .5);
		TweenMax.to($('.slideItem').eq(1), .5, {x:0, delay:.8}, .5);
		TweenMax.to($('.slideItem').eq(0), .5, {x:0, delay:1}, .5);
		TweenMax.to($('.cardWrap'), 0, {height:'auto', delay:2}, 2);

		TweenMax.to($('.slideItem').eq(0), 0, {position:'relative', bottom:'25px', marginRight:"-3px", paddingTop:"8px", delay:2}, 2);
		TweenMax.to($('.slideItem').eq(1), 0, {position:'relative', bottom:'35px', marginRight:"-3px", paddingTop:"8px", delay:2}, 2);
		TweenMax.to($('.slideItem').eq(2), 0, {position:'relative', bottom:'45px', marginRight:"-3px", paddingTop:"8px", delay:2}, 2);
		TweenMax.to($('.slideItem').eq(3), 0, {position:'relative', bottom:'55px', marginRight:"-3px", paddingTop:"8px", delay:2}, 2);

		TweenMax.to($('.slideNavi'), .5, {opacity:1, bottom:'30px', delay:2, onComplete:function(){
			$('.slideWrapMian .swiper-slide').each(function(idx){
				var _idx =$(this).index();
				$(this).find('.slideItem').each(function(idx){
					var _idx =$(this).index();
					var parallax = $(this).attr('data-parallax');
					$(this).attr('data-swiper-parallax-x', parallax);
				});
			})
			$('.swiper-slide').removeClass('first');
		}}, 2);
	},
	scroll: function() {
		var _this = this;
		_this.$animate = app.$body.find(".animate");

		function handleTweenPage(e) {
			TweenMax.to($(this).find('.areaType1'), .5, {scale:1, onComplete:function(){
				TweenMax.staggerTo(_this.$animate.find('.areaType1'), .5, {borderRadius:'0 0 0 18px',delay:.3}, .2);
			}}, .5);
			TweenMax.to($('.wideArea .bgArea'), .5, {opacity:1,minHeight:'170px',delay:.8}, .2);
			TweenMax.to($('.halfArea .bgArea'), .5, {opacity:1,minHeight:'150px',delay:.8}, .2);
		}
		function handleTweenPage2V(e) {
			TweenMax.staggerTo($(this).find('.pointR span'), .2, {color:'#ff4264',delay:.5}, .2);	
		}

		$(window).on("scroll", function(){
			var viewTop = $(this).scrollTop(),
				viewHeight = $(this).outerHeight(true),
				viewBottom = viewTop + viewHeight;0
		
			_this.$animate.each(function(){
				var elementTop = $(this).offset().top,
					elementHeight = $(this).outerHeight(),
					elementBottom = elementTop + elementHeight;
		
				if(viewTop < elementBottom && viewBottom > elementTop) {
					if($(this).hasClass("animate")) {
						handleTweenPage.call(this);
						handleTweenPage2V.call(this);
					}
				}
			})
		});
	}
}

$(document).ready(function(){
	app.$body = $("body");
	hasJqueryObject(app.$body.find(".btnOpen")) && app.gnbToggle.init();
	hasJqueryObject(app.$body.find(".clickEvn")) && app.clickEvent.init();
	hasJqueryObject(app.$body.find(".slideWrapMian")) && app.slideWrap.init();
	hasJqueryObject(app.$body.find(".slideWrapDetile")) && app.normalSlide.swiper01();
	hasJqueryObject(app.$body.find(".clearBtn")) && app.clearInput.init();
	hasJqueryObject(app.$body.find(".schBtn")) && app.resultAction.init();
	hasJqueryObject(app.$body.find(".tabWrap")) && app.tab.init();
	hasJqueryObject(app.$body.find(".layerPopup")) && app.layerPopup.init();
	hasJqueryObject(app.$body.find(".dotWrap")) && app.locationMap.init();
	hasJqueryObject(app.$body.find(".iconNavi")) && app.locationBounce.init();

	hasJqueryObject(app.$body.find(".animate")) && app.windowLoad.scroll();

	hasJqueryObject(app.$body.find(".popLabel")) && app.windowLoad.poptag();
	hasJqueryObject(app.$body.find(".actionType")) && app.windowLoad.loadartlist();
	hasJqueryObject(app.$body.find(".slideWrapMian")) && app.windowLoad.mainEffect();
});

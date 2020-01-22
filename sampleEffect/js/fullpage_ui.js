function hasJqueryObject($elem) { return $elem.length > 0 }
var app = app || {};

app = {
  mainSlide: function(fullpage) {
    var swiper = new Swiper(fullpage, {
      direction: 'vertical',
      slidesPerView: 1,
      allowTouchMove: false,
      mousewheel: {
        forceToAxis: true,
        invert: true,
      },
      preventInteractionOnTransition: true,
      speed: 1000,
      parallax: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      on: {
          init:function(){
            app.addEvent('FIRST');
          },
          slideChange: function() {
            var idx = swiper.activeIndex;
            var checkID = $(fullpage).find('.swiper-slide').eq(idx).attr('id');
            app.addEvent(checkID)
            // console.log('슬라이드체인지')
          }
      },
      // preventInteractionOnTransition: true,
      // simulateTouch: simulatetouch,
      // allowTouchMove: allowtouchmove,
      // followFinger: followfinger,
    });
  },
  addEvent: function(id) {
    var $id = '#'+ id;
    // var WINDOWLOAD = null;
    var FIRST_ANIMATE,
        SECOND_ANIMATE,
        THIRD_ANIMATE,
        FOURTH_ANIMATE = null;
    var handler = {
      FIRST: function FIRST(){
        if(FIRST_ANIMATE) return; // 한번만 실행
        FIRST_ANIMATE = true; // 한번만 실행

        var _this = $($id);
        var animate = _this.find('.animate');
        var aniLength = animate.length;
        TweenMax.to(animate, 1, {opacity:1, scale: 2});
      },
      SECOND: function SECOND(){
        if(SECOND_ANIMATE) return;
        SECOND_ANIMATE = true;

        var _this = $($id);
        var animate = _this.find('.animate');
        var aniLength = animate.length;
        TweenMax.to(animate, 1, {opacity:1, scale: 2});
      },
      THIRD: function THIRD(){
        if(THIRD_ANIMATE) return;
        THIRD_ANIMATE = true;
        
        var _this = $($id);
        var animate = _this.find('.animate');
        var aniLength = animate.length;
        TweenMax.to(animate, 1, {opacity:1, scale: 2});
      },
      FOURTH: function FOURTH(){
        if(FOURTH_ANIMATE) return;
        FOURTH_ANIMATE = true;

        var _this = $($id);
        var animate = _this.find('.animate');
        var aniLength = animate.length;
        TweenMax.to(animate, 1, {opacity:1, scale: 2});
      },
    }
    handler[id]();
  }
}
  
$(function(){
  app.$body = $("body");
	hasJqueryObject(app.$body.find(".fullpage")) && app.mainSlide(".fullpage");
})
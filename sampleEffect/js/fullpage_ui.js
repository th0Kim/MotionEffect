/*
// ver 0.0.1
*/
function hasJqueryObject($elem) { return $elem.length > 0 }
var app = app || {};

app = {
  PCSlide: function(fullpage, swiperPager) {
    var swiper = new Swiper(fullpage, {
      direction: 'vertical',
      slidesPerView: 1,
      allowTouchMove: false,
      mousewheel: {
        forceToAxis: true,
        invert: true,
      },
      speed: 1000,
      parallax: true,
      pagination: {
        el: swiperPager,
        clickable: true,
      },
      on: {
          init:function(){
            app.addEvent('FIRST');
          },
          slideChange: function() {
            var idx = swiper.activeIndex;
            var checkID = $(fullpage).find('.swiper-slide').eq(idx).attr('id');
            app.addEvent(checkID);
          }
      },
    });
  },
  addEvent: function(id) {
    var $id = '#'+ id;
    var animate = '.animate';
    // TweenMax.set($('.animate'), {opacity:0, scale: 3}); // active 때 마다 모션을 주고 싶으면 set값 설정 할 것
    var handler = {
      FIRST: function FIRST(){
        var $animate = $($id).find(animate);
        TweenMax.to($animate.find('.sacle'), .5, {opacity:1, scale: 2, ease: Linear.easeNone});
      },
      SECOND: function SECOND(){
        var $animate = $($id).find(animate);
        TweenMax.to($animate.find('.move'), 1, {opacity:1, x:0, ease: Linear.easeNone});
      },
      THIRD: function THIRD(){
        var $animate = $($id).find(animate);
        TweenMax.to($animate.find('.sacle'), .5, {opacity:1, scale: 2, ease: Linear.easeNone});
      },
      FOURTH: function FOURTH(){
        var $animate = $($id).find(animate);
        TweenMax.to($animate.find('.move'), 1, {opacity:1, x:0, ease: Linear.easeNone});
      },
    }
    handler[id]();
  }
}
  
$(function(){
  app.$body = $("body");
	hasJqueryObject(app.$body.find(".fullpage")) && app.PCSlide(".fullpage", ".swiper-pagination");
  // document.body.append('<script type="text/javascript" src="js/textMotion.js"></script>');

})
document.write("<script type='text/javascript' src='js/textMotion.js'></" + "script>");
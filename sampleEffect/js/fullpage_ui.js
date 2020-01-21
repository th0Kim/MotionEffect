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
            console.log('init');
            animate('FIRST');
            function animate(id) {
              var $id = '#'+ id;
              // var FIRST_ANIMATE,
              //     SECOND_ANIMATE = null;
              handler = {
                FIRST: function FIRST(){
                  console.log('1')
                },
                SECOND: function SECOND(){
                  console.log('2')
                },
                THIRD: function THIRD(){
                  console.log('3')
                },
                FOURTH: function FOURTH(){
                  console.log('4')
                },
              }
              handler[id]();
            }
          },
          slideChange: function() {
            var idx = swiper.activeIndex;
            var checkID = $(fullpage).find('.swiper-slide').eq(idx).attr('id');
            // animate(checkID);
            this.init.animate()
          }
      }
      // preventInteractionOnTransition: true,
      // simulateTouch: simulatetouch,
      // allowTouchMove: allowtouchmove,
      // followFinger: followfinger,
    });
  },
}
  
$(function(){
  app.$body = $("body");
	hasJqueryObject(app.$body.find(".fullpage")) && app.mainSlide(".fullpage");
})
// var APP = APP || {};
var APP = {
  scroll: function() {
    var _this = this;
    _this.$animate = _this.$body.find(".animate");

    var FIRST_ANIMATE, 
        SECOND_ANIMATE = null;

    var handler = {
      FIRST: function FIRST() {
        if(FIRST_ANIMATE) return;
        FIRST_ANIMATE = true;
        var $container = $("#FIRST"), tl = new TimelineMax();
        tl.to($container.find(".animate"), .45, { scaleY: 1, ease: Power1.easeOut, delay:.25 })
        $container.addClass('active')
        // console.log('1')
      },
      SECOND: function SECOND() {
        if(SECOND_ANIMATE) return;
        SECOND_ANIMATE = true;
        var $container = $("#SECOND"), tl = new TimelineMax();
        tl.to($container.find(".animate"), .45, { scaleY: 1, ease: Power1.easeOut, delay:.25 })
        $container.addClass('active')
        // console.log('1')
      },
    }

    function handleTweenPage() {
      TweenMax.staggerTo($(this).find(".motionBg"), .5, {opacity:1, scale:1, delay:.8, ease: Linear.easeNone})
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
          var id = $(this).closest(".swiper-slide").attr("id");
          if($(this).hasClass("page")) {
            handleTweenPage.call(this);
          } else {
            handler[id]();
          }
        }
      })
    }).trigger("scroll");
  }
}

$(function(){
  APP.$body = $("body");
  APP.scroll();
})
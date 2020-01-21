var PF003 = {
  init: function() {
    var agent = navigator.userAgent.toLowerCase();
    if((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1) || agent.indexOf('edge') > -1) {
      $(".animateTxt").css({ opacity: 1 });
      return;
    }

    $(".g").children().each(function(){
      switch(this.nodeName) {
        case 'polyline':
          TweenMax.set(this, { strokeDasharray: this.getTotalLength(), strokeDashoffset: this.getTotalLength() });
          break;
        case 'circle':
          TweenMax.set(this, { transformOrigin: '50% 50%', scale: 0 });
          break; 
        case 'rect':
          var hasRect02Class = this.classList.contains("rect02");
          TweenMax.set(this, { transformOrigin: !hasRect02Class ? '50% 100%' : '50% 0', scaleY: 0 });
          break;
      }
    })
  },
  scroll: function() {
    var _this = this;
    _this.$animate = _this.$body.find(".animate");

    var VISUAL_ANIMATE, 
        GOAL_ANIMATE, 
        DIFFERENCE_ANIMATE, 
        BI_ANIMATE, 
        CONCEPT_ANIMATE, 
        CONCEPT_TYPE_02_ANIMATE, 
        TYPE_ANIMATE, 
        DESIGN_ANIMATE, 
        MOBILE_ANIMATE = null;

    var handler = {
      VISUAL: function VISUAL() {
        var agent = navigator.userAgent.toLowerCase();
        if((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) return;

        if(VISUAL_ANIMATE) return;
        VISUAL_ANIMATE = true;
        var tl = new TimelineMax(), $container = $(".visual .animateLogo");
        tl.to($container.find(".rect01"), .45, { scaleY: 1, ease: Power1.easeOut, delay:.25 })
          .to($container.find(".circle"), .35, { scale: 1, ease: Power1.easeOut })
          .to($container.find(".top"), 1, { strokeDashoffset:0, ease: Linear.easeInOut })
          .staggerTo($container.find(".animateTxt"), .4, { opacity: 1, ease: Linear.easeNone }, .2, 1.1)
          .to($container.find(".rect02"), .45, { scaleY: 1, ease: Power1.easeOut }, 2)
          .to($container.find(".bottom"), 1, { strokeDashoffset:0, ease: Linear.easeInOut }, 2.1)
      },
      GOAL: function GOAL() {
        if(GOAL_ANIMATE) return;
        GOAL_ANIMATE = true;
        var $container = $("#GOAL"), tl = new TimelineMax();
        tl.to($container.find(".thumb"), .6, { x:0, opacity:1, ease: Linear.easeNone })
          
      },
      DIFFERENCE: function DIFFERENCE() {
        if(DIFFERENCE_ANIMATE) return;
        DIFFERENCE_ANIMATE = true;
        var $container = $("#DIFFERENCE"), tl = new TimelineMax();
        tl.staggerTo($container.find(".iconQuotes span"), .55, { x:0, opacity:1, delay:.55, ease: Linear.easeNone }, .2)
      },
      BI: function BI() {
        if(BI_ANIMATE) return;
        BI_ANIMATE = true;
        var $container = $("#BI"), tl = new TimelineMax();
        tl.to($container.find(".frame .lineTop"), .3, { scaleX:1, opacity:1, ease: Power1.easeOut })
          .to($container.find(".frame .lineRight"), .15, { scaleY:1, opacity:1, ease: Power1.easeOut })
          .to($container.find(".frame .lineBottom"), .15, { scaleX:1, opacity:1, ease: Power1.easeOut })
          .to($container.find(".frame .lineLeft"), .3, { scaleY:1, opacity:1, ease: Power1.easeOut })
          .to($container.find(".BILogoWrap .imgWrap"), .55, { opacity:1, ease: Linear.easeNone })
          .to($container.find(".BILogoWrap .imgWrap, .frame"), .55, { x:0, ease: Linear.easeNone })
      },
      CONCEPT: function CONCEPT(){
        if(CONCEPT_ANIMATE) return;
        CONCEPT_ANIMATE = true;
        var $container = $("#CONCEPTMOTION"), tl = new TimelineMax();
        tl.to($container.find(".line"), .8, { scaleX: 1, delay:.8, ease: Sine.easeOut })
          .to($container.find(".line01"), .2, { scaleX: 1, delay:1, ease: Power1.easeOut }, .5)
          .to($container.find(".line02"), .2, { scaleY: 1, delay:1, ease: Power1.easeOut }, .65)
          .staggerTo($container.find(".sloganWrap"), .45, { x: 0, opacity:1, ease: Linear.easeNone }, "-=.4")
          .to($container.find(".color7"), .15, { scaleX: 1, delay:.2, ease: Linear.easeNone }, "-=.4")
          .to($container.find(".color6"), .15, { scaleX: 1, delay:.3, ease: Linear.easeNone }, "-=.4")
          .to($container.find(".color5"), .15, { scaleX: 1, delay:.4, ease: Linear.easeNone }, "-=.4")
          .to($container.find(".color4"), .15, { scaleX: 1, delay:.0, ease: Linear.easeNone }, "-=.4")
          .to($container.find(".color3"), .15, { scaleX: 1, delay:.4, ease: Linear.easeNone }, "-=.4")
          .to($container.find(".color2"), .15, { scaleX: 1, delay:.4, ease: Linear.easeNone }, "-=.4")
          .to($container.find(".color1"), .15, { scaleX: 1, delay:.4, ease: Linear.easeNone }, "-=.4")
          .to($container.find(".ctWrap .img03"), .2, { x:0, opacity:1, ease: Linear.easeNone })
          .to($container.find(".ctWrap .img02"), .2, { x:0, opacity:1, ease: Linear.easeNone })
          .to($container.find(".ctWrap .img01"), .2, { x:0, opacity:1, ease: Linear.easeNone })
      },
      CONCEPT_TYPE_02: function CONCEPT_TYPE_02() {
        if(CONCEPT_TYPE_02_ANIMATE) return;
        CONCEPT_TYPE_02_ANIMATE = true;
        var $container = $("#TONENMANNER"), tl = new TimelineMax();
        var $container2 = $("#THUMB"), t2 = new TimelineMax();
        tl.to($container.find(".lineBox"), .2, { scaleX:1, opacity:1, delay:.8, ease: Power1.easeOut })
          .to($container.find(".lineSide"), .2, { scaleX:1, opacity:1, delay:.8, ease: Power1.easeOut },.3)
        t2.staggerTo($container2.find("img").eq(1), .6, { x:0, opacity:1, delay:1, ease: Linear.easeNone })
      },
      TYPE: function TYPE() {
        if(TYPE_ANIMATE) return;
        TYPE_ANIMATE = true;
        var $container = $("#TYPE"), tl = new TimelineMax();
        tl.to($container.find(".line01"), .2, { scaleX: 1, ease: Power1.easeOut }, .5)
          .to($container.find(".line02"), .2, { scaleY: 1, ease: Power1.easeOut }, .65)
          .to($container.find(".imgWrap"), .55, { x:0, opacity:1, delay:.1, ease: Linear.easeNone })
          .to($container.find(".imgWrap img"), 1, {opacity:1, delay:.15, ease: Linear.easeNone })
      },
      DESIGN: function DESIGN() {
        if(DESIGN_ANIMATE) return;
        DESIGN_ANIMATE = true;
        var $container = $("#DESIGNMOTION"), tl = new TimelineMax();
        tl.to($container.find(".thumb"), .45, { x:0, opacity:1, delay:.7, ease: Power1.easeOut, onComplete: function() {
            $(this.target).addClass("on"); 
          }})
          .to($container.find(".line02"), .2, { scaleX: 1, delay:.15, ease: Power1.easeOut })
          .to($container.find(".line01"), .2, { scaleY: 1, delay:.15, ease: Power1.easeOut })
          .staggerTo($container.find(".imgWrap img"), .55, { x:0, opacity:1, delay:.5, ease: Linear.easeNone })
      },
      MOBILE: function MOBILE() {
        if(MOBILE_ANIMATE) return;
        MOBILE_ANIMATE = true;
        var $container = $("#MOBILE"), tl = new TimelineMax();
        tl.to($container.find(".slideLine"), .2, { scaleY: 1, ease: Power1.easeOut })
          .staggerTo($container.find(".tit"), .70, { x:0, opacity:1, delay:.15, ease: Linear.easeNone, dalay:.5 })
          .staggerTo($container.find(".txt"), .70, { x:0, opacity:1, ease: Linear.easeNone }, .85, "-=.15")
      }
    }

    function handleTweenPage() {
      TweenMax.staggerTo($(this).find(".motionBg"), .5, {opacity:1, scale:1, delay:.8, ease: Linear.easeNone})
      TweenMax.staggerTo($(this).find("img"), .5, {opacity:1, delay:1.6, ease: Linear.easeNone})
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
          var id = $(this).closest(".section").attr("id");
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
  PF003.$body = $("body");
  PF003.init();
  PF003.scroll();
})
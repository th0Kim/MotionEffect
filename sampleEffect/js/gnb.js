/*
* Version   : ver 0.0.1
* File      : js/gnb.js
* Author    : M4NC-WP (KSY)
* 
* SUMMARY:
* 1) gnbMotion
*/
function hasJqueryObject($elem) { return $elem.length > 0 }
var GNB = GNB || {};

HEADER = {
  gnbMotion: function(hd) {
    this.header = hd;
    this.gnb = '#gnb';
    this.toggleBtn = '.toggleBtn';
    this.dimColor = '.dimColor';
    this.activeClass = 'active';
    
    this.$header = HEADER.$body.find(this.header);
    this.$gnb = this.$header.find(this.gnb);
    this.$toggleBtn = this.$header.find(this.toggleBtn);
    this.$dimColor = this.$header.find(this.dimColor);

    HEADER.addEvent(this.$header, this.$gnb, this.activeClass, this.$dimColor);
  },
  addEvent: function(hd, gnb, active, colorDim) {
    this.$toggleBtn.on('click', function(){
      var $colorDim = $(colorDim), tl = new TimelineMax();
      var dimH = $(colorDim).height();
      var span = 'span';

      console.log(dimH,'지엔비');

      $(hd).toggleClass(active);
      $(this).toggleClass(active);
      
      tl.set($(this).find(span), { backgroundColor:'#ffffff', rotation:'0' })
        .set($(this).find(span).eq(0), { opacity:1 })
        .set($(this).find(span).eq(1), { top:'18px' })
        .set($(this).find(span).eq(2), { bottom: '6px' })
        // .set($colorDim, { y:'-100%' })

      if( $(hd).hasClass(active) ) {
        tl.add([
            dim(),
            TweenMax.to($(gnb), .5 ,{ y:'0%', delay:.1, ease:Linear.easeNone }),
            TweenMax.to($(this).find(span).eq(0), .0 ,{  opacity:0 }),
            TweenMax.to($(hd).find('.logo a'), .2 ,{ color:'#333333' }),
            TweenMax.staggerTo($(this).find(span), .2 ,{ backgroundColor:'#333333', rotation:'45deg' }),
            TweenMax.to($(this).find(span).eq(2), .2 ,{ bottom: '19px', rotation:'-45deg' }),
        ])

        function dim(){
          for(var i=0;i<4;i++) {
            tl.set($colorDim, { y:'0%' })
              .to($colorDim.find(span).eq(i), .15, { scaleY:1, ease:Linear.easeNone }, '-=.1');
          }
        }
      } else {
        tl.to($(hd).find('.logo a'), .0 ,{ color:'#ffffff' })
          .to($(gnb), .5 ,{ y:'-100%', ease:Linear.easeNone })
          .to($colorDim.find(span), .5, { scaleY:0, ease:Linear.easeNone,
            onComplete:function(){TweenMax.set($colorDim, { y:'-100%' })}
          }, '-=.3')
          
      }
    })
  }
}
  
$(function(){
  HEADER.$body = $("body");
	hasJqueryObject(HEADER.$body.find("#header")) && HEADER.gnbMotion('#header');

})
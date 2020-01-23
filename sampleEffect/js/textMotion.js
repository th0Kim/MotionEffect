/*
// ver 0.0.1
*/
function hasJqueryObject($elem) { return $elem.length > 0 }

var MOT = MOT || {};
MOT = {
    init: function(){
        normalTxt = '.normalTxt';
        slideEffect = '.slideEffect';
        moving = '.moving';
        rect = '.rect';

        this.textHover = '.textHover';
        this.mouseover = 'mouseover';
        this.mouseleave = 'mouseleave';

        this.bgRect = '.bgRect';

        this.$textHover = MOT.$body.find(this.textHover);
        this.$bgRect = MOT.$body.find(this.bgRect);

        //실행
        MOT.TEXTMOTION();
        MOT.BGMOTION();
    },
    TEXTMOTION: function(){
        $(this.$textHover).each(function(){
            var text = $(this).find(normalTxt).text();
            for(var i=0;i<3;i++){
                $(this).append("<span class='moving'>"+ text +"</span>");
            }
        }).on(this.mouseover, function(){
            var id = $(this).closest(slideEffect).attr('id');
            var $container = '#' + id;
            for(var i=0;i<3;i++){
                var randomN = Math.floor(Math.random() * 40);
                var tl = new TimelineMax();
                tl.staggerTo($($container).find(moving).eq(i), .3, {y:-randomN * i, opacity:1, ease: Linear.easeNone, onComplete:function(){
                        TweenMax.staggerTo($(this.target), .3, {opacity:0, ease: Linear.easeNone});
                    }
                });
            }
        }).on(this.mouseleave, function(){
            for(var i=0;i<3;i++){
                TweenMax.staggerTo($(this).find(moving).eq(i), .3, {y:50, opacity:0, ease: Linear.easeNone});
            }
        })
    },
    BGMOTION: function(){
        $(this.$bgRect).on(this.mouseover, function(){
            var tl = new TimelineMax();
            tl.to($(this).find(rect), .3, {scaleX:1, ease: Linear.easeNone});
        }).on(this.mouseleave, function(){
            var tl = new TimelineMax();
            tl.to($(this).find(rect), 1, {scaleX:0, ease: Linear.easeNone, borderRadius:'none'});
        })
    },
}
$(function(){
    MOT.$body = $("body");
	hasJqueryObject(MOT.$body.find(".slideEffect")) && MOT.init();
})
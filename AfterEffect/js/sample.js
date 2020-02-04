function btnClick01(id,rep){
  var options = {
    container: document.getElementById(id),
    renderer: 'svg',
    loop: rep,
    autoplay: false,
    path: 'https://assets2.lottiefiles.com/packages/lf20_wX69nA.json'
  }
  return bodymovin.loadAnimation(options);
}

var animation = btnClick01('check', 1);
var animation2 = btnClick01('heart', true);
var animation3 = btnClick01('circle', 2);

  $(function(){
    $('.btn03').on('click', function(){
      animation.play();
    });
    $('.btn02').on('click', function(){
      animation2.play();
    });
    $('.input01').on('focus', function(){
      animation3.play();
    });
    $('.btn01').on('mouseenter', function(){
      animation.play();
    });
    $('.btn01').on('mouseleave', function(){
      animation.pause();
    });
    $('.btn02').on('mouseenter', function(){
      animation2.play();
    });
    $('.btn02').on('mouseleave', function(){
      animation2.pause();
    });
  });
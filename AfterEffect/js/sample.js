function btnClick01(id,rep){
  var options = {
    container: document.getElementById(id),
    renderer: 'svg',
    loop: rep,
    autoplay: false,
    path: 'https://assets2.lottiefiles.com/packages/lf20_wX69nA.json' //json파일이 있을 시 path: '경로'+ id + '.json'
  }
  return bodymovin.loadAnimation(options);
}

var animation = btnClick01('first', 1);
var animation2 = btnClick01('second', 1);
var animation3 = btnClick01('thirth', true);
var animation4 = btnClick01('fourth', true);

  $(function(){
    //오버하면 first 움직이 1번 시작돼요~
    $('.btn01').on('mouseenter', function(){
      animation.play();
    })
    //클릭하면 second 1번 움직여요~
    $('.btn02').on('click', function(){
      $(this).toggleClass('on');
      if( $(this).hasClass('on') ){
        animation2.play();
      } else {
        animation2.pause();
      }
    });
    //오버하면 thirth 무한 움직여요~ 벗어나면 멈춰요!
    $('.btn03').on('mouseenter', function(){
      animation3.play();
    }).on('mouseleave', function(){
      animation3.pause();
    });
    //포커스 되면 thirth 무한 움직임이 시작돼요~
    $('.input01').on('focus', function(){
      animation3.play();
    });
    // /포커스 되면 fourth 무한 움직임이 시작돼요~ 해제되면 멈춰요!
    $('.input02').on('focus', function(){
      animation4.play();
    }).on('focusout', function(){
      animation4.pause();
    })
  });
  // ID로 에펙 불러오기 (단점:1개의 ID만 사용 할 수 있다)
  var animation = bodymovin.loadAnimation({
    container: document.getElementById('animate'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets2.lottiefiles.com/packages/lf20_wX69nA.json'
  })

  // class를 사용하여 다중 에펙 불러오기 
  var classNaming = document.getElementsByClassName('effect'); // 적용할 에펙 위치
  for (var i=0;i<classNaming.length;i++){
    var jsonLoad = classNaming[i]; //각 클래스 찾기
    var itemPath = classNaming[i].dataset.item; //사용 할 path 가져오기
    var effect = bodymovin.loadAnimation({
      container: jsonLoad,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: itemPath,
    })
  }

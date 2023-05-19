function startScreenAnimation(){

  setTimeout(
    function(){
  c.drawImage(startScreenSprite, x, 0, 80, 64, 0,0,canvas.width, canvas.height );
  if (x<560) {
    requestAnimationFrame(startScreenAnimation);
  }

  x += 80;
  startButton.draw();
  console.log(x);

}

,300);

}
function startScreen(){

  var didStart = false;

  startScreenAnimation();
  window.addEventListener('touchstart',function(event){
    touchX = event.touches[0].pageX;
    touchY = event.touches[0].pageY;

    if (isClicked(startButton)&&!(didStart)) {
      didStart = true;
      main();

    }
  });
}
startScreen();

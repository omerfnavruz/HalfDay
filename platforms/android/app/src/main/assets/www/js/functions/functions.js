function Button(x, y, width, length, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = length;
        this.color = color;

        this.draw = function(){c.fillStyle = this.color; c.fillRect(this.x, this.y, this.width, this.height); //console.log(this.color);
        };

      }
function drawScientist(){
  c.drawImage(scientist,sx, sy, scidim, scidim, canvas.width/2-150*w, canvas.height - 350*w , 300*w, 300*w);
}
function isClicked(btn){
  if (touchX <=  btn.x + btn.width && touchX >= btn.x) {
    if (touchY <= btn.y + btn.height && touchY >= btn.y) {

      return true;

  }}
  return false;
}
function ResetView(c){
  c.clearRect(0,0,canvas.width,canvas.height);
  drawScientist();
  endDayButton.draw();
  inventoryButton.draw();
  lockDoorButton.draw();
 if (message1.isChoiceEnabled) {
    yesButton.draw();
    noButton.draw();
  }

}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function message(text, px, c){
    this.text = text;
    this.px = px;
    this.y = canvas.height - calculateLinenum(this.text.split(" "), canvas.width-2*px, this.px, c)*px -2*px ;
    this.isChoiceEnabled = false;
    this.choice = null;
    c.font = px+"px VT323";
    this.dialog = function(){
      console.log("is choiceenabled" + this.isChoiceEnabled);
      if (this.isChoiceEnabled) {
          ResetView(c);
          console.log("resetviewdone");
          this.y = canvas.height - calculateLinenum(this.text.split(" "), canvas.width-42*w, this.px, c)*px -2*px ;
          console.log("calculateLinenum done");
          fittext(this.text, this.px, this.y, this.px, canvas.width - 84*w, c);
          yesButton.draw();
          noButton.draw();
      }
      else if (!(this.isChoiceEnabled)){
      ResetView(c);
      fittext(this.text, this.px, this.y, this.px, canvas.width - 2*px, c);
    }
    }
      }



function generateRandomInt(limit){
  var num = Math.round(limit*Math.random());
  return num;
}
function doesHappen(probability){
  var random = generateRandomInt(100)
  if (random<=probability) {
    return true;
  }
  if (random > probability) {
    return false;
  }
  else console.log("error in doesHappen function");
}

function calculateLinenum(array, linelimit, px, c){
  var charnum = 0;
  var linenum = 0;
  for (var i = 0; i < array.length; ) {
      //console.log(c.measureText(array[i]).width, charnum, linelimit);
      if (c.measureText(array[i]).width + charnum < linelimit) {
        charnum += c.measureText(array[i]).width +px/2;
        i++;
      }
      else if (c.measureText(array[i]).width + charnum >= linelimit) {
        charnum = 5;
        linenum += 1;
        //console.log(linenum);
      }
      else {console.log("error");}
      //console.log(i);
}
return linenum;
}

function fittext(text, x, y, px, linelimit, c){
  this.x = x;
  this.y = y;
  console.log("x and y", x, y);
  var array = text.split(" ");
  var charnum = 0;
  var linenum = 0;

  c.fillStyle = "black";
  c.fillRect(this.x-px, this.y-px, linelimit+2*px, (calculateLinenum(array, linelimit, px, c)+2)*px);
  c.font = px+"px Shadows Into Light";
  for (var i = 0; i < array.length; ) {
      if (c.measureText(array[i]).width + charnum < linelimit) {
        c.fillStyle = "white";
        c.fillText(array[i], x + charnum , y + linenum*px);
        charnum += c.measureText(array[i]).width +px/2;
        i++;
        //console.log("here");
      }
      else if (c.measureText(array[i]).width + charnum >= linelimit) {
        charnum = 0;
        linenum ++;
      }
      //console.log(i);
  }
}

function manageLockDoorButton(c){
  if (isClicked(lockDoorButton)&&!(message1.isChoiceEnabled)) {
  if (!isDoorLocked) {
    //console.log("Door is locked");
    var tmpmsg = new message(DoorLockTexts.locked,px,c)
    message1 = tmpmsg;
    message1.dialog();
    isDoorLocked = true;
    lockDoorButton.color = "red";
    lockDoorButton.draw();
  }
  else if (isDoorLocked) {
    message1.text = DoorLockTexts.unlocked;
    message1.dialog();
    //console.log("Door is unlocked");
    isDoorLocked = false;
    lockDoorButton.color = "green";
    lockDoorButton.draw();
  }

}}


    function clrOutInv(){
      ResetView(c);

    }
    function inventoryDialog(x, y, num){
        clrOutInv();
        c.drawImage(inventory, inventoryX, inventoryY, inventoryWidth, inventoryHeight);
        invtext(num, x, y);

    }

    function invtext(num, x, y){

      if (num ==1) {
            fittext(invtext1, x, y, px, linelimit, c);
    }
      if (num == 2) {
            fittext(invtext2, x, y, px, linelimit, c);
      }
      if (num == 3) {
            fittext(invtext3, x, y, px, linelimitright, c);
      }
      if (num == 4) {
            fittext(invtext4, x, y, px, linelimit, c);
      }
    }

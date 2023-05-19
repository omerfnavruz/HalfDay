var app = {
  initialize: function(){this.bindEvents(); },
  bindEvents: function () {document.addEventListener('deviceready',this.onDeviceReady, false)},
  onDeviceReady: function () {



      screen.orientation.lock('landscape');
      setTimeout(function() {



        var canvas = document.getElementById('canvas');
        var c = canvas.getContext('2d');
        var touchX, touchY;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.backgroundColor = "green";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var healthLevel = 80;
        var sleepiness = 0;
        var isSleeping = false;
        var x = 0;
        var startScreenSprite = new Image();
        startScreenSprite.src = "img/startScreenSprite.png";
        var chemicalnum = 0;
        var daynum = 0;
        var hairLevel = 0;
        var beardLevel = 0;
        var eyeLevel = 0;
        var h = canvas.height/600;
        var w = canvas.width/800;
        var isInventoryOn = false;
        var inventoryWidth = canvas.width*0.8;
        var inventoryHeight = canvas.height*0.8;
        var inventoryX = canvas.width/10;
        var inventoryY= canvas.height/10;
        var invtext1 = inventoryprops.slot1;
        var invtext2 = inventoryprops.slot2;
        var invtext3 = inventoryprops.slot3;
        var invtext4 = inventoryprops.slot4;
        var px = Math.round(18 * canvas.width/640);
        var linelimit = 200*canvas.width/640;
        var linelimitright = 100*canvas.width/640;
        var startButton = new Button(canvas.width/2-100*w, canvas.height/2 +100*h, 200*w, 30*h, "white");
        var inventoryButton = new Button(20*w, 20*h, 40*w, 40*h, "red");
        var endDayButton = new Button (740*w, 20*h, 40*w, 40*h, "black");
        var lockDoorButton = new Button (50*w, 200*h, 60*w,  80*h, "green");
        var yesButton = new Button (750*w, 500*h, 40*w, 40*h, "purple");
        var noButton = new Button (750*w, 550*h, 40*w, 40*h, "pink");
        var inventory = new Image();
        var scilim = 16; // her satırda 16 resim var
        var scidim = 128; // fotolar 128 x 128
        var framenum, linenum, columnnum, sx,sy;
        var message1 = new message("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",px, c);
        var isDoorLocked = false;
        var currentEvent = null;

        inventory.src = "inventory.png";
        scientist = new Image();
        scientist.src = "img/scientist/scientistfull.png";
        framenum = 0;

        function main() {


        /*
        1. (75,210)
        2. (230,365)
        3. (385, 520)
        */
        window.addEventListener('touchstart', function(event){
          //console.log(event.touches);
          touchX = event.touches[0].pageX;
          touchY = event.touches[0].pageY;
          //console.log(touchX, touchY);
          if (!(isSleeping)) {


        //////////              INVENTORY BUTTON                 ////////////////////
          if (isClicked(inventoryButton)) {

                if (!(isInventoryOn)) {
                    clrOutInv();
                    c.drawImage(inventory, inventoryX, inventoryY, inventoryWidth, inventoryHeight);
                    isInventoryOn = true;
                }
                else if (isInventoryOn) {
                    c.clearRect(0,0,canvas.width, canvas.height);
                    c.drawImage(scientist,sx, sy, scidim, scidim, canvas.width/2-150*w, canvas.height - 350*w , 300*w, 300*w);
                    inventoryButton.draw();
                    endDayButton.draw();
                    lockDoorButton.draw();
                    message1.dialog();
                    isInventoryOn = false;
                }
            }
        //\\\\\\\\\\\\\\\\\\\\\ INVENTORY BUTTON \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        //////////              END DAY BUTTON    //////////////////////////////////
        if (isInventoryOn == false && !(message1.isChoiceEnabled)) {
        if (isClicked(endDayButton)) {


          //console.log("day ended");
          c.clearRect(0,0,canvas.width, canvas.height);
          newDay();

        }}
        //\\\\\\\\\\\\\\\\\\\\\\\\\   END DAY BUTTON \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        //%%%%%%%%%%%%%%%%%%%%%%%%   LOCK DOOR BUTTON %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        manageLockDoorButton(c);
        //%%%%%%%%%%%%%%%%%%%%%%%%   LOCK DOOR BUTTON %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

        //++++++++++++++++++++++++    Event Results ++++++++++++++++++++++++++++++++++++++++++++++
        if (message1.isChoiceEnabled) {
          if (isClicked(yesButton)) {
            AcceptedResultExecutor(currentEvent, px, c);
          }
          if (isClicked(noButton)) {
            RejectedResultExecutor(currentEvent,px,c);
          }
        }
        //++++++++++++++++++++++++    Event Results ++++++++++++++++++++++++++++++++++++++++++++++

        //!!!!!!!       INVENTORY DIALOGS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (isInventoryOn) {
        //      ~~~~~~~~~          DIALOG NUMBER 1              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        if (touchX <= 210/640*canvas.width && touchX >= 75/640*canvas.width + 30/640*canvas.width) {
          if (touchY <= (inventoryY + inventoryHeight)/2 && touchY >= inventoryY+ 30/360*canvas.height) {

          inventoryDialog(touchX, touchY, 1);

        }}
        //      ~~~~~~~~~          DIALOG NUMBER 2              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        if (touchX <= 365/640*canvas.width && touchX >= 230/640*canvas.width  + 30/640*canvas.width) {
          if (touchY <= (inventoryY + inventoryHeight)/2 && touchY >= inventoryY + 30/360*canvas.height) {

          inventoryDialog(touchX, touchY, 2);

        }}
        //      ~~~~~~~~~          DIALOG NUMBER 3              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        if (touchX <= 550/640*canvas.width && touchX >= 385/640*canvas.width  + 30/640*canvas.width) {
          if (touchY <= (inventoryY + inventoryHeight)/2 && touchY >= inventoryY + 30/360*canvas.height) {

          inventoryDialog(touchX, touchY, 3);

        }}
        //      ~~~~~~~~~          DIALOG NUMBER 4              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        if (touchX <= 210/640*canvas.width && touchX >= 75/640*canvas.width + 30/640*canvas.width) {
          if (touchY >= (inventoryY + inventoryHeight)/2 && touchY >= ((inventoryY + inventoryHeight)/2) + 30/360*canvas.height) {

          inventoryDialog(touchX, touchY, 4);

        }}

        }}
        });

        setTimeout(newDay, 2000);

        }
        function newDay(){
          isSleeping = true;
          daynum +=1;
          c.fillStyle = "black";
          c.fillRect(0,0,canvas.width, canvas.height);
          c.fillStyle = "white";
          c.font = 2*px+"px Shadows Into Light";
          c.fillText("Day "+daynum, canvas.width/2 - 2*px, canvas.height/2 - px/2);
          setTimeout(function(){
            isSleeping = false;



          if (isDoorLocked) {
            if (sleepiness>=20) {
              sleepiness -= 20;
            }
            else
              sleepiness = 0;
          }
          else sleepiness += 10;
          if (daynum>1) {

            if (sleepiness > 50 && eyeLevel<1) {
              framenum += 2;
              eyeLevel += 1;
            }
            else if (sleepiness < 50 && eyeLevel>0) {
              framenum -= 2;
              eyeLevel -= 1;
            }
            if (doesHappen(10) && framenum + 4 <= 47 && beardLevel < 2) {
              beardLevel += 1;
              framenum += 4;
              console.log("sakal: " +beardLevel);
            }
            if (doesHappen(30)&& framenum + 12 <= 47 && hairLevel < 3) {
              hairLevel +=1
              framenum += 12;
              console.log("saç " + hairLevel);
            }
          }
         //framenum =  generateRandomInt(47);
         linenum = Math.floor(framenum/scilim);
         columnnum = framenum % scilim;

         sx = scidim*columnnum;
         sy = scidim*linenum;

        ResetView(c);
        if (daynum ==1) {
        message1.dialog();
        }

        if(eventhandler(event1, px, c)){
          event1.DidHappen = true;
        }
         if (eventhandler(event2, px, c)){
          event2.DidHappen = true;
        }
        else
        currentevent = null;
        c.fillStyle = "green";
        c.font = px+"px Shadows Into Light";
        c.fillText(daynum, canvas.width - 20*w, 20*h);
        //console.log(linenum, columnnum);
        }, 3000);
        }

}/*delay*/, 2000);
}/*ondevice ready*/};//app

app.initialize();

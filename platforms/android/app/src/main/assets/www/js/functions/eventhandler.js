function AcceptedResultExecutor(inputEvent, px, c){
  if (doesHappen(inputEvent.SuccessRate)) {
    inputEvent.SuccessEffect();
    message1 = new message(inputEvent.SuccessText, px, c);
    message1.dialog();
    console.log(healthLevel);
  }
  else {
    inputEvent.FailEffect();
    message1 = new message(inputEvent.FailText, px, c);
    message1.dialog();
    console.log(healthLevel);
  }
  return;
}

function RejectedResultExecutor(inputEvent, px, c){
  if (doesHappen(inputEvent.NothingRate)) {
    message1 = new message(inputEvent.NothingText, px, c);
    message1.dialog();
    console.log("nothing");
  }
  else {
    inputEvent.BadNewsEffect();
    message1 = new message(inputEvent.BadNewsText, px, c);
    message1.dialog();
    console.log("bad news");
  }
  return;
}

function eventhandler(inputevent, px, c){

var tmpevent;
tmpevent = inputevent;
var occuringProbability;




if (!(tmpevent.DidHappen)) {

  if (!(tmpevent.RequiresLeave && isDoorLocked)){
    if (!(tmpevent.RequiresStay && !(isDoorLocked))) {
      if (daynum>=tmpevent.MinDay && daynum <= tmpevent.MaxDay) {
      occuringProbability = 100/(tmpevent.MaxDay - daynum)
        if (doesHappen(occuringProbability)) {
          message1 = new message (tmpevent.QuestionText, px, c);
          message1.isChoiceEnabled = true;
          message1.dialog();
          currentEvent = tmpevent;
          return true;



        }
      }
    }
  }
}




return false;


}

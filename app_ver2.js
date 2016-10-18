(function () {
   'use strict';

   var minutes = document.getElementById('minutesTimer');
   var seconds = document.getElementById('secondsTimer');
   var timerId;
   var flag = 0;
   var faqHTML = "<div class='faq-content'>";
   faqHTML += "<h2> FAQ Page </h2>";
   faqHTML += "<h3>I. What is Pomodoro Technique? </h3>";
   faqHTML += "<p>The time management technique created by Francesco Cirillo for a more productive way to work and study. For more information, <a href='http:\/\/pomodorotechnique.com\/'>click here.</a></p>";
   faqHTML += "<h3>II. What's New in here?</h3>";
   faqHTML += "<ol><li>LocalStorage(update)</li><li>Desktop Notification(update)</li><li>Web Audio API(update)</li><li>Responsive Wed Design</li></ol>";
   faqHTML += "</div>";

   window.onload = function(){
     var faqModalElement = document.createElement("section");
     var container = document.getElementsByClassName('container')[0];

    document.body.insertBefore(faqModalElement,container.nextSibling);
     faqModalElement.setAttribute('class', 'faqmodal');
     faqModalElement.setAttribute('id', 'faq');
     faqModalElement.innerHTML = faqHTML;
   };

   function updateTime(){
     flag++;
     var secondsTimer = Number(seconds.innerHTML);
     var minutesTimer = Number(minutes.innerHTML);

     if (secondsTimer === 0) {
       secondsTimer = 60;
     }

     secondsTimer--;

     if (secondsTimer === -1) {
       secondsTimer = 59;
     }
     if (secondsTimer === 59) {
       minutesTimer--;
     }

     if (secondsTimer < 10) {
       secondsTimer = "0" + secondsTimer;
     }
     if (minutesTimer < 10) {
       minutesTimer = "0" + minutesTimer;

    if (minutesTimer.length > 2) {
          minutesTimer = minutesTimer.substring(minutesTimer.length - 2);
       }
     }
     seconds.innerHTML = secondsTimer;
     minutes.innerHTML = minutesTimer;
     endTime();
   }

   function startTimer(){
     timerId = setInterval(updateTime, 1000);
   }

   function stopTimer(){
      clearInterval(timerId);
      flag = 0;
   }

   function resetTimer(){
      clearInterval(timerId);
      flag = 0;
      if (Number(minutes.innerHTML) <= 5) {
        minutes.innerHTML = "05";
        seconds.innerHTML = "00";

      }else if (Number(minutes.innerHTML) <= 10){
        minutes.innerHTML = 10;
        seconds.innerHTML = "00";
      } else{
        minutes.innerHTML = 25;
        seconds.innerHTML = "00";
      }

   }

   function makeTime(minutesTime){
     return function(){
       minutes.innerHTML = minutesTime;
       seconds.innerHTML = "00";
       endTime();
     };
   }

    var pomodoroTime = makeTime("25");
    var breakLongTime = makeTime("10");
    var breakShortTime = makeTime("05");

   function endTime(){
     if (minutes.innerHTML === "00" && seconds.innerHTML === "00") {
        clearInterval(timerId);
     }
   }

   function keyboardShortcut(event){
     var x = event.which || event.keyCode;
     if (event.altKey) {
       if(x === 80 || x === 112) {
         return pomodoroTime();
       }

       if (x === 83 || x === 115) {
         return breakShortTime();
       }

       if (x === 76 || x === 108) {
         return breakLongTime();
       }

       if (x === 82 || x === 114) {
         return resetTimer();
       }
     } // end altkey

    if (x === 32 && flag === 0) {
      return startTimer();
    } else {
      return stopTimer();
    }

   }



   function showFaqPage(){
     var faqModal = document.getElementsByClassName('faqmodal')[0];
     var faqContent;
     if (faqModal.firstChild.nodeType === 1) {
       faqContent = faqModal.firstChild;
     } else {
        faqContent = faqModal.firstChild.nextSibling;
     }
     faqModal.style.display = 'block';
     faqModal.style.height = screen.height + "px";
     faqModal.style.width = screen.width + "px";
     faqContent.style.animationName = "slideDown";
     faqContent.style.animationDuration = "3s";
     document.getElementById('faq').addEventListener('click', hideFaqPage);
   }

   function hideFaqPage(){
     var faqModal = document.getElementsByClassName('faqmodal')[0];
     faqModal.style.display = 'none';
   }


   document.getElementById('startpomodoro').addEventListener('click', pomodoroTime);
   document.getElementById('starttimer').addEventListener('click', startTimer);
   document.getElementById('shortbreak').addEventListener('click', breakShortTime);
   document.getElementById('longbreak').addEventListener('click', breakLongTime);
   document.getElementById('stoptimer').addEventListener('click', stopTimer);
   document.getElementById('resettimer').addEventListener('click', resetTimer);
   document.addEventListener('keydown',keyboardShortcut);

   document.getElementById('faqclick').addEventListener('click', showFaqPage);

}());

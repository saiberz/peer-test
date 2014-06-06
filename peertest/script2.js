console.log("hi world");

function sendButton_onclick(){
    var message = $("#sendText").val();
    var $newli = $("<li/>",{
	class: 'other', // self
    }).appendTo(".discussion");

    var $newdiv = $("<div/>",{
	class: 'avatar'
	}).appendTo($newli);
    
    $("<img/>",{
	src : 'http://lorempixel.com/100/100/people/' //src
    }).appendTo($newdiv);

    var $newdiv2 = $("<div/>",{
	class: 'messages'
    }).appendTo($newli);
    
    var $newp = $("<p/>",{
	text : message
    }).appendTo($newdiv2);

   var $newtime = $("<time/>",{
	text : "hora"
    }).appendTo($newdiv2);

}

function minimize(){
  $(".module").hide();
}

function addMessage(){


}

$("#sendText").keypress(textChange);

function textChange(e){
    var ENTER_KEY = 13;

    if (e.keyCode === ENTER_KEY) {
	sendButton_onclick();
	$("#sendText").val("");
	$('.discussion').scrollTop($('.discussion')[0].scrollHeight);

    }
    

}

window.onload= function (){
    var peer = new Peer({key: '11fmnald3g7j5rk9'});
    var DataRef = new Firebase('https://len.firebaseIO.com');
    var DataUsers = new Firebase('https://len.firebaseIO.com/users');
    var pushRef;
    var id = null;
    var conn = null;
    var id2 = null;

    window.onbeforeunload=exitUser;
    $("#bStart").click(startConnection);
    $("#bSend").click(sendMessage);
    $("#sendText").keypress(textChange);



    peer.on('open', function(idp) {
	id = idp;
	pushRef = DataUsers.push();    
	pushRef.set({
	    id: idp
	});
	console.log('My peer ID is: ' + id);
    });

    function startConnection(){
	id2 = $("#id2Box").val();
	conn = peer.connect(id2);

	peer.on('connection', function(conn) {
	    conn.on('data', function(data){
		// Will print 'hi!'
		console.log(data);
		sendButton_onclick(data,'other');
	    });
	});

    }

    function exitUser (){
	pushRef.remove();
    }


    DataUsers.on('child_added', function(e){
	e =e.val();
	
	if (id != e.id)
	    var $newp = $("<p/>",{
		text : e.id,
		id : e.id
	    }).appendTo("#boxUsers");

    });


    DataUsers.on('child_removed', function(e){
	$("#"+e.id).remove();
    });


    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    function sendButton_onclick(message2,who){
	var message = $("#sendText").val();
	var $newli = $("<li/>",{
	    class: who // self
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
	    text : message2
	}).appendTo($newdiv2);

	var $newtime = $("<time/>",{
	    text : "hora"
	}).appendTo($newdiv2);

    }

    function minimize(){
	$(".module").hide();
    }


    function textChange(e){
	var ENTER_KEY = 13;

	if (e.keyCode === ENTER_KEY) {
	    sendMessage();
	    $('.discussion').scrollTop($('.discussion')[0].scrollHeight);

	}
	
    };


    function sendMessage(){
	console.log("envian");
	id2 = $("#id2Box").val();
	conn = peer.connect(id2);
	var message = $("#sendText").val();

	conn.on('open', function(){
	    conn.send(message);
	    sendButton_onclick(message,'self');
	    console.log("right message "+message);
	});   

	$("#sendText").val('');
    }

};

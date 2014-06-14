$( window ).ready(function() {
    var peer = new Peer({key: '11fmnald3g7j5rk9'});
    var DataRef = new Firebase('https://len.firebaseIO.com');
    var DataUsers = new Firebase('https://len.firebaseIO.com/users');
    var pushRef;
    var id = null;
    var conn = null;
    var id2 ;
    var lastm = "99";
    var newm = "";

    $("#bStart").click(startConnection);
    $("#bSend").click(sendMessage);
    $("#sendText").keypress(textChange);    
    $( window ).unload(exitUser);
    $( "p" ).live( "click", showId);


    var userName = prompt("please enter your name ");
    

    peer.on('open', function(idp) {
	id = idp;
	pushRef = DataUsers.push();    
	pushRef.set({
	    userName : userName,
	    id: id
	});
	console.log('My peer ID is: ' + id);
    });

    function showId(){
	var tx = $( this ).attr('id');
	$( this ).css( "color","red" );
	$("#id2Box").val(tx);
    }

    function startConnection(){
	id2 = $("#id2Box").val();
	conn = peer.connect(id2);

	peer.on('connection', function(conn) {
	    conn.on('data', function(data){
		// Will print 'hi!'
		console.log(data);
		send(data,'other');
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
		text : e.userName,
		id : e.id
	    }).appendTo("#boxUsers");

    });


    DataUsers.on('child_removed', function(e){
	e = e.val();
	$("#"+e.id).remove();
    });


    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    function send(message2,who){
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

	$('.discussion').scrollTop($('.discussion')[0].scrollHeight);
	lastm = message;




    }

    function textChange(e){
	var ENTER_KEY = 13;

	if (e.keyCode === ENTER_KEY ) {
	    sendMessage();
	    $('.discussion').scrollTop($('.discussion')[0].scrollHeight);
	}
	
    };


    function sendMessage(){
	var message = $("#sendText").val();
	id2 = $("#id2Box").val();

	conn = peer.connect(id2);
	conn.on('open', function(){
	    conn.send(message);
	    send(message,'self');
	    console.log("right message "+message);
	});   
	
	$("#sendText").val('');
    }



});




var peer1,peer2;

function gotPeer() {
  $('#blueNote2').append('Connected to Partner');
  PartnerIdTxt.value = peer2.peer;
}

function setPeer2Data()
{
  peer2.on('data', function(data)
  {
    InBox.value = InBox.value + 'PARTNER:  ' + data + '\r';
  });
}

var lastMsg;

function MyIdBtn_onclick() {
    peer1 = new Peer(MyIdTxt.value,{
    key: 'jdwgvfk0xelmobt9',
    debug: 3,
    logFunction: function() {
      var newMsg = Array.prototype.slice.call(arguments).join(' ');
      if (newMsg != lastMsg)
      {
        $('.log').append(newMsg + '<br>');
        if ((newMsg.indexOf('disconnected') + newMsg.indexOf('WARNING') + newMsg.indexOf('ERROR')) > -3)
          alert(newMsg);
        lastMsg = newMsg;
      }
    },
    config: {'iceServers': [
      { url: 'stun:stun.l.google.com:19302' }
    ]} /* Sample servers, please use appropriate ones */
  });
  peer1.on('open', function(id){
   $('#blueNote1').append('Socket Opened');
  });
  peer1.on('connection', function(connect) {
    peer2 = connect;
    peer2.on('open', function() {
      gotPeer();
    });
  setPeer2Data();
  });
  $('#browsers').text(navigator.userAgent);    // Show browser version
  window.onunload = window.onbeforeunload = function(e) {
    if (!!peer1 && !peer1.destroyed) {
      peer1.destroy(); }
    if (!!peer2 && !peer2.destroyed) {
      peer2.destroy(); }
  };
}

function PartnerIdBtn_onclick() {
  try
  {
    peer2 = peer1.connect(PartnerIdTxt.value, {
      label: 'chat',
      serialization: 'none',
      reliable: false,
      metadata: {message: 'hi i want to chat with you!'}
    });
    peer2.on('open', function() {
      gotPeer(); });
    peer2.on('error', function(err) {
      alert(err); });
    peer2.on('connection', function(peer2) {
      alert('did connection'); });
    setPeer2Data();
  }
  catch(e)
  {
    $('.log').append(e + '<br>');
    alert('"MY ID" must be opened first.');
  }
}

function sendBtn_onclick() {
    peer2.send(OutBox.value);
    InBox.value = InBox.value + 'ME:  ' + OutBox.value + '\r';
    OutBox.value = '';
}

    











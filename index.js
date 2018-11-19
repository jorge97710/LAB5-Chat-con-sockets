const fetch = require("node-fetch");
var FormData = require('form-data');

var pruebarep = 0;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');
});

http.listen(3001, function () {
  console.log('listening on *:3001');
});


io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

});

io.on('connection', function (socket) {
  socket.on('send message', function (msg) {

    var obj = JSON.parse(msg);

    console.log('id: ' + obj.student_id + ' text: ' + obj.text + ' nick: ' + obj.nick);
       const urll = 'http://34.210.35.174:7000';
            //var url = 'https://example.com/profile';
            //var data = {username: 'example'}; esto sera el string
            Firm = new FormData();
            Firm.append("student_id",obj.student_id);
            Firm.append("text",obj.text);
            Firm.append("nick",obj.nick);
            fetch(urll, {
            method: 'POST', // or 'PUT'
            body: Firm // data can be `string` or {object}!  
            })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

  });
});

io.on('connection', function (socket) {
  //socket.on('recive message', function (msg) {
  //    console.log('message: informacion');
  //  });
  setInterval(miprueba, 1000);
  //socket.emit('recive message',miprueba());

  function miprueba() {
    var prueba;
    //io.emit('recive message',"HOLA!!!!!!!!!!!!!");
    const url = 'http://34.210.35.174:7000'; // Get 10 random users
    fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(resp => {
        // Here you get the data to modify as you please
        //console.log("resp original tiene "+ resp.length);
        //console.log("COPIADA tiene " + pruebarep);
        if (resp.length != pruebarep) {

          //          console.log(resp.length);
          //console.log("__________ES DIFERENTE Y SE MANDA___________");

          pruebarep = resp.length;
          socket.emit('recive message', resp);
        } else {
          //console.log("-----------------------ES IGUAL, NO SE MANDA----------------");
        }

      })

    //prueba = "HOLA";
  }


});



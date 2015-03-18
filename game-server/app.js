var pomelo = require('pomelo');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'ava_engine');

// app configuration
//global 全局
app.configure('production|development', function(){

      //mysql 数据库
      //config 
      app.loadConfig('mysql', app.getBase() + '/config/mysql.json');  

});

//mysql连接点
app.configure('production|development', 'gate|connector|auth' , function(){

      var dbclient = require('./app/database/mySql/mySql').init(app);
      app.set('dbclient', dbclient); 
      //设置同步
      //app.use(sync, {sync: {path:__dirname + '/app/database/mapping', dbclient: dbclient}});
      //创建玩家池
      var pp =require('./app/unit/playerPool.js');
      var playerpool=new pp();
      app.set('playerpool',playerpool);
});







//connector server
app.configure('production|development', 'connector', function(){


  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,

      
      /*connector : pomelo.connectors.sioconnector,
      //websocket, htmlfile, xhr-polling, jsonp-polling, flashsocket
      transports : ['websocket'],
      heartbeats : true,
      closeTimeout : 60,
      heartbeatTimeout : 60,
      heartbeatInterval : 20*/
    });
});


//gate server
app.configure('production|development', 'gate', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,

      
      /*connector : pomelo.connectors.sioconnector,
      //websocket, htmlfile, xhr-polling, jsonp-polling, flashsocket
      transports : ['websocket'],
      heartbeats : true,
      closeTimeout : 60,
      heartbeatTimeout : 60,
      heartbeatInterval : 20*/
    });
});

//login server
app.configure('production|development', 'auth', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,

      
      /*connector : pomelo.connectors.sioconnector,
      //websocket, htmlfile, xhr-polling, jsonp-polling, flashsocket
      transports : ['websocket'],
      heartbeats : true,
      closeTimeout : 60,
      heartbeatTimeout : 60,
      heartbeatInterval : 20*/
    });
});




// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});

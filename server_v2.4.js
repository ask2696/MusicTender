var express = require('express');
var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
var formidable = require("formidable");
var child_p = require('child_process');

var requestIp = require('request-ip');
var compression = require('compression');



var app = express();

var server = http.createServer(app);

const dir = './Music_files'

var current_playlist = [];
var input_newsong = '';
var now_play='';
var stream_local = 1;
var index = 1;
var position = 0;
var song_list_local = [];
var full_song_list =[];
var child_p = require('child_process');
var return_interval = 3000;
var upcoming_play_display = "";
var flag = false;

var queue_input_user_upcoming = [];
var queue_upcoming_play = [];
//var queue_upcoming_play_disp =[];

var now_play_display = "";
var next_song = true;

var queue_upcoming_play_display_list = [];

var request_info_list =[];
var req_num = 0;

fs.readdir(dir,function(err,songlist){
    //console.log(songlist);
    song_list_local = songlist;
    full_song_list = songlist;
    
    playlist_queue_process(song_list_local);

    
});

function playlist_queue_process(song_list_local){
    playlist_queue = song_list_local;
    queue_upcoming_play = playlist_queue;
    var rand = queue_upcoming_play.shift();
    //console.log(" 0 " + queue_upcoming_play);
    now_play = rand;
    upcoming_play = playlist_queue[index];
    //queue_upcoming_play_disp = queue_upcoming_play.slice(0);
}




app.use(compression()); //use compression 
app.use(express.static('public'));
app.use(requestIp.mw());

/*app.use(function(req, res) {
    // by default, the ip address will be set on the `clientIp` attribute
    var ip = req.clientIp;
    console.log("Request:")
    console.log("Client's IP" + ip)
    //res.end(ip + '\n');
});
*/
app.get('/index.html',function(req,res){
    //console.log(req);
    //res.sendFile(__dirname + "/" + "index.html");


    fs.readFile(__dirname + "/" + "index.html",function(error,data){               
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data, "utf8");
                    res.end();
                    });

});

app.get('/index1.html',function(req,res){
    //console.log(req);
    //res.sendFile(__dirname + "/" + "index.html");
    //console.log("Request:")
    //var ip = req.clientIp;
    
    //console.log("Client's IP" + ip)

    fs.readFile(__dirname + "/" + "index1.html",function(error,data){               
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data, "utf8");
                    res.end();
                    });

});

app.get('/index_mobile.html',function(req,res){
    //console.log(req);
    //res.sendFile(__dirname + "/" + "index.html");
    //console.log("Request:")
    //var ip = req.clientIp;
    
    //console.log("Client's IP" + ip)

    fs.readFile(__dirname + "/" + "index_mobile.html",function(error,data){               
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data, "utf8");
                    res.end();
                    });

});

app.post('/index.html',function(request,response){

                    console.log("Got Post!!");
                    var form = new formidable.IncomingForm();
                    
                    var request_info = new Object();
                    
                    var dt = new Date();
                    var dt_now = dt.toJSON();
                
                    request_info.tym = dt_now;  

                    
                    var ip = request.clientIp;
    
                    console.log("Request/Client's IP" + ip)

                    request_info.ip_addr = ip;

                    console.log("Date:" + dt_now)

                    form.parse(request,function(err,field){

                        // change input_newsong to LIST
                        input_newsong = field;
                        console.log(input_newsong.song1);
                        input_user = input_newsong.song1;

                        request_info.song_name = input_user;
                        req_num +=1;
                        request_info.request_num = req_num; 

                        temp_upcoming_play_display = input_user;

                        if(queue_input_user_upcoming.indexOf(temp_upcoming_play_display) == -1)
                        {
                            queue_input_user_upcoming.splice(position, 0, temp_upcoming_play_display);
                            console.log(" 1 " + queue_input_user_upcoming);
                            queue_upcoming_play.splice(position, 0, temp_upcoming_play_display);
                            //console.log(" !!! " + queue_upcoming_play);
                            
                            //queue_upcoming_play = queue_upcoming_play.slice(1);  
                            //console.log("$$$$$")
                            //console.log(queue_upcoming_play)
                            //console.log("$$$$$")    
                            //deleting the input from the list from the end, to avoid repetition
                            var search_term = input_user;
                            for(var i = queue_upcoming_play.length-1; i>=0; i--)
                            {
                                if(queue_upcoming_play[i] == search_term)
                                {
                                    queue_upcoming_play.splice(i,1);
                                    break;
                                }
                            }

                            /*console.log(" ### " + queue_upcoming_play);

                            for(var i = queue_upcoming_play_disp.length-1; i>=0; i--)
                            {
                                if(queue_upcoming_play_disp[i] == search_term)
                                {
                                    queue_upcoming_play_disp.splice(i,1);
                                    break;
                                }
                            }*/

                            console.log(" 2 " + queue_upcoming_play);
                            position += 1;
                            flag = true;
                        }



                    fs.readFile(__dirname + "/" + "index.html",function(error,data){               
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                    response.end();
                    });

                     
                    request_info_list.push(request_info);

                    fs.appendFile('data_logger.txt', request_info.request_num +" | "+ request_info.song_name + " | " + request_info.tym + " | " + request_info.ip_addr+ "\n" , function (err) {
                                    if (err) throw err;
                                    console.log('Saved!');
                                });

                });

})

app.post('/index_mobile.html',function(request,response){

                    console.log("Got Post!!");
                    var form = new formidable.IncomingForm();
                    
                    var request_info = new Object();
                    
                    var dt = new Date();
                    var dt_now = dt.toJSON();
                
                    request_info.tym = dt_now;  

                    
                    var ip = request.clientIp;
    
                    console.log("Request/Client's IP" + ip)

                    request_info.ip_addr = ip;

                    console.log("Date:" + dt_now)

                    form.parse(request,function(err,field){

                        // change input_newsong to LIST
                        input_newsong = field;
                        console.log(input_newsong.song1);
                        input_user = input_newsong.song1;

                        request_info.song_name = input_user;
                        req_num +=1;
                        request_info.request_num = req_num; 

                        temp_upcoming_play_display = input_user;
                        if(queue_input_user_upcoming.indexOf(temp_upcoming_play_display) == -1)
                        {
                            queue_input_user_upcoming.splice(position, 0, temp_upcoming_play_display);
                            console.log(" 1 " + queue_input_user_upcoming);
                            queue_upcoming_play.splice(position, 0, temp_upcoming_play_display);
                            //console.log(" !!! " + queue_upcoming_play);
                            
                            //queue_upcoming_play = queue_upcoming_play.slice(1);  
                            //console.log("$$$$$")
                            //console.log(queue_upcoming_play)
                            //console.log("$$$$$")    
                            //deleting the input from the list from the end, to avoid repetition
                            var search_term = input_user;
                            for(var i = queue_upcoming_play.length-1; i>=0; i--)
                            {
                                if(queue_upcoming_play[i] == search_term)
                                {
                                    queue_upcoming_play.splice(i,1);
                                    break;
                                }
                            }

                            /*console.log(" ### " + queue_upcoming_play);

                            for(var i = queue_upcoming_play_disp.length-1; i>=0; i--)
                            {
                                if(queue_upcoming_play_disp[i] == search_term)
                                {
                                    queue_upcoming_play_disp.splice(i,1);
                                    break;
                                }
                            }*/

                            console.log(" 2 " + queue_upcoming_play);
                            position += 1;
                            flag = true;
                        }

                    fs.readFile(__dirname + "/" + "index_mobile",function(error,data){               
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                    response.end();
                    });

                     
                    request_info_list.push(request_info);

                    fs.appendFile('data_logger_mobile.txt', request_info.request_num +" | "+ request_info.song_name + " | " + request_info.tym + " | " + request_info.ip_addr+ "\n" , function (err) {
                                    if (err) throw err;
                                    console.log('Saved!');
                                });

                });

})

app.post('/index1.html',function(request,response){

                    console.log("Got Post!!");
                    var form = new formidable.IncomingForm();
                    form.parse(request,function(err,field){

                        // change input_newsong to LIST
                        input_newsong = field;
                        console.log(input_newsong.song1);
                        input_user = input_newsong.song1;
        

                        temp_upcoming_play_display = input_user;
                        queue_input_user_upcoming.splice(position, 0, temp_upcoming_play_display);
                        console.log(" 1 " + queue_input_user_upcoming);
                        queue_upcoming_play.splice(position, 0, temp_upcoming_play_display);
                        /*console.log("$$$$$")
                        console.log(queue_upcoming_play)
                        console.log("$$$$$")   */ 
                        //deleting the input from the list from the end, to avoid repetition
                        var search_term = input_user;
                        for(var i = queue_upcoming_play.length-1; i>=0; i--)
                        {
                            if(queue_upcoming_play[i] == search_term)
                            {
                                queue_upcoming_play.splice(i,1);
                                break;
                            }
                        }
                        console.log(" 2 " + queue_upcoming_play);
                        position += 1;
                        flag = true;

                    

                    fs.readFile(__dirname + "/" + "index1.html",function(error,data){               
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                    response.end();
                    });

                });

})
//var dummy = false;
setInterval(function()
{
    if(stream_local) 
    {
        stream_local = 0;
        now_play_display = now_play;
        if(flag == true)
        {
            position -= 1;
            flag = false;
        }
       /* else if(dummy){
            queue_upcoming_play_disp = queue_upcoming_play_disp.slice(1);
            
        }
        dummy = true;*/
        console.log(position);
        //console.log(queue_upcoming_play_disp)
        var player_vlc = child_p.exec('vlc Music_files/\"' + now_play_display + '\" --play-and-exit',function(error,stdout,stderr){
            if(error)
            {
                console.log("Error code"+error.code);
                console.log("Error Sig"+error.signal);
            }

            console.log("Stdout "+stdout);
            console.log("Stderr "+stderr);
            stream_local = 1;
            
            
            now_play = queue_upcoming_play.shift();
            //console.log(" 3 " + queue_upcoming_play);
            random = queue_input_user_upcoming.shift(); // don't use random anywhere.
            //console.log(" 4 " + queue_upcoming_play);

        });

    }
    if(queue_upcoming_play.length <= 10)
    {
        queue_upcoming_play.append(playlist_queue);
    }
    switch(queue_input_user_upcoming.length)
    {
        case 0:
            queue_input_user_upcoming[0] = "Waiting for user input.";
            queue_input_user_upcoming[1] = "Waiting for user input.";
            queue_input_user_upcoming[2] = "Waiting for user input.";
            queue_input_user_upcoming[3] = "Waiting for user input.";
            queue_input_user_upcoming[4] = "Waiting for user input.";
        case 1:
            queue_input_user_upcoming[1] = "Waiting for user input.";
            queue_input_user_upcoming[2] = "Waiting for user input.";
            queue_input_user_upcoming[3] = "Waiting for user input.";
            queue_input_user_upcoming[4] = "Waiting for user input.";
        case 2:
            queue_input_user_upcoming[2] = "Waiting for user input.";
            queue_input_user_upcoming[3] = "Waiting for user input.";
            queue_input_user_upcoming[4] = "Waiting for user input.";
        case 3:
            queue_input_user_upcoming[3] = "Waiting for user input.";
            queue_input_user_upcoming[4] = "Waiting for user input.";
        case 4:
            queue_input_user_upcoming[4] = "Waiting for user input.";
        

    }


    },return_interval);



var listener = io.listen(server);
listener.sockets.on('connection', function(socket){

    socket.on('join', function(data_client) {
        //console.log(data_client);
        //console.log("Client Connected!!")
    });

   

    setInterval(function(){
        socket.emit('data_send', {'now_playing': now_play_display,
                                  'upcoming':queue_upcoming_play,
                                  'user_input':queue_input_user_upcoming});
    }, 0);

});

server.listen(8081,"0.0.0.0");
console.log("Server listening at 8081")
/*var server = app.listen(8081,function(){
    var host = server.address().address
    var port = server.address().port

    console.log("server listening at"port)
});*/

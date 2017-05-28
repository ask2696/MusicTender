var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
var formidable = require("formidable");
const dir = './Music_files'
var child_p = require('child_process');
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

var now_play_display = "";
var next_song = true;

var queue_upcoming_play_display_list = [];


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
}

// Create the application (server) to start taking inputs and playing songs
var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;

    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('hello world');
            response.end();
            break;
        case '/index.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404!!");
                    response.end();
                }
                else if(request.method.toLowerCase() == 'get'){
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                    response.end();
                }
                else if(request.method.toLowerCase() == 'post'){
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

                                    
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                    response.end();

                    });

                }
            });
            break;
        case '/socket.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404!!");
                    response.end();
                }
                else{
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            response.end();
            break;
    }
});


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
        console.log(position);
        var player_vlc = child_p.exec('vlc Music_files/\"'
                                        + now_play_display
                                        + '\" --play-and-exit',
                                        function(error,stdout,stderr)
       

        {
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
   
    setInterval(function(){
        socket.emit('data_send', {'now_playing': now_play_display,
                                  'upcoming':queue_upcoming_play,
                                  'user_input':queue_input_user_upcoming});
    }, 0);

});

server.listen(8080);

console.log("Server Listening at 8080");
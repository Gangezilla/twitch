var streamerInfo = [];
var twitchURL = '';
var link, avatar, displayName;

var streamers =  ["sylux98","inetkoxtv","storbeck", "terakilobyte", "habathcx","thomasballinger","ladykubu","noobs2ninjas","beohoff", "lethalfrag"];
getChannel();
function getChannel(){
  
  streamers.forEach(function(streamer, i) {   //forEach executes a function once per array element
   
    function makeURL(type, name) {
    twitchURL = 'https://api.twitch.tv/kraken/' + type + '/' + name + '?callback=?&output=embed'
      return twitchURL; 
    };
    
 $.getJSON(makeURL("streams", streamer), function(json) { //this 'just works' in that it will loop through all the above names there to get me info. neato burritos.
  var game, status;
  var link = json._links.channel;
   if ((json.stream) === undefined) {
     status = 'Sorry! This person has disabled their account.';
   }
   
   else if ((json.stream) === null) {
     status = 'offline';
     game = "offline";

   }
   else {
     status = 'online';
     game = (json.stream.game);
   };
   //console.log(i+ ": " +streamers[i] +"///"+ game + "//(JSON call 1)");
   //////////////////////////////////////////////////////////////////////
    $.getJSON(makeURL("channels", streamer), function(json) {
      //console.log(json);
      avatar = json.logo;
      link = json.url;
      displayName = json.display_name;
      //console.log(i+": " +displayName+ " is playing " + game + i +" //(JSON call 2)");
      
      if (avatar == null) {
        avatar = 'http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png';
      }
      
      if (status == 'online') {
      $('<a href = "'+link+'<div class = "row">\
<div class = "postsDiv" id = "postNum'+i+'">\
<div class = "col-sm-3 bigRowOn">\
<img class = "postsImage" src = "'+avatar+'"</img>\
</div>\
<div class = "col-sm-3 bigRowOn"> <p class = "postsName">' + displayName + '</p></div>\
<div class = "col-sm-6 bigRowOn"><p class = "postsGame">Online, and playing: ' + game + '</p></div>\
</div>\
</div></a>').appendTo('#streamBox');
      }
      
      if (status == 'offline') {
        $('<a href = "'+link+'"<div class = "row">\
<div class = "postsDiv" id = "postNum'+i+'">\
<div class = "col-sm-3 bigRowOff">\
<img class = "postsImage" src = "'+avatar+'"</img>\
</div>\
<div class = "col-sm-3 bigRowOff"> <p class = "postsName">' + displayName + '</p></div>\
<div class = "col-sm-6 bigRowOff"><p class = "postsGame">' + game + '</p></div>\
</div>\
</div></a>').appendTo('#streamBox');
      }
     });//end of first getJSON func.///////////////////////////////
    }); //end of second getJSON request.
  });//end of forEach func.
};//end of getChannel function
$( function(){
   var $upvotedSongsButt = $('#upvoted-songs-butt');
   var $upcomingSongsButt = $('#upcoming-song-butt');
   var $upvatedSongsList = $('#upvoted-song-list');
   var $upcomingSongsList = $('#upcoming-song-list');

   $upvotedSongsButt.click(function(){
       $upcomingSongsButt.removeClass('active');
       $(this).addClass('active');
       $upcomingSongsList.css('display', 'none');
       $upvatedSongsList.css('display', 'block');
   })

   $upcomingSongsButt.click(function(){
       $upvotedSongsButt.removeClass('active');
       $(this).addClass('active');
       $upcomingSongsList.css('display', 'block');
       $upvatedSongsList.css('display', 'none');
   })

})
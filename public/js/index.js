$( function() {
   var $upvotedSongsButt = $('#upvoted-songs-butt');
   var $upcomingSongsButt = $('#upcoming-song-butt');
   var $upvotedSongsList = $('#upvoted-song-list');
   var $upcomingSongsList = $('#upcoming-song-list');

   $upvotedSongsButt.click(function() {
       $upcomingSongsButt.removeClass('active');
       $(this).addClass('active');
       $upcomingSongsList.hide();
       $upvotedSongsList.show();
   });

   $upcomingSongsButt.click(function() {
       $upvotedSongsButt.removeClass('active');
       $(this).addClass('active');
       $upcomingSongsList.show();
       $upvotedSongsList.hide();
   });
});

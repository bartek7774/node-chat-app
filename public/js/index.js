let socket = io();
socket.on('listRooms', function (rooms) {  
  let template = jQuery('#room-template').html();
  let html = Mustache.render(template, {rooms});
  jQuery('#rooms').append(html);
});

jQuery('#rooms').on('change',(evt)=>{
  let selected=jQuery('#rooms').val();
  if(selected.trim()!==""){
    $('input[name=room]').val(selected);
  }
});
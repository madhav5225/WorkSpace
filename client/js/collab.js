const socket = io();

var last_sync_version=0;
var pending_changes=[];
var sent_changes=[];
var doc=null;

socket.on('msg',data=>{
    console.log(data)
});

socket.emit('collab',"hello");

$('#collab_space').keypress((e)=>{
    console.log('keypressed')
    var character = String.fromCharCode(e.charCode);
    var operation_details = {
        type:"insert",
        char: character,
        pos: doc!=null?doc.length:0
    }
    pending_changes.push(operation_details);
    console.log(pending_changes);
    socket.emit('operation',operation_details,function(response){
        console.log(response);
        pending_changes.shift();
        sent_changes.push(operation_details);
        doc = response.doc;
        last_sync_version = response.last_sync_version;
        console.log(doc);
    })

})

socket.on('emit',data=>{
    console.log(data);
})
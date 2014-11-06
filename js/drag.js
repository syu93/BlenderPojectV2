$(document).ready(function(){
function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain",
    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
} 
function drag_over(event) { 
    event.preventDefault(); 
    return false; 
} 
function drop(event) { 
    var offset = event.dataTransfer.getData("text/plain").split(',');
    var dm = document.getElementById('dragme');
    dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    event.preventDefault();
    return false;
}
    $('#dropable')
        .mousedown(function(){
            var dm = document.getElementById('dragme'); 
            $('#dragme').attr('draggable', 'true');
            dm.addEventListener('dragstart',drag_start,false); 
            document.body.addEventListener('dragover',drag_over,false); 
            document.body.addEventListener('drop',drop,false);
        })
        .mouseup(function(){
            var dm = document.getElementById('dragme'); 
            $('#dragme').attr('draggable', 'false');
            // dm.removeEventListener('dragstart',drag_start,false);
            // document.body.removeEventListener('dragover',drag_over,false); 
            // document.body.removeEventListener('drop',drop,false);        
        });


});
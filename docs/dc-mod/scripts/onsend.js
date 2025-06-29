function onSend(){
      const raw = $('#userInput').value.trim();
if(!raw) return;
$('#userInput').value = '';
autoAdvance = false;
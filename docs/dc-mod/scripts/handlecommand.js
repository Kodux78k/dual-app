function handleCommand(cmd) {
  if (cmd.startsWith('ascii:')) {
    const art = cmd.split(':')[1];
    const cont = document.querySelector('#chat-container');
    renderASCIIResponse(cont, atob(art));
  } else {
    callAI(cmd).then(resp => {
      renderResponse(resp);
    });
  }
}
document.getElementById('send-btn').addEventListener('click', () => {
  const input = document.getElementById('input-box').value;
  renderResponse('...');
  callAI(input).then(resp => renderResponse(resp));
});
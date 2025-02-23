function onClickButton() {
  console.log('clicked button');
  window.clipboard.writeTextToClipboard('hey');
  console.log('wrote to clipboard');
}

document.getElementById('my-btn').addEventListener('click', onClickButton);
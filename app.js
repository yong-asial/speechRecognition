"use strict";

const statusElement = document.getElementById('status');
const resultElement = document.getElementById('result');
let openedWindows = [];

if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
  const ERROR_MESSAGE ='Speech recognition is not supported. Please use latest Chrome browser.'
  statusElement.innerText = ERROR_MESSAGE;
  throw new Error(ERROR_MESSAGE);
}

const updateStatus = (msg) => {
  statusElement.innerText = msg;
};

const updateResult = (msg) => {
  resultElement.innerText = msg;
  msg = msg.toLowerCase().trim();
  let url = '';
  
  if (msg.indexOf('youtube') >= 0) {
    url = 'https://www.youtube.com/watch?v=o_UUYwymh30';
  } else if (msg.indexOf('facebook') >= 0) {
    url = 'https://www.facebook.com/';
  } else if (msg.indexOf('netflix') >= 0) {
    url = 'https://www.netflix.com/watch/80186941?trackId=14170286&tctx=2%2C0%2Ce9d858ff-05ef-4226-9074-8d8076977738-13884761%2C1d9231a9-026c-4ce2-b45d-5f20d363448e_13557532X3XX1593322432840%2C1d9231a9-026c-4ce2-b45d-5f20d363448e_ROOT%2C';
  } else if (msg.indexOf('goblin') >= 0) {
    url = 'https://www.youtube.com/watch?v=0RZOGKiIeiI&t=971s';
  } else if (msg.indexOf('github') >= 0) {
    url = 'https://github.com/monaca';
  } else if (msg.indexOf('jira') >= 0) {
    url = 'https://monaca.atlassian.net/jira/your-work';
  } else if (msg.indexOf('close') >= 0) {
    if (openedWindows && openedWindows.length) {
      const openWindow = openedWindows.pop();
      if (openWindow) openWindow.close();
    }
  }

  if (url) {
    openedWindows.push(window.open(url));
  }
}

try {
  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = false;

  recognition.onstart = () => {
    updateStatus('Voice recognition started. Try speaking into the microphone 🔊');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    updateResult(transcript);
  };

  recognition.onend = () => {
    updateStatus(`Recording Has Stopped 👏. Resuming soon`);
    setTimeout(() => {
      recognition.start()
    }, 0);
  };

  recognition.start();
} catch (error) {
  console.error(error);
  throw error;  
}

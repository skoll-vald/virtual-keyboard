import keyboardLabels from './keyboardLabels.js';

console.log(keyboardLabels.KeyA.rus.default); // Output: ф

const wrapper = document.createElement('div');

wrapper.setAttribute('id', 'wrapper');
wrapper.setAttribute('class', 'wrapper');

document.body.appendChild(wrapper);

const textarea = document.createElement('textarea');

textarea.setAttribute('class', 'textarea');
textarea.setAttribute('id', 'textarea');

wrapper.appendChild(textarea);

const keyboard = document.createElement('div');

keyboard.setAttribute('class', 'keyboard');
keyboard.setAttribute('id', 'keyboard');

wrapper.appendChild(keyboard);

const keyRows = [];

let lang = localStorage.getItem('lang') || 'rus';
let keyState = localStorage.getItem('keyState') || 'caseDown';

// Define the rows and their corresponding keys
const rows = [  
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight']
];

rows.forEach((rowKeys) => {
  const keyRow = document.createElement('div');
  keyRow.classList.add('row');

  rowKeys.forEach((key) => {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key', key);

    const langSpans = {};
    Object.keys(keyboardLabels[key]).forEach((language) => {
      const langSpan = document.createElement('span');
      langSpan.classList.add(language);
      langSpan.classList.add('hidden');
      Object.keys(keyboardLabels[key][language]).forEach((state) => {
        const keyStateSpan = document.createElement('span');
        keyStateSpan.classList.add(state);
        if (language === lang && state === keyState) {
          keyStateSpan.classList.remove('hidden');
          keyStateSpan.textContent = keyboardLabels[key][language][state];
        } else {
          keyStateSpan.classList.add('hidden');
          keyStateSpan.textContent = keyboardLabels[key][language][state];
        }
        langSpan.appendChild(keyStateSpan);
      });
      langSpans[language] = langSpan;
    });

    Object.keys(langSpans).forEach((language) => {
      keyElement.appendChild(langSpans[language]);
    });

    keyRow.appendChild(keyElement);
  });

  keyRows.push(keyRow);
});

keyRows.forEach((row) => keyboard.appendChild(row));

function updateKeyLabels() {
  const keyElements = document.querySelectorAll('.key');
  keyElements.forEach((keyElement) => {
    let langSpans = keyElement.querySelectorAll(`.${lang}`);
    langSpans.forEach((langSpan) => {
      const keyStateSpans = langSpan.querySelectorAll(`.caps, .caseDown, .caseUp, .shiftCaps`);
      keyStateSpans.forEach((keyStateSpan) => {
        if (keyStateSpan.classList.contains(keyState)) {
          keyStateSpan.classList.remove('hidden');
          langSpan.classList.remove('hidden');
        } else {
          keyStateSpan.classList.add('hidden');
        }
      });
      const otherLang = lang === 'eng' ? 'rus' : 'eng';
      const otherLangSpans = keyElement.querySelectorAll(`.${otherLang}`);
      otherLangSpans.forEach((otherLangSpan) => {
        const otherKeyStateSpans = otherLangSpan.querySelectorAll(`.caps, .caseDown, .caseUp, .shiftCaps`);
        otherKeyStateSpans.forEach((otherKeyStateSpan) => {
          otherKeyStateSpan.classList.add('hidden');
        });
        otherLangSpan.classList.add('hidden');
        localStorage.setItem('keyState', keyState);
      });
    });
  });
}
updateKeyLabels();

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey) {
    event.preventDefault();
    if (lang === 'eng') {
      lang = 'rus';
    } else if (lang === 'rus') {
      lang = 'eng';
    }
    localStorage.setItem('lang', lang);
    updateKeyLabels();
  }
});

let isShiftPressed = false;
let isCapsLockOn = false;
function updateKeyState() {
  if (isCapsLockOn && isShiftPressed) {
    keyState = 'shiftCaps';
  } else if (isCapsLockOn) {
    keyState = 'caps';
  } else if (isShiftPressed) {
    keyState = 'caseUp';
  } else {
    keyState = 'caseDown';
  }
  console.log(keyState);
  updateKeyLabels();
}


document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = true;
    event.preventDefault();
    updateKeyState();
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = false;
    event.preventDefault();
    updateKeyState();
  }
});

const shiftLeftButton = document.querySelector('.ShiftLeft');
const shiftRightButton = document.querySelector('.ShiftRight');

shiftLeftButton.addEventListener('mousedown', () => {
  isShiftPressed = true;
  updateKeyState();
});

shiftRightButton.addEventListener('mousedown', () => {
  isShiftPressed = true;
  updateKeyState();
});

document.addEventListener('mouseup', () => {
  if (isShiftPressed) {
    isShiftPressed = false;
    updateKeyState();
  }
});


document.addEventListener('keydown', (event) => {
  if (event.key === 'CapsLock') {
    isCapsLockOn = !isCapsLockOn;
    event.preventDefault();
    updateKeyState();
  }
});

document.querySelector('.CapsLock').addEventListener('click', () => {
  isCapsLockOn = !isCapsLockOn;
  updateKeyState();
});

document.addEventListener('keydown', (event) => {
  const key = document.querySelector(`.key.${event.code}`);
  if (key && event.code !== 'CapsLock') {
    key.classList.add('active');
  }
});

document.addEventListener('keyup', (event) => {
  const key = document.querySelector(`.key.${event.code}`);
  if (key && event.code !== 'CapsLock') {
    key.classList.remove('active');
  }
});

// Caps active
document.addEventListener('keydown', (event) => {
  const key = document.querySelector(`.key.${event.code}`);
  if (key) {
    if (event.code === 'CapsLock' && !isCapsLockOn) {
      return;
    }
    key.classList.add('active');
  }
});

document.addEventListener('keyup', (event) => {
  const key = document.querySelector(`.key.${event.code}`);
  if (key) {
    if (event.code === 'CapsLock' && isCapsLockOn) {
      return;
    }
    key.classList.remove('active');
  }
});

// textarea behavior
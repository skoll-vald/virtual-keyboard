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
let lang = 'eng';
let keyState = 'caseDown';

// Define the rows and their corresponding keys
const rows = [  
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
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
    langSpans[lang].classList.remove('hidden');

    Object.keys(langSpans).forEach((language) => {
      keyElement.appendChild(langSpans[language]);
    });

    keyRow.appendChild(keyElement);
  });

  keyRows.push(keyRow);
});

keyRows.forEach((row) => keyboard.appendChild(row));

const capsLockKey = document.querySelector('.CapsLock');

capsLockKey.addEventListener('click', () => {
  const keys = document.querySelectorAll('.caps');

  keys.forEach((key) => {
    key.classList.toggle('hidden');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey) {
    event.preventDefault();
    const langElements = document.querySelectorAll('.key span');
    langElements.forEach((langElement) => {
      const langClassList = langElement.classList;
      if (langClassList.contains('rus')) {
        langClassList.toggle('hidden');
      } else if (langClassList.contains('eng')) {
        langClassList.toggle('hidden');
      }
    });
  }
});

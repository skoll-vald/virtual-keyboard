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
const lang = 'rus';

// Define the rows and their corresponding keys
const rows = [  
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight']
];

// Loop through each row
rows.forEach((rowKeys) => {
  // Create a div element for the row
  const keyRow = document.createElement('div');
  keyRow.classList.add('keyboard--row');
  keyRow.classList.add('row');

  // Loop through each key in the row
  rowKeys.forEach((key) => {
    // Create a div element for the key
    const keyElement = document.createElement('div');
    keyElement.classList.add('key');
    keyElement.classList.add(key);

    // Create spans for each language and key state
    const langSpans = {};
    Object.keys(keyboardLabels[key]).forEach((language) => {
      const langSpan = document.createElement('span');
      langSpan.classList.add(language);
      langSpan.classList.add('hidden');
      Object.keys(keyboardLabels[key][language]).forEach((keyState) => {
        const keyStateSpan = document.createElement('span');
        keyStateSpan.classList.add(keyState);
        keyStateSpan.classList.add('hidden');
        keyStateSpan.textContent = keyboardLabels[key][language][keyState];
        langSpan.appendChild(keyStateSpan);
      });
      langSpans[language] = langSpan;
    });

    // Append the spans to the key element
    Object.keys(langSpans).forEach((language) => {
      keyElement.appendChild(langSpans[language]);
    });

    // Append the key element to the row
    keyRow.appendChild(keyElement);
  });

  // Append the row element to the array of rows
  keyRows.push(keyRow);
});

// Add the rows to the keyboard element
keyRows.forEach((row) => keyboard.appendChild(row));

const capsLockKey = document.querySelector('.CapsLock');

capsLockKey.addEventListener('click', () => {
  const keys = document.querySelectorAll('.caps');

  keys.forEach((key) => {
    key.classList.toggle('hidden');
  });
});

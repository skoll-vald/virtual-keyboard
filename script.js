// Create a new div element
const wrapper = document.createElement('div');

// Set the id and class attributes
wrapper.setAttribute('id', 'wrapper');
wrapper.setAttribute('class', 'wrapper');

// Append the wrapper element to the document body
document.body.appendChild(wrapper);

// Create a new textarea element
const textarea = document.createElement('textarea');

// Set the class and id attributes
textarea.setAttribute('class', 'textarea');
textarea.setAttribute('id', 'textarea');

// Add the textarea element to the document body
wrapper.appendChild(textarea);

// Create a new textarea element
const keyboard = document.createElement('div');

// Set the class and id attributes
keyboard.setAttribute('class', 'keyboard');
keyboard.setAttribute('id', 'keyboard');

// Add the textarea element to the document body
wrapper.appendChild(keyboard);

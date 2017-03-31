/* eslint new-cap: 0 */
const getSelectionText = (win = window) => {
  const elem = document.activeElement;

  if (elem && elem.tagName.toLowerCase() === 'input') {
    return document.activeElement.value.substring(elem.selectionStart, elem.selectionEnd);
  }

  return win.getSelection().toString();
};

const maxLength = (options) => {
  const curentLength = options.string.length;
  const pasteLength = (options.paste && options.paste.length) - 41 || 0;
  const selectionLength = getSelectionText(options.win).length;

  console.log(curentLength, pasteLength, selectionLength);

  return ((options.maxLen + selectionLength) - (curentLength + pasteLength)) > 0;
};

export default function validation(options) {
  switch (options.type) {
    case 'MAX_LENGTH':
      return maxLength(options);

    default:
      return true;
  }
}

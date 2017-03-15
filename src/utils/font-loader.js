const addFont = function addFont(font) {
  const style = document.createElement('style');

  style.rel = 'stylesheet';
  document.head.appendChild(style);
  style.textContent = font;
};

export default function loadFont({name, path}) {
  if (localStorage[name]) {
    addFont(localStorage[name]);
  } else {
    fetch(path)
      .then(response => response.text())
      .then((fontText) => {
        localStorage[name] = fontText;
        addFont(fontText);
      });
  }
}

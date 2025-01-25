export default class Section {
  // Constructor takes two parameters
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // The array of raw data that we want to convert to html and place on the page
    this._renderer = renderer; // The function that takes 'raw data', converts it to an html element, and sticks it on the DOM
    this._container = document.querySelector(containerSelector); // The container element where items will be added
  }

  // Method to render all items. Loop through the array of items, and convert each item to html, and add it to the DOM
  renderItems() {
    this._items.forEach((item) => {
      // For each item, call the renderer function to create the DOM element
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element); //   method should be called when adding an individual card to the DOM.
  }
}

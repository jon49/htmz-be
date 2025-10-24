customElements.define('x-html', class extends HTMLElement {
  // static get observedAttributes() { return ['data-time']; }
  constructor() {
    super();
    this.update();
  }

  update() {
    setTimeout(() => {
      const template = this.querySelector('template');
      if (template) {
        let content = template.content.cloneNode(true);
        let html = []
        for (let el of Array.from(content.children)) {
          html.push(el.outerHTML)
        }

        this.insertAdjacentHTML('beforeend', `<pre>${
          html.join('\n').replace(/</g, '&lt;').replace(/>/g, '&gt;').trim()
        }</pre>`);
      }
    })
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   // this.init();
  // }
});

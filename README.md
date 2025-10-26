<h1>HTMZ a Back-End Driven Hypermedia Approach</h1>

See [the web page for complete documentation and examples.](https://jon49.github.io/htmz-be/)

<nav>
  <a href="#introduction">Introduction</a> |
  <a href="#documentation">Documentation</a>
</nav>

<h2 id="introduction">Introduction</h2>

<p><em><a href="https://leanrada.com/htmz/">HTMZ</a> is a minimalist HTML
  microframework for creating interactive and modular web user interfaces with
  the familiar simplicity of plain HTML.</em> This is an "extension" that I have
  made to make it even more powerful and flexible.</p>

<p><span>Features:</span></p>
<ul>
  <li>Automatic partial page updates</li>
  <li>Seamless form submissions</li>
  <li>Back end driven hypermedia requests. The back end determines how to update the front end.</li>
  <li>Lightweight and easy to use</li>
</ul>

<h2 id="documentation">Documentation</h2>

<p>This implementation of HTMZ uses four APIs to determine how the updates are applied.</p>

<ol>
  <li><code>id</code>
    <p>The id attribute matches the element that will be updated. It
    replaces the original element with the new content. This is the
    simplicist and easiest way to perform updates.</p>
  </li>
  <li><code>hz-target</code>
    <p>uses the query selector to determine what element to update.</p>
  </li>
  <li><code>hz-swap</code>
    <p>determines how the content is inserted. There are four different values which can be used:</p>
    <ul>
      <li><code>replaceWith</code> - replaces the content of the target
      element (default). In practice this never needs to be explicit.</li>
      <li><code>append</code> - appends the content to the end of the target element</li>
      <li><code>prepend</code> - prepends the content to the beginning of the target element</li>
      <li><code>before</code> - inserts the content before the target element</li>
      <li><code>after</code> - inserts the content after the target element</li>
    </ul>
  </li>
  <li><code>template</code>
    <p>When you do not have a root HTML element use the <code>template</code>
      element. This is useful for inserting table rows, list items, and other
      elements that do not have a single root element. When you return an
      empty <code>template</code> it will delete the old template when you
      use the strategy <code>replaceWith</code> (which is default, of course).</p>
  </li>
</ol>
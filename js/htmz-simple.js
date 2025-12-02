window.htmz = function htmz(frame) {
  let location = frame.contentWindow?.location
  if (location == null || location.href === "about:blank") return;

  let doc = frame.contentDocument
  for (let el of Array.from(doc.body.children).concat(Array.from(doc.head.children))) {
    // before, prepend, append, after
    let swap = el.getAttribute("hz-swap") ?? "replaceWith"
    let targetQuery = el.getAttribute("hz-target") || el.id && `#${el.id}`
    let target = document.querySelector(targetQuery)
    if (el?.tagName === "TEMPLATE") el = el.content.cloneNode(true)
    target?.[swap]?.(el)
  }

  frame.remove()
  document.body.appendChild(frame)
  location.replace("about:blank")

  document.dispatchEvent(new CustomEvent("hz:completed", { detail: { location } }))
}

document.body.insertAdjacentHTML("beforeend", `<iframe hidden name=htmz onload="window.htmz(this)"></iframe>`)
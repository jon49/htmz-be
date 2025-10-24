/**
 * @param {URL} url 
 * @param {Request} request 
 * @returns {Response | undefined}
 */
export async function routeHandler(url, request) {
  if (url.pathname.endsWith("/new/")) {
    let data = await request.formData()
    let item = data.get("item")
    let now = Date.now()

    let content = html("todoResponse", `
<li id="_${now}" hz-target="#list" hz-swap="append">
    ${item} <button form="post" formaction="./delete?id=_${now}">X</button>
</li>
<p id=events class=highlight>Added item &mdash; "${item}"!</p>`)

    return getResponse(content)
  }

  if (url.pathname.endsWith("/delete/")) {
    let id = url.searchParams.get("id")
    let content = html("todoResponse", `
<template id="${id}"></template>
<p id=events class=highlight>Removed id: ${id}</p>`)

    return getResponse(content) 
  }

  if (url.pathname.endsWith("/new-row/")) {
    let now = new Date()
    let content = html("tableResponse", `
<template hz-target="tbody" hz-swap="prepend">
  <tr><td>Yes!</td><td>${now.toLocaleDateString()} &mdash; ${now.toLocaleTimeString()}</td></tr>
  <tr><td>No!</td><td>${now.toLocaleDateString()} &mdash; ${now.toLocaleTimeString()}</td></tr>
</template>`)

    return getResponse(content)
  }

  if (url.pathname.endsWith("/clear-table/")) {
    let content = html("tableResponse", `
<template hz-target="tbody">
  <tbody></tbody>
</template>
`)

    return getResponse(content)
  }

  if (url.pathname.endsWith("/link/")) {
    let messages = [
      "I have no special talent. I am only passionately curious. &mdash; Albert Einstein",
      "The important thing is not to stop questioning. Curiosity has its own reason for existing. &mdash; Albert Einstein",
      "Life is like riding a bicycle. To keep your balance, you must keep moving. &mdash; Albert Einstein",
      "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution. &mdash; Albert Einstein",
      "Try not to become a man of success, but rather try to become a man of value. &mdash; Albert Einstein",
      "The successful warrior is the average man, with laser-like focus. &mdash; Bruce Lee",
      "Do not pray for an easy life, pray for the strength to endure a difficult one. &mdash; Bruce Lee",
      "Knowing is not enough, we must apply. Willing is not enough, we must do. &mdash; Bruce Lee",
      "Mistakes are always forgivable, if one has the courage to admit them. &mdash; Bruce Lee",
      "Adapt what is useful, reject what is useless, and add what is specifically your own. &mdash; Bruce Lee",
    ]
    let randomIndex = Math.floor(Math.random() * messages.length)
    let randomMessage = messages[randomIndex]
    let content = html("linkResponse", `
<p id=link class="highlight"><strong>${randomMessage}</strong></p>`)

    return getResponse(content)
  }
}

function html(id, content) {
  // let now = Date.now()
  return `
    ${content}
    <pre id="${id}">${escapeHtml(content)}</pre>
  `
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function getResponse(content) {
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/html"
    }
  })
}

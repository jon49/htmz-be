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
    let content = html("linkResponse", `
<p id=link class="highlight"><strong>Whoever first figured out HTMZ is a genius!</strong></p>`)

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

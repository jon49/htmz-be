(() => {

async function wait() {
  return new Promise(resolve => setTimeout(resolve, 100))
}

function start() {
  (async () => {
    while (!document.querySelector("summary[show-html-code]")) {
      await wait()
    }
  })().then(() => {
    setHTMLCode()
  })
}

function setHTMLCode() {
  for (let summary of document.querySelectorAll("summary[show-html-code]")) {
    let ids = summary.getAttribute("show-html-code")
    for (let id of ids.split(" ")) {
      let $code = document.getElementById(id)
      let details = summary.parentElement
      let pre = document.createElement("pre")
      pre.textContent =  $code.innerHTML.trim().replace("&gt;", ">")
      details.append(pre)
    }
  }
}

start()

})()
class Construct {
  constructor() {
    this.time = Date.now()
    this.el = null
  }
}
class HoodAlert {
  constructor() {
    this.time = Date.now()
    this.smallOn = false
  }
  static el(name) {
    return document.createElement(name)
  }
  static string(data) {
    data.toString = function () {
      return `[${typeof data}: HoodAlert]`
    }
  }
  static toString() {
    return "[Construct: HoodAlert]"
  }
  small(text) {
    if (this.smallOn) this.smallOn.remove()
    let res = new Construct()
    res.onclick = function(){}
    let el = HoodAlert.el("div")
    this.smallOn = el
    let span = HoodAlert.el("span")
    let closeBtn = HoodAlert.el("span")
    closeBtn.innerHTML = "x"
    closeBtn.style.float = "right"
    closeBtn.style.color = "red"
    el.append(span, closeBtn)
    res.el = el
    res.onclose = function () { }
    el.className = "hui-alert-small"
    span.innerHTML = text
    document.body.append(el)
    el.classList.add("hui-alert-small-a-0")
    res.close = function () {
      el.classList.remove("hui-alert-small-a-0")
      el.style.webkitAnimationPlayState = "running";
      el.classList.add("hui-alert-small-a-1")
      setTimeout(function () {
        el.remove()
        res.onclose()
      }, 1000)
    }
    HoodAlert.string(this.small)
    setTimeout(function () {
      res.close()
    }, 5000)
    closeBtn.addEventListener("click", function () {
      res.close()
    })
    el.addEventListener("click", function () {
      res.onclick()
    })
    return res
  }
}
let alert = new HoodAlert()
alert.small("hi")

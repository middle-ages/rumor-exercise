const findHnd = () => document.querySelector(".handle")
const htmlData = () => document.querySelector("html").dataset
const setTheme = theme => htmlData()["theme"] = theme
const isPageDark = () => htmlData()["theme"] === "dark"

const classList = selector =>
  document.querySelector(selector).classList

const toggleClass = (find, cls) => {
  const classes = classList(find)
  if (isPageDark()) classes.remove(cls)
  else classes.add(cls)
}

const toggle = () => {
  setTheme(isPageDark() ? "light" : "dark")
  toggleClass(".handle", "knob-l")
  toggleClass(".tongue", "tongue-l")
}

function knobClick() {
  const code = window.event["code"]
  if (code === undefined || code === "Space" || code === "Enter") {
    toggle()
    window.event.preventDefault()
  } else if (code === "Escape") {
    findHnd().blur()
  }
}

const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

if (darkMediaQuery.matches) toggle()
else setTheme("light")

darkMediaQuery.addEventListener("change", e =>
  e.matches !== isPageDark() && toggle()
)

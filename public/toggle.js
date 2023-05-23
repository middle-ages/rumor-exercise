const findHnd = () => document.querySelector(".hnd");
const htmlData = () => document.querySelector("html").dataset;
const isPageDark = () => htmlData()["theme"] === "dark";

const classList = selector =>
  document.querySelector(selector).classList;

const toggleClass = (find, cls) => {
  const classes = classList(find);
  if (isPageDark()) classes.remove(cls);
  else classes.add(cls);
};

const toggle = () => {
  htmlData()["theme"] = isPageDark() ? "light" : "dark";
  toggleClass(".hnd", "knb-l");
  toggleClass(".tng", "tng-l");
};

function knbClick() {
  const code = window.event["code"];
  if (code === undefined || code === "Space" || code === "Enter") {
    toggle();
    window.event.preventDefault();
  } else if (code === "Escape") {
    findHnd().blur();
  }
}

const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
if (darkMediaQuery.matches) toggle();
darkMediaQuery.addEventListener("change", (e) => {
  const isDark = e.matches;
  if (isDark && !isPageDark()) toggle();
  if (!isDark && isPageDark()) toggle();
});

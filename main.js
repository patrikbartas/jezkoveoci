const VIEWBOX = {
  width: 100,
  height: 125,
};

const EYES = [
  { id: "left-eye", cx: 15.79, cy: 69.03, neutralDeg: -160 },
  { id: "right-eye", cx: 26.355, cy: 73.4, neutralDeg: -147 },
];

const hedgehog = document.getElementById("hedgehog");
const body = document.body;
const trackedEyes = EYES.map((eye) => ({
  ...eye,
  element: document.getElementById(eye.id),
})).filter((eye) => eye.element);

let lastPointer = null;
const THEME_KEY = "jezko-theme";

function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore storage failures and keep runtime behavior.
  }
}

function setTheme(isDark) {
  if (!body) {
    return;
  }
  body.classList.toggle("theme-dark", isDark);
  saveTheme(isDark ? "dark" : "light");
}

function toggleTheme() {
  const isDark = body?.classList.contains("theme-dark");
  setTheme(!isDark);
}

const savedTheme = readSavedTheme();
if (savedTheme === "dark") {
  setTheme(true);
} else if (savedTheme === "light") {
  setTheme(false);
}

function setEyeRotation(pointerX, pointerY) {
  if (!hedgehog || trackedEyes.length === 0) {
    return;
  }

  const rect = hedgehog.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) {
    return;
  }

  for (const eye of trackedEyes) {
    const eyeX = rect.left + (eye.cx / VIEWBOX.width) * rect.width;
    const eyeY = rect.top + (eye.cy / VIEWBOX.height) * rect.height;
    const targetDeg = (Math.atan2(pointerY - eyeY, pointerX - eyeX) * 180) / Math.PI;
    const rotationDeg = targetDeg - eye.neutralDeg;
    eye.element.style.setProperty("--rotation", `${rotationDeg.toFixed(2)}deg`);
  }
}

window.addEventListener(
  "pointermove",
  (event) => {
    lastPointer = { x: event.clientX, y: event.clientY };
    setEyeRotation(lastPointer.x, lastPointer.y);
  },
  { passive: true },
);

window.addEventListener("resize", () => {
  if (!lastPointer) {
    return;
  }
  setEyeRotation(lastPointer.x, lastPointer.y);
});

if (hedgehog) {
  hedgehog.addEventListener("click", toggleTheme);
}

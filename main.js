const results = document.getElementById("results");
const generateButton = document.getElementById("generate-button");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleIcon = themeToggle.querySelector(".theme-toggle-icon");
const themeToggleLabel = themeToggle.querySelector(".theme-toggle-label");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function setTheme(theme, persist = false) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `${isDark ? "화이트" : "다크"}모드로 전환`);
  themeToggleIcon.textContent = isDark ? "☀" : "☾";
  themeToggleLabel.textContent = `${isDark ? "화이트" : "다크"}모드`;
  themeColorMeta.setAttribute("content", isDark ? "#111a15" : "#f5f7f4");

  if (persist) {
    try {
      localStorage.setItem("lucky-pick-theme", theme);
    } catch (error) {
      // Private browsing may disable storage; the theme still applies for this page.
    }
  }
}

setTheme(document.documentElement.dataset.theme || "light");
themeToggle.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
});

generateButton.addEventListener("click", generateLotto);

function generateLotto() {
  const fragment = document.createDocumentFragment();

  for (let setNumber = 1; setNumber <= 5; setNumber += 1) {
    const numbers = Array.from({ length: 45 }, (_, index) => index + 1);

    // Fisher–Yates 셔플로 중복 없는 번호 6개를 고릅니다.
    for (let index = numbers.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [numbers[index], numbers[randomIndex]] = [numbers[randomIndex], numbers[index]];
    }

    const lottoNumbers = numbers.slice(0, 6).sort((a, b) => a - b);
    const card = document.createElement("article");
    card.className = "lotto-card";
    card.setAttribute("aria-label", `${setNumber}번째 추천 번호 세트`);

    const heading = document.createElement("div");
    heading.className = "card-heading";

    const label = document.createElement("span");
    label.className = "card-label";
    label.textContent = `PICK ${String(setNumber).padStart(2, "0")}`;

    const numberBadge = document.createElement("span");
    numberBadge.className = "card-number";
    numberBadge.textContent = String(setNumber);
    heading.append(label, numberBadge);
    card.appendChild(heading);

    const balls = document.createElement("div");
    balls.className = "balls";
    balls.setAttribute("aria-label", lottoNumbers.join(", "));

    lottoNumbers.forEach((number) => {
      const ball = document.createElement("span");
      ball.className = `ball ${getBallColor(number)}`;
      ball.textContent = String(number);
      balls.appendChild(ball);
    });

    card.appendChild(balls);
    fragment.appendChild(card);
  }

  results.replaceChildren(fragment);
}

function getBallColor(number) {
  if (number <= 10) return "ball-yellow";
  if (number <= 20) return "ball-blue";
  if (number <= 30) return "ball-red";
  if (number <= 40) return "ball-gray";
  return "ball-green";
}

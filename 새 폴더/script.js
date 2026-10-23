const results = document.getElementById("results");
const generateButton = document.getElementById("generate-button");

generateButton.addEventListener("click", generateLotto);

function generateLotto() {
  results.replaceChildren();

  for (let setNumber = 1; setNumber <= 5; setNumber += 1) {
    const numbers = Array.from({ length: 45 }, (_, index) => index + 1);

    // Fisher–Yates 셔플로 45개 숫자를 섞습니다.
    for (let index = numbers.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [numbers[index], numbers[randomIndex]] = [numbers[randomIndex], numbers[index]];
    }

    const lottoNumbers = numbers.slice(0, 6).sort((a, b) => a - b);
    const set = document.createElement("div");
    set.className = "lotto-set";

    const label = document.createElement("div");
    label.className = "set-label";
    label.textContent = `${setNumber}번째 추천 번호`;
    set.appendChild(label);

    lottoNumbers.forEach((number) => {
      const ball = document.createElement("div");
      ball.className = `ball ${getBallColor(number)}`;
      ball.textContent = number;
      set.appendChild(ball);
    });

    results.appendChild(set);
  }
}

function getBallColor(number) {
  if (number <= 10) return "yellow";
  if (number <= 20) return "blue";
  if (number <= 30) return "red";
  if (number <= 40) return "gray";
  return "green";
}

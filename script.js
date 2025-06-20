const form = document.getElementById("diary-form");
const list = document.getElementById("entry-list");
const summary = document.getElementById("summary");
const todayDate = document.getElementById("today-date");

let entries = JSON.parse(localStorage.getItem("sundiary") || "[]");

const today = new Date();
const dateStr = today.toISOString().split("T")[0];
todayDate.textContent = `📅 Today is: ${dateStr}`;

render();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const emotion = document.getElementById("emotion").value;
  const note = document.getElementById("note").value;

  entries.push({ date: dateStr, emotion, note });
  localStorage.setItem("sundiary", JSON.stringify(entries));
  render();
  form.reset();
});

function render() {
  list.innerHTML = "";
  const counts = { happy: 0, neutral: 0, angry: 0 };

  entries.forEach((entry) => {
    const li = document.createElement("li");
    const icon = entry.emotion === "happy" ? "😊" :
                 entry.emotion === "neutral" ? "😐" :
                 "😡";
    li.textContent = `${entry.date} – ${icon} ${entry.note}`;
    list.appendChild(li);
    counts[entry.emotion]++;
  });

  const total = entries.length;
  const isEndOfMonth = today.getDate() >= 28;

  if (total === 0 || !isEndOfMonth) {
    summary.textContent = "";
    return;
  }

  const happyRate = (counts.happy / total) * 100;
  const angryRate = (counts.angry / total) * 100;

  if (happyRate > 50) {
    summary.textContent = `🌞 Great job! You were happy on ${happyRate.toFixed(1)}% of the days this month!`;
  } else if (angryRate > 50) {
    summary.textContent = `❤️ This month seemed tough. Be kind to yourself and take time to rest.`;
  } else {
    summary.textContent = `📘 Your moods this month were balanced. Keep reflecting each day 🌱`;
  }
}



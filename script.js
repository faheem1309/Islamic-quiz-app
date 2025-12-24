const quizBox = document.getElementById("quiz-box");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");

const questions = [
  {
    q: "Who was the first Prophet?",
    options: ["Adam (AS)", "Nuh (AS)", "Ibrahim (AS)", "Muhammad ﷺ"],
    answer: 0,
    explanation: "Adam (AS) was the first human and the first Prophet."
  },
  {
    q: "Which angel brought revelations to the Prophets?",
    options: ["Israfeel", "Mikail", "Jibreel", "Malik"],
    answer: 2,
    explanation: "Angel Jibreel (AS) delivered Allah’s revelations."
  },
  {
    q: "How many Rakats are obligatory in Fajr?",
    options: ["2", "3", "4", "5"],
    answer: 0,
    explanation: "Fajr prayer has 2 obligatory Rakats."
  },
  {
    q: "Which month is fasting obligatory for Muslims?",
    options: ["Rajab", "Shaban", "Ramadan", "Muharram"],
    answer: 2,
    explanation: "Fasting is obligatory during Ramadan."
  },
  {
    q: "What is the holy book of Islam?",
    options: ["Torah", "Bible", "Zabur", "Qur’an"],
    answer: 3,
    explanation: "The Qur’an is the final revelation from Allah."
  },
  {
    q: "How many times do Muslims pray daily?",
    options: ["3", "4", "5", "6"],
    answer: 2,
    explanation: "Muslims perform five daily prayers."
  },
  {
    q: "Which city is known as the first Qibla?",
    options: ["Makkah", "Madina", "Jerusalem", "Taif"],
    answer: 2,
    explanation: "Masjid Al-Aqsa in Jerusalem was the first Qibla."
  },
  {
    q: "Who was the last Prophet of Islam?",
    options: ["Isa (AS)", "Musa (AS)", "Muhammad ﷺ", "Ibrahim (AS)"],
    answer: 2,
    explanation: "Prophet Muhammad ﷺ is the final Prophet."
  },
  {
    q: "Which Surah is the first in the Qur’an?",
    options: ["Al-Baqarah", "Al-Fatiha", "An-Nas", "Al-Ikhlas"],
    answer: 1,
    explanation: "Surah Al-Fatiha is the first chapter of the Qur’an."
  },
  {
    q: "What is Zakat?",
    options: [
      "Optional charity",
      "Mandatory charity",
      "Voluntary fast",
      "Pilgrimage"
    ],
    answer: 1,
    explanation: "Zakat is a mandatory charity for eligible Muslims."
  },
  {
    q: "How many pillars of Islam are there?",
    options: ["3", "4", "5", "6"],
    answer: 2,
    explanation: "Islam is based on five pillars."
  },
  {
    q: "Which Prophet built the Kaaba?",
    options: [
      "Adam (AS)",
      "Nuh (AS)",
      "Ibrahim (AS)",
      "Muhammad ﷺ"
    ],
    answer: 2,
    explanation: "Prophet Ibrahim (AS) built the Kaaba with Ismail (AS)."
  },
  {
    q: "What is the pilgrimage to Makkah called?",
    options: ["Umrah", "Hajj", "Zakat", "Sawm"],
    answer: 1,
    explanation: "Hajj is the obligatory pilgrimage to Makkah."
  },
  {
    q: "Which prayer is performed at night?",
    options: ["Fajr", "Dhuhr", "Isha", "Asr"],
    answer: 2,
    explanation: "Isha prayer is performed at night."
  },
  {
    q: "Which Surah is known as the Heart of the Qur’an?",
    options: ["Al-Fatiha", "Ya-Sin", "Al-Kahf", "Ar-Rahman"],
    answer: 1,
    explanation: "Surah Ya-Sin is known as the heart of the Qur’an."
  },
  {
    q: "Who was swallowed by a whale?",
    options: ["Yusuf (AS)", "Yunus (AS)", "Musa (AS)", "Isa (AS)"],
    answer: 1,
    explanation: "Prophet Yunus (AS) was swallowed by a whale."
  },
  {
    q: "Which month is considered sacred?",
    options: ["Ramadan", "Dhul Hijjah", "Muharram", "All of these"],
    answer: 3,
    explanation: "All listed months are sacred in Islam."
  },
  {
    q: "What does Islam mean?",
    options: [
      "Peace",
      "Submission",
      "Faith",
      "Worship"
    ],
    answer: 1,
    explanation: "Islam means submission to the will of Allah."
  },
  {
    q: "Which Surah has no Bismillah?",
    options: [
      "Al-Baqarah",
      "An-Naml",
      "At-Tawbah",
      "Al-Ikhlas"
    ],
    answer: 2,
    explanation: "Surah At-Tawbah does not begin with Bismillah."
  },
  {
    q: "What is the call to prayer called?",
    options: ["Iqamah", "Adhan", "Khutbah", "Takbir"],
    answer: 1,
    explanation: "Adhan is the call to prayer."
  }
];

let userAnswers = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuiz() {
  quizBox.innerHTML = "";
  userAnswers = [];
  shuffle(questions);

  questions.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "question-card";

    card.innerHTML = `
      <div class="question">${index + 1}. ${item.q}</div>
      ${item.options.map((opt, i) =>
        `<div class="option" data-q="${index}" data-o="${i}">${opt}</div>`
      ).join("")}
    `;

    quizBox.appendChild(card);
  });

  document.querySelectorAll(".option").forEach(opt => {
    opt.addEventListener("click", () => {
      const qIndex = opt.dataset.q;
      const oIndex = opt.dataset.o;

      userAnswers[qIndex] = Number(oIndex);

      document.querySelectorAll(`[data-q="${qIndex}"]`)
        .forEach(o => o.classList.remove("correct"));

      opt.classList.add("correct");
    });
  });
}

submitBtn.onclick = () => {
  let score = 0;

  document.querySelectorAll(".question-card").forEach((card, index) => {
    const correct = questions[index].answer;
    const user = userAnswers[index];

    const options = card.querySelectorAll(".option");

    options.forEach((opt, i) => {
      opt.classList.remove("correct");
      if (i === correct) opt.classList.add("correct");
      if (i === user && user !== correct) opt.classList.add("wrong");
    });

    if (user === correct) score++;

    const exp = document.createElement("div");
    exp.className = "explanation";
    exp.innerText = "Explanation: " + questions[index].explanation;
    card.appendChild(exp);
  });

  submitBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");

  alert(`You scored ${score} out of ${questions.length}`);
};

restartBtn.onclick = () => {
  submitBtn.classList.remove("hidden");
  restartBtn.classList.add("hidden");
  loadQuiz();
};

loadQuiz();

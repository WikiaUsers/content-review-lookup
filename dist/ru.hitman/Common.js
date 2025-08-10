$(function () {
  const quizData = [
    {
      question: "Какое оружие — фирменное у Агента 47?",
      options: ["Провод", "Пианино", "Штурмовая винтовка", "Silverballer"],
      correct: 3
    },
    {
      question: "В какой стране разворачиваются события миссии «Sapienza»?",
      options: ["Италия", "Франция", "Греция", "Испания"],
      correct: 0
    },
    {
      question: "Кто главный противник Агента 47 в Hitman 3?",
      options: ["Артур Эдвардс", "Дайана", "Лукас Грей", "Констант"],
      correct: 0
    }
  ];

  let index = 0;

  function renderQuiz() {
    const q = quizData[index];
    const container = $('#fandom-quiz');
    container.empty();

    container.append('<div class="quiz-question">' + q.question + '</div>');
    const btnGroup = $('<div class="quiz-buttons"></div>');

    q.options.forEach((opt, i) => {
      const btn = $('<button class="quiz-btn">' + opt + '</button>');
      btn.on('click', () => {
        if (i === q.correct) {
          alert("✅ Верно!");
        } else {
          alert("❌ Неверно. Правильный ответ: " + q.options[q.correct]);
        }
      });
      btnGroup.append(btn);
    });

    container.append(btnGroup);
  }

  if ($('#fandom-quiz').length) {
    renderQuiz();
    setInterval(() => {
      index = (index + 1) % quizData.length;
      renderQuiz();
    }, 30000);
  }
});
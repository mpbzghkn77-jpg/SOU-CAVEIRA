const homeView = document.getElementById('homeView');
const quizView = document.getElementById('quizView');
const resultView = document.getElementById('resultView');

const editalContainer = document.getElementById('editalContainer');
const startBtn = document.getElementById('startBtn');
const homeBtn = document.getElementById('homeBtn');
const againBtn = document.getElementById('againBtn');
const categoryFilter = document.getElementById('categoryFilter');

const questionCategory = document.getElementById('questionCategory');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');

const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const scoreValue = document.getElementById('scoreValue');
const timerValue = document.getElementById('timerValue');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const finalScore = document.getElementById('finalScore');
const totalAnswered = document.getElementById('totalAnswered');
const totalErrors = document.getElementById('totalErrors');
const percentResult = document.getElementById('percentResult');
const resultTitle = document.getElementById('resultTitle');
const resultSummary = document.getElementById('resultSummary');

const state = {
  edital: { topics: [] },
  questions: [],
  filteredQuestions: [],
  currentIndex: 0,
  answers: [],
  timerSeconds: 1800,
  timerId: null,
  selectedCategory: 'Todos',
};

function showView(view) {
  homeView.classList.add('hidden');
  quizView.classList.add('hidden');
  resultView.classList.add('hidden');
  view.classList.remove('hidden');
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function renderEdital(edital) {
  editalContainer.innerHTML = '';

  edital.topics.forEach((topic) => {
    const card = document.createElement('article');
    card.className = 'edital-card';

    const title = document.createElement('h3');
    title.textContent = topic.title;

    const desc = document.createElement('p');
    desc.textContent = topic.description;

    card.appendChild(title);
    card.appendChild(desc);
    editalContainer.appendChild(card);
  });
}

function getSelectedQuestions() {
  if (state.selectedCategory === 'Todos') {
    return [...state.questions];
  }

  return state.questions.filter((question) => question.category === state.selectedCategory);
}

function renderCategoryOptions() {
  const categories = ['Todos', ...new Set(state.questions.map((q) => q.category))];
  categoryFilter.innerHTML = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join('');

  categoryFilter.value = state.selectedCategory;
}

function getCorrectAnswersCount() {
  return state.filteredQuestions.filter((question, index) => {
    return Number(state.answers[index]) === Number(question.correctIndex);
  }).length;
}

function startTimer() {
  clearInterval(state.timerId);

  state.timerId = setInterval(() => {
    if (state.timerSeconds <= 0) {
      clearInterval(state.timerId);
      finishQuiz();
      return;
    }

    state.timerSeconds -= 1;
    timerValue.textContent = formatTime(state.timerSeconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerId);
}

function renderQuestion() {
  const question = state.filteredQuestions[state.currentIndex];
  if (!question) return;

  questionCategory.textContent = question.category || 'Geral';
  questionText.textContent = `${state.currentIndex + 1}. ${question.question}`;

  answersContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-btn';

    if (state.answers[state.currentIndex] === index) {
      button.classList.add('selected');
    }

    button.textContent = option;
    button.addEventListener('click', () => {
      state.answers[state.currentIndex] = index;
      renderQuestion();
    });

    answersContainer.appendChild(button);
  });

  const selectedIndex = state.answers[state.currentIndex];
  if (selectedIndex !== null && selectedIndex !== undefined) {
    const correctIndex = Number(question.correctIndex);
    const buttons = answersContainer.querySelectorAll('.answer-btn');

    buttons.forEach((button, index) => {
      if (index === correctIndex) {
        button.classList.add('correct');
      }

      if (index === selectedIndex && index !== correctIndex) {
        button.classList.add('wrong');
      }
    });
  }

  const total = state.filteredQuestions.length;
  if (total > 0) {
    const progressPercent = ((state.currentIndex + 1) / total) * 100;
    progressText.textContent = `Questão ${state.currentIndex + 1}/${total}`;
    progressFill.style.width = `${progressPercent}%`;
  }

  scoreValue.textContent = String(getCorrectAnswersCount());

  prevBtn.disabled = state.currentIndex === 0;
  prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
  nextBtn.textContent = state.currentIndex === total - 1 ? 'Finalizar' : 'Próxima';
}

function nextQuestion() {
  const total = state.filteredQuestions.length;

  if (state.currentIndex < total - 1) {
    state.currentIndex += 1;
    renderQuestion();
    return;
  }

  finishQuiz();
}

function prevQuestion() {
  if (state.currentIndex > 0) {
    state.currentIndex -= 1;
    renderQuestion();
  }
}

function finishQuiz() {
  stopTimer();
  showView(resultView);

  const total = state.filteredQuestions.length;
  const correctCount = getCorrectAnswersCount();
  const errorCount = total - correctCount;
  const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  finalScore.textContent = String(correctCount);
  totalAnswered.textContent = String(total);
  totalErrors.textContent = String(errorCount);
  percentResult.textContent = `${percent}%`;

  resultTitle.textContent =
    correctCount >= total * 0.7 ? 'Excelente desempenho!' : 'Continue treinando!';

  resultSummary.innerHTML = '';

  const item1 = document.createElement('li');
  item1.textContent = `Acertos: ${correctCount} de ${total}`;

  const item2 = document.createElement('li');
  item2.textContent = `Erros: ${errorCount}`;

  const item3 = document.createElement('li');
  item3.textContent = `Percentual: ${percent}%`;

  const item4 = document.createElement('li');
  item4.textContent =
    correctCount === total
      ? 'Perfeição total. Você está pronto para o concurso.'
      : 'Revise os assuntos com maior dificuldade e retorne ao simulado.';

  resultSummary.appendChild(item1);
  resultSummary.appendChild(item2);
  resultSummary.appendChild(item3);
  resultSummary.appendChild(item4);
}

function resetQuiz() {
  state.currentIndex = 0;
  state.filteredQuestions = getSelectedQuestions();
  state.answers = Array(state.filteredQuestions.length).fill(null);
  state.timerSeconds = 1800;
  timerValue.textContent = formatTime(state.timerSeconds);
  renderQuestion();
  startTimer();
  showView(quizView);
}

function loadData() {
  Promise.all([
    fetch('./data/edital.json').then((response) => response.json()),
    fetch('./data/questions.json').then((response) => response.json()),
  ])
    .then(([editalData, questionsData]) => {
      state.edital = editalData;
      state.questions = questionsData;
      renderEdital(state.edital);
      renderCategoryOptions();
      state.selectedCategory = 'Todos';
      state.filteredQuestions = getSelectedQuestions();
      state.answers = Array(state.filteredQuestions.length).fill(null);
      renderQuestion();
    })
    .catch((error) => {
      console.error('Erro ao carregar dados:', error);
      editalContainer.innerHTML =
        '<p>Não foi possível carregar o edital e o banco de questões.</p>';
    });
}

categoryFilter.addEventListener('change', (event) => {
  state.selectedCategory = event.target.value;
  state.filteredQuestions = getSelectedQuestions();
  state.answers = Array(state.filteredQuestions.length).fill(null);
  state.currentIndex = 0;
  if (state.filteredQuestions.length) {
    renderQuestion();
  }
});

startBtn.addEventListener('click', () => {
  if (state.filteredQuestions.length > 0) {
    resetQuiz();
  }
});

homeBtn.addEventListener('click', () => {
  stopTimer();
  showView(homeView);
});

againBtn.addEventListener('click', () => {
  resetQuiz();
});

prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);

showView(homeView);
timerValue.textContent = formatTime(state.timerSeconds);
loadData();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.warn('Falha ao registrar o Service Worker:', error);
    });
  });
}

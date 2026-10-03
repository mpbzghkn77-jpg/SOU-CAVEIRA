const homeView = document.getElementById('homeView');
const quizView = document.getElementById('quizView');
const resultView = document.getElementById('resultView');

const editalContainer = document.getElementById('editalContainer');
const startBtn = document.getElementById('startBtn');
const homeBtn = document.getElementById('homeBtn');
const againBtn = document.getElementById('againBtn');
const categoryFilter = document.getElementById('categoryFilter');
const difficultyFilter = document.getElementById('difficultyFilter');

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
const historyList = document.getElementById('historyList');

const totalQuestionsLabel = document.getElementById('totalQuestionsLabel');
const bestScoreLabel = document.getElementById('bestScoreLabel');
const lastScoreLabel = document.getElementById('lastScoreLabel');

const editalData = {
  title: 'Conteúdo PMPE / AOCP',
  topics: [
    {
      title: 'Língua Portuguesa',
      description: 'Interpretação de texto, ortografia, gramática, pontuação, sintaxe e semântica.'
    },
    {
      title: 'Raciocínio Lógico',
      description: 'Lógica proposicional, sequências, análise de premissas, tabelas-verdade e problemas matemáticos.'
    },
    {
      title: 'Matemática',
      description: 'Operações básicas, porcentagem, regra de três, geometria, análise de dados e álgebra.'
    },
    {
      title: 'Informática',
      description: 'Windows, internet, pacote Office, redes, segurança, navegadores e conceitos digitais.'
    },
    {
      title: 'Legislação e Constituição',
      description: 'Constituição Federal, direito administrativo, direitos e deveres, organização do Estado e cidadania.'
    },
    {
      title: 'Atualidades e PMPE',
      description: 'Política, segurança pública, Pernambuco, gestão pública, legislação e temas do contexto atual.'
    }
  ]
};

const questionsData = [
  { category: 'Língua Portuguesa', difficulty: 'Fácil', question: 'Qual frase está corretamente escrita?', options: ['Ele veio atrasado para aula.', 'Ele veio atrasado para a aula.', 'Ele veio atrasado na aula.', 'Ele veio tarde para a aula.'], correctIndex: 1 },
  { category: 'Língua Portuguesa', difficulty: 'Fácil', question: 'Qual das opções apresenta um erro de concordância verbal?', options: ['Os alunos fizeram a prova.', 'As meninas estudaram bastante.', 'A maioria dos candidatos compareceram cedo.', 'A equipe decidiu seguir o regulamento.'], correctIndex: 2 },
  { category: 'Língua Portuguesa', difficulty: 'Médio', question: 'Qual opção é uma frase com regência verbal correta?', options: ['Ele assistiu o filme ontem.', 'Ele assistiu ao filme ontem.', 'Ele assistiu em o filme ontem.', 'Ele assistiu para o filme.'], correctIndex: 1 },
  { category: 'Língua Portuguesa', difficulty: 'Difícil', question: 'Qual frase possui uso adequado de crase?', options: ['Vou a escola pela manhã.', 'Vou à escola pela manhã.', 'Vou para á escola.', 'Vou na escola pela manhã.'], correctIndex: 1 },
  { category: 'Raciocínio Lógico', difficulty: 'Fácil', question: 'Qual número completa a sequência: 2, 6, 12, 20, 30, ?', options: ['36', '38', '42', '44'], correctIndex: 2 },
  { category: 'Raciocínio Lógico', difficulty: 'Médio', question: 'Se todas as mulheres são cidadãs e algumas cidadãs são professoras, então:', options: ['Todas as professoras são mulheres.', 'Nenhuma mulher é professora.', 'Algumas mulheres são professoras.', 'Nenhuma cidadã é professora.'], correctIndex: 2 },
  { category: 'Raciocínio Lógico', difficulty: 'Difícil', question: 'Qual é o próximo termo da sequência: 1, 4, 9, 16, 25, ?', options: ['30', '36', '42', '49'], correctIndex: 1 },
  { category: 'Matemática', difficulty: 'Fácil', question: 'Um produto custa R$ 180,00 e sofre desconto de 15%. Qual é o preço final?', options: ['R$ 153,00', 'R$ 160,00', 'R$ 165,00', 'R$ 170,00'], correctIndex: 0 },
  { category: 'Matemática', difficulty: 'Médio', question: 'Se 25% de um valor é 60, qual é o valor total?', options: ['180', '220', '240', '260'], correctIndex: 2 },
  { category: 'Matemática', difficulty: 'Difícil', question: 'Qual é o resultado de 12²?', options: ['124', '144', '164', '196'], correctIndex: 1 },
  { category: 'Informática', difficulty: 'Fácil', question: 'Qual destes é um navegador web?', options: ['Word', 'Excel', 'Chrome', 'PowerPoint'], correctIndex: 2 },
  { category: 'Informática', difficulty: 'Médio', question: 'Qual extensão representa um arquivo Excel?', options: ['.docx', '.xlsx', '.pptx', '.jpg'], correctIndex: 1 },
  { category: 'Informática', difficulty: 'Difícil', question: 'O que é um firewall?', options: ['Programa para editar vídeos', 'Sistema de proteção de rede', 'Arquivador de fotos', 'Software para instalação de drivers'], correctIndex: 1 },
  { category: 'Legislação e Constituição', difficulty: 'Fácil', question: 'A Constituição Federal é considerada:', options: ['Lei ordinária', 'Lei complementar', 'Lei máxima do país', 'Decreto presidencial'], correctIndex: 2 },
  { category: 'Legislação e Constituição', difficulty: 'Médio', question: 'A função administrativa é exercida por:', options: ['Partidos políticos', 'Órgãos e agentes públicos', 'Empresas privadas', 'Sociedades civis'], correctIndex: 1 },
  { category: 'Legislação e Constituição', difficulty: 'Difícil', question: 'Qual é a finalidade principal do Estado de Direito?', options: ['Aumentar impostos', 'Garantir a legalidade e a justiça', 'Privatizar serviços públicos', 'Eliminar a participação popular'], correctIndex: 1 },
  { category: 'Atualidades e PMPE', difficulty: 'Fácil', question: 'Qual é a capital de Pernambuco?', options: ['Recife', 'Salvador', 'Fortaleza', 'João Pessoa'], correctIndex: 0 },
  { category: 'Atualidades e PMPE', difficulty: 'Médio', question: 'A Polícia Militar é uma instituição de:', options: ['Política interna', 'Segurança pública', 'Justiça eleitoral', 'Tribunal administrativo'], correctIndex: 1 },
  { category: 'Atualidades e PMPE', difficulty: 'Difícil', question: 'A segurança pública no Brasil envolve, em especial:', options: ['Apenas o setor privado', 'Polícia, justiça e administração pública', 'Somente a educação', 'Somente o exército'], correctIndex: 1 },
  { category: 'Língua Portuguesa', difficulty: 'Médio', question: 'A frase "Ele e eu fomos ao evento" está correta em relação a:', options: ['Pontuação', 'Concordância nominal', 'Regência verbal', 'Pronomes pessoais'], correctIndex: 3 },
  { category: 'Língua Portuguesa', difficulty: 'Difícil', question: 'Qual opção apresenta um antônimo de "rápido"?', options: ['Ágil', 'Veloz', 'Lento', 'Diligente'], correctIndex: 2 },
  { category: 'Raciocínio Lógico', difficulty: 'Fácil', question: 'Se todos os gatos são mamíferos e todos os mamíferos são animais, então:', options: ['Todos os animais são gatos.', 'Alguns gatos não são animais.', 'Todos os gatos são animais.', 'Nenhum gato é mamífero.'], correctIndex: 2 },
  { category: 'Raciocínio Lógico', difficulty: 'Médio', question: 'Se todas as crianças são estudiosas e algumas estudiosas são inteligentes, então:', options: ['Todas as inteligentes são crianças.', 'Algumas crianças são inteligentes.', 'Nenhuma criança é inteligente.', 'Todas as crianças são inteligentes.'], correctIndex: 1 },
  { category: 'Matemática', difficulty: 'Fácil', question: '30% de 200 é:', options: ['40', '50', '60', '70'], correctIndex: 2 },
  { category: 'Matemática', difficulty: 'Difícil', question: 'Qual é o valor de 40% de 250?', options: ['50', '75', '100', '125'], correctIndex: 2 },
  { category: 'Informática', difficulty: 'Médio', question: 'Qual software é usado para criar documentos de texto?', options: ['Excel', 'PowerPoint', 'Word', 'Windows Explorer'], correctIndex: 2 },
  { category: 'Legislação e Constituição', difficulty: 'Fácil', question: 'Constituição Federal é a:', options: ['Lei ordinária', 'Lei máxima', 'Regra interna', 'Medida provisória'], correctIndex: 1 },
  { category: 'Legislação e Constituição', difficulty: 'Médio', question: 'A ética no serviço público se relaciona principalmente com:', options: ['Foco na lucratividade', 'Desempenho moral e legal do agente público', 'Cortes de gastos sem limites', 'Exclusão de transparência'], correctIndex: 1 },
  { category: 'Atualidades e PMPE', difficulty: 'Difícil', question: 'Qual órgão representa o poder judiciário no Brasil?', options: ['Câmara dos Deputados', 'Tribunal', 'Poder Executivo', 'Prefeitura'], correctIndex: 1 },
  { category: 'Língua Portuguesa', difficulty: 'Médio', question: 'Qual frase está com erro de uso de vírgula?', options: ['Maria, venha aqui.', 'Os alunos, cansados, saíram.', 'Fui ao mercado e comprei pão.', 'Eu, no entanto, concordo.'], correctIndex: 2 },
  { category: 'Raciocínio Lógico', difficulty: 'Difícil', question: 'Na sequência 5, 10, 20, 40, 80, qual é o próximo valor?', options: ['100', '120', '160', '200'], correctIndex: 2 },
  { category: 'Informática', difficulty: 'Fácil', question: 'Qual é a função principal de um antivírus?', options: ['Compilar programas', 'Proteger o sistema contra malware', 'Gerar backups', 'Editar imagens'], correctIndex: 1 },
  { category: 'Matemática', difficulty: 'Médio', question: 'Qual é o resultado de 7 × 8 − 12?', options: ['44', '48', '52', '56'], correctIndex: 1 },
  { category: 'Legislação e Constituição', difficulty: 'Difícil', question: 'Qual é a finalidade do Estado de Direito?', options: ['Aumentar impostos', 'Garantir legalidade e justiça', 'Privatizar serviços públicos', 'Eliminar a participação popular'], correctIndex: 1 },
  { category: 'Atualidades e PMPE', difficulty: 'Médio', question: 'O município é administrado por:', options: ['Governador', 'Prefeito', 'Senador', 'Juiz'], correctIndex: 1 }
];

const state = {
  edital: editalData,
  questions: questionsData,
  filteredQuestions: [],
  currentIndex: 0,
  answers: [],
  timerSeconds: 1800,
  timerId: null,
  selectedCategory: 'Todos',
  selectedDifficulty: 'Todos'
};

const STORAGE_KEY = 'pmpe_aocp_history';

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
  let filtered = [...state.questions];

  if (state.selectedCategory !== 'Todos') {
    filtered = filtered.filter((q) => q.category === state.selectedCategory);
  }

  if (state.selectedDifficulty !== 'Todos') {
    filtered = filtered.filter((q) => q.difficulty === state.selectedDifficulty);
  }

  return filtered;
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

function saveHistory(entry) {
  const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  history.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 8)));
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  historyList.innerHTML = '';

  if (!history.length) {
    historyList.innerHTML = '<li>Nenhum simulado salvo ainda.</li>';
    return;
  }

  history.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.date} — ${item.percent}% (${item.correct}/${item.total})`;
    historyList.appendChild(li);
  });
}

function updateHomeSummary() {
  totalQuestionsLabel.textContent = String(state.filteredQuestions.length);

  const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (history.length) {
    const best = Math.max(...history.map((item) => Number(item.percent || 0)));
    bestScoreLabel.textContent = `${best}%`;

    const last = history[0];
    lastScoreLabel.textContent = `${last.percent}%`;
  } else {
    bestScoreLabel.textContent = '0%';
    lastScoreLabel.textContent = '0%';
  }
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
  resultTitle.textContent = correctCount >= total * 0.7 ? 'Excelente desempenho!' : 'Continue treinando!';

  resultSummary.innerHTML = '';

  const item1 = document.createElement('li');
  item1.textContent = `Acertos: ${correctCount} de ${total}`;

  const item2 = document.createElement('li');
  item2.textContent = `Erros: ${errorCount}`;

  const item3 = document.createElement('li');
  item3.textContent = `Percentual: ${percent}%`;

  const item4 = document.createElement('li');
  item4.textContent = correctCount === total
    ? 'Perfeição total. Você está pronto para o concurso.'
    : 'Revise os assuntos com maior dificuldade e retorne ao simulado.';

  resultSummary.appendChild(item1);
  resultSummary.appendChild(item2);
  resultSummary.appendChild(item3);
  resultSummary.appendChild(item4);

  const entry = {
    date: new Date().toLocaleDateString('pt-BR'),
    correct: correctCount,
    total,
    percent
  };

  saveHistory(entry);
  loadHistory();
  updateHomeSummary();
}

function resetQuiz() {
  state.currentIndex = 0;
  state.filteredQuestions = getSelectedQuestions();
  state.answers = Array(state.filteredQuestions.length).fill(null);
  state.timerSeconds = 1800;
  timerValue.textContent = formatTime(state.timerSeconds);

  if (state.filteredQuestions.length === 0) {
    showView(homeView);
    return;
  }

  renderQuestion();
  startTimer();
  showView(quizView);
}

function initApp() {
  renderEdital(state.edital);
  renderCategoryOptions();
  state.selectedCategory = 'Todos';
  state.selectedDifficulty = 'Todos';
  state.filteredQuestions = getSelectedQuestions();
  state.answers = Array(state.filteredQuestions.length).fill(null);
  updateHomeSummary();
  loadHistory();
  renderQuestion();
}

categoryFilter.addEventListener('change', (event) => {
  state.selectedCategory = event.target.value;
  state.filteredQuestions = getSelectedQuestions();
  state.answers = Array(state.filteredQuestions.length).fill(null);
  state.currentIndex = 0;
  updateHomeSummary();

  if (state.filteredQuestions.length) {
    renderQuestion();
  }
});

difficultyFilter.addEventListener('change', (event) => {
  state.selectedDifficulty = event.target.value;
  state.filteredQuestions = getSelectedQuestions();
  state.answers = Array(state.filteredQuestions.length).fill(null);
  state.currentIndex = 0;
  updateHomeSummary();

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
initApp();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.warn('Falha ao registrar o Service Worker:', error);
    });
  });
}

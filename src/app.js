import { PROMOTION_LINKS, QUESTIONS, TEST_PUBLIC_URL, TYPES } from "./data.js";
import { calculateResult, getTypeById } from "./scoring.js";
import { saveOrShareResultCard } from "./share-card.js?v=20260910-landing-eyebrow";

const app = document.querySelector("#app");

const state = {
  view: "landing",
  currentQuestion: 0,
  answers: [],
  result: null,
  saveMessage: ""
};

render();

function render() {
  if (state.view === "landing") renderLanding();
  if (state.view === "question") renderQuestion();
  if (state.view === "loading") renderLoading();
  if (state.view === "result") renderResult();
}

function renderLanding() {
  app.innerHTML = `
    <section class="hero-screen screen-enter">
      <p class="eyebrow">연세대 2학기 생존 테스트</p>
      <h1 class="hero-title" aria-label="나의 연세대 2학기 생존 독수리 유형은?">
        <span>나의 연세대</span>
        <span>2학기 생존</span>
        <span>독수리 유형은?</span>
      </h1>
      <p class="hero-copy">8문항, 30초면 끝</p>
      <button class="primary-button" data-action="start">시작하기</button>
    </section>
  `;

  app.querySelector("[data-action='start']").addEventListener("click", () => {
    state.view = "question";
    state.currentQuestion = 0;
    state.answers = [];
    state.saveMessage = "";
    render();
  });
}

function renderQuestion() {
  const question = QUESTIONS[state.currentQuestion];
  const progress = ((state.currentQuestion + 1) / QUESTIONS.length) * 100;

  app.innerHTML = `
    <section class="quiz-screen screen-enter">
      <header class="quiz-header">
        <button class="ghost-button icon-button" data-action="back" aria-label="이전 질문">←</button>
        <div class="progress-wrap" aria-label="${state.currentQuestion + 1}/${QUESTIONS.length}">
          <span class="progress-label">${state.currentQuestion + 1}/${QUESTIONS.length}</span>
          <span class="progress-track"><span class="progress-fill" style="width: ${progress}%"></span></span>
        </div>
      </header>
      <h2>${question.text}</h2>
      <div class="options">
        ${question.options
          .map(
            (option, index) => `
              <button class="option-button" data-option="${index}">
                <span>${option.label}</span>
                <strong>${option.text}</strong>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;

  app.querySelector("[data-action='back']").addEventListener("click", goBack);
  app.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", () => selectOption(Number(button.dataset.option)));
  });
}

function renderLoading() {
  app.innerHTML = `
    <section class="loading-screen screen-enter">
      <div class="loading-symbol" aria-hidden="true">🦅</div>
      <h2>당신의 독수리를 찾는 중...</h2>
      <div class="loading-track" aria-hidden="true">
        <span class="loading-fill"></span>
      </div>
      <aside class="student-banner">
        <img class="gemini-lockup gemini-lockup-light" src="./assets/gemini/google-gemini-lockup-white.png" alt="Google Gemini" />
        <strong>대학생·대학원생이라면 Google AI Plus 12개월 무료</strong>
        <span>결과에서 바로 확인할 수 있어요.</span>
      </aside>
    </section>
  `;

  window.setTimeout(() => {
    state.view = "result";
    state.result = calculateResult(state.answers, QUESTIONS, TYPES);
    render();
  }, 3000);
}

function renderResult() {
  const type = state.result.type;
  const goodMatch = getTypeById(TYPES, type.goodMatch);
  const badMatch = getTypeById(TYPES, type.badMatch);
  const titleParts = splitEagleTitle(type.name);

  app.innerHTML = `
    <section class="result-screen result-${type.id} screen-enter">
      <div class="result-visual" role="img" aria-label="${type.name} 캐릭터 이미지"></div>
      <h2 class="result-title" aria-label="${type.name}">
        <span class="result-title-prefix">${titleParts.prefix}</span>
        <span class="result-title-eagle">${titleParts.eagle}</span>
      </h2>
      <p class="one-liner">${type.oneLiner}</p>
      <p class="description">${type.description}</p>

      <section class="match-section" aria-labelledby="match-title">
        <h3 id="match-title">2학기 궁합</h3>
        <div class="match-grid">
          <div>
            <span>잘 맞는 유형</span>
            <strong>${goodMatch.emoji} ${goodMatch.name}</strong>
          </div>
          <div>
            <span>안 맞는 유형</span>
            <strong>${badMatch.emoji} ${badMatch.name}</strong>
          </div>
        </div>
      </section>

      <button class="save-button" data-action="save-image">결과 이미지 저장</button>
      <button class="secondary-button" data-action="copy-link">친구에게 공유</button>

      <section class="gemini-setting" aria-labelledby="gemini-setting-title">
        <div class="gemini-setting-copy">
          <h3 id="gemini-setting-title">이 독수리를 위한 Gemini 세팅법</h3>
          <p>${type.settingPrompt}</p>
        </div>
        <button class="prompt-copy-button" data-action="copy-setting">세팅법 복사</button>
      </section>
      ${state.saveMessage ? `<p class="save-message">${state.saveMessage}</p>` : ""}

      <a class="signup-cta" href="${PROMOTION_LINKS[0]}" target="_blank" rel="noreferrer" data-action="promotion-link">
        <img class="gemini-lockup gemini-lockup-light" src="./assets/gemini/google-gemini-lockup-white.png" alt="Google Gemini" />
        <span>이 테스트, Gemini로 만들었습니다.</span>
        <strong>대학생·대학원생은 Google AI Plus 1년 무료 → (클릭)</strong>
      </a>

      <button class="ghost-button restart-button" data-action="restart">테스트 다시 하기</button>
    </section>
  `;

  app.querySelector("[data-action='save-image']").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = "이미지 만드는 중...";
    try {
      await saveOrShareResultCard(type, {
        good: goodMatch.name,
        bad: badMatch.name
      });
      state.saveMessage = "";
    } catch {
      state.saveMessage = "이미지 저장을 다시 시도해주세요.";
    } finally {
      renderResult();
    }
  });

  app.querySelector("[data-action='copy-link']").addEventListener("click", async () => {
    const shareStatus = await shareResult(type);
    if (shareStatus === "cancelled") return;
    state.saveMessage = shareStatus === "shared" ? "공유창을 열었어요." : "테스트 링크를 복사했어요.";
    renderResult();
  });

  app.querySelector("[data-action='copy-setting']").addEventListener("click", async () => {
    await copyText(type.settingPrompt);
    state.saveMessage = "Gemini 세팅법을 복사했어요.";
    renderResult();
  });

  app.querySelector("[data-action='promotion-link']").addEventListener("click", (event) => {
    event.currentTarget.href = getRandomPromotionLink();
  });

  app.querySelector("[data-action='restart']").addEventListener("click", () => {
    state.view = "landing";
    state.currentQuestion = 0;
    state.answers = [];
    state.result = null;
    state.saveMessage = "";
    render();
  });
}

function selectOption(optionIndex) {
  state.answers[state.currentQuestion] = optionIndex;

  if (state.currentQuestion === QUESTIONS.length - 1) {
    state.view = "loading";
    render();
    return;
  }

  state.currentQuestion += 1;
  render();
}

function goBack() {
  if (state.currentQuestion === 0) {
    state.view = "landing";
    render();
    return;
  }

  state.currentQuestion -= 1;
  state.answers = state.answers.slice(0, state.currentQuestion);
  render();
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

async function shareResult(type) {
  const shareData = {
    title: "나의 연세대 2학기 생존 독수리 유형은?",
    text: `나는 ${type.name}! ${type.oneLiner}`,
    url: getShareUrl()
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return "shared";
    } catch (error) {
      if (error?.name === "AbortError") return "cancelled";
    }
  }

  await copyText(shareData.url);
  return "copied";
}

function getShareUrl() {
  if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    return window.location.href;
  }

  return `https://${TEST_PUBLIC_URL}`;
}

function getRandomPromotionLink() {
  const index = Math.floor(Math.random() * PROMOTION_LINKS.length);
  return PROMOTION_LINKS[index];
}

function splitEagleTitle(name) {
  const parts = name.trim().split(" ");
  const eagle = parts.splice(-2).join(" ") || name;
  return {
    prefix: parts.join(" "),
    eagle
  };
}

export const PROMOTION_LINKS = ["https://goo.gle/koreaseoul", "https://goo.gle/yonseiseoul"];
export const TEST_PUBLIC_URL = "yonsei-eagle.pages.dev";

export const TYPES = [
  {
    id: "baekyang",
    name: "중앙도서관 지박령 백양 독수리",
    emoji: "🦅",
    oneLiner: "1학기 학점 충격을 딛고 중도에 둥지를 튼 학점 복구형",
    description:
      "이번 학기는 다릅니다. 중앙도서관과 학술정보관 사이에 자기 자리를 만들고, 밀린 전공서와 강의자료를 차근차근 정리하는 데 안정감을 느껴요. 완벽주의가 살짝 올라오지만 그만큼 회복 탄력도도 좋은 편입니다. 쉬는 시간까지 계획에 넣으면 더 오래 갑니다.",
    geminiStyle: "NotebookLM x Gemini로 전공 서적 통째로 3분 요약",
    goodMatch: "gongdae",
    badMatch: "romance",
    prompt:
      "이 전공 자료를 시험 대비용으로 3단계 요약해줘. 1단계는 핵심 개념, 2단계는 헷갈리는 비교표, 3단계는 예상 문제 5개로 정리해줘.",
    imageAsset: "./assets/eagles/baekyang.png",
    backgroundAsset: "./assets/eagles/result-bg-baekyang.png"
  },
  {
    id: "akaraka",
    name: "연고전 뽕 가득 아카라카 독수리",
    emoji: "📣",
    oneLiner: "9월 일정표의 중심이 강의실보다 응원석에 있는 인싸형",
    description:
      "사람이 모이는 곳에서 에너지가 살아납니다. 연고전, 아카라카, 뒤풀이, 동아리 일정이 겹쳐도 이상하게 힘이 나는 편이에요. 팀플에서도 분위기를 살리고 조율하는 능력이 좋습니다. 다만 마감은 생각보다 조용히 다가오니 캘린더 알림은 꼭 켜두세요.",
    geminiStyle: "팀플 회의록 요약과 발표 대본을 맡기고 응원 연습하러 감",
    goodMatch: "romance",
    badMatch: "gongdae",
    prompt:
      "이 회의록을 바탕으로 발표 흐름을 5분짜리 대본으로 만들어줘. 역할 분담과 다음 액션 아이템도 마지막에 표로 정리해줘.",
    imageAsset: "./assets/eagles/akaraka.png",
    backgroundAsset: "./assets/eagles/result-bg-akaraka.png"
  },
  {
    id: "gongdae",
    name: "제1공학관 밤샘 공대 독수리",
    emoji: "🧪",
    oneLiner: "과제와 실험, 코딩 에러 사이에서 끝내 답을 찾는 이공계 전사",
    description:
      "문제를 보면 원인부터 파고드는 해결사입니다. 실험 리포트, 코딩 에러, 복잡한 수식처럼 끝이 보이지 않는 일에도 결국 답을 찾아내는 힘이 있어요. 말수는 줄어도 집중력은 깊어집니다. 가끔은 도움 요청도 생산성이라는 사실을 기억하면 좋습니다.",
    geminiStyle: "빨간 줄 에러와 복잡한 수식을 던져서 1초 해독",
    goodMatch: "baekyang",
    badMatch: "akaraka",
    prompt:
      "이 에러 로그를 원인 후보별로 분석해줘. 가장 가능성 높은 원인, 확인 방법, 수정 예시 코드를 순서대로 알려줘.",
    imageAsset: "./assets/eagles/gongdae.png",
    backgroundAsset: "./assets/eagles/result-bg-gongdae.png"
  },
  {
    id: "space",
    name: "백양누리 난민 우주공강 독수리",
    emoji: "☕",
    oneLiner: "수강신청이 만든 빈칸을 백양누리와 신촌 카페에서 견디는 타입",
    description:
      "우주공강이 생기면 처음엔 당황하지만 어느새 자기만의 루틴을 만듭니다. 백양누리에서 커피를 마시거나 신촌 골목을 걷다 보면 머리가 조금 정리돼요. 급한 일에는 약해 보여도 의외로 막판 집중력이 있습니다. 계획은 작게 쪼갤수록 성공률이 올라갑니다.",
    geminiStyle: "교수님 헌정 랩 가사 같은 딴짓 프롬프트로 시간 때움",
    goodMatch: "gongdae",
    badMatch: "specup",
    prompt:
      "오늘 4시간 공강 동안 할 일을 현실적으로 짜줘. 집중 25분, 휴식 10분 단위로 나누고 마지막 30분은 쉬는 시간으로 남겨줘.",
    imageAsset: "./assets/eagles/space.png",
    backgroundAsset: "./assets/eagles/result-bg-space.png"
  },
  {
    id: "specup",
    name: "신촌 스터디카페 죽돌이 스펙업 독수리",
    emoji: "💼",
    oneLiner: "학회, 대외활동, 공모전, 자소서를 이미 한 화면에 펼친 조기 열정형",
    description:
      "바쁘다는 말을 자주 듣지만 사실 그 바쁨이 꽤 잘 어울립니다. 학회, 소모임, 공모전, 인턴 준비처럼 성장으로 이어지는 일을 빠르게 캐치해요. 초안을 만들고 구조를 세우는 데 강합니다. 번아웃을 피하려면 성과 없는 휴식도 일정에 넣어야 합니다.",
    geminiStyle: "공모전 기획서와 자소서용 Gems를 만들어두고 반복 사용",
    goodMatch: "akaraka",
    badMatch: "space",
    prompt:
      "이 아이디어를 공모전 기획서 초안으로 구조화해줘. 문제 정의, 타깃, 핵심 솔루션, 기대 효과, 실행 일정 순서로 써줘.",
    imageAsset: "./assets/eagles/specup.png",
    backgroundAsset: "./assets/eagles/result-bg-specup.png"
  },
  {
    id: "romance",
    name: "독수리다방 단골 낭만파 독수리",
    emoji: "🍲",
    oneLiner: "공부보다 동기들과의 낭만과 술자리에 마음이 먼저 가는 정 많은 타입",
    description:
      "2학기의 맛을 제일 잘 압니다. 동기들과의 밥약, 갑작스러운 술자리, 캠퍼스의 계절감에서 에너지를 얻어요. 느슨해 보여도 사람을 편하게 만드는 재능이 있습니다. 딱 한 가지, 결석 메일은 보내기 전에 한 번 더 읽고 보내면 완벽합니다.",
    geminiStyle: "숙취로 결석할 때 교수님께 보낼 정중한 메일 대필",
    goodMatch: "space",
    badMatch: "baekyang",
    prompt:
      "교수님께 보낼 정중한 결석 메일을 써줘. 핑계처럼 보이지 않게 간결하고 예의 있게, 보강 의지도 포함해줘.",
    imageAsset: "./assets/eagles/romance.png",
    backgroundAsset: "./assets/eagles/result-bg-romance.png"
  }
];

export const QUESTIONS = [
  {
    id: "q1",
    text: "2학기 첫 전공 팀플, 조장이 정해지지 않았다. 이때 나는?",
    options: [
      { label: "A", text: "답답해서 내가 조장 맡고 Gemini로 기획서 초안부터 뽑는다", scores: { baekyang: 2, specup: 1 } },
      { label: "B", text: "서기나 발표를 맡고 AI로 편하게 가는 법을 연구한다", scores: { akaraka: 2, space: 1 } },
      { label: "C", text: "코드나 데이터 파트만 조용히 가져간다", scores: { gongdae: 2, baekyang: 1 } },
      { label: "D", text: "일단 아무 말 안 하고 눈치를 본다", scores: { space: 2, romance: 1 } }
    ]
  },
  {
    id: "q2",
    text: "영문 논문·전공 서적 50페이지 과제가 나왔다.",
    options: [
      { label: "A", text: "NotebookLM에 PDF 던져서 3줄 요약부터 시킨다", scores: { baekyang: 2, gongdae: 1 } },
      { label: "B", text: "마감 3시간 전에 Gemini로 목차부터 잡고 채워 넣는다", scores: { romance: 2, space: 1 } },
      { label: "C", text: "이번 학기 포트폴리오에 쓸 수 있을지부터 계산한다", scores: { specup: 2, baekyang: 1 } },
      { label: "D", text: "백양로 한 바퀴 돌면서 마음을 다잡는다", scores: { space: 2, romance: 1 } }
    ]
  },
  {
    id: "q3",
    text: "시험 2주 전, 중앙도서관 열람실 예약 창을 열었다.",
    options: [
      { label: "A", text: "이미 자리 잡았다. 오늘부터 여기서 산다", scores: { baekyang: 2, specup: 1 } },
      { label: "B", text: "실험·과제 마감이 먼저라 시험은 나중 문제다", scores: { gongdae: 2, baekyang: 1 } },
      { label: "C", text: "연고전 끝나고 생각하기로 한다", scores: { akaraka: 2, romance: 1 } },
      { label: "D", text: "독수리다방에서 동기들이랑 벼락치기 모임 잡는다", scores: { romance: 2, akaraka: 1 } }
    ]
  },
  {
    id: "q4",
    text: "팀플 회의가 끝났다. 회의록 정리는 누가?",
    options: [
      { label: "A", text: "내가 Gemini로 5분 만에 정리해서 바로 공유한다", scores: { akaraka: 2, specup: 1 } },
      { label: "B", text: "다음 학회 지원서에 쓸 만한 내용만 따로 메모해둔다", scores: { specup: 2, baekyang: 1 } },
      { label: "C", text: "아무도 안 하면 결국 내가 밤에 몰아서 한다", scores: { gongdae: 2, baekyang: 1 } },
      { label: "D", text: "회의록보다 뒤풀이 장소가 더 궁금하다", scores: { romance: 2, akaraka: 1 } }
    ]
  },
  {
    id: "q5",
    text: "연고전 당일 아침, 눈을 떴다. 나의 첫 행동은?",
    options: [
      { label: "A", text: "과잠부터 챙겨 입고 응원 구호를 복습한다", scores: { akaraka: 2, romance: 1 } },
      { label: "B", text: "사람 많은 건 좀... 중도 자리부터 잡으러 간다", scores: { baekyang: 2, gongdae: 1 } },
      { label: "C", text: "자기소개서에 쓸 소재 하나 건질 수 있을까 고민한다", scores: { specup: 2, akaraka: 1 } },
      { label: "D", text: "일단 단톡방 분위기 보고 뒤풀이만 살짝 낀다", scores: { romance: 2, space: 1 } }
    ]
  },
  {
    id: "q6",
    text: "수강신청 망해서 우주공강 4시간이 생겼다.",
    options: [
      { label: "A", text: "중도 지하 열람실 직행", scores: { baekyang: 2, specup: 1 } },
      { label: "B", text: "백양누리에서 커피 마시며 멍때린다", scores: { space: 2, romance: 1 } },
      { label: "C", text: "공학관 실습실에서 밀린 과제를 만진다", scores: { gongdae: 2, baekyang: 1 } },
      { label: "D", text: "신촌 스터디카페에서 공모전 준비한다", scores: { specup: 2, gongdae: 1 } }
    ]
  },
  {
    id: "q7",
    text: "금요일 밤, 신촌에서 내 기본값은?",
    options: [
      { label: "A", text: "동기들이 부르면 일단 독수리다방 근처로 나간다", scores: { romance: 2, akaraka: 1 } },
      { label: "B", text: "학회나 동아리 모임 끝나고 다음 일정을 잡는다", scores: { akaraka: 2, specup: 1 } },
      { label: "C", text: "집이나 실습실에서 밀린 과제부터 끝낸다", scores: { gongdae: 2, baekyang: 1 } },
      { label: "D", text: "카페 구석에 앉아 아무것도 안 하는 시간을 확보한다", scores: { space: 2, romance: 1 } }
    ]
  },
  {
    id: "q8",
    text: "2학기가 끝났을 때 가장 듣고 싶은 말은?",
    options: [
      { label: "A", text: "너 이번 학기 학점 진짜 복구했더라", scores: { baekyang: 2, specup: 1 } },
      { label: "B", text: "너 연세대 생활 제대로 즐겼다", scores: { akaraka: 2, romance: 1 } },
      { label: "C", text: "그 프로젝트 네가 해결한 거야?", scores: { gongdae: 2, specup: 1 } },
      { label: "D", text: "너 요즘 뭐 그렇게 바빠?", scores: { specup: 2, akaraka: 1 } }
    ]
  }
];

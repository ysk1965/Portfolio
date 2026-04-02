import type { CareerEvent } from "./types";

export const positionEvents: CareerEvent[] = [
  {
    id: "position-client-programmer",
    date: "2019.04",
    year: 2019,
    title: "Programmer",
    description: "대규모·소규모 팀 모두 경험한 풀스택 게임 개발자",
    details:
      "KRAFTON SQUALL 80명 규모 대규모 팀에서 TERA ORIGIN의 컨텐츠를 클라이언트·서버 구분 없이 개발했고, COOKAPPS 10명 이하 소규모 팀에서는 메인 프로그래머로서 프로젝트 구조 설계부터 핵심 시스템 구현까지 주도했습니다. 클라이언트(Unity) 외에도 Golang 서버, Redis, 운영툴 FE(Vue.js), PUN2 기반 실시간 PvP까지 폭넓은 기술 스택을 다뤘습니다.",
    type: "project",
    tags: ["Unity", "C#", "Golang", "Redis", "Vue.js", "PUN2"],
  },
  {
    id: "position-product-owner",
    date: "2022.04",
    year: 2022,
    title: "Product Owner",
    description:
      "게임잼 성과로 잡은 기회, 제로 투 원에서 글로벌 서비스까지 비즈니스 성과를 만든 PO",
    details:
      "게임잼에서의 성과를 인정받아 PO로 전환하는 기회를 잡았고, 3명에서 시작해 23명까지 팀을 빌딩하며 무명기사단을 제로 투 원으로 글로벌 서비스까지 성장시켰습니다. 기획·개발·아트·QA 전 직군을 매니지먼트하며 비즈니스 성과를 이끌어냈고, 현재는 AX(AI Transformation)로 역량을 확장하고 있습니다.",
    type: "role-change",
    tags: ["PO", "팀 빌딩", "글로벌 런칭", "AX"],
    metric: "3→23명 팀 스케일업",
  },
];

export const careerEvents: CareerEvent[] = [
  {
    id: "krafton-join",
    date: "2019.04",
    year: 2019,
    title: "KRAFTON 입사",
    company: "KRAFTON",
    description:
      "국내 게임 매출 2위 TERA M의 KRAFTON SQUALL에 합류, JP공략 TERA ORIGIN 개발",
    icon: "/symbol/ci_krafton.jpg",
    details:
      "TERA M으로 국내 게임 매출 2위를 기록한 KRAFTON SQUALL에 합류했습니다. 이 성과를 바탕으로 일본 시장 공략을 위한 TERA ORIGIN 프로젝트(80명 규모)에 프로그래머로 투입되어, 클라이언트·서버를 구분하지 않는 컨텐츠 단위 개발 방식으로 대규모 MMORPG의 컨텐츠를 담당했습니다.",
    type: "join",
    tags: ["Unity", "C#", "Golang", "Redis", "Vue.js", "MMORPG"],
  },
  {
    id: "tera-origin-project",
    date: "2019.04",
    year: 2019,
    title: "TERA ORIGIN",
    company: "KRAFTON",
    description:
      "TERA M의 한국 성과를 바탕으로 일본 시장 공략을 위해 제작된 MMORPG",
    icon: "/icon/AppIcon_TERAOrigin.webp",
    details:
      "대규모 프로젝트에서 클라이언트 컨텐츠 개발뿐 아니라 서버 로직, 운영툴 제작까지 광범위하게 참여하며 폭넓은 기술 스택을 쌓았습니다. 큰 조직에서의 협업 방식과 컨텐츠 단위 개발 프로세스를 경험한 것이 이후 커리어의 기반이 되었습니다.",
    type: "project",
    tags: ["Unity", "C#", "Golang", "Redis", "Vue.js", "MMORPG"],
  },
  {
    id: "cookapps-join",
    date: "2020.04",
    year: 2020,
    title: "COOKAPPS 합류",
    company: "COOKAPPS",
    description: "프로그래머에서 PO까지, 6년간 5개 프로젝트를 리드하며 성장",
    icon: "/symbol/symbol_9.png",
    details:
      "더 주도적으로 일할 수 있는 환경을 찾아 합류, 실시간 PvP(랜덤로얄)와 Idle RPG(오늘도던전) 메인 프로그래머를 거쳐 게임잼 성과로 PO 기회를 잡았습니다. 무명기사단을 3명에서 23명 팀으로 스케일업하며 연매출 170억 원, 글로벌 4개국 서비스를 달성했고, 현재는 스텔라나이츠 PO와 팀 AX를 이끌고 있습니다.",
    type: "join",
    tags: ["Unity", "PO", "글로벌 런칭", "팀 빌딩"],
  },
  {
    id: "random-royale-project",
    date: "2020.04",
    year: 2020,
    title: "랜덤로얄",
    company: "COOKAPPS",
    description:
      "PUN2 기반 실시간 PvP 멀티플레이 시스템 설계·구현, 실시간 네트워크 프로그래밍 경험",
    icon: "/icon/AppIcon_RandomRoyale.webp",
    details:
      "COOKAPPS 합류 후 첫 프로젝트로 실시간 PvP 배틀로얄의 메인 프로그래머를 담당했습니다. PUN2 기반 실시간 멀티플레이 시스템을 설계·구현하며 네트워크 동기화, 지연 보상 등 실시간 네트워크 프로그래밍 역량을 쌓았습니다.",
    type: "project",
    tags: ["Unity", "PUN2", "실시간 PvP", "네트워크"],
    metric: "매출 $300만",
  },
  {
    id: "dungeon-today",
    date: "2021",
    year: 2021,
    title: "오늘도던전 메인 클라이언트",
    company: "COOKAPPS",
    description: "IDLE RPG 메인 클라이언트 프로그래머로 핵심 시스템 설계",
    icon: "/icon/AppIcon_AFKDungeon.webp",
    details:
      "UI 프레임워크, 컨텐츠 파이프라인, 실시간 동기화 시스템을 설계·구현. 이후 나이츠 키우기, 포트리스 사가 등 사내 게임잼에서 성과를 인정받아 PO 기회를 얻었습니다.",
    type: "project",
    tags: ["Unity", "Idle RPG"],
    metric: "매출 $755만",
  },
  {
    id: "po-transition",
    date: "2022.04",
    year: 2022,
    title: "PO 전환 — 무명기사단 시작",
    company: "COOKAPPS",
    description: "게임잼 성과를 인정받아 Product Owner로 전환, 팀 빌딩 시작",
    icon: "/icon/AppIcon_UnknownKnights.webp",
    details:
      "3명에서 시작한 팀을 12명까지 스케일업. 기획, 개발, 아트, QA 전 직군을 매니지먼트하며 팀배틀 RPG의 초기 설계부터 프로덕트 전체를 리드했습니다.",
    type: "role-change",
    tags: ["Unity", "PO", "팀 빌딩", "Team Battle RPG"],
    metric: "3→12명 팀 빌딩",
  },
  {
    id: "unnamed-knights-launch",
    date: "2023.04",
    year: 2023,
    title: "무명기사단 런칭 & BEP 달성",
    company: "COOKAPPS",
    description: "개발 1년 만에 런칭, 2개월 만에 BEP 달성. 글로벌 확장 시작",
    icon: "/icon/AppIcon_UnknownKnights.webp",
    details:
      "한국 하드런칭 후 대만(소프트월드), 일본, 중국(하오플레이)으로 글로벌 서비스를 확장. 단일 프로젝트로 2023년 연매출 170억 원을 달성했습니다.",
    type: "milestone",
    tags: ["글로벌 런칭", "한국", "미국", "대만", "일본"],
    metric: "매출 $1800만",
  },
  {
    id: "super-rookie-project",
    date: "2024",
    year: 2024,
    title: "슈퍼루키 프로젝트",
    company: "COOKAPPS",
    description:
      "공개채용으로 팀 빌딩 후 신규 멤버 학습 디렉팅 진행, 사내 4개 팀 중 가장 높은 D1 리텐션 40% 달성",
    icon: "/icon/AppIcon_SuperRookie.jpeg",
    details:
      "공개채용을 통해 팀을 빌딩하고 신규 멤버 학습 디렉팅을 진행했습니다. 사내 4개 팀 중 가장 높은 D1 리텐션 40%를 달성했습니다.",
    type: "project",
    tags: ["팀 빌딩", "D1 40%", "학습 디렉팅"],
    metric: "D1 리텐션 40%",
  },
  {
    id: "stella-knights-project",
    date: "2024",
    year: 2024,
    title: "스텔라나이츠 신규 프로젝트",
    company: "COOKAPPS",
    description:
      "무명기사단 운영 데이터 기반으로 설계한 전략 오토배틀러, 테스트 마케팅에서 D1 리텐션 50% 달성",
    icon: "/icon/AppIcon_AutoBattler.webp",
    details:
      "무명기사단 라이브 서비스에서 축적한 데이터와 인사이트를 기반으로 차기작 스텔라나이츠를 기획·디렉팅했습니다. 아이소매트릭 도트 아트의 낮은 CPI를 운영 데이터로 검증하고, 오토체스의 전략적 배치와 시너지 구성을 수집형 RPG에 결합한 전투 시스템을 설계했습니다. 테스트 마케팅에서 D1 리텐션 50%(동일 장르 평균 35%), CPI $2.5~$5.0을 기록하며 핵심 가설을 검증했습니다.",
    type: "project",
    tags: ["오토배틀러", "D1 50%", "프로젝트 디렉팅"],
    metric: "D1 리텐션 50%",
  },
  {
    id: "gowest-project",
    date: "2024",
    year: 2024,
    title: "Go West 신규 프로젝트",
    company: "COOKAPPS",
    description:
      "회사의 북미·서양권 타깃 전략 피봇에 맞춰 제안서를 작성하고 통과시켜 진행했으나, 무명기사단 판호 발급으로 홀딩",
    icon: "/icon/AppIcon_GoWest.webp",
    details:
      "회사가 Go West 전략으로 피봇하면서, 북미·서양권에 먹힐 장르를 직접 리서치하고 제안서를 작성하여 경영진 승인을 받아 프로젝트를 킥오프했습니다. 이후 무명기사단이 중국 외자판호를 발급받으면서 홀딩되었습니다.",
    type: "project",
    tags: ["Go West", "북미 타깃", "신규 제안"],
  },
  {
    id: "china-launch",
    date: "2025",
    year: 2025,
    title: "무명기사단 중국 외자판호 취득",
    company: "COOKAPPS",
    description:
      "중국 외자판호를 발급받아 하오플레이와 협업하여 중국 서비스 추진",
    icon: "/icon/AppIcon_UnknownKnights.webp",
    details:
      "무명기사단이 중국 외자판호를 발급받아 하오플레이와 협업하여 중국 서비스를 추진했습니다. 현지화 대응 및 중국 퍼블리셔와의 협업 프로세스를 주도하며 글로벌 서비스 영역을 확장했습니다.",
    type: "milestone",
    tags: ["외자판호", "하오플레이", "중국 진출"],
  },
  {
    id: "ax-transformation",
    date: "2026",
    year: 2026,
    title: "스텔라나이츠 재개",
    company: "COOKAPPS",
    icon: "/icon/AppIcon_AutoBattler.webp",
    description:
      "스텔라나이츠 프로젝트 PO로서 팀 AX 방향을 모색하며 개발 효율화",
    details:
      "스텔라나이츠의 PO로서 프로덕트를 리드하면서, AX(AI Transformation)를 팀에 적용하기 위해 자체 협업툴을 직접 기획·개발했습니다. 이 협업툴에 쌓인 데이터를 기반으로 보고서 자동화, 태스크 생성·분배 자동화 등 데이터 드리븐 업무환경을 구축하며 팀 생산성을 높이고 있습니다. 운영툴, 데이터 시트툴 등 내부 도구도 직접 개발하며 풀스택 역량을 확장하고 있습니다.",
    type: "project",
    tags: ["PO", "AX", "AI/MAS", "내부 도구 개발"],
  },
];

import type { SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    id: "client",
    title: "Client",
    type: "tech",
    subCategories: [
      {
        title: "Languages",
        items: [
          { name: "C" },
          { name: "C#" },
          { name: "C++" },
          { name: "Swift" },
          { name: "Vue.js" },
        ],
      },
      {
        title: "Tools & Engines",
        items: [{ name: "Unity3D" }, { name: "Xcode" }, { name: "DirectX12" }],
      },
    ],
  },
  {
    id: "server",
    title: "Server",
    type: "tech",
    subCategories: [
      {
        title: "Languages",
        items: [{ name: "C++" }, { name: "Golang" }],
      },
      {
        title: "Infra & DB",
        items: [
          { name: "SQL" },
          { name: "Redis" },
          { name: "IOCP" },
          { name: "PUN2" },
          { name: "AWS" },
        ],
      },
    ],
  },
  {
    id: "ai",
    title: "AI",
    type: "tech",
    subCategories: [
      {
        title: "System",
        items: [
          { name: "컨텍스트 엔지니어링" },
          { name: "자체 Orchestration" },
        ],
      },
    ],
  },
  {
    id: "client-lead",
    title: "클라이언트 리드",
    type: "management",
    description:
      "채용부터 육성까지 팀을 빌딩하고, 코드 품질과 개발 문화를 주도했습니다.",
    items: [
      { name: "채용 및 육성" },
      { name: "코드 리뷰 문화 정착" },
      { name: "리팩토링 주도" },
      { name: "기술 의사결정" },
    ],
  },
  {
    id: "po",
    title: "PO (Product Owner)",
    type: "management",
    description:
      "기획부터 아트까지 전 직군을 매니지먼트하며 데이터 기반 의사결정으로 프로덕트를 이끌었습니다.",
    items: [
      { name: "전 직군 매니지먼트" },
      { name: "데이터 기반 의사결정" },
      { name: "스프린트 운영" },
      { name: "KPI 관리" },
      { name: "IP 콜라보 기획" },
    ],
  },
  {
    id: "self-service",
    title: "자체 서비스",
    type: "management",
    description:
      "직접 기획/개발/운영하는 사이드 프로젝트를 통해 풀스택 역량을 확장하고 있습니다.",
    items: [
      { name: "BRIDGE SPOTS" },
      { name: "AutoBattler Sheets" },
      { name: "SignalFirst" },
      { name: "오케스트레이션 패키지" },
    ],
  },
];

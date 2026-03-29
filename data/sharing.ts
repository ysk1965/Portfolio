import type { SharingItem } from "./types";

export const sharingItems: SharingItem[] = [
  {
    id: "gdc-review",
    title: "게임 개발에 필요한 질문들",
    description:
      "2023 GDC 리뷰를 바탕으로 게임 개발 과정에서 던져야 할 핵심 질문들을 정리한 세션",
    tag: "internal",
    tagLabel: "쉐어링파티",
    links: [
      {
        label: "PDF",
        url: "/pdf/Session_쿡앱스 게임 개발에 필요한 질문들.pdf",
      },
    ],
  },
  {
    id: "user-value",
    title: "유저가 게임에 가치를 느끼는 순간",
    description:
      "유저 리텐션과 가치 인식에 대한 분석. 데이터 기반으로 유저가 게임에 몰입하는 핵심 순간을 탐구합니다.",
    tag: "internal",
    tagLabel: "쉐어링파티",
    links: [
      {
        label: "PDF",
        url: "/pdf/Session_유저가 게임에 가치를 느끼는 순간은 언제인가.pdf",
      },
      { label: "YouTube", url: "https://www.youtube.com/watch?v=2RMq--XN4Ng" },
    ],
  },
  {
    id: "graduation-talk",
    title: "졸업할 때 알았더라면",
    description:
      "한국공학대학교에서 진행한 세션. 현업 개발자의 시각에서 학생들에게 전하는 커리어 조언",
    tag: "external",
    tagLabel: "한국공학대학교",
    links: [{ label: "PDF", url: "/pdf/Session_한국공학대학교.pdf" }],
  },
  {
    id: "super-rookie",
    title: "슈퍼루키 게임 제작 가이드",
    description:
      "쿡앱스 인턴 대상으로 진행한 게임 제작 기초 가이드. 기획부터 출시까지의 과정을 공유",
    tag: "internal",
    tagLabel: "슈퍼루키 교육",
    links: [{ label: "PDF", url: "/pdf/Session_게임 제작 가이드.pdf" }],
  },
];

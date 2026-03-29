import type { Metadata } from "next";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { Career } from "@/components/sections/career";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Sharing } from "@/components/sections/sharing";
import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Portfolio | 기술로 비즈니스 임팩트를 만드는 개발자",
  description:
    "7년차 게임 개발자 & PO. KRAFTON, COOKAPPS에서의 경험과 사이드 프로젝트를 소개합니다.",
};

export default function Home() {
  return (
    <>
      <SectionWrapper id="hero" className="py-0 md:py-0">
        <Hero />
      </SectionWrapper>

      <SectionWrapper id="about">
        <AboutSection />
      </SectionWrapper>

      <SectionWrapper id="career">
        <Career />
      </SectionWrapper>

      <SectionWrapper id="projects">
        <Projects />
      </SectionWrapper>

      <SectionWrapper id="skills">
        <Skills />
      </SectionWrapper>

      <SectionWrapper id="sharing">
        <Sharing />
      </SectionWrapper>

      <SectionWrapper id="contact">
        <ContactSection />
      </SectionWrapper>
    </>
  );
}

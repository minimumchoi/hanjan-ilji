# 한잔일지 🍶

> 적당히 즐기는 음주 습관 기록 앱

---

## 📌 프로젝트 개요

- **이름**: 한잔일지
- **설명**: 절제 있는 음주 습관을 만들기 위해, 사용자가 자신의 음주 기록을 관리하고 피드백 받을 수 있는 음주 습관 기록 앱입니다.
- **목표**: 단순 기록을 넘어 음주 적정량 설정, 감정 체크, 안주 추천 등 다양한 요소를 통해 건강한 음주 문화 형성을 유도합니다.

---

## 🛠️ 기술 스택

| 영역     | 사용 기술                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend | <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> |
| Backend  | <img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 기타     | <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">                                                                                                                       |

---

## 🎯 주요 기능

- **날짜별 음주 기록**: 술 종류, 양, 기분 등 입력
- **월간 음주 목표 설정 및 달성률 시각화**
- **안주 추천**: 랜덤 안주 추천 기능 및 페어링 추천
- **로그인 / 회원가입 (Supabase Auth)**
- **기록 기반의 절제 피드백 메시지 제공**

---

## **👩‍💻 담당 역할**

**개인 프로젝트로, 기획부터 디자인, 개발까지 전 과정을 스스로 진행했습니다.**

- 전체 서비스 기획 및 UX 플로우 설계 (Figma 활용)
  <img src="/readme/userFlow.png">
  <img src="/readme/wireframe.png">

- 데이터 구조 설계
  <img src="/readme/supabaseSchema.png">

- 프론트엔드 구현 전반 (화면 설계, 상태 관리, 기록 UI 제작)

---

## **💡 배운 점**

- 일관된 디자인과 명확한 사용자 흐름을 만들기 위해 **정보 구조와 인터랙션 설계에 더 많은 시간 투자**의 필요성을 느꼈습니다.

---

## 🖥️ 주요 화면

- **로그인/회원가입 화면**
  - 로그인 유효성 검사
    <img width="300" src="/readme/signIn.gif">
    <br/>
  - 회원가입 유효성 검사
    <img width="300" src="/readme/signUp.gif">

      <br/>

- **홈**
  - 목표 유무에 따른 UI 분기
    <img width="300" src="/readme/home.gif">
    <br/>
  - 오늘의 한잔 기록 및 이달의 목표 수정
    <img width="300" src="/readme/home.png">

   <br/>

- **기록 추가 화면**
  - 유효성 검사
    <img width="300" src="/readme/todayDrinkForm.gif">
    <br/>

- **달력**
  - 주종별 색 분류
    <img width="300" src="/readme/calendar.png">
    <br/>
  - 수정
    <img width="300" src="/readme/calendar_edit.gif">
    <br/>
  - 삭제
    <img width="300" src="/readme/calendar_delete.gif">
    <br/>
- **안주 추천**
  - 랜덤 추천 (룰렛 UI)
    <img width="300" src="/readme/roulette.gif">
    <br/>
  - 주종별 안주 추천
    <img width="300" src="/readme/recommendFood.gif">
    <br/>

- **마이페이지**
  - 로그아웃
    <img width="300" src="/readme/signOut.gif">
    <br/>
  - 데이터 유무에 따른 UI분기
    <img width="250" src="/readme/myPage_1.png"> <img width="250" src="/readme/myPage_2.png"> <img width="250" src="/readme/myPage_3.png">
    <br/>
  - 이달의 요약 (총 음주 횟수 및 가장 자주 마신 주종 요약)
    <img width="300" src="/readme/monthlySummary.png">

---

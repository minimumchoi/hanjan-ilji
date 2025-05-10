export type ruletFoodProp = {
  name: string;
  description: string;
};

export const ruletFood: ruletFoodProp[] = [
  { name: "치킨", description: "맥주와 찰떡궁합, 바삭하고 고소한 국민 안주" },
  { name: "삼겹살", description: "소주엔 역시 구운 삼겹살! 씹을수록 깊은 맛" },
  {
    name: "감자튀김",
    description: "바삭한 감자에 케찹 한 스푼, 맥주랑 완벽 매칭",
  },
  {
    name: "두부김치",
    description: "따뜻한 두부에 매콤한 김치, 전통 혼술 안주",
  },
  {
    name: "골뱅이무침",
    description: "새콤달콤 골뱅이와 소면, 입맛 확 살려주는 안주",
  },
  {
    name: "오징어볶음",
    description: "매콤한 양념과 쫄깃한 식감으로 스트레스 타파",
  },
  {
    name: "나쵸 & 치즈",
    description: "살사소스와 함께 즐기는 멕시칸 스타일 안주",
  },
  {
    name: "치즈플래터",
    description: "와인과 완벽한 조화, 고급스러운 맛의 향연",
  },
  {
    name: "계란말이",
    description: "부드럽고 고소한 기본 안주, 해장 느낌도 있음",
  },
  { name: "쥐포구이", description: "불맛 가득한 옛날 감성 간단 안주" },
  { name: "훈제연어", description: "깔끔하고 고급진 안주, 와인과 찰떡" },
  { name: "닭발", description: "맵고 쫄깃한 맛으로 소주를 부르는 마성의 안주" },
  { name: "피자", description: "맥주랑 언제나 함께하는 치즈 폭탄" },
  {
    name: "치즈스틱",
    description: "바삭한 겉과 고소한 속, 맥주 안주계 귀염둥이",
  },
  { name: "오징어튀김", description: "겉은 바삭, 속은 쫄깃한 바다의 풍미" },
  { name: "버팔로윙", description: "매콤짭짤한 닭날개, 맥주와 찰떡궁합" },
  { name: "탕수육", description: "부먹파 찍먹파 다 환영! 바삭함과 단짠 조합" },
  { name: "족발", description: "부드러운 식감에 새우젓 한 스푼이면 소주 끝" },
  { name: "보쌈", description: "김치랑 한 쌈 싸먹으면 꿀맛, 회식 안주 대표" },
  {
    name: "간장계란밥",
    description: "은근히 중독성 있는 혼술용 간단 식사 안주",
  },
  { name: "떡볶이", description: "맵단맵단! 소주와도 맥주와도 잘 어울림" },
  { name: "비빔면", description: "차가운 매콤함으로 입맛과 술맛 둘 다 잡기" },
  {
    name: "건어물 세트",
    description: "쥐포, 먹태, 오징어, 간단하게 술안주 완성",
  },
  {
    name: "스테이크 슬라이스",
    description: "위스키와 어울리는 고급 고기 안주",
  },
  {
    name: "마라탕",
    description: "마라향이 입안을 지배할 때 시원한 맥주 한 잔",
  },
  { name: "라면", description: "국물 있는 안주로 혼술 끝판왕" },
  { name: "치즈라면", description: "국물에 치즈 풀리면 맵단조합 끝판왕" },
  {
    name: "치즈볼",
    description: "쫀득달콤한 한 입 간식, 달달한 술과 잘 어울림",
  },
  {
    name: "연어사시미",
    description: "부드럽고 고소한 생선, 소주·와인 모두 환영",
  },
  {
    name: "홍합탕",
    description: "따끈한 국물에 시원한 술 한 잔, 해장용으로도 굿",
  },
  { name: "문어숙회", description: "쫄깃한 식감과 깔끔한 술맛의 조화" },
  {
    name: "낙지볶음",
    description: "매콤하고 부드러운 바다맛, 소주를 부르는 맛",
  },
  {
    name: "카프레제",
    description: "모짜렐라 + 토마토 + 바질로 상큼한 와인 안주",
  },
  { name: "바게트 & 오일", description: "심플하지만 고급스러운 와인 곁들임" },
  {
    name: "과일 플래터",
    description: "달콤하고 산뜻하게, 와인/위스키 둘 다 OK",
  },
  { name: "초콜릿", description: "특히 위스키와 어울리는 쌉쌀한 디저트 안주" },
  { name: "견과류", description: "술맛 방해 안 하고 계속 손이 가는 스낵 안주" },
  {
    name: "비프저키",
    description: "짭짤하고 오래 씹는 고기 안주, 위스키와 찰떡",
  },
  {
    name: "에어프라이어 감자",
    description: "간편하게 만드는 포실포실 감튀 버전",
  },
  { name: "핫바", description: "편의점 혼술용 든든하고 짭조름한 한입 안주" },
];

type Food = {
  name: string;
  description: string;
};

// 술 종류와 해당하는 음식 리스트 타입
type MatchedFood = {
  drinkType: string;
  food: Food[];
};

export const matchedFood: MatchedFood[] = [
  {
    drinkType: "소주",
    food: [
      {
        name: "삼겹살",
        description:
          "기름지고 구운 맛이 진한 삼겹살은 소주의 기름을 씻어주는 짝꿍",
      },
      {
        name: "두부김치",
        description: "매콤하고 새콤한 김치와 담백한 두부 조합, 전통 혼술 안주",
      },
      { name: "오징어볶음", description: "매콤하고 쫄깃한 식감이 술맛을 돋움" },
      {
        name: "골뱅이무침",
        description: "새콤달콤한 양념과 쫄깃한 골뱅이, 면 사리와 함께",
      },
      {
        name: "감자전",
        description: "바삭하고 고소한 맛이 소주의 쓴맛을 중화시켜줌",
      },
      { name: "계란말이", description: "담백하고 간단하지만 든든한 기본 안주" },
      {
        name: "매운닭발",
        description: "맵고 쫄깃한 안주로 스트레스를 날리기 좋은 조합",
      },
      {
        name: "쥐포구이",
        description: "가볍게 씹는 간식형 안주로 인기 높은 소주 친구",
      },
    ],
  },
  {
    drinkType: "맥주",
    food: [
      {
        name: "치킨",
        description: "치맥은 진리 🍗🍺 바삭하고 짭조름한 맛과 궁합 최고",
      },
      {
        name: "감자튀김",
        description: "짭짤하고 바삭한 감자튀김은 탄산맥주와 찰떡",
      },
      {
        name: "피자",
        description: "치즈와 토마토의 고소한 조합이 맥주와 궁합 좋음",
      },
      {
        name: "소시지 플레이트",
        description: "짭짤한 육즙이 가득한 소시지는 흑맥주와도 잘 어울림",
      },
      {
        name: "나쵸 & 치즈",
        description: "멕시코 스타일 스낵 + 살사소스, 간단하고 손 쉬운 안주",
      },
      {
        name: "치즈스틱",
        description: "겉은 바삭, 속은 고소한 치즈로 맥주와 최고의 궁합",
      },
      {
        name: "오징어튀김",
        description: "바삭하고 짭조름한 튀김은 시원한 맥주와 찰떡",
      },
      {
        name: "버팔로윙",
        description: "매콤한 양념과 맥주의 시원함이 상반된 매력 조합",
      },
    ],
  },
  {
    drinkType: "와인",
    food: [
      {
        name: "치즈 플래터",
        description: "다양한 치즈와 견과류, 와인의 향과 맛을 풍부하게 살려줌",
      },
      {
        name: "바게트 + 올리브오일",
        description:
          "심플하지만 품격 있는 곁들임, 특히 화이트 와인과 잘 어울림",
      },
      {
        name: "살라미 & 하몽",
        description: "짭짤한 육가공 햄류는 레드와인과 고급스럽게 매칭",
      },
      {
        name: "카프레제 샐러드",
        description: "모짜렐라 + 토마토 + 바질 조합으로 상큼하게",
      },
      {
        name: "과일 플래터",
        description: "포도, 사과, 무화과 등 향긋한 과일로 입안을 정리",
      },
      {
        name: "훈제연어",
        description: "은은한 훈연 향과 와인의 조화가 깔끔함",
      },
      {
        name: "브리치즈 구이",
        description:
          "부드러운 치즈를 구워 꿀을 뿌려 먹으면 디저트 안주로도 훌륭",
      },
      {
        name: "가지 오븐구이",
        description: "레드와인과 잘 어울리는 고소하고 담백한 채소 요리",
      },
    ],
  },
  {
    drinkType: "위스키",
    food: [
      {
        name: "다크 초콜릿",
        description: "씁쓸하고 진한 초콜릿이 위스키의 풍미와 어울림",
      },
      {
        name: "건과일",
        description: "당분이 높아 위스키의 도수를 부드럽게 감싸줌",
      },
      {
        name: "견과류 믹스",
        description: "짭조름하고 고소한 맛으로 간단한 위스키 안주로 적합",
      },
      {
        name: "블루치즈",
        description: "진한 풍미의 치즈가 위스키의 묵직한 향과 잘 맞음",
      },
      {
        name: "훈제 치즈",
        description: "훈연향이 위스키의 스모키함과 조화로움",
      },
      {
        name: "스테이크 슬라이스",
        description: "육즙이 살아있는 고기 안주는 고도수 위스키와 잘 어울림",
      },
      {
        name: "비프저키",
        description: "짭조름하고 오래 씹는 맛이 위스키와 찰떡",
      },
      {
        name: "올리브 + 피클",
        description: "입안을 정리해주는 산뜻한 곁들임, 위스키의 뒷맛을 살려줌",
      },
    ],
  },
];

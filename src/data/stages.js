// 아나빠나사띠 16단계 콘텐츠 (4념처 × 4단계)
// 출처: 아나빠나사띠 숫따(MN 118). MVP에서는 정적 데이터로 제공하며,
// Supabase 연동 시 `stages` 테이블로 이관 예정.

export const TETRADS = {
  1: { name: '몸', pali: 'Kāya', hint: '호흡과 몸을 알아차림', color: 'var(--sage)' },
  2: { name: '느낌', pali: 'Vedanā', hint: '기쁨과 행복을 경험함', color: 'var(--clay)' },
  3: { name: '마음', pali: 'Citta', hint: '마음을 살피고 집중함', color: 'var(--sage-deep)' },
  4: { name: '법', pali: 'Dhamma', hint: '무상을 관하고 놓아버림', color: 'var(--clay-deep)' },
}

export const STAGES = [
  {
    id: 1, tetrad: 1,
    title_ko: '긴 호흡을 길게 알아차림',
    title_pali: 'Dīghaṁ assasati',
    description:
      '숨이 길게 들어오고 나갈 때, "길게 들이쉰다, 길게 내쉰다"고 분명히 안다. 호흡을 조작하지 않고, 있는 그대로의 긴 호흡을 알아차리는 첫걸음이다.',
    practice_tip: '호흡을 일부러 늘이지 마세요. 그저 지금 이 숨이 긴지 아는 것으로 충분합니다.',
  },
  {
    id: 2, tetrad: 1,
    title_ko: '짧은 호흡을 짧게 알아차림',
    title_pali: 'Rassaṁ assasati',
    description:
      '숨이 짧게 들어오고 나갈 때, "짧게 들이쉰다, 짧게 내쉰다"고 분명히 안다. 길고 짧음의 변화를 있는 그대로 관찰하며 알아차림을 이어간다.',
    practice_tip: '호흡의 길이는 저절로 변합니다. 판단 없이 그 변화를 지켜보세요.',
  },
  {
    id: 3, tetrad: 1,
    title_ko: '온몸을 경험하며 호흡',
    title_pali: 'Sabbakāya-paṭisaṁvedī',
    description:
      '호흡의 처음·중간·끝 전 과정을 놓치지 않고 온전히 경험하며 들이쉬고 내쉰다. 호흡이라는 "몸 전체"를 느낀다.',
    practice_tip: '들숨의 시작부터 날숨의 끝까지, 한 호흡을 처음부터 끝까지 따라가 보세요.',
  },
  {
    id: 4, tetrad: 1,
    title_ko: '몸의 작용을 고요히 하며 호흡',
    title_pali: 'Passambhayaṁ kāyasaṅkhāraṁ',
    description:
      '거칠던 호흡이 점차 미세하고 고요해진다. 몸의 긴장이 풀리고 호흡이 잔잔해지는 것을 경험하며 들이쉬고 내쉰다.',
    practice_tip: '애써 고요하게 만들기보다, 저절로 잔잔해지도록 허용하세요.',
  },
  {
    id: 5, tetrad: 2,
    title_ko: '기쁨을 경험하며 호흡',
    title_pali: 'Pīti-paṭisaṁvedī',
    description:
      '집중이 무르익으며 일어나는 기쁨(pīti)을 알아차리며 들이쉬고 내쉰다. 수행에서 자연스럽게 피어나는 환희를 경험한다.',
    practice_tip: '기쁨이 일어나면 그것에 매달리지 말고, 하나의 경험으로 알아차리세요.',
  },
  {
    id: 6, tetrad: 2,
    title_ko: '행복을 경험하며 호흡',
    title_pali: 'Sukha-paṭisaṁvedī',
    description:
      '기쁨보다 잔잔하고 깊은 행복(sukha), 편안함을 경험하며 들이쉬고 내쉰다. 몸과 마음에 스며드는 평온을 느낀다.',
    practice_tip: '행복은 고요함 속의 만족감입니다. 그 부드러운 감각에 머물러 보세요.',
  },
  {
    id: 7, tetrad: 2,
    title_ko: '마음의 작용을 경험하며 호흡',
    title_pali: 'Cittasaṅkhāra-paṭisaṁvedī',
    description:
      '느낌과 지각 등 마음을 물들이는 작용(citta-saṅkhāra)을 알아차리며 들이쉬고 내쉰다. 감정이 마음에 미치는 영향을 관찰한다.',
    practice_tip: '어떤 느낌이 마음을 움직이는지, 관찰자의 자리에서 바라보세요.',
  },
  {
    id: 8, tetrad: 2,
    title_ko: '마음의 작용을 고요히 하며 호흡',
    title_pali: 'Passambhayaṁ cittasaṅkhāraṁ',
    description:
      '들뜬 감정과 지각의 작용이 잦아들어 마음이 잔잔해진다. 마음의 동요가 가라앉는 것을 경험하며 들이쉬고 내쉰다.',
    practice_tip: '감정을 억누르지 마세요. 알아차림 속에서 저절로 가라앉습니다.',
  },
  {
    id: 9, tetrad: 3,
    title_ko: '마음을 경험하며 호흡',
    title_pali: 'Citta-paṭisaṁvedī',
    description:
      '지금 마음의 상태 — 집중되었는지 흩어졌는지, 밝은지 어두운지 — 를 있는 그대로 알아차리며 들이쉬고 내쉰다.',
    practice_tip: '"지금 내 마음은 어떤 상태인가?" 라벨 없이 그저 알아차리세요.',
  },
  {
    id: 10, tetrad: 3,
    title_ko: '마음을 기쁘게 하며 호흡',
    title_pali: 'Abhippamodayaṁ cittaṁ',
    description:
      '마음이 가라앉거나 무거울 때, 알아차림으로 마음을 북돋아 밝고 기쁘게 하며 들이쉬고 내쉰다.',
    practice_tip: '수행의 이로움을 떠올리며 마음에 가벼운 미소를 지어보세요.',
  },
  {
    id: 11, tetrad: 3,
    title_ko: '마음을 집중하며 호흡',
    title_pali: 'Samādahaṁ cittaṁ',
    description:
      '마음을 하나의 대상(호흡)에 모아 흔들림 없는 삼매(samādhi)로 이끌며 들이쉬고 내쉰다.',
    practice_tip: '마음이 흩어지면 부드럽게, 몇 번이고 호흡으로 돌아오세요.',
  },
  {
    id: 12, tetrad: 3,
    title_ko: '마음을 해방하며 호흡',
    title_pali: 'Vimocayaṁ cittaṁ',
    description:
      '탐욕·성냄·무기력 등 마음을 옭아매는 것에서 마음을 풀어 자유롭게 하며 들이쉬고 내쉰다.',
    practice_tip: '집착하는 것이 있다면, 날숨과 함께 가만히 놓아보세요.',
  },
  {
    id: 13, tetrad: 4,
    title_ko: '무상을 관찰하며 호흡',
    title_pali: 'Aniccānupassī',
    description:
      '모든 경험 — 호흡, 느낌, 마음 — 이 끊임없이 일어나고 사라지는 무상(anicca)함을 관찰하며 들이쉬고 내쉰다.',
    practice_tip: '한 호흡도 같지 않습니다. 매 순간의 변화를 지켜보세요.',
  },
  {
    id: 14, tetrad: 4,
    title_ko: '사라짐을 관찰하며 호흡',
    title_pali: 'Virāgānupassī',
    description:
      '무상을 봄으로써 대상에 대한 탐착이 옅어지고 사라지는 이욕(virāga)을 관찰하며 들이쉬고 내쉰다.',
    practice_tip: '붙잡으려는 마음이 옅어지는 것을 담담히 바라보세요.',
  },
  {
    id: 15, tetrad: 4,
    title_ko: '소멸을 관찰하며 호흡',
    title_pali: 'Nirodhānupassī',
    description:
      '괴로움과 그 원인이 그치고 소멸(nirodha)하는 고요함을 관찰하며 들이쉬고 내쉰다.',
    practice_tip: '무언가 그쳤을 때 남는 고요함, 그 평화에 머물러 보세요.',
  },
  {
    id: 16, tetrad: 4,
    title_ko: '놓아버림을 관찰하며 호흡',
    title_pali: 'Paṭinissaggānupassī',
    description:
      '모든 집착을 완전히 내려놓는 놓아버림(paṭinissagga)을 관찰하며 들이쉬고 내쉰다. 아나빠나사띠의 정점이다.',
    practice_tip: '마지막 날숨과 함께, 쥐고 있던 모든 것을 온전히 놓아보세요.',
  },
]

export const getStage = (id) => STAGES.find((s) => s.id === Number(id))
export const getStagesByTetrad = (tetrad) => STAGES.filter((s) => s.tetrad === tetrad)

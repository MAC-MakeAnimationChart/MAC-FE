// 요금제 데이터 — MainPage(미리보기), PricingPage(전체) 공용
// billing 상태에 따라 amount/yearlyAmount를 골라 표시함

export const PLANS = [
    {
        name: 'Free',
        amount: '₩0',
        yearlyAmount: '₩0',
        period: '/ 월',
        tagline: '개인 사용자를 위한 기본 기능',
        cta: { label: '무료로 시작', variant: 'secondary', to: '/signup' },
        features: [
            '프로젝트 3개',
            '파일 크기 5MB',
            '차트 8종',
            'PNG 내보내기',
        ],
    },
    {
        name: 'Pro',
        amount: '₩19,000',
        yearlyAmount: '₩15,000',
        period: '/ 월',
        tagline: '개인 · 소규모 팀을 위한 전문 도구',
        cta: { label: 'Pro 시작하기', variant: 'primary', to: '/signup?plan=pro' },
        features: [
            '프로젝트 무제한',
            '파일 크기 50MB',
            'SVG · PDF 내보내기',
            '세금계산서 발급',
        ],
        featured: true,
        badge: '가장 인기',
    },
    {
        name: 'Team',
        amount: '₩49,000',
        yearlyAmount: '₩39,000',
        period: '/ 월',
        tagline: '팀 협업과 공유를 위한 완전판',
        cta: { label: 'Team 시작하기', variant: 'secondary', to: '/signup?plan=team' },
        features: [
            'Pro의 모든 기능',
            '멤버 초대 · 공동 편집',
            'URL 공유 · 임베드',
            '우선 지원',
        ],
    },
];

import SectionHeader from '../SectionHeader/SectionHeader';
import TemplateCard from '../TemplateCard/TemplateCard';
import Button from '../Button/Button';
import './TemplateList.css';

// 노션 디자인 반영:
//  - 첫 번째만 활성 ('이 템플릿 사용하기')
//  - 나머지 2개는 '준비 중' 뱃지 + 비활성 CTA
//  - previewType: 각 카드마다 다른 미리보기 그림
const TEMPLATES = [
    {
        category: '예시 템플릿',
        title: '학원 예시 데이터',
        desc: '교육 분야 예시 표와 추천 차트 구성으로 업로드 후 시각화 흐름을 빠르게 체험합니다.',
        previewType: 'bar',
        comingSoon: false,
        ctaTo: '/studio?template=academy',
        ctaLabel: '이 템플릿 사용하기',
    },
    {
        category: '🎓 학교 도메인',
        title: '학교 학급 관리 템플릿',
        desc: '출결 관리 · 학급별 성적 분포 · 행사 일정 · 학부모 소통 현황.',
        previewType: 'line',
        comingSoon: true,
    },
    {
        category: '💼 비즈니스 도메인',
        title: '비즈니스 성과 대시보드',
        desc: '매출 · 고객 · 마케팅 채널 분석 · KPI 카드 · 전환율 · 성장 추이 차트.',
        previewType: 'donut',
        comingSoon: true,
    },
];

export default function TemplateList() {
    return (
        <section className="template-list" id="templates">
            <div className="template-list__inner">
                <SectionHeader
                    eyebrow="TEMPLATES"
                    title="템플릿으로 더 빠르게 시작하세요"
                    subtitle="목적에 맞는 템플릿을 골라 데이터만 연결하면 1분 만에 완성됩니다."
                />

                <div className="template-list__grid">
                    {TEMPLATES.map((tpl) => (
                        <TemplateCard key={tpl.title} {...tpl} />
                    ))}
                </div>

                <div className="template-list__cta">
                    <Button variant="ghost" to="/templates">
                        모든 템플릿 보기 →
                    </Button>
                </div>
            </div>
        </section>
    );
}

import { useState } from 'react';
import SiteHeader from '../../components/SiteHeader/SiteHeader';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import BillingToggle from '../../components/BillingToggle/BillingToggle';
import PlanGrid from '../../components/PlanGrid/PlanGrid';
import ComparisonTable from '../../components/ComparisonTable/ComparisonTable';
import PaymentInfo from '../../components/PaymentInfo/PaymentInfo';
import FaqList from '../../components/FaqList/FaqList';
import FinalCta from '../../components/FinalCta/FinalCta';
import './PricingPage.css';

const PRICING_FAQS = [
    {
        question: '플랜은 언제든 변경할 수 있나요?',
        answer:
            '네, 언제든 업그레이드 또는 다운그레이드가 가능합니다. 변경 시점에 따라 요금이 일할 계산됩니다.',
    },
    {
        question: '세금계산서를 발급받을 수 있나요?',
        answer:
            'Pro 이상의 플랜에서 세금계산서를 발급해드립니다. 결제 후 사업자 정보를 등록하면 매월 자동으로 발급됩니다.',
    },
    {
        question: '환불 정책은 어떻게 되나요?',
        answer:
            '결제 후 14일 이내에는 사유 없이 전액 환불해드립니다. 그 이후에는 미사용 기간에 대한 비례 환불이 가능합니다.',
    },
    {
        question: '연간 결제 시 얼마나 할인되나요?',
        answer:
            '월간 결제 대비 약 20% 할인됩니다. 두 달 무료라고 생각하시면 됩니다.',
    },
    {
        question: '업로드한 데이터는 어떻게 보호되나요?',
        answer:
            '모든 데이터는 전송과 저장 시 암호화됩니다. 계정 삭제 시 즉시 영구 삭제되며, 백업본은 30일 이내 자동 삭제됩니다.',
    },
];

export default function PricingPage() {
    const [billing, setBilling] = useState('monthly');

    return (
        <div className="pricing-page">
            <SiteHeader />

            <main className="pricing-page__main">
                <section className="pricing-page__hero">
                    <div className="pricing-page__hero-inner">
                        <h1 className="pricing-page__hero-title">
                            데이터에 맞는 플랜을 선택하세요
                        </h1>
                        <p className="pricing-page__hero-subtitle">
                            무료로 시작하고 필요할 때 업그레이드하세요. 언제든 변경하고 환불할 수 있습니다.
                        </p>
                        <BillingToggle
                            value={billing}
                            onChange={setBilling}
                        />
                    </div>
                </section>

                <PlanGrid billing={billing} />
                <ComparisonTable />
                <PaymentInfo />
                <FaqList
                    title="결제 관련 궁금한 점"
                    items={PRICING_FAQS}
                />
                <FinalCta
                    title="아직 결정이 어려우신가요?"
                    subtitle="무료로 먼저 사용해보거나 영업팀과 상담해보세요."
                    primaryLabel="무료로 시작"
                    primaryTo="/signup"
                    secondaryLabel="영업팀 상담"
                    secondaryHref="#"
                />
            </main>

            <SiteFooter />
        </div>
    );
}

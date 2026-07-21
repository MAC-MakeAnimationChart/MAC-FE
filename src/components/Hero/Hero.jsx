import Button from '../Button/Button';
import './Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero__inner">
                <div className="hero__grid">
                    <div className="hero__copy">
                        <span className="hero__eyebrow">새로운 시각화 경험</span>
                        <h1 className="hero__title">
                            데이터를 차트로,<br />바로 완성하세요
                        </h1>
                        <p className="hero__subtitle">
                            CSV와 엑셀 파일을 올리면 차트 초안이 즉시 만들어집니다.<br />
                            색상, 라벨, 축을 다듬고 발표용 결과물로 내보내세요.
                        </p>
                        <div className="hero__actions">
                            <Button variant="primary" size="lg" to="/signup">
                                무료로 시작하기
                            </Button>
                            <Button variant="secondary" size="lg" to="/studio">
                                샘플 데이터로 체험
                            </Button>
                        </div>
                        <p className="hero__note">신용카드가 필요하지 않습니다</p>
                    </div>

                    <div className="hero__visual" aria-label="제품 데모 영상">
                        제품 데모 영상 영역
                    </div>
                </div>
            </div>
        </section>
    );
}

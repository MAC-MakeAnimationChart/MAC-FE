import PlanCard from '../PlanCard/PlanCard';
import { PLANS } from '../../data/plans';
import './PlanGrid.css';

/**
 * props:
 *  - billing: 'monthly' | 'yearly'
 */
export default function PlanGrid({ billing }) {
    return (
        <section className="plan-grid">
            <div className="plan-grid__inner">
                <div className="plan-grid__list">
                    {PLANS.map((plan) => (
                        <PlanCard
                            key={plan.name}
                            {...plan}
                            billing={billing}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

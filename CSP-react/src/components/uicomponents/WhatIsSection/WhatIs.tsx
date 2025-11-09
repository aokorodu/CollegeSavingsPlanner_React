import styles from './WhatIsSection.module.css';

const WhatIs = () => {
    return (
        <div className={styles.holder}>
            <h2>How much will you need?</h2>
            <div className={styles.paragraph}>
                The College Savings Planner is a tool designed to help parents estimate the future cost of a college education, and to plan their 529 savings accordingly. By inputting various parameters like the number of years from now you expect your child to start college and the amount and cadence of your contributions, you can get a clearer picture of how much you need to save to cover future college expenses.
            </div>
            <h2>What's a 529?</h2>
            <div className={styles.paragraph}>A 529 plan is a savings plan designed to encourage saving for future education costs. These plans are sponsored by states and educational institutions, and contributions grow <strong>tax-free</strong> until withdrawn for qualified education expenses.</div>
            <h2>How it works</h2>
            <div className={styles.paragraph}>
                Simply make your selections below - how much money you can contribute, how often, and how long before your child starts college - and the planner will calculate the estimated future cost of college and how much you need to save to meet that goal. For the current cost of college we've given you the ability to select from a range of "average" costs based on the type of institution, or to select the cost of a specific college, if you'd like.
            </div>
            <div className={styles.paragraph}>
                The planner also allows you to play around with different scenarios - high or low rate of return on your investment, or inflation in tuition costs, to see how changes in your savings plan can impact your overall college funding strategy. We've entered somoe sample values to get you started ($100/month contribution for 17 years, etc), but feel free to adjust them to fit your own situation.
            </div>
            <div className={styles.paragraph}>
                <i><strong>Please note</strong> that the College Savings Planner provides estimates based on the inputs you provide and current market conditions. Actual costs and investment returns may vary. It's always a good idea to consult with a financial advisor for personalized advice tailored to your specific situation.</i>
            </div>
            <p>

            </p>
        </div>
    );
};

export default WhatIs;
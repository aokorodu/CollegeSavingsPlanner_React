import styles from './WhatIsSection.module.css';

const WhatIs = () => {
    return (
        <div className={styles.holder}>
            <h2>How much will you need?</h2>
            <div className={styles.paragraph}>
                The College Savings Planner is a tool designed to help parents and guardians estimate the future cost of college education and plan their savings accordingly. By inputting various parameters - the number of years from now you expect your child to start college, current college costs, the amount and cadence of your contributions, and expected rate of return, users can get a clearer picture of how much they need to save to cover future college expenses.
            </div>
            <h2>How it works</h2>
            <div className={styles.paragraph}>
                This planner takes into account factors like inflation and investment growth to provide an estimate of college savings needs. Whether you're just starting to save or looking to adjust your currentsavings strategy, the College Savings Planner is a valuable resource to help you achieve your educational funding goals.
            </div>
            <p>

            </p>
        </div>
    );
};

export default WhatIs;
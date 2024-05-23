export const calculateMonthlyMortgagePayment = (mortgageDrawdown, mortgageRate, loanTerm) => {
  const monthlyInterestRate = mortgageRate / 12 / 100;
  const loanTermMonths = loanTerm * 12;
  const monthlyPayment = mortgageDrawdown * 
    (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths)));
  return monthlyPayment;
};
  
export const generateRepaymentSchedule = (mortgageDrawdown, mortgageRate, loanTerm, remortgages = [], startYear = 1) => {
    const monthlyInterestRate = mortgageRate / 12 / 100;
    const loanTermMonths = loanTerm * 12;
    const monthlyPayment = calculateMonthlyMortgagePayment(mortgageDrawdown, mortgageRate, loanTerm);

    let repaymentSchedule = [];
    let remainingBalance = mortgageDrawdown;
    let remortgageIndex = 0;
    let currentRemortgage = remortgages[remortgageIndex];
    let lastYearDetails = null;

    for (let year = startYear; year < startYear + loanTerm; year++) {
        let annualInterestCharged = 0;
        let capitalRepayment = 0;

        for (let month = 1; month <= 12; month++) {
            let interestForMonth = remainingBalance * monthlyInterestRate;
            let mortgageDrawdownRepaymentForMonth = monthlyPayment - interestForMonth;
            remainingBalance -= mortgageDrawdownRepaymentForMonth;

            annualInterestCharged += interestForMonth;
            capitalRepayment += mortgageDrawdownRepaymentForMonth;
        }

        if (remainingBalance < 1) {
            capitalRepayment += remainingBalance;
            remainingBalance = 0;
        }

        const openingBalance = remainingBalance + capitalRepayment;

        if (currentRemortgage && year === currentRemortgage.year) {
            const { newRate, newTerm } = currentRemortgage;
            const nestedSchedule = generateRepaymentSchedule(remainingBalance, newRate, newTerm, remortgages.slice(remortgageIndex + 1), year).repaymentSchedule;
            repaymentSchedule.push({
                year,
                openingBalance,
                annualInterestCharged,
                capitalRepayment,
                nestedSchedule
            });
            break;
        } else {
            repaymentSchedule.push({
                year,
                openingBalance,
                annualInterestCharged,
                capitalRepayment,
                nestedSchedule: []
            });
        }

        lastYearDetails = { openingBalance, capitalRepayment };

        // If a remortgage year is reached, stop the current schedule here
        if (currentRemortgage && year + 1 === currentRemortgage.year) {
            break;
        }
    }

    return { repaymentSchedule, remainingBalance, lastYearDetails };
};













  
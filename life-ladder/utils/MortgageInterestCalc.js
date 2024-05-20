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

      if (remainingBalance < 0) {
          capitalRepayment += remainingBalance; 
          remainingBalance = 0;
      }

      repaymentSchedule.push({
          year,
          openingBalance: remainingBalance + capitalRepayment, 
          annualInterestCharged,
          capitalRepayment,
          nestedSchedule: []
      });

      // Handle nested remortgage
      if (currentRemortgage && year === currentRemortgage.year) {
          const { newRate, newTerm } = currentRemortgage;
          const nestedSchedule = generateRepaymentSchedule(remainingBalance, newRate, newTerm, remortgages.slice(remortgageIndex + 1), year).repaymentSchedule;
          repaymentSchedule[year - startYear].nestedSchedule = nestedSchedule;
          break;
      }
  }

  return { repaymentSchedule, remainingBalance };
};








  
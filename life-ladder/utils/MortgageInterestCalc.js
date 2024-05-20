export const calculateMonthlyMortgagePayment = (mortgageDrawdown, mortgageRate, loanTerm) => {
    const monthlyInterestRate = mortgageRate / 12 / 100;
    const loanTermMonths = loanTerm * 12;
    const monthlyPayment = mortgageDrawdown * 
      (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths)));
    return monthlyPayment;
};
  
export const generateRepaymentSchedule = (mortgageDrawdown, mortgageRate, loanTerm) => {
    const monthlyInterestRate = mortgageRate / 12 / 100;
    const loanTermMonths = loanTerm * 12;
    const monthlyPayment = calculateMonthlyMortgagePayment(mortgageDrawdown, mortgageRate, loanTerm);
  
    let repaymentSchedule = [];
    let remainingBalance = mortgageDrawdown;
  
    for (let year = 1; year <= loanTerm; year++) {
      let annualInterestCharged = 0;
      let capitalRepayment = 0;
  
      for (let month = 1; month <= 12; month++) {
        let interestForMonth = remainingBalance * monthlyInterestRate;
        let mortgageDrawdownRepaymentForMonth = monthlyPayment - interestForMonth;
        remainingBalance -= mortgageDrawdownRepaymentForMonth;
  
        // Accumulate totals for the year
        annualInterestCharged += interestForMonth;
        capitalRepayment += mortgageDrawdownRepaymentForMonth;
      }
  
      // Correct for potential negative remaining balance in the last year
      if (remainingBalance < 0) {
        capitalRepayment += remainingBalance; // Subtract since remainingBalance is negative
        remainingBalance = 0;
      }
  
      repaymentSchedule.push({
        year,
        openingBalance: remainingBalance + capitalRepayment, // Adjusted for the loop's decrement
        annualInterestCharged,
        capitalRepayment,
      });
    }
  
    return repaymentSchedule;
};
  
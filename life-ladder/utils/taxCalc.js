// Define the function to calculate Universal Social Charge (USC)
const calculateUSC = (grossIncome) => {
    let usc = 0;
    if (grossIncome > 13000) {
      usc += Math.min(12012, grossIncome) * 0.005; // Apply 0.5% to the first €12,012
      if (grossIncome > 12012) {
        usc += (Math.min(25760, grossIncome) - 12012) * 0.02; // Apply 2% to the next band up to €25,760
      }
      if (grossIncome > 25760) {
        usc += (Math.min(70044, grossIncome) - 25760) * 0.04; // Apply 4% to the next band up to €70,044
      }
      if (grossIncome > 70044) {
        usc += (grossIncome - 70044) * 0.08; // Apply 8% to the remainder over €70,044
      }
    }
    return usc;
  };
  
  // Define the function to calculate Pay As You Earn (PAYE) tax
  const calculatePAYE = (grossIncome) => {
    const taxCredits = 3750; // Assume this is a constant for simplicity
    let taxableIncome = grossIncome - taxCredits; // Subtract tax credits from gross income to get taxable income
    let paye = (Math.min(42000, taxableIncome) * 0.20) + (Math.max(taxableIncome - 42000, 0) * 0.40);
    return Math.max(paye, 0); // PAYE cannot go below 0
  };
  
  // Define the function to calculate Pay Related Social Insurance (PRSI)
  const calculatePRSI = (grossIncome) => {
    return grossIncome * 0.04; // Flat 4% rate
  };
  
  // Export the function to calculate detailed tax information
  export const calculateTaxDetails = (grossIncome) => {
    const usc = calculateUSC(grossIncome);
    const paye = calculatePAYE(grossIncome);
    const prsi = calculatePRSI(grossIncome);
    const netIncome = grossIncome - usc - paye - prsi;
    const netMonthlyIncome = netIncome / 12;
    const netWeeklyIncome = netIncome / 52;
  
    return {
        usc,
        paye,
        prsi,
        netIncome,
        netMonthlyIncome,
        netWeeklyIncome,
        taxCredits: 3750
    };
  };
  
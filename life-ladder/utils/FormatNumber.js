export const formatNumber = value => {
    
    const stringValue = String(value);
    const numericalValue = stringValue.replace(/[^\d.-]/g, '');
    const formattedValue = numericalValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return numericalValue > 0 ? `€${formattedValue}` : formattedValue;
};

export const handleNumericChange = (value, setter) => {
    // Convert to string and remove commas and non-numeric characters
    const stringValue = String(value).replace(/,/g, '').replace(/[^\d.-]/g, '');
    
    // Remove leading zeros from the integer part
    const normalizedValue = stringValue.replace(/^0+(?!\.)/, '');
  
    const parts = normalizedValue.split('.');
    if (parts.length > 1 && parts[1] && parts[1].length > 2) {
      // If more than two decimals, do not update the setter
      return;
    }
  
    if (parts[0] && parts[0].length > 7) {
      return; // Do not update if integer part exceeds 7 digits
    }
  
    setter(normalizedValue);
  };

export const handleFormattedDisplay = value => {
    return formatNumber(value || '');  
};

export const handleFormattedDisplayTwoDecimal = (value) => {
    if (value === null) return '0.00';
    const number = parseFloat(value);
    return handleFormattedDisplay(number.toFixed(2));
};
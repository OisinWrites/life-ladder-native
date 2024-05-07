export const formatNumber = (value) => {
  const stringValue = String(value || '');
  const numericalValue = stringValue.replace(/[^\d.-]/g, '');
  const formattedValue = numericalValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parseFloat(numericalValue) > 0 ? `€${formattedValue}` : formattedValue;
};

export const handleNumericChange = (value, setter) => {
  // Ensure value is a string and remove commas and non-numeric characters
  let stringValue = String(value || '').replace(/,/g, '').replace(/[^\d.-]/g, '');

  // Ensure only one decimal point is allowed
  const decimalIndex = stringValue.indexOf('.');
  if (decimalIndex !== -1) {
    stringValue = stringValue.slice(0, decimalIndex + 1) + stringValue.slice(decimalIndex + 1).replace(/\./g, '');
  }

  // Remove leading zeros from the integer part
  const normalizedValue = stringValue.replace(/^0+(?!\.)/, '');

  // Split the value into integer and decimal parts
  const parts = normalizedValue.split('.');
  if (parts.length > 1 && parts[1] && parts[1].length > 2) {
    // If more than two decimals, do not update the setter
    return;
  }

  if (parts[0] && parts[0].length > 7) {
    return; // Do not update if the integer part exceeds 7 digits
  }

  setter(normalizedValue);
};

export const handleFormattedDisplay = (value) => {
  return formatNumber(value || '');
};

export const handleFormattedDisplayTwoDecimal = (value) => {
  if (value === null || value === undefined) return '0.00';
  const number = parseFloat(value) || 0;
  return handleFormattedDisplay(number.toFixed(2));
};

export const formatNumber = value => {
    
    const stringValue = String(value);
    const numericalValue = stringValue.replace(/[^\d.-]/g, '');
    const formattedValue = numericalValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return numericalValue > 0 ? `€${formattedValue}` : formattedValue;
};

export const handleNumericChange = (value, setter) => {
    
    const stringValue = String(value);
    const numericalValue = stringValue.replace(/,/g, '').replace(/[^\d.-]/g, '');
    const parts = numericalValue.split('.');
    if (parts.length > 1 && parts[1].length > 2) {
        // If more than two decimals, do not update the setter
        return;
    }
    
    setter(numericalValue);
};

export const handleFormattedDisplay = value => {
    return formatNumber(value || '');  
};

export const handleFormattedDisplayTwoDecimal = (value) => {
    if (value === null) return '0.00';
    const number = parseFloat(value);
    return handleFormattedDisplay(number.toFixed(2));
};
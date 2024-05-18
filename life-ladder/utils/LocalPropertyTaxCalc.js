const countyPercentages = {
    "Carlow County Council": 5,
    "Cavan County Council": 15,
    "Clare County Council": 15,
    "Cork City Council": 9,
    "Cork County Council": 7.5,
    "Donegal County Council": 15,
    "Dublin City Council": -15,
    "Dún Laoghaire-Rathdown County Council": -15,
    "Fingal County Council": -7.5,
    "Galway City Council": 0,
    "Galway County Council": 0,
    "Kerry County Council": 10,
    "Kildare County Council": 10,
    "Kilkenny County Council": 15,
    "Laois County Council": 10,
    "Leitrim County Council": 15,
    "Limerick City and County Council": 15,
    "Longford County Council": 15,
    "Louth County Council": 0,
    "Mayo County Council": 10,
    "Meath County Council": 0,
    "Monaghan County Council": 15,
    "Tipperary County Council": 10,
    "Offaly County Council": 15,
    "Roscommon County Council": 15,
    "Sligo County Council": 15,
    "South Dublin County Council": -15,
    "Waterford City and County Council": 10,
    "Westmeath County Council": 0,
    "Wexford County Council": 15,
    "Wicklow County Council": 6
  };
  
function calculateBasePropertyTax(propertyPrice) {
    if (propertyPrice <= 200000) return 90;
    if (propertyPrice <= 262500) return 225;
    if (propertyPrice <= 350000) return 315;
    if (propertyPrice <= 437500) return 405;
    if (propertyPrice <= 525000) return 495;
    if (propertyPrice <= 612500) return 585;
    if (propertyPrice <= 700000) return 675;
    if (propertyPrice <= 787500) return 765;
    if (propertyPrice <= 875000) return 855;
    if (propertyPrice <= 962500) return 945;
    if (propertyPrice <= 1050000) return 1035;
    return propertyPrice * 0.0025;
  }
  
function calculatePropertyTax(propertyPrice, county) {
    const baseTax = calculateBasePropertyTax(propertyPrice);
    const percentage = countyPercentages[county] || 0;
    const finalTax = baseTax + (baseTax * (percentage / 100));
    return finalTax;
  }
  
export { countyPercentages, calculateBasePropertyTax, calculatePropertyTax };

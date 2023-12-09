document.addEventListener('DOMContentLoaded', () => {
  // Input elements
  const cashInputs = [
    'et2000', 'et500', 'et200', 'et100', 'et50', 'et20', 'et10', 'et5', 'et2', 'et1'
  ].map(id => document.getElementById(id));

  // Result text elements
  const cashTexts = [
    'txt2000', 'txt500', 'txt200', 'txt100', 'txt50', 'txt20', 'txt10', 'txt5', 'txt2', 'txt1'
  ].map(id => document.getElementById(id));

  const txtFinalCash = document.getElementById('txtFinalCash');
  const txtFinalCashInWords = document.getElementById('txtFinalCashInWords');
  const btnReset = document.getElementById('btnReset');

  // Event listeners
  cashInputs.forEach((input, index) => {
    input.addEventListener('input', () => cashCalculate(index));
  });

  btnReset.addEventListener('click', clearData);

  // Calculation functions
  function cashCalculate(index) {
    const denominations = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
    let inputValue = parseInt(cashInputs[index].value, 10);
    
    // Validate input value
    if (isNaN(inputValue) || inputValue < 0) {
      inputValue = 0;
    } else if (inputValue > 10000) {
      inputValue = 10000;
      cashInputs[index].value = inputValue; // Update the input field value
      alert('Please enter a value less than or equal to 10000.');
    }
  
    const rowValue = inputValue * denominations[index];
    cashTexts[index].textContent = rowValue.toFixed(0);
    totalCash();
  }
  

  function totalCash() {
    let totalCashValue = cashTexts.reduce((total, text) => total + parseInt(text.textContent), 0);
    txtFinalCash.textContent = `Total Cash: ${totalCashValue}`;
    txtFinalCashInWords.textContent = `Total Cash In Words: ${convertToWords(totalCashValue)}`;
  }

  function clearData() {
    cashInputs.forEach(input => (input.value = ''));
    cashTexts.forEach(text => (text.textContent = '0'));
    totalCash();
  }

  function convertToWords(number) {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];    // 0 - 9
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];    // 10 - 19
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];    // 20 - 90

    if (number === 0) {
      return 'Zero';
    }

    let words = '';
  
    if (Math.floor(number / 1000000000000) > 0) {
      words += convertToWords(Math.floor(number / 1000000000000)) + ' Trillion ';
      number %= 1000000000000;
    }

    if (Math.floor(number / 1000000000) > 0) {
      words += convertToWords(Math.floor(number / 1000000000)) + ' Billion ';
      number %= 1000000000;
    }

      if (Math.floor(number / 10000000) > 0) {
        words += convertToWords(Math.floor(number / 10000000)) + ' Crore ';
        number %= 10000000;
      }
  
      if (Math.floor(number / 100000) > 0) {
        words += convertToWords(Math.floor(number / 100000)) + ' Lakh ';
        number %= 100000;
      }
  
      if (Math.floor(number / 1000) > 0) {
        words += convertToWords(Math.floor(number / 1000)) + ' Thousand ';
        number %= 1000;
      }
  
      if (Math.floor(number / 100) > 0) {
        words += convertToWords(Math.floor(number / 100)) + ' Hundred ';
        number %= 100;
      }
  

      if (number > 0) {
          if (number < 10) {
              words += units[number]; 
          } else if (number < 20) {
             words += teens[number - 10]; 
          } else {
              words += tens[Math.floor(number / 10)];  //  40 / 10 = 4
              if (number % 10 > 0) {
                words += ' ' + units[number % 10];
              }
          }
      }
  
      return words.trim();
  }
 


    // Input validation
  cashInputs.forEach(input => {
    input.addEventListener('input', () => {
      const value = parseInt(input.value, 10);
      if (isNaN(value) || value < 0) {
        input.value = '';
      }
    });
  });
});
    
  
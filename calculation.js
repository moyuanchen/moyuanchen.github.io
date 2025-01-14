// Black-Scholes Formula
function blackScholes(S, K, T, r, sigma) {
    const d1 = (Math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);
  
    const callPrice = S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
    const putPrice = K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);
  
    return { callPrice, putPrice };
  }
  
  // Approximation for CDF of the standard normal distribution
  function normalCDF(x) {
    return (1.0 + Math.erf(x / Math.sqrt(2.0))) / 2.0;
  }
  
  // Calculate and display results
  function calculate() {
    const S = parseFloat(document.getElementById('stock-price').value);
    const K = parseFloat(document.getElementById('strike-price').value);
    const T = parseFloat(document.getElementById('time-to-expiry').value);
    const r = parseFloat(document.getElementById('risk-free-rate').value);
    const sigma = parseFloat(document.getElementById('volatility').value);
  
    const { callPrice, putPrice } = blackScholes(S, K, T, r, sigma);
  
    document.getElementById('call-price').innerText = `Call Price: ${callPrice.toFixed(2)}`;
    document.getElementById('put-price').innerText = `Put Price: ${putPrice.toFixed(2)}`;
  }
  
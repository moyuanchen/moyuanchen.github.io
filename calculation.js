// Black-Scholes Formula
// const callPrice = calculateCallPrice(stockPrice, strikePrice, time, rate, volatility);
// const putPrice = calculatePutPrice(stockPrice, strikePrice, time, rate, volatility);
// const delta = calculateDelta(stockPrice, strikePrice, time, rate, volatility);
// const gamma = calculateGamma(stockPrice, strikePrice, time, rate, volatility);
// const theta = calculateTheta(stockPrice, strikePrice, time, rate, volatility);
// const vega = calculateVega(stockPrice, strikePrice, time, rate, volatility);
// const rho = calculateRho(stockPrice, strikePrice, time, rate, volatility);

function calculateCallPrice(S, K, T, r, sigma) {
    const d1 = (Math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);
    const callPrice = S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
    return callPrice;
}

function calculatePutPrice(S, K, T, r, sigma) {
    const d1 = (Math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);
    const putPrice = K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);
    return putPrice;
}

function calculateDelta(S, K, T, r, sigma) {
    const d1 = (Math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * Math.sqrt(T));
    const delta = normalCDF(d1);
    return delta;
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
  
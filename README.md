<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Option Pricing Visualizer</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    header {
      background-color: #0078D7;
      color: white;
      padding: 20px 10px;
      text-align: center;
    }
    h1 {
      margin: 0;
      font-size: 2.5em;
    }
    main {
      max-width: 800px;
      margin: 20px auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    section {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input[type="range"] {
      width: 100%;
    }
    .output {
      font-size: 1.2em;
      color: #0078D7;
      font-weight: bold;
    }
    .chart {
      margin-top: 20px;
    }
    footer {
      text-align: center;
      padding: 10px;
      font-size: 0.9em;
      color: #666;
    }
  </style>
</head>
<body>

<header>
  <h1>Option Pricing Visualizer</h1>
  <p>Interactive Black-Scholes model with dynamic sliders and Greeks visualization</p>
</header>

<main>
  <!-- Input Sliders -->
  <section id="inputs">
    <h2>Adjust Parameters</h2>
    <label for="stock-price">Stock Price (S): <span id="stock-price-value" class="output">100</span></label>
    <input type="range" id="stock-price" min="50" max="150" value="100" step="1" oninput="updateValues()">

    <label for="strike-price">Strike Price (K): <span id="strike-price-value" class="output">100</span></label>
    <input type="range" id="strike-price" min="50" max="150" value="100" step="1" oninput="updateValues()">

    <label for="time">Time to Expiration (T, years): <span id="time-value" class="output">1</span></label>
    <input type="range" id="time" min="0.1" max="2" value="1" step="0.1" oninput="updateValues()">

    <label for="rate">Risk-Free Rate (r, %): <span id="rate-value" class="output">5</span></label>
    <input type="range" id="rate" min="0" max="10" value="5" step="0.1" oninput="updateValues()">

    <label for="volatility">Volatility (σ, %): <span id="volatility-value" class="output">20</span></label>
    <input type="range" id="volatility" min="10" max="100" value="20" step="1" oninput="updateValues()">
  </section>

  <!-- Outputs -->
  <section id="outputs">
    <h2>Results</h2>
    <p>Call Price: <span id="call-price" class="output">-</span></p>
    <p>Put Price: <span id="put-price" class="output">-</span></p>
    <p>Delta: <span id="delta" class="output">-</span></p>
    <p>Gamma: <span id="gamma" class="output">-</span></p>
    <p>Theta: <span id="theta" class="output">-</span></p>
    <p>Vega: <span id="vega" class="output">-</span></p>
    <p>Rho: <span id="rho" class="output">-</span></p>
  </section>

  <!-- Chart -->
  <section class="chart">
    <h2>Visualizations</h2>
    <p>Charts will be dynamically generated here (e.g., option price vs. stock price).</p>
    <div id="chart-placeholder" style="height: 300px; background-color: #eef2f3; border-radius: 8px; text-align: center; line-height: 300px;">
      Chart Area
    </div>
  </section>
</main>

<footer>
  &copy; 2025 Option Pricing Visualizer | Powered by Black-Scholes
</footer>

<script>
  function updateValues() {
    const stockPrice = document.getElementById('stock-price').value;
    const strikePrice = document.getElementById('strike-price').value;
    const time = document.getElementById('time').value;
    const rate = document.getElementById('rate').value;
    const volatility = document.getElementById('volatility').value;

    // Update displayed values
    document.getElementById('stock-price-value').innerText = stockPrice;
    document.getElementById('strike-price-value').innerText = strikePrice;
    document.getElementById('time-value').innerText = time;
    document.getElementById('rate-value').innerText = rate;
    document.getElementById('volatility-value').innerText = volatility;

    // Placeholder: Calculate Black-Scholes outputs and update results
    document.getElementById('call-price').innerText = 'TBD';
    document.getElementById('put-price').innerText = 'TBD';
    document.getElementById('delta').innerText = 'TBD';
    document.getElementById('gamma').innerText = 'TBD';
    document.getElementById('theta').innerText = 'TBD';
    document.getElementById('vega').innerText = 'TBD';
    document.getElementById('rho').innerText = 'TBD';
  }
</script>

</body>
</html>

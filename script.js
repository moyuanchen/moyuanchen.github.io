// Error Function (erf)
        function erf(x) {
            var sign = (x >= 0) ? 1 : -1;
            x = Math.abs(x);
            var a = 0.254829592;
            var b = 0.284496736;
            var c = 1.421413741;
            var d = 1.453152027;
            var p = 0.3275911;

            var t = 1.0 / (1.0 + p * x);
            var y = 1.0 - (((((a * t + b) * t + c) * t + d) * t) * Math.exp(-x * x));

            return sign * y;
        }

        function calculateBlackScholes(S, K, T, r, σ) {
            const d1 = (Math.log(S / K) + (r + (σ * σ) / 2) * T) / (σ * Math.sqrt(T));
            const d2 = d1 - σ * Math.sqrt(T);

            const callPrice = S * erf(d1) - K * Math.exp(-r * T) * erf(d2);
            const putPrice = K * Math.exp(-r * T) * erf(-d2) - S * erf(-d1);

            const delta = erf(d1);
            const gamma = erf(d1) / (S * σ * Math.sqrt(T));
            const theta = -((S * erf(d1) * σ) / (2 * Math.sqrt(T))) - r * K * Math.exp(-r * T) * erf(d2);
            const vega = S * Math.sqrt(T) * erf(d1);
            const rho = K * T * Math.exp(-r * T) * erf(d2);

            return { callPrice, putPrice, delta, gamma, theta, vega, rho };
        }

        function updateValues() {
            const S = parseFloat(document.getElementById('stock-price').value);
            const K = parseFloat(document.getElementById('strike-price').value);
            const T = parseFloat(document.getElementById('time').value);
            const r = parseFloat(document.getElementById('rate').value) / 100;
            const σ = parseFloat(document.getElementById('volatility').value) / 100;

            // Update slider display values
            document.getElementById('stock-price-value').innerText = S;
            document.getElementById('strike-price-value').innerText = K;
            document.getElementById('time-value').innerText = T;
            document.getElementById('rate-value').innerText = r * 100;
            document.getElementById('volatility-value').innerText = σ * 100;

            // Calculate the Black-Scholes option prices and Greeks
            const results = calculateBlackScholes(S, K, T, r, σ);

            // Display the results
            document.getElementById('call-price').innerText = results.callPrice.toFixed(2);
            document.getElementById('put-price').innerText = results.putPrice.toFixed(2);
            document.getElementById('delta').innerText = results.delta.toFixed(2);
            document.getElementById('gamma').innerText = results.gamma.toFixed(2);
            document.getElementById('theta').innerText = results.theta.toFixed(2);
            document.getElementById('vega').innerText = results.vega.toFixed(2);
            document.getElementById('rho').innerText = results.rho.toFixed(2);

            // Update chart
            updateChart(S, results.callPrice, results.putPrice);
        }

        let chart = null;

        function updateChart(S, callPrice, putPrice) {
            const ctx = document.getElementById('optionPriceChart').getContext('2d');

            if (chart) {
                chart.destroy(); // Destroy the previous chart if it exists
            }

            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [S - 20, S, S + 20],
                    datasets: [{
                        label: 'Call Price',
                        data: [callPrice - 10, callPrice, callPrice + 10],
                        borderColor: '#1abc9c',
                        fill: false
                    }, {
                        label: 'Put Price',
                        data: [putPrice - 10, putPrice, putPrice + 10],
                        borderColor: '#e74c3c',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: { display: true, text: 'Stock Price (S)' }
                        },
                        y: {
                            title: { display: true, text: 'Option Price' }
                        }
                    }
                }
            });
        }

        // Initial call to set up the page
        updateValues();

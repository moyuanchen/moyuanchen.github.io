import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BlackScholesCalculator = () => {
  // State for input parameters
  const [spot, setSpot] = useState(100);
  const [strike, setStrike] = useState(100);
  const [rate, setRate] = useState(0.05);
  const [volatility, setVolatility] = useState(0.2);
  const [daysToExpiry, setDaysToExpiry] = useState(365);

  // Convert days to years for calculations
  const timeToExpiry = daysToExpiry / 365;

  // Black-Scholes calculation functions
  const normalCDF = (x) => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    return x >= 0 ? 1 - p : p;
  };

  const blackScholes = useCallback((S, K, r, sigma, T) => {
    const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);
    
    const call = S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
    const delta = normalCDF(d1);
    const gamma = Math.exp(-d1 * d1 / 2) / (S * sigma * Math.sqrt(T) * Math.sqrt(2 * Math.PI));
    const theta = -(S * sigma * Math.exp(-d1 * d1 / 2)) / (2 * Math.sqrt(T) * Math.sqrt(2 * Math.PI)) 
                 - r * K * Math.exp(-r * T) * normalCDF(d2);
    const vega = S * Math.sqrt(T) * Math.exp(-d1 * d1 / 2) / Math.sqrt(2 * Math.PI);
    const rho = K * T * Math.exp(-r * T) * normalCDF(d2);

    return { price: call, delta, gamma, theta, vega, rho };
  }, []);

  // Generate data for charts
  const generateChartData = useCallback(() => {
    const priceRange = Array.from({ length: 21 }, (_, i) => spot * (0.5 + i * 0.05));
    return priceRange.map(S => ({
      spotPrice: S,
      ...blackScholes(S, strike, rate, volatility, timeToExpiry)
    }));
  }, [spot, strike, rate, volatility, timeToExpiry, blackScholes]);

  const chartData = generateChartData();

  const ChartCard = ({ title, dataKey, stroke }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="spotPrice"
                tickFormatter={(value) => value.toFixed(2)}
              />
              <YAxis 
                tickFormatter={(value) => value.toFixed(2)}
              />
              <Tooltip 
                formatter={(value) => value.toFixed(2)}
                labelFormatter={(label) => `Spot Price: ${parseFloat(label).toFixed(2)}`}
              />
              <Legend />
              <Line type="monotone" dataKey={dataKey} stroke={stroke} name={title} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Black-Scholes Option Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Spot Price: {spot}</label>
              <Slider 
                value={[spot]}
                min={50}
                max={150}
                step={1}
                onValueChange={(value) => setSpot(value[0])}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Strike Price: {strike}</label>
              <Slider 
                value={[strike]}
                min={50}
                max={150}
                step={1}
                onValueChange={(value) => setStrike(value[0])}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Risk-free Rate: {(rate * 100).toFixed(1)}%</label>
              <Slider 
                value={[rate * 100]}
                min={0}
                max={10}
                step={0.1}
                onValueChange={(value) => setRate(value[0] / 100)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Volatility: {(volatility * 100).toFixed(1)}%</label>
              <Slider 
                value={[volatility * 100]}
                min={10}
                max={100}
                step={1}
                onValueChange={(value) => setVolatility(value[0] / 100)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Days to Expiry: {daysToExpiry}</label>
              <Slider 
                value={[daysToExpiry]}
                min={1}
                max={730}
                step={1}
                onValueChange={(value) => setDaysToExpiry(value[0])}
              />
            </div>
          </div>

          {/* Current Values Display */}
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Option Price</p>
                  <p className="text-2xl font-bold">${blackScholes(spot, strike, rate, volatility, timeToExpiry).price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Delta</p>
                  <p className="text-2xl font-bold">{blackScholes(spot, strike, rate, volatility, timeToExpiry).delta.toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Gamma</p>
                  <p className="text-2xl font-bold">{blackScholes(spot, strike, rate, volatility, timeToExpiry).gamma.toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Theta</p>
                  <p className="text-2xl font-bold">{blackScholes(spot, strike, rate, volatility, timeToExpiry).theta.toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Vega</p>
                  <p className="text-2xl font-bold">{blackScholes(spot, strike, rate, volatility, timeToExpiry).vega.toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Rho</p>
                  <p className="text-2xl font-bold">{blackScholes(spot, strike, rate, volatility, timeToExpiry).rho.toFixed(3)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="space-y-6">
            <ChartCard title="Option Price" dataKey="price" stroke="#8884d8" />
            <ChartCard title="Delta" dataKey="delta" stroke="#82ca9d" />
            <ChartCard title="Gamma" dataKey="gamma" stroke="#ffc658" />
            <ChartCard title="Theta" dataKey="theta" stroke="#ff7300" />
            <ChartCard title="Vega" dataKey="vega" stroke="#8884d8" />
            <ChartCard title="Rho" dataKey="rho" stroke="#82ca9d" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlackScholesCalculator;
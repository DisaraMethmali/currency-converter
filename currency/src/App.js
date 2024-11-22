import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyInput from './CurrencyInput';
import Result from './Result';
import DarkModeToggle from './DarkModeToggle';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const CURRENCY_LIST = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY', 'CHF', 'CNY', 'MXN', 'BRL', 'NZD'];
  const API_URL = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;

  useEffect(() => {
    fetchRates();
  }, [baseCurrency]);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setRates(response.data.rates);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exchange rates", error);
      setLoading(false);
      alert("Failed to fetch exchange rates. Please try again later.");
    }
  };

  const handleConvert = () => {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }
    const rate = rates[targetCurrency];
    if (rate) {
      setConvertedAmount((amount * rate).toFixed(2));
    } else {
      alert("Conversion error: Invalid target currency");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <h1>Currency Converter</h1>
      
      <DarkModeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      <CurrencyInput
        amount={amount}
        setAmount={setAmount}
        baseCurrency={baseCurrency}
        setBaseCurrency={setBaseCurrency}
        targetCurrency={targetCurrency}
        setTargetCurrency={setTargetCurrency}
        CURRENCY_LIST={CURRENCY_LIST}
        loading={loading}
        handleConvert={handleConvert}
      />
      
      <Result amount={amount} baseCurrency={baseCurrency} convertedAmount={convertedAmount} targetCurrency={targetCurrency} />
    </div>
  );
}

export default App;

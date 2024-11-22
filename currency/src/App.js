import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CssBaseline, ThemeProvider, createTheme, Container, Box, TextField, Button, Grid, Typography, CircularProgress } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import CurrencyInput from './CurrencyInput';
import Result from './Result';
import DarkModeToggle from './DarkModeToggle';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrencies, setTargetCurrencies] = useState(['EUR', 'GBP', 'INR']);
  const [convertedAmounts, setConvertedAmounts] = useState({});
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);

  const CURRENCY_LIST = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY', 'CHF', 'CNY', 'MXN', 'BRL', 'NZD'];
  const API_URL = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  useEffect(() => {
    fetchRates();
  }, [baseCurrency]);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setRates(response.data.rates);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch exchange rates. Please try again later.');
      setLoading(false);
    }
  };

  const handleConvert = () => {
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }

    const newConvertedAmounts = {};
    targetCurrencies.forEach(currency => {
      const rate = rates[currency];
      if (rate) {
        newConvertedAmounts[currency] = (amount * rate).toFixed(2);
      } else {
        setError('Conversion error: Invalid target currency');
      }
    });

    setConvertedAmounts(newConvertedAmounts);
    setError(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <Container>
          <Box textAlign="center" marginBottom="2rem">
            <h1>Currency Converter</h1>
          </Box>

          <DarkModeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

          {error && (
            <Typography variant="body1" color="error" textAlign="center" marginBottom="1rem">
              {error}
            </Typography>
          )}

          <CurrencyInput
            amount={amount}
            setAmount={setAmount}
            baseCurrency={baseCurrency}
            setBaseCurrency={setBaseCurrency}
            targetCurrencies={targetCurrencies}
            setTargetCurrencies={setTargetCurrencies}
            CURRENCY_LIST={CURRENCY_LIST}
            loading={loading}
            handleConvert={handleConvert}
          />

          {loading && <CircularProgress color="primary" />}

          {!loading && Object.keys(convertedAmounts).length > 0 && (
            <Grid container spacing={2}>
              {targetCurrencies.map(currency => (
                <Grid item xs={12} sm={6} md={4} key={currency}>
                  <Result
                    amount={amount}
                    baseCurrency={baseCurrency}
                    convertedAmount={convertedAmounts[currency]}
                    targetCurrency={currency}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

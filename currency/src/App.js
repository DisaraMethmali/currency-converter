import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container,
  Box,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import DarkModeToggle from './DarkModeToggle';
import CurrencyInput from './CurrencyInput';
import Result from './Result';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('EUR'); // Default to EUR for free API usage
  const [targetCurrencies, setTargetCurrencies] = useState(['USD', 'GBP', 'INR']);
  const [convertedAmounts, setConvertedAmounts] = useState({});
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '04eac8884a8e877fb2791768eb186882'; //  your actual API key
  const CURRENCY_LIST = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY', 'CHF', 'CNY', 'MXN', 'BRL', 'NZD'];


  //theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      //api
      const response = await axios.get('http://api.exchangeratesapi.io/v1/latest', {
        params: {
          access_key: API_KEY,
          symbols: targetCurrencies.join(','), // Ensure target currencies are specified
        },
      });
      setRates(response.data.rates);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching rates:', err);
      setError('Failed to fetch exchange rates. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [baseCurrency, targetCurrencies]);

  const handleConvert = () => {
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }

    const newConvertedAmounts = {};
    targetCurrencies.forEach((currency) => {
      const rate = rates[currency];
      if (rate) {
        newConvertedAmounts[currency] = (amount * rate).toFixed(2);
      } else {
        setError(`Conversion error: No rate available for ${currency}`);
      }
    });

    setConvertedAmounts(newConvertedAmounts);
    setError(null);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <Container>
          <Box textAlign="center" marginBottom="2rem">
            <Typography variant="h4">Currency Converter</Typography>
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
              {targetCurrencies.map((currency) => (
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

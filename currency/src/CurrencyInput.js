import React from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';

const CurrencyInput = ({
  amount,
  setAmount,
  baseCurrency,
  setBaseCurrency,
  targetCurrencies,
  setTargetCurrencies,
  CURRENCY_LIST,
  loading,
  handleConvert,
}) => {

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrencies(event.target.value);
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Base Currency</InputLabel>
        <Select
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          label="Base Currency"
        >
          {CURRENCY_LIST.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Amount"
        variant="outlined"
        fullWidth
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Target Currencies</InputLabel>
        <Select
          multiple
          value={targetCurrencies}
          onChange={handleTargetCurrencyChange}
          label="Target Currencies"
          renderValue={(selected) => selected.join(', ')}
        >
          {CURRENCY_LIST.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleConvert}
        disabled={loading || !amount}
      >
        Convert
      </Button>
    </div>
  );
};

export default CurrencyInput;

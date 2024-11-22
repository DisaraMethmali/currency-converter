import React from 'react';

function CurrencyInput({
  amount,
  setAmount,
  baseCurrency,
  setBaseCurrency,
  targetCurrency,
  setTargetCurrency,
  CURRENCY_LIST,
  loading,
  handleConvert
}) {
  return (
    <div className="form">
      <div className="input-group">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="currency-selector">
        <select onChange={(e) => setBaseCurrency(e.target.value)} value={baseCurrency}>
          {CURRENCY_LIST.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <select onChange={(e) => setTargetCurrency(e.target.value)} value={targetCurrency}>
          {CURRENCY_LIST.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleConvert} disabled={loading}>
        {loading ? "Loading..." : "Convert"}
      </button>
    </div>
  );
}

export default CurrencyInput;

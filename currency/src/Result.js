import React from 'react';
import { useSpring, animated } from 'react-spring';

function Result({ amount, baseCurrency, convertedAmount, targetCurrency }) {
  const fadeIn = useSpring({ opacity: convertedAmount ? 1 : 0, from: { opacity: 0 }, config: { duration: 500 } });

  return (
    convertedAmount && (
      <animated.div style={fadeIn} className="result">
        <h2>
          {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
        </h2>
      </animated.div>
    )
  );
}

export default Result;

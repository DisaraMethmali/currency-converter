import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Result = ({ amount, baseCurrency, convertedAmount, targetCurrency }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{`${amount} ${baseCurrency} = ${convertedAmount} ${targetCurrency}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default Result;

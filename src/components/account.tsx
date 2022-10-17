import Box from '@mui/material/Box';
import Web3 from 'web3';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import PaidIcon from '@mui/icons-material/Paid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Web3StoreState } from '../features';
import { Web3Context } from './web3Provider';
import { useContext, useState } from 'react';

const receiverAddress = '0xb261fE1dE9C74985d8e68d567a47390a28ba6cFa';
export const Account = () => {
  const { account } = useParams();
  const currentAccount = useSelector((state: Web3StoreState) => {
    return state.web3.currentAccount;
  });
  const web3 = useContext(Web3Context);
  const [receipt, setReceipt] = useState<any>();
  return (
    <Box
      sx={{
        width: 600,
        height: 300,
        backgroundColor: 'primary',
        '&:hover': {
          backgroundColor: 'primary.secondary',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Container maxWidth="lg" sx={{ marginBottom: 5 }}>
        <Container maxWidth="sm">
          <AccountCircleIcon sx={{ marginRight: '1rem' }} />
          <FormLabel color="primary">Account Address: </FormLabel>
          <FormLabel color="secondary">{account}</FormLabel>
        </Container>

        <Container maxWidth="sm">
          <PaidIcon sx={{ marginRight: '1rem' }} />
          <FormLabel color="primary">Balance: </FormLabel>
          <FormLabel color="secondary">{currentAccount.balance}</FormLabel>
        </Container>

        <Container maxWidth="sm">
          <PaidIcon sx={{ marginRight: '1rem' }} />
          <FormLabel color="primary">Transaction count: </FormLabel>
          <FormLabel color="secondary">{currentAccount.transactionCount}</FormLabel>
        </Container>
      </Container>
      <Container maxWidth="lg">
        <Button
          onClick={async () => {
            const result = await web3?.eth.sendTransaction({
              from: account,
              to: receiverAddress,
              value: Web3.utils.toWei('1', 'ether'),
              gas: 30000,
              gasPrice: 1,
            });
            console.log('receipt', result);
            setReceipt(result);
          }}
        >
          Send to
        </Button>
        <TextField id="outlined-basic" sx={{ width: '80%' }} label="Outlined" variant="outlined" value={receiverAddress} />
        {<div>{JSON.stringify(receipt, null, 2)}</div>}
      </Container>
    </Box>
  );
};

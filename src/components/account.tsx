import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import PaidIcon from '@mui/icons-material/Paid';
import { Web3StoreState } from '../features';

export const Account = () => {
  const { account } = useParams();
  const currentAccount = useSelector((state: Web3StoreState) => {
    return state.web3.currentAccount;
  });
  return (
    <Box
      sx={{
        width: 600,
        height: 300,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Container maxWidth="sm">
        <AccountCircleIcon sx={{ marginRight: '1rem' }} />
        <FormLabel color="primary">Account Address: </FormLabel>
        <FormLabel color="secondary">{account}</FormLabel>
      </Container>

      <Container maxWidth="sm">
        <PaidIcon sx={{ marginRight: '1rem' }}/>
        <FormLabel color="primary">Balance: </FormLabel>
        <FormLabel color="secondary">{currentAccount.balance}</FormLabel>
      </Container>


      <Container maxWidth="sm">
        <PaidIcon sx={{ marginRight: '1rem' }}/>
        <FormLabel color="primary">Transaction count: </FormLabel>
        <FormLabel color="secondary">{currentAccount.transactionCount}</FormLabel>
      </Container>
    </Box>
  );
};

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { AbiItem } from 'web3-utils';
import { useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';

import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useContext, useState } from 'react';
import { Web3Context } from './web3Provider';
import { Web3StoreState } from '../features';

export const DeployContract = () => {
  const [contractJson, setContractJson] = useState('');
  const web3 = useContext(Web3Context);
  const currentAccount = useSelector((state: Web3StoreState) => {
    return state.web3.currentAccount;
  });
  const deployContract = () => {
    if (contractJson) {
      const contract = new web3!.eth.Contract(JSON.parse(contractJson) as AbiItem[], currentAccount.account);
      console.log('contract:', contract);
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }} color="primary">
      <FormLabel>Contract ABI to account: {currentAccount.account}</FormLabel>
      <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Empty"
        maxRows={20}
        style={{ width: '100%' }}
        onChange={(e) => setContractJson(e.target.value)}
        value={contractJson}
      />
      <Button onClick={deployContract}>Deploy</Button>
    </Box>
  );
};

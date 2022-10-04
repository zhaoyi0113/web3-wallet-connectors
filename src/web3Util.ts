import Web3 from 'web3';

export const web3 = (window as any).ethereum ? new Web3((window as any).ethereum) : null;


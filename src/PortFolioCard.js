import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";

//must be last import
//const axios = require("axios");
import TradingViewWidget from 'react-tradingview-widget';

export const PortFolioCard = () => {
  
  //application data
  const { isAuthenticated, logout, Moralis, user, ethAddress, authenticate, authError, isAuthenticating } = useMoralis();

  const handleCustomLogin = async () => {
    await authenticate({
      provider: "web3Auth",
      clientId: "BN-6dNNgKK_DJmhff63kvmqoyfUMVTEYdjRbp_pIZCvdPmj69n94pHl4rVCymrqmuUQAnB91e-5Go2TA2LzSdyM",
      chainId: Moralis.Chains.BNB,
      theme: 'dark',
      appLogo: "",
      logingMethodsOrder : ["google", "facebook", "twitter"]//, "reddit", "discord", "twitch", "apple", "github", "linkedin", "email_passwordless"]
    });
  };

  const [balance, setBalance] = useState(0);
  const [viewKey, setviewKey] = useState(0);
  //order info
  const [orderType,setOrderType] = useState("market");
  const [swapCoin, setSwapCoin] = useState("BTC");
  const [swapCoinOut, setSwapCoinOut] = useState("BTC");
  const [orderExchange,setOrderExchange] = useState("PancakeSwap");
  const [limitPrice,setLimitPrice] = useState("1");
  
  const fetchBalance = async () => {
    try {
      //tag 
      //console.log(user.attributes.authData.moralisEth.signature)
      const options = { chain: Moralis.Chains.BNB };
      const balance = await Moralis.Web3API.account.getNativeBalance(options);
      setBalance(balance.balance / 10 ** 18);
    } catch {}
  };
  
  useEffect(() => {
    fetchBalance();
    //console.log("swap card is authenticated ->", isAuthenticated);
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
  }, []);

  return ( 
    <div className={signOutStyle.signOutCard}>
    <div>
    <div className={signOutStyle.swapCardMini}>
      <h4 className={signOutStyle.hAlert}> Swap </h4>
      <select  className={signOutStyle.sSwap} onChange ={ (event) => { setOrderExchange(event.target.value) }}>
            <option value="PancakeSwap">PancakeSwap</option>
      </select>
      <p className={signOutStyle.pAlert}>  Coin In : {swapCoin }</p> 
      <input
          className= {signOutStyle.iSwap} //"form-control form-control-lg"
          type="text"
          placeholder={"BTC"}
          onChange={e => setSwapCoin(e.target.value.toUpperCase())} 
          required />
      <p className={signOutStyle.pAlert}>  Coin Out : {swapCoinOut}</p>   
      <input
          className= {signOutStyle.iSwap}//"form-control form-control-lg"
          type="text"
          placeholder={"BUSD"}
          onChange={e => setSwapCoinOut(e.target.value.toUpperCase())} 
          required />
      <p className={signOutStyle.pAlert}> Order Type : {orderType} </p>
      <select  className={signOutStyle.sSwap} onChange ={ (event) => { setOrderType(event.target.value) }}>
            <option value="market">market</option>
            <option value="limit">limit</option>
      </select>
      {orderType == "market" ? 
      <p className={signOutStyle.pAlert}> Place Order</p> 
      :
      <input
          className= {signOutStyle.iSwap}//"form-control form-control-lg"
          type="text"
          placeholder={"BTC"}
          onChange={e => setLimitPrice(e.target.value.toUpperCase())} 
          required />
      }
          <button className={styles.swapButton} onClick={console.log("swap in dev")}>
          Swap
          </button>
          {isAuthenticated ?
          <button className={styles.signoutButton} onClick={logout}>
          Logout
          </button>
          :          
          <button className={styles.signinButton} onClick={handleCustomLogin}>
             Login
          </button>

          } 
    </div>
    <div className={signOutStyle.chart}>
      <TradingViewWidget
        symbol={"BINANCE:"+swapCoin+"BUSD"}
        locale="fr"
        width = "500"
        height ="300"
      />
    </div>
    </div>
</div>

  );
};

  /*
    <div>
      <div>
        <div className={signOutStyle.signOutCard}>
        <div>
        <div className={signOutStyle.swapCardMini}>
          <h4 className={signOutStyle.hAlert}> Swap </h4>
          <select  className={signOutStyle.sSwap} onChange ={ (event) => { setOrderExchange(event.target.value) }}>
                <option value="PancakeSwap">PancakeSwap</option>
          </select>
          <p className={signOutStyle.pAlert}>  Coin In : {swapCoin}</p> 
          <input
              className= {signOutStyle.iSwap} //"form-control form-control-lg"
              type="text"
              placeholder={"BTC"}
              onChange={e => setSwapCoin(e.target.value.toUpperCase())} 
              required />
          <p className={signOutStyle.pAlert}>  Coin Out : {swapCoinOut}</p>   
          <input
              className= {signOutStyle.iSwap}//"form-control form-control-lg"
              type="text"
              placeholder={"BUSD"}
              onChange={e => setSwapCoinOut(e.target.value.toUpperCase())} 
              required />
          <p className={signOutStyle.pAlert}> Order Type : {orderType} </p>
          <select  className={signOutStyle.sSwap} onChange ={ (event) => { setOrderType(event.target.value) }}>
                <option value="market">market</option>
                <option value="limit">limit</option>
          </select>
          {orderType == "market" ? 
          <p className={signOutStyle.pAlert}> Place Order</p> 
          :
          <input
              className= {signOutStyle.iSwap}//"form-control form-control-lg"
              type="text"
              placeholder={"$1.00"}
              onChange={e => setLimitPrice(e.target.value.toUpperCase())} 
              required />
          }
              <button className={styles.swapButton} onClick={logout}>
              Set Alert
              </button>
        </div>
        <div className={signOutStyle.chart}>
          <TradingViewWidget
            symbol={"BINANCE:"+swapCoin+"BUSD"}
            locale="fr"
            width = "500"
            height ="175"
          />
          <TradingViewWidget
            symbol={"BINANCE:"+swapCoinOut+"BUSD"}
            locale="fr"
            width = "500"
            height ="175"
          />
        </div>
        </div>
    </div>
    </div>
    <div>
    </div>
    <div>
    </div>
    </div>
  );
};
*/
/*

        <p className={signOutStyle.subHeader}>Details:</p>
          <div className={signOutStyle.detailsDiv}>
          <div>
            <h5>Account: </h5>
            <p>{user.attributes.accounts}</p>
          </div>
          <div className={signOutStyle.pTextHidden} >
            <h5>Private Key:</h5>
              <p className={signOutStyle.pTextHidden}> {user.attributes.authData.moralisEth.signature}</p>
          </div>
          <div>
            <h5>Balance (Eth)</h5>
            <p>{balance} </p>
          </div>
        </div>

        <div className={signOutStyle.fotter}>
          <button className={styles.loginButton} onClick={handleTransfer}>
            Test Transfer
          </button>
          <button className={styles.loginButton} onClick={logout}>
            Sign Out
          </button>
          <button className={`${signOutStyle.refresh}`} onClick={fetchBalance}>
            Refresh
          </button>
        </div>
        
        */

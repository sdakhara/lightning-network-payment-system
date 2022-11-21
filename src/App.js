import LNPay from 'lnpay'
import { useState } from 'react';
import QRCode from "react-qr-code";

function App() {
  const [invoice, setInvoice] = useState(null)
  const createInvoice = async () => {
    const lnpay = LNPay({
      secretKey: 'sak_xxxx', //API SECRET KEY
      walletAccessKey: 'wal_xxxx', //Wallet ID
    });
    console.log(lnpay)
    const _invoice = await lnpay.generateInvoice({
      num_satoshis: 10000,
      passTru: {
        order_id: '100',
      },
      description_hash: 'MTIzNDY1Nzg5N...',
      memo: 'Invoice memo.',
      expiry: 86400, // 1 day
    });
    // const invoice = await lnpay.getBalance();
    console.log(_invoice)
    setInvoice(_invoice)
  };
  return (
    <div className="App">
      <button onClick={createInvoice}>Create Invoice</button>
      {invoice?<QRCode value={invoice.payment_request} />:null}
      {invoice?<div>
        {"Invoice ID: "+invoice.id}<br/>
        {"Created at: "+new Date(invoice.created_at*1000).toLocaleString()}<br/>
        {"Memo Details: "+invoice.memo}<br/>
        {"Ammount(in satoshi): "+invoice.num_satoshis}<br/>
        {"Expire at: "+new Date(invoice.expires_at*1000).toLocaleString()}<br/>
        {"Recepient Wallet ID: "+invoice.passThru.wallet_id}<br/>
        {"Invoice: "+invoice.payment_request}<br/>
      </div>:null}
      
    </div>
  );
}

export default App;

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import logo from '../../Assests/images/growth.gif'
import { Link, useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);


export default function Transaction() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
      fetchData();
  }, [id]);

  async function fetchData() {
    setLoading(true);
    let { data } = await axios.get('/data.json');
    const transactions = data.transactions.filter(transaction => transaction.customer_id === parseInt(id));
        setLoading(false);
        setCustomer(data.customers[id-1]);
        setTransactions(transactions);
}

  const transactionBar = {
    labels: transactions.map(transaction => transaction.date),
    datasets: [
      {
        label: 'Total Transaction Amount',
        data: transactions.map(transaction => transaction.amount),
        backgroundColor: 'rgba(103, 204, 209,0.4)',
        borderColor: 'rgb(103, 204, 209)',
        borderWidth: 1,
      },
    ],
  }
  const transactionLine = {
    labels: transactions.map(transaction => transaction.date),
    datasets: [
      {
        label: 'Total Transaction Amount',
        data: transactions.map(transaction => transaction.amount),
        fill: false,
        backgroundColor: 'rgba(103, 204, 209,0.4)',
        borderColor: 'rgb(103, 204, 209)',
        borderWidth: 1,
      },
    ],
  };


  return <>
    {loading ? <>
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
        <BeatLoader color="#67CCD1"/>
    </div>
</> : <div className="h-100 roboto container">
  <div className='d-flex justify-content-start align-items-center'>
    <div>
        <img src={logo} width={'60px'} alt='logo'/>
    </div>
    <div className='fs-4 text-center fw-bold gradient'>Customers <br /> Transactions</div>
    </div>
    <div className="my-3 pt-2">
    <div className="overflow-hidden rounded-4 border border-1">
        <table className='w-100'>
    <thead className='tableHeader text-center'>
        <tr>
            <th className='p-3'>Customer ID</th>
            <th className='p-3'>Customer Name</th>
            <th className='p-3'>Transactions Date</th>
            <th className='p-3'>Transactions Amount</th>
        </tr>
    </thead>
    <tbody>
    <tr key={customer.id} className='text-center'>
        <td className='p-4 fw-bold'>{customer.id}</td>
        <td className='p-4'>
            <i className="fa-solid fa-user pe-2 cyan"></i> {customer.name}
        </td>
        <td className='p-4'>
            {transactions.map((transaction, index) => (
                <div key={index}>
                    {transaction.amount}<br />
                </div>
            ))}
        </td>
        <td className='p-4'>
            {transactions.map((transaction, index) => (
                <div key={index}>
                    <i className="fa-regular fa-calendar-days pe-2 cyan"></i>{transaction.date}<br />
                </div>
            ))}
        </td>
    </tr>
</tbody>
    </table>
    </div>
    </div>
      <div className='container py-2 d-flex justify-content-between align-items-center'>
      <Bar className='w-50' data={transactionBar} />
      <Line className='w-50' data={transactionLine} />
      </div>
  </div>
  }
  </>
}

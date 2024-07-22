import React, { useEffect, useState } from 'react'
import logo from '../../Assests/images/growth.gif'
import axios from 'axios'
import {BeatLoader} from 'react-spinners'
import { Link } from 'react-router-dom'

export default function Customers() {
    const [loading, setLoading] = useState(false)
    const [customers, setCustomers] = useState([])
    const [transactions, setTransactions] = useState([])
    const [nameFilter, setNameFilter] = useState('')
    const [amountFilter, setAmountFilter] = useState('')

    useEffect(()=>{
        getCustomers()
    },[])

    async function getCustomers(){
        setLoading(true)
        let {data}= await axios.get('/data.json')
        setCustomers(data.customers)
        setTransactions(data.transactions)
        setLoading(false)
    }


  return <>
  {loading ? <>
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
        <BeatLoader color="#67CCD1"/>
    </div>
</> : <div className="h-100 roboto container">
  <div>
    <div className='text-center'>
        <img src={logo} width={'100px'} alt='logo'/>
    </div>
    <div className='fs-1 text-center fw-bold gradient pb-2'>Customers Transactions</div>
    </div>
    <div className='d-flex justify-content-between align-items-center pt-4'>
        <input type="text" className='rounded-3 border border-light-subtle p-2 w-50 me-3' placeholder='Filter by customer name' value={nameFilter} onChange={e => setNameFilter(e.target.value)}/>
        <input type="text" className='rounded-3 border border-light-subtle p-2 w-50 ms-3' placeholder='Filter by transaction amount' value={amountFilter} onChange={e => setAmountFilter(e.target.value)} />
    </div>
    <div className="d-flex just"></div>
    <div className="my-3">
    <div className="overflow-hidden rounded-4 border border-1">
        <table className='w-100'>
    <thead className='tableHeader text-center'>
        <tr>
            <th className='p-3'>Customer ID</th>
            <th className='p-3'>Customer Name</th>
            <th className='p-3'>Transactions Date</th>
            <th className='p-3'>Transactions Amount</th>
            <th className='p-3'>More Details</th>
        </tr>
    </thead>
    <tbody>
    {customers
    .filter(customer => customer.name.toLowerCase().includes(nameFilter.toLowerCase()))
    .map(customer => {
        const filteredTransactions = transactions.filter(transaction => transaction.customer_id === customer.id)
            .filter(transaction => transaction.amount.toString().includes(amountFilter))

        return filteredTransactions.length > 0 ? <>
            <tr key={customer.id} className='text-center'>
                <td className='p-4 fw-bold'>{customer.id}</td>
                <td className='p-4'>
                    <i className="fa-solid fa-user pe-2 cyan"></i> {customer.name}
                </td>
                <td className='p-4'>
                    {filteredTransactions.map((transaction) => (
                    <div key={transaction.id}>
                        {transaction.amount}<br />
                    </div>
                    ))}
                </td>
                <td className='p-4'>
                    {filteredTransactions.map((transaction) => (
                        <div key={transaction.id}>
                            <i className="fa-regular fa-calendar-days pe-2 cyan"></i>{transaction.date}<br />
                        </div>
                    ))}
                </td>
                <td>
                    <Link className='btn btn-light rounded-3' to={`/transaction/${customer.id}`}>View</Link>
                </td>
            </tr>
            </> : ''
    })}

</tbody>
    </table>
    </div>
    </div>
  </div>
  }
  </>
}

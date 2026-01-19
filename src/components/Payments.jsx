import React from 'react';
import { CreditCard, DollarSign, Download } from 'lucide-react';
import './Payments.css';

const Payments = () => {
    return (
        <div className="section-padding container">
            <h1>Payment & Earnings</h1>

            <div className="balance-card">
                <div className="balance-info">
                    <p>Available for Payout</p>
                    <h2>₹4,500.00</h2>
                </div>
                <button className="btn-primary">Request Payout</button>
            </div>

            <div className="payment-history">
                <h3>Transaction History</h3>
                <div className="table-responsive">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Oct 24, 2025</td>
                                <td>Logo Project (Client: H. Stark)</td>
                                <td className="positive">+ ₹2,000</td>
                                <td><span className="status completed">Completed</span></td>
                                <td><Download size={16} /></td>
                            </tr>
                            <tr>
                                <td>Oct 20, 2025</td>
                                <td>Website Fix (Client: Acme Corp)</td>
                                <td className="positive">+ ₹2,500</td>
                                <td><span className="status completed">Completed</span></td>
                                <td><Download size={16} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Payments;

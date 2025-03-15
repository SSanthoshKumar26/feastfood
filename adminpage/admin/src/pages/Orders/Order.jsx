import React, { useState, useEffect } from 'react';
import './Order.css';

export const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        const data = await response.json();
        setOrders(data);  // Store orders with user details
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // Update local state with the new status
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert('Error updating status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update order status');
    }
  };

  return (
    <div className="order-container">
      <h1>Admin - Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user ? order.user.name : 'N/A'}</td>
                <td>{order.user ? order.user.email : 'N/A'}</td>
                <td>{order.amount}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Food Processed">Food Processed</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

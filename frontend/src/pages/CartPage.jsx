import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EditStockModal from "../components/EditStockModal";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5001/purchases");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleEditOrder = async (id, newQuantity) => {
    try {
      const res = await fetch(`http://localhost:5001/purchases/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (res.ok) {
        toast.success("Order updated!");
        await fetchOrders();
        setSelectedOrder(null);
      } else {
        toast.error("Failed to update order.");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Something went wrong.");
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/purchases/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Order cancelled!");
        await fetchOrders();
      } else {
        toast.error("Failed to cancel order.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Something went wrong.");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen">
        <Navbar />
        <p className="m-12">Loading orders...</p>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="min-h-screen">
        <Navbar />
        <p className="m-12">No orders yet.</p>
      </div>
    );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="m-12 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">My Orders</h2>
        <table className="table w-full bg-base-100 shadow-xl rounded-lg">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Pharmacy</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.pharmacy}</td>
                <td>{order.quantity}</td>
                <td>₱{order.price}</td>
                <td>₱{order.price * order.quantity}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <EditStockModal
          medicine={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onConfirm={handleEditOrder}
        />
      )}
    </div>
  );
};

export default OrdersPage;

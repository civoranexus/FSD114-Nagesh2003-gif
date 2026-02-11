import React from "react";
import "./paymentsuccess.css";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = ({ user }) => {
  const { id: paymentRef } = useParams();

  if (!user) return null;

  return (
    <section className="payment-success-page">
      <div className="success-message">
        <h2>Payment Completed 🎉</h2>

        <p>Your enrollment has been successfully activated.</p>

        <p>
          <strong>Reference ID:</strong> {paymentRef}
        </p>

        <Link
          to={`/${user._id}/dashboard`}
          className="common-btn"
        >
          Go to Dashboard
        </Link>
      </div>
    </section>
  );
};

export default PaymentSuccess;

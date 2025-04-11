import React, { useEffect, useState } from "react";
import axios from "axios";

const ConversationDetails = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("https://accenture-hackathon-14.onrender.com/api/conversations");
        setTickets(res.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Ticket Details</h1>

      {tickets.map((ticket, index) => (
        <div
          key={index}
          className="bg-white shadow-sm p-4 rounded-lg mb-4 border border-gray-200 hover:shadow-lg transition"
        >
          <h2 className="font-semibold text-lg text-indigo-700 mb-2">
            Ticket ID: {ticket["Ticket ID"]}
          </h2>

          <p className="text-gray-700 mb-1">
            <strong>Date of Resolution:</strong>{" "}
            <span className="text-gray-600">{ticket["Date of Resolution"]}</span>
          </p>

          <p className="text-gray-700 mb-1">
            <strong>Department:</strong>{" "}
            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-700">
              {ticket["department"] || ticket["Issue Category"]}
            </span>
          </p>

          <p className="text-gray-700 mb-1">
            <strong>Priority:</strong>{" "}
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                ticket["Priority"] === "High"
                  ? "bg-red-300 text-red-800"
                  : ticket["Priority"] === "Medium"
                  ? "bg-orange-300 text-orange-800"
                  : "bg-green-300 text-green-800"
              }`}
            >
              {ticket["Priority"]}
            </span>
          </p>

          <p className="text-gray-700 mb-1">
            <strong>Resolution Status:</strong>{" "}
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                ticket["Resolution Status"] === "Resolved"
                  ? "bg-green-200 text-green-700"
                  : "bg-yellow-200 text-yellow-700"
              }`}
            >
              {ticket["Resolution Status"]}
            </span>
          </p>

          <p className="text-gray-700 mb-1">
            <strong>Sentiment:</strong>{" "}
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                ticket["Sentiment"]?.toLowerCase() === "positive"
                  ? "bg-green-200 text-green-700"
                  : ticket["Sentiment"]?.toLowerCase() === "negative"
                  ? "bg-red-200 text-red-700"
                  : "bg-yellow-200 text-yellow-700"
              }`}
            >
              {ticket["Sentiment"]}
            </span>
          </p>

          <p className="text-gray-700 mb-1">
            <strong>Solution:</strong>{" "}
            <span className="text-gray-600">{ticket["Solution"]}</span>
          </p>

          <p className="text-gray-700 mb-1">
            <strong>Assigned Team:</strong>{" "}
            <span className="text-gray-600">{ticket["assigned_team"] || "N/A"}</span>
          </p>

          <p className="text-gray-700">
            <strong>Customer Timestamp:</strong>{" "}
            <span className="text-gray-600">{ticket["customer_timestamp"]}</span>
          </p>
        </div>
      ))}

      {tickets.length === 0 && (
        <div
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">No tickets found!</strong>
          <span className="block sm:inline">
            Check if the API is running and returning data.
          </span>
        </div>
      )}
    </div>
  );
};

export default ConversationDetails;

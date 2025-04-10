import React, { useEffect, useState } from "react";

const ConversationsDetail = () => {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/conversations")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Sample ticket data:", data[0]);
        setConversations(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load conversations.");
      });
  }, []);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Historical Tickets</h1>

      {error && <p className="text-red-500">{error}</p>}

      {!error && conversations.length === 0 && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conversations.map((ticket, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded shadow-sm bg-white cursor-pointer hover:shadow-md transition duration-200"
            onClick={() => handleTicketClick(ticket)}
          >
            <h3 className="font-semibold text-blue-700 mb-2 truncate">
              Ticket ID: {ticket["Ticket ID"] || "N/A"}
            </h3>
            <p className="text-gray-700 mb-1 truncate">
              <span className="font-semibold">Subject:</span>{" "}
              {ticket[" Issue Category"] || "No Subject"}
            </p>
            <p className="text-gray-700 mb-1 truncate">
              <span className="font-semibold">Status:</span>{" "}
              {ticket[" Resolution Status"] || "Unknown"}
            </p>
            <p className="text-gray-700 truncate">
              <span className="font-semibold">Date Resolved:</span>{" "}
              {ticket[" Date of Resolution"] || "N/A"}
            </p>
          </div>
        ))}
      </div>

      {selectedTicket && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Ticket Details: {selectedTicket["Ticket ID"] || "N/A"}
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Subject:</span>{" "}
              {selectedTicket[" Issue Category"] || "No Subject"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Status:</span>{" "}
              {selectedTicket[" Resolution Status"] || "Unknown"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Date Resolved:</span>{" "}
              {selectedTicket[" Date of Resolution"] || "N/A"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Priority:</span>{" "}
              {selectedTicket[" Priority"] || "N/A"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Sentiment:</span>{" "}
              {selectedTicket[" Sentiment"] || "N/A"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Solution:</span>{" "}
              {selectedTicket[" Solution"] || "N/A"}
            </p>
            {/* Add other details you want to display here */}
            <button
              onClick={handleCloseModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationsDetail;
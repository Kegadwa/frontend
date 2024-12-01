// src/pages/ProfilePage.js
import React, { useState, useEffect } from "react";
import { db, auth } from "../src/lib/firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { Bar } from "react-chartjs-2"; // Using react-chartjs-2 for the graph
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProfilePage = () => {
  const router = useRouter();
  const [translationHistory, setTranslationHistory] = useState([]);
  const [user, setUser ] = useState(null);
  const [sortOption, setSortOption] = useState("latest");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser (user);
        await fetchTranslationHistory(user.uid);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchTranslationHistory = async (userId) => {
    try {
      const translationsRef = collection(db, "translations");
      const q = query(translationsRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const translations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTranslationHistory(translations);
    } catch (error) {
      console.error("Error fetching translation history:", error);
    }
  };

  const clearHistory = async () => {
    if (window.confirm("Are you sure you want to clear your translation history?")) {
      try {
        const translationsRef = collection(db, "translations");
        const q = query(translationsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        for (const docSnapshot of querySnapshot.docs) {
          await deleteDoc(doc(db, "translations", docSnapshot.id));
        }

        setTranslationHistory([]);
        alert("History cleared successfully!");
      } catch (error) {
        console.error("Error clearing history:", error);
      }
    }
  };

  const logout = async () => {
    await auth.signOut();
    alert("Logged out successfully!");
    router.push("/login");
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedTranslationHistory = () => {
    let sortedHistory = [...translationHistory];
    switch (sortOption) {
      case "latest":
        sortedHistory.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());
        break;
      case "oldest":
        sortedHistory.sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate());
        break;
      case "english_asc":
        sortedHistory.sort((a, b) => a.english.localeCompare(b.english));
        break;
      case "english_desc":
        sortedHistory.sort((a, b) => b.english.localeCompare(a.english));
        break;
      case "kalenjin_asc":
        sortedHistory.sort((a, b) => a.kalenjin.localeCompare(b.kalenjin));
        break;
      case "kalenjin_desc":
        sortedHistory.sort((a, b) => b.kalenjin.localeCompare(a.kalenjin));
        break;
      default:
        break;
    }
    return sortedHistory;
  };

  const translationStats = {
    labels: ["English", "Kalenjin"],
    datasets: [
      {
        label: "Total Translations",
        data: [
          translationHistory.filter((t) => t.language === "english").length,
          translationHistory.filter((t) => t.language === "kalenjin").length,
        ],
        backgroundColor: ["#FFA726", "#66BB6A"],
      },
    ],
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(to bottom, #F9D29D, #EF8E38)",
        minHeight: "100vh",
        padding: "20px",
        color: "#333",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            {user && (
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <img
                  src={user.photoURL || "/images/profilepicture.png"}
                  alt="Profile"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    border: "4px solid #CD6F16",
                    marginRight: "20px",
                  }}
                />
                <div>
                  <h1 style={{ fontSize: "28px" }}>{user.displayName || "User "}</h1>
                  <p style={{ fontSize: "16px", color: "#555" }}>{user.email}</p>
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={logout}
              style={{
                backgroundColor: "#D32F2F",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                marginLeft: "10px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
            <button
              onClick={() => router.push("/")}
              style={{
                backgroundColor: "#0288D1",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                marginLeft: "10px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Home
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <h2>Welcome, {user ? user.displayName : "User "}!</h2>
          <p>Here is your profile dashboard. You can view your translations, manage your profile, and see your stats.</p>
        </div>

        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <button
            onClick={clearHistory}
            style={{
              backgroundColor: "#FFA726",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              marginRight: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Clear History
          </button>
          <button
            onClick={() => router.push("/Chat")}
            style={{
              backgroundColor: "#66BB6A",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              marginRight: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Continue Translating
          </button>
          <button
            onClick={() => alert("Update Profile Feature Coming Soon!")}
            style={{
              backgroundColor: "#42A5F5",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Update Profile
          </button>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "12px", backgroundColor: "#CD6F16", color: "#fff" }}>Date</th>
              <th style={{ padding: "12px", backgroundColor: "#CD6F16", color: "#fff" }}>English</th>
              <th style={{ padding: "12px", backgroundColor: "#CD6F16", color: "#fff" }}>Kalenjin</th>
            </tr>
          </thead>
          <tbody>
            {sortedTranslationHistory().length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: "12px", color: "#666" }}>
                  No translation history available.
                </td>
              </tr>
            ) : (
              sortedTranslationHistory().map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                    {item.timestamp ? item.timestamp.toDate().toLocaleDateString() : "N/A"}
                  </td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>{item.english}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>{item.kalenjin}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div style={{ marginTop: "40px", backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
          <h3 style={{ color: "#CD6F16" }}>Translation Activity</h3>
          <Bar data={translationStats} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
import React from "react";
import { requestPermission, showNotification } from "../utils/notifications";

const Settings = () => {
  const handleExport = () => {
    const data = localStorage.getItem("reduxState");
    if (!data) return alert("No data to export");
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "productiv-export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        localStorage.setItem("reduxState", JSON.stringify(parsed));
        alert("Imported. Reloading...");
        window.location.reload();
      } catch (err) {
        alert("Invalid file");
      }
    };
    reader.readAsText(file);
  };

  const handleEnableNotifications = async () => {
    const ok = await requestPermission();
    if (ok) {
      showNotification("Notifications enabled", { body: "You'll receive reminders from this app." });
      alert("Notifications enabled");
    } else {
      alert("Notifications not granted");
    }
  };

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <button onClick={handleExport} style={{ padding: 6, borderRadius: 6 }}>Export JSON</button>
      <label style={{ padding: 6, borderRadius: 6, cursor: "pointer", background: "transparent" }}>
        Import
        <input type="file" accept="application/json" onChange={handleImport} style={{ display: "none" }} />
      </label>
      <button onClick={handleEnableNotifications} style={{ padding: 6, borderRadius: 6 }}>Enable Notifications</button>
    </div>
  );
};

export default Settings;

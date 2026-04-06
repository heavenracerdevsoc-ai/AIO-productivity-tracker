export const requestPermission = async () => {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const p = await Notification.requestPermission();
  return p === "granted";
};

export const showNotification = (title, options = {}) => {
  try {
    if (!("Notification" in window)) return false;
    if (Notification.permission !== "granted") return false;
    new Notification(title, options);
    return true;
  } catch (err) {
    console.error("notify error", err);
    return false;
  }
};

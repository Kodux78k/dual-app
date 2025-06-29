function saveRoleSession(userName, assistantName) {
  localStorage.setItem("roleSession", JSON.stringify({ userName, assistantName, date: Date.now() }));
}


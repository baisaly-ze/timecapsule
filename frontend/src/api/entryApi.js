const API_URL = "https://timecapsule-skcz.onrender.com/api/entries";

export const createEntry = async (entryData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entryData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create entry");
  }

  return res.json();
};

export const getEntries = async (userId) => {
  const res = await fetch(`${API_URL}/${userId}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch entries");
  }

  return res.json();
};

export const openEnvelope = async (id) => {
  const res = await fetch(`${API_URL}/open/${id}`, {
    method: "PUT",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to open envelope");
  }

  return res.json();
};

export const updateEntry = async (id, entryData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entryData),
  });

  return res.json();
};

export const deleteEntry = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return res.json();
};
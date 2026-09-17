const API_BASE_URL = "https://ssprimecrm.com/api/v1";

export const getProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw error;
  }
};
export const getProjectSummery = async (projectId: string) =>
  fetch(`http://localhost:4000/details/projectSummery?projectId=${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

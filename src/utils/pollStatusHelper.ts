export const pollJobStatus = async (jobId: string, maxAttempts = 30, intervalMs = 2000): Promise<boolean> => {
    console.log("inside pollJobStatus with jobId:", jobId);
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/job-status/${jobId}`, {
        credentials: "include",
      });
      const { status } = await res.json();

      if (status === "completed") return true;
      if (status === "failed") return false;

      await new Promise((resolve) => setTimeout(resolve, intervalMs));
      attempt++;
    } catch (err) {
      console.error("Polling error:", err);
      break;
    }
  }

  return false;
};

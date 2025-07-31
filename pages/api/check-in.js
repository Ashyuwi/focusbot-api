export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { user_id, date, check_in } = req.body;

  if (!user_id || !date || !check_in) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // 👇 Replace with your actual Google Script Web App URL
    const gsheetResponse = await fetch("https://script.google.com/macros/s/AKfycby3N0Wy_Ef2DtM5pyE_MGfvnNtHad8H0rwFM_24dqrMGI0morIGjflm0uP_V7-g1Tzx/exec", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, date, check_in }),
    });

    if (!gsheetResponse.ok) {
      const errorText = await gsheetResponse.text();
      console.error("Google Sheets error:", errorText);
      return res.status(500).json({
        message: 'Failed to log check-in to Google Sheets',
        error: errorText,
      });
    }

    return res.status(200).json({ message: 'Check-in logged successfully' });

  } catch (error) {
    console.error("Error in /check-in:", error);
    return res.status(500).json({
      message: 'Server error logging check-in',
      error: error.message,
    });
  }
}

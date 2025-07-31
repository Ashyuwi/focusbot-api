export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { user_id, date, check_in } = req.body;

  if (!user_id || !date || !check_in) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // 👇 Replace this with your ACTUAL Google Script Web App URL
    const gsheetResponse = await fetch("https://script.google.com/macros/s/AKfycbxHvrmAIN3Xy7dNmMPgkfexQyYXTj0bqA6ZHGxqZ38udEPXJMXbSk4wlqRS0ikjHxxV/exec", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, date, check_in }),
    });

    if (!gsheetResponse.ok) {
      console.error("Google Sheets API error:", await gsheetResponse.text());
      return res.status(500).json({ message: 'Failed to log check-in to Google Sheets' });
    }

    return res.status(200).json({ message: 'Check-in logged successfully' });

  } catch (error) {
    console.error("Error in /check-in:", error);
    return res.status(500).json({ message: 'Server error logging check-in' });
  }
}

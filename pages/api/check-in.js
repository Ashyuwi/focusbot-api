export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { user_id, date, check_in } = req.body;

  if (!user_id || !date || !check_in) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Save to Google Sheets
  const gsheetResponse = await fetch(https://script.google.com/macros/s/AKfycbxHvrmAIN3Xy7dNmMPgkfexQyYXTj0bqA6ZHGxqZ38udEPXJMXbSk4wlqRS0ikjHxxV/exec, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, date, check_in }),
  });

  if (!gsheetResponse.ok) {
    console.error("Failed to save to Google Sheets");
  }

  return res.status(200).json({ message: 'Check-in logged successfully' });
}

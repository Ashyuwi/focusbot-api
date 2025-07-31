export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { user_id, check_in, date } = req.body;

  // TODO: Save to Google Sheet or database later
  console.log(`[CHECK-IN] User: ${user_id} | Date: ${date} | Status: ${check_in}`);

  return res.status(200).json({ message: 'Check-in saved' });
}

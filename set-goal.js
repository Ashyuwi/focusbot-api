export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { user_id, goal } = req.body;

  // TODO: Save to Google Sheet or database later
  console.log(`[GOAL SET] User: ${user_id} | Goal: ${goal}`);

  return res.status(200).json({ message: 'Goal saved' });
}

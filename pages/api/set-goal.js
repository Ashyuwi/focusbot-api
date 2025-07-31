export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { user_id, goal } = req.body;

  if (!user_id || !goal) {
    return res.status(400).json({ message: 'Missing user_id or goal' });
  }

  console.log(`[GOAL SET] User: ${user_id} | Goal: ${goal}`);

  return res.status(200).json({ message: 'Goal saved' });
}

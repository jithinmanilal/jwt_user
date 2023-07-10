const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post('/api/users/update/', async (req, res) => {
  const { id, firstName, lastName, email, isActive } = req.body;
  const { access } = req.cookies;
  try {
    const response = await fetch(`${process.env.API_URL}/api/users/update/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (response.status === 200) {
      return res.status(200).json(data);
    } else {
      return res.status(response.status).json(data);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Something went wrong when updating the user' });
  }
});

module.exports = router;

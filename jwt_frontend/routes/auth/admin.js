const express = require('express');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.get('/api/users/list', async (req, res) => {
  const { access } = req.cookies;

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/users/list/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${access}`,
      },
    });

    const data = await apiRes.json();

    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'Something went wrong when trying to get user details',
    });
  }
});

module.exports = router;

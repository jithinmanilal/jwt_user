const express = require('express');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.delete('/api/users/delete/:id', async (req, res) => {
    const { access } = req.cookies;
    const { id } = req.params;
  
    try {
      const apiRes = await fetch(`${process.env.API_URL}/api/users/delete/${id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${access}`,
        },
      });
  
      if (apiRes.ok) {
        return res.sendStatus(204); // User successfully deleted
      } else {
        const data = await apiRes.json();
        return res.status(apiRes.status).json(data);
      }
    } catch (err) {
      return res.status(500).json({
        error: 'Something went wrong when trying to delete the user',
      });
    }
});
  
module.exports = router;
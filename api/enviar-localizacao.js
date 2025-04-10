const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body;

    const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const mensagem = `🚨 Minha localização atual: ${link}`;

    const TELEGRAM_BOT_TOKEN = "7899777703:AAHXpSnR_1lEaSRGzsxqrHn9-bInXMgpe98";
    const CHAT_ID = "6083274663";

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
      await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: mensagem,
        }),
      });

      res.status(200).json({ status: 'Localização enviada com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao enviar a localização.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
};

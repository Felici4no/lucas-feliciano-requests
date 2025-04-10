export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body;

    const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const mensagem = `🚨 Minha localização atual: ${link}`;

    const TELEGRAM_BOT_TOKEN = "7899777703:AAHXpSnR_1lEaSRGzsxqrHn9-bInXMgpe98";
    const CHAT_ID = "6083274663";

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
      const telegramResponse = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: mensagem,
        }),
      });

      if (!telegramResponse.ok) {
        throw new Error(`Erro do Telegram: ${telegramResponse.statusText}`);
      }

      res.status(200).json({ status: 'Localização enviada com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar localização:', error);
      res.status(500).json({ error: 'Erro ao enviar a localização.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}

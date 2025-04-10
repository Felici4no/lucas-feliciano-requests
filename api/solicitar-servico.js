const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { latitude, longitude, nome, telefone, servicos, detalhes } = req.body;

    const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const mensagem = `
📩 *Nova solicitação recebida!*
👤 Nome: ${nome}
📱 Telefone: ${telefone}
🛠️ Serviço: ${servicos}
📝 Detalhes: ${detalhes}
📍 Localização: [Ver no Mapa](${link})
    `;

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
          parse_mode: "Markdown"
        }),
      });

      res.status(200).json({ status: 'Solicitação enviada com sucesso!' });
    } catch (error) {
      console.error("Erro ao enviar para o Telegram:", error);
      res.status(500).json({ error: 'Erro ao enviar a solicitação.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
};

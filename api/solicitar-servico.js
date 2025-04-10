export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, telefone, servicos, detalhes, latitude, longitude } = req.body;

    const mensagem = `
📬 *Nova solicitação de serviço*:
👤 Nome: ${nome}
📞 Telefone: ${telefone}
🛠 Serviço: ${servicos}
📝 Detalhes: ${detalhes}
📍 Localização: https://www.google.com/maps?q=${latitude},${longitude}
    `;

    const BOT_TOKEN = "7899777703:AAHXpSnR_1lEaSRGzsxqrHn9-bInXMgpe98";
    const CHAT_ID = "6083274663";

    try {
      const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: mensagem,
          parse_mode: "Markdown"
        })
      });

      const result = await telegramResponse.json();

      if (!result.ok) {
        throw new Error(result.description);
      }

      return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      return res.status(500).json({ error: 'Erro ao enviar mensagem para o Telegram.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}

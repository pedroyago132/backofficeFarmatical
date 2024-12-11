const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");

admin.initializeApp();
const database = admin.database();

// Função agendada para rodar a cada minuto
exports.scheduleMessages = onSchedule("*/1 * * * *", async (event) => {
  try {
    const agora = new Date();
    const segundos = agora.getSeconds();

    // Só processa se estiver no intervalo desejado (por exemplo, segundos 0-50)
    if (segundos > 50) {
      console.log("Fora do intervalo desejado. Ignorando execução.");
      return null;
    }

    // Recuperar dados do Realtime Database
    const dbRef = database.ref(`/`);
    const snapshot = await dbRef.once("value");
    const data = snapshot.val();

    if (!data) {
      console.log("Nenhum dado encontrado no banco de dados.");
      return null;
    }

    const dataList = Object.keys(data).map((key) => ({
      id: key,
      clientes: data[key].clientes,
    }));

    dataList.forEach(client => {
      if (client.clientes) {
        Object.values(client.clientes).forEach(cliente => {
          Object.values(cliente.horario).forEach(clienteT => {
            const horas = String(agora.getHours()).padStart(2, "0");
            const minutos = String(agora.getMinutes()).padStart(2, "0");

            if (clienteT.hora === `${horas}:${minutos}`) {
              const body = {
                message: `${client.mensagens.msgHorario} ${cliente.remedio}, agora às ${horas}:${minutos}. .`,
                phone: `55${cliente.contato}`,
                delayMessage: 10,
              };

              console.log("Enviando mensagem para:", cliente.contato);
              sendMessageAll(body); // Função já implementada para envio de mensagem
            }
          });
        });
      }
    });

    console.log("Execução da função agendada concluída.");
    return null;
  } catch (error) {
    console.error("Erro ao executar a função agendada:", error);
    return null;
  }
});

// Função auxiliar para enviar mensagens
async function sendMessageAll(body) {
    try {
      const response = await fetch(`https://api.z-api.io/instances/3D826867ABEC00CA23EBB2D4EBC7E202/token/9A63F56F86E49E2446ED34DD/send-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Define que o conteúdo do corpo é JSON
          'Client-Token': 'F5cdad44569cc4be0b47eb93c308ddbf4S',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
  
      const result = await response.json(); // Aguarda a conversão para JSON
      console.log('Success:', result);
  
      return result; // Retorna o resultado, se necessário
    } catch (error) {
      console.error('Error:', error);
      throw error; // Relança o erro, se você quiser tratá-lo fora dessa função
    }
  }
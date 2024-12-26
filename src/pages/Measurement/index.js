import * as React from 'react';
import { Body, ContainerRules, Input, Container2, ContainerEditAccordion, GreenBox, RedBox } from './styles';
import { backgroundMenu } from '../../Globals/globals'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Header from '../../components/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { sendImage, sendMessageAll, setNewClient } from '../../services';
import base64 from 'base-64';
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import { database } from '../../App';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import ListAltOutlined from '@mui/icons-material/ListAltOutlined';
import AccountBoxOutlined from '@mui/icons-material/AccountBoxOutlined';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/database";
import { dataInstance } from '../../services';
import styled from 'styled-components';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from "@mui/material"; // Certifique-se de ter os componentes do Material-UI instalados





const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const style = {
    height: 270,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styleModalRegister = {
    maxHeight: '100vh',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 1,
    overflowY: 'auto'
};

const styleModalList = {
    height: '86%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 1
};


const actions = [
    { icon: <AccountBoxOutlined />, name: 'Cadastrar Cliente' },

];



const Measurement = () => {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [openRegister, setOpenRegister] = React.useState(false);
    const [openList, setOpenList] = React.useState(false);
    const [datarow, setDataRow] = React.useState(false);
    const [datarowSelection, setDataRowSelection] = React.useState('');
    const [messageAll, setMessageAll] = React.useState('');
    const [nomeInput, setNomeInput] = React.useState('');
    const [wppInput, setWppInput] = React.useState('');
    const [remedioInput, setRemedioInput] = React.useState([{ remedio: '', horario: [], doses: 0, foto:'' }]);
    const [cpfInput, setCpfInput] = React.useState('');
    const [usoContinuo, setUsoContinuo] = React.useState('');
    const [receita, setReceita] = React.useState('');
    const [farmaceutico, setFarmaceutico] = React.useState('');
    const [dataClientes, setDataClientes] = React.useState([]);
    const [dataClientesSelecionados, setDataClientesSelecionados] = React.useState([]);
    const [time, setTime] = React.useState('');
    const [formattedTime, setFormattedTime] = React.useState('');
    const [date, setDate] = React.useState('');
    const [filteredData, setFilteredData] = React.useState([]);
    const [filterValue, setFilterValue] = React.useState('');
    const [user, setUser] = React.useState({ email: 'alo' });
    const [novaData, setNovaData] = React.useState(null);
    const [clientForTime, setClientforTime] = React.useState([{ clientes: [] }]);
    const [checkForTime, setCheckforTime] = React.useState([{}]);
    const [connectednumber, setConnectedNumber] = React.useState(false);
    const [userData, setUserData] = React.useState({ msgCadastro: '', msgHorario: '' });
    const [inputUsocontinuo, setInputUsoContinuo] = React.useState('Sua medicação esta acabando lembre-se de comprar');
    const [inputReceita, setInputReceita] = React.useState('Sua medicaçãoe sta vencendo precisa de nova receia?');
    const [contatoEdit, setValueContatoEdit] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [loadRegisterClient, setLoadRegisterClient] = React.useState(false);
    const listRef = React.useRef(null);

    const isMobile = useMediaQuery('(max-width:600px)');

    const buttonStyles = {
        marginBottom: 25,
        paddingTop: 7,
        width: isMobile ? '100%' : '60%'
    };


    const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  font-family: Arial, sans-serif;
`;

    const Title = styled.h1`
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
`;

    const UploadButton = styled.label`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  max-height:50px;
  &:hover {
    background-color: #0056b3;
  }
`;

    const Input = styled.input`
  display: none;
`;

    const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

    const ImagePreview = styled.img`
  max-width: 300px;
  max-height: 300px;
  border: 2px solid #ccc;
  border-radius: 10px;
  margin-top: 16px;
`;

    const PlaceholderText = styled.p`
  color: #555;
  font-size: 14px;
  margin-top:-7px;

`;

    const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #a71d2a;
  }
`;

const BotaoAzul = styled.button`
  background-color: white;
  color: #ADD8E6; /* Azul claro */
  border: 2px solid #ADD8E6; /* Azul claro */
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ADD8E6; /* Azul claro no hover */
    color: white;
  }
`;




    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenRegister = () => setOpenRegister(true);
    const handleCloseRegister = () => setOpenRegister(false);

    const handleOpenList = () => setOpenList(true);
    const handleCloseList = () => setOpenList(false);
    const columns = [

        { field: 'nome', headerName: 'Nome', width: 130 },
        { field: 'remedio', headerName: 'Remédio', width: 150 },
        { field: 'contato', headerName: 'Contato', width: 130 },
        { field: 'dataCadastro', headerName: 'Registrado em', width: 150 },
        { field: 'doses', headerName: 'Doses restantes', width: 130 },
        { field: 'acabaEm', headerName: 'Acaba em:', width: 130 },

    ];

    const paginationModel = { page: 0, pageSize: 5 };


    const handleImageUpload = (remedioIndex, event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Arquivo selecionado:', file);
    
            // Gerar uma URL temporária para o arquivo
            const fileURL = URL.createObjectURL(file);
    
            const updated = [...remedioInput];
            updated[remedioIndex].foto = fileURL; // Armazena a URL gerada
            setRemedioInput(updated);
    
            console.log('URL gerada:', fileURL);
            console.log('Estado atualizado:', updated);
        } else {
            console.log('Nenhum arquivo selecionado.');
        }
    };

    // Remover foto
    const handleRemoveImage = (remedioIndex) => {
        const updated = [...remedioInput];
        updated[remedioIndex].foto = null;
        setRemedioInput(updated);
    };

    function setSelectionItem() {
        handleOpen();
        // Mapeia e filtra os dados e os achata em um único array
        const selectedData = datarow.map((value, indexS) => {

            return filteredData.filter((_, index) => _.nome + _.remedio == value);

        }).flat(); // Achata o array para evitar arrays aninhados

        console.log('AAAAAAAA;;;;;;;', datarow, "::::", selectedData)
        setFilteredData(selectedData)

    }


   

    React.useEffect(() => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        const hours = today.getHours();
        const minutes = today.getMinutes().toString().padStart(2, '0'); // Pads single digit minutes with a zero
        setDate(`${date}/${month}/${year} ${hours}:${minutes}`);
    }, []);

    React.useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                setUser(user)
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }, [])

    React.useEffect(() => {
        if (user) {
            const dbRef = ref(database, `${base64.encode(user.email)}/clientes`); // Referência para a coleção 'clientes'

            // Escuta mudanças em tempo real
            const unsubscribe = onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const dataList = Object.keys(data).map((key) => ({
                        id: key,
                        nome: data[key].nome,
                        acabaEm: data[key].acabaEm,
                        cpf: data[key].cpf,
                        contato: data[key].contato,
                        doses: data[key].doses,
                        remedio: data[key].remedio,
                        receita: data[key].receita,
                        usoContinuo: data[key].usoContinuo,
                        mensagens: data[key].mensagens,
                        horario: data[key].horario,
                        dataCadastro: data[key].dataCadastro
                    }));
                    setFilteredData(dataList);
                    setDataClientes(dataList);

                    const dbRef = ref(getDatabase());
                    get(child(dbRef, `${base64.encode(user.email)}/mensagens`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            setUserData(snapshot.val())
                        } else {
                            console.log("No data available");
                        }
                    }).catch((error) => {
                        console.error(error);
                    });

                } else {
                    return null // Define uma lista vazia caso não haja dados
                }
            });
        } else {
            return null
        }

    }, [user,console.log('MSG:::::::',userData.msgCadastro)])


    React.useEffect(() => {
        const dbRef = ref(database, `/`); // Referência para a coleção 'clientes'



        const intervalo = setInterval(() => {
            const unsubscribe = onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                console.log('ITEM1::::::::', data)
                if (data) {
                    const dataList = Object.keys(data).map((key) => ({
                        id: key,
                        clientes: data[key].clientes,
                        mensagens: data[key].mensagens
                    }));
                    setClientforTime(dataList);




                } else {
                    return null // Define uma lista vazia caso não haja dados
                }
                console.log(clientForTime)

            });
            return unsubscribe;
        }, 27000);
        return () => clearInterval(intervalo);




    }, [])

    async function checkTime(hour, minute) {
        try {
            // Obtém a hora e minuto atual
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();

            // Verifica se os horários são iguais
            if (currentHour === hour && currentMinute === minute) {
                executeAction(); // Chama a função se coincidir
            } else {
                console.log("Os horários não coincidem. Verifique novamente mais tarde.");
            }
        } catch (error) {
            console.error("Erro ao verificar o horário:", error);
        }
    }

    React.useEffect(() => {
        const agora = new Date();
        if (clientForTime) {
            clientForTime.forEach((client) => {
                if (client.clientes) {
                    Object.values(client.clientes).forEach((cliente) => {
                        const acabaEmStr = cliente.acabaEm; // Ex: "16/10/2024"
                        const [dia, mes, ano] = acabaEmStr.split("/").map(Number); // Quebra o formato DD/MM/YYYY
                        const dataAcabaEm = new Date(ano, mes - 1, dia); // Cria objeto Date para `acabaEm`

                        // Calcula o momento exato para envio (36 horas antes)
                        const momentoEnvio = new Date(dataAcabaEm);
                        momentoEnvio.setHours(momentoEnvio.getHours() - 58);

                        // Verifica se o horário atual corresponde ao momento de envio
                        const horas = String(agora.getHours()).padStart(2, "0");
                        const minutos = String(agora.getMinutes()).padStart(2, "0");
                        const dataAtualStr = `${agora.getFullYear()}-${String(
                            agora.getMonth() + 1
                        ).padStart(2, "0")}-${String(agora.getDate()).padStart(2, "0")} ${horas}:${minutos}`;

                        const momentoEnvioStr = `${momentoEnvio.getFullYear()}-${String(
                            momentoEnvio.getMonth() + 1
                        ).padStart(2, "0")}-${String(momentoEnvio.getDate()).padStart(2, "0")} ${String(
                            momentoEnvio.getHours()
                        ).padStart(2, "0")}:${String(momentoEnvio.getMinutes()).padStart(2, "0")}`;

                        console.log('momentoenvio::::', momentoEnvioStr, 'dataatualizar:::', dataAtualStr)

                        if (dataAtualStr === momentoEnvioStr) {
                            const body = {
                                message: `,${cliente.msgUsoContinuo} - Medicação: ${cliente.remedio}`,
                                phone: `55${cliente.contato}`,
                                delayMessage: 10,
                            };

                            console.log("Enviando mensagem para:", cliente.contato);
                            sendMessageAll(body); // Função já implementada para envio de mensagem
                        }
                    });
                }
            });
        }
    }, [clientForTime])

    React.useEffect(() => {
        const agora = new Date();
        if (clientForTime) {
            clientForTime.forEach((client) => {
                if (client.clientes) {
                    Object.values(client.clientes).forEach((cliente) => {
                        const acabaEmStr = cliente.acabaEm; // Ex: "16/10/2024"
                        const [dia, mes, ano] = acabaEmStr.split("/").map(Number); // Quebra o formato DD/MM/YYYY
                        const dataAcabaEm = new Date(ano, mes - 1, dia); // Cria objeto Date para `acabaEm`

                        // Calcula o momento exato para envio (36 horas antes)
                        const momentoEnvio = new Date(dataAcabaEm);
                        momentoEnvio.setHours(momentoEnvio.getHours() - 34);

                        // Verifica se o horário atual corresponde ao momento de envio
                        const horas = String(agora.getHours()).padStart(2, "0");
                        const minutos = String(agora.getMinutes()).padStart(2, "0");
                        const dataAtualStr = `${agora.getFullYear()}-${String(
                            agora.getMonth() + 1
                        ).padStart(2, "0")}-${String(agora.getDate()).padStart(2, "0")} ${horas}:${minutos}`;

                        const momentoEnvioStr = `${momentoEnvio.getFullYear()}-${String(
                            momentoEnvio.getMonth() + 1
                        ).padStart(2, "0")}-${String(momentoEnvio.getDate()).padStart(2, "0")} ${String(
                            momentoEnvio.getHours()
                        ).padStart(2, "0")}:${String(momentoEnvio.getMinutes()).padStart(2, "0")}`;

                        console.log('momentoenvio::::', momentoEnvioStr, 'dataatualizar:::', dataAtualStr)

                        if (dataAtualStr === momentoEnvioStr) {
                            const body = {
                                message: `,${cliente.msgUsoContinuo} - Medicação: ${cliente.remedio}`,
                                phone: `55${cliente.contato}`,
                                delayMessage: 10,
                            };

                            console.log("Enviando mensagem para:", cliente.contato);
                            sendMessageAll(body); // Função já implementada para envio de mensagem
                        }
                    });
                }
            });
        }
    }, [clientForTime])

    React.useEffect(() => {
        if (clientForTime) {
            clientForTime.forEach(client => {
                if (client.clientes) {
                    Object.values(client.clientes).forEach(cliente => {
                        Object.values(cliente.horario).forEach(clienteT => {
                            const agora = new Date();
                            const horas = String(agora.getHours()).padStart(2, "0");
                            const minutos = String(agora.getMinutes()).padStart(2, "0");


                            if (clienteT.hora == `${horas}:${minutos}`) {

                                const body = {
                                    message: `${client.mensagens.msgHorario} - ${cliente.remedio},agora as ${horas}:${minutos}`,
                                    phone: `55${cliente.contato}`,
                                    delayMessage: 10
                                }
                                console.log('ENVIARMENSAGEM::::', cliente.contato)
                                sendMessageAll(body)

                               if(cliente.fotoUrl){
                                const bodyImage = {
                                    phone: `55${cliente.contato}`,
                                    image: cliente.fotoUrl,
                                    caption: "Remédio"
                                  }

                                  sendImage(bodyImage)

                               } 
                            } else {
                                return null
                            }



                        });
                    });
                }
            });
        }
    }, [clientForTime]);

    async function dataInstanceValue() {
        const idi = '3D826867ABEC00CA23EBB2D4EBC7E202';
        const tokeni = '9A63F56F86E49E2446ED34DD';

        try {
            const response = await dataInstance(idi, tokeni); // Aguarda a função retornar o resultado
            console.log('DATAAQUI:::::::', response)
            if (response.connected) {
                setConnectedNumber(true)
            } else {
                setConnectedNumber(false)
            }
        } catch (error) {
            console.error('TRYCAYCHERROR:::::QRCODE:::', error); // Lida com erros
        }
    }

    React.useEffect(() => {
        dataInstanceValue();

    }, [])


    async function setNewClient() {
        const database = getDatabase();
        const storage = getStorage();

       
    
        if (wppInput === '' || nomeInput === '' || cpfInput === '') {
            window.alert('Complete os campos');
            return;
        }
    
        const body = {
            message: `${userData.msgCadastro}`,
            phone: `55${wppInput}`,
            delayMessage: 10
        };

        setLoadRegisterClient(true)
    
        const uploadPromises = remedioInput.map(async (response, remedioIndex) => {
            const horariosCount = response.horario.length;
            const dosesCount = response.doses;
            const acabaEmDias = dosesCount / horariosCount;
            const hoje = new Date(); // Data atual
            const novaData = new Date(hoje); // Clona a data atual
            novaData.setDate(novaData.getDate() + acabaEmDias); // Adiciona os dias
    
            // Adiciona a data ao objeto response
            response.acabaEm = novaData.toLocaleDateString(); // Formata a data no formato local
    
            let imageUrl = '';
    
            if (response.foto) {
                // Upload da imagem ao Firebase Storage
                const storagePath = `${base64.encode(user.email)}/clientes/${cpfInput}/remedios/${remedioIndex}/foto.jpg`;
                const storageReference = storageRef(storage, storagePath);
    
                try {
                    await uploadString(storageReference, response.foto, 'data_url');
                    imageUrl = await getDownloadURL(storageReference);
                } catch (error) {
                    console.error("Erro ao fazer upload da imagem:", error);
                }
            }
    
            // Caminho no Realtime Database com cpfInput, remedioIndex e response.remedio
            const databasePath = `${base64.encode(user.email)}/clientes/${cpfInput}_${remedioIndex}_${response.remedio}`;
            await set(ref(database, databasePath), {
                acabaEm: response.acabaEm,
                nome: nomeInput,
                contato: wppInput,
                remedio: response.remedio,
                doses: response.doses,
                cpf: cpfInput,
                receita: receita,
                usoContinuo: usoContinuo,
                horario: time,
                dataCadastro: date,
                msgUsoContinuo: inputUsocontinuo,
                msgReceita: inputReceita,
                fotoUrl: imageUrl, // Adiciona a URL da imagem ao banco
                digit: remedioIndex // Adiciona o índice como "digit"
            });
    
            // Atualiza os horários individualmente
            const horarioPromises = Object.values(response.horario).map(e =>
                set(ref(database, `${databasePath}/horario/${e}`), {
                    hora: e
                })
            );
            await Promise.all(horarioPromises);
        });
        
        setLoadRegisterClient(false)
        // Aguarda todos os uploads e gravações de dados
        await Promise.all(uploadPromises);
    
        // Envia a mensagem
        sendMessageAll(body);
    
        // Navega para a próxima página
        navigate('/measure');
    }

    const addMedicacao = () => {
        setRemedioInput([...remedioInput, { horario: [{ hora: '00:00' }], remedio: '' }]);
        setTimeout(scrollToLastItem, 100);
    };

    const addHorario = (index) => {
        setRemedioInput((prevState) =>
            prevState.map((item, i) =>
                i === index
                    ? { ...item, horario: [...item.horario, { hora: '' }] }
                    : item
            )
        );
        setTimeout(() => {
            if (listRef.current) {
                listRef.current.scrollTop = listRef.current.scrollHeight;
            }
        }, 50);
    };

    const handleChangeMenu = (event) => {
        if (connectednumber) {
            if (event == 'Cadastrar Cliente') {
               navigate('/registerClient')
            } else if (event == 'Ver Todos') {
                handleOpenList()
            }
        } else {
            window.alert('Necessário Conectar Número de celular.')
        }

    };

    const handleInputChangeRemedio = (remedioInput1, newValue) => {
        setRemedioInput(remedioInput.map(input => {
            if (input.remedio === remedioInput1) {
                return { ...input, remedio: newValue }
            } else return input
        }));
    };

    const handleInputChangeDoses = (remedioInput1, newValue) => {
        setRemedioInput(remedioInput.map(input => {
            if (input.remedio === remedioInput1) {
                return { ...input, doses: newValue }
            } else return input
        }));
    };

    const handleInputChangehorario = (remedioInput1, indexHorario, newValue) => {
        setRemedioInput((prevState) =>
            prevState.map((input) => {
                if (input.remedio === remedioInput1) {
                    const updatedHorario = input.horario.map((horario, i) =>
                        i === indexHorario
                            ? formatarHorario(newValue) // Formatar a hora antes de atualizar
                            : horario
                    );

                    return { ...input, horario: updatedHorario };
                }
                return input;
            })
        );
    };

    const scrollToLastItem = () => {
        if (listRef.current) {
            listRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Função para formatar o horário
    const formatarHorario = (newValue) => {
        // Remove qualquer caractere não numérico
        const valoresNumericos = newValue.replace(/\D/g, "");

        // Se tiver 4 ou mais números, formate como hora:minuto
        if (valoresNumericos.length >= 4) {
            // Formata no estilo "HH:MM"
            return `${valoresNumericos.slice(0, 2)}:${valoresNumericos.slice(2, 4)}`;
        }

        // Se o valor for menor que 4 caracteres, apenas retorna o que foi digitado
        return valoresNumericos;
    };

    const removeTask = (index) => {
        const newsInputs = remedioInput.filter((_, i) => i !== index);
        setRemedioInput(newsInputs);
    };

    async function sendAll() {
        try {

            filteredData.map(item => {
                const body = {
                    message: messageAll,
                    phone: `55${item.contato}`,
                    delayMessage: 2
                }

            sendMessageAll(body)
               
            })
        } catch (error) {
           window.alert('Erro interno ao enviar')
        }


    }

    const handleFilterChange = (e) => {
        const value = e.target.value.toLowerCase(); // Converte o valor do filtro para minúsculas
        setFilterValue(value); // Atualiza o valor do filtro

        const filtered = dataClientes.filter((item) =>
            item.nome.toLowerCase().includes(value) ||
            item.dataCadastro.toLowerCase().includes(value) ||
            item.acabaEm.toLowerCase().includes(value) ||
            item.doses.toLowerCase().includes(value) ||
            item.remedio.toLowerCase().includes(value)
        );

        setFilteredData(filtered); // Atualiza os dados filtrados
    };

    const RenderConnected = () => {
        if (connectednumber) {
            return (
                <GreenBox>Conectado</GreenBox>
            )
        } else {
            return (
                <RedBox>Desconectado</RedBox>
            )
        }
    }

    console.log('userdata',userData.msgCadastro)



    return (
        <>
            <Header />

            <Body>


                <Container2>
                    <RenderConnected />
                    <ContainerRules>
                        <Typography style={{ fontWeight: '600', color: '#999592', fontSize: '14px', alignSelf: 'flex-start' }} >1. Ao adicionar novos usuários a plataforma eles apareceram ao controle </Typography>
                        <Typography style={{ fontWeight: '600', color: '#999592', fontSize: '14px', alignSelf: 'flex-start' }} >2. Avisar da recompra do medicamento, basta clicar em enviar mensagem</Typography>
                        <Typography style={{ fontWeight: '600', color: '#999592', fontSize: '14px', alignSelf: 'flex-start' }} >2. Abaixo podemos acompanhar doses restantes de cada paciente</Typography>

                    </ContainerRules>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }} >
                        <Typography style={{ fontWeight: 'bold', color: 'white', fontSize: '22px', alignSelf: 'flex-start' }} >Controle de medicações:</Typography>
                        <Input placeholder='Pesquisar...' value={filterValue} onChange={e => handleFilterChange(e)} />
                        <Paper sx={{ height: 400, width: '100%', alignSelf: 'flex-start' }}>
                            <DataGrid

                                rows={filteredData}
                                columns={columns}
                                initialState={{ pagination: { paginationModel } }}
                                pageSizeOptions={[10]}
                                checkboxSelection
                                sx={{ border: 0 }}
                                onRowSelectionModelChange={(newsData) => setDataRow(newsData)}
                                {...filteredData}
                            />
                        </Paper>
                        {
                            datarow ? (<Button style={{ alignSelf: 'flex-end', marginTop: 10 }} variant='contained' onClick={() => setSelectionItem()}>Enviar Mensagem</Button>

                            ) : <Button style={{ alignSelf: 'flex-end', marginTop: 10 }} variant='outlined' onClick={() => null}>Enviar Mensagem</Button>
                        }
                    </div>

                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon />}

                    >
                        {actions.map((action) => (

                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={() => handleChangeMenu(action.name)}
                            />
                        ))}
                    </SpeedDial>
                </Container2>




            </Body>



            <Modal
                open={openRegister}
                onClose={handleCloseRegister}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModalRegister} ref={listRef} >
                    <a
                        onClick={() => handleCloseRegister()}
                        style={{
                            fontSize: 19,
                            color: 'red',
                            cursor: 'pointer',
                            alignSelf: 'flex-end',
                            padding: 5,
                            border: '1px dotted red',
                            marginTop: 10
                        }}
                    >
                        X
                    </a>
                    <Typography id="modal-modal-title" variant="h6" style={{ fontWeight: 'bold', fontSize: 18 }} >
                        Dados para cadastro do Cliente/Paciente
                    </Typography>
                    <TextField id="outlined-basic-nome" label="Nome" onChange={text => setNomeInput(text.target.value)} fullWidth variant="outlined" />
                    <TextField id="outlined-basic-wpp" label="Whatsapp" onChange={text => setWppInput(text.target.value)} fullWidth variant="outlined" />
                    <TextField id="outlined-basic-cpf" label="CPF" fullWidth onChange={text => setCpfInput(text.target.value)} variant="outlined" />

                    {
                        remedioInput.map((response, remedioIndex) => (
                            <div key={remedioIndex} ref={remedioIndex === remedioInput.length - 1 ? listRef : null} >
                                <div style={{ width: "100%", display: 'flex' }}>
                                    <div style={{ width: "50%" }}>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            style={{
                                                fontWeight: '400',
                                                margin: 5,
                                                alignSelf: 'flex-start',
                                                fontSize: 12,
                                            }}
                                        >
                                            Remédio {remedioIndex + 1}:
                                        </Typography>
                                    </div>
                                    <div
                                        style={{
                                            width: "50%",
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: "flex-end",
                                            margin: 5,
                                        }}
                                    >
                                        <a
                                            onClick={() => removeTask(remedioIndex)}
                                            style={{
                                                fontSize: 13,
                                                color: 'red',
                                                cursor: 'pointer',
                                                alignSelf: 'flex-end',
                                                padding: 5,
                                                border: '1px solid red',
                                            }}
                                        >
                                            Excluir Remédio
                                        </a>
                                    </div>
                                </div>
                                <TextField
                                    id="outlined-basic-remedio"
                                    label="Nome do remédio"
                                    style={{ width: '100%' }}
                                    onChange={(text) =>
                                        handleInputChangeRemedio(response.remedio, text.target.value)
                                    }
                                    value={response.remedio}
                                    variant="outlined"
                                />
                                <TextField
                                    id="outlined-basic-remedio"
                                    label="Doses"
                                    style={{ width: '100%' }}
                                    onChange={(text) =>
                                        handleInputChangeDoses(response.remedio, text.target.value)
                                    }
                                    value={response.doses}
                                    variant="outlined"
                                />
                                {response.horario.map((horario, horarioIndex) => (
                                    <TextField
                                        key={horarioIndex}
                                        id={`outlined-basic-horario-${horarioIndex}`}
                                        label={`Horário ${horarioIndex + 1}`}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(text) =>
                                            handleInputChangehorario(
                                                response.remedio,
                                                horarioIndex,
                                                text.target.value
                                            )
                                        }
                                        value={horario.hora}
                                    />
                                ))}
                                <div style={{ flexDirection: 'row', display: 'flex', gap: 10,alignItems:'center',justifyContent:'center' }} >


                                    <BotaoAzul
                                        style={{ marginTop: 10, alignSelf: 'flex-start' }}
                                        variant="outlined"
                                        onClick={() => addHorario(remedioIndex)}
                                    >
                                        Adicionar Horário
                                    </BotaoAzul>
                                    <div style={{ display: "flex", flexDirection: "column" }} >
                                        <UploadButton htmlFor={`file-input-${remedioIndex}`}>Escolher uma Foto</UploadButton>
                                        <Input
                                            id={`file-input-${remedioIndex}`}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(remedioIndex, e)}
                                        />
                                        <ImageContainer>
                                            {response.foto ? (
                                                <>
                                                    <ImagePreview src={response.foto} alt="Pré-visualização da imagem" />
                                                    <RemoveButton onClick={() => handleRemoveImage(remedioIndex)}>
                                                        Remover Foto
                                                    </RemoveButton>
                                                </>
                                            ) : (
                                                <PlaceholderText></PlaceholderText>
                                            )}
                                        </ImageContainer>
                                    </div>

                                </div>
                                <div style={{ width: '97%', border: '1px dotted grey' }} />

                            </div>
                        ))
                    }
                    <Button style={{ marginTop: 10, }} variant='outlined' fullWidth onClick={() => addMedicacao()}>Adicionar Remédio</Button>



                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center" }} >
                        <Typography id="modal-modal-title" variant="h6" style={{ fontWeight: '500', fontSize: 14 }} >
                            Uso contínuo
                        </Typography>
                        <Checkbox {...label} id='checkcontinuo' onChange={value => setUsoContinuo(value.target.value)} />
                        {
                            usoContinuo == 'on' ? (
                                <TextField
                                    id="outlined-basic-remedio"
                                    label="Doses"
                                    style={{ width: '100%' }}
                                    onChange={(text) =>
                                        setInputUsoContinuo(text.target.value)
                                    }
                                    variant="outlined"
                                    value={inputUsocontinuo}
                                />
                            ) : null
                        }
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center" }} >
                        <Typography id="modal-modal-title" variant="h6" style={{ fontWeight: '500', fontSize: 14 }} >
                            Precisa de receita
                        </Typography>
                        <Checkbox {...label} id='checkreceita' onChange={value => setReceita(value.target.value)} />

                        {
                            receita == 'on' ? (
                                <TextField
                                    id="outlined-basic-remedio"
                                    label="Doses"
                                    style={{ width: '100%' }}
                                    onChange={(text) =>
                                        setInputReceita(text.target.value)
                                    }
                                    variant="outlined"
                                    value={inputReceita}
                                />
                            ) : null
                        }
                    </div>

                {
                    loadRegisterClient && (
                      <CircularProgress />
                    ) 
                }

{
                    !loadRegisterClient && (
                        <Button
                        style={buttonStyles}
                        variant="contained"
                        onClick={() => setNewClient()}
                    >
                        Cadastrar
                    </Button>
                    ) 
                }
                   
                </Box>
            </Modal>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 7 }} >
                        <Typography id="modal-modal-title" variant="h6" style={{ fontWeight: 'bold', fontSize: 16 }} >
                            Enviar para:
                        </Typography>
                        {
                            filteredData.map((response) => (

                                <Typography id="modal-modal-title" style={{ fontWeight: '500', fontSize: 18, color: "" }} >
                                    {response.nome},
                                </Typography>

                            ))


                        }
                    </div>
                    <TextField id="outlined-basic-cpf" style={{ marginTop: 15 }} value={messageAll} label="Enviar para todos" onChange={text => setMessageAll(text.target.value)} placeholder='Mensagem' fullWidth variant="outlined" />

                    <Button style={{ marginTop: 10 }} variant='contained' fullWidth onClick={() => sendAll()}>Enviar</Button>


                </Box>
            </Modal>



        </>
    );
}

export default Measurement


/* 



   {
                            dataClientes.length > 0 ? (dataClientes.map((item) => {
                                if (item.nome) {
                                    return 
                                } else {
                                    return null
                                }
                            })) : (
                                <Typography style={{ fontWeight: '600', color: '#999592', fontSize: '14px', alignSelf: 'flex-start' }} > Nenhum usuário cadastrado </Typography>

                            )
                        }





                            <Container1>
                        <ContainerRules1>   <Typography style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: '#da4103', fontSize: '22px' }} >Estabelecimento: Drogasil</Typography>

                        </ContainerRules1>



                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%', gap: '40%' }} >
                            <Typography style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: 'white', fontSize: '22px' }} >Cadastros:</Typography>
                            <Button style={{ alignSelf: 'flex-end' }} onClick={handleOpenRegister} variant="outlined">Cadastrar</Button>
                        </div>





                     

                    </Container1>





   
    
*/
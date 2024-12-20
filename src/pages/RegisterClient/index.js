import * as React from 'react';
import { Input } from './styles';
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { sendMessageAll, setNewClient } from '../../services';
import base64 from 'base-64';
import "firebase/database";
import { dataInstance } from '../../services';
import styled from 'styled-components';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/database";
import { database } from '../../App';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const RegisterClient = () => {
    const navigate = useNavigate()
    const [datarow, setDataRow] = React.useState(false);
    const [messageAll, setMessageAll] = React.useState('');
    const [nomeInput, setNomeInput] = React.useState('');
    const [wppInput, setWppInput] = React.useState('');
    const [remedioInput, setRemedioInput] = React.useState([{ remedio: '', horario: [], doses: 0, foto: null }]);
    const [cpfInput, setCpfInput] = React.useState('');
    const [usoContinuo, setUsoContinuo] = React.useState('');
    const [receita, setReceita] = React.useState('');
    const [dataClientes, setDataClientes] = React.useState([]);
    const [time, setTime] = React.useState('');
    const [date, setDate] = React.useState('');
    const [filteredData, setFilteredData] = React.useState([]);
    const [filterValue, setFilterValue] = React.useState('');
    const [user, setUser] = React.useState({ email: 'alo' });
    const [novaData, setNovaData] = React.useState(null);
    const [clientForTime, setClientforTime] = React.useState([{ clientes: [] }]);
    const [checkForTime, setCheckforTime] = React.useState([{}]);
    const [connectednumber, setConnectedNumber] = React.useState(false);
    const [userData, setUserData] = React.useState('');
    const [inputUsocontinuo, setInputUsoContinuo] = React.useState('Sua medicação esta acabando lembre-se de comprar');
    const [inputReceita, setInputReceita] = React.useState('Sua medicaçãoe sta vencendo precisa de nova receia?');
    const listRef = React.useRef(null);

    const isMobile = useMediaQuery('(max-width:600px)');

    const buttonStyles = {
        marginBottom: 25,
        paddingTop: 7,
        width: isMobile ? '100%' : '60%',
        backgroundColor:'#007bff'
    };
    const UploadButton = styled.label`
              background-color: #007bff;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              font-size: 16px;
              max-height:50px;
              margin-top:10px;
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

            `;

    const ImagePreview = styled.img`
              max-width: 300px;
              max-height: 300px;
              border: 2px solid #ccc;
              border-radius: 10px;
            `;

    const PlaceholderText = styled.p`
              color: #555;
              font-size: 14px;
            
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
  color:rgb(8, 53, 68); /* Azul claro */
  border: 2px solidrgb(12, 51, 65); /* Azul claro */
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

    const paginationModel = { page: 0, pageSize: 5 };


    const handleImageUpload = (remedioIndex, event) => {
        console.log('EVENTTTTT:::', event)
        const file = event?.target?.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const updated = [...remedioInput];
                updated[remedioIndex].foto = reader.result; // Armazena a foto em base64
                setRemedioInput(updated);
            };
            reader.readAsDataURL(file);
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
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }, [user,console.log('MSG:::',userData.msgCadastro)])


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
        }, 4000);
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



    function setNewClient() {
        const database = getDatabase()
        if (wppInput == '' || nomeInput == '' || cpfInput == '') {
            window.alert('Complete os campos')
        } else {
            const body = {
                message: `${userData.msgCadastro}`,
                phone: `55${wppInput}`,
                delayMessage: 10
            }


            remedioInput.map((response) => {
                const horariosCount = response.horario.length
                const dosesCount = response.doses
                const acabaEmDias = dosesCount / horariosCount
                const hoje = new Date(); // Data atual
                const novaData = new Date(hoje); // Clona a data atual
                novaData.setDate(novaData.getDate() + acabaEmDias); // Adiciona os dias

                // Adiciona a data ao objeto response
                response.acabaEm = novaData.toLocaleDateString(); // Formata a data no formato local
                set(ref(database, `${base64.encode(user.email)}/clientes/${cpfInput}`), {

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
                    msgReceita: inputReceita
                }).then(responses => {

                    Object.values(response.horario).forEach(e => {
                        console.log('EEEEEEEEE:::::::::', e)
                        set(ref(database, `${base64.encode(user.email)}/clientes/${cpfInput}/horario/${e}`), {
                            hora: e
                        })


                    })
                    sendMessageAll(body)
                }

                )

            })



        }
        navigate('/measure')
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
                handleOpenRegister()
                console.log('ok')
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
                    delayMessage: 10
                }

                const response = sendMessageAll(body)
                return response
            })
        } catch (error) {
            console.log('ERROR TRYCATCH::::::::')
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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding:4,justifyContent: 'center',gap:6 }} ref={listRef} >
            <a
                onClick={() => navigate('/measure')}
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
            <TextField id="outlined-basic-nome" value={nomeInput} label="Nome" onChange={text => setNomeInput(text.target.value)} fullWidth variant="outlined" />
            <TextField id="outlined-basic-wpp" value={wppInput} label="Whatsapp" onChange={text => setWppInput(text.target.value)} fullWidth variant="outlined" />
            <TextField id="outlined-basic-cpf" value={cpfInput} label="CPF" fullWidth onChange={text => setCpfInput(text.target.value)} variant="outlined" />

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
                                        color: 'blue',
                                        cursor: 'pointer',
                                        alignSelf: 'flex-end',
                                        padding: 5,
                                        border: '1px solid blue',
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
                        <div style={{ flexDirection: 'row', display: 'flex', gap: 15,alignItems:'center',justifyContent:'center',padding:10 }} >


                            <BotaoAzul
                                style={{ marginTop: 10, alignSelf: 'flex-start' }}
                                variant="outlined"
                                onClick={() => addHorario(remedioIndex)}
                            >
                                Adicionar Horário
                            </BotaoAzul>
                       
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

                        <div style={{ width: '97%', border: '1px dotted grey' }} />

                    </div>
                ))
            }
            <Button style={{ marginTop: 10, borderColor:'blue',color:"blue"}} variant='outlined' fullWidth onClick={() => addMedicacao()}>Adicionar Remédio</Button>



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


            <Button
                style={buttonStyles}
                variant="contained"
                onClick={() => setNewClient()}
            >
                Cadastrar
            </Button>
        </Box>
    );
}

export default RegisterClient;


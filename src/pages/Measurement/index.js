import * as React from 'react';
import { Body, ContainerRules, Input, Container2, ContainerEditAccordion } from './styles';
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
import { sendMessageAll, setNewClient } from '../../services';
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
    height: '97%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
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
    { icon: <ListAltOutlined />, name: 'Ver Todos' },

];



const Measurement = () => {
    const [open, setOpen] = React.useState(false);
    const [openRegister, setOpenRegister] = React.useState(false);
    const [openList, setOpenList] = React.useState(false);
    const [datarow, setDataRow] = React.useState(false);
    const [datarowSelection, setDataRowSelection] = React.useState('');
    const [messageAll, setMessageAll] = React.useState('');
    const [nomeInput, setNomeInput] = React.useState('');
    const [wppInput, setWppInput] = React.useState('');
    const [remedioInput, setRemedioInput] = React.useState([{ remedio: '', horario: [], doses: 0 }]);
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
    const listaRef = React.useRef(null);
    const [novaData, setNovaData] = React.useState(null);
    const [clientForTime, setClientforTime] = React.useState([{ clientes: [] }]);
    const [checkForTime, setCheckforTime] = React.useState([{}]);




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
        if (listaRef.current) {
            listaRef.current.scrollTop = listaRef.current.scrollHeight;
        }
    }, [remedioInput]); // Atualiza sempre que 'items' mudar

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
                        farmaceutico: data[key].farmaceutico,
                        horario: data[key].horario,
                        dataCadastro: data[key].dataCadastro
                    }));
                    setFilteredData(dataList);
                    setDataClientes(dataList);

                } else {
                    return null // Define uma lista vazia caso não haja dados
                }
            });
        } else {
            return null
        }

    }, [user])


    React.useEffect(() => {
        const dbRef = ref(database, `/`); // Referência para a coleção 'clientes'

    

            const intervalo = setInterval(() => {
                const unsubscribe = onValue(dbRef, (snapshot) => {
                    const data = snapshot.val();
                    console.log('ITEM1::::::::',data)
                    if (data) {
                        const dataList = Object.keys(data).map((key) => ({
                            id: key,
                            clientes:data[key].clientes
                        }));
                        setClientforTime(dataList);

                  
                    
    
                    }else {
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
        if (clientForTime) {
            clientForTime.forEach(client => {
                if (client.clientes) {
                    Object.values(client.clientes).forEach(cliente => {
                        Object.values(cliente.horario).forEach(clienteT => {
                            const agora = new Date();
                            const horas = String(agora.getHours()).padStart(2, "0");
                            const minutos = String(agora.getMinutes()).padStart(2, "0");
                            if(clienteT.hora == `${horas}:${minutos}`){
                              
                                    const body = {
                                        message: `Olá Está no horário da sua medicação ${cliente.remedio}, lembre-se, Medicações devem seguir o horário a risca`,
                                        phone: `55${cliente.contato}`,
                                        delayMessage: 10
                                    }
                                    console.log('ENVIARMENSAGEM::::',cliente.contato)
                                     sendMessageAll(body)
                                
                                }


                            
                       });
                    });
                }
            });
        }
    }, [clientForTime]);



    function setNewClient() {
        const database = getDatabase()
        if (wppInput == '' || nomeInput == '' || cpfInput == '') {
            window.alert('Complete os campos')
        } else {

            const body = {
                message: 'Olá vimos que acabou de fazer registro para receber horários das suas medicações,no horário extao você será lembrado',
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
                set(ref(database, `${base64.encode(user.email)}/clientes/${nomeInput}${response.remedio}`), {

                    acabaEm: response.acabaEm,
                    nome: nomeInput,
                    contato: wppInput,
                    remedio: response.remedio,
                    doses: response.doses,
                    cpf: cpfInput,
                    receita: receita,
                    usoContinuo: usoContinuo,
                    farmaceutico: farmaceutico,
                    horario: time,
                    dataCadastro: date
                }).then(responses => {
                    handleCloseRegister()
                    response.horario.map(e => {
                        console.log('EEEEEEEEE:::::::::',e)
                        set(ref(database, `${base64.encode(user.email)}/clientes/${nomeInput}${response.remedio}/horario/${e}`), {
                            hora: e
                        }).then(i => sendMessageAll(body))
                    })

                })
            })

        }


    }

    const addMedicacao = () => {
        setRemedioInput([...remedioInput, { horario: [{ hora: '10:00' }], remedio: '' }]);
    };

    const addHorario = (index) => {
        setRemedioInput((prevState) =>
            prevState.map((item, i) =>
                i === index
                    ? { ...item, horario: [...item.horario, { hora: '' }] }
                    : item
            )
        );
    };

    const handleChangeMenu = (event) => {
        if (event = 'Cadastrar Cliente') {
            handleOpenRegister()
            console.log('ok')
        } else {
            return null
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
            item.remedio.toLowerCase().includes(value)
        );

        setFilteredData(filtered); // Atualiza os dados filtrados
    };
    console.log('FILTERED:::::',)


    return (
        <>
            <Header />

            <Body>


                <Container2>
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
                <Box sx={styleModalRegister} ref={listaRef} >
                    <a
                        onClick={() => handleCloseRegister()}
                        style={{
                            fontSize: 19,
                            color: 'red',
                            cursor: 'pointer',
                            alignSelf: 'flex-end',
                            padding: 5,
                            border: '1px dotted red',
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
                            <div key={remedioIndex}>
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
                                <Button
                                    style={{ marginTop: 10, alignSelf: 'flex-start' }}
                                    variant="outlined"
                                    onClick={() => addHorario(remedioIndex)}
                                >
                                    Adicionar Horário
                                </Button>
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
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center" }} >
                        <Typography id="modal-modal-title" variant="h6" style={{ fontWeight: '500', fontSize: 14 }} >
                            Precisa de receita
                        </Typography>
                        <Checkbox {...label} id='checkreceita' onChange={value => setReceita(value.target.value)} />
                    </div>


                    <Button style={{ marginTop: 10 }} variant='contained' fullWidth onClick={() => setNewClient()}>Enviar</Button>

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
                                    return <Accordion defaultExpanded style={{ alignSelf: 'flex-start', width: 450 }} >
                                        <AccordionSummary
                                            expandIcon={<ArrowDownwardIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <Typography>{item.nome}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails  >

                                            <Typography style={{ fontWeight: 'bold' }} >
                                                Medicações:
                                            </Typography>
                                            <Typography style={{ marginTop: 12 }} >
                                                {item.remedio} <br />
                                            </Typography>

                                            <Typography style={{ fontWeight: 'bold', marginTop: 12 }} >  Horários: </Typography>
                                            <Typography >
                                                {item.remedio} ({item.horario}) <br /> 
                                            </Typography>

                                            <Typography style={{ fontWeight: 'bold', marginTop: 12 }} >
                                                Contato:
                                            </Typography>
                                            <Typography>
                                                {item.whatsapp} <br />
                                            </Typography>

                                            <Typography style={{ fontWeight: 'bold', marginTop: 12 }} >
                                                Data do registro:
                                            </Typography>
                                            <Typography>
                                                06/11/2024 <br />
                                            </Typography>

                                            <Typography style={{ fontWeight: 'bold', marginTop: 12 }} >
                                                Cadastrado por:
                                            </Typography>
                                            <Typography>
                                                {item.farmaceutico}<br />
                                            </Typography>
                                            <ContainerEditAccordion>
                                                <Typography style={{ fontWeight: '600', color: 'blue', cursor: 'pointer' }} >
                                                    Editar
                                                </Typography>
                                            </ContainerEditAccordion>

                                        </AccordionDetails>
                                    </Accordion>
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
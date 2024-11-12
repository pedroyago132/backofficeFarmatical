import * as React from 'react';
import { Body, ContainerRules, ContainerRules1, ContainerDisplay, Container1, Container2, ContainerEditAccordion } from './styles';
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
    const [remedioInput, setRemedioInput] = React.useState([{ horario: '', remedio: '' }]);
    const [cpfInput, setCpfInput] = React.useState('');
    const [usoContinuo, setUsoContinuo] = React.useState('');
    const [receita, setReceita] = React.useState('');
    const [farmaceutico, setFarmaceutico] = React.useState('');
    const [dataClientes, setDataClientes] = React.useState([]);
    const [dataClientesSelecionados, setDataClientesSelecionados] = React.useState([]);
    const [time, setTime] = React.useState('');
    const [formattedTime, setFormattedTime] = React.useState('');
    const [date, setDate] = React.useState('');



    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenRegister = () => setOpenRegister(true);
    const handleCloseRegister = () => setOpenRegister(false);

    const handleOpenList = () => setOpenList(true);
    const handleCloseList = () => setOpenList(false);
    const columns = [

        { field: 'firstName', headerName: 'Nome', width: 130 },
        { field: 'remedio', headerName: 'Remédio', width: 150 },
        { field: 'contato', headerName: 'Contato', width: 130 },
        { field: 'registro', headerName: 'Registrado em', width: 130 },
        { field: 'doses', headerName: 'Doses restantes', width: 130 },

    ];

    const encodePhone = base64.encode(wppInput)

    const paginationModel = { page: 0, pageSize: 5 };

    const rows = [
        { id: 1, remedio: 'Buscopan', firstName: 'Pedro', contato: 61999273537, registro: '06/11/2024', doses: 5 },
        { id: 2, remedio: 'Reuquinol', firstName: 'Thiago', contato: 61999273537, registro: '04/11/2024', doses: 32 },
        { id: 3, remedio: 'Risperidona', firstName: 'João', contato: 61999273537, registro: '02/11/2024', doses: 20 },
        { id: 4, remedio: 'Aprazolan', firstName: 'Lorena', contato: 61999273537, registro: '01/11/2024', doses: 15 },
        { id: 5, remedio: 'Rivotril', firstName: 'Luana', contato: 61999273537, registro: '09/11/2024', doses: 11 },

    ];



    function setSelectionItem() {
        handleOpen();
        // Mapeia e filtra os dados e os achata em um único array
        const selectedData = datarow.map((value, indexS) => {
            let newIndex = value - 1;
            return rows.filter((_, index) => newIndex === index);
        }).flat(); // Achata o array para evitar arrays aninhados

        console.log('AAAAAAAA;;;;;;;',selectedData)
        setDataClientesSelecionados(selectedData)

    }

    React.useEffect(() => {

        const dbRef = ref(database, 'clientes'); // Referência para a coleção 'clientes'

        // Escuta mudanças em tempo real
        const unsubscribe = onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataList = Object.keys(data).map((key) => ({
                    id: key,
                    nome: data[key].nome,
                    cpf: data[key].cpf,
                    whatsapp: data[key].whatsapp,
                    remedio: data[key].remedio,
                    receita: data[key].receita,
                    usoContinuo: data[key].usoContinuo,
                    farmaceutico: data[key].farmaceutico,
                    horario: data[key].horario,
                    dataCadastro: data[key].dataCadastro
                }));
                setDataClientes(dataList);
            } else {
                setDataClientes([]); // Define uma lista vazia caso não haja dados
            }
        });

        // Limpeza do listener ao desmontar o componente
        return () => unsubscribe();
    }, [])


    React.useEffect(() => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        setDate(`${month}/${date}/${year}`);
    }, [])


    console.log('aaaaaaaaaa::::::', dataClientesSelecionados)

    function setNewClient() {
        const database = getDatabase()
        if (wppInput == '' || nomeInput == '' || cpfInput == '' || farmaceutico == '') {
            window.alert('Complete os campos')
        } else {
            set(ref(database, `clientes/${encodePhone}`), {
                nome: nomeInput,
                whatsapp: wppInput,
                cpf: cpfInput,
                receita: receita,
                usoContinuo: usoContinuo,
                farmaceutico: farmaceutico,
                horario: time,
                dataCadastro: date
            });
        }


    }

    const addMedicacao = () => {
        setRemedioInput([...remedioInput, { horario: '', remedio: '' }]);
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

    const handleInputChangehorario = (remedioInput1, newValue) => {
        setRemedioInput(remedioInput.map(input => {

            if (newValue.length <= 5) {
                // Aplica a formatação, separando a hora e os minutos
                const formatted = newValue.replace(/^(\d{2})(\d{2})$/, '$1:$2');
                if (input.remedio === remedioInput1) {
                    return { ...input, horario: formatted }
                } else return input
            }
        }));
    };


    const removeTask = (index) => {
        const newsInputs = remedioInput.filter((_, i) => i !== index);
        setRemedioInput(newsInputs);
    };

    async function sendAll() {
        const body = {
            message: messageAll,
            phone: '5512981166911',
            delayMessage: 10
        }
    
            const promisses = dataClientesSelecionados.map(item => {
                 sendMessageAll(body)
            })

           await  Promise.all(promisses)
                .then(response => console.log('Sucessooo',response)) // ["Concluída em 1000", "Rejeitada em 2000", "Concluída em 3000"]
                .catch(error => console.log(`Erro ao executar ${error}`))
      

    }

    console.log(dataClientesSelecionados)

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

                        <Paper sx={{ height: 400, width: '100%', alignSelf: 'flex-start' }}>
                            <DataGrid

                                rows={rows}
                                columns={columns}
                                initialState={{ pagination: { paginationModel } }}
                                pageSizeOptions={[10]}
                                checkboxSelection
                                sx={{ border: 0 }}
                                rowSelection={(newsdata) => setDataRowSelection(newsdata)}
                                onRowSelectionModelChange={(newsData) => setDataRow(newsData)}
                                {...rows}
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
                <Box sx={styleModalRegister}>
                    <Typography id="modal-modal-title" variant="h6" style={{ fontWeight: 'bold', fontSize: 18 }} >
                        Dados para cadastro do Cliente/Paciente
                    </Typography>
                    <TextField id="outlined-basic-nome" label="Nome" onChange={text => setNomeInput(text.target.value)} fullWidth variant="outlined" />
                    <TextField id="outlined-basic-wpp" label="Whatsapp" onChange={text => setWppInput(text.target.value)} fullWidth variant="outlined" />
                    <TextField id="outlined-basic-cpf" label="CPF" fullWidth onChange={text => setCpfInput(text.target.value)} variant="outlined" />

                    {
                        remedioInput.map((response, index) => <>
                            <div style={{ width: "100%", display: 'flex' }} >
                                <div style={{ width: "50%" }} >
                                    <Typography id="modal-modal-title" variant="h6" style={{ fontWeight: '400', margin: 5, alignSelf: 'flex-start', fontSize: 12 }} >
                                        Medicação:
                                    </Typography>
                                </div>
                                <div style={{ width: "50%", display: 'flex', alignItems: 'center', justifyContent: "flex-end", margin: 5 }} >
                                    <a onClick={() => removeTask(index)} style={{ fontSize: 13, color: 'red', cursor: 'pointer', alignSelf: 'flex-end', padding: 5, border: '1px solid red' }} >Excluir</a>

                                </div>

                            </div>
                            <TextField id="outlined-basic-remedio" label="Nome do remédio" fullWidth onChange={text => handleInputChangeRemedio(response.remedio, text.target.value)} value={response.remedio} variant="outlined" />
                            <TextField id="outlined-basic-horario" label="Horário" fullWidth variant="outlined" onChange={text => handleInputChangehorario(response.remedio, text.target.value)} value={response.horario} />
                        </>
                        )
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
                            dataClientesSelecionados.map((response) => (

                                <Typography id="modal-modal-title" style={{ fontWeight: '500', fontSize: 18, color: "" }} >
                                    {response.firstName},
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
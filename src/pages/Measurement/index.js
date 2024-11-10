import * as React from 'react';
import { Body, ContainerRules,ContainerRules1 ,ContainerDisplay, Container1, Container2, ContainerEditAccordion } from './styles';
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
import { setNewClient } from '../../services';
import base64 from 'base-64';


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
    height: '75%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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





const Measurement = () => {
    const [open, setOpen] = React.useState(false);
    const [openRegister, setOpenRegister] = React.useState(false);
    const [datarow, setDataRow] = React.useState(false);
    const [nomeInput, setNomeInput] = React.useState(false);
    const [wppInput, setWppInput] = React.useState(false);
    const [remedioInput, setRemedioInput] = React.useState(false);
    const [cpfInput, setCpfInput] = React.useState(false);
    const [usoContinuo, setUsoContinuo] = React.useState(false);
    const [receita, setReceita] = React.useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenRegister = () => setOpenRegister(true);
    const handleCloseRegister = () => setOpenRegister(false);
    const columns = [

        { field: 'firstName', headerName: 'Nome', width: 130 },
        { field: 'remedio', headerName: 'Remédio', width: 100 },
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

    function sendFormCliente() {
        if (!wppInput || !cpfInput || !nomeInput) {

        }
    }



    return (
        <>
            <Header />

            <Body>


                <ContainerDisplay>

                    <Container1>
                     <ContainerRules1>   <Typography style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: '#da4103', fontSize: '22px' }} >Estabelecimento: Drogasil</Typography>
                          
                            </ContainerRules1>   



                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%', gap: '40%' }} >
                            <Typography style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: 'white', fontSize: '22px' }} >Cadastros:</Typography>
                            <Button style={{ alignSelf: 'flex-end' }} onClick={handleOpenRegister} variant="outlined">Cadastrar</Button>
                        </div>

                        <Accordion defaultExpanded style={{ alignSelf: 'flex-start', width: 450 }} >
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography>Pedro Yago</Typography>
                            </AccordionSummary>
                            <AccordionDetails  >

                                <Typography style={{ fontWeight: 'bold' }} >
                                    Medicações:
                                </Typography>
                                <Typography style={{ marginTop: 12 }} >
                                    Reuquinol 15mg , Aprazolan 20mg <br />
                                </Typography>

                                <Typography style={{ fontWeight: 'bold', marginTop: 12 }} >  Horários: </Typography>
                                <Typography >
                                    Reuquinol 15mg (9:00 - 18:00 - 22:00) <br /> Aprazolan 20mg (9:00 - 18:00 - 22:00)
                                </Typography>

                                <Typography style={{ fontWeight: 'bold', marginTop: 12 }} >
                                    Contato:
                                </Typography>
                                <Typography>
                                    61-999273537 <br />
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
                                    Rodrigo Santos<br />
                                </Typography>
                                <ContainerEditAccordion>
                                    <Typography style={{ fontWeight: '600', color: 'blue', cursor: 'pointer' }} >
                                        Editar
                                    </Typography>
                                </ContainerEditAccordion>

                            </AccordionDetails>
                        </Accordion>






                    </Container1>


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
                                    onRowSelectionModelChange={(newsData) => setDataRow(newsData)}
                                    {...rows}
                                />
                            </Paper>
                            <Button style={{ alignSelf: 'flex-end', marginTop: 10 }} variant='contained' onClick={handleOpen}>Enviar Mensagem</Button>
                        </div>
                    </Container2>



                </ContainerDisplay>

            </Body>



            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" style={{ fontWeight: 'bold', fontSize: 18 }} >
                        Enviar para:
                    </Typography>
                    <br />
                    <TextField
                        id="outlined-textarea"
                        label="Mensagem"
                        placeholder="Enviar para todos"
                        multiline
                        fullWidth
                    />

                    <Button style={{ alignSelf: 'flex-end', marginRight: '15%', marginTop: 10 }} variant='contained' fullWidth onClick={handleOpen}>Enviar</Button>

                </Box>
            </Modal>


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
                    <TextField id="outlined-basic" label="Nome" onChange={text => setNomeInput(text.target.value)} fullWidth variant="outlined" />
                    <TextField id="outlined-basic" label="Whatsapp" onChange={text => setWppInput(text.target.value)} fullWidth variant="outlined" />
                    <TextField id="outlined-basic" label="CPF" fullWidth onChange={text => setCpfInput(text.target.value)} variant="outlined" />
                    <TextField id="outlined-basic" label="Nome do remédio" fullWidth onChange={text => setRemedioInput(text.target.value)} variant="outlined" />
                    <TextField id="outlined-basic" label="Doses" fullWidth variant="outlined" />

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center" }} >
                        <Typography id="modal-modal-title" variant="h6" style={{ fontWeight: '500', fontSize: 14 }} >
                            Uso contínuo
                        </Typography>
                        <Checkbox {...label} onChange={setUsoContinuo} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center" }} >
                        <Typography id="modal-modal-title" variant="h6" style={{ fontWeight: '500', fontSize: 14 }} >
                            Precisa de receita
                        </Typography>
                        <Checkbox {...label} onChange={setReceita} />
                    </div>


                    <Button style={{ marginTop: 10 }} variant='contained' fullWidth onClick={() => setNewClient(encodePhone, nomeInput, cpfInput, remedioInput, receita, usoContinuo, wppInput)}>Enviar</Button>

                    <TextField id="filled" label="Farmacêutico responsável" style={{ marginTop: 7 }} fullWidth variant="filled" />


                </Box>
            </Modal>
        </>
    );
}

export default Measurement



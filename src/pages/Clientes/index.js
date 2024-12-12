import * as React from 'react';
import { PageContainer, SubTitle, FormContainer, ContainerEditAccordion, Title, TitleForm } from './styles';
import { useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";
import { getDatabase, ref, child, push, update } from "firebase/database";
import Button from '@mui/material/Button';
import "firebase/database";
import TextField from '@mui/material/TextField';
import Header from '../../components/Header';
import base64 from 'base-64';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { onValue } from "firebase/database";
import { database } from '../../App';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import "firebase/database";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Clientes = () => {
    const navigate = useNavigate()
    const [openRegister, setOpenRegister] = React.useState(false);
    const [user, setUser] = React.useState({ email: 'alo' });
    const [qrCode, setQRCode] = React.useState(false);
    const [dataClientes, setDataClientes] = React.useState([]);
    const [itemCliente, setItemCliente] = React.useState([{nome:'',contato:0}]);
    const listaRef = React.useRef(null);
    const [remedioInput, setRemedioInput] = React.useState([{ remedio: '', horario: [], doses: 0 }]);


    const [nomeInput, setNomeInput] = React.useState('');
    const [wppInput, setWppInput] = React.useState('');

    const [cpfInput, setCpfInput] = React.useState('');
    const [usoContinuo, setUsoContinuo] = React.useState('');
    const [receita, setReceita] = React.useState('');
 
  




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


    const handleOpenRegister = (item) => {
        setOpenRegister(true)
        setItemCliente(item)
    }
    const handleCloseRegister = () => setOpenRegister(false);

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
            const dbRef = ref(database, `${base64.encode(user.email)}/clientes`);
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
                     
                        horario: data[key].horario,
                        dataCadastro: data[key].dataCadastro,
                    }));
                    setDataClientes(dataList);
                } else {
                    setDataClientes([]);
                }
            });
    
            return unsubscribe; // Retorna a função de limpeza
        }
    }, [user]);



    function writeNewPost() {
        const email64 = base64.encode(user.email);
        const db = getDatabase();
    
        // Cria uma entrada de post.
        const postData = {
            nome: nomeInput || itemCliente.nome,
            cpf: cpfInput || itemCliente.cpf,
            contato: wppInput || itemCliente.contato,
            acabaEm: itemCliente.acabaEm,
            doses: remedioInput[0]?.doses || itemCliente.doses, // Acessa o primeiro item do array
            remedio: remedioInput[0]?.remedio || itemCliente.remedio, // Acessa o primeiro item do array
            horario: itemCliente.horario || remedioInput[0]?.horario  , // Acessa o primeiro item do array
            dataCadastro: itemCliente.dataCadastro,
            receita: true,
            usoContinuo: itemCliente.usoContinuo,
           
        };
    
        console.log("remedioInput", itemCliente);
        console.log("postData", postData);
    
        // Obtem uma chave para o novo post.
        const newPostKey = push(child(ref(db), '/')).key;
    
        // Atualiza os dados no banco, usando a chave gerada como índice.
        const updates = {};
        updates[`${email64}/clientes/${itemCliente.nome}${itemCliente.remedio}`] = postData;
    
        return update(ref(db), updates)
            .then(() => window.alert('Alterado com sucesso!!'))
            .catch((log) => console.log('ERROREDITUSER:::::', log));
    }
    
    


    return (
        <>
            <Header />
            <PageContainer>
                <FormContainer>

                    <Title>Aqui você verá a lista de seus clientes</Title>
                    <SubTitle>Edite dados caso precise</SubTitle>
                   


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
                            <TextField id="outlined-basic-nome"  label="Nome" onChange={text => setNomeInput(text.target.value)} fullWidth variant="outlined" />
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


                            <Button style={{ marginTop: 10 }} variant='contained' fullWidth onClick={() => writeNewPost()}>Enviar</Button>

                        </Box>
                    </Modal>


                </FormContainer>
            </PageContainer>
        </>
    );
}

export default Clientes;


import * as React from 'react';
import { Container, Input, Title,FormControl, Logo, SubTitle, Body, Container1, ImageBackground } from './styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import TextField from '@mui/material/TextField';

const Home = () => {
    const [emailInput, setEmailInput] = React.useState(false);
    const [senhaInput, setSenha] = React.useState(false);
    const [state, setState] = React.useState({
        open: false,
        vertical: 'right',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const navigate = useNavigate();

    const handleClick = (newState) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const goMeansure = () => {
        if (!emailInput  || !senhaInput) {
            window.alert('Insira os campos de usuári e senha')
        } else {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, emailInput, senhaInput)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log('LOGIN::::::::',user)
                    navigate('/measure')
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    window.alert('Verifique Usuário e senha')
                });
        }
    };

 

    return (
        <>
            <Body>
                <Container>
                  
                    <FormControl  color='primary'  >
                    <Logo src='/Logo.png' alt='id' />
                    <Title>
                        Sistema para agendamentos de Rodrigo Santos
                    </Title>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Email"
                            multiline
                            fullWidth
                            maxRows={4}
                            variant='outlined'
                            placeholder='Insira seu Email'
                            onChange={text => setEmailInput(text.target.value)}
                        />

                        <TextField
                            id="outlined-multiline-flexibl1"
                            label="Senha"
                            fullWidth
                            multiline
                            maxRows={4}
                            variant='outlined'
                            placeholder='Senha'
                            onChange={text => setSenha(text.target.value)}

                        />
                        <Button style={{ alignSelf: 'center' }} onClick={() => goMeansure()} variant="contained">Entrar</Button>
                       
                    <div style={{display:'flex',gap:7}} >
                    <SubTitle   >
                        Ainda não tem uma conta? 
                    </SubTitle>
                    <a  style={{fontWeight:'bold', fontSize:16, cursor:'pointer'}} onClick={() => navigate('/registro')} >
                     Clique Aqui
                    </a>
                    </div>
                    </FormControl>
                

                </Container>
                <Container1>
                    <ImageBackground id='logoa' src='/medical.png' />
                </Container1>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message="Erro ao efetuar Login"
                    key={vertical + horizontal}
                />
            </Body>
        </>
    );
}

export default Home


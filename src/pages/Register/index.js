import * as React from 'react';
import { Container, Input, Title, Logo, SubTitle,Body,Container1,ImageBackground } from './styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import { Wallet } from '@mercadopago/sdk-react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import "firebase/database";
import base64 from 'base-64'

const Register = () => {
    const [cnpjInput, setCnpjInput] = React.useState('');
    const [razaoSocial, setRazaoSocial] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const [senhaInput, setSenhaInput] = React.useState('');
    const [confirmarSenhaInput, setConfirmarSenhaInput] = React.useState('');
    const [contatoInput, setContato] = React.useState('');

    const navigate = useNavigate();


    const register = () => {
       
      
        if(!emailInput  || !razaoSocial  || !cnpjInput && senhaInput != confirmarSenhaInput ){
            window.alert('Complete os campos')
        } else {
            const auth = getAuth();
            const database = getDatabase()
            const encodeEmail = base64.encode(emailInput)
            createUserWithEmailAndPassword(auth, emailInput, senhaInput)
              .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                window.alert('Usuário criado com sucesso')
                navigate('/')
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                window.alert('Falha, seguinte error',errorMessage)
                // ..
              });

              set(ref(database, `${encodeEmail}/clientes`), {
                
               }).then(log => null).catch(log => null)
        }
    }

    console.log(senhaInput,confirmarSenhaInput)
    return (

        <Body>
            <Title>
                Crie agora sua conta em nossa plataforma
            </Title>
            <SubTitle>
                Você esta há 1 passo para a fidelização dos seus clientes, aproveite já o poder da nossa ferramenta
            </SubTitle>

            <Input
                        id="outlined-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant='outlined'
                        placeholder='Insira seu Email'
                        value={emailInput}
                        onChange={text => setEmailInput(text.target.value)}
                    />
      

<Input
                        id="outlined-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        value={contatoInput}
                        variant='outlined'
                        placeholder='Telefone para contato ( WhatsApp )'
                        onChange={text => setContato(text.target.value)}
                    />



<Input
                        id="outlined-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant='outlined'
                        value={razaoSocial}
                        placeholder='Razão social'
                        onChange={text => setRazaoSocial(text.target.value)}
                    />

<Input
                        id="outlined-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant='outlined'
                        value={cnpjInput}
                        placeholder='CNPJ'
                        onChange={text => setCnpjInput(text.target.value)}
                    />

<Input
                        id="outlined-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant='outlined'
                        value={senhaInput}
                        placeholder='Senha'
                        onChange={text => setSenhaInput(text.target.value)}
                    />

<Input
                        id="outlined-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant='outlined'
                        value={confirmarSenhaInput}
                        placeholder='Confirme sua senha'
                        onChange={text => setConfirmarSenhaInput(text.target.value)}
                    />

<Button style={{ marginTop: 10 }} variant='contained'  onClick={() => register()}>Cadastrar</Button>     
   </Body>
    
    );
}

export default Register


import * as React from 'react';
import { Container, Input, Title, Logo, SubTitle, Body, Container1, ImageBackground, FormControl } from './styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import "firebase/database";
import base64 from 'base-64'
import { createInstance } from '../../services';
import CircularProgress from '@mui/material/CircularProgress';

const Register = () => {
  const [cnpjInput, setCnpjInput] = React.useState('');
  const [razaoSocial, setRazaoSocial] = React.useState('');
  const [emailInput, setEmailInput] = React.useState('');
  const [senhaInput, setSenhaInput] = React.useState('');
  const [confirmarSenhaInput, setConfirmarSenhaInput] = React.useState('');
  const [contatoInput, setContato] = React.useState('');
  const [progressive, setProgressive] = React.useState(false);

  const navigate = useNavigate();


  const RenderProgressive = () => {
     if(progressive){
       return (
       <CircularProgress size={37} />
       )
     } else {
       return (
        <Button style={{ marginTop: 10 }} variant='contained' onClick={() => register()}>Cadastrar</Button>
       )
     }
  }

  async function register() {
   
    try {
      if (!emailInput || !razaoSocial || !cnpjInput && senhaInput != confirmarSenhaInput) {
        window.alert('Complete os campos')
      } else {
        navigate('/payment',{emailInput,senhaInput})
      }
    } catch (error) {
      window.alert('ERRO:', error)
    }

  }

  console.log(senhaInput, confirmarSenhaInput)
  return (

    <Body>
      <FormControl>
      <Title>
        Crie agora sua conta em nossa plataforma
      </Title>
      <SubTitle>
        Você esta há 1 passo para a fidelização dos seus clientes
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

     <RenderProgressive />
      </FormControl>
    </Body>

  );
}

export default Register


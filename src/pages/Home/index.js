import * as React from 'react';
import { Container, Input, Title, Logo, SubTitle } from './styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

const Home = () => {
    const [emailInput, setEmailInput] = React.useState(false);
    const [senhaInput, setSenha] = React.useState(false);
    const navigate = useNavigate();
    const goMeansure = () => {
        if(emailInput == 'rodrigofarmaciashd9@gmail.com' && senhaInput == 'senha123'){
            navigate('/measure');
        }else {
            window.alert('Verifique seu usuário ou Senha')
        }
    };

    return (
        <>
            <Container>
                <Logo src='/Logo.png' alt='id' />
                <SubTitle>
                    Project virtual items to reality in real proportions
                </SubTitle>
                <FormControl variant='standard' color='primary' sx={{gap:3}} >
                    <Input
                        id="outlined-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant='outlined'
                        placeholder='Insira seu Email'
                        onChange={text => setEmailInput(text.target.value)}
                    />

                    <Input
                        id="outlined-multiline-flexibl1"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant='outlined'
                     placeholder='Senha'
                     onChange={text => setSenha(text.target.value)}
                       
                    />
                    <Button style={{ alignSelf: 'center' }} onClick={() => goMeansure()} variant="contained">Entrar</Button>

                    </FormControl>
              
            </Container>

        </>
    );
}

export default Home


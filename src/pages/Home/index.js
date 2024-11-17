import * as React from 'react';
import { Container, Input, Title, Logo, SubTitle,Body,Container1,ImageBackground } from './styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';

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
        if(emailInput == 'rodrigofarmaciashd9@gmail.com'  || emailInput == 'kevingeraldo2011@gmail.com'  && senhaInput == 'senha123' || senhaInput == 'kevin123456' ){
            navigate('/measure');
        }else {
            handleClick({ vertical: 'top', horizontal: 'right' })
        }
    };

    return (
        <>
        <Body>
            <Container>
                <Logo src='/Logo.png' alt='id' />
                <SubTitle>
                    Sitema agendamentos de Rodrigo Santos
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
            <Container1>
                <ImageBackground id='logoa' src='/medical.png'  />
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


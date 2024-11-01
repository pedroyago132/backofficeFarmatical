import * as React from 'react';
import { Container, Button, TitleButton, Title, ContainerButton, SubTitle } from './styles';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';


const Home = () => {
 
    const navigate = useNavigate();
    const goMeansure = () => {
        navigate('/measure');
    };

    return (
     <>
        <Container>
            <Title>
                Sizer
            </Title>
            <SubTitle>
                Project virtual items to reality in real proportions
            </SubTitle>
            <ContainerButton>
                <Button >
                    <TitleButton>
                        Modelling
                    </TitleButton>
                </Button>

                <Button onClick={() => goMeansure()}  >
                    <TitleButton>
                        Measurement
                    </TitleButton>
                </Button>

                <Button>
                    <TitleButton>
                        Angle
                    </TitleButton>
                </Button>

            </ContainerButton>
        </Container>
  
        </>
    );
}

export default Home


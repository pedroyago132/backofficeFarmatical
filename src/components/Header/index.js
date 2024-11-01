import * as React from 'react';
import { ContainerMenu, TextMenu, Text } from './styles';



const Header = () => {
    return (
        <ContainerMenu>
            <TextMenu style={{fontWeight:'bold'}} > Sizer</TextMenu>
        </ContainerMenu>
    );
}

export default Header;

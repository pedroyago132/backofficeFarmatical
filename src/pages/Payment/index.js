import React from "react";
import styled from "styled-components";
import { backgroundColor } from "../../Globals/globals";
import Header from "../../components/Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createClient } from "../../services";

const SubscriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${backgroundColor};
  flex-direction:column;
`;

const SubscriptionBox = styled.div`
  background-color: white;
  padding: 30px;
  width: 90%;
  max-width: 400px;
  border-radius: 15px; /* Bordas arredondadas */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Price = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const BigNumber = styled.span`
  font-size: 48px;
  font-weight: bold;
  color: #333;
`;

const SmallNumber = styled.span`
  font-size: 24px;
  vertical-align: super;
  color: #555;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  text-align: left;

  li {
    margin: 10px 0;
    font-size: 16px;
    color: #666;
  }
`;

const SubscribeButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const Payment = () => {
  const [user, setUser] = React.useState({ email: 'alo' });

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

      const handleSubmit = async () => {
    
        const options = {
          method: 'POST',
          headers: { 
            accept: 'application/json', 
            'content-type': 'application/json',
            Authorization: `Bearer abc_dev_HSqTWMnYzmneM4d2KC1ZdmGt`, // Adiciona o Bearer Token
          },
          body: JSON.stringify({ email:"rodrigo@gmail.com" }),
        };
    
        try {
          const res = await fetch('https://api.abacatepay.com/v1/customer/create', options);
          const data = await res.json();
          if (res.ok) {
            console.log('RESULT:::::',data)
          } else {
            console.log('ERRROR:::::',data)
          }
        } catch (err) {
         console.log('ERROR::::',err)
        }
      };

  return (
    <>
    <Header />
   
    <SubscriptionContainer>
    <div style={{alignSelf:'center',display:'flex',width:'80%',gap:20,alignItems:'center',justifyContent:'center'}} >
      <img  src="laptop.png" style={{width:120,height:120}} alt="computer" />
      <img  src="right-arrow.png" style={{width:80,height:80}}  alt="arrow" />
      <img  src="wpp.png" style={{width:120,height:120}}  alt="wpp" />
    </div>
      <SubscriptionBox>
        <Price>
          R$<BigNumber>49</BigNumber><SmallNumber>,90</SmallNumber>/mês
        </Price>
        <h2>Benefícios da Assinatura</h2>
        <BenefitsList>
          <li>Gerenciamento de medicações fácil e prático</li>
          <li>Lembretes automáticos via WhatsApp</li>
          <li>Interface intuitiva para controle de horários</li>
          <li>Suporte especializado em gerenciamento de saúde</li>
        </BenefitsList>
        <SubscribeButton onClick={() => handleSubmit()} >Assinar Agora</SubscribeButton>
      </SubscriptionBox>
    </SubscriptionContainer>
    </>
  );
};

export default Payment;

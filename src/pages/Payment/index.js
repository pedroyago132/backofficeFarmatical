import React, { useState } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';
import axios from 'axios';
import { loadMercadoPago } from "@mercadopago/sdk-js";

await loadMercadoPago();

const mp = new window.MercadoPago("TEST-7a50d17f-477e-46fc-9155-03f005a2e20f");

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Detalhes do plano de teste
  const plan = {
    amount: 1, // Valor de teste
    frequency: 1, // Frequência mensal
    frequencyType: 'months', // Tipo de frequência
  };

  const cardForm = mp.cardForm({
    amount: "100.5",
    iframe: true,
    form: {
      id: "form-checkout",
      cardNumber: {
        id: "form-checkout__cardNumber",
        placeholder: "Número do cartão",
      },
      expirationDate: {
        id: "form-checkout__expirationDate",
        placeholder: "MM/YY",
      },
      securityCode: {
        id: "form-checkout__securityCode",
        placeholder: "Código de segurança",
      },
      cardholderName: {
        id: "form-checkout__cardholderName",
        placeholder: "Titular do cartão",
      },
      issuer: {
        id: "form-checkout__issuer",
        placeholder: "Banco emissor",
      },
      installments: {
        id: "form-checkout__installments",
        placeholder: "Parcelas",
      },        
      identificationType: {
        id: "form-checkout__identificationType",
        placeholder: "Tipo de documento",
      },
      identificationNumber: {
        id: "form-checkout__identificationNumber",
        placeholder: "Número do documento",
      },
      cardholderEmail: {
        id: "form-checkout__cardholderEmail",
        placeholder: "E-mail",
      },
    },
    callbacks: {
      onFormMounted: error => {
        if (error) return console.warn("Form Mounted handling error: ", error);
        console.log("Form mounted");
      },
      onSubmit: event => {
        event.preventDefault();

        const {
          paymentMethodId: payment_method_id,
          issuerId: issuer_id,
          cardholderEmail: email,
          amount,
          token,
          installments,
          identificationNumber,
          identificationType,
        } = cardForm.getCardFormData();

        fetch("/process_payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            issuer_id,
            payment_method_id,
            transaction_amount: Number(amount),
            installments: Number(installments),
            description: "Descrição do produto",
            payer: {
              email,
              identification: {
                type: identificationType,
                number: identificationNumber,
              },
            },
          }),
        });
      },
      onFetching: (resource) => {
        console.log("Fetching resource: ", resource);

        // Animate progress bar
        const progressBar = document.querySelector(".progress-bar");
        progressBar.removeAttribute("value");

        return () => {
          progressBar.setAttribute("value", "0");
        };
      }
    },
  });


  const handleFormSubmit = async (formData) => {
    try {
      // Envia os dados para o backend
      const response = await axios.post('http://localhost:3001/create-subscription', {
        email,
        cardToken: formData.token, // Token gerado pelo CardForm
        amount: plan.amount,
        frequency: plan.frequency,
        frequencyType: plan.frequencyType,
      });

      setMessage('Assinatura de teste criada com sucesso!');
      console.log('Assinatura:', response.data.subscription);
    } catch (error) {
      console.error('Erro ao criar assinatura:', error);
      setMessage('Erro ao criar assinatura. Tente novamente.');
    }
  };

  return (
    <div>
      <h1>Assinar Plano de Teste</h1>
      <form>
        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <button onClick={() => cardForm()} />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SubscriptionForm;

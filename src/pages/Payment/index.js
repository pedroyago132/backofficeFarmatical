import React, { useEffect } from "react";
import styled from "styled-components";
import { loadMercadoPago } from "@mercadopago/sdk-js";

const Payment = () => {
  useEffect(() => {
    const initializeMercadoPago = async () => {
      const mp = await loadMercadoPago("TEST-7a50d17f-477e-46fc-9155-03f005a2e20f")

    

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
          onFormMounted: (error) => {
            if (error) {
              console.error("Erro ao montar o formulário:", error);
              return;
            }
            console.log("Formulário montado com sucesso!");
          },
          onSubmit: (event) => {
            event.preventDefault();
            const formData = cardForm.getCardFormData();

            console.log("Dados do pagamento:", formData);

            fetch("/process_payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: formData.token,
                issuer_id: formData.issuerId,
                payment_method_id: formData.paymentMethodId,
                transaction_amount: Number(formData.amount),
                installments: Number(formData.installments),
                description: "Descrição do produto",
                payer: {
                  email: formData.cardholderEmail,
                  identification: {
                    type: formData.identificationType,
                    number: formData.identificationNumber,
                  },
                },
              }),
            })
              .then((response) => response.json())
              .then((data) => console.log("Resposta do servidor:", data))
              .catch((error) =>
                console.error("Erro ao processar o pagamento:", error)
              );
          },
        },
      });
    };

    initializeMercadoPago();
  }, []);

  return (
    <Form id="form-checkout">
      <Field>
        <label htmlFor="form-checkout__cardNumber">Número do cartão</label>
        <input type="text" id="form-checkout__cardNumber" />
      </Field>
      <Field>
        <label htmlFor="form-checkout__expirationDate">Data de Expiração (MM/YY)</label>
        <input type="text" id="form-checkout__expirationDate" />
      </Field>
      <Field>
        <label htmlFor="form-checkout__securityCode">Código de Segurança</label>
        <input type="text" id="form-checkout__securityCode" />
      </Field>
      <Field>
        <label htmlFor="form-checkout__cardholderName">Nome do Titular</label>
        <input type="text" id="form-checkout__cardholderName" />
      </Field>
      <Field>
        <label htmlFor="form-checkout__issuer">Banco Emissor</label>
        <select id="form-checkout__issuer"></select>
      </Field>
      <Field>
        <label htmlFor="form-checkout__installments">Parcelas</label>
        <select id="form-checkout__installments"></select>
      </Field>
      <Field>
        <label htmlFor="form-checkout__identificationType">Tipo de Documento</label>
        <select id="form-checkout__identificationType"></select>
      </Field>
      <Field>
        <label htmlFor="form-checkout__identificationNumber">Número do Documento</label>
        <input type="text" id="form-checkout__identificationNumber" />
      </Field>
      <Field>
        <label htmlFor="form-checkout__cardholderEmail">E-mail</label>
        <input type="email" id="form-checkout__cardholderEmail" />
      </Field>
      <Button type="submit">Pagar</Button>
    </Form>
  );
};

// Styled Components
const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Field = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  label {
    font-size: 14px;
    margin-bottom: 5px;
  }

  input,
  select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
      border-color: #4caf50;
      outline: none;
    }
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
`;

export default Payment;

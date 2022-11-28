import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.autor.value = onEdit.autor;
      user.data_inicio.value = onEdit.data_inicio;
      user.data_fim.value = onEdit.data_fim;
      user.nota.value = onEdit.nota;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.autor.value ||
      !user.data_inicio.value ||
      !user.data_fim.value || 
      !user.nota.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.idLivro, {
          nome: user.nome.value,
          autor: user.autor.value,
          data_inicio: user.data_inicio.value,
          data_fim: user.data_fim.value,
          nota: user.nota.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          autor: user.autor.value,
          data_inicio: user.data_inicio.value,
          data_fim: user.data_fim.value,
          nota: user.nota.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.autor.value = "";
    user.data_inicio.value = "";
    user.data_fim.value = "";
    user.nota.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Título</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Autor</Label>
        <Input name="autor"/>
      </InputArea>
      <InputArea>
        <Label>Data de início da leitura</Label>
        <Input name="data_inicio" type="date" />
      </InputArea>
      <InputArea>
        <Label>Data de término da leitura</Label>
        <Input name="data_fim" type="date" />
      </InputArea>
      <InputArea>
        <Label>Avaliação</Label>
        <Input name="nota" type="number" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
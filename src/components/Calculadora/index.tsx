// TODO: Criar sistema para reduzir a fonte do display quando tiver muitos caracteres
// TODO: Separar campos de calculo sendo realizado e resultado obtido
// TODO: Inserir o * caso o usuário esqueça. Ex: 8(4+2)
// TODO: Adicionar sistema de digitação com teclado

import { useState } from "react";
import Botao from "../Botao";
import valores from "../../utils/values";
import "./style.scss";

export default function Calculadora() {
  const [calculo, setCalculo] = useState("");
  const backspace = () => {
    setCalculo((val) => val.slice(0, -1));
  };
  const clear = () => {
    setCalculo("");
  };
  const resultado = () => {
    setCalculo((valor) => {
      // Remove parênteses vazios
      valor = valor.replaceAll("()", "");
      // Remove um operador solto
      const individuaisInvalidos = ["+", "-", "*", "/", "(", ")"];
      if (valor.length === 1 && individuaisInvalidos.includes(valor))
        valor = "";
      // Caso vazio, retorna para evitar o val de vazio
      if (valor === "") return valor;
      // Remove operador do final da equação
      const ultimosInvalidos = ["+", "-", "*", "/", "("];
      const ultimoValor = valor[valor.length - 1];
      if (ultimosInvalidos.includes(ultimoValor)) valor = valor.slice(0, -1);
      // Remove operador do começo da equação
      const primeirosInvalidos = ["+", "-", "*", "/", ")"];
      const primeiroValor = valor[0];
      if (primeirosInvalidos.includes(primeiroValor))
        valor = valor.substring(1);
      // Fecha parênteses abertos
      const numAberturas = (valor.match(/\(/g) || []).length;
      const numFechamentos = (valor.match(/\)/g) || []).length;
      const diferenca = numAberturas - numFechamentos;
      for (let i = 0; i < diferenca; i++) valor += ")";
      // Executa o cálculo
      const resultado = eval(valor);
      const resultadoString = Number.isInteger(resultado)
        ? String(resultado)
        : String(resultado.toFixed(2));
      return String(resultadoString);
    });
  };

  const inserir = (val: string) => {
    setCalculo((valor) => {
      // Impede a adição de mais de um operador
      const valores = ["+", "-", "*", "/"];
      const ultimoValor = valor[valor.length - 1];
      if (valores.includes(val) && valores.includes(ultimoValor))
        valor = valor.slice(0, -1);
      return (valor += val);
    });
  };

  return (
    <>
      {window.innerWidth > 992 && <h1 className="titulo">Calculatron</h1>}
      <div className="page">
        <div className="display">{calculo}</div>
        <div onClick={backspace}>
          <img
            className="backspace"
            src="https://cdn-icons-png.flaticon.com/512/7691/7691897.png"
            alt="Backspace"
          />
        </div>
        <ol className="botoes">
          <Botao valor="C" onClick={clear} />
          {valores.map((val) => (
            <Botao valor={val} onClick={inserir} />
          ))}
          <Botao valor="=" onClick={resultado} />
        </ol>
      </div>
    </>
  );
}

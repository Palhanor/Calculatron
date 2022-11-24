// TODO: Evitar problemas com expressões inválidas (testar antes de aplicar eval)
// TODO: Impedir encadear duas operações
// TODO: Ajeitar o bug de não poder dar backspace em um resultado
// TODO: Melhorar a responsividade e o design do sistema

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
    setCalculo((valor) => eval(valor));
  };
  return (
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
          <Botao
            valor={val}
            onClick={() => setCalculo((valor) => (valor += val))}
          />
        ))}
        <Botao valor="=" onClick={resultado} />
      </ol>
    </div>
  );
}

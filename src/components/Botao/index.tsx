import IBotao from "../../interface/IBotao";
import "./style.scss";

export default function Botao({ valor, onClick }: IBotao) {
  const fundir = valor === "0" ? "fundir" : "";
  const cor = () => {
    if (valor === "C") return "vermelho";
    else if (valor === "=") return "verde";
    else if (valor === "+" || valor === "-" || valor === "/" || valor === "*")
      return "laranja";
    else return "cinza";
  };

  return (
    <li className={`container_botao ${fundir}`}>
      <button className={`botao ${cor()}`} onClick={() => onClick(valor)}>
        {valor}
      </button>
    </li>
  );
}

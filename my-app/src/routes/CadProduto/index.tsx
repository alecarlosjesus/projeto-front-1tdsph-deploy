import { useState } from "react";
import { useNavigate } from "react-router";
import type { TipoProduto } from "../../types/types";

const API_URL = import.meta.env.VITE_API_URL;

export default function CadProduto() {
  document.title = "Cadastrar Produto";
  const navigate = useNavigate();

  const [produto, setProduto] = useState<TipoProduto>({ id:"", nome:"" , preco:0 , estoque:0 , avatar:"https://placehold.co/200x200/000000/FFFFFF/png"});

  const handleSubmit = async ()=>{
    try {

      const response = await fetch(API_URL,{
        method:"POST",
        headers:{
          "Content-Type":"text/plain;charset=utf-8"
        },
        body: JSON.stringify(produto), redirect:"follow"
      });
      
      //ERRO
        if (!response.ok) {
          throw new Error(`Erro no cadastro do produto: ${response.status} - ${response.statusText}`);
        }

        //VERIFICANDO ERROS NA TRANSAÇÃO DA PLANILHA
        const{status} = await response.json();

        if (status === "error") {
          throw new Error(`Erro no cadastro do produto: ${status}`);
        }

        //SUCCESS
        alert("Produto cadastrado com sucesso!");
        //REDIRECT
        navigate("/produtos");

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h2>Cadastro de Produto</h2>
       <div>
        <form>
          <fieldset>
            <legend>Dados do Produto</legend>
            <div>
              <label htmlFor="nome">Nome do Produto:</label>
          <input type="text" name="nome" id="nome" value={produto.nome} onChange={(event)=> setProduto({...produto,nome:event.target.value})}/>
            </div>
            <div>
              <label htmlFor="preco">Preço do Produto:</label>
          <input type="number" step={0.1} name="preco" id="preco" value={produto.preco} onChange={(event)=> setProduto({...produto,preco: parseFloat(event.target.value)})}/>
            </div>
            <div>
              <label htmlFor="estoque">Estoque do Produto:</label>
          <input type="number" step={1} name="estoque" id="estoque" value={produto.estoque} onChange={(event)=> setProduto({...produto,estoque:parseInt(event.target.value)})}/>
            </div>
            <div>
              <label htmlFor="avatar">Avatar do Produto:</label>
          <input type="url" name="avatar" id="avatar" value={produto.avatar} onChange={(event)=> setProduto({...produto,avatar:event.target.value})}/>
            </div>
            <div>
              <figure>
                <img src={produto.avatar} alt={produto.nome} /> 
              </figure>
            </div>
            <div>
              <button type="button" onClick={()=> handleSubmit()}>CADASTRAR</button>
            </div>
          </fieldset>
        </form>
       </div>
    </main>
  );
}

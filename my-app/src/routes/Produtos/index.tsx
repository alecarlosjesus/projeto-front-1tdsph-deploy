import { useEffect, useState } from "react";
import type { TipoProduto } from "../../types/types";
import { Link}  from "react-router";
import { FaRegEdit as Editar } from "react-icons/fa";
import { MdOutlineDeleteForever as Excluir } from "react-icons/md";

export default function Produtos() {
  document.title = "Produtos";

  const API_URL = import.meta.env.VITE_API_URL;

  const [produtos, setProdutos] = useState<TipoProduto[]>([]);

  useEffect(() => {

    const carregaProdutos = async () => {

      try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
          throw new Error("Erro na listagem dos produtos!");
        }

        const {status, data} = await resposta.json();

        if(status === "error"){
          throw new Error(`Erro na listagem do produto: ${status}`);
        }
        
        setProdutos(data);

      } catch (error) {
        console.error(error);
      }
    }

    carregaProdutos();

  }, []);

  const handleDelete = async (id: string) => {
    try {

      // const resposta = await fetch(`http://localhost:3001/produtos/${id}`, {
      //   method: "DELETE"
      // });

      const resposta = await fetch(API_URL, {
        method: "POST",
        headers:{
          "Content-Type":"text/plain;charset=utf-8"
        },
        body: JSON.stringify({action:"DELETE",id:id})
      });

      //ERROR
      if(!resposta.ok){
        throw new Error(`Ocorreu um erro na exclusão do produto: ${resposta.status} - ${resposta.statusText}`);
      }

        const {status} = await resposta.json();

        if(status === "error"){
          throw new Error(`Erro na exclusão do produto: ${status}`);
        }

      //SUCCESS
      alert("Produto excluído com sucesso!");
      //Recarregando o state de produtos.
      setProdutos((prevProdutos)=> prevProdutos.filter((p)=> p.id !== id));
    } catch (error) {
      console.error(error);
    }
  }
 
  return (
    <main>
      <h2>Produtos</h2>
      <div>
        <table border={1} style={{ borderCollapse: "collapse", width:"70%", margin:"0 auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>PREÇO</th>
              <th>ESTOQUE</th>
              <th>AVATAR</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.preco}</td>
                <td>{produto.estoque}</td>
                <td><img src={produto.avatar} alt={produto.nome} /></td>
                <td>
                  <Link to={`/editar-produto/${produto.id}`}> <Editar /> </Link>
                  |
                  <Link to="#" onClick={() => handleDelete(produto.id)}><Excluir /></Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>Quantidade de produtos: {produtos.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  )
}

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [gridList, setGridList] = useState([]);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handlePrecoChange = (event) => {
    setPreco(event.target.value);
  };

  const handleQuantidadeChange = (event) => {
    setQuantidade(event.target.value);
  };

  const calcularTotal = () => {
    const total = parseFloat(preco) * parseInt(quantidade);
    return isNaN(total) ? '' : total.toFixed(2);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      nome: nome,
      preco: preco,
      quantidade: quantidade,
      total: calcularTotal()
    };

    setGridList([...gridList, newItem]);

    setNome('');
    setPreco('');
    setQuantidade('');
  };

  const handleDelete = (index) => {
    const updatedList = [...gridList];
    updatedList.splice(index, 1);
    setGridList(updatedList);
  };

  const calcularTotalGeral = () => {
    let totalGeral = 0;

    gridList.forEach((item) => {
      totalGeral += parseFloat(item.total);
    });

    return totalGeral.toFixed(2);
  };

  return (
    <div className="container">
      <h1> Insira um Produto</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome:</label>
              <input type="text" className="form-control" id="nome" value={nome} onChange={handleNomeChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="preco" className="form-label">Preço:</label>
              <input type="number" inputmode="decimal" className="form-control" id="preco" value={preco} onChange={handlePrecoChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="quantidade" className="form-label">Quantidade:</label>
              <input type="number" inputmode="numeric" className="form-control" id="quantidade" value={quantidade} onChange={handleQuantidadeChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="total" className="form-label">Total:</label>
              <input type="number" disabled className="form-control" id="total" value={calcularTotal()} readOnly />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <div className="mt-4">
        <h3>Lista de Produto</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {gridList.map((item, index) => (
              <tr key={index}>
                <td>{item.nome}</td>
                <td>{item.preco}</td>
                <td>{item.quantidade}</td>
                <td>{item.total}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(index)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <h4>Total Geral: {calcularTotalGeral()}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react"

import "./App.css";


const Header = () => {
  return (
    <header>
      <h2>Lista de Compras:</h2>
    </header>
  );
}


const ListItem = ({ item, idx, removeClick }) => {
  return (
    <li className="list-group-item">
        <div className="row justify-content-between">
        <div className="col-4">
          {item}
        </div>
        <div className="col-4">
          <button type="click" className="btn btn-danger" onClick={(e) => removeClick(e, idx)}>
            Remover
          </button>
        </div>
      </div>
    </li>);
}

const getListStorage = () => {
  const data = JSON.parse(localStorage.getItem('list'))
  console.log('data', data)
  return data ? data : [];
}
const updateListStorage = (data) => {
  localStorage.setItem('list', JSON.stringify(data))
}

const ListaCompras = () => {
  const [list, setList] = useState([]);
  const [inputItem, setInputItem] = useState('');

  useEffect(() => {
    setList(getListStorage())
  }, []);

  useEffect(() => {
    updateListStorage(list)
  }, [list]);

  const addinList = (e, item) => {
    e.preventDefault();
    if (item.length > 0) {

      const found = list.find(el => el == item)
      if (found !== undefined) alert('Este item ja está na lista.')
      else {
        setList([...list, item]);
        setInputItem("");
      }
    }
  }

  const removeitemList = (e, idx) => {
    e.preventDefault();
    let listTemp = [...list];
    listTemp.splice(idx, 1);
    setList(listTemp);
  }

  return (
    <>
      <div className="lista-compras-container">
        {list.length > 0 ? <ul className="lista-item list-group">
          {list.map((item, idx) => <ListItem key={idx} item={item} idx={idx} removeClick={removeitemList} />)}
        </ul> : <h4>Lista Vazia! Adicione itens na lista.</h4>}
      </div>
      <form className="form-add-item" action="#" method="post">
        <fieldset>
          <div className="form-group mb-3">
            <label htmlFor="item">Adicionar Novo Item na Lista:</label>
            <input type="text" className="form-control" id="item" value={inputItem} onChange={(e) => setInputItem(e.target.value)} />
          </div>
          <button type="click" onClick={(e) => addinList(e, inputItem)} className="btn btn-primary">
            Adicionar
          </button>
        </fieldset>
      </form>
    </>
  );
}

const Footer = () => {
  return (<footer>Todos os direitos reservados.</footer>);
}

function App() {
  return (
    <div className="App">
      <Header />
      <ListaCompras />
      {/* <Footer/> */}
    </div>
  );
}

export default App;

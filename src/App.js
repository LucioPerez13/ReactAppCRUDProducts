import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function App() {

  const dataProductos = [
    { id: 1, nombre: "Samusng galaxy 10", precio: 24900.00 },
    { id: 2, nombre: "Xioami mi 10 lite", precio: 9250.00 },
    { id: 3, nombre: "Huawei mate 10", precio: 4500.00 },
    { id: 4, nombre: "Sony xperia 8", precio: 216 },
    { id: 5, nombre: "Xbox series x", precio: 8499.50 },
    { id: 6, nombre: "Cargador Universal", precio: 350.00 },
    { id: 7, nombre: "PS4", precio: 14500.00 },
    { id: 8, nombre: "Iphone 10", precio: 22300.00 },
    { id: 9, nombre: "Xiaomi mi 9t", precio: 12300.99 },
    { id: 10, nombre: "Disco duro SSD 1T", precio: 1500.00 },
  ];
  
  const [data, setData] = useState(dataProductos);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [productoSeleccionado, setproductoSeleccionado] = useState({
    id: '',
    nombre: '',
    precio: ''
  });

  const seleccionarProducto=(elemento, caso)=>{
        setproductoSeleccionado(elemento);
          (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setproductoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar = () => {
    let dataNueva = data;
    dataNueva.map(prod => {
      if (prod.id === productoSeleccionado.id) {
        prod.precio = productoSeleccionado.precio;
        prod.nombre = productoSeleccionado.nombre;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar = () => {
    setData(data.filter(prod => prod.id !== productoSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar = () => {
    setproductoSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    let valorInsertar=productoSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    let dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="App">
      <h2>Productos</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Agregar</button>
    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elemento,i)=>(
            <tr key={i}>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.precio}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarProducto(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarProducto(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Producto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label hidden>Id</label>
            <input className="form-control" readOnly type="hidden" name="id"
              value={productoSeleccionado && productoSeleccionado.id}
            />
            <br />

            <label>Descripcion</label>
            <input className="form-control" type="text" name="nombre"
              value={productoSeleccionado && productoSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Precio</label>
            <input className="form-control" type="text" name="precio"
              value={productoSeleccionado && productoSeleccionado.precio}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el producto {productoSeleccionado && productoSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button className="btn btn-secondary" onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Producto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label hidden>ID</label>
            <input className="form-control" readOnly type="hidden" name="id"
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Producto</label>
            <input className="form-control" type="text" name="nombre"
              value={productoSeleccionado ? productoSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Precio</label>
            <input className="form-control" type="text" name="precio"
              value={productoSeleccionado ? productoSeleccionado.precio: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button className="btn btn-danger" onClick={()=>setModalInsertar(false)}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;

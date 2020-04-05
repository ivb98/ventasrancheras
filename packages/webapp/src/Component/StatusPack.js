import React from "react";
import { Container } from "react-bootstrap";
import { useSelectState, useSelectDispatch, SelectProvider } from "../Context/Contexts";

import "./styles/StatusPack.css";

const state = "lamao";

const productos = [
    {
        name: "Producto1",
        cant: 3,
    },
    {
        name: "Producto2",
        cant: 6,
    },
    {
        name: "Producto4",
        cant: 10,
    },
];

const sellerContent = (item) => {


    return (
        <div>
            <h> ID: {item.id}</h>
            <p> Nombre completo: {item.nombre}</p>
            <p> Email: {item.email}</p>
        </div>
    );
};

const packageContent = (item) => {


    return (
        <div>
            <h> ID: {item.id}</h>
            <Container>
                <span className="rounded mb-0 block border border-light">
                    <ul>
                        {productos.map((producto) => {
                            return (
                                <li>
                                    {" "}
                                    {producto.name} x {producto.cant}{" "}
                                </li>
                            );
                        })}
                    </ul>
                </span>
            </Container>
            <p> Cliente: {item.clientname}</p>
            <p> Delivery: {item.delivery}</p>
        </div>
    );
};

function StatusPack(props) {
    const sellerRole = props.rol === "Seller" ? true : false;

    const select = useSelectState();

    var item = sellerRole ? select.person : select.pack;

    console.log(select);

    return (
        <Container>
            <span className="rounded mb-0 box border border-dark">
            {(sellerRole)? sellerContent(item): packageContent(item)}
            </span>
        </Container>
    );
}

export default StatusPack;

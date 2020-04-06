import React from "react";
import { Container } from "react-bootstrap";
import { useSelectState } from "../Context/SelectContext";

import "./styles/StatusPack.css";

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

const sellerContent = (item, seller) => {
    return (
        <div>
            <h1>Visitados</h1>
            <Container>
                <span className="rounded mb-0 block border border-light">
                    <ul>
                        {seller.visits.map((visita) => {
                            return (
                                <li>
                                    {" "}
                                    Id Quickbook: {visita.id} Visitado: {visita.visited}{" "}
                                </li>
                            );
                        })}
                    </ul>
                </span>
            </Container>
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
    const seller = props.seller;

    var item = sellerRole ? select.person : select.pack;

    console.log(seller);

    return (
        <Container>
            <span className="rounded mb-0 box border border-dark">
                {sellerRole ? sellerContent(item, seller) : packageContent(item)}
            </span>
        </Container>
    );
}

export default StatusPack;

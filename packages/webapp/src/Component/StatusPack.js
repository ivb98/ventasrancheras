import React from "react";
import { Container } from "react-bootstrap";
import { useSelectState } from "../Context/SelectContext";

import "./styles/StatusPack.css";

const deliveryContent = (item) => {
    return (
        <div>
           
        </div>
    );
};

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
                        {item.items.map((producto) => {
                            return (
                                <li>
                                    {" "}
                                    Product ID: {producto.id} Descripcion: {producto.name} Cantidad:{" "}
                                    {producto.qty}
                                </li>
                            );
                        })}
                    </ul>
                </span>
            </Container>
            <p>Client: {item.customer.name} </p>
            <p>Client ID: {item.customer.id}</p>
            <p>
                Address: {item.address.Line1},{item.address.City} {item.address.PostalCode}
            </p>
            <p> Total: {item.total}</p>
        </div>
    );
};

function StatusPack(props) {
    const sellerRole = props.rol === "Seller" ? true : false;
    const deliveryRole = props.rol === "Delivery" ? true : false;

    const select = useSelectState();


    var item = sellerRole ? select.person : select.pack;

    var isMyObjectEmpty = !Object.keys(item).length;

    return (
        <Container>
            <span className="rounded mb-0 box border border-dark">
                {!isMyObjectEmpty
                    ? sellerRole
                        ? sellerContent(item)
                        : deliveryRole
                        ? deliveryContent(item)
                        : packageContent(item)
                    : null}
            </span>
        </Container>
    );
}

export default StatusPack;

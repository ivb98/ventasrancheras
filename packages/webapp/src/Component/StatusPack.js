import React from "react";
import { Container } from "react-bootstrap";
import { useSelectState } from "../Context/SelectContext";

import "./styles/StatusPack.css";

const deliveryContent = item => {
    return <div></div>;
};

const sellerContent = item => {
    return (
        <div>
            <h3> ID: {item.id}</h3>
            <p> Nombre completo: {item.nombre}</p>
            <p> Email: {item.email}</p>
        </div>
    );
};

const packageContent = item => {
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title"> ID: {item.id}</h4>
                <ul className="list-group my-4">
                    {item.items.map(producto => {
                        return (
                            <li className="list-group-item">
                                <ul>
                                    <li>Product ID: {producto.id}</li>
                                    <li>Descripcion: {producto.name}</li>
                                    <li>Cantidad: {producto.qty}</li>
                                </ul>
                            </li>
                        );
                    })}
                </ul>

                <p>Client: {item.customer.name} </p>
                <p>Client ID: {item.customer.id}</p>
                {item.address !== undefined ? (
                    <p>
                        Address: {item.address.Line1},{item.address.City} {item.address.PostalCode}
                    </p>
                ) : null}
                <p> Total: {item.total}</p>
            </div>
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

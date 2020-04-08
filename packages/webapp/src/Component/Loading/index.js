import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const LoadingContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Loading = () => {
    return (
        <LoadingContainer>
            <Spinner animation="border" role="status" size="md">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </LoadingContainer>
    );
};

export default Loading;

import styled from "styled-components";
import { useUser } from "../features/authentication/useUser"
import Spinner from '../ui/Spinner'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/* eslint-disable react/prop-types */

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`

function ProtectedRoutes({children}) {
    const navigate = useNavigate();

    const {isLoading, isAuthenticated} = useUser();

    
    useEffect(() => {
        if(!isAuthenticated && !isLoading){
            navigate('/login')
        }
    }, [isAuthenticated, isLoading, navigate])
    
    if(isLoading) return (<FullPage ><Spinner /></FullPage>)

    if(isAuthenticated) return children
}

export default ProtectedRoutes

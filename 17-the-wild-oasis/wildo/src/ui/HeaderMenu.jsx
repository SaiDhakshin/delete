import { HiOutlineUser } from "react-icons/hi2"
import styled from "styled-components"
import ButtonIcon from '../ui/ButtonIcon'
import Logout from '../features/authentication/Logout'
import { useNavigate } from "react-router-dom"
import DarkmodeToggle from '../ui/DarkmodeToggle'

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`


function HeaderMenu() {

    const navigate = useNavigate()
    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={() => navigate('/account')}>
                    <HiOutlineUser />
                </ButtonIcon>
            </li>
            <li>
                <Logout />
            </li>
            <li>
                <DarkmodeToggle />
            </li>
        </StyledHeaderMenu>
    )
}

export default HeaderMenu

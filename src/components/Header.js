import React, { useEffect } from 'react'
import styled from 'styled-components'
import {  useHistory } from 'react-router-dom'
import { 
        selectUserEmail, 
        selectUserName, 
        selectUserPhoto,
        setSignOut,
        setUserLogin 
    } 
from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { auth, provider } from '../firebase'
export function Header() {
    const dispatch = useDispatch()
    const history =  useHistory()
    const userName = useSelector(selectUserName)
    const userEmail = useSelector(selectUserEmail)
    const userPhoto = useSelector(selectUserPhoto)


    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(user){
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
            }
        })
    },[])

    const handleSignIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            console.log(result)
            dispatch(setUserLogin({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            }))
            history.push('/')
        })
        .catch((err) => {
            console.log(err)
        }) 
    }
    
    const handleSignOut = () => {
        dispatch(setSignOut())
        history.push('/Login')
    }

    return (
        <Nav>
            <Logo src='/images/logo.svg' loading='lazy' alt='Logo' />
            {
                !userName ?
                <LoginContainer>
                    <Login onClick={handleSignIn}>Login</Login>
                    </LoginContainer>
                    :
                    <>
                        <NavMenu>
                            <NavItem>
                                <img src="/images/home-icon.svg" />
                                <span>HOME</span>
                            </NavItem>
                            <NavItem>
                                <img src="/images/search-icon.svg" />
                                <span>SEARCH</span>
                            </NavItem>
                            <NavItem>
                                <img src="/images/watchlist-icon.svg" />
                                <span>WATCH</span>
                            </NavItem>
                            <NavItem>
                                <img src="/images/original-icon.svg" />
                                <span>ORIGINALS</span>
                            </NavItem>
                            <NavItem>
                                <img src="/images/movie-icon.svg" />
                                <span>MOVIES</span>
                            </NavItem>
                            <NavItem>
                                <img src="/images/series-icon.svg" />
                                <span>SERIES</span>
                            </NavItem>
                        </NavMenu>
                        <UserImg onClick={handleSignOut} src={userPhoto} />




                    </>
            }

        </Nav>
    )
}

const Nav = styled.nav`
    height: 70px;
    background-color: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
`

const Logo = styled.img`
    width:80px;

`
const NavMenu = styled.div`
    display:flex;
    flex: 1;
`
const NavItem = styled.a`
    display:flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
        height:20px;
        margin-right:1px;
    }

    span{
        font-size: 13px;
        letter-spacing:1.42px;
        position:relative;

        &:after{
            content:'';
            height:2px;
            background-color:white;
            position:absolute;
            left:0;
            right:0;
            bottom: -6px;
            opacity:0;
            transform:scaleX(0);
            transform-origin: left center;
            transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
        }
    }

    &:hover{
        span:after{
            transform: scaleX(1); 
            opacity: 1; 
        }
    }
`

const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0,0,0,0.6);
    cursor: pointer;
    transition: all 0.2s ease 0s;
    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`


const LoginContainer = styled.div`
    flex: 1;
    display:flex;
    justify-content: flex-end;
`


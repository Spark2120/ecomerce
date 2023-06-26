import { Badge } from '@material-ui/core';
import {
  ShoppingCartOutlined,
  ShoppingCart,
  Brightness7,
  Brightness2,
  MenuRounded,
} from '@material-ui/icons';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { mobile, pc } from '../responsive';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { e } from '../data/navbarData';
import SearchBar from './searchBar';
import Title from './Title';

const Container = styled.nav`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  height: 6rem;
  display: flex;
  align-items: center;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  ${mobile({
    top: '0',
    position: 'fixed',
    zIndex: '999',
    width: '100vw',
  })}
  ${pc({
    maxWidth: '100vw',
  })}
`;

const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 0rem 1.25rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  ${mobile({ margin: 'auto' })}
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  ${pc({ flex: '3' })}
  ${mobile({ justifyContent: 'center', maxWidth: '100vw', width: '100%' })}
`;

const MenuIconMobile = styled.div`
  display: none;
  ${mobile({ display: 'flex' })}
`;

const DarkLabel = styled.label`
  ${mobile({ display: 'none' })}
`;

const Item = styled.div`
  font-size: 1rem;
  margin: 1rem;
  cursor: pointer;
  ${mobile({ fontSize: '1.4rem', marginLeft: '1rem' })}
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: 'none' })}
`;

const Right = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  ${mobile({
    position: 'absolute',
    zIndex: '999',
    transition: '1s ease-in-out',
    width: '100vw',
    left: '0',
    top: '100%',
  })}
`;

const DropdownMenu = styled.div`
  ${mobile({
    display: 'flex',
    margin: 'auto',
    fontWeight: 'bold',
    justifyContent: 'spaceEvenly',
    textTransform: 'uppercase',
    flexDirection: 'column',
    height: '100vh',
    overflowY: 'auto',
  })}
`;
const MenuItem = styled.div`
  ${mobile({ marginRight: '1rem', fontSize: '1rem' })}
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-left: 25px;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.hover};
    transition: width 0.3s ease-in-out;
  }
  ${mobile({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '6vh auto',
  })}
  &:hover:after {
    width: 100%;
  }
`;

const MenuItemCart = styled.div`
  ${mobile({ marginRight: '1rem', fontSize: '1rem' })}
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-left: 25px;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.hover};
    transition: width 0.3s ease-in-out;
  }
  &:hover:after {
    width: 100%;
  }
`;

const Navbar = ({ darkMode, setDarkMode }) => {
  const quantity = useSelector((state) => state.cart.quantity);
  const username = useSelector((state) => state.user.username);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 820) {
        setIsMenuOpen(false);
      } else {
        setIsMenuOpen(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Container role="navigation">
      <Wrapper>
        <Left>
          <MenuIconMobile>
            <MenuRounded
              role="menubar"
              aria-label="Dropdown Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ cursor: 'pointer' }}
            />
          </MenuIconMobile>

          <DarkLabel
            role="menuitem"
            aria-label="Change to dark mode and light mode"
            onClick={() => setDarkMode(!darkMode)}
            tabIndex="0"
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setDarkMode(!darkMode);
              }
            }}
          >
            {darkMode ? 'Dark' : 'Light'}
          </DarkLabel>
          <Item
            role="menuitem"
            aria-label="Change to dark mode and light mode"
            aria-pressed={darkMode}
            name="theme"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            tabIndex="0"
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setDarkMode(!darkMode);
              }
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness2 />}
          </Item>

          {/* SEARCH BAR */}
          <SearchBar />
        </Left>
        <Center role="banner">
          <Link
            to="/"
            style={{ textDecoration: 'none' }}
            title="Cierva"
            role="link"
          >
            <Title text={'Cierva'} />
          </Link>
        </Center>
        <Right role="menu">
          {/* MOBILE NAVBAR */}
          {isMenuOpen && (
            <DropdownMenu aria-hidden={!isMenuOpen}>
              {/* USER EXISTS? */}
              <>
                {e.map((i) => {
                  const { id, route, name } = i;
                  return (
                    <Link
                      role="link"
                      aria-label={`go to ${name}`}
                      title={name}
                      key={id}
                      to={route}
                      style={{ textDecoration: 'none' }}
                      tabIndex="0"
                    >
                      <MenuItem>{name}</MenuItem>
                    </Link>
                  );
                })}
                {username ? (
                  <MenuItem role="link" title={username} tabIndex="0">
                    {username}
                  </MenuItem>
                ) : (
                  <Link
                    role="link"
                    aria-label="go to auth"
                    to="/auth"
                    style={{ textDecoration: 'none' }}
                    title="Login / Create Account"
                    tabIndex="0"
                  >
                    <MenuItem>Login</MenuItem>
                  </Link>
                )}
              </>
            </DropdownMenu>
          )}
        </Right>
        <Link
          to="/cart"
          style={{ textDecoration: 'none' }}
          tabIndex="0"
          role="link"
        >
          <MenuItemCart>
            <Badge
              role="figure"
              aria-label="shopping cart"
              title={`${quantity} products in cart`}
              badgeContent={quantity}
              color="primary"
              overlap="rectangular"
            >
              {quantity > 0 ? <ShoppingCart /> : <ShoppingCartOutlined />}
            </Badge>
          </MenuItemCart>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

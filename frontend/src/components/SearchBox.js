import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { Box, keyframes } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    width: 120,
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
  },
}));

function CustomIconButton(props) {
  return (
    <IconButton
      style={{
        color: (props.location.pathname === "/") ? '#FFF' : '#000'
      }}
      onClick={props.onClick}>
      {props.children}
    </IconButton>
  );
}

const SearchBox = (props) => {
  const navigate = useNavigate();
  let location = useLocation();
  const phone = useMediaQuery("(max-width: 460px)");

  const [keyword, setKeyword] = useState('');
  const [width, setWidth] = useState(phone ? 130 : 80);

  const handleClose = () => {
    if (!phone) {
      setWidth(80);
      setKeyword('');
    };

    props.back();
  }

  const handleClick = () => {
    if (!phone) {
      setWidth(240);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.length === 0) props.back();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      props.back();
    };

  }

  return (
    <Box component="form" onSubmit={submitHandler}>
      <Search>
        <Paper variant={(location.pathname !== "/")? "outlined" : ""}
          sx={{ backgroundColor: "transparent" }}>
          <StyledInputBase placeholder="Buscar"
            onChange={(e) => setKeyword(e.target.value)}
            sx={{ width: width }}
            onClick={handleClick}
            onBlur={handleClose} 
            value={keyword}/>
          <CustomIconButton onClick={submitHandler} location={location}>
            <SearchIcon />
          </CustomIconButton>
        </Paper>
      </Search>
    </Box>
  )
}

export default SearchBox
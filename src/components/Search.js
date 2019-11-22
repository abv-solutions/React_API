import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';
import ImageResults from './ImageResults';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  input: {
    width: 160,
  }
}));

const Search = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [state, setState] = useState({
    search:'',
    count: '',
    apiUrl: 'https://pixabay.com/api',
    apiKey: '13716808-3af92fba834c7ee7bad061620'
  });

  useEffect(() => {
    if (state.search === '') {
      setImages([]);
    } else {
      axios
        .get(`${state.apiUrl}/?key=${state.apiKey}&q=${state.search}&image_type=photo&per_page=${state.count}&safesearch=true`)
        .then(res => {
          setImages(res.data.hits);
        })
        .catch(err => {
          setImages([]);
        });
    }
  }, [state]);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <TextField
          className={classes.input}
          label="Search for images"
          name="search"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Number of results</InputLabel>
        <Select
          className={classes.input}
          name="count"
          value={state.count}
          onChange={handleChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <br />
        {images.length > 0 ? (
          <ImageResults images={images}/>
        ) : null}
    </form>
  );
}

export default Search;

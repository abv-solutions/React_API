import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import ZoomIn from '@material-ui/icons/ZoomIn';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginRight: theme.spacing(1)
  },
}));

const getWindowDims = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const ImageResults = ({ images }) => {
  const classes = useStyles();
  const [windowDims, setWindowDims] = useState(getWindowDims());
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');

  const handleOpen = image => {
    setOpen(true);
    setCurrent(image);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => setWindowDims(getWindowDims());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={classes.root}>
      <GridList cols={Math.round(windowDims.width / 380)}>
        {images.map(img => (
          <GridListTile key={img.id}>
            <img src={img.largeImageURL} alt="" />
            <GridListTileBar
              title={img.tags}
              subtitle={
                <span>
                  by <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton
                  className={classes.icon}
                  onClick={() => handleOpen(img.largeImageURL)}
                >
                  <ZoomIn />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>

      <Dialog
        open={open}
      >
        <DialogContent>
          <img src={current} alt="" style={{ width: '100%' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ImageResults;

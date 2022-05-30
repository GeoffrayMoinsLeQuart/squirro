import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Rating, Theme, Typography } from '@mui/material';
import { formatDate, getDataBooks, getFlag } from './utils';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme: Theme) => ({
  mainGrid: {
    padding: '30px',
    border: '1px solid black',
    borderRadius:'6px',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom:'50px',
    marginTop:'50px',
  },
}));

function App() {
  const [stores, setStores] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/stores`)
      .then((res) => {
        const storesValue = res.data.data;
        console.log(storesValue)
        // console.log(storesValue)
        // for (let index = 0; index < storesValue.length; index++) {
          //   const element = storesValue[index];
        //   element.endTime = localeDateString(
        //     new Date(element.endTime)
        //   );
        //   element.startTime = localeDateString(
          //     new Date(element.startTime)
          //   );
          // }
      setStores(storesValue);
    });
    axios
      .get(`http://localhost:3000/books`)
      .then((res) => {
        const booksValue = res.data.data;
        setBooks(booksValue);
    });
    axios
      .get(`http://localhost:3000/countries`)
      .then((res) => {
        const countriesValue = res.data.data;
        // console.log(countriesValue)
        setCountries(countriesValue);
    });
    axios
      .get(`http://localhost:3000/authors`)
      .then((res) => {
        const authorsValue = res.data.data;
        // console.log(authorsValue)
        setAuthors(authorsValue);
    });

  }, []);

  return (
    <>
      {stores.length > 0 && (
        stores.map((store: any) => (
          <Grid container className={classes.mainGrid}>
            <Grid container item direction='row' justifyContent='space-between'>
              <Grid item xs={3}>
                <img src={store.attributes.storeImage} alt={store.attributes.storeImage} style={{maxWidth: '180px', maxHeight: '240px'}} />
              </Grid>
              <Grid item xs={8}>
                <Grid container item xs={12}  sx={{marginBottom: '10px'}}  direction='row'>
                  <Grid item xs={6}>
                    <Typography variant='h5'>
                      {store.attributes.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{textAlign: 'end !important'}} >
                    <Rating name="read-only" value={store.attributes.rating} readOnly />
                  </Grid>
                </Grid>

                <Grid container item xs={12} justifyContent='space-between'>
                  <Typography variant='h6' sx={{marginBottom: '10px'}}>
                    Best-selling books
                  </Typography>
                  {store.relationships.books? 
                    getDataBooks(store.relationships.books.data, books, authors)
                    :
                    <Typography  variant='body2'>
                      No data available
                    </Typography>
                  }
                </Grid>
              </Grid>
            </Grid>

            <Grid container item xs={12} justifyContent='space-between' alignItems='flex-end'>
              <Grid item>
                <Typography variant='body2'>
                  {formatDate(new Date(store.attributes.establishmentDate))} - {store.attributes.website}
                </Typography>
              </Grid>
              <Grid item>
                <img src={`https://countryflagsapi.com/svg/${getFlag(store.relationships.countries.data.id ,countries)}`} alt="flag"  style={{ maxWidth: '70px', maxHeight: '70px'}}/>
              </Grid>
            </Grid>
          </Grid>
        ))
      )}
    </>
  );
}

export default App;

import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import { Fragment } from 'react';

export const getDataBooks = (store : any, books : any, authors: any) => {

    store.forEach(function(bookFromStore : any) {
        books.forEach(function(bookFromBooks : any) {
            if(bookFromStore.id === bookFromBooks.id){
                bookFromStore.name = bookFromBooks.attributes.name
                bookFromStore.copiesSold = bookFromBooks.attributes.copiesSold
                bookFromStore.authorId = bookFromBooks.relationships.author.data.id
            }
        });
    });

    store.forEach(function(bookFromStore : any) {
        authors.forEach(function(author : any) {
            if(author.id === bookFromStore.authorId){
                bookFromStore.authorName = author.attributes.fullName
            }
        });
    });


    store.sort((a: any, b: any) => {
        return b.copiesSold - a.copiesSold;
    });

    return(
        store.slice(0, 2).map((book: any, index: number) => (
            <Grid container item xs={12} justifyContent='space-between' key={book.name}>
                <Grid item xs={6}>
                    <Typography variant='body2'>
                    {book.name}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='body2'>
                    {book.authorName}
                    </Typography>
                </Grid>
            </Grid>
        ))
    )
}

  export const getFlag = (countryNumber: number, countries: any) => {
    let codeCountry: string = "";
    countries.forEach(function(country : any) {
        if(country.id === countryNumber){
            codeCountry = country.attributes.code
        }
    });
    return codeCountry
  }

export const formatDate = (date: Date) => {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return date.toLocaleDateString('de-DE', options as any);
  }
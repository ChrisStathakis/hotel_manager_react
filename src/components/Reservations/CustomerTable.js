import React, {useState} from 'react';

import { Box, Paper, Table, TableHead, TableCell, TableRow,
    Typography, TextField, Button, TableBody
} from '@mui/material';




export default function CustomerTable(props){
    const [q, useQ] = useState('');
    
    const handleSearch = (e) => {
        useQ(e.target.value)
        console.log('q', q)
        if(q.length >1){
            console.log('data', q)
            props.searchCustomer(q)
        }
    }

    const clearFilters = () =>{ 
        useQ('');
        props.searchCustomer('');
    }

    const selectCustomer = (e) =>{
        const id = e.target.value;
        props.selectCustomer(id);
    }

    return(
        <Box component={Paper}>
            <Typography>Search</Typography>
            <TextField
                    type='text'
                    name='search'
                    label='Search'
                    value={q}
                    onChange={handleSearch}
             
                />
            <Button onClick={clearFilters} > Clear Filters </Button>
            <Typography>Results</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Select</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.customers.map((ele)=>{
                        return (
                            <TableRow>
                                <TableCell>{ele.title}</TableCell>
                                <TableCell>{ele.email}</TableCell>
                                <TableCell>{ele.phone}</TableCell>
                                <TableCell><Button value={ele.id} onClick={selectCustomer} variant='outlined' >Select </Button></TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Box>
    )
}
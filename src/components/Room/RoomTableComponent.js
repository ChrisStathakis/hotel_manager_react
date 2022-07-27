import React, { useState } from 'react';

import {
    TableContainer,
    Paper,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Box,
    Typography,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
     Button
} from '@mui/material';
import { FormControlUnstyled } from '@mui/base';
import axiosInstance from '../../helpers/axiosInstance';

export function RoomTableComponent(props){
    const {rooms} = props;

    const selectRoom  = id => () => props.selectRoom(id);
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} arial-label='simply table'>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Capacity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Extra</TableCell>
                        <TableCell>Is Free</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>-</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rooms.map((room)=>{
                        return (
                            <TableRow>
                                <TableCell>{room.id}</TableCell>
                                <TableCell>{room.title}</TableCell>
                                <TableCell>{room.capacity}</TableCell>
                                <TableCell>{room.value}</TableCell>
                                <TableCell>{room.extra_value_per_person}</TableCell>
                                <TableCell>{room.used}</TableCell>
                                <TableCell>{room.active}</TableCell>
                                <TableCell><Button onClick={selectRoom(room.id)}>Edit</Button></TableCell>
                            </TableRow>
                        )
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}



export function RoomFormComponent(props){
    const [ title, setTitle ] = useState('Enter Name');
    const [ capacity, setCapacity ] = useState(1);
    const [ price, setPrice ] = useState(50);
    const [ extra_cost, setExtraCost ] = useState(10);
    const [ active, setActive ] = useState(true)

    const page_title = props.room ? room.title : 'Create Room'

    function handleSubmit(){
        const data = {
            title: title,
            capacity: capacity,
            value: price,
            extra_value_per_person: extra_cost,
            active: active
        }
        props.createRoom(data);
        
    }

    const handleTitle = (e) => setTitle(e.target.value);
    const handleCapacity = (e) => setCapacity(e.target.value);
    const handlePrice = (e) => setPrice(e.target.value);
    const handleExtraCost = (e) => setExtraCost(e.target.value);
    const handleActive = (e) => setActive(e.target.value);

    return (
        <Box
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
        >
            <Typography component='h1' variant='h5'>{page_title}</Typography>
            
            <Box component="form"  noValidate sx={{ mt: 1}}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Active" 
                        onClick={(e)=>handleActive(e)}
                        value={active}
                        />
                </FormGroup>
                <TextField
                    required
                    id='title'
                    label='Title'
                    name='Title'
                    margin="normal"
                    value={title}
                    autoFocus
                    onChange={(e)=>handleTitle(e)}
                />
                <TextField
                    required
                    id='Capacity'
                    label='Capacity'
                    name='Capacity'
                    margin="normal"
                    value={capacity}
                    onChange={(e)=>handleCapacity(e)}
                    autoFocus
                />
                <TextField
                    required
                    id='Price'
                    label='Price'
                    name='Price'
                    margin="normal"
                    value={price}
                    autoFocus
                    onChange={(e)=>handlePrice(e)}
                />
                <TextField
                    required
                    id='extra_cost'
                    label='Extra Cost per Person'
                    name='extra_cost'
                    margin="normal"
                    autoFocus
                    value={extra_cost}
                    onChange={(e)=>handleExtraCost(e)}
                />
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </Box>

        </Box>
    )
}
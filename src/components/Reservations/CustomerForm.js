import React, {useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';



export default function CustomerForm(props){
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleTitle = (e) => {setTitle(e.target.value)}
    const handleEmail = (e) => {setEmail(e.target.value)};
    const handlePhone = (e) => {setPhone(e.target.value)}
    const handleSubmit = () => {props.handleSubmit(
        {
            title: title,
            email: email,
            phone: phone   
    })}

    return (
        <Box component={Paper} >
            <Typography >Create Customer</Typography>
            <TextField
                required
                name='title'
                value={title}
                onChange={handleTitle}
                label='Title'
            />
            <TextField
                required
                name='phone'
                value={phone}
                onChange={handlePhone}
                label='Phone'
            />
            <TextField
                required
                name='email'
                value={email}
                onChange={handleEmail}
                label='Email'
            />
            <Button onClick={handleSubmit} > Save</Button>
        </Box>  
        )
    
}
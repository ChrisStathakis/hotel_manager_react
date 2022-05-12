import * as React from 'react';

import { 
    CssBaseline,
    Button, 
    TextField,
    Checkbox,
    FormControlLabel,
    Box,
    Container,
    Typography

} from '@mui/material';

import axiosInstance from '../helpers/axiosInstance';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LOGIN_ENDPOINT } from '../helpers/endpoints';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAction} from '../redux/actions/authActions'

const theme  = createTheme();

class LoginView extends React.Component {
    constructor(props){
        super(props);
        console.log('login!')
        this.state = {
            username:'',
            password:'',
            isAuthenticated:false
        }
    }

    componentDidMount(){
        const {isAuthenticated} = this.props;
        this.setState({isAuthenticated:isAuthenticated})
    }

    componentDidUpdate(prevProps){
        if(prevProps.isAuthenticated !== this.props.isAuthenticated){
            if (this.props.isAuthenticated){
                this.props.history.push('/')
            }
        }
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        };

        axiosInstance.post(LOGIN_ENDPOINT, data)
            .then(
                respData=>{
                    const { status, data} = respData;
                    if (status===200){
                        this.props.loginAction(data)
                    }
                }
            )

    }

    handleChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render(){
        const {username, password} = this.state;
        const {isAuthenticated} = this.props;
        if(isAuthenticated){this.props.history.push('/')}

        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        >
                            <Typography component="h1" variant="h5">
                                Login 
                            </Typography>
                            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{mt:1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Email Address"
                                name="username"
                                autoComplete="text"
                                value={username}
                                onChange={this.handleChange}
                                autoFocus
                                />
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={this.handleChange}
                                autoComplete="current-password"
                                />
                                <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                                />
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={this.handleSubmit}
                                >
                                Sign In
                                </Button>
                            </Box>
                        
                        </Box>
                </Container>

            </ThemeProvider>
        )
    }
}

const mapStateToProps = state =>({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default compose(withRouter, connect(mapStateToProps, {loginAction}))(LoginView);
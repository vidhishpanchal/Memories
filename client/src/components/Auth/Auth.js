import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from "./styles"
import Input from './Input';
import GoogleLogin from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
const Auth = () => {
    // const state = null;
    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
    const [form, setForm] = useState(initialState);
    const classes = useStyles()
    const history = useHistory()
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleSubmit = ()=>{

    }
    const handleChange = ()=>{

    }
    const switchMode = ()=>{
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }
    const googleSuccess = (res)=>{
        console.log(res);
        const result = res?.profileObj 
        const token = res?.token 
        try {
            dispatch({type:"AUTH", data: {result, token}})
            history.push("/")
        } catch (error) {
            console.log(error);
        }
    }
    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');
    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT}
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            
            </Grid>
          </Grid>
          </form>
        </Paper>
      </Container>
    )
}

export default Auth

import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Auth from "Auth";
import axios from "axios";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        FD Kenshu
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}





const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(./kenshuposter.jpeg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const url = 'http://newfdapp.ap-southeast-1.elasticbeanstalk.com/';
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const [isLogined, setIslogined] = useState(false);

  function handleChange(e) {
    console.log(e.target.name, e.target.value);
    if(e.target.name === 'password') {
      setPassword(e.target.value);
    }
    
    if(e.target.name === 'username') {
      setUsername(e.target.value);
    }
    
  }
  function validateInputs() {
    if (username === '' || username === undefined) {
      return true;
    }

    if (password === '' || password === undefined) {
      return true;
    }
    return false;
  }
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(username);
    // console.log("HHH " + password);
    let hasErrors = validateInputs();
    if(hasErrors) {
      alert("Error. Please enter username and password");
      setUsername("");
      setPassword("");
    } else {
      Auth.login(() => {
        axios.post(url+'authenticateUser', null, {params: {'username': username, 'password': password}})
        .then(response => {
          let user = response.data;
          if(user !== "") {
            window.sessionStorage.setItem('user', JSON.stringify(user));
            props.history.push("/admin/dashboard");
          } else {
            alert("Error Logging In");
            setUsername("");
            setPassword("");
          }
          
        }).catch(error => {
          alert("Error Logging In");
        })
        
        
        
    })
    setUsername("");
    setPassword("");

    }
      

      
  
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} method="POST" noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
              value={username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={handleChange}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
             
            >
              Sign In
            </Button>
            <Grid container>
              
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import axios from "axios";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        FD
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1,0,1),
    minWidth: '100%',
    
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [division, setDivision] = useState("");
  const [cfmpassword, setCfmpassword] = useState("");
  const [exists, setExists] = useState(false);

  const url = "http://newfdapp.ap-southeast-1.elasticbeanstalk.com/"
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  
  function handleSubmit(e) {
    e.preventDefault();
    
    let obj = {
        
        'username': username,
        'secret': password,
        'name' : name,
        'region': region,
        'division': division
    };
    let hasErrors = validateInputs(obj);
    if (hasErrors) {
        alert("Error. Please re-enter the fields again.")
    } else {
        console.log(obj);

        axios.post(url +'registerUser', obj).then(
            response => {
                alert("Successfully registered.");
            }
           
        );
    }
    
    
    setUsername('');
    setPassword('');
    setRegion('');
    setDivision('');
    setCfmpassword('')
    setName('');
  }

  function validateInputs(obj) {
      let theName = obj.name;
      let theUsername = obj.username;
      let theRegion = obj.region;
      let theDivision = obj.division;
      let passwordHasErrors = validatePassword(password, cfmpassword);

      if (passwordHasErrors) {
        return true;
      }

      if(theName === '') {
        return true;
      }

      if(theUsername === '' || /\s/.test(theUsername) || exists) {
        return true;
      }

      if(theRegion === '') {
        return true;
      }

      if(theDivision === '') {
        return true;
      }

      


  }
  function validatePassword(pwd, cfm) {
      if (pwd !== cfm) {
          return true;
      } 

      if (pwd === '' || pwd.length < 7 || /\s/.test(pwd)) {
        // It has any kind of whitespace
  
          return true;
      }

      if (cfm === '' || cfm.length < 7 || /\s/.test(cfm)) {
          return true;
      }
      return false;
  }

  function handleChange(e) {
      let name = e.target.name;
      let value = e.target.value;
      console.log(name, e.target.value);
      if(name === 'region') {
          setRegion(value);
      }

      if(name === 'division') {
          setDivision(value);
      }

      if(name === 'username') {
          axios.get(url + 'checkUsernameExists?username='+value)
          .then(response => {
              setExists(response.data);
          })
          console.log(exists);
          if(exists) {
              alert("username already exists");
          } else {
            setUsername(value);
          }
          
      }

      if(name === 'password') {
        setPassword(value);
      }

      if(name === 'cfmpassword') {
        setCfmpassword(value);
      }

      

      if(name === 'name') {
          setName(value);
      }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate method="POST" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                autoComplete="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password more than 7"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cfmpassword"
                label="Confirm Password more than 7"
                type="password"
                id="cfmpassword"
                value={cfmpassword}
                autoComplete="confirm-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                value={name}
                id="name"
                label="Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
        
            <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                    FD Region
                </InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={region}
                name="region"
                onChange={handleChange}
                labelWidth={labelWidth}
                
                >
                    <MenuItem value={'1'}>1</MenuItem>
                    <MenuItem value={'2'}>2</MenuItem>
                    <MenuItem value={'3'}>3</MenuItem>
                    <MenuItem value={'4'}>4</MenuItem>
                    <MenuItem value={'5'}>5</MenuItem>
                    <MenuItem value={'6'}>6</MenuItem>
                    <MenuItem value={'7'}>7</MenuItem>
                    <MenuItem value={'8'}>8</MenuItem>
                
                </Select>
                </FormControl>
           </Grid>

           <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                    Division
                </InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={division}
                name="division"
                onChange={handleChange}
                labelWidth={labelWidth}
                
                >
                <MenuItem value={'YMD'}>YMD</MenuItem>
                <MenuItem value={'YWD'}>YWD</MenuItem>
                
                
                </Select>
            </FormControl>
           </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
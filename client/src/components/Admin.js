import React, {useState, useRef, useEffect} from 'react'
import UserProfile from './UserProfile'
import { Modal, Box, TextField, Button, Typography} from '@mui/material'
import './style.css'


const Admin = () => {

    const usernameRef = useRef('')
    const passwordRef = useRef('')
    const [username, setUsername] = useState(UserProfile.getName())
    const [password, setPassword] = useState(UserProfile.getPassword())
    const [logged, setLogged] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    useEffect(() => {
       if(username !== null && username !== ''){
        verify()
       }
    });

    const boxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        '& .MuiButton-root': {marginLeft: '5%', marginTop: '50px'}
    };

    const login = () => {
        UserProfile.setName(usernameRef.current.value)
        UserProfile.setPassword(passwordRef.current.value)
        setUsername(usernameRef.current.value)
        setPassword(passwordRef.current.value)
        verify();
    }

    const logout = () => {
        UserProfile.logOut()
        setUsername('')
        setPassword('')
        setLogged(false)
        setErrorMessage('')
    }
    
    function verify() {
        fetch("/adminVerify",{
            method: 'POST', 
            body: JSON.stringify({username:username, password: password}),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.message === "verified") {
                setLogged(true)
                UserProfile.setLogged(true)
            } else setErrorMessage('login failed')
        })
        .catch((error) => {
            console.error(error)
        });
    }

    return (
        <div>
            {!logged && 
                <Modal  open>
                    <Box sx={boxStyle}>
                        <Typography variant="h5" component="h2">
                            Verify Admin ID
                        </Typography>
                        <TextField label="username" inputRef={usernameRef} variant="outlined" />
                        <TextField label="password" inputRef={passwordRef} />
                        <Typography className='error-message'>
                            {errorMessage}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={login}
                        >
                            Login
                        </Button>
                    </Box>
                </Modal>
            }
            {logged &&
                <div className="admin-body">
                    <Typography variant="h5" component="h2">
                        Hello, {username}, you are logged in
                    </Typography>
                    <br/>
                    <Button
                        variant="contained"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </div>
                
            }

        </div>
        
    )
}

export default Admin;
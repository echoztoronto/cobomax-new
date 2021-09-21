import React, {useState,useEffect} from 'react';
import {Button, Card, Divider, CardMedia, CardActions, CardContent, Grid, Typography, Container, Modal} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ProgramCard = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return(
        <Grid item key={props.index} xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                    component="img"
                    sx={{ pt: '20%',}}
                    image={props.poster}
                    alt="img"
                />
                <Divider />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography>
                        {props.description}
                    </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button size="small" onClick={handleOpen}>View</Button>
                    {props.active? 
                        <span style={{color:'green', marginLeft:'100px'}}> 
                            Active
                        </span>
                    : 
                        <span style={{color:'red', marginLeft:'100px'}}> 
                            Expired
                        </span>
                    }
                </CardActions>
            </Card>
           
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClick={handleClose}
            >
                <img style={{maxHeight:'100%',maxWidth:'100%',marginLeft:'auto', marginRight:'auto', display:'block'}} src={props.poster} alt='img'/>
            </Modal>
        </Grid>
    )
}



const Programs = () => {

    const [active, setActive] = useState([])
    const [past, setPast] = useState([])
    const theme = createTheme();
    
    useEffect(() => {
        fetch('/events')
        .then((response) => response.json())
        .then((responseJson) => {
            const [a, p] = divideEvents(Object.values(responseJson))
            setActive(a)
            setPast(p)
        })
        .catch((error) => {
            console.error(error)
        });
    }, []);

    const divideEvents = (eventList) => {
        const today = new Date()
        const todayStr = today.toISOString().split('.')[0]

        let active = [], past = []
        eventList.forEach(element => {
            if(element.start > todayStr) active.push(element)
            else past.push(element)
        })
        return [active, past]
    }

    return (
        <div className='programs'> 
            <ThemeProvider theme={theme} >
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {active.map((event, i) => (
                            <ProgramCard index={i} key={i} active={true} {...event} />
                        ))}
                    </Grid>
                </Container>

                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {past.map((event, i) => (
                            <ProgramCard index={i} key={i} active={false} {...event} />
                        ))}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default Programs;
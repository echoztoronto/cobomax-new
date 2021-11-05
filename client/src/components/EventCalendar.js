import React, { useState,useEffect, useRef } from 'react'
import UserProfile from './UserProfile'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Button, Modal, Box, Typography, Switch, TextField} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete'
import AddBoxIcon from '@mui/icons-material/AddBox'
import './style.css'


const EventCalendar = props => {

  const [adminMode, setAdminMode] = useState(false);

  // admin mode 
  const [adminMessage, setAdminMessage] = useState('')
  const [switchOn, setSwith] = useState(false)
  const handleSwitch = () => setSwith(!switchOn)

  // event info modal
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [selected, setSelected] = useState({title:'', description:'',start:'',end:'', day:'', id:''})
  const [selectedObj, setSelectedObj] = useState(null)
  const handleInfoModalOpen = () => setInfoModalOpen(true)
  const handleInfoModalClose = () => setInfoModalOpen(false)

  // add event modal
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [clickedInfo, setClickedInfo] = useState({date:'', time:''})
  const [errorMessage, setErrorMessage] = useState('')
  const [calendarAPI, setCalendarAPI] = useState(null)
  const handleAddModalOpen = () => setAddModalOpen(true)
  const handleAddModalClose = () => setAddModalOpen(false)
  const titleRef = useRef('')
  const dateRef = useRef('')
  const startRef = useRef('')
  const endRef = useRef('')
  const descriptionRef = useRef('')

  // load events list
  const [eventList, setEventList] = useState([])
  useEffect(() => {
    setAdminMode(UserProfile.getLogged)
    fetch('/events')
    .then((response) => response.json())
    .then((responseJson) => {
      setEventList(Object.values(responseJson))
    })
    .catch((error) => {
      console.error(error)
    });
  }, []);

  // mobile view
  let initView;
  if(window.innerWidth <= 760) initView ='timeGridWeek';
  else initView = 'dayGridMonth';
  
  const handleDateClick = (info) => {
    let calendarApi = info.view.calendar
    setCalendarAPI(calendarApi)
    // normal user view: go to clicked day
    if(!switchOn) {
      if(info.view.type !== 'timeGridDay') {
        calendarApi.changeView('timeGridDay',info.dateStr)
      }
    } else { // admin add event modal 
      setClickedInfo({date:dateToYMD(info.date), time: dateToHM(info.date)})
      handleAddModalOpen()
    }
    calendarApi.unselect()
  }

  const handleEventClick = (info) => {
    let calendarApi = info.view.calendar
    setCalendarAPI(calendarApi)
    const eventInfo = {
      title:info.event.title, 
      description: info.event.extendedProps.description,
      id: info.event.extendedProps._id,
      day: dateToYMD(info.event.start),
      start: dateToHM(info.event.start),
      end: dateToHM(info.event.end),  
    }
    setSelected(eventInfo)
    setSelectedObj(info.event)
    handleInfoModalOpen()
  }

  // add event
  const addClick = (form) => {
    if(!formCheck()) return

    const imageData = new FormData(form);
    console.log(imageData.entries().next().done)

    const img_request = new Request('/images', {
        method: "post",
        body: imageData
    });

    fetch(img_request)
      .then((response) => response.json())
      .then((resJson) => {
        const event_info = {
          title: titleRef.current.value,
          description: descriptionRef.current.value,
          start: formatDateStr(dateRef.current.value, startRef.current.value),
          end: formatDateStr(dateRef.current.value, endRef.current.value),
          poster: resJson.image_url,
          created_by: UserProfile.getName
        }
        const event_request = new Request('/event', {
          method: 'POST', 
          body: JSON.stringify(event_info),
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          },
        });   
    
        fetch(event_request)
          .then((response) => response.json())
          .then((responseJson) => {
            setErrorMessage('')
            calendarAPI.addEvent(event_info)
            handleAddModalClose()
            setAdminMessage(`new event added: ${responseJson.title}`)
          })
          .catch((error) => {
            console.error(error);
            setAdminMessage('server failed')
          });
      })
      .catch(error => {
          console.log(error)
      })
  }

  // modify event 
  const saveClick = () => {
    if(!formCheck()) return
    
    const event_info = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      start: formatDateStr(dateRef.current.value, startRef.current.value),
      end: formatDateStr(dateRef.current.value, endRef.current.value)
    }

    const request = new Request(`/event/${selected.id}`, {
      method: 'PATCH', 
      body: JSON.stringify(event_info),
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      },
    });   

    fetch(request)
    .then((response) => response.json())
    .then((responseJson) => {
      setErrorMessage('')
      selectedObj.remove()
      calendarAPI.addEvent(event_info)
      handleInfoModalClose()
      setAdminMessage(`event modified: ${event_info.title}`)
    })
    .catch((error) => {
      console.error(error);
      setAdminMessage('server failed')
    });

  }

  // delete event
  const deleteClick = () => {

    const request = new Request(`/event/${selected.id}`, {
      method: 'DELETE', 
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      },
    });   

    fetch(request)
    .then((response) => response.json())
    .then((responseJson) => {
      selectedObj.remove()
      setInfoModalOpen(false)
      setSelectedObj(null)
      setAdminMessage(`deleted event: ${selected.title}`)
    })
    .catch((error) => {
      console.error(error);
    });

  }


  const formCheck = () => {
    const timeRegExp  = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const dateRegExp = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
    
    if(titleRef.current.value === '') {
      setErrorMessage('Event name cannot be empty')
      return false
    }
    else if(!dateRegExp.test(dateRef.current.value)) {
      setErrorMessage('Invalid date')
      return false
    }
    else if(!timeRegExp.test(startRef.current.value)) {
      setErrorMessage('Invalid start time')
      return false
    } else if (!timeRegExp.test(endRef.current.value)) {
      setErrorMessage('Invalid end time')
      return false
    } else if (startRef.current.value >= endRef.current.value) {
      setErrorMessage('Invalid end time')
      return false
    }
    return true
  }


  const dateToYMD = (date) => {
    let d = date.getDate();
    let m = date.getMonth() + 1; 
    let y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

  const dateToHM = (date) => {
    let h = date.getHours();
    let m = date.getMinutes();
    return '' + (h<=9 ? '0' + h : h) + ':' + (m <= 9 ? '0' + m : m);
  }

  const formatDateStr = (date, time) => (
    date + 'T' + time + ':00'
  )

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    '& .MuiTextField-root': { m: 1, width: '25ch' },
    '& .MuiButton-root': {marginLeft: '5%', marginTop: '50px'}
  };

  return(
    <div className='event-calendar'>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView={initView}
        editable={false}
        selectable={false}
        selectMirror={false}
        dayMaxEvents={false}
        weekends={true}
        allDaySlot={false}
        slotMinTime={'09:00:00'}
        slotMaxTime={'21:00:00'}
        themeSystem={'bootstrap'}
        contentHeight={580}
        displayEventTime={false}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={eventList}
      />
      <Modal
        open={infoModalOpen}
        onClose={handleInfoModalClose}
      >
        <Box sx={boxStyle}>
          { adminMode && switchOn 
          ?
            <div>
              <Typography variant="h5" component="h2" style={{marginBottom:'20px', textAlign: 'center'}}> Modify an event </Typography>
              <TextField label="Event Name" inputRef={titleRef} variant="outlined" defaultValue={selected.title}/>
              <TextField label="Date" inputRef={dateRef} placeholder="YYYY-MM-DD" variant="outlined" defaultValue={selected.day}/>
              <TextField label="Start Time" inputRef={startRef} placeholder="HH:MM" variant="outlined" defaultValue={selected.start}/>
              <TextField label="End Time" inputRef={endRef} placeholder="HH:MM" variant="outlined" defaultValue={selected.end}/>
              <TextField label="Description" inputRef={descriptionRef} minRows='5' style={{width: '85%'}} multiline defaultValue={selected.description}/>
              <Typography>
                <Button
                  startIcon={<SaveIcon />}
                  variant="contained"
                  color="primary"
                  onClick={saveClick}
                >  Save
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  color="error"
                  onClick={deleteClick}
                  type="submit"
                >  Delete
                </Button>
              </Typography>
            </div>
            :
            <div>  
              <Typography variant="h5" component="h2">{selected.title}</Typography>
              <Typography className='blue-text'>{selected.start} ~ {selected.end}</Typography>
              <Typography className='blue-text'> {selected.day} </Typography>
              <Typography  sx={{ mt: 2 }}> {selected.description}</Typography>
            </div>
          }
        </Box>
      </Modal>

      {adminMode && switchOn &&
        <Modal
          open={addModalOpen}
          onClose={handleAddModalClose}
        >
          <Box sx={boxStyle}>
            
            <Typography variant="h5" component="h2" style={{marginBottom:'20px', textAlign: 'center'}}> Add an event </Typography>
            <TextField label="Event Name" inputRef={titleRef} variant="outlined" />
            <TextField label="Date" type='date' inputRef={dateRef} placeholder="YYYY-MM-DD" variant="outlined" defaultValue={clickedInfo.date}/>
            <TextField label="Start Time" type='time' inputRef={startRef} placeholder="HH:MM" variant="outlined" defaultValue={clickedInfo.time==='00:00'?'':clickedInfo.time}/>
            <TextField label="End Time" type='time' inputRef={endRef} placeholder="HH:MM" variant="outlined" defaultValue={clickedInfo.time==='00:00'?'':clickedInfo.time}/>
            <TextField label="Description" inputRef={descriptionRef} minRows='5'  style={{width: '85%'}} multiline/>
            <form onSubmit={(e) => {
              e.preventDefault();
              addClick(e.target);
            }}>
              <label>Poster: </label>
              <input name="image" type="file"  />
              <Typography>
                <Button
                  startIcon={<AddBoxIcon />}
                  variant="contained"
                  type="submit"
                >
                  Add Event
                </Button>
              </Typography>
            </form>
            <div className='error-message'> {errorMessage} </div>
          </Box>
        </Modal>
      }

      {adminMode &&
        <div className='edit-mode'> 
          Edit Mode 
          <Switch
            checked={switchOn}
            onChange={handleSwitch}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <p className='admin-message'> {adminMessage}</p>
        </div>
      }

  </div>
  )
}

export default EventCalendar;
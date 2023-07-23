import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { v4 } from 'uuid';
import axios from 'axios'


const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar)

class cal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cal_events: [
        //State is updated via componentDidMount
      ],
    }

  }

  convertDate = (date) => {
    return moment.utc(date).toDate()
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    axios.post('https://pocketplanner-api.up.railway.app/api/calendar', { token: token })
        .then(response => {
        console.log(response.data);
        let appointments = response.data;
        
        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = this.convertDate(appointments[i].start)
          appointments[i].end = this.convertDate(appointments[i].end)
        }

        this.setState({
          cal_events:appointments
        })
  
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { cal_events } = this.state
    

    return (
      <div className="Container" style={{'padding': '1%'}}>
        <h1>Calendar</h1>
        <div style={{ height: 700 }}>
          <DnDCalendar
            draggableAccessor={(event) => true}
            selectable
            popup={true}
            localizer={localizer}
            events={cal_events}
            step={30}
            style={{ height: "100vh" }}
            defaultView='month'
            views={['month','week','day','agenda']}
            defaultDate={new Date()}
            onSelectSlot={this.handleSelect}
            onSelectEvent={this.handleSelectEvent}
            onEventDrop={this.handleEventDrop}
            onEventResize={this.handleEventDrop}
            resizable
          />
        </div>
      </div>
    );
  }

  handleSelect = async ({ start, end }) => {
    const id = v4();
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");

    if (title) {
      const event = {_id: id, title: title, start: start, end: end, token: localStorage.getItem('token')}

      this.setState(prevState => ({
        cal_events: [...prevState.cal_events, event]
      }))
  
      const response = await fetch('https://pocketplanner-api.up.railway.app/api/calendar/createEvent', {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
  
    }
  }

  handleSelectEvent = async (eventInfo) => {
    if(window.confirm(`Are you sure you want to delete the event '${eventInfo.title}'`)) {
      const id = eventInfo._id
      
      this.setState(prevState => {
        let arr = [...prevState.cal_events]
        return {cal_events: arr.filter(event => event._id !== id)}
      })

      const response = await fetch('https://pocketplanner-api.up.railway.app/api/calendar/' + id, {
        method: 'DELETE'
      })
      const json = await response.json();
    }
  }

  handleEventDrop = async ({ event, start, end, allDay }) => {
    const id = event._id
    const title = event.title

    const newEvent = {_id: id, title: title, start: start, end: end, token: localStorage.getItem('token')}

    this.setState(prevState => {
      //const existing = prevState.find(event => event._id === id)
      let arr = [...prevState.cal_events]
      const filtered = arr.filter(event => event._id !== id)
      return {cal_events: [...filtered, newEvent]}
    })

    const response = await fetch('https://pocketplanner-api.up.railway.app/api/calendar/' + id, {
      method: 'PATCH',
      body: JSON.stringify(newEvent),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
  }

}

export default cal;
import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './Calendar.css';
import { v4 } from 'uuid';

export default class Calendar extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: []
  }

  render() {

    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            events={handleGetEvents}
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}*/
            //eventRemove={this.handleEventChange}
          />
        </div>
      </div>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }
handleEventRemove = (removeInfo) => {
  const key = removeInfo.event.toPlainObject({collapseExtendedProps: true, collapseColor: true}).id

  
  const remove = async () => {
    const response = await fetch('api/calendar/' + `${removeInfo.event.toPlainObject().id}`, {
      method: 'DELETE'
    })
    const json = await response.json();

  }
  remove()
}

  /*handleEventChange = (selectInfo) => {
    //const eventString = selectInfo.event
    const deleteEvents = async () => {
      const response = await fetch('/api/events/delete', {
        method: 'DELETE'
      })
      const json = await response.json();

      if(response.ok) {
        console.log('Delete succussful')
      }
    }
    deleteEvents()

    const events = selectInfo.view.calendar.getEvents()
    
    const uploadNewEvents = async () => {
      const response = await fetch('/api/events/uploadNewEvents', {
        method: 'POST',
        body: JSON.stringify(events),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
    }
    uploadNewEvents()
  }*/

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      const serial = v4();
      calendarApi.addEvent({
        id: serial,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
      
      const handleEventAdd = async () => {
        //const eventState = calendarApi.getEventById(serial);
        const eventState = {_id: serial, title: title, start: selectInfo.startStr, end: selectInfo.endStr, allDay: selectInfo.allDay}
        const response = await fetch('/api/calendar/createEvent', {
          method: 'POST',
          body: JSON.stringify(eventState),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
      }

      handleEventAdd();
    }
    
  }

  handleEventClick = (clickInfo) => {
    const id = clickInfo.event.id
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {

      const eventRm = async () => {
        const response = await fetch('api/calendar/' + `${clickInfo.event.id}`, {
          method: 'DELETE'
        })
        const json = await response.json();
    
      }
      eventRm();

      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}

//Get events in JSON then changes to array for calendar to read
async function handleGetEvents() {
  const response = await fetch('/api/calendar/');
  const json = await response.json();
  return json
}
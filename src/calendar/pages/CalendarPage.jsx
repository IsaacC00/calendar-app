import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import { Navbar } from "../components/Navbar";
import { localizer, getMessages } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
import { useAuthStore } from '../../hooks/useAuthStore';

export const CalendarPage = () => {

  const {user} = useAuthStore();
  const {openDateModal} = useUiStore();
  const {events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const  eventStyleGetter = (event, start, end, isSelected) => {
    
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderradius:'0px',
      opacity:0.8,
      color:'white'
    }
    
    return {
      style
    }
  
  }

  const onDoubleClick = () => {
    openDateModal();
  }
  const onSelect = (event) => {
    setActiveEvent(event);
    openDateModal();
  }
  const onViewChanged = (event) => {
    localStorage.setItem('lastView',event);
    setLastView(event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={lastView}
        style={{ height: 'calc(100vh - 80px)' }}
        messages={ getMessages() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal/>

      <FabAddNew/>

      <FabDelete />

    </>
  )
}

import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveNote, onUpdateEvent, onLoadEvents } from "../store/calendar/calendarSlice";
import { calendarApi } from "../api/calendarApi";
import { coverToDate } from "../helpers/coverToDate";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveNote(calendarEvent));
  }

  const startSavingEvent = async (calendarEvent) => {

    //TODO: debemos de verificar si tiene id(se actualiza) else (es una nueva nota)
    try {

      if (calendarEvent._id) {
      
        //? si tiene ids entonces actualizamos el evento
        //? OJO el enpoint ,(coma) data que envio
        await calendarApi.put(`/events/${ calendarEvent._id }`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
  
      //? si no tiene id guradamops nuevo evento 
      const { data } = await calendarApi.post('/events/', calendarEvent);
      dispatch(onAddNewEvent({ calendarEvent, id: data.evento.id, user }));  
      
    } catch (error) {
      
      Swal.fire('Error al guardar', error.response.data?.msg, 'error');
      
      
    }

  }

  const startDeletingEvent = async() => {

    try {
      if (activeEvent._id) {
    
        await calendarApi.delete(`/events/${ activeEvent._id }`);
        dispatch(onDeleteEvent())
    
        return;
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data?.msg, 'error');
    }

  }

  const startLoadingEvents = async () => {
    try {

      const { data } = await calendarApi.get('/events/get');
      const events = coverToDate(data.eventos);
      dispatch(onLoadEvents(events));

    } catch (error) {
      console.log('Error al cargar eventos');

    }
  }

  return {
    //? propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //? metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,

  }
}

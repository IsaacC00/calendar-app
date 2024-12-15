import { parseISO } from "date-fns";

export const coverToDate = (events = []) => {
  return events.map( 
    event => {

        //? trasformar la fecha de strings a dates con el paquete de parseISO eventos 
        event.start = parseISO( event.start );
        event.end = parseISO( event.end );
        
        return event;
    }
   )
}

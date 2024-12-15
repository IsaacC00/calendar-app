import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvent =
// {
//     _id: new Date().getTime(),
//     title: 'Cumpleanios Mama',
//     notes: 'comprar pastel',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//         id: 'abc123',
//         name: 'isaac'
//     }

// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoading: true,
        events: [
            // tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveNote: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(
                event => {
                    if (event._id === payload._id) {
                        return payload;
                    }
                    return event;
                });
        },
        onDeleteEvent: (state) => {

            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = null;

            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoading = false;

            payload.forEach( event => {
                const exists = state.events.some( dbEvent => dbEvent._id === event._id );
                if ( !exists ) {
                    state.events.push( event )
                }
            });
        },
        onLogoutCaldendar:(state) => {
            state.isLoading =  true;
            state.events =  [];
            state.activeEvent = null;
        },
    }
});
export const { onSetActiveNote, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCaldendar } = calendarSlice.actions;
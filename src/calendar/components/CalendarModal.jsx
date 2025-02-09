import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from "react-datepicker";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import { es } from 'date-fns/locale/es';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';

registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const {isDateModalOpen,closeDateModal} = useUiStore();
    const { activeEvent,startSavingEvent } = useCalendarStore();
    const [formSubmited, setFormSubmited] = useState(false);
    const [formValues, setFormValues] = useState({

        title: 'Nuevo Evento',
        notes: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id dicta maxime quae,',
        start: new Date(),
        end: addHours(new Date(), 2)

    });
    
    //? checar si el titulo es valido 
    const titleClass = useMemo(() => {

        if (!formSubmited) return '';

        return (formValues.title.length > 0)
            ? 'is-valid'
            : 'is-invalid'

    }, [formValues.title, formSubmited]);

    useEffect(() => {
      if(activeEvent !== null){
        setFormValues({...activeEvent});
      }
    }, [activeEvent])
    

    const onCloseModal = () => {
        console.log('cerrando modal');
        closeDateModal();

    };

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    };


    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmited(true);
        const difference = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas Incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        if (formValues.title.length <= 0) {
            return;
        }

        //TODO:
        //? guardar cambios
        startSavingEvent(formValues);
        //? cerrar modal
        closeDateModal();
        //? remover errores
        setFormSubmited(false);

    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >

            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        onChange={(event) => onDateChange(event, 'start')}
                        selected={formValues.start}
                        className='form-control'
                        dateFormat='Pp'
                        locale={es}
                        showTimeSelect
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        onChange={(event) => onDateChange(event, 'end')}
                        selected={formValues.end}
                        className='form-control'
                        dateFormat='Pp'
                        locale={es}
                        showTimeSelect
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <small>Titulo y notas</small>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <br />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}


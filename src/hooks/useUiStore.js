import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

//? hook pra manejar el ui o el modal en este caso
//? me sirve como archivo para 
export const useUiStore = () => {

    const dispatch = useDispatch();

   const {isDateModalOpen} = useSelector(state => state.ui);

   const openDateModal = () => {
        dispatch(onOpenDateModal());
   }

   const closeDateModal = () => {
        dispatch( onCloseDateModal() );
   }

  return {
        //? propiedades 
        isDateModalOpen,
        //?metodos
        openDateModal,
        closeDateModal

  }
}

import { BrowserRouter } from "react-router-dom"
import { AppRoute } from "./routes/AppRoute"
import { Provider } from "react-redux"
import { store } from "./store/store"

export const CalendarApp = () => {
  return (
    <Provider store={store}>

      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </Provider>
  )
}

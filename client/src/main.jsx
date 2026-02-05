import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     <App />
     
    
    </Provider>
    
  </StrictMode>,
)

//coupan order => 


  //guest order => place => register => myOrders ?
  
  // /convet guest => user  //normal register session token , guest session token


  // task list 
  //1. first navbar banana hain accroding to the role  customer and guest 
 //2 . cart api pending 
 //3 coupan api banalo 
 //4 


 //loop => guest mode clear nhi 
 //customer => menu items => add to cart => order placed 
 //admin pending => 

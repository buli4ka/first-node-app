import React from "react"
import "materialize-css"
import { useRoutes } from "./routes";
import{BrowserRouter as Router} from "react-router-dom"
import { useAuth } from "./hooks/auth.hook";
import{AuthContext} from './context/AuthContext'
import{NavBar}from './components/NavBar'
import {Preloader} from './components/Preloader'


function App() {
    const {token,login,logout,userId,ready}=useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if(!ready){
        return <Preloader/>
    }

    return ( <AuthContext.Provider value={{token,login,logout,userId,isAuthenticated}}>
        <Router>
            {isAuthenticated && <NavBar/>}
            <div className="container">
                {routes}
            </div>
        </Router>
        </AuthContext.Provider>)
    }

    export default App;
import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { LinksPage } from './pages/LinksPage'
import { MainPage } from './pages/MainPage'
import { CabinetPage } from './pages/CabinetPage'


export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/links"exact>
                    <LinksPage />
                </Route>
                <Route path="/cabinet"exact>
                    <CabinetPage />
                </Route>
                <Route path="/create"exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Route path="/"exact>
                    <MainPage />
                </Route>
                <Redirect to="/" />
            </Switch>)
    }
    return(
        <Switch>
            <Route path="/auth" exact>
                <AuthPage />
            </Route>
            <Redirect to="/auth" />

        </Switch>)
}

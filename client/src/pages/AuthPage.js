import React, {useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import{AuthContext} from '../context/AuthContext'

const {DOMAIN} = require('../config/config')

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading,error,request,clearError } = useHttp()
  const [form,setForm]=useState({
    email:'',password:''
  })

  useEffect(()=>{
    message(error)
  clearError()
    
  },[error,message,clearError])

  const changeHandler = event =>{
    setForm({...form,[event.target.name]:event.target.value})
  }
  const registerHandler = async () =>{
    try {
      const data = await request(DOMAIN+"/api/auth/register", 'POST', {...form})
      console.log(data)
    } catch (e) {}
  }
  const loginHandler = async () =>{
    try {
      const data = await request(DOMAIN+"/api/auth/login", 'POST', {...form})
     auth.login(data.token,data.userId)
    } catch (e) {}
  }
    return (
        <div className = "row">
            <div className="col s6 offset-s3">
                <h1>Resize Link</h1>
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">Authorization</span>
                    <div>
                      <div className="input-field">
                        <input  id="email" name ="email" type="text"value={form.email} onChange={changeHandler}/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input  id="password" name ="password" type="password"value={form.password} onChange={changeHandler} />
                        <label htmlFor="password">Password</label>
                    </div>
                     
                    </div>                   
                  </div>  
                  <div className="card-action">
                   <button className="btn yellow darken-4" disabled={loading} onClick={loginHandler} style={{marginRight:10}}>Enter</button>
                   <button className="btn gray lighten-1 black-text" onClick={registerHandler} disabled={loading}>Register</button>
                  </div>
                </div>

            </div>
        </div>)
}
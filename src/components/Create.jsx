import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { createUser } from "../Actions/UserAction";
import { useNavigate } from "react-router-dom";

function Create(props) {
    const [user,setUser] = useState({
        name: "",
        email: "",
        mobile: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const readUser = (e) => {
        const { name, value } = e.target
        setUser({...user, [name]:value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try { 
           console.log('new =', user)
           dispatch(createUser(user))
            .unwrap()
            .then(res => {
                toast.success("New User Created Successfully");
                navigate(`/`)
            }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">Create</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <form autoComplete="off" onSubmit={submitHandler}>
                                <div className="form-group mt-2">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" value={user.name} onChange={readUser} id="name"
                                     className="form-control" required />
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" value={user.email} onChange={readUser} id="email" 
                                    className="form-control" required />
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input type="number" name="mobile" value={user.mobile} onChange={readUser} id="mobile" 
                                    className="form-control" required />
                                </div>

                                <div className="form-group mt-2">
                                    <input type="submit" value="Create User" 
                                    className="btn btn-success"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Create
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { updateUser } from "../Actions/UserAction";
import { useNavigate, useParams } from "react-router-dom";
import UserApi from '../API/UserApi';

function Update(props) {
    const [user,setUser] = useState({
        name: "",
        email: "",
        mobile: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()


    const readData = async () => {
        await UserApi.readSingle(params.id)
        .then(res => {
           setUser(res.data.user)
        })
        .catch(err => toast.err(err.message))
    }

    useEffect(() => {
        readData()
    },[])

    const readUser = (e) => {
        const { name, value } = e.target
        setUser({...user, [name]:value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try { 
            // console.log('new =', user)
            dispatch(updateUser({ user, id: params.id }))
            .unwrap()
            .then(res => {
                toast.success("User Updated Successfully");
                navigate(`/`)
            }).catch(err => toast.error(err.message))
        } catch (err) {
            toast.error(err)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">Update</h3>
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
                                    <input type="submit" value="Update User" 
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

export default Update
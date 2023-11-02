import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, retriveAll } from "../Actions/UserAction";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
  
function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [users,setUsers] = useState([])

    const readData = async () => {
        await dispatch(retriveAll())
        .unwrap()
        .then(res => {
            console.log('res =', res)
            setUsers(res.users)
        }).catch(err => toast.error(err.message))
    }

    useEffect(() => {
        readData()
    },[])

    const deleteHandler = async (id) => {
        if(window.confirm(`Are you sure want to delete user id? `)) {
            dispatch(deleteUser(id))
            .unwrap()
            .then(res => {
                toast.success('User deleted successfully')
                // window.location.reload()
                navigate(`/`)
            }).catch(err => toast.error(err.response.data.msg))
        } else {
            toast.warning('delete terminated')
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">Home</h3>
                </div>
            </div>

            <div className="row">
                {
                    users && users.map((item,index) => {
                        return (
                            <div className="col-md-6 col-sm-12 col-lg-4 mt-2 mb-2" key={index}>
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="text-center"> { item.name } </h4>
                                    </div>

                                    <div className="card-body">
                                        <p>
                                            <strong>Email :</strong>
                                            <span className="text-success float-end"> { item.email }</span>
                                        </p>

                                        <p>
                                            <strong>Mobile :</strong>
                                            <span className="text-success float-end"> { item.mobile} </span>
                                        </p>

                                        <p>
                                            <strong>Status :</strong>
                                            <span className="float-end"> { item.isActive ? <span className="text-success"> Active </span> 
                                            : <span className="text-danger"> Disabled </span> } </span>
                                        </p>
                                    </div>

                                    <div className="card-footer">
                                        <Link to={`/update/${item._id}`} className="btn btn-success">
                                            <i className="bi bi-pencil-fill"></i>
                                        </Link>
                                        <button onClick={() => deleteHandler(item._id)} className="btn btn-danger float-end">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home
import { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";

export function InstrumentDeletePage() {
    const param = useParams();
    const id = param.hangszerId;
    const [instrument, setInstrument] = useState([]);
    const [isPending, setPending] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        setPending(true);
        (async() => {
            try {
        const res = await fetch(`https://kodbazis.hu/api/instruments/${id}`, {credentials: "include"})
        const hangszer = await res.json();
        setInstrument(hangszer);
            } catch(error) {
                console.log(error);
            }
        finally {
            setPending(false);
        }
    
    })();
}, [id]);
return(
    <div className="p-5 m-auto text-center content bg-lavender">
        {
            isPending || !instrument.id ? (<div className="spinner-border"></div>) : (
                <div>
                          <div className="card p-3">
                            <div className="card-body">
                                <h4>{instrument.brand}</h4>
                            <h5 className="card-title">{instrument.name}</h5>
                            <div className="lead">{instrument.price}.- HUF</div>
                            <p>Készleten: {instrument.quantity} db</p>
                                <img className="img-fluid rounded"
                                style={{ maxHeight: "500px" }}
                                alt="hello world, ide kéne a képed!"
                                src={instrument.imageURL ? instrument.imageURL : "https://via.placeholder.com/400x800"}
                                />
                           
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                fetch(`https://kodbazis.hu/api/instruments/${id}`, {
                                    method: "DELETE",
                                    credentials: "include",
                                })
                        .then(() => {
                                    navigate("/");
                            })
                        .catch((error) => {
                            console.log(error);
                        });}}></form> </div>
                        <p>
<NavLink to={"/"}  className={"text-success"}><button className="bi bi-backspace rounded btn btn-warning">Mégsem</button></NavLink>&nbsp;&nbsp;&nbsp;
<button className="bi bi-trash3 rounded btn btn-danger">Törlés</button>
                        </p>
                        
                        </div>
                </div>
            )} </div>
);
}
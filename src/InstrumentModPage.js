import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function InstrumentModPage(props) {

    const params = useParams();
    const id = params.hangszerId;
    const navigate = useNavigate();
    const [instrument, setInstrument] = useState([]);
    const [modname, setModname] = useState('');
    const [modbrand, setModbrand] = useState('');
    const [modprice,setModprice] = useState('');
    const [modquantity, setModquantity] = useState('');
    const [modimageurl, setModimageurl] = useState('');

    useEffect(() => {
        (async() => {
            try {
        const res = await fetch(`https://kodbazis.hu/api/instruments/${id}`, {credentials: "include"})
        const hangszer = await res.json();
        setInstrument(hangszer);
        setModname(hangszer.name);
        setModbrand(hangszer.brand);
        setModprice(hangszer.price);
        setModquantity(hangszer.quantity);
        setModimageurl(hangszer.imageURL);
            } catch(error) {
                console.log(error);
            }
    })();
}, [id, modname, modbrand, modprice, modquantity, modimageurl]);

const modName = event => {
    setModname(event.target.value);
}
const modBrand = event => {
    setModbrand(event.target.value);
}
const modPrice = event => {
    setModprice(event.target.value);
}
const modQuantity = event => {
    setModquantity(event.target.value);
}
const modImageurl = event => {
    setModimageurl(event.target.value);
}
return (
    <div className="p-5 text-center content bg-whitesmoke">
            <h2>Hangszer módosítása</h2>
            <form
            onSubmit={(e) => {
                e.persist();
                e.preventDefault();
                fetch(`https://kodbazis.hu/api/instruments/${id}`, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: e.target.elements.name.value,
                        brand: e.target.elements.brand.value,
                        price: e.target.elements.price.value,
                        quantity: e.target.elements.quantity.value,
                        imageURL: e.target.elements.imageURL.value,
                    }),
                })
                .then(() => {
                    navigate("/");
                })
                .catch(console.log);
            }}
            >
    <div className="form-group row pb-3">
    <label className="col-sm-3 col-form-label">Név:</label>
<div>
    <input type="text" name="name" className="form-control" defaultValue={instrument.name} onChange={modName} />
</div>
<div className="form-group row pb-3">
    <label className="col-sm-3 col-form-label">Márka -szőlő:</label>
<div>
    <input type="text" name="brand" className="form-control" defaultValue={instrument.brand} onChange={modBrand} />
</div>
</div>
<div className="form-group row pb-3">
    <label className="col-sm-3 col-form-label">Ár:</label>
<div>
    <input type="number" name="price" className="form-control" defaultValue={instrument.price} onChange={modPrice} />
</div>
</div>
<div className="form-group row pb-3">
    <label className="col-sm-3 col-form-label">Darabszám:</label>
<div>
    <input type="number" name="quantity" className="form-control" defaultValue={instrument.quantity} onChange={modQuantity} />
</div>
</div>
<div className="form-group row pb-3">
    <label className="col-sm-3 col-form-label">Kép URL:</label>
<div>
    <input type="text" name="imageURL" className="form-control" defaultValue={instrument.imageURL} onChange={modImageurl}/>
</div>
</div>
<button type="submit" className="btn btn-success">Küldés</button>
</div>
</form>
</div>
);
}
import { useNavigate } from "react-router-dom";

export function InstrumentCreatePage() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, brand, price, quantity, imageURL } = e.target.elements;
        const instrumentData = {
            name: name.value,
            brand: brand.value,
            price: price.value,
            quantity: quantity.value,
            imageURL: imageURL.value,
        };

        try {
            await fetch("https://kodbazis.hu/api/instruments", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(instrumentData),
            });
            
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-5 text-center content bg-whitesmoke">
            <h2>Új hangszer</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Név:</label>
                    <div>
                        <input type="text" name="name" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Márka:</label>
                    <div>
                        <input type="text" name="brand" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Ár:</label>
                    <div>
                        <input type="number" name="price" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Darabszám:</label>
                    <div>
                        <input type="number" name="quantity" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL:</label>
                    <div>
                        <input type="text" name="imageURL" className="form-control" />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
        </div>
    );
}

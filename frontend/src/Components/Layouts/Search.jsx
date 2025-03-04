import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export const Search = () => {

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${keyword}`);
    }

    const clearKeyword = () => {
        setKeyword("");
    }

    useEffect(() => {
        if(location.pathname === '/'){
            clearKeyword();
        }
    },[location]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="input-group ">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Products"
                        onChange={(e) => setKeyword(e.target.value)}
                        value={keyword}
                    />
                    <button className="btn btn-warning"><i className="bi bi-search"></i></button>
                </div>
            </form>
        </>
    )
}
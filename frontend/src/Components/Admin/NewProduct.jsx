import { useEffect, useState } from "react"
import { MetaData } from "../Layouts/MetaData"
import { Sidebar } from "./SideBar"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewProducts } from "../../action/productAction";
import { toast } from "react-toastify";
import { clearError, clearProductCreated } from "../../slice/productSlice";



export const NewProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { loading, isProductCreated, error } = useSelector(state => state.productState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Headphones',
        'Accessories'
    ];

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]); // Reset preview before adding new images
        setImages([]);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(prev => [...prev, reader.result]);
                    setImages(prev => [...prev, file]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("ImagesPreview:", imagesPreview);
        // console.log("Categories:", category);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('stock', stock);
        formData.append('seller', seller);
        formData.append('category', category);
        images.forEach(image => {
            formData.append('images', image);
        })
        dispatch(createNewProducts(formData));
    }

    useEffect(() => {
        if (isProductCreated) {
            toast(`Product has created Successfully`, {
                type: 'success',
                position: 'top-center',
                onOpen: () => dispatch(clearProductCreated())
            })
            navigate('/admin/allproducts')
            return;
        }

        if (error) {
            toast(`${error}`, {
                type: 'error',
                position: 'top-center',
                theme: 'dark',
                onOpen: () => dispatch(clearError())
            })
        }

    }, [isProductCreated, error, dispatch, navigate])

    return (
        <>
            <MetaData title={'Create New Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    {/* <h3>Product List</h3> */}
                    <div className="row d-flex justify-content-center align-items-center my-5">
                        <div className="col-5 shadow-lg border rounded px-3">
                            <form onSubmit={handleSubmit} >
                                <h3 className="text-center pb-2">New Product</h3>
                                {/* Name of the Product */}
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" id="name" placeholder="Name" name='name' value={name} onChange={(e) => setName(e.target.value)} />
                                    <label htmlFor="name">Name</label>
                                </div>
                                {/* Price of the Product */}
                                <div className="form-floating mb-2">
                                    <input type="number" className="form-control" id="price" placeholder="Price" name='price' value={price} onChange={(e) => setPrice(e.target.value)} />
                                    <label htmlFor="price">Price</label>
                                </div>
                                {/* Description of the Product */}
                                <div className="form-floating mb-2">
                                    <textarea type="text" className="form-control" id="description" placeholder="Description" name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                                    <label htmlFor="description">Description</label>
                                </div>
                                {/* Category of the Product */}
                                <div className="form-floating mb-2">
                                    <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="" disabled>Select the Category</option>
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                    <label htmlFor="category">Category</label>
                                </div>
                                {/* Stock of the Product */}
                                <div className="form-floating mb-2">
                                    <input type="number" className="form-control" id="stock" placeholder="Stock" name='stock' value={stock} onChange={(e) => setStock(e.target.value)} />
                                    <label htmlFor="stock">Stock</label>
                                </div>
                                {/* Seller Name of the Product */}
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" id="sellerName" placeholder="sellerName" name='sellerName' value={seller} onChange={(e) => setSeller(e.target.value)} />
                                    <label htmlFor="sellerName">Seller Name</label>
                                </div>
                                {/* Images of the Product */}
                                <div className="form-floating mb-2">
                                    <input type="file" className="form-control" id="images" multiple onChange={onImagesChange} />
                                    <label htmlFor="images">Images</label>
                                    {(imagesPreview || []).map(image => (
                                        <img
                                            key={image}
                                            className="mt-3 mr-2"
                                            src={image}
                                            alt="Preview"
                                            height='52'
                                            width='55'
                                        />
                                    ))}
                                </div>


                                <div className="d-grid col-3 mx-auto my-2">
                                    <button className="btn btn-primary text-center" disabled={loading} type="submit" >Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
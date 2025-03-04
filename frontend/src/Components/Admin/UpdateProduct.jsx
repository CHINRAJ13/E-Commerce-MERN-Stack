import { useEffect, useState } from "react"
import { MetaData } from "../Layouts/MetaData"
import { Sidebar } from "./SideBar"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProducts } from "../../action/productAction";
import { toast } from "react-toastify";
import { clearError, clearProductUpdated } from "../../slice/productSlice";



export const UpdateProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesCleared, setImagesCleared] = useState(false);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { loading, isProductUpdated, error, product } = useSelector(state => state.productState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Headphones',
        'Accessories'
    ];

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]); // Clear old previews
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
        formData.append('imagesCleared', imagesCleared);
        dispatch(updateProducts(id, formData));
    }

    const handleImagesCleared = () => {
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
    }

    useEffect(() => {
        if (isProductUpdated) {
            toast(`Product has updated Successfully`, {
                type: 'success',
                position: 'top-center',
                onOpen: () => dispatch(clearProductUpdated())
            })
            // navigate('')
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

        dispatch(getProduct(id))

    }, [isProductUpdated, error, dispatch, navigate])

    useEffect(() => {
        if (product._id) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setSeller(product.seller);
            let images = [];
            product.images.forEach(image => {
                images.push(image.image)
            });
            setImagesPreview(images);
        }
    }, [product])

    return (
        <>
            <MetaData title={'Update Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    {/* <h3>Product List</h3> */}
                    <div className="row d-flex justify-content-center align-items-center my-5">
                        <div className="col-5 shadow-lg border rounded px-3">
                            <form onSubmit={handleSubmit} >
                                <h3 className="text-center pb-2">Update Product</h3>
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
                                    {imagesPreview.length > 0 && <span className="mr-2" onClick={handleImagesCleared} style={{ cursor: 'pointer' }}><i className="bi bi-trash3"></i></span>}
                                    {imagesPreview.length > 0 && imagesPreview.map(image => (
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
                                    <button className="btn btn-primary text-center" disabled={loading} type="submit" >Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
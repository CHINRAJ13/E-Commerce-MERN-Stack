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
                    <div className="row justify-content-center align-items-center my-5">
                        <div className="col-md-6 shadow p-4 rounded bg-white">
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-center mb-4 fw-bold text-primary">Update Product</h3>

                                {/* Product Name */}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="name" placeholder="Product Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    <label htmlFor="name">Product Name</label>
                                </div>

                                {/* Price */}
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="price" placeholder="Price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    <label htmlFor="price">Price</label>
                                </div>

                                {/* Description */}
                                <div className="form-floating mb-3">
                                    <textarea className="form-control" id="description" placeholder="Description" name="description" style={{ height: '100px' }} value={description} onChange={(e) => setDescription(e.target.value)} />
                                    <label htmlFor="description">Description</label>
                                </div>

                                {/* Category */}
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="" disabled>Select the Category</option>
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                    <label htmlFor="category">Category</label>
                                </div>

                                {/* Stock */}
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="stock" placeholder="Stock" name="stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                                    <label htmlFor="stock">Stock</label>
                                </div>

                                {/* Seller Name */}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="sellerName" placeholder="Seller Name" name="sellerName" value={seller} onChange={(e) => setSeller(e.target.value)} />
                                    <label htmlFor="sellerName">Seller Name</label>
                                </div>

                                {/* Images Upload */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Product Images</label>
                                    <input type="file" className="form-control" id="images" multiple onChange={onImagesChange} />
                                    {imagesPreview.length > 0 && (
                                        <div className="d-flex flex-wrap gap-2 mt-3">
                                            {imagesPreview.map((image, index) => (
                                                <div key={index} className="position-relative">
                                                    <img src={image} alt={`Preview ${index}`} height="60" width="60" className="rounded border" />
                                                    <i className="bi bi-x-circle-fill text-danger position-absolute top-0 end-0" style={{ cursor: 'pointer', transform: 'translate(40%, -40%)' }} onClick={handleImagesCleared}></i>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid mt-4">
                                    <button className="btn btn-primary fw-bold" disabled={loading} type="submit">
                                        {loading ? 'Updating...' : 'Update Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
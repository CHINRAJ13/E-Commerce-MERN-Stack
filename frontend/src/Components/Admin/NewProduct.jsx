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
    <div className="row justify-content-center align-items-center my-5">
      <div className="col-12 col-md-6 shadow-lg border rounded p-4 bg-white">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center pb-3">Add New Product</h3>

          {/* Product Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">Product Name</label>
          </div>

          {/* Product Price */}
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
            />
            <label htmlFor="price">Price</label>
          </div>

          {/* Description */}
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              id="description"
              name="description"
              style={{ height: '100px' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <label htmlFor="description">Description</label>
          </div>

          {/* Category */}
          <div className="form-floating mb-3">
            <select
              className="form-select"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a Category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <label htmlFor="category">Category</label>
          </div>

          {/* Stock */}
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="stock"
              placeholder="Stock"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              min="0"
            />
            <label htmlFor="stock">Stock</label>
          </div>

          {/* Seller Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="sellerName"
              placeholder="Seller Name"
              name="sellerName"
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
              required
            />
            <label htmlFor="sellerName">Seller Name</label>
          </div>

          {/* Images */}
          <div className="mb-3">
            <label htmlFor="images" className="form-label">
              Upload Images
            </label>
            <input
              type="file"
              className="form-control"
              id="images"
              multiple
              onChange={onImagesChange}
            />
            <div className="d-flex flex-wrap gap-2 mt-2">
              {(imagesPreview || []).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Preview"
                  height="52"
                  width="55"
                  style={{ borderRadius: '4px' }}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-grid mt-4">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Product"}
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
import { addCartItemsRequest, addCartItemsSuccess, decreaseCartItemQty, increaseCartItemQty } from '../slice/cartSlice'
import axios from 'axios'

const BackendUrl = `https://e-commerce-mern-stack-6a10.onrender.com`;

axios.defaults.withCredentials = true;

export const addCartItem = (id, quantity) => async (dispatch) => {
try {
    dispatch(addCartItemsRequest());
    const { data } = await axios.get(`${BackendUrl}/product/${id}`);
    dispatch(addCartItemsSuccess({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].image,
        stock: data.product.stock,
        quantity
    }));
} catch (error) {
    console.log("Cart Error: ", error);
    
}
}

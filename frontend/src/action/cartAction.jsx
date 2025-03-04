import { addCartItemsRequest, addCartItemsSuccess, decreaseCartItemQty, increaseCartItemQty } from '../slice/cartSlice'
import axios from 'axios'

export const addCartItem = (id, quantity) => async (dispatch) => {
try {
    dispatch(addCartItemsRequest());
    const { data } = await axios.get(`http://localhost:4000/product/${id}`);
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

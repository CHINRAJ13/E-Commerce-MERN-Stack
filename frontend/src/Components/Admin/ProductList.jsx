import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import { clearError } from "../../slice/productsSlice";
import { deleteProducts, getAdminProducts } from "../../action/productAction";
import {Loading} from '../Layouts/Loading';
import {MetaData} from '../Layouts/MetaData';
import {MDBDataTable} from 'mdbreact'
import { Sidebar } from "./SideBar";
import { Button } from "react-bootstrap";
import { clearProductDeleted } from "../../slice/productSlice";



export const ProductList = () => {

    const { products = [], loading, error } = useSelector(state => state.productsState);
    const { isProductDeleted, error : deleteError } = useSelector(state => state.productState);
    const dispatch = useDispatch();

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$ ${product.price}`,
                stock: product.stock,
                actions: (
                    <>
                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary"><i className="bi bi-pencil-square"></i></Link>
                        <Button onClick={(e) => handleDelete(e, product._id)} className="btn btn-danger mx-2"><i className="bi bi-trash3-fill"></i></Button>
                    </>
                )
            })
        })
        return data;
    }

    const handleDelete = (e, id) => {
        e.currentTarget.disabled = true;
        dispatch(deleteProducts(id));
    }

    useEffect(() => {

        if(isProductDeleted) {
            toast(`Product has deleted Successfully`, {
                type: 'success',
                position: 'top-center',
                onOpen: () => dispatch(clearProductDeleted())
            })
            return;
        }

        if (error || deleteError) {
            toast(error || deleteError, {
                type: 'error',
                position: 'top-center',
                theme: 'dark',
                onOpen: () => dispatch(clearError())
            })
            return;
        }

        dispatch(getAdminProducts)
    }, [error, dispatch, isProductDeleted, deleteError])

    if(loading) return <Loading />

    return (
        <>
        <MetaData title={'Product List'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h3>Product List</h3>
                    <MDBDataTable 
                    data= {setProducts()}
                    bordered
                    striped
                    hover
                    className="px-3"
                    />
                </div>
            </div>
        </>
    )
}
import { useState } from 'react';

import { addedProductsArrAction } from '../../redux/addedProductsAdd/actions';
import { productsAction } from '../../redux/products/actions';

import { useSystemData } from '../../hooks/useSystemData';

export const useContainerTableData = () =>  {
    const { products, dispatch, addedProductsArr, guid } = useSystemData()

    const [productName, setProductName] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [unallocatedProducts, setUnallocatedProducts] = useState([])
    const [open, setOpen] = useState(false);
    const [addUnallocatedProducts, setAddUnallocatedProducts] = useState(false)
    const [showProducts, setShowProducts] = useState(false);
    const [currentWarehouse, setCurrentWarehouse] = useState('')

    const warehouseName = currentWarehouse[0]?.warehouse

    const selectProduct = () => {
        setProductQuantity('')
        setProductName('')
        if (addUnallocatedProducts) {
            dispatch(addedProductsArrAction.setAddedProductsArr([...addedProductsArr, {
                id: guid(),
                name: productName,
                quantity: productQuantity,
                warehouse: warehouseName,
            }]))
        }
        setUnallocatedProducts(unallocatedProducts.filter((item) => item.name !== productName))
    }

    const findProductName = products.find((item) => item.name === productName)

    const addProducts = () => {
        if (addedProductsArr.length > 0) {
            const allProducts = products.map((el, index) => {
                if (addedProductsArr.find((item) => item.name === el.name) && el.warehouse === '') {
                    return {
                        ...el,
                        quantity: el?.quantity - addedProductsArr[index].quantity,
                    }
                }
                return el
            })
            dispatch(productsAction.setProducts([...allProducts].concat(addedProductsArr)))
        }
        handleClose()
        setAddUnallocatedProducts(false)
        dispatch(addedProductsArrAction.setAddedProductsArr([]))
    }

    const handleOpen = () => {
        setOpen(true);
        setAddUnallocatedProducts(true);
    }
    const handleClose = () => setOpen(false);
    const handleChangeProductName = (event) => {
        setProductName(event.target.value)
    }
    const closeProducts = () => setShowProducts(false)

    return {
        setUnallocatedProducts,
        unallocatedProducts,
        setAddUnallocatedProducts,
        showProducts,
        closeProducts,
        warehouseName,
        handleOpen,
        currentWarehouse,
        setShowProducts,
        setCurrentWarehouse,
        open,
        handleClose,
        addUnallocatedProducts,
        setProductQuantity,
        productName,
        handleChangeProductName,
        findProductName,
        selectProduct,
        productQuantity,
        addProducts,
    }
}
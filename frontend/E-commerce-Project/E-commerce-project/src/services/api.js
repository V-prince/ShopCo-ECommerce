


export const HostAddDataTOServer = async (formData) => {
    const token = localStorage.getItem("token");
    const res = await fetch('https://shopco-ecommerce-yael.onrender.com/api/host/add-product', {
        method: 'POST',
        headers: {
            authorization: token
        },
        body: formData,
    })
    const data = await res.json();
    return data;
}


export const AllDataComesFromServer = async () => {
    const res = await fetch('https://shopco-ecommerce-yael.onrender.com/api/products')
    const data = await res.json();
    return data
}

export const FetchOneDataFromServer = async (id) => {
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/products/${id}`);
    const result = await res.json();
    console.log("result:", result)
    const data = {
        id: result.product._id,
        title: result.product.title,
        description: result.product.description,
        price: result.product.price,
        discount: result.product.discount,
        image: result.product.image,
        variations: result.product.variations,

        avgRating: result.product.avgRatings,
    };

    return data;
}

export const PostAddCartDataToServer = async (cartData) => {

    const token = localStorage.getItem("token");

    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/products/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: token
        },
        body: JSON.stringify(cartData)
    },
    )
    const data = await res.json();
    return mappingdata(data)
}

export const FetchallCartsDataFormServer = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/products/carts`, {
        headers: {
            authorization: token
        }
    })
    const data = await res.json();


    return data.map((item) => ({

        id: item._id,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        productId: item.productId._id,
        title: item.productId.title,
        description: item.productId.description,
        price: item.productId.price,
        discount: item.productId.discount,
        image: item.productId.image,
        variations: item.productId.variations
    }))
}

export const DeleteItemFromServer = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/products/cart/delete/${id}`, {
        method: "DELETE",
        headers: {
            authorization: token
        }
    })
    const data = await res.json();
    return data;
}

export const IncrementAndDecrementCounterFromCart = async (id, newcounter) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/products/cart/quantity/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: token
        },
        body: JSON.stringify({ quantity: newcounter })
    })
    const data = await res.json();
    return data
}

export const SignupPageDataSendToServer = async (signupData) => {
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/signup`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
    })
    const data = await res.json();
    return data
}

export const LoginPageDataSendToServer = async (LoginData) => {
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/login`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(LoginData)
    })
    const data = await res.json();
    console.log("LoginData", data);
    return data
}

export const verifyOtpForLogin = async (email, otp) => {
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/verify/otp`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
    })
    const data = await res.json({});
    console.log("LoginData", data);
    return data
}


export const HosteditDataToServer = async (id, editedData) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/host/edit/${id}`, {
        method: "PUT",
        headers: {
            authorization: token,
        },
        body: editedData
    })
    const data = await res.json();
    return data;
}

export const HostDeleteDataFromServer = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/host/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization: token,
        },
    })
    const data = await res.json();
    console.log("deleteData", data.product);
    return data;
}


export const FetchAllMyProducts = async (filter) => {

    const token = localStorage.getItem("token")
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/host/myproducts?filter=${filter}`, {
        headers: {
            authorization: token,
        }
    })
    const data = await res.json()
    console.log(data)
    return data
}


export const FetchHostOrders = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/host/orders`, {
        headers: {
            authorization: token,
        }
    })
    const data = await res.json();
    return data;
}

export const UpdateStatusOnServer = async (orderId, newStatus) => {
    const token = localStorage.getItem("token")
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/host/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: token,
        },
        body: JSON.stringify({ newStatus })
    })
    const data = await res.json();
    return data;
}

export const razorpayCreateOrder = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/products/razorpay/order/create`, {
        headers: {
            authorization: token,
        },
    })
    const data = await res.json();
    return data;
}


export const razorpayVerifyPayment = async (orderData) => {
    console.log("OrderData", orderData);
    const token = localStorage.getItem("token");
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/products/razorpay/verify/payment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: token,
        },
        body: JSON.stringify(orderData)
    })
    const data = await res.json();
    return data;
}

export const getUserOrders = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/user/orders/myorders`, {
        headers: {
            authorization: token,
        }
    })
    const data = await res.json();
    console.log("MyOrders", data);
    return data;
}

export const sentEmailForForgotPassword = async (email) => {
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/auth/forgotpassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
    const data = await res.json();
    return data;
}

export const verifyOtpForForgotPassword = async (email, otp) => {

    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/auth/verifyotp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
    })
    const data = await res.json();
    return data;
}

export const sendNewPassword = async (email, newPassword) => {

    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/auth/newpassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, newPassword })
    })
    const data = await res.json();
    return data;
}


export const FetchAnaliticsData = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/host/analytics`, {
        headers: {
            authorization: token,
        }
    })
    const data = await res.json();
    return data;
}


export const postAddRatingToDataBase = async (ratingData) => {
    const token = localStorage.getItem("token")
    const res = await fetch('https://shopco-ecommerce-yael.onrender.com/api/rating/add/comment', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: token,
        },
        body: JSON.stringify(ratingData)
    })
    const data = await res.json()
    return data
}

export const getAllRatingsFromServer = async (id, filter) => {
    const token = localStorage.getItem("token")
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/rating/v1/show/${id}?filter=${filter}`, {
        headers: {
            authorization: token,
        },
    })
    const data = await res.json()
    return data
}



export const  SearchProducts = async (search) => {
    const token = localStorage.getItem("token")
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/products/search/?search=${search}`, {
        headers: {
            authorization: token,
        }
    })
    const data = await res.json();
    return data;
}

export const CancleOrderApI = async (id) => {
    const token = localStorage.getItem("token")
    const res = await fetch(`https://shopco-ecommerce-yael.onrender.com/api/products/order/cancle/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: token,
        },
        body: JSON.stringify()
    })
    const data = await res.json()
    return data
}




const mappingdata = (product) => {
    return {
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        discount: product.discount,
        image: product.image,
        soldCount: product.soldCount,
        variations: product.variations
    }

}
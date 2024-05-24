"use client";
import Navbar from "@components/Navbar";
import getStripe from "@lib/getStripe";
import {
  AddCircle,
  ArrowCircleLeft,
  Delete,
  RemoveCircle,
} from "@mui/icons-material";
import "@styles/Cart.scss";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Cart = () => {
  const { data: session, update } = useSession();
  const cart = session?.user?.cart;
  const userId = session?.user?._id;
  const updateCart = async (newCart) => {
    try {
      const response = await fetch(`/api/user/${userId}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: newCart }),
      });
      if (!response.ok) {
        console.log("Failed to update cart");
      }
      const data = await response.json();
      update({ user: { cart: newCart } });
    } catch (err) {
      console.log(err);
    }
  };

  const calcSubtotal = (cart) => {
    return cart?.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };
  const increaseQty = (cartItem) => {
    const newCart = cart?.map((item) => {
      if (item === cartItem) {
        item.quantity += 1;
        return item;
      } else {
        return item;
      }
    });
    updateCart(newCart);
  };
  const decreaseQty = (cartItem) => {
    if (cartItem.quantity < 2) {
      removeFromCart(cartItem);
      return;
    }
    const newCart = cart?.map((item) => {
      if (item === cartItem) {
        item.quantity -= 1;
        return item;
      } else {
        return item;
      }
    });
    updateCart(newCart);
  };
  const removeFromCart = (cartItem) => {
    const newCart = cart?.filter((item) => item.workId !== cartItem.workId);
    updateCart(newCart);
  };
  const subtotal = calcSubtotal(cart);

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch(`/api/stripe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({cart,userId})
    });
    if(response.statusCode===500){
        return
    }
    const data=await response.json()
    toast.loading("Redirecting to Checkout...")
    const result=stripe.redirectToCheckout({sessionId:data.id})
    if(result.error){
        console.log(result.error.message)
        toast.error("Something went wrong")
    }
  };
  return (
    <>
      <Navbar />
      <div className="cart">
        <div className="details">
          <div className="top">
            <h1>Your Cart</h1>
            <h2>
              Subtotal: <span>${subtotal}</span>
            </h2>
          </div>
          {cart?.length === 0 && <h3>Empty Cart</h3>}
          {cart?.length > 0 && (
            <div className="all-items">
              {cart.map((item, index) => (
                <div className="item" key={index}>
                  <div className="item_info">
                    <img src={item.image} alt="image" />
                    <div className="text">
                      <h3>{item.title}</h3>
                      <p>{item.category}</p>
                      <p>{item.creator.userName}</p>
                    </div>
                  </div>
                  <div className="quantity">
                    <AddCircle
                      onClick={() => increaseQty(item)}
                      sx={{
                        fontSize: "18px",
                        color: "gray",
                        cursor: "pointer",
                      }}
                    />
                    <h3>{item.quantity}</h3>
                    <RemoveCircle
                      onClick={() => decreaseQty(item)}
                      sx={{
                        fontSize: "18px",
                        color: "gray",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <div className="price">
                    <h2>{item.quantity * item.price}</h2>
                    <p>$ {item.price} /each</p>
                  </div>
                  <div className="remove">
                    <Delete
                      onClick={() => removeFromCart(item)}
                      sx={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              ))}
              <div className="bottom">
                <a href="/">
                  <ArrowCircleLeft />
                  Continue Shopping
                </a>
                <button onClick={handleCheckout}>CheckOut Now</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;

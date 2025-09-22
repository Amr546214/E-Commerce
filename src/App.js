import { useState } from "react";

const productsItems = [
  {
    id: 1,
    name: "Shirt 1",
    price: 59.99,
    image: "shirt.jpg"
  },
  {
    id: 2,
    name: "Shirt 2",
    price: 129.50,
    image: "shirt.jpg"
  },
  {
    id: 3,
    name: "Shirt 3",
    price: 39.00,
    image: "shirt.jpg"
  },
  {
    id: 4,
    name: "shirt 4",
    price: 39.00,
    image: "shirt.jpg"
  }
];

export default function App() {
  const [totalPrice,setTotalPrice] = useState({})
  const [cart,setCart]=useState(false)

  function Cart(){
    setCart(e=> !e)
  }

    function updateTotalprice(id, newprice) {
    setTotalPrice(prev => ({
      ...prev,
      [id]: newprice
    }));
  }

    const total = productsItems.reduce((acc, item) => {
    const qty = totalPrice[item.id] || 0;
    console.log( acc + qty * item.price);
    return acc + qty * item.price;
  }, 0);
  return (
   <div className="All">
     <div className="products">
    {productsItems.map((productItem)=> <Product
     name={productItem.name} 
     image={productItem.image} 
     price={productItem.price}
     id={productItem.id}
     key={productItem.id}
     ontotalchange={updateTotalprice}
     TotalPrice={totalPrice[productItem.id] || 0}
     />)}

     </div>
{cart && (
  <Totalprice
    setCart={setCart}
    total={total}
    setTotalPrice={setTotalPrice}
    totalPrice={totalPrice}
    productsItems={productsItems}
  />
)}
     {!cart&&<h1 onClick={Cart} style={{cursor:"pointer"}}><i className="fa-solid fa-cart-shopping"></i> My Cart</h1>}

   </div>
  );
}
function Product({name,image,price,id,TotalPrice,ontotalchange}){
  const [ApearPrice,setApearPrice]=useState(false)
    function toggleAppearPrice() {
    setApearPrice(e => !e);
  };
  function deleteone(){
    if(TotalPrice>0){
      ontotalchange(id, TotalPrice-1);
    }
  }
  function addone(){
      ontotalchange(id, TotalPrice+1);
  }
  function reset(){
    ontotalchange(id,0)
  }

  const total = TotalPrice * price
  
  return(
    <div className="product" >
      <img src={image} alt={name}></img>
      <h2>{name}</h2>
      <span>$ {price}</span>
      {ApearPrice &&<div className="price">
        <button onClick={deleteone}>-</button>
        <span>{TotalPrice}</span>
        <button onClick={addone}>+</button>
      </div>}
      {TotalPrice>0 && <p className="output">total Item price is $ {total}</p>}
      {TotalPrice>0 && <button onClick={reset}>reset</button>}
      <button onClick={toggleAppearPrice}>{ApearPrice?"close":"open"}</button>
    </div>
  )
}

function Totalprice({total,setTotalPrice,setCart,totalPrice,productsItems}){
  const cartItems = productsItems
  .map(item => {
    const qty = totalPrice[item.id] || 0;
    const itemTotal = qty * item.price;
    return { ...item, qty, itemTotal };
  })
  .filter(i => i.qty > 0);

  function handleComplete(){
    setTotalPrice({})
  }
  function close(){
    setCart(e=>!e)
  }
  return(
    <>
    
    <div className="Total-section">
       {
  cartItems.map(ci => (
    <div key={ci.id}>

      <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
        <img style={{width:"100px"}}  src={ci.image} alt={ci.name}></img>
        <h6>{ci.name}</h6>
       <h2>{ci.qty} piece </h2>
       {" "}
      <h3> total price : $ {ci.itemTotal.toFixed(2)}</h3>
      </div>
      

    </div>
  ))
}
     <div style={{display:"flex",justifyContent:"space-between"}}>
      <h3>Total Price</h3>
       <button onClick={close}>❌</button>
     </div>
      {total===0 && <h1 style={{textAlign:"center"}}>Empty Cart 😊</h1>}
      {total > 0 &&<p>Totalprice is $ <span style={{color:"turquoise",fontWeight:"bold",fontSize:"20px"}}>{Math.round(total)}</span></p>}
      {total>0 && <button onClick={handleComplete}>complete order</button>}

    </div>
   

    </>
  )
}
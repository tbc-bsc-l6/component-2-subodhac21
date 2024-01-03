import React, {useEffect, useState, useRef} from 'react'
import axios from "axios";
const Paypal = ({price, id}) => {
    const finalPrice = Math.round(price*0.0075);
    const [paid, setPaid] = useState(false);
    useEffect(()=>{
        if(paid=== true){
            axios.post("http://127.0.0.1:8000/api/do_payment",{id: id, price: price}).then(()=>{

            })
        }
    })
    const paypal = useRef();
    console.log(price);
    useEffect(()=>{
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "For allure mart product",
                            amount: {
                                currency_code: "USD",
                                value: finalPrice,
                                
                            }
                        }
                    ]
                })
            },
            onApprove: async(data, actions) => {
                const order = await actions.order.capture();
                setPaid(true);
                // console.log(order);
            },
            onerror: (err) => {
                console.log(err);
            }


        }).render(paypal.current)
    }, []);
  return (
    <div>
        <div ref={paypal}></div>
    </div>
  )
}

export default Paypal

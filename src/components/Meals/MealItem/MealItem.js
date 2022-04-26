import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = props => {
    const cartCtx = useContext(CartContext);
    
    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
        });
    };

    return (
        <li className={styles.meal}>
            <div>
                <h3 className={styles.description}>{props.name}</h3>
                <div className={styles.price}>{props.description}</div>
                <div>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
} 

export default MealItem;
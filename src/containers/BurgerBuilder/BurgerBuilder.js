import React, {Component} from 'react';
import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
    salad: 10,
    cheese: 15,
    meat: 20,
    bacon: 12,    
}

class BurgerBuilder extends Component {
    
    state = {

        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat:0
        },

        totalPrice: 20,
        purchasble: false,
        purchasing: false,

    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert("continue");
    }

    updatePurchasble(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasble: sum >0});    
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchasble(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){
            return ;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients}); 
        this.updatePurchasble(updatedIngredients);
    }

    render(){
        const disableInfo= {
             ...this.state.ingredients   
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.state.totalPrice.toFixed(2)} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>

                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled = {disableInfo} 
                    price = {this.state.totalPrice}
                    ordered = {this.purchaseHandler}
                    purchasble={this.state.purchasble} />

                <div>Checked</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;
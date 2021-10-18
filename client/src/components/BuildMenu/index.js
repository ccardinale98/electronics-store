import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from '../../assets/spinner.gif';
import { Link } from "react-router-dom";
import { QUERY_PRODUCTS } from '../../utils/queries';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";

function BuildMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories, currentCategory, cart } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  const { data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      console.log(categoryData.categories);
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      console.log("useEffect", categories);
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const ShowCategory = (id) => {
    console.log(id)
    console.log(categories)
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
    document.getElementById("shown").hidden = true;
    document.getElementById("choose-box").hidden = false;
  };

  function filterProducts() {
    console.log(currentCategory)
    if (!currentCategory) {
        console.log("!current")
        console.log(state.products)
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  function addToList(listing, cat) {
    console.log(listing)
    if (cat._id == categories[1]._id) {
      document.getElementById('mb-name').innerHTML = listing.name
      document.getElementById('mb-price').innerHTML = listing.price
      document.getElementById('mb-id').innerHTML = listing._id
      document.getElementById('mb-image').innerHTML = listing.image
      document.getElementById('mb-quant').innerHTML = listing.quantity
      
      priceUpdate();
    } else if (cat._id == categories[2]._id) {
      document.getElementById('cpu-name').innerHTML = listing.name
      document.getElementById('cpu-price').innerHTML = listing.price
      document.getElementById('cpu-id').innerHTML = listing._id
      document.getElementById('cpu-image').innerHTML = listing.image
      document.getElementById('cpu-quant').innerHTML = listing.quantity

      priceUpdate();
    } else if (cat._id == categories[3]._id) {
      document.getElementById('gpu-name').innerHTML = listing.name
      document.getElementById('gpu-price').innerHTML = listing.price
      document.getElementById('gpu-id').innerHTML = listing._id
      document.getElementById('gpu-image').innerHTML = listing.image
      document.getElementById('gpu-quant').innerHTML = listing.quantity

      priceUpdate();
    } else if (cat._id == categories[4]._id) {
      document.getElementById('case-name').innerHTML = listing.name
      document.getElementById('case-price').innerHTML = listing.price
      document.getElementById('case-id').innerHTML = listing._id
      document.getElementById('case-image').innerHTML = listing.image
      document.getElementById('case-quant').innerHTML = listing.quantity

      priceUpdate();
    } else if (cat._id == categories[5]._id) {
      document.getElementById('psu-name').innerHTML = listing.name
      document.getElementById('psu-price').innerHTML = listing.price
      document.getElementById('psu-id').innerHTML = listing._id
      document.getElementById('psu-image').innerHTML = listing.image
      document.getElementById('psu-quant').innerHTML = listing.quantity

      priceUpdate();
    } else if (cat._id == categories[6]._id) {
      document.getElementById('stor-name').innerHTML = listing.name
      document.getElementById('stor-price').innerHTML = listing.price
      document.getElementById('stor-id').innerHTML = listing._id
      document.getElementById('stor-image').innerHTML = listing.image
      document.getElementById('stor-quant').innerHTML = listing.quantity

      priceUpdate();
    } else if (cat._id == categories[7]._id) {
      document.getElementById('ram-name').innerHTML = listing.name
      document.getElementById('ram-price').innerHTML = listing.price
      document.getElementById('ram-id').innerHTML = listing._id
      document.getElementById('ram-image').innerHTML = listing.image
      document.getElementById('ram-quant').innerHTML = listing.quantity

      priceUpdate();
    }

    document.getElementById("shown").hidden = false;
    document.getElementById("choose-box").hidden = true;
  }

  function priceUpdate() {
    var totEl = document.getElementById("total-cost")

    var mbsum = parseInt(document.getElementById('mb-price').innerHTML)
    var cpusum = parseInt(document.getElementById('cpu-price').textContent)
    var ramsum = parseInt(document.getElementById('ram-price').innerHTML)
    var casesum = parseInt(document.getElementById('case-price').innerHTML)
    var gpusum = parseInt(document.getElementById('gpu-price').innerHTML)
    var psusum = parseInt(document.getElementById('psu-price').innerHTML)
    var storsum = parseInt(document.getElementById('stor-price').innerHTML)
    
    totEl.innerHTML = mbsum + cpusum + ramsum + casesum + gpusum + psusum + storsum
  }

  const addToCart = () => {
    var box = document.getElementsByClassName("build-box")
    for (var i = 0; i < box.length; i++) {
      const item = {
        name: box[i].childNodes[1].innerHTML,
        price: parseInt(box[i].childNodes[2].innerHTML),
        _id: box[i].childNodes[3].innerHTML,
        quantity: parseInt(box[i].childNodes[4].innerHTML),
        image: box[i].childNodes[5].innerHTML
      }
      console.log(item)
      
      if (item.name !== "") {
        const itemInCart = cart.find((cartItem) => cartItem._id === item._id)
        
        if (itemInCart) {
          dispatch({
            type: UPDATE_CART_QUANTITY,
            _id: item._id,
            purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
          });
          idbPromise('cart', 'put', {
            ...itemInCart,
            purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
          });
        } else {
          dispatch({
            type: ADD_TO_CART,
            product: { ...item, purchaseQuantity: 1 }
          });
          idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
      }
    }

    document.getElementById("items-added").hidden = false
    document.getElementById("add-cart-build").hidden = true
  }

  return (
    <div>
      <div className="row" id="shown">
        {/* container for grid */}
        <div id="build-box-div" className="col-md-5">
          <h2 id="build-title-main">Build your own PC:</h2>
          {/* pick from each category */}
          <div id="cpu-build-box" className="build-box">
            <p class="build-cat-name">CPU:</p>
            <p id="cpu-name"></p>
            <p id="cpu-price">0</p>
            <p id="cpu-id" hidden={true}></p>
            <p id="cpu-quant" hidden={true}></p>
            <p id="cpu-image" hidden={true}></p>
            <button onClick={() => ShowCategory(categories[2]._id)}>Search</button>
          </div>
          <div id="mb-build-box" className="build-box">
            <p class="build-cat-name">Motherboard:</p>
            <p id="mb-name"></p>
            <p id="mb-price">0</p>
            <p id="mb-id" hidden={true}></p>
            <p id="mb-quant" hidden={true}></p>
            <p id="mb-image" hidden={true}></p>
            <button onClick={() => ShowCategory(categories[1]._id)}>Search</button>
          </div>
          <div id="gpu-build-box" className="build-box">
            <p class="build-cat-name">GPU:</p>
            <p id="gpu-name"></p>
            <p id="gpu-price">0</p>
            <p id="gpu-id" hidden={true}></p>
            <p id="gpu-quant" hidden={true}></p>
            <p id="gpu-image" hidden={true}></p>
            <button onClick={() => ShowCategory(categories[3]._id)}>Search</button>
          </div>
          <div id="ram-build-box" className="build-box">
            <p class="build-cat-name">RAM:</p>
            <p id="ram-name"></p>
            <p id="ram-price">0</p>
            <p id="ram-id" hidden={true}></p>
            <p id="ram-quant" hidden={true}></p>
            <p id="ram-image" hidden={true}></p>
            <button onClick={() => ShowCategory(categories[7]._id)}>Search</button>
          </div>
          <div id="psu-build-box" className="build-box">
            <p class="build-cat-name">Power Supply:</p>
            <p id="psu-name"></p>
            <p id="psu-price">0</p>
            <p id="psu-id" hidden={true}></p>
            <p id="psu-quant" hidden={true}></p>
            <p id="psu-image" hidden={true}></p>
            <button onClick={() => ShowCategory(categories[5]._id)}>Search</button>
          </div>
          <div id="case-build-box" className="build-box">
            <p class="build-cat-name">Case:</p>
            <p id="case-name"></p>
            <p id="case-price">0</p>
            <p id="case-id" hidden={true}></p>
            <p id="case-quant" hidden={true}></p>
            <p id="case-image" hidden={true}></p>
            <button onClick={() => ShowCategory(categories[4]._id)}>Search</button>
          </div>
          <div id="stor-build-box" className="build-box">
            <p class="build-cat-name">Storage:</p>
            <p id="stor-name"></p>
            <p id="stor-price">0</p>
            <p id="stor-id" hidden={true}></p>
            <p id="stor-quant" hidden={true}></p>
            <p id="stor-image" hidden={true}></p>
            <button onClick={() => ShowCategory(categories[6]._id)}>Search</button>
          </div>
        </div>

        <div className="col-md-7 text-align-center justify-content-center" id="total-div">
          {/* total price div */}
          <div id="total-box">
            <h3>Total Build Cost</h3>
            <p id="total-cost">0</p>
            <button id="add-cart-build" onClick={() => addToCart()}>Add To Cart</button>
            <p ID='items-added' hidden={true}>ITEMS ADDED TO CART</p>
          </div>

          <div className="container col-md-5" id="choose-box" hidden={true}>
          {/* box to show up for cpus/gpus/motherboards/etc. */}
            <div className="my-2">
                <h2></h2>
                {
                <div className="flex flex-row wrap justify-content-between" id="choose-div-main">
                    {filterProducts().map((product) => (
                        <div className="card build-cat-card">
                        <Link to={`/products/${product._id}`}>
                        <img
                            alt={product.name}
                            src={product.image}
                        />
                        <p className="name-choose">{product.name}</p>
                        </Link>
                        <div>
                        <span id="build-choose-price">${product.price}</span>
                        </div>
                        {/* make add button att it to variables */}
                        <button onClick={() => addToList(product, product.category)}>Add to Build</button>
                    </div>
                    ))}
                </div>
                }
                {loading ? <img src={spinner} alt="loading" /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildMenu;

import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import ProductItem from '../ProductItem';
import spinner from '../../assets/spinner.gif';
import { Link } from "react-router-dom";
import { QUERY_PRODUCTS } from '../../utils/queries';
import { UPDATE_PRODUCTS } from '../../utils/actions';

function BuildMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories, currentCategory } = state;

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

  var cpu = [];
  var gpu = [];
  var cs = [];
  var psu = [];
  var ram = [];
  var stor = [];

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
    if (cat._id == "6166f2b2e703fd5ff689cb22") {
      document.getElementById('mb-name').innerHTML = listing.name
      document.getElementById('mb-price').innerHTML = "$" + listing.price
    } else if (cat._id == "6166f2b2e703fd5ff689cb23") {
      document.getElementById('cpu-name').innerHTML = listing.name
      document.getElementById('cpu-price').innerHTML = "$" + listing.price
    } else if (cat._id == "6166f2b2e703fd5ff689cb24") {
      document.getElementById('gpu-name').innerHTML = listing.name
      document.getElementById('gpu-price').innerHTML = "$" + listing.price
    } else if (cat._id == "6166f2b2e703fd5ff689cb25") {
      document.getElementById('case-name').innerHTML = listing.name
      document.getElementById('case-price').innerHTML = "$" + listing.price
    } else if (cat._id == "6166f2b2e703fd5ff689cb26") {
      document.getElementById('psu-name').innerHTML = listing.name
      document.getElementById('psu-price').innerHTML = "$" + listing.price
    } else if (cat._id == "6166f2b2e703fd5ff689cb27") {
      document.getElementById('stor-name').innerHTML = listing.name
      document.getElementById('stor-price').innerHTML = "$" + listing.price
    } else if (cat._id == "6166f2b2e703fd5ff689cb28") {
      document.getElementById('ram-name').innerHTML = listing.name
      document.getElementById('ram-price').innerHTML = "$" + listing.price
    }

    document.getElementById("shown").hidden = false;
    document.getElementById("choose-box").hidden = true;
  }

  function printListingName(arr) {
    console.log(arr)
    if (arr.length !== 0) {
      console.log(arr[0].name)
      return arr[0].name
    }
  }

  return (
    <div>
      <div className="container row" id="shown" hidden={false}>
        {/* container for grid */}
        <div id="build-box-div" className="col-md-5">
          <h2>Build your own PC:</h2>
          {/* pick from each category */}
          <div id="cpu-build-box" className="build-box">
            <p>CPU:</p>
            <p id="cpu-name"></p>
            <p id="cpu-price"></p>
            <button onClick={() => ShowCategory("6166f2b2e703fd5ff689cb23")}>Search</button>
          </div>
          <div id="mb-build-box" className="build-box">
            <p>Motherboard:</p>
            <p id="mb-name"></p>
            <p id="mb-price"></p>
            <button onClick={() => ShowCategory("6166f2b2e703fd5ff689cb22")}>Search</button>
          </div>
          <div id="gpu-build-box" className="build-box">
            <p>GPU:</p>
            <p id="gpu-name"></p>
            <p id="gpu-price"></p>
            <button onClick={() => ShowCategory("6166f2b2e703fd5ff689cb24")}>Search</button>
          </div>
          <div id="ram-build-box" className="build-box">
            <p>RAM:</p>
            <p id="ram-name"></p>
            <p id="ram-price"></p>
            <button onClick={() => ShowCategory("6166f2b2e703fd5ff689cb28")}>Search</button>
          </div>
          <div id="psu-build-box" className="build-box">
            <p>Power Supply:</p>
            <p id="psu-name"></p>
            <p id="psu-price"></p>
            <button onClick={() => ShowCategory("6166f2b2e703fd5ff689cb26")}>Search</button>
          </div>
          <div id="case-build-box" className="build-box">
            <p>Case:</p>
            <p id="case-name"></p>
            <p id="case-price"></p>
            <button onClick={() => ShowCategory("6166f2b2e703fd5ff689cb25")}>Search</button>
          </div>
          <div id="stor-build-box" className="build-box">
            <p>Storage:</p>
            <p id="stor-name"></p>
            <p id="stor-price"></p>
            <button onClick={() => ShowCategory("6166f2b2e703fd5ff689cb27")}>Search</button>
          </div>
        </div>
        <div className="col-md-5">
          {/* total price div */}
          <div id="total-box">
            <h3>Total Build Cost</h3>
            <p></p>
            <button>Add To Cart</button>
          </div>
        </div>
      </div>
      <div className="container" id="choose-box" hidden={true}>
        {/* box to show up for cpus/gpus/motherboards/etc. */}
        <div className="my-2">
            <h2></h2>
            {
            <div className="flex-row">
                {filterProducts().map((product) => (
                    <div className="card px-1 py-1">
                    <Link to={`/products/${product._id}`}>
                    <img
                        alt={product.name}
                        src={`/images/${product.image}`}
                    />
                    <p>{product.name}</p>
                    </Link>
                    <div>
                    <span>${product.price}</span>
                    </div>
                    {/* make add button att it to variables */}
                    <button onClick={() => addToList(product, product.category)}>Add</button>
                </div>
                ))}
            </div>
            }
            {loading ? <img src={spinner} alt="loading" /> : null}
        </div>
      </div>
    </div>
  );
}

export default BuildMenu;

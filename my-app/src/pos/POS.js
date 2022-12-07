import React, {useEffect, useState } from "react";
import '../App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';


function POS() {

  // state
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCustomar, setSelectedCustomar] = useState([]);
  const [changeOperation, setChangeOperation] = useState([{ id: 1, name: "%" }]);
  const [changeOperationDis, setChangeOperationDis] = useState([{ id: 1, name: "%" }]);
  const [data, setData] = useState({});


  // other hooks

  // variables
  // const products = [
  //   { id: 1, name: "apple", code: 101, cost: 20 },
  //   { id: 2, name: "banana", code: 102, cost: 55 },
  //   { id: 3, name: "mango", code: 103, cost: 72 },
  //   { id: 4, name: "orenge", code: 104, cost: 41 }
  // ]

  const [products,setProducts] = useState([])
  const [customars,setCustomars] = useState([])

  useEffect(()=>{
    (async()=>{
      const {data: products} = await axios.get('http://localhost:5000/products');
      setProducts(products);
      const {data: customars} = await axios.get('http://localhost:5000/customers');
      setCustomars(customars);
    })()
  },[])

  // const customars = [
  //   { id: 1, name: "Arefin", age: 25, gender: "male" },
  //   { id: 2, name: "Jordan Stevenson", age: 20, gender: "male" }
  // ]

  const operations = [
    { id: 1, name: "%" },
    { id: 2, name: "BDT." }
  ]

  // functions
  let totalCost = 0;

  selectedProducts.forEach((item) => {
    totalCost = Number(totalCost + item.price);

  });

  let totalQty = 0;

  selectedProducts.forEach((item) => {
    totalQty = Number(totalQty + item.qty);

  });


  let subTotal = 0;

  selectedProducts.forEach((item) => {

    subTotal = Number(subTotal + (item.price * item.qty));

  });

  // let totalVat = 0;
  let sumVat = 0;

  selectedProducts.forEach((item) => {

    const newTotalVat = { ...data };
    let newVatCal = newTotalVat.vat || 0;
    const newChangeOperation = [...changeOperation];

    const nawChangeValue = newChangeOperation[0].id;

    if (nawChangeValue === 1) {
      sumVat = Number(subTotal * (newVatCal / 100));
      // totalVat = Number(Number(subTotal) + sumVat);
    } else {
      sumVat = Number(newVatCal);
      // totalVat = Number(Number(subTotal) + sumVat);
    }

  });

  // let totalDiscount = 0;
  let sumDiscount = 0;

  selectedProducts.forEach((item) => {

    const newTotalVat = { ...data };
    let newVatCal = newTotalVat.discount || 0;
    const newChangeOperation = [...changeOperationDis];

    const nawChangeValue = newChangeOperation[0].id;

    if (nawChangeValue === 1) {
      sumDiscount = Number(subTotal * (newVatCal / 100));
      // totalDiscount = Number(Number(subTotal) - sumDiscount);
    } else {
      sumDiscount = Number(newVatCal)
      // totalDiscount = Number(Number(subTotal) - sumDiscount);
    }

  });


  // templates


  const handelPriceChange = (input, idx) => {
    const newProducts = [...selectedProducts];
    const newProduct = { ...newProducts[idx] };
    newProduct[input.id] = input.value;
    newProducts[idx] = newProduct;
    setSelectedProducts(newProducts)
  }


  const handleDecrement = (idx) => {
    const newCounts = [...selectedProducts];
    if (newCounts[idx].qty > 1) {
      newCounts[idx].qty--;
      setSelectedProducts(newCounts);
    }
  };

  const handleIncrement = (idx) => {
    const newCounts = [...selectedProducts];
    newCounts[idx].qty++;
    setSelectedProducts(newCounts);
  };

  const handleDelete = (idx) => {
    setSelectedProducts(selectedProducts.filter((item, index) => index !== idx));
  };

  const handleVat = ({ target }) => {
    const newVat = { ...data };
    newVat[target.name] = target.value;
    setData(newVat);
  };

  const handleDiscount = ({ target }) => {
    const newDiscount = { ...data };
    newDiscount[target.name] = target.value;
    setData(newDiscount);
  };



  let grandTotal = 0;

  // const newGrandTotal = { ...data };
  // const newVat = newGrandTotal.vat || 0;
  // const newDiscount = newGrandTotal.discount || 0;

  grandTotal = (Number(subTotal) + sumVat - sumDiscount).toFixed(2);


  return (
    <div className=" card container mt-5 shadow-lg">
      <div className=" mb-3 mt-5 text-center">
        <span className=" h2">Point Of Sale (POS)</span>
      </div>
      <div className="container">
        <div className="mb-5 mt-5 row">
          <span className=" mb-5 float-start col-sm-6">
            <p className="fw-bold h5">Product :</p>
            <select
              id="ppId"
              name="pId"
              className="form-select mt-2 mb-3"
              style={{ width: "500px" }}
              onChange={({ target }) => {
                const newProduct = products.find(item => item.id === Number(target.value));
                const findProduct = selectedProducts.find(item => item.id === Number(target.value));

                if (findProduct) {
                  setSelectedProducts(selectedProducts.map(item => {
                    if (item.id === Number(target.value)) {
                      item.qty = item.qty + 1;
                    }
                    return item;
                  }));
                } else {
                  setSelectedProducts([...selectedProducts, { ...newProduct, price: newProduct.cost, qty: 1 }]);
                }
              }}
            >
              {products.map((item) => <option key={item.id} value={item.id}>{`${item.code} - ${item.name}`}</option>)}
            </select>
          </span>
          <span className="col-sm-6">
            <p className="fw-bold  h5">Customar :</p>
            <select
              id="ppId"
              name="pId"
              className="form-select mt-2"
              style={{ width: "500px" }}
              onChange={({ target }) => {
                const newCustomar = customars.find(item => item.id === Number(target.value));
                const findCustomar = selectedCustomar.find(item => item.id === Number(target.value));

                if (findCustomar && selectedCustomar.length === 0) {
                  setSelectedCustomar([...selectedCustomar]);

                } else if (!findCustomar && selectedCustomar.length !== 0) {
                  setSelectedCustomar([newCustomar]);
                }
                else {
                  if (selectedCustomar.length === 0) {
                    setSelectedCustomar([...selectedCustomar, newCustomar]);
                  }
                }
              }
              }
            >
              {customars.map((item) => <option key={item.id} value={item.id}>{`${item.name}`}</option>)}
            </select>

            <div className="mt-4">
              {
                selectedCustomar.map((customar, idx) => {
                  return (
                    <div key={idx}>
                      <p><b>Name :</b> {customar.name}</p>
                      <p><b>Age :</b> {customar.age}</p>
                      <p><b>Gender:</b> {customar.gender}</p>
                    </div>
                  )
                }
                )
              }
            </div>
          </span>

        </div>
        <div className="mb-5">
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product</th>
                <th scope="col">Cost</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Cost</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.length === 0 ? <tr><td colSpan={6} className="text-center text-danger">No product added to cart</td></tr>
                : selectedProducts.map((product, idx) => {
                  return (
                    <tr key={idx}>
                      <th scope="row">{idx + 1}</th>
                      <td><span className="badge bg-secondary">{product.code}</span> {product.name}</td>
                      <td>
                        <input
                          id="price"
                          className="text-center"
                          type="number"
                          min={0}
                          value={product.price} style={{ width: "100px" }}
                          onChange={({ target }) => handelPriceChange(target, idx)}
                        />
                      </td>
                      <td>
                        <div className="input-group mb-3">
                          <span className="input-group-text delIcon" onClick={() => handleDecrement(idx)}>-</span>
                          <input
                            id="qty"
                            className="form-control text-center"
                            type="number"
                            min={0}
                            value={product.qty} style={{ width: "50px" }}
                            onChange={({ target }) => handelPriceChange(target, idx)}
                          />
                          <span className="input-group-text delIcon" onClick={() => handleIncrement(idx)}>+</span>
                        </div>
                      </td>
                      <td>৳{((product.price * product.qty) || 0).toFixed(2)}</td>
                      <td>
                        <i className="bi bi-x-square delIcon" onClick={() => handleDelete(idx)}></i>
                      </td>
                    </tr>
                  )
                })}

            </tbody>
          </table>
          <div>
            <span className="fw-bold">Total Item : {selectedProducts.length}</span>
            <span className="mx-5"></span>
            <span className="mx-5"></span>
            <span className="mx-5"></span>
            <span className="fw-bold">Total Cost : ৳ {totalCost.toFixed(2)}</span>
            <span className="mx-5"></span>
            <span className="mx-2"></span>
            <span className="fw-bold">Total Quantity : {totalQty} </span>
            <span className="mx-5"></span>
            <span className="mx-4"></span>
            <span className="fw-bold">Sub total : ৳ {subTotal.toFixed(2)} </span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">
          </div>
          <div className="col-sm-4">
            <div className="fw-bold mb-3">
              VAT : <input
                className="text-center"
                type="text"
                placeholder="0.0"
                onChange={handleVat}
                name="vat"
                style={{ width: "100px" }} />
              <select className="text-center" style={{ width: "85px", height: "30px" }}
                onChange={({ target }) => {

                  const newOperation = operations.find(item => item.id === Number(target.value));
                  const findOperation = changeOperation.find(item => item.id === Number(target.value));


                  if (findOperation && changeOperation.length === 0) {
                    setChangeOperation([...changeOperation]);

                  } else if (!findOperation && changeOperation.length !== 0) {
                    setChangeOperation([newOperation]);
                  }
                  else {
                    if (changeOperation.length === 0) {
                      setChangeOperation([...changeOperation, newOperation]);
                    }
                  }
                }}
              >
                {
                  operations.map((item) =>
                    <option key={item.id} value={item.id}>{`${item.name}`}</option>
                  )}
              </select> : ৳ {(sumVat).toFixed(2)}
            </div>
            <div className="fw-bold mb-3">
              Discount: <input
                className="text-center"
                type="text" placeholder="0.0"
                onChange={handleDiscount}
                name="discount"
                style={{ width: "100px" }} />
              <select className="text-center" style={{ width: "85px", height: "30px" }}
                onChange={({ target }) => {

                  const newOperation = operations.find(item => item.id === Number(target.value));
                  const findOperation = changeOperationDis.find(item => item.id === Number(target.value));


                  if (findOperation && changeOperationDis.length === 0) {
                    setChangeOperationDis([...changeOperationDis]);

                  } else if (!findOperation && changeOperationDis.length !== 0) {
                    setChangeOperationDis([newOperation]);
                  }
                  else {
                    if (changeOperationDis.length === 0) {
                      setChangeOperationDis([...changeOperationDis, newOperation]);
                    }
                  }

                }} >

                {
                  operations.map((item) =>
                    <option key={item.id} value={item.id}>{`${item.name}`}</option>
                  )}
              </select> : ৳ {(sumDiscount).toFixed(2)}
            </div>
            <div className="fw-bold mb-5">
              Grand Total : ৳ {grandTotal}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mb-5 mt-3 ">
        <button
          type="button"
          className="btn btn-outline-dark"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo">
          <i className="bi bi-send-fill"></i> SEND INVOICE</button>
      </div>
      <div>
        <div
          className="modal fade modal-xl"
          id="exampleModal" tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Invoice #01</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body container mt-3 ms-3">
                <div className="row">
                  <span className="col-sm-9">
                    <div className="ms-3">
                      <p className="fw-bold">Invoice To:</p>
                      {
                        selectedCustomar.map((customar, idx) => {
                          return (
                            <div key={idx}>
                              <p>Name: {customar.name}</p>
                              <p>Age: {customar.age}</p>
                              <p>Gender: {customar.gender}</p>
                              <p>(616) 865-4180</p>
                            </div>
                          )
                        })
                      }
                    </div>
                  </span>
                  <span className="col-sm-3">
                    <p className="fw-bold">Bill To:</p>
                    <p>Total Due:	$12,110.55</p>
                    <p>Bank name:	American Bank</p>
                    <p>Country:	United States</p>
                    <p>SWIFT code:	BR91905</p>
                  </span>
                </div>
                <div className="p-3">
                  <div className="me-4">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">#</th>
                          <th scope="col" className="text-center">Product</th>
                          <th scope="col" className="text-center">Cost</th>
                          <th scope="col" className="text-center">Quantity</th>
                          <th scope="col" className="text-center">Total Cost</th>
                        </tr>
                      </thead>
                      {selectedProducts.map((item, idx, arr) =>
                        <tbody key={idx}>
                          <tr>
                            <th scope="row" className="text-center">{idx + 1}</th>
                            <td className="text-center">{selectedProducts[idx].code + " - " + selectedProducts[idx].name}</td>
                            <td className="text-center">{selectedProducts[idx].price}</td>
                            <td className="text-center">{selectedProducts[idx].qty}</td>
                            <td className="text-center">{selectedProducts[idx].price * selectedProducts[idx].qty}</td>
                          </tr>
                        </tbody>
                      )}
                      <tfoot>
                        <tr>
                          <th scope="row" className="text-center"> Total Item : {selectedProducts.length}</th>
                          <td className="mx-5"></td>
                          <td className="fw-bold text-center">Total Cost : ৳ {totalCost.toFixed(2)}</td>
                          <td className="fw-bold text-center">Total Quantity : {totalQty} </td>
                          <td className="fw-bold text-center">Sub total : ৳ {subTotal.toFixed(2)} </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-9"></div>
                  <div className="col-sm-3">
                    <div className="fw-bold mb-2">
                      {/* {data.vat} % : */}
                      VAT :  ৳ {(sumVat).toFixed(2)}
                    </div>
                    <div className="fw-bold mb-2">
                      {/* {data.discount} % : */}
                      Discount: ৳ {(sumDiscount).toFixed(2)}  
                    </div>
                    <div className="fw-bold mb-3">
                      Grand Total : ৳ {grandTotal}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="me-5">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">PRINT</button>
                  <button type="button" className="btn btn-dark ms-2">DOWNLOAD</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default POS;
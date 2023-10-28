import React, { useState } from "react";
import NavbarAdmin from './../../components/NavbarAdmin';
import PagePadding from './../../components/PagePadding';
import PageHeading from './../../components/PageHeading';

const Product = () => {
    const [createProduct, setCreateProduct] = useState(true);
    const [productData, setProductData] = useState({
        title: "",
        description: "",
        image: "",
        price: 0,
        category: ""
    });
    const [imagePreview, setImagePreview] = useState("");

    const handleCreateProduct =async ()=>{
        console.log(productData);

        let formData = new FormData();
        formData.append("image", productData["image"])
        formData.append("title", productData["title"])
        formData.append("description", productData["description"])
        formData.append("price", productData["price"])
        formData.append("category", productData["category"])

        const response = await fetch("/api/product", {
            method: "POST",
            body: formData
        })
        
        const data = await response.json();
        console.log(data)
        console.log("data updated successfully");
    }

    const handleInputChange = (event, attributeName)=>{
        setProductData(prev => ({...prev ,[attributeName]: event.target.value}))
    }

        // Create an event handler to capture the selected image
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0]; // Assuming you are allowing single file selection
        setProductData(prev => ({ ...prev, image: imageFile }));

        // Read the selected image file and set the imagePreview state
        const reader = new FileReader(event.target.files[0]);
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(imageFile);
    }
    
  return <div>
    <NavbarAdmin/>
    <PagePadding>
        <PageHeading>CREATE PRODUCT</PageHeading>

{/* form */}
<div className="flex flex-col space-y-7 items-center">
        <div>
        {imagePreview && (
                            <div className="flex-col flex">
                                <img src={imagePreview} alt="Product Preview" className="max-w-full" />
                            </div>
                        )}
        </div>
        <div className=" flex flex-col space-y-5 lg:w-1/2">
          {/* left one */}
          <div className="flex-col flex">
            <label htmlFor="title">Title</label>
            <input contentEditable={"false"} onChange={(e)=>handleInputChange(e, "title")} type="text" value={productData.name} name="name" className="py-3 px-3 border-2 border-gray-400"/>
          </div>
          <div className="flex-col flex">
            <label htmlFor="description">Description</label>
            <input type="text" onChange={(e)=>handleInputChange(e, "description")}  value={productData.description} name="description" className="py-3 px-3 border-2 border-gray-400"/>
          </div>
          <div className="flex-col flex">
            <label htmlFor="price">Price</label>
            <input type="number"  onChange={(e)=>handleInputChange(e, "price")}  value={productData.price} name="price" className="py-3 px-3 border-2 border-gray-400"/>
          </div>

          <div className="flex-col flex">
              <label htmlFor="category">Category</label>
              <input value={productData.category} type="text"  onChange={(e)=>handleInputChange(e, "category")}  name="category" className="py-3 px-3 border-2 border-gray-400"/>
            </div>
          <div className="flex-col flex">
              <label htmlFor="image">Product Image</label>
              <input type="file" onChange={handleImageChange}  name="product_image" className="py-3 px-3 border-2 border-gray-400"/>
            </div>
        </div>

        <button className="px-10 py-2 bg-red-600 text-white rounded-sm" onClick={handleCreateProduct}>CREATE PRODUCT</button>
        </div>
    </PagePadding>
  </div>;
};

export default Product;

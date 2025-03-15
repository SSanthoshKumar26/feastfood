import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios'; // Make sure axios is imported
import { toast } from 'react-toastify';

const Add = ({url}) => {

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if an image has been uploaded
    if (!image) {
      alert("Please upload an image");
      return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      // Send POST request
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.success) {
        // Reset form after successful submission
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        });

        setImage(null); // Clear image
        toast.success(response.data.message)
      } else {
        // Handle failure case
      toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error while submitting the form:", error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <div className="add-container">
      <form className="add-form" onSubmit={handleSubmit}>
        {/* Image upload section */}
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Product Name Section */}
        <div className="form-group">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Product Description Section */}
        <div className="form-group">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            value={data.description}
            onChange={onChangeHandler}
            required
          ></textarea>
        </div>

        {/* Category and Price Section */}
        <div className="add-category-price">
          <div className="form-group">
            <p>Product Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="form-group">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="$1"
              value={data.price}
              onChange={onChangeHandler}
              required
              min="1"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;

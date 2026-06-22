import React, { useEffect, useState } from "react";
import { FetchOneDataFromServer, HostAddDataTOServer, HosteditDataToServer } from "../services/api";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function HostPage() {

  const { id } = useParams()


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [imageUrl, setImage] = useState(null);
  const [toggel, setToggel] = useState("add");

  const colors = [
    "Black",
    "White",
    "Gray",
    "Silver",
    "Red",
    "Maroon",
    "Pink",
    "Blue",
    "Navy",
    "Sky Blue",
    "Royal Blue",
    "Green",
    "Olive",
    "Lime",
    "Yellow",
    "Mustard",
    "Orange",
    "Purple",
    "Violet",
    "Brown",
    "Beige",
    "Cream",
    "Gold",
    "Multi Color",
  ];

  const [variations, setVariations] = useState([
    {
      color: "",
      size: "",
      stock: ""
    }
  ]);


  const handleVariationChange = (index, field, value) => {

    const updatedVariations = [...variations];
    updatedVariations[index][field] = value;
    setVariations(updatedVariations);

  };


  const addVariation = () => {

    setVariations([
      ...variations,
      {
        color: "",
        size: "",
        stock: ""
      }
    ]);

  };


  const deleteVariation = (index) => {

    const filtered = variations.filter(
      (_, i) => i !== index
    );

    setVariations(filtered);

  };



  const editData = async () => {
    const data = await FetchOneDataFromServer(id)
    setTitle(data.title)
    setDescription(data.description)
    setPrice(data.price)
    setDiscount(data.discount)
    setImage(data.image)
    setVariations(data.variations)
  }

  useEffect(() => {
    if (id) {
      const editedData = editData();
    }
  }, [id])


  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("image", imageUrl);
    formData.append("variations", JSON.stringify(variations));

    console.log("formData", formData.get("title"));
    console.log("id", id)

    if (!id) {
      const data = await HostAddDataTOServer(formData);
    }
    else {
      const data = await HosteditDataToServer(id, formData);
    }

    setTitle("")
    setDescription("")
    setPrice("")
    setDiscount("")
    setImage(null)
    setVariations([{
      color: "",
      size: "",
      stock: ""
    }])
  };






  return (

    <div className="bg-[#f5f5f5] flex mt-22 h-full">

      {/* Sidebar */}
      <div className="w-65 bg-black text-white p-8">

        <h1 className="text-4xl font-bold mb-12">
          SHOP.CO
        </h1>

        <div className="flex flex-col gap-4">

          <button
            onClick={() => setToggel("add")}
            className={`w-full text-left transition-all duration-200 ${toggel === "add"
              ? "bg-white/10 text-white font-semibold"
              : "bg-transparent text-white"
              } hover:bg-white/10 py-3 rounded-2xl px-5`}
          >
            Add Product
          </button>

          <Link
            to="/myproducts"
            onClick={() => setToggel("products")}
            className={`w-full text-left transition-all duration-200 ${toggel === "products"
              ? "bg-white/10 text-white font-semibold"
              : "bg-transparent text-white"
              } hover:bg-white/10 py-3 rounded-2xl px-5`}
          >
            My Products
          </Link>

          <Link
            to="/host/order"
            onClick={() => setToggel("orders")}
            className={`w-full text-left transition-all duration-200 ${toggel === "orders"
              ? "bg-white/10 text-white font-semibold"
              : "bg-transparent text-white"
              } hover:bg-white/10 py-3 rounded-2xl px-5`}
          >
            Orders
          </Link>

          <Link
            to="/host/products/analysis"
            onClick={() => setToggel("analysis")}
            className={`w-full text-left transition-all duration-200 ${toggel === "analysis"
              ? "bg-white/10 text-white font-semibold"
              : "bg-transparent text-white"
              } hover:bg-white/10 py-3 rounded-2xl px-5`}
          >
            Analysis
          </Link>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 h-full p-10">

        <div className="bg-white h-full rounded-[30px] p-10 max-w-6xl">

          <h1 className="text-5xl font-bold mb-10">
            Upload Product
          </h1>

          <form
            onSubmit={handleSubmit}
            method="POST"
            className="space-y-8"
            encType="multipart/form-data"
          >

            {/* Product Name */}
            <div>

              <label className="block mb-2 font-semibold">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none"
              />

            </div>

            {/* Description */}
            <div>

              <label className="block mb-2 font-semibold">
                Description
              </label>

              <textarea
                placeholder="Write description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 h-40 resize-none outline-none"
              />

            </div>

            {/* Price Section */}
            <div className="grid grid-cols-2 gap-5">

              <div>

                <label className="block mb-2 font-semibold">
                  Price
                </label>

                <input
                  type="number"
                  placeholder="240"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="block mb-2 font-semibold">
                  Discount %
                </label>

                <input
                  type="number"
                  placeholder="20"
                  value={discount}
                  onChange={(e) =>
                    setDiscount(e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

            </div>

            <div>

              <label className="block mb-2 font-semibold">
                Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 h-40 resize-none outline-none"
              />

            </div>


            {/* Variations */}
            <div>

              <div className="flex items-center justify-between mb-5">

                <h2 className="text-2xl font-bold">
                  Product Variations
                </h2>

                <button
                  type="button"
                  onClick={addVariation}
                  className="bg-black text-white px-5 py-3 rounded-2xl"
                >
                  + Add Variation
                </button>

              </div>

              <div className="space-y-4">

                {
                  variations.map((item, index) => (

                    <div
                      key={index}
                      className="grid grid-cols-4 gap-4 bg-gray-50 p-5 rounded-2xl"
                    >

                      {/* Color */}
                      <select
                        value={item.color}
                        onChange={(e) =>
                          handleVariationChange(
                            index,
                            "color",
                            e.target.value
                          )
                        }
                        className="border border-gray-200 rounded-xl px-4 py-3 outline-none bg-white"
                      >

                        <option value="">
                          Select Color
                        </option>
                        
                        {colors.map((color, i) => (
                          <option key={i} value={color}>
                            {color}
                          </option>
                        ))}

                      </select>

                      {/* Size */}
                      <select
                        value={item.size}
                        onChange={(e) =>
                          handleVariationChange(
                            index,
                            "size",
                            e.target.value
                          )
                        }
                        className="border border-gray-200 rounded-xl px-4 py-3 outline-none bg-white"
                      >

                        

                        <option value="">
                          Select Size
                        </option>

                        <option>
                          Small
                        </option>

                        <option>
                          Medium
                        </option>

                        <option>
                          Large
                        </option>

                        <option>
                          XL
                        </option>

                      </select>

                      {/* Stock */}
                      <input
                        type="number"
                        placeholder="Stock"
                        value={item.stock}
                        onChange={(e) =>
                          handleVariationChange(
                            index,
                            "stock",
                            e.target.value
                          )
                        }
                        className="border border-gray-200 rounded-xl px-4 py-3 outline-none bg-white"
                      />

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          deleteVariation(index)
                        }
                        className="bg-red-500 text-white rounded-xl"
                      >
                        Delete
                      </button>

                    </div>

                  ))
                }

              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-black text-white px-10 py-4 rounded-full text-lg font-semibold"
            >
              Upload Product
            </button>

          </form>

        </div>

      </div>

    </div >

  );

} 
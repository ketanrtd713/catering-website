import React from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import PageHeading from "./../../components/PageHeading";
import PagePadding from "./../../components/PagePadding";
import authoriseAdmin from "../../utils/authoriseAdmin";
import Order from "./../../models/Order";
import { data } from "autoprefixer";
import Image from "next/image";
import Link from "next/link";

const orders = ({ orders }) => {
  return (
    <div>
      <NavbarAdmin />

      <PagePadding>
        <PageHeading>USER ORDERS</PageHeading>

        {/* <div>
            <h1>Total Pending Orders</h1>
            {orders.length}
        </div> */}
        <div>
          {/* all products */}
          <div className="flex flex-col">
            <div className="grid grid-cols-6 font-bold text-xl pb-2 border-b-2 border-gray-200 px-2 hidden lg:visible">
              <div>User</div>
              <div className="col-span-2">Products Bought</div>
              <div>Total Price</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            {orders.map((order, index) => (
              <div
                key={index}
                className="grid gap-2 lg:gap-1 grid-cols-6 py-2 border-b-2 border-gray-200 px-2"
              >
                <div className="flex flex-col col-span-6 lg:col-span-1">
                  <div>{order.user.name}</div>
                  <div>{order.user.email}</div>
                  <div>{order.user.phone}</div>
                  <div className="font-bold mt-4">Order Id: {order._id}</div>
                  <div className="font-bold mt-4">
                    Address : {order.address}
                  </div>
                </div>
                <div className="col-span-6 lg:col-span-2">
                  {/* copy code from cart  */}
                  <div className="mt-2 space-y-2">
                    {order.products.map((product, index) => (
                      <div key={index} className="grid grid-cols-6 gap-2 lg:gap-1">
                        <div className="col-span-2 md:col-span-2">
                          <Image
                            width={1000}
                            height={1000}
                            src="/intro.jpg"
                            className="w-full aspect-square rounded-sm shadow-sm"
                          />
                        </div>
                        <div className="col-span-3 lg:col-span-5 flex flex-col space-y-2">
                          <Link
                            className="text-xl hover:text-blue-500 duration-300"
                            href={`/shop/product/${product.product._id}`}
                          >
                            {product["product"]["title"]}
                          </Link>
                          <div className="text-md text-gray-500">
                            {product.product.category}
                          </div>
                          {/* <div className="text-md text-gray-500">
                                    TODO: Rating Here
                                </div> */}

                          <div className="flex space-x-2 lg:space-x-5 items-start">
                            <div className="font text-xl">
                              ₹{product.product.price}
                            </div>
                            <div className="flex justify-center px-2 py-1 border-2 border-gray-400">
                              {product.quantity}
                            </div>
                            <div className=" text-xl">
                              = {product.product.price * product.quantity}
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-span-1">{cartItem._id}</div> */}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-6 lg:col-span-1">
                  <div className="font-bold text-xl">{order.totalPrice}</div>
                  <div className="text-xl">{order.paymentOption}</div>
                </div>
                <div className="flex flex-col space-y-2 justify-start  lg:items-start col-span-6 lg:col-span-1">
                  <div
                    className={`rounded-md px-5 h-fit ${
                      order.status === "ongoing" && "bg-yellow-500 text-white"
                    }`}
                  >
                    {order.status}
                  </div>
                  <div className="ml-2">
                    Ordered On {order.timeWhenOrdered}
                  </div>
                </div>
                <div className="flex space-x-2 items-start col-span-6 lg:col-span-1">
                  <button className="px-4 py-1 bg-red-400 text-white">
                    EDIT
                  </button>
                  <button className="px-4 py-1 bg-green-400 text-white">
                    Delivered Order
                  </button>
                  <button className="px-4 py-1 bg-red-400 text-white">
                    Cancel Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PagePadding>
    </div>
  );
};

export default orders;

// backend logic here
export async function getServerSideProps(context) {
  const { req } = context;
  const decodedToken = await authoriseAdmin(req);

  // now get all the orders associated
  const orders = await Order.find({}).populate("user"); // get only specific details of user
  console.log(orders);
  const serialised = JSON.stringify(orders);
  const parsed = JSON.parse(serialised);
  return {
    props: {
      orders: parsed,
    },
  };
}

import Product from "@/components/Product/Product";

const HomeRouter = async () => {
  const product = await fetch(`${process.env.SERVER}/api/product`);
  const data =  product.ok ? await product.json() : []

  return <Product data={data} total={data.total}/>;
};

export default HomeRouter;

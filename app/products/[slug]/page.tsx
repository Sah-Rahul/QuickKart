import DetailsPage from "@/components/DetailsPage/DetailsPage";
import slugInterface from "@/interfacesTypes/slug.interface";

const DetailsPageRouter = async (props: slugInterface) => {
  // Await params before destructuring
  const params = await props.params;
  const res = await fetch(`${process.env.SERVER}/api/product/${params.slug}`);
  const data = res.ok ? await res.json() : null;

  return <DetailsPage data={data} />;
};

export default DetailsPageRouter;

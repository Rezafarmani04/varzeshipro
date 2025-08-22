import ProductDetail from "./ProductDetail";

export default function ProductPage({ params }: { params: any }) {
  return <ProductDetail productId={params.id} />;
}

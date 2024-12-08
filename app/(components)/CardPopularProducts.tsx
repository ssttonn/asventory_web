import api from "@/state/api";
import DashboardProductCard from "./DashboardProductCard";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } =
    api.useGetDashboardMetricsQuery();

  return (
    <div className="row-span-3 xl:row-span-6 bg-white rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts?.map((product) => {
              return (
                <DashboardProductCard
                  key={product.productId}
                  product={product}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;

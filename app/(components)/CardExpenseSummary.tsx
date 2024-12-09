import api from "@/state/api";
import { TrendingUp } from "lucide-react";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const colors = ["#00C49F", "#0088FE", "#FFBB28"];

const CardExpenseSummary = () => {
  const { data: dashboardMetrics, isLoading } =
    api.useGetDashboardMetricsQuery();

  const expenseSummary = useMemo(() => {
    return dashboardMetrics?.expenseSummary || [];
  }, [dashboardMetrics]);

  const expenseByCategorySummary = useMemo(
    () => dashboardMetrics?.expenseByCategorySummary,
    [dashboardMetrics]
  );

  const expenseSums = useMemo(() => {
    return expenseByCategorySummary?.reduce((acc: any, item) => {
      const category = item.category + " Expenses";
      const amount = item.amount;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    });
  }, [expenseByCategorySummary]);

  const expenseCategories = useMemo(() => {
    return Object.entries(expenseSums || {}).map(([name, value]) => ({
      name,
      value,
    }));
  }, [expenseSums]);

  const totalExpenses = useMemo(() => {
    return expenseCategories.reduce((acc, item) => acc + item.value, 0);
  }, [expenseCategories]);

  const formattedTotalExpense = totalExpenses.toFixed(2);

  return (
    <div className="row-span-3 bg-white rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Expense Summary
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div className="xl:flex justify-between pr-7">
            {/* CHART */}
            <div className="relative basis-3/5">
              <ResponsiveContainer width={"100%"} height={140}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    nameKey="name"
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={60}
                    fill="#8884d8"
                  >
                    {expenseCategories.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-3/5">
                <span className="font-bold text-xl">
                  ${formattedTotalExpense}
                </span>
              </div>
            </div>
            {/* Labels */}
            <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
              {expenseCategories.map((category, index) => {
                return (
                  <li
                    key={`legend-${index}`}
                    className="flex items-center text-sm"
                  >
                    <span
                      className="mr-2 w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: colors[index % colors.length],
                      }}
                    ></span>
                    {category.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <hr />
            {expenseSummary && (
              <div className="mt-3 flex justify-between items-center px-7 mb-4">
                <div className="pt-2">
                  <p className="text-sm">
                    Average:{` `}
                    <span className="font-semibold">
                      ${expenseSummary[0].totalExpenses.toFixed(2)}
                    </span>
                  </p>
                </div>
                <span className="flex items-center mt-2">
                  <TrendingUp className="mr-2 text-green-500" />
                  30%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;

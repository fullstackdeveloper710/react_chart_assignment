import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import ReactApexChart from "react-apexcharts";
import { GETAPISERVICE } from "./services";
import { array } from "./array";
import { Circles } from "react-loader-spinner";

export default function Staticchart() {
  const [arr, setArr] = useState([]);
  // main state of the chart
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        height: 400, // Adjusted height for better visibility on mobile
        type: "bar",
        events: {
          click: function (chart, w, e) {
            console.log(chart, w, e);
          },
        },
      },
      colors: "",
      plotOptions: {
        bar: {
          columnWidth: "35%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "",
            fontSize: "12px", // Adjusted font size for mobile
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "",
            fontSize: "12px", // Adjusted font size for mobile
          },
          formatter: function (val) {
            return val.toString();
          },
        },
        title: {
          text: "Patients",
          style: {
            fontSize: "14px", // Adjusted font size for mobile
          },
        },
      },
      responsive: [
        {
          breakpoint: 576, // Typical breakpoint for mobile devices, including iPhone XR
          options: {
            chart: {
              height: 350, // Adjusted height for smaller mobile screens
            },
            xaxis: {
              labels: {
                style: {
                  fontSize: "10px", // Further adjusted font size for smaller screens
                },
              },
            },
            yaxis: {
              title: {
                style: {
                  fontSize: "12px", // Further adjusted font size for smaller screens
                },
              },
            },
          },
        },
      ],
    },
  });
  

  const [loading, setLoading] = useState(false);
  const [topCount, setTopCount] = useState(0);
  // api call for get the data from the backend
  const getGraphData = () => {
    setLoading(true);
    let data = [...array];
    console.log("data", data);
    setArr([...array]);
    // Filter data based on topCount
    filterData(data);
    setLoading(false);
  };

  // onclick function to change as per user set the count
  const filterDataOnSelect = () => {
    let data = [...arr];
    // Filter data based on topCount
    filterData(data);
  };

  // filter data common function
  const filterData = (data) => {
    let filteredData = data.slice(0, topCount === 0 ? data.length : topCount);
    setChartData((prev) => ({
      ...prev,
      series: [
        {
          data: filteredData?.map((item) => item?.count),
        },
      ],
      options: {
        ...prev.options,
        xaxis: {
          ...prev.options.xaxis,
          categories: filteredData?.map((item) => item.label),
        },
      },
    }));
  };
  useEffect(() => {
    filterDataOnSelect();
  }, [topCount]);
  useEffect(() => {
    getGraphData();
  }, []);
  console.log("chartdata", chartData);
  return (
    <div className="content_center">
      <div className="custom_data">
        <div className="topic_block">
          <h4>Top Topics</h4>
          <span>How many clients Are Discussing Today</span>
        </div>
        <div className="topic_selec_block">
          <select
            value={topCount}
            onChange={(e) => setTopCount(Number(e.target.value))}
          >
            <option value={0}>All Time</option>
            <option value={5}>Top 5</option>
            <option value={10}>Top 10</option>
            <option value={15}>Top 15</option>
          </select>
        </div>
      </div>
      {loading ? (
        <>
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </>
      ) : (
        <>
          <div id="chart">
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              width={700}
              height={350}
            />
          </div>
          <div id="html-dist"></div>
        </>
      )}
    </div>
  );
}

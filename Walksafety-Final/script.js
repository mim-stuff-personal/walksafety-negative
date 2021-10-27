let barChart = null;
let predChart = null;

// Basemap config
mapboxgl.accessToken =
  "pk.eyJ1Ijoiamlob29ucGFyayIsImEiOiJja2h6djd6aTcwbzN1MzRvYXM0a25sMGQ4In0.wW1kvXU8R_sn0PUMh6nmIA";
const map = new mapboxgl.Map({
  container: "map",
  // style: "mapbox://styles/jihoonpark/ckssk6a3k3ama17q7fy59ctzb",
  style: "mapbox://styles/jihoonpark/ckughwlbwcmue18npllanj1rm",
  center: [126.99017577700266, 37.55397103093888],
  zoom: 7,
  maxZoom: 22,
  minZoom: 7,
  antialias: true,
});

// Disable map rotation with mouse rmb and touch
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();



// Load negative samples point layer
map.on("load", function () {
  const layers = map.getStyle().layers;

  let labelLayerId;
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
      labelLayerId = layers[i].id;
      break;
    }
  }

  map.addSource("dummysamples", {
    type: "geojson",
    data: "./data/dummysamples1017.geojson",
  });

  map.addLayer({
    id: "사고예측지점",
    type: "circle",
    source: "dummysamples",
    layout: {
      visibility: "visible",
    },
    minzoom: 12,
    paint: {
      "circle-color": [
        "step",
        ["get", "mean_pred"],
        "#66ff00",
        0.074,
        "#b3f101",
        0.226,
        "#fb780e",
        0.406,
        "#f94314",
        0.629,
        "#f70d1a",
        0.944,
        "#7D7D7D",
      ],
      "circle-opacity": 1,
      "circle-radius": {
        base: 5.5,
        stops: [
          [12, 7],
          [15, 11],
        ],
      },
    },
  });
});

map.on(
  "click",
  "사고예측지점",
  (e) => {
    const int = e.features[0].properties.int_co;
    const pedx = e.features[0].properties.pedx_co;
    const szone = e.features[0].properties.szone_co;
    const pred = e.features[0].properties.mean_pred;
    const testcol1 = e.features[0].properties.testcol1;
    const testcol2 = e.features[0].properties.testcol2;
    const testcol3 = e.features[0].properties.testcol3;
    const testcol4 = e.features[0].properties.testcol4;
    const testcol5 = e.features[0].properties.testcol5;

    document.getElementById("panel_int_value").innerHTML = int;
    document.getElementById("panel_pedx_value").innerHTML = pedx;
    document.getElementById("panel_szone_value").innerHTML = szone;

    window.onload = function () {
      load();
    };

    {
      const yaxis = {
        label: "변수",
        data: [testcol1, testcol2, testcol3, testcol4, testcol5],
        yAxisID: "yaxislabel",
        color: "#ffffff",
        backgroundColor: [
          "#CF6679",
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
          // "rgba(255, 205, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
        ],
        gridLines: {
          drawOnChartArea: false,
          display: true,
          lineWidth: 1,
          color: "#FFF",
        },
        ticks: {
          beginAtZero: true,
          max: 1.0,
          stepSize: 0.2,
        },
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.65,
        borderColor: [
          "rgb(255, 99, 132)",
          // "rgb(255, 159, 64)",
          // "rgb(255, 205, 86)",
          // "rgb(75, 192, 192)",
          // "rgb(54, 162, 235)",
        ],
      };

      const xaxis = {
        labels: ["col1", "col2", "col3", "col4", "col5"],
        datasets: [yaxis],
      };

      const chartOptions = {
        type: "bar",
        data: xaxis,
        y: [
          {
            id: "yaxislabel",
          },
        ],
        responsive: true,
        maintainAspectRatio: false,
      };

      const negChartCanvas = document.getElementById("negChart");
      const negChartContext = negChartCanvas.getContext("2d");

      if (barChart != null) barChart.destroy();

      barChart = new Chart(negChartContext, chartOptions);
    }

    window.onload = function () {
      load();
    };

    const ctx = document.getElementById("negPredChart");

    if (predChart != null) predChart.destroy();

    predChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["위험도"],
        datasets: [
          {
            // label: "Gauge",
            data: [[pred], 1 - [pred]],
            borderWidth: 1,
            backgroundColor: [
              "#CF6679",
              "#9ACA2C",
              // "rgba(255, 99, 132, 0.2)",
              // "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: ["rgb(255, 99, 132)", "rgb(75, 192, 192)"],
          },
        ],
      },
      options: {
        circumference: 180,
        rotation: 270,
        cutoutPercentage: 99,
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          clip: {
            top: -100,
          },
        },
      },
    });
  },

  // Nationwide building polygon data
  map.on("load", () => {
    map.addSource("bld", {
      type: "vector",
      url: "mapbox://jihoonpark.mtsrecipe",
    });
    map.addLayer({
      id: "건물",
      type: "fill",
      source: "bld",
      "source-layer": "hello_world",
      layout: {
        visibility: "visible",
      },
      minzoom: 12,
      paint: {
        "fill-color": [
          "match",
          ["get", "BDTYP_CD"],
          "01",
          "#c08484",
          "02",
          "#c08484",
          "03",
          "#fee6c2",
          "04",
          "#fee6c2",
          "05",
          "#8D8D8D",
          "06",
          "#fee6c2",
          "07",
          "#8D8D8D",
          "08",
          "#8D8D8D",
          "09",
          "#8D8D8D",
          "10",
          "#8D8D8D",
          "11",
          "#8D8D8D",
          "12",
          "#fee6c2",
          "13",
          "#8D8D8D",
          "14",
          "#8D8D8D",
          "15",
          "#8D8D8D",
          "16",
          "#8D8D8D",
          "17",
          "#8D8D8D",
          "18",
          "#8D8D8D",
          "19",
          "#8D8D8D",
          "20",
          "#8D8D8D",
          "21",
          "#8D8D8D",
          "#8D8D8D",
        ],
        // "fill-color": [
        //   "match",
        //   ["get", "BDTYP_CD"],
        //   "01",
        //   "#fee6c2",
        //   "02",
        //   "#c08484",
        //   "03",
        //   "#f7412a",
        //   "04",
        //   "#f7412a",
        //   "05",
        //   "#f7412a",
        //   "06",
        //   "#f6b112",
        //   "07",
        //   "#67e785",
        //   "08",
        //   "#dd6f8a",
        //   "09",
        //   "#33a02c",
        //   "10",
        //   "#ccccc1",
        //   "11",
        //   "#ed83b8",
        //   "12",
        //   "#f7412a",
        //   "13",
        //   "#f7f966",
        //   "14",
        //   "#f7f966",
        //   "15",
        //   "#f7f966",
        //   "16",
        //   "#f7f966",
        //   "17",
        //   "#9ff2ff",
        //   "18",
        //   "#9ff2ff",
        //   "19",
        //   "#009874",
        //   "20",
        //   "#0a4f40",
        //   "21",
        //   "#f6b112",
        //   "#000000",
        // ],
        "fill-opacity": 0.5,
      },
    });
  })
);

// Nationwide road line data
map.on("load", () => {
  map.addSource("road", {
    type: "vector",
    url: "mapbox://jihoonpark.mtsreciperoad",
  });
  map.addLayer({
    id: "도로",
    type: "line",
    source: "road",
    "source-layer": "hello_world",
    layout: {
      visibility: "visible",
    },
    minzoom: 12,
    paint: {
      "line-color": [
        "step",
        ["get", "AI_w10k_NA"],
        "#f70d1a",
        0.069,
        "#f82817",
        0.5,
        "#f94314",
        1.2,
        "#fb780e",
        1.3669,
        "#d9ea02",
        1.4,
        "#b3f101",
        1.5002,
        "#8df801",
        3.88512,
        "#66ff00",
      ],
      "line-opacity": 1,
      "line-width": {
        base: 0,
        stops: [
          [12, 1],
          [15, 2],
          [17, 3],
        ],
      },
    },
  });
});

// Nationwide intersection point data
map.on("load", () => {
  map.loadImage(
    // "https://cdn-icons-png.flaticon.com/512/3393/3393544.png",
    "/img/road-intersection.png",
    (error, image) => {
      if (error) throw error;

      map.addImage("intimg", image);

      map.addSource("intersection", {
        type: "vector",
        url: "mapbox://jihoonpark.4m628fcr",
      });

      map.addLayer({
        id: "교차로",
        type: "symbol",
        source: "intersection",
        "source-layer": "intersection",
        minzoom: 12,
        layout: {
          visibility: "visible",
          "icon-image": "intimg",
          "icon-size": {
            base: 0,
            stops: [
              [12, 0.018],
              [15, 0.022],
              [17, 0.032],
            ],
          },
        },
      });
    }
  );
});

// Nationwide hex polygon data
map.on("load", () => {
  map.addSource("hexgrids", {
    type: "vector",
    url: "mapbox://jihoonpark.dje4rc30",
  });
  map.addLayer({
    id: "hexgrids",
    type: "fill",
    source: "hexgrids",
    "source-layer": "hexgrids-6g9acu",
    layout: {
      visibility: "visible",
    },
    minzoom: 4,
    maxzoom: 12,
    paint: {
      "fill-color": [
        "step",
        ["get", "predmean"],
        "#66ff00",
        0.11178,
        "#b3f101",
        0.20623,
        "#fb780e",
        0.30383,
        "#f94314",
        0.42694,
        "#f70d1a",
        0.69377,
        "#7D7D7D",
      ],
      "fill-opacity": 0.5,
    },
  });
});

// Nationwide pedx polygon data
map.on("load", () => {
  map.addSource("pedx", {
    type: "vector",
    url: "mapbox://jihoonpark.17p5frl2",
  });
  map.addLayer({
    id: "횡단보도",
    type: "fill",
    source: "pedx",
    "source-layer": "pedx",
    layout: {
      visibility: "visible",
    },
    minzoom: 12,
    paint: {
      "fill-color": "#34495E",
      "fill-opacity": 0.75,
    },
  });
});

// Nationwide safetyzone polygon data
map.on("load", () => {
  map.addSource("safetyzone", {
    type: "vector",
    url: "mapbox://jihoonpark.9no13wq6",
  });
  map.addLayer({
    id: "안전지대",
    type: "fill",
    source: "safetyzone",
    "source-layer": "safetyzone",
    layout: {
      visibility: "visible",
    },
    minzoom: 12,
    paint: {
      "fill-color": "#FDDA0D",
      "fill-opacity": 0.6,
    },
  });
});

// After the last frame rendered before the map enters an "idle" state.
map.on("idle", () => {
  // If these two layers were not added to the map, abort
  if (
    !map.getLayer("사고예측지점") ||
    !map.getLayer("건물") ||
    !map.getLayer("도로") ||
    !map.getLayer("교차로") ||
    !map.getLayer("횡단보도") ||
    !map.getLayer("안전지대")
  ) {
    return;
  }

  // Enumerate ids of the layers.
  const toggleableLayerIds = [
    "사고예측지점",
    "건물",
    "도로",
    "교차로",
    "횡단보도",
    "안전지대",
  ];

  for (const id of toggleableLayerIds) {
    if (document.getElementById(id)) {
      continue;
    }

    const link = document.createElement("a");
    link.id = id;
    link.href = "#";
    link.textContent = id;
    link.className = "active";

    link.onclick = function (e) {
      const clickedLayer = this.textContent;
      e.preventDefault();
      e.stopPropagation();

      const visibility = map.getLayoutProperty(clickedLayer, "visibility");

      if (visibility === "visible") {
        map.setLayoutProperty(clickedLayer, "visibility", "none");
        this.className = "";
      } else {
        this.className = "active";
        map.setLayoutProperty(clickedLayer, "visibility", "visible");
      }
    };

    const layers = document.getElementById("menu");
    layers.appendChild(link);
  }
});

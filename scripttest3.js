var barChart = null;
var predChart = null;

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
    data: "./dummysamples1017.geojson",
  });

  map.addLayer({
    id: "dummysamples1017",
    type: "circle",
    source: "dummysamples",
    layout: {
      visibility: "visible",
    },
    minzoom: 14,
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
  "dummysamples1017",
  (e) => {
    const fid = e.features[0].properties.fid;
    const int = e.features[0].properties.int_co;
    const pedx = e.features[0].properties.pedx_co;
    const szone = e.features[0].properties.szone_co;
    const nain = e.features[0].properties.nain_mean;
    const nach = e.features[0].properties.nach_mean;
    const pred = e.features[0].properties.mean_pred;
    const testcol1 = e.features[0].properties.testcol1;
    const testcol2 = e.features[0].properties.testcol2;
    const testcol3 = e.features[0].properties.testcol3;
    const testcol4 = e.features[0].properties.testcol4;
    const testcol5 = e.features[0].properties.testcol5;
    const testcol6 = e.features[0].properties.testcol6;
    const testcol7 = e.features[0].properties.testcol7;

    document.getElementById("panel_fid").innerHTML = fid;
    document.getElementById("panel_int").innerHTML =
      "400m 반경 내 교차로 개수" + " " + int + "개";
    document.getElementById("panel_pedx").innerHTML =
      "400m 반경 내 횡단보도 개수" + " " + pedx + "개";
    document.getElementById("panel_szone").innerHTML =
      "400m 반경 내 안전구역 개수" + " " + szone + "개";
    document.getElementById("panel_nain").innerHTML = "NAIN 평균값" + nain;
    document.getElementById("panel_nach").innerHTML = "NACH 평균값" + nach;
    document.getElementById("panel_pred").innerHTML = "죽을확률" + pred;

    window.onload = function () {
      load();
    };

    {
      const yaxis = {
        label: "",
        data: [testcol1, testcol2, testcol3, testcol4, testcol5],
        yAxisID: "yaxislabel",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderWidth: 1,
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
      };

      const xaxis = {
        labels: ["testcol1", "testcol2", "testcol3", "testcol4", "testcol5"],
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
        // labels: ["pred"],
        datasets: [
          {
            label: "Gauge",
            data: [[pred], 1-[pred]],
			backgroundColor: [
				'rgb(255, 99, 132)',
				'rgb(0, 255, 0)',
			  ],
          },
        ],
      },
      options: {
        circumference: 180,
        rotation: 270,
        cutoutPercentage: 90,
		hoverOffset: 4,
        // legend: {
        //   display: false,
        // },
        // tooltips: {
        //   enabled: false,
        // },
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
      minzoom: 14,
      paint: {
        "fill-color": [
          "match",
          ["get", "BDTYP_CD"],
          "01",
          "#fee6c2",
          "02",
          "#c08484",
          "03",
          "#f7412a",
          "04",
          "#f7412a",
          "05",
          "#f7412a",
          "06",
          "#f6b112",
          "07",
          "#67e785",
          "08",
          "#dd6f8a",
          "09",
          "#33a02c",
          "10",
          "#ccccc1",
          "11",
          "#ed83b8",
          "12",
          "#f7412a",
          "13",
          "#f7f966",
          "14",
          "#f7f966",
          "15",
          "#f7f966",
          "16",
          "#f7f966",
          "17",
          "#9ff2ff",
          "18",
          "#9ff2ff",
          "19",
          "#009874",
          "20",
          "#0a4f40",
          "21",
          "#f6b112",
          "#000000",
        ],
        "fill-opacity": 0.35,
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
    minzoom: 14,
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
    "https://cdn-icons-png.flaticon.com/512/3393/3393544.png",
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
        minzoom: 14,
        layout: {
          visibility: "visible",
          "icon-image": "intimg",
          "icon-size": {
            base: 0,
            stops: [
              [12, 0.022],
              [15, 0.042],
              [17, 0.052],
            ],
          },
        },
      });
    }
  );
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
    minzoom: 14,
    paint: {
      "fill-color": "#ffba01",
      "fill-opacity": 1,
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
    id: "안전구역",
    type: "fill",
    source: "safetyzone",
    "source-layer": "safetyzone",
    layout: {
      visibility: "visible",
    },
    minzoom: 14,
    paint: {
      "fill-color": "#f94314",
      "fill-opacity": 0.75,
    },
  });
});

// After the last frame rendered before the map enters an "idle" state.
map.on("idle", () => {
  // If these two layers were not added to the map, abort
  if (
    !map.getLayer("dummysamples1017") ||
    !map.getLayer("건물") ||
    !map.getLayer("도로") ||
    !map.getLayer("교차로") ||
    !map.getLayer("횡단보도") ||
    !map.getLayer("안전구역")
  ) {
    return;
  }

  // Enumerate ids of the layers.
  const toggleableLayerIds = [
    "dummysamples1017",
    "건물",
    "도로",
    "교차로",
    "횡단보도",
    "안전구역",
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

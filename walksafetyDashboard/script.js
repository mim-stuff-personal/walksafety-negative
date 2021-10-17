// Basemap config
mapboxgl.accessToken =
    "pk.eyJ1Ijoiamlob29ucGFyayIsImEiOiJja2h6djd6aTcwbzN1MzRvYXM0a25sMGQ4In0.wW1kvXU8R_sn0PUMh6nmIA";
const map = new mapboxgl.Map({
    container: "map",
    // style: 'mapbox://styles/jihoonpark/ckughwlbwcmue18npllanj1rm',
    style: "mapbox://styles/jihoonpark/ckssk6a3k3ama17q7fy59ctzb",
    center: [126.99017577700266, 37.55397103093888],
    zoom: 7,
    maxZoom: 22,
    minZoom: 7,
    // pitch: 55,
    // bearing: 0,
    antialias: true,
});

// Map navigation controls
// map.addControl(
//     new mapboxgl.NavigationControl());

// Disable map rotation with mouse rmb and touch
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

// Nationwide negative samples point data
map.on("load", () => {
    map.addSource("dummysamples", {
        type: "vector",
        url: "mapbox://jihoonpark.4wphh76c",
    });
    map.addLayer({
        id: "dummysamples",
        type: "circle",
        source: "dummysamples",
        "source-layer": "dummysamples-0ao7cs",
        layout: {
            visibility: "visible",
        },
        minzoom: 14,
        paint: {
            "circle-color": "#ffffff",
            "circle-opacity": 1,
            "circle-radius": {
                base: 6,
                stops: [
                    [12, 8],
                    [15, 12],
                ],
            },
        },
    });
});

map.on('click', 'dummysamples', e => {
    const fid = e.features[0].properties.fid;
    const int = e.features[0].properties.int_co;
    const pedx = e.features[0].properties.pedx_co;
    const szone = e.features[0].properties.szone_co;
    const nain = e.features[0].properties.nain_mean;
    const nach = e.features[0].properties.nach_mean;
    const pred = e.features[0].properties.mean_pred;

    document.getElementById("panel_fid").innerHTML = fid;
    document.getElementById("panel_int").innerHTML = '400m 반경 내 교차로 개수' + ' ' + int + '개';
    document.getElementById("panel_pedx").innerHTML = '400m 반경 내 횡단보도 개수' + ' ' + pedx + '개';
    document.getElementById("panel_szone").innerHTML = '400m 반경 내 안전구역 개수' + ' ' + szone + '개';
    document.getElementById("panel_nain").innerHTML = 'NAIN 평균값' + nain;
    document.getElementById("panel_nach").innerHTML = 'NACH 평균값' + nach;
    document.getElementById("panel_pred").innerHTML = '죽을확률' + pred;

//     const xlabels = [];
//     const yvalues = [];
//
//     chartIt()
//     async function chartIt() {
//         const xlabels = await map.getSource();
//         const ctx = document.getElementById("panel_chart").getContext("2d");
//         const myChart = new Chart (ctx, {
//             type: "bar",
//             data: {
//                 labels: xlabels,
//                 datasets: [
//                     {
//                         label: "",
//                         data: yvalue,
//                         backgroundColor: ["#E6013D99"],
//                         borderColor: ["#3d3d3d66"],
//                         borderWidth: 2,
//                     },
//                 ],
//             },
//         })
//     }
//
//     async function map.getSource() {
//
//
//     }
//
});

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
    });

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
                        [12, 2],
                        [15, 3],
                        [17, 4.5],
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
                        "icon-size": 0.02,
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
            !map.getLayer("dummysamples") ||
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
            "dummysamples",
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

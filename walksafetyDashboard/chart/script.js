const xlabels = [];
const yvalue = [];

chartIt();

async function chartIt() {
  const xlabels = await getData();
  console.log(xlabels);
  const ctx = document.getElementById("chart").getContext("2d");
  const myChart = new Chart(ctx, {
	type: "bar",
	data: {
	  labels: xlabels,
	  datasets: [
		{
		  label: "",
		  data: yvalue,
		  backgroundColor: ["#E6013D99"],
		  borderColor: ["#3d3d3d66"],
		  borderWidth: 2,
		},
	  ],
	},
  });
}

async function getData() {
  const response = await fetch("dummysamples.csv");
  const data = await response.text();
  // console.log(data.split('\n').slice());
  const headerStr = data.split("\n")[0];
  const header = headerStr.split(",").slice(1, 7, 8);
  console.log(header);
  const table = data.split("\n").slice(1);

  table.forEach((row) => {
	const columns = row.split(",");
	const id = columns[0];
	// xlabels.push(id);
	const nack10k = columns[1];
	yvalue.push(nack10k);
	const bldentr = columns[2];
	yvalue.push(bldentr);
	const pedx = columns[3];
	yvalue.push(pedx);
	const rvwd = columns[4];
	yvalue.push(rvwd);
	const int = columns[5];
	yvalue.push(int);
	const lduse_res = columns[6];
	yvalue.push(lduse_res);
  });
  return header;
}
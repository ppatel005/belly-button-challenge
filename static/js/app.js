const json_url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
d3.json(json_url).then(function(dataResponse) {
    data = dataResponse;
    console.log(data);
    console.log("Data Loaded");

    init();
    }
);

function populateDropdown(names) {
    let dropdown = d3.select("#selDataset");
   
    names.forEach(function(name) {
    dropdown.append("option").text(name).property("value", name);
    });
};

function optionChanged(selectedValue) {
    console.log("Selected value: " + selectedValue);
    update_BarChart(selectedValue);
    update_BubbleChart(selectedValue);
    update_MetaData(selectedValue);
};

function init() {
    let names = data.names;
    populateDropdown(names);
   
    update_BarChart(names[0]);
    update_BubbleChart(names[0]);
    update_MetaData(names[0]);
};

function update_BarChart(sampleID) {
    let samples = data.samples;
    let selectedSample = samples.find(sample => sample.id === sampleID);
    let sorted_samplevalues = selectedSample.sample_values.slice(0, 10).reverse();
    let sorted_OTUids = selectedSample.otu_ids.slice(0, 10).reverse();
    let sorted_OTUlabels = selectedSample.otu_labels.slice(0, 10).reverse();

    let bar_trace = {
        type: "bar",
        x: sorted_samplevalues,
        y: sorted_OTUids.map(id => `OTU ${id}`),
        text: sorted_OTUlabels,
        orientation: "h"
    };

    let bar_data = [bar_trace];
    let bar_layout = {
        yaxis: {title:"OTU ID"}
    };

    Plotly.newPlot("bar", bar_data, bar_layout);
    console.log("Bar chart updated");
};

function update_BubbleChart(sampleID) {
    let samples = data.samples;
    let selectedSample = samples.find(sample => sample.id === sampleID);
    let OTUids = selectedSample.otu_ids;
    let samplevalues = selectedSample.sample_values;
    let OTUlabels = selectedSample.otu_labels;
    let bubble_trace = {
        mode: "markers",
        x: OTUids,
        y: samplevalues,
        text: OTUlabels,
        marker: {
          size: samplevalues,
          color: OTUids
        }
    };

    let bubble_data = [bubble_trace];

    let bubble_layout = {
        xaxis: { title:"OTU ID"}
    };
    Plotly.newPlot("bubble", bubble_data, bubble_layout);
    console.log("Bubble chart updated");
};

function update_MetaData(sampleID) {
    let samples = data.metadata;
    let selectedSample = samples.find(sample => sample.id === parseInt(sampleID));

    let Metadata_ID = selectedSample.id;
    let Metadata_ethnicity = selectedSample.ethnicity;
    let Metadata_gender = selectedSample.gender;
    let Metadata_age = selectedSample.age;
    let Metadata_location = selectedSample.location;
    let Metadata_bbtype = selectedSample.bbtype;
    let Metadata_wfreq = selectedSample.wfreq;

    let Metadata_trace = {
        "id": Metadata_ID,
        "ethnicity": Metadata_ethnicity,
        "gender": Metadata_gender,
        "age": Metadata_age,
        "location": Metadata_location,
        "bbtype": Metadata_bbtype,
        "wfreq": Metadata_wfreq
    }

    let Metadata_data = [Metadata_trace]
    let MetadataDiv = d3.select("#sample-metadata")
    MetadataDiv.html("")
    for (const [key, value] of Object.entries(selectedSample)) {
        MetadataDiv.append("p").text(`${key}: ${value}`);
      }
    console.log("Metadata updated");
};

















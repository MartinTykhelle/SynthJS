const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'Signal',
        backgroundColor: 'rgb(63,141,41)',
        borderColor: 'rgb(63,141,41)',
        data: [0, 10, 5, 2, 20, 30, 45],
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};



let wav_size = 256;
let functionChart;

//int32_t(float(amplitude)*sin(2.0*PI*(1.0/length)*i));
//data.push(
/* Square
amplitude*Math.sin(2*Math.PI*(1/wav_size)*i)+
amplitude/3*Math.sin(2*Math.PI*(1/wav_size)*3*i)+
amplitude/5*Math.sin(2*Math.PI*(1/wav_size)*5*i)+
amplitude/7*Math.sin(2*Math.PI*(1/wav_size)*7*i)+
amplitude/9*Math.sin(2*Math.PI*(1/wav_size)*9*i)
*/
/* Sine
amplitude*Math.sin(2*Math.PI*(1/wav_size)*i)
*/

/* Sawtooth
amplitude*Math.sin(2*Math.PI*(1/wav_size)*i)+
amplitude/2*Math.sin(2*Math.PI*(1/wav_size)*2*i)+
amplitude/3*Math.sin(2*Math.PI*(1/wav_size)*3*i)+
amplitude/4*Math.sin(2*Math.PI*(1/wav_size)*4*i)+
amplitude/5*Math.sin(2*Math.PI*(1/wav_size)*5*i)
*/
/* Triangle

(-1)^n/(2*n-1)^2 * amplitude * sin(...*(2n-1))



-amplitude*Math.sin(2*Math.PI*(1/wav_size)*i)+
amplitude/9*Math.sin(2*Math.PI*(1/wav_size)*i*3)+
-amplitude/25*Math.sin(2*Math.PI*(1/wav_size)*i*5)+
amplitude/49*Math.sin(2*Math.PI*(1/wav_size)*i*7)+
-amplitude/81*Math.sin(2*Math.PI*(1/wav_size)*i*9)
*/
// );
function generateData(){
    let amplitude = 5;
    let data = [];
    let labels = [];
    let k = parseInt(document.getElementById('fourierCount').value);

    if (k>50){
        k = 1;
    }

    let amplitudeFactor = document.getElementById('fourierAmplitudeFactor').value;
    let frequencyFactor = document.getElementById('fourierFrequencyFactor').value;
    let value;
    for (let i = 0; i < wav_size*2; i++) {
        value = 0;
        for (let t = 1; t <k+1; t++) {
            if(i===0){
            console.log(t,eval(amplitudeFactor),eval(frequencyFactor))
            }
            value+= amplitude*eval(amplitudeFactor)*Math.sin(2*Math.PI*(1/wav_size)*i*eval(frequencyFactor));
        }
        data.push(value);

        labels.push(i);
    }
    functionChart.data.datasets[0].data = data;
    functionChart.data.labels = labels;
    functionChart.update()

    console.log(data);
}

function onLoad(){
    functionChart = new Chart(
    document.getElementById('chart'),
    config
);
    generateData();
}

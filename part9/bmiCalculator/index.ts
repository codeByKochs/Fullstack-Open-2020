import express from 'express';
import {calculateBmi} from './bmiCalculator';


const app = express();

app.get('/hello', (_request, _response) => {    
    _response.send('Hello Full Stack!');
});

app.get('/bmi/', (_request, _response) => {
    try {

        const height = parseInt(_request.query.height as string);
        const weight = parseInt(_request.query.weight as string);

        if (!height && !weight){
            const bmiString = calculateBmi(height, weight);

            _response.send(
                {
                    weight: weight,
                    height: height,
                    bmi: bmiString
                });
        } else {
            _response.status(400).send({error: "malformatted parameters"});
        }
    } catch (e){
        console.log("error");
    }


});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
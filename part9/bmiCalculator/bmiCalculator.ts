export function calculateBmi(height: number, weight: number) : string {

    height = height/100;

    const bmi = weight/(height*height);

    switch (true) {
        case (bmi < 15):
            return 'Very severely underweight';
        case (15 < bmi && bmi < 16):
            return 'Severely underweight';
        case (16 < bmi && bmi < 18.5):
            return 'Underweight';
        case (18.5 < bmi && bmi < 25):
            return 'Normal (healthy weight)';
        case (25 < bmi && bmi < 30):
            return 'Overweight ';
        case (30 < bmi && bmi < 35):
            return 'Obese Class I (Moderately obese)';
        case (35 < bmi && bmi < 40):
            return 'Obese Class II (Severely obese)';
        case (40 < bmi):
            return 'Overweight';
        default:
            return 'none';
    }
}

try {
    const a = Number(process.argv[2]);
    const b = Number(process.argv[3]);
    console.log(calculateBmi(a , b));
} catch (e) {
    console.log('Error, something bad happened, message: ', e);
}

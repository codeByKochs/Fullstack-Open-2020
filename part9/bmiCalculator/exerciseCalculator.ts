interface exerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}


function calculateExercises(exerciseHours: Array<number>, targetAverageHours: number) :exerciseResult {

    const periodLength = exerciseHours.length;
    const averageTrainingTime = (exerciseHours.reduce((sum, dailyHours) => sum + dailyHours ))/periodLength;
    const trainingDays = exerciseHours.filter((dailyHours) => dailyHours > 0).length;

    let isTargetReached = false;
    if (targetAverageHours <= averageTrainingTime){
        isTargetReached = true;
    }

    let rating;
    let ratingDescription;

    switch (true) {
        case (averageTrainingTime/(targetAverageHours/100) < 33):
            rating = 1;
            ratingDescription = 'You can definetly do better';
            break;
        case((averageTrainingTime/(targetAverageHours/100) >= 33 && averageTrainingTime/(targetAverageHours/100) <= 66)):
            rating = 2;
            ratingDescription = 'Not too bad but could be better';
            break;
        case(averageTrainingTime/(targetAverageHours/100) >= 66):
            rating = 3;
            ratingDescription = 'Great job! Keep going!';
            break;
        default:
            rating = 0;
            ratingDescription = 'rating could not be calculated';
            break;
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: isTargetReached,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetAverageHours,
        average: averageTrainingTime
        };
}


try {
    const target : number = parseInt(process.argv[2]);
    const numbers: number[] = [];
    let i = 3;
    
    while (i < process.argv.length) {
        numbers.push(parseFloat(process.argv[i]));
        i++;
    }

    console.log(calculateExercises(numbers, target));

} catch (e) {
    console.log('Error, something bad happened, message: ', e);
}
import axios from 'axios';
import { NeuralNetwork } from 'brain.js';
import data from './data.json';
import { brainMessage } from '../utils/toast';

interface Task {
    duration: number;
    status: 'TO DO' | 'IN PROGRESS' | 'COMPLETE';
}

interface ProjectData {
    tasks: Task[];
    completionDays: number;
}

// Create the neural network
const network = new NeuralNetwork({
    hiddenLayers: [4],
    activation: 'sigmoid'
});

// Normalize status to represent time left based on status
function normalizeStatus(status: Task['status']): number {
    switch (status) {
        case 'TO DO': return 1;        // High time left
        case 'IN PROGRESS': return 0.5; // Moderate time left
        case 'COMPLETE': return 0;      // No time left
        default: return 1;
    }
}

// Prepare training data with adjusted time remaining based on status
function prepareTrainingData(projectsData: ProjectData[]) {
    return projectsData.map(project => ({
        input: project.tasks.flatMap(task => [
            task.duration / 100,
            normalizeStatus(task.status)
        ]),
        output: [project.completionDays / 30]
    }));
}

// Train the network with the historical data
function trainNetwork(historicalData: ProjectData[]) {
    const trainingData = prepareTrainingData(historicalData);
    return network.train(trainingData, {
        iterations: 2000,
        errorThresh: 0.005,
        log: true,
        logPeriod: 100
    });
}

// Predict the remaining days based on the current task status
function predictRemainingDays(tasks: Task[]): number {
    const input = tasks.flatMap(task => [
        task.duration / 100,
        normalizeStatus(task.status)
    ]);

    const output = network.run(input) as number[];
    return Math.round(output[0] * 30);
}

// Main function to run the prediction
async function main(projectId: string): Promise<string> {
    let tasks: Task[] = [];

    try {
        const response = await axios.get(
            `https://simplicity-server-3ad4.onrender.com/task/getTasksByProjectId/${projectId}`,
            { withCredentials: true }
        );

        if (response.data.isSuccessful) {
            tasks = response.data.data;
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return "Error fetching tasks data";
        }
    }

    const historicalProjects: ProjectData[] = data.tasksList as ProjectData[];

    // Train the network with historical data before predicting
    trainNetwork(historicalProjects);

    if (tasks.length === 0) {
        return "No tasks found for this project";
    }

    // Predict remaining days based on task statuses and durations
    const remainingDays = predictRemainingDays(tasks);

    return `The project has approximately ${remainingDays} days remaining`;
}

export async function runPrediction(projectId: string | null) {
    if (!projectId) return "We got problem!";

    const predictionMessage = await main(projectId);
    brainMessage(predictionMessage)
}

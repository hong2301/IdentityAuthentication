export interface projectType {
    name: string,
    process: processType[],
    step: number
}

export interface processType {
    name: string,
    path: string,
    key: string,
    state: 0 | 1;
    data: Record<string, any>;
}

export interface examDataType {
    projectName: string,
    carType: string,
    identity: identityType,
    phone: string
    photo: any
}
export interface identityType {
    id: string
    name: string,
    gender: string
}

interface FaceFeature {
    score: number;
    keypoints: Array<{ x: number; y: number }>;
}


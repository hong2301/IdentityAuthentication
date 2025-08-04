export interface projectType {
    name: string,
    process: processType[],
    step: number
}

export interface processType {
    name: string,
    path: string,
    state: 0 | 1;
}

export interface examDataType {
    projectName: string,
    carType: string,
    identity: identityType,
    phone: string
}
export interface identityType {
    id: string
    name: string,
    gender: string
}


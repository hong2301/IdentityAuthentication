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

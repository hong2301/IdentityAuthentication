export interface btnType {
    btn?: number,
    label: string,
    key: string,
    type: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text',
    icon: DefineComponent,
    position: 'left' | 'right'
    onClick: () => void
}

export enum CommonStatus {
    ALL = '',
    ACTIVE = 'activ',
    INACTIVE = 'inact'
}
export const CommonStatusLabels: { [key in CommonStatus]: string } = {
    [CommonStatus.ALL]: '',
    [CommonStatus.INACTIVE]: 'Inactive',
    [CommonStatus.ACTIVE]: 'Active',
};
export const CommonStatusLabelsClass = {
    [CommonStatus.INACTIVE]: 'badge badge-secondary font-sm',
    [CommonStatus.ACTIVE]: 'badge badge-success font-sm',
};

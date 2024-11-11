interface iToast {
    title: string;
    message: string;
    type: ToastType;
    duration?: number;
}

export enum ToastType {
    SUCCESS,
    ERROR,
    WARNING
}

export class ToastDTO implements iToast {
    title: string;
    message: string;
    type: ToastType;
    duration?: number;
    timeLeft?: number;
    get class() {
        switch(this.type) {
            case ToastType.SUCCESS:
                return 'bg-success text-white';
            case ToastType.ERROR:
                return 'bg-danger text-white';
            default: 
                return'bg-warning';
        }
    }
}
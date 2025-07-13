import { toast, ToastOptions } from 'react-toastify';

export interface ToastConfig extends ToastOptions {
  message: string;
}

class ToastService {
  private defaultOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  success(message: string, options?: ToastOptions) {
    toast.success(message, { ...this.defaultOptions, ...options });
  }

  error(message: string, options?: ToastOptions) {
    toast.error(message, { ...this.defaultOptions, ...options });
  }

  warning(message: string, options?: ToastOptions) {
    toast.warning(message, { ...this.defaultOptions, ...options });
  }

  info(message: string, options?: ToastOptions) {
    toast.info(message, { ...this.defaultOptions, ...options });
  }

  promise<T>(
    promise: Promise<T>,
    messages: {
      pending: string;
      success: string;
      error: string;
    },
    options?: ToastOptions
  ) {
    return toast.promise(
      promise,
      messages,
      { ...this.defaultOptions, ...options }
    );
  }

  dismiss(toastId?: string | number) {
    toast.dismiss(toastId);
  }

  dismissAll() {
    toast.dismiss();
  }
}

export const toastService = new ToastService();
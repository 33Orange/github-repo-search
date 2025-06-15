import { create } from 'zustand';

type ErrorItem = {
    id: string;
    message: string;
};

type GlobalState = {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;

    errors: ErrorItem[];
    setError: (message: string) => void;
    removeError: (id: string) => void;
};

export const useGlobalStore = create<GlobalState>((set, get) => ({
    isLoading: false,
    setLoading: (isLoading) => set({ isLoading }),

    errors: [],
    setError: (message) => {
        const id = crypto.randomUUID();
        const newError = { id, message };
        const current = get().errors;

        const trimmed = current.length >= 5 ? current.slice(1) : current;

        set({ errors: [...trimmed, newError] });

        setTimeout(() => {
            get().removeError(id);
        }, 5000);
    },
    
    removeError: (id) =>
        set((state) => ({
            errors: state.errors.filter((e) => e.id !== id),
        })),
}));
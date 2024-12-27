import { ReactNode } from 'react'


export type UserAuth = {
    id: string;
    name: string;
    email: string;
    birthDay: string;
    password: string;
    language: string;
    work_career?: string;
    phone_number: string;
    phone_fix_number?: string;
    personal_identification: string;
    country: string;
    cep?: string;
    city: string;
    state: string;
    address: string;
    number: string;
}

export interface AuthContextProps {
    isAuthenticated: boolean
    user?: UserAuth | null,
    signIn: (user: Any) => Promise<void>,
    singOut: () => void,
} 

export interface AuthProviderProps {
    children: ReactNode
}
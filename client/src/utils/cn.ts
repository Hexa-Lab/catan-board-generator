import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from 'clsx'

function cn(...args: ClassValue[]): string {
    return twMerge(clsx(args))
}

export { cn }
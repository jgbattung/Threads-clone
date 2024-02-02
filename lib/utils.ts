import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function formatRelativeTime(createdAt: string | Date) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInMs = now.getTime() - createdDate.getTime();

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(diffInMs / 60000);
  const hours = Math.floor(diffInMs / 3600000);
  const days = Math.floor(diffInMs / 86400000);
  const years = now.getFullYear() - createdDate.getFullYear();

  if (minutes < 1) {
    return `${seconds}s`;
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 365) {
    return createdDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } else {
    return createdDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
};

export function formatDateTime(createdAt: string): string {
  const date = new Date(createdAt);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };

  const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);
  const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);

  const formattedTime = timeFormatter.format(date);
  const formattedDate = dateFormatter.format(date);

  return `${formattedTime} · ${formattedDate}`;
}


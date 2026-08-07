import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateGithubUrl(url: string): boolean {
  if (!url) return false;
  const regex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\/?$/;
  return regex.test(url.trim());
}

export function validateLinkedinUrl(url: string): boolean {
  if (!url) return false;
  const regex = /^https?:\/\/(www\.)?linkedin\.com\/(in|posts|feed\/update)\/[a-zA-Z0-9_-]+\/?.*$/;
  return regex.test(url.trim());
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/// <reference types="nativewind/types" />

// Declarations for JS modules without types to quiet TypeScript during the migration
declare module '@/services/*';
declare module '@/contexts/*';
declare module '@/firebase_env';
declare module 'expo-image';
declare module 'expo-linear-gradient';

// Allow importing PNG/JPG assets via require
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

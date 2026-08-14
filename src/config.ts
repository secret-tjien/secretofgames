import part1Icon from './files/part1.png';
import part2Icon from './files/part2.png';
import part3Icon from './files/part3.png';
import part4Icon from './files/part4.png';

/**
 * Secret of Games Global Configuration
 * Tweak these values to change the feel of the layers, colors, and interactions.
 */
export const CONFIG = {
  // Brand Colors
  colors: {
    primary: '#E60489',        // Primary color, e.g., for button texts
    secondary: '#7A649F',      // Secondary color, e.g., for body text
  },

  // Layer 0: The subtle background gradient
  layer0: {
    baseLightnessStart: 70,    // Starting % lightness of the background (0-100)
    baseLightnessTarget: 50,   // Target % lightness of the background (0-100)
    baseSaturationStart: 50,   // Starting % saturation of the colors (0-100)
    baseSaturationTarget: 100, // Target % saturation of the colors (0-100)
    baseHueStart: 35,          // Starting base hue (orange/yellow range)
    baseHueTarget: 48,         // Target base hue (warmer yellow/orange as blinds close)
    hueRange: 80,              // How many degrees the hue shifts across the screen (spans orange to green)
    transitionSpeed: 0.05,     // Speed of the smooth follow effect (lower = slower)
    color1Offset: 70,          // Hue offset for the second color point
    color2Offset: -10,         // Hue offset for the third color point
    orbitSpeed: 0.001,         // Speed of the organic drifting/orbiting
    orbitRadius: 25,           // Radius of the organic drifting in percentages
    particleCount: 70,         // Number of floating/streaming light particles
  },

  // Layer 1: Waterfall of light
  layer1: {
    beamWidth: 20,             // Width of each light beam in the waterfall (px)
    maxInteractions: 400,      // Interactions required to reach max brightness for a beam
    baseOpacity: 0.02,         // Opacity of unvisited/barely visited beams
    activeOpacity: 0.6,        // Maximum opacity of saturated beams
    fallSpeedBase: 0.25,        // Base speed of the falling light particles
    fallSpeedVariance: 0.2,    // Variance in fall speed
    particleCount: 300,        // Number of falling light particles
    particleMinWidth: 2,       // Minimum width of a falling particle
    particleMaxWidth: 10,       // Maximum width of a falling particle
    particleMinHeight: 50,     // Minimum height/length of a falling particle
    particleMaxHeight: 350,    // Maximum height/length of a falling particle
  },

  // Books UI Configuration
  books: {
    showEldersPrice: false,     // Toggle visibility of the "Elders" price (default OFF)
    reflectionOpacity: 0.15,    // Opacity of the book's reflection
    reflectionFalloff: 30,     // Percentage of the book that is reflected before fading out (0-100)
    shadowOpacity: 0.45,       // Base opacity of the colored shadow under the book
    shadowOpacityHover: 0.75,  // Hover opacity of the colored shadow under the book
    shadowBlur: '48px',        // Blur amount for the shadow
  },

  // Blinds UI Configuration
  blinds: {
    closingWidth: 49.0,        // Height percentage of each curtain when fully closed (twice the previous 49.75)
    closeSpeed: 0.25,           // Multiplier for blind closing speed relative to scroll (e.g. 0.5 = twice as slow)
    threshold: 0.4,           // Progress threshold before falloff begins
    falloffStart: 90,          // Percentage where gradient falloff starts (0-100)
    falloffEnd: 100,           // Percentage where gradient falloff ends (0-100)
    overlayOpacity: 0.60,       // Opacity of the 2 new transparent overlay black boxes (0-1, e.g. 0.3 for 30%)
    edgeLineWidth: 1,          // Height in px of the solid black edge line
    edgeLineColor: '#000000',  // Color of the solid edge lines
    sequenceWords: [
      { progress: 0.3, text: 'Clarity', icon: part1Icon },
      { progress: 0.5, text: 'Direction', icon: part2Icon },
      { progress: 0.7, text: 'Focus', icon: part3Icon },
      { progress: 0.9, text: 'Solutions', icon: part4Icon },
    ],
    reverseSequenceWords: [
      { progress: 0.8, text: 'Boundless' },
      { progress: 0.6, text: 'Creativity' },
      { progress: 0.4, text: 'Drifts' },
      { progress: 0.2, text: 'Nowhere' },
    ],
    reverseSequenceFontScale: 3, // Font size multiplier for reverse sequence (3x larger)
    sequenceFontScale: 2.0,    // Font size multiplier for downwards sequence (130% of base size)
    sequenceIconSize: 50,      // Icon size in px (width and height, tweakable)
    sequenceSlideDistance: 0, // Horizontal slide-in distance in px (from left)
    sequenceBlurAmount: 20,    // Blur in px when entering/exiting
    reverseThresholdPx: 25,   // Scroll distance in px in opposite direction needed before reversing direction state
  },

  // Scroll Hint Configuration
  scrollHint: {
    enabled: true,
    text: 'Scroll',
    fadeSpeed: 0.99,           // Progress threshold (0-1) where hint fades out completely
  },

  // Storage and Performance
  storage: {
    key: 'secretofgames_interactions',
    saveIntervalMs: 2000,      // How often to write to sessionStorage (ms)
  },

  // Daily 365 Answer Page
  dailyAnswer: {
    useTestDate: false,
    testDate: '2026-01-02',
    animationDuration: 1.0,    // Duration of fade/blur animation for text blocks
    animationStagger: 0.4,     // Stagger delay between text blocks
    animationDelay: 0.15,      // Initial delay before animation starts
  },

  // User Controls
  controls: {
    resetKey: 'R',             // Press Shift + <key> to reset the landscape
  },
  funding: {
    targetAmount: 50000,
    currentAmount: 180,
    minAmount: 0,
  },
};

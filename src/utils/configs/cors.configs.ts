import { configs } from './env.configs';

type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];
const whitelist: StaticOrigin = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5500',
  configs.clientUrl as string,
];

// Define the type for the origin callback function
type OriginCallback = (err: Error | null, allow?: boolean) => void;

// Define the type for the corsOptions object
const corsOptions: {
  origin: (origin: string | undefined, callback: OriginCallback) => void;
  methods?: string | string[] | undefined;
  credentials: boolean;
  optionsSuccessStatus: number;
} = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin || '') !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin provided in backend mismatched. Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE', // Add allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200,
};
export default corsOptions;

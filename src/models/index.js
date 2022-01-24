// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Dumpster } = initSchema(schema);

export {
  Dumpster
};
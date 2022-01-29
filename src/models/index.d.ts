import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Dumpster {
  readonly id: string;
  readonly name?: string;
  readonly location?: string;
  readonly latLng?: string;
  readonly datePickedUp?: string;
  readonly dateDropOff?: string;
  readonly comments?: string;
  constructor(init: ModelInit<Dumpster>);
  static copyOf(source: Dumpster, mutator: (draft: MutableModel<Dumpster>) => MutableModel<Dumpster> | void): Dumpster;
}
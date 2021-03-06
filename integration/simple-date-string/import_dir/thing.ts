import { Timestamp } from '../google/protobuf/timestamp';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ImportedThing {
  createdAt: string | undefined;
}

const baseImportedThing: object = {
};

function fromJsonTimestamp(o: any): string {
  if (o instanceof Date) {
    return o.toISOString();
  } else if (typeof o === "string") {
    return o;
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function toTimestamp(value: string): Timestamp {
  const date = new Date(value);
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(value: Timestamp): string {
  let millis = value.seconds * 1_000;
  millis += value.nanos / 1_000_000;
  return new Date(millis).toISOString();
}

export const protobufPackage = 'simple'

export const ImportedThing = {
  encode(message: ImportedThing, writer: Writer = Writer.create()): Writer {
    if (message.createdAt !== undefined && message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ImportedThing {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseImportedThing } as ImportedThing;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ImportedThing {
    const message = { ...baseImportedThing } as ImportedThing;
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = fromJsonTimestamp(object.createdAt);
    } else {
      message.createdAt = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ImportedThing>): ImportedThing {
    const message = { ...baseImportedThing } as ImportedThing;
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = undefined;
    }
    return message;
  },
  toJSON(message: ImportedThing): unknown {
    const obj: any = {};
    message.createdAt !== undefined && (obj.createdAt = message.createdAt !== undefined ? message.createdAt : null);
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
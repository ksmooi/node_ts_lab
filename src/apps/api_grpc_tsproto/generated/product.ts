// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.1
//   protoc               v3.12.4
// source: product.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import {
  type CallOptions,
  ChannelCredentials,
  Client,
  type ClientOptions,
  type ClientUnaryCall,
  type handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  type ServiceError,
  type UntypedServiceImplementation,
} from "@grpc/grpc-js";

export const protobufPackage = "apisvc";

export interface Empty {
}

export interface Product {
  id?: number | undefined;
  name: string;
  description: string;
  price: number;
}

export interface GetProductRequest {
  id: number;
}

export interface CreateProductRequest {
  product?: Product | undefined;
}

export interface UpdateProductRequest {
  product?: Product | undefined;
}

export interface DeleteProductRequest {
  id: number;
}

export interface ListProductsResponse {
  products: Product[];
}

function createBaseEmpty(): Empty {
  return {};
}

export const Empty: MessageFns<Empty> = {
  encode(_: Empty, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Empty {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Empty>, I>>(base?: I): Empty {
    return Empty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

function createBaseProduct(): Product {
  return { id: undefined, name: "", description: "", price: 0 };
}

export const Product: MessageFns<Product> = {
  encode(message: Product, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== undefined) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.price !== 0) {
      writer.uint32(33).double(message.price);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Product {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProduct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 33) {
            break;
          }

          message.price = reader.double();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Product {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : undefined,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      price: isSet(object.price) ? globalThis.Number(object.price) : 0,
    };
  },

  toJSON(message: Product): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.price !== 0) {
      obj.price = message.price;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Product>, I>>(base?: I): Product {
    return Product.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Product>, I>>(object: I): Product {
    const message = createBaseProduct();
    message.id = object.id ?? undefined;
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.price = object.price ?? 0;
    return message;
  },
};

function createBaseGetProductRequest(): GetProductRequest {
  return { id: 0 };
}

export const GetProductRequest: MessageFns<GetProductRequest> = {
  encode(message: GetProductRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GetProductRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProductRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetProductRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: GetProductRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetProductRequest>, I>>(base?: I): GetProductRequest {
    return GetProductRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetProductRequest>, I>>(object: I): GetProductRequest {
    const message = createBaseGetProductRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseCreateProductRequest(): CreateProductRequest {
  return { product: undefined };
}

export const CreateProductRequest: MessageFns<CreateProductRequest> = {
  encode(message: CreateProductRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.product !== undefined) {
      Product.encode(message.product, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CreateProductRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateProductRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.product = Product.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateProductRequest {
    return { product: isSet(object.product) ? Product.fromJSON(object.product) : undefined };
  },

  toJSON(message: CreateProductRequest): unknown {
    const obj: any = {};
    if (message.product !== undefined) {
      obj.product = Product.toJSON(message.product);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateProductRequest>, I>>(base?: I): CreateProductRequest {
    return CreateProductRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateProductRequest>, I>>(object: I): CreateProductRequest {
    const message = createBaseCreateProductRequest();
    message.product = (object.product !== undefined && object.product !== null)
      ? Product.fromPartial(object.product)
      : undefined;
    return message;
  },
};

function createBaseUpdateProductRequest(): UpdateProductRequest {
  return { product: undefined };
}

export const UpdateProductRequest: MessageFns<UpdateProductRequest> = {
  encode(message: UpdateProductRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.product !== undefined) {
      Product.encode(message.product, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UpdateProductRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateProductRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.product = Product.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateProductRequest {
    return { product: isSet(object.product) ? Product.fromJSON(object.product) : undefined };
  },

  toJSON(message: UpdateProductRequest): unknown {
    const obj: any = {};
    if (message.product !== undefined) {
      obj.product = Product.toJSON(message.product);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateProductRequest>, I>>(base?: I): UpdateProductRequest {
    return UpdateProductRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateProductRequest>, I>>(object: I): UpdateProductRequest {
    const message = createBaseUpdateProductRequest();
    message.product = (object.product !== undefined && object.product !== null)
      ? Product.fromPartial(object.product)
      : undefined;
    return message;
  },
};

function createBaseDeleteProductRequest(): DeleteProductRequest {
  return { id: 0 };
}

export const DeleteProductRequest: MessageFns<DeleteProductRequest> = {
  encode(message: DeleteProductRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DeleteProductRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteProductRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteProductRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: DeleteProductRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteProductRequest>, I>>(base?: I): DeleteProductRequest {
    return DeleteProductRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteProductRequest>, I>>(object: I): DeleteProductRequest {
    const message = createBaseDeleteProductRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseListProductsResponse(): ListProductsResponse {
  return { products: [] };
}

export const ListProductsResponse: MessageFns<ListProductsResponse> = {
  encode(message: ListProductsResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.products) {
      Product.encode(v!, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ListProductsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListProductsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.products.push(Product.decode(reader, reader.uint32()));
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListProductsResponse {
    return {
      products: globalThis.Array.isArray(object?.products) ? object.products.map((e: any) => Product.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListProductsResponse): unknown {
    const obj: any = {};
    if (message.products?.length) {
      obj.products = message.products.map((e) => Product.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListProductsResponse>, I>>(base?: I): ListProductsResponse {
    return ListProductsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListProductsResponse>, I>>(object: I): ListProductsResponse {
    const message = createBaseListProductsResponse();
    message.products = object.products?.map((e) => Product.fromPartial(e)) || [];
    return message;
  },
};

export type ProductServiceService = typeof ProductServiceService;
export const ProductServiceService = {
  getProduct: {
    path: "/apisvc.ProductService/GetProduct",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetProductRequest) => Buffer.from(GetProductRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetProductRequest.decode(value),
    responseSerialize: (value: Product) => Buffer.from(Product.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Product.decode(value),
  },
  createProduct: {
    path: "/apisvc.ProductService/CreateProduct",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateProductRequest) => Buffer.from(CreateProductRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateProductRequest.decode(value),
    responseSerialize: (value: Product) => Buffer.from(Product.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Product.decode(value),
  },
  updateProduct: {
    path: "/apisvc.ProductService/UpdateProduct",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateProductRequest) => Buffer.from(UpdateProductRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateProductRequest.decode(value),
    responseSerialize: (value: Product) => Buffer.from(Product.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Product.decode(value),
  },
  deleteProduct: {
    path: "/apisvc.ProductService/DeleteProduct",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteProductRequest) => Buffer.from(DeleteProductRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteProductRequest.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  listProducts: {
    path: "/apisvc.ProductService/ListProducts",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: ListProductsResponse) => Buffer.from(ListProductsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListProductsResponse.decode(value),
  },
} as const;

export interface ProductServiceServer extends UntypedServiceImplementation {
  getProduct: handleUnaryCall<GetProductRequest, Product>;
  createProduct: handleUnaryCall<CreateProductRequest, Product>;
  updateProduct: handleUnaryCall<UpdateProductRequest, Product>;
  deleteProduct: handleUnaryCall<DeleteProductRequest, Empty>;
  listProducts: handleUnaryCall<Empty, ListProductsResponse>;
}

export interface ProductServiceClient extends Client {
  getProduct(
    request: GetProductRequest,
    callback: (error: ServiceError | null, response: Product) => void,
  ): ClientUnaryCall;
  getProduct(
    request: GetProductRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Product) => void,
  ): ClientUnaryCall;
  getProduct(
    request: GetProductRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Product) => void,
  ): ClientUnaryCall;
  createProduct(
    request: CreateProductRequest,
    callback: (error: ServiceError | null, response: Product) => void,
  ): ClientUnaryCall;
  createProduct(
    request: CreateProductRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Product) => void,
  ): ClientUnaryCall;
  createProduct(
    request: CreateProductRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Product) => void,
  ): ClientUnaryCall;
  updateProduct(
    request: UpdateProductRequest,
    callback: (error: ServiceError | null, response: Product) => void,
  ): ClientUnaryCall;
  updateProduct(
    request: UpdateProductRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Product) => void,
  ): ClientUnaryCall;
  updateProduct(
    request: UpdateProductRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Product) => void,
  ): ClientUnaryCall;
  deleteProduct(
    request: DeleteProductRequest,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteProduct(
    request: DeleteProductRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteProduct(
    request: DeleteProductRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  listProducts(
    request: Empty,
    callback: (error: ServiceError | null, response: ListProductsResponse) => void,
  ): ClientUnaryCall;
  listProducts(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListProductsResponse) => void,
  ): ClientUnaryCall;
  listProducts(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListProductsResponse) => void,
  ): ClientUnaryCall;
}

export const ProductServiceClient = makeGenericClientConstructor(
  ProductServiceService,
  "apisvc.ProductService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): ProductServiceClient;
  service: typeof ProductServiceService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}

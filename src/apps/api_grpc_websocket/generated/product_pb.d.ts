import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace mypackage. */
export namespace mypackage {

    /** Properties of an Empty. */
    interface IEmpty {
    }

    /** Represents an Empty. */
    class Empty implements IEmpty {

        /**
         * Constructs a new Empty.
         * @param [properties] Properties to set
         */
        constructor(properties?: mypackage.IEmpty);

        /**
         * Creates a new Empty instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Empty instance
         */
        public static create(properties?: mypackage.IEmpty): mypackage.Empty;

        /**
         * Encodes the specified Empty message. Does not implicitly {@link mypackage.Empty.verify|verify} messages.
         * @param message Empty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mypackage.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Empty message, length delimited. Does not implicitly {@link mypackage.Empty.verify|verify} messages.
         * @param message Empty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mypackage.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Empty message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Empty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mypackage.Empty;

        /**
         * Decodes an Empty message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Empty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mypackage.Empty;

        /**
         * Verifies an Empty message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Empty message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Empty
         */
        public static fromObject(object: { [k: string]: any }): mypackage.Empty;

        /**
         * Creates a plain object from an Empty message. Also converts values to other types if specified.
         * @param message Empty
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mypackage.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Empty to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Empty
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Product. */
    interface IProduct {

        /** Product id */
        id?: (number|null);

        /** Product name */
        name?: (string|null);

        /** Product description */
        description?: (string|null);

        /** Product price */
        price?: (number|null);
    }

    /** Represents a Product. */
    class Product implements IProduct {

        /**
         * Constructs a new Product.
         * @param [properties] Properties to set
         */
        constructor(properties?: mypackage.IProduct);

        /** Product id. */
        public id: number;

        /** Product name. */
        public name: string;

        /** Product description. */
        public description: string;

        /** Product price. */
        public price: number;

        /**
         * Creates a new Product instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Product instance
         */
        public static create(properties?: mypackage.IProduct): mypackage.Product;

        /**
         * Encodes the specified Product message. Does not implicitly {@link mypackage.Product.verify|verify} messages.
         * @param message Product message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mypackage.IProduct, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Product message, length delimited. Does not implicitly {@link mypackage.Product.verify|verify} messages.
         * @param message Product message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mypackage.IProduct, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Product message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Product
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mypackage.Product;

        /**
         * Decodes a Product message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Product
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mypackage.Product;

        /**
         * Verifies a Product message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Product message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Product
         */
        public static fromObject(object: { [k: string]: any }): mypackage.Product;

        /**
         * Creates a plain object from a Product message. Also converts values to other types if specified.
         * @param message Product
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mypackage.Product, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Product to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Product
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetProductRequest. */
    interface IGetProductRequest {

        /** GetProductRequest id */
        id?: (number|null);
    }

    /** Represents a GetProductRequest. */
    class GetProductRequest implements IGetProductRequest {

        /**
         * Constructs a new GetProductRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: mypackage.IGetProductRequest);

        /** GetProductRequest id. */
        public id: number;

        /**
         * Creates a new GetProductRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetProductRequest instance
         */
        public static create(properties?: mypackage.IGetProductRequest): mypackage.GetProductRequest;

        /**
         * Encodes the specified GetProductRequest message. Does not implicitly {@link mypackage.GetProductRequest.verify|verify} messages.
         * @param message GetProductRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mypackage.IGetProductRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetProductRequest message, length delimited. Does not implicitly {@link mypackage.GetProductRequest.verify|verify} messages.
         * @param message GetProductRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mypackage.IGetProductRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetProductRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mypackage.GetProductRequest;

        /**
         * Decodes a GetProductRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mypackage.GetProductRequest;

        /**
         * Verifies a GetProductRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetProductRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetProductRequest
         */
        public static fromObject(object: { [k: string]: any }): mypackage.GetProductRequest;

        /**
         * Creates a plain object from a GetProductRequest message. Also converts values to other types if specified.
         * @param message GetProductRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mypackage.GetProductRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetProductRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetProductRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CreateProductRequest. */
    interface ICreateProductRequest {

        /** CreateProductRequest product */
        product?: (mypackage.IProduct|null);
    }

    /** Represents a CreateProductRequest. */
    class CreateProductRequest implements ICreateProductRequest {

        /**
         * Constructs a new CreateProductRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: mypackage.ICreateProductRequest);

        /** CreateProductRequest product. */
        public product?: (mypackage.IProduct|null);

        /**
         * Creates a new CreateProductRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateProductRequest instance
         */
        public static create(properties?: mypackage.ICreateProductRequest): mypackage.CreateProductRequest;

        /**
         * Encodes the specified CreateProductRequest message. Does not implicitly {@link mypackage.CreateProductRequest.verify|verify} messages.
         * @param message CreateProductRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mypackage.ICreateProductRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateProductRequest message, length delimited. Does not implicitly {@link mypackage.CreateProductRequest.verify|verify} messages.
         * @param message CreateProductRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mypackage.ICreateProductRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateProductRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mypackage.CreateProductRequest;

        /**
         * Decodes a CreateProductRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mypackage.CreateProductRequest;

        /**
         * Verifies a CreateProductRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateProductRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateProductRequest
         */
        public static fromObject(object: { [k: string]: any }): mypackage.CreateProductRequest;

        /**
         * Creates a plain object from a CreateProductRequest message. Also converts values to other types if specified.
         * @param message CreateProductRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mypackage.CreateProductRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateProductRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CreateProductRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an UpdateProductRequest. */
    interface IUpdateProductRequest {

        /** UpdateProductRequest product */
        product?: (mypackage.IProduct|null);
    }

    /** Represents an UpdateProductRequest. */
    class UpdateProductRequest implements IUpdateProductRequest {

        /**
         * Constructs a new UpdateProductRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: mypackage.IUpdateProductRequest);

        /** UpdateProductRequest product. */
        public product?: (mypackage.IProduct|null);

        /**
         * Creates a new UpdateProductRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateProductRequest instance
         */
        public static create(properties?: mypackage.IUpdateProductRequest): mypackage.UpdateProductRequest;

        /**
         * Encodes the specified UpdateProductRequest message. Does not implicitly {@link mypackage.UpdateProductRequest.verify|verify} messages.
         * @param message UpdateProductRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mypackage.IUpdateProductRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateProductRequest message, length delimited. Does not implicitly {@link mypackage.UpdateProductRequest.verify|verify} messages.
         * @param message UpdateProductRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mypackage.IUpdateProductRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateProductRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mypackage.UpdateProductRequest;

        /**
         * Decodes an UpdateProductRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mypackage.UpdateProductRequest;

        /**
         * Verifies an UpdateProductRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateProductRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateProductRequest
         */
        public static fromObject(object: { [k: string]: any }): mypackage.UpdateProductRequest;

        /**
         * Creates a plain object from an UpdateProductRequest message. Also converts values to other types if specified.
         * @param message UpdateProductRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mypackage.UpdateProductRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateProductRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UpdateProductRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DeleteProductRequest. */
    interface IDeleteProductRequest {

        /** DeleteProductRequest id */
        id?: (number|null);
    }

    /** Represents a DeleteProductRequest. */
    class DeleteProductRequest implements IDeleteProductRequest {

        /**
         * Constructs a new DeleteProductRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: mypackage.IDeleteProductRequest);

        /** DeleteProductRequest id. */
        public id: number;

        /**
         * Creates a new DeleteProductRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeleteProductRequest instance
         */
        public static create(properties?: mypackage.IDeleteProductRequest): mypackage.DeleteProductRequest;

        /**
         * Encodes the specified DeleteProductRequest message. Does not implicitly {@link mypackage.DeleteProductRequest.verify|verify} messages.
         * @param message DeleteProductRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mypackage.IDeleteProductRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeleteProductRequest message, length delimited. Does not implicitly {@link mypackage.DeleteProductRequest.verify|verify} messages.
         * @param message DeleteProductRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mypackage.IDeleteProductRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeleteProductRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeleteProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mypackage.DeleteProductRequest;

        /**
         * Decodes a DeleteProductRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeleteProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mypackage.DeleteProductRequest;

        /**
         * Verifies a DeleteProductRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeleteProductRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeleteProductRequest
         */
        public static fromObject(object: { [k: string]: any }): mypackage.DeleteProductRequest;

        /**
         * Creates a plain object from a DeleteProductRequest message. Also converts values to other types if specified.
         * @param message DeleteProductRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mypackage.DeleteProductRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeleteProductRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DeleteProductRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListProductsResponse. */
    interface IListProductsResponse {

        /** ListProductsResponse products */
        products?: (mypackage.IProduct[]|null);
    }

    /** Represents a ListProductsResponse. */
    class ListProductsResponse implements IListProductsResponse {

        /**
         * Constructs a new ListProductsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: mypackage.IListProductsResponse);

        /** ListProductsResponse products. */
        public products: mypackage.IProduct[];

        /**
         * Creates a new ListProductsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListProductsResponse instance
         */
        public static create(properties?: mypackage.IListProductsResponse): mypackage.ListProductsResponse;

        /**
         * Encodes the specified ListProductsResponse message. Does not implicitly {@link mypackage.ListProductsResponse.verify|verify} messages.
         * @param message ListProductsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mypackage.IListProductsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListProductsResponse message, length delimited. Does not implicitly {@link mypackage.ListProductsResponse.verify|verify} messages.
         * @param message ListProductsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mypackage.IListProductsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListProductsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListProductsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mypackage.ListProductsResponse;

        /**
         * Decodes a ListProductsResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListProductsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mypackage.ListProductsResponse;

        /**
         * Verifies a ListProductsResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListProductsResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListProductsResponse
         */
        public static fromObject(object: { [k: string]: any }): mypackage.ListProductsResponse;

        /**
         * Creates a plain object from a ListProductsResponse message. Also converts values to other types if specified.
         * @param message ListProductsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mypackage.ListProductsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListProductsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListProductsResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an Envelope. */
    interface IEnvelope {

        /** Envelope method */
        method?: (string|null);

        /** Envelope payload */
        payload?: (Uint8Array|null);
    }

    /** Represents an Envelope. */
    class Envelope implements IEnvelope {

        /**
         * Constructs a new Envelope.
         * @param [properties] Properties to set
         */
        constructor(properties?: mypackage.IEnvelope);

        /** Envelope method. */
        public method: string;

        /** Envelope payload. */
        public payload: Uint8Array;

        /**
         * Creates a new Envelope instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Envelope instance
         */
        public static create(properties?: mypackage.IEnvelope): mypackage.Envelope;

        /**
         * Encodes the specified Envelope message. Does not implicitly {@link mypackage.Envelope.verify|verify} messages.
         * @param message Envelope message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mypackage.IEnvelope, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Envelope message, length delimited. Does not implicitly {@link mypackage.Envelope.verify|verify} messages.
         * @param message Envelope message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mypackage.IEnvelope, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Envelope message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Envelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mypackage.Envelope;

        /**
         * Decodes an Envelope message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Envelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mypackage.Envelope;

        /**
         * Verifies an Envelope message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Envelope message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Envelope
         */
        public static fromObject(object: { [k: string]: any }): mypackage.Envelope;

        /**
         * Creates a plain object from an Envelope message. Also converts values to other types if specified.
         * @param message Envelope
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mypackage.Envelope, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Envelope to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Envelope
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Represents a ProductService */
    class ProductService extends $protobuf.rpc.Service {

        /**
         * Constructs a new ProductService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new ProductService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): ProductService;

        /**
         * Calls GetProduct.
         * @param request GetProductRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Product
         */
        public getProduct(request: mypackage.IGetProductRequest, callback: mypackage.ProductService.GetProductCallback): void;

        /**
         * Calls GetProduct.
         * @param request GetProductRequest message or plain object
         * @returns Promise
         */
        public getProduct(request: mypackage.IGetProductRequest): Promise<mypackage.Product>;

        /**
         * Calls CreateProduct.
         * @param request CreateProductRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Product
         */
        public createProduct(request: mypackage.ICreateProductRequest, callback: mypackage.ProductService.CreateProductCallback): void;

        /**
         * Calls CreateProduct.
         * @param request CreateProductRequest message or plain object
         * @returns Promise
         */
        public createProduct(request: mypackage.ICreateProductRequest): Promise<mypackage.Product>;

        /**
         * Calls UpdateProduct.
         * @param request UpdateProductRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Product
         */
        public updateProduct(request: mypackage.IUpdateProductRequest, callback: mypackage.ProductService.UpdateProductCallback): void;

        /**
         * Calls UpdateProduct.
         * @param request UpdateProductRequest message or plain object
         * @returns Promise
         */
        public updateProduct(request: mypackage.IUpdateProductRequest): Promise<mypackage.Product>;

        /**
         * Calls DeleteProduct.
         * @param request DeleteProductRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public deleteProduct(request: mypackage.IDeleteProductRequest, callback: mypackage.ProductService.DeleteProductCallback): void;

        /**
         * Calls DeleteProduct.
         * @param request DeleteProductRequest message or plain object
         * @returns Promise
         */
        public deleteProduct(request: mypackage.IDeleteProductRequest): Promise<mypackage.Empty>;

        /**
         * Calls ListProducts.
         * @param request Empty message or plain object
         * @param callback Node-style callback called with the error, if any, and ListProductsResponse
         */
        public listProducts(request: mypackage.IEmpty, callback: mypackage.ProductService.ListProductsCallback): void;

        /**
         * Calls ListProducts.
         * @param request Empty message or plain object
         * @returns Promise
         */
        public listProducts(request: mypackage.IEmpty): Promise<mypackage.ListProductsResponse>;
    }

    namespace ProductService {

        /**
         * Callback as used by {@link mypackage.ProductService#getProduct}.
         * @param error Error, if any
         * @param [response] Product
         */
        type GetProductCallback = (error: (Error|null), response?: mypackage.Product) => void;

        /**
         * Callback as used by {@link mypackage.ProductService#createProduct}.
         * @param error Error, if any
         * @param [response] Product
         */
        type CreateProductCallback = (error: (Error|null), response?: mypackage.Product) => void;

        /**
         * Callback as used by {@link mypackage.ProductService#updateProduct}.
         * @param error Error, if any
         * @param [response] Product
         */
        type UpdateProductCallback = (error: (Error|null), response?: mypackage.Product) => void;

        /**
         * Callback as used by {@link mypackage.ProductService#deleteProduct}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type DeleteProductCallback = (error: (Error|null), response?: mypackage.Empty) => void;

        /**
         * Callback as used by {@link mypackage.ProductService#listProducts}.
         * @param error Error, if any
         * @param [response] ListProductsResponse
         */
        type ListProductsCallback = (error: (Error|null), response?: mypackage.ListProductsResponse) => void;
    }
}

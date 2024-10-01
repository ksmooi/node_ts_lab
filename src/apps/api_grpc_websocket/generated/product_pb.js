/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.mypackage = (function() {

    /**
     * Namespace mypackage.
     * @exports mypackage
     * @namespace
     */
    var mypackage = {};

    mypackage.Empty = (function() {

        /**
         * Properties of an Empty.
         * @memberof mypackage
         * @interface IEmpty
         */

        /**
         * Constructs a new Empty.
         * @memberof mypackage
         * @classdesc Represents an Empty.
         * @implements IEmpty
         * @constructor
         * @param {mypackage.IEmpty=} [properties] Properties to set
         */
        function Empty(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Empty instance using the specified properties.
         * @function create
         * @memberof mypackage.Empty
         * @static
         * @param {mypackage.IEmpty=} [properties] Properties to set
         * @returns {mypackage.Empty} Empty instance
         */
        Empty.create = function create(properties) {
            return new Empty(properties);
        };

        /**
         * Encodes the specified Empty message. Does not implicitly {@link mypackage.Empty.verify|verify} messages.
         * @function encode
         * @memberof mypackage.Empty
         * @static
         * @param {mypackage.IEmpty} message Empty message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Empty.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Empty message, length delimited. Does not implicitly {@link mypackage.Empty.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mypackage.Empty
         * @static
         * @param {mypackage.IEmpty} message Empty message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Empty.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Empty message from the specified reader or buffer.
         * @function decode
         * @memberof mypackage.Empty
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mypackage.Empty} Empty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Empty.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mypackage.Empty();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Empty message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mypackage.Empty
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mypackage.Empty} Empty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Empty.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Empty message.
         * @function verify
         * @memberof mypackage.Empty
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Empty.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an Empty message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mypackage.Empty
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mypackage.Empty} Empty
         */
        Empty.fromObject = function fromObject(object) {
            if (object instanceof $root.mypackage.Empty)
                return object;
            return new $root.mypackage.Empty();
        };

        /**
         * Creates a plain object from an Empty message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mypackage.Empty
         * @static
         * @param {mypackage.Empty} message Empty
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Empty.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Empty to JSON.
         * @function toJSON
         * @memberof mypackage.Empty
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Empty.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Empty
         * @function getTypeUrl
         * @memberof mypackage.Empty
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Empty.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/mypackage.Empty";
        };

        return Empty;
    })();

    mypackage.Product = (function() {

        /**
         * Properties of a Product.
         * @memberof mypackage
         * @interface IProduct
         * @property {number|null} [id] Product id
         * @property {string|null} [name] Product name
         * @property {string|null} [description] Product description
         * @property {number|null} [price] Product price
         */

        /**
         * Constructs a new Product.
         * @memberof mypackage
         * @classdesc Represents a Product.
         * @implements IProduct
         * @constructor
         * @param {mypackage.IProduct=} [properties] Properties to set
         */
        function Product(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Product id.
         * @member {number} id
         * @memberof mypackage.Product
         * @instance
         */
        Product.prototype.id = 0;

        /**
         * Product name.
         * @member {string} name
         * @memberof mypackage.Product
         * @instance
         */
        Product.prototype.name = "";

        /**
         * Product description.
         * @member {string} description
         * @memberof mypackage.Product
         * @instance
         */
        Product.prototype.description = "";

        /**
         * Product price.
         * @member {number} price
         * @memberof mypackage.Product
         * @instance
         */
        Product.prototype.price = 0;

        /**
         * Creates a new Product instance using the specified properties.
         * @function create
         * @memberof mypackage.Product
         * @static
         * @param {mypackage.IProduct=} [properties] Properties to set
         * @returns {mypackage.Product} Product instance
         */
        Product.create = function create(properties) {
            return new Product(properties);
        };

        /**
         * Encodes the specified Product message. Does not implicitly {@link mypackage.Product.verify|verify} messages.
         * @function encode
         * @memberof mypackage.Product
         * @static
         * @param {mypackage.IProduct} message Product message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Product.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.price);
            return writer;
        };

        /**
         * Encodes the specified Product message, length delimited. Does not implicitly {@link mypackage.Product.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mypackage.Product
         * @static
         * @param {mypackage.IProduct} message Product message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Product.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Product message from the specified reader or buffer.
         * @function decode
         * @memberof mypackage.Product
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mypackage.Product} Product
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Product.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mypackage.Product();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.description = reader.string();
                        break;
                    }
                case 4: {
                        message.price = reader.double();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Product message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mypackage.Product
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mypackage.Product} Product
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Product.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Product message.
         * @function verify
         * @memberof mypackage.Product
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Product.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            return null;
        };

        /**
         * Creates a Product message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mypackage.Product
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mypackage.Product} Product
         */
        Product.fromObject = function fromObject(object) {
            if (object instanceof $root.mypackage.Product)
                return object;
            var message = new $root.mypackage.Product();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.description != null)
                message.description = String(object.description);
            if (object.price != null)
                message.price = Number(object.price);
            return message;
        };

        /**
         * Creates a plain object from a Product message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mypackage.Product
         * @static
         * @param {mypackage.Product} message Product
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Product.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.name = "";
                object.description = "";
                object.price = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            return object;
        };

        /**
         * Converts this Product to JSON.
         * @function toJSON
         * @memberof mypackage.Product
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Product.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Product
         * @function getTypeUrl
         * @memberof mypackage.Product
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Product.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/mypackage.Product";
        };

        return Product;
    })();

    mypackage.GetProductRequest = (function() {

        /**
         * Properties of a GetProductRequest.
         * @memberof mypackage
         * @interface IGetProductRequest
         * @property {number|null} [id] GetProductRequest id
         */

        /**
         * Constructs a new GetProductRequest.
         * @memberof mypackage
         * @classdesc Represents a GetProductRequest.
         * @implements IGetProductRequest
         * @constructor
         * @param {mypackage.IGetProductRequest=} [properties] Properties to set
         */
        function GetProductRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetProductRequest id.
         * @member {number} id
         * @memberof mypackage.GetProductRequest
         * @instance
         */
        GetProductRequest.prototype.id = 0;

        /**
         * Creates a new GetProductRequest instance using the specified properties.
         * @function create
         * @memberof mypackage.GetProductRequest
         * @static
         * @param {mypackage.IGetProductRequest=} [properties] Properties to set
         * @returns {mypackage.GetProductRequest} GetProductRequest instance
         */
        GetProductRequest.create = function create(properties) {
            return new GetProductRequest(properties);
        };

        /**
         * Encodes the specified GetProductRequest message. Does not implicitly {@link mypackage.GetProductRequest.verify|verify} messages.
         * @function encode
         * @memberof mypackage.GetProductRequest
         * @static
         * @param {mypackage.IGetProductRequest} message GetProductRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetProductRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            return writer;
        };

        /**
         * Encodes the specified GetProductRequest message, length delimited. Does not implicitly {@link mypackage.GetProductRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mypackage.GetProductRequest
         * @static
         * @param {mypackage.IGetProductRequest} message GetProductRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetProductRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetProductRequest message from the specified reader or buffer.
         * @function decode
         * @memberof mypackage.GetProductRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mypackage.GetProductRequest} GetProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetProductRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mypackage.GetProductRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetProductRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mypackage.GetProductRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mypackage.GetProductRequest} GetProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetProductRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetProductRequest message.
         * @function verify
         * @memberof mypackage.GetProductRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetProductRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            return null;
        };

        /**
         * Creates a GetProductRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mypackage.GetProductRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mypackage.GetProductRequest} GetProductRequest
         */
        GetProductRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.mypackage.GetProductRequest)
                return object;
            var message = new $root.mypackage.GetProductRequest();
            if (object.id != null)
                message.id = object.id | 0;
            return message;
        };

        /**
         * Creates a plain object from a GetProductRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mypackage.GetProductRequest
         * @static
         * @param {mypackage.GetProductRequest} message GetProductRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetProductRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.id = 0;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this GetProductRequest to JSON.
         * @function toJSON
         * @memberof mypackage.GetProductRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetProductRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetProductRequest
         * @function getTypeUrl
         * @memberof mypackage.GetProductRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetProductRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/mypackage.GetProductRequest";
        };

        return GetProductRequest;
    })();

    mypackage.CreateProductRequest = (function() {

        /**
         * Properties of a CreateProductRequest.
         * @memberof mypackage
         * @interface ICreateProductRequest
         * @property {mypackage.IProduct|null} [product] CreateProductRequest product
         */

        /**
         * Constructs a new CreateProductRequest.
         * @memberof mypackage
         * @classdesc Represents a CreateProductRequest.
         * @implements ICreateProductRequest
         * @constructor
         * @param {mypackage.ICreateProductRequest=} [properties] Properties to set
         */
        function CreateProductRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateProductRequest product.
         * @member {mypackage.IProduct|null|undefined} product
         * @memberof mypackage.CreateProductRequest
         * @instance
         */
        CreateProductRequest.prototype.product = null;

        /**
         * Creates a new CreateProductRequest instance using the specified properties.
         * @function create
         * @memberof mypackage.CreateProductRequest
         * @static
         * @param {mypackage.ICreateProductRequest=} [properties] Properties to set
         * @returns {mypackage.CreateProductRequest} CreateProductRequest instance
         */
        CreateProductRequest.create = function create(properties) {
            return new CreateProductRequest(properties);
        };

        /**
         * Encodes the specified CreateProductRequest message. Does not implicitly {@link mypackage.CreateProductRequest.verify|verify} messages.
         * @function encode
         * @memberof mypackage.CreateProductRequest
         * @static
         * @param {mypackage.ICreateProductRequest} message CreateProductRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateProductRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.product != null && Object.hasOwnProperty.call(message, "product"))
                $root.mypackage.Product.encode(message.product, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CreateProductRequest message, length delimited. Does not implicitly {@link mypackage.CreateProductRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mypackage.CreateProductRequest
         * @static
         * @param {mypackage.ICreateProductRequest} message CreateProductRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateProductRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CreateProductRequest message from the specified reader or buffer.
         * @function decode
         * @memberof mypackage.CreateProductRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mypackage.CreateProductRequest} CreateProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateProductRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mypackage.CreateProductRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.product = $root.mypackage.Product.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CreateProductRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mypackage.CreateProductRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mypackage.CreateProductRequest} CreateProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateProductRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CreateProductRequest message.
         * @function verify
         * @memberof mypackage.CreateProductRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateProductRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.product != null && message.hasOwnProperty("product")) {
                var error = $root.mypackage.Product.verify(message.product);
                if (error)
                    return "product." + error;
            }
            return null;
        };

        /**
         * Creates a CreateProductRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mypackage.CreateProductRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mypackage.CreateProductRequest} CreateProductRequest
         */
        CreateProductRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.mypackage.CreateProductRequest)
                return object;
            var message = new $root.mypackage.CreateProductRequest();
            if (object.product != null) {
                if (typeof object.product !== "object")
                    throw TypeError(".mypackage.CreateProductRequest.product: object expected");
                message.product = $root.mypackage.Product.fromObject(object.product);
            }
            return message;
        };

        /**
         * Creates a plain object from a CreateProductRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mypackage.CreateProductRequest
         * @static
         * @param {mypackage.CreateProductRequest} message CreateProductRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateProductRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.product = null;
            if (message.product != null && message.hasOwnProperty("product"))
                object.product = $root.mypackage.Product.toObject(message.product, options);
            return object;
        };

        /**
         * Converts this CreateProductRequest to JSON.
         * @function toJSON
         * @memberof mypackage.CreateProductRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateProductRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CreateProductRequest
         * @function getTypeUrl
         * @memberof mypackage.CreateProductRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CreateProductRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/mypackage.CreateProductRequest";
        };

        return CreateProductRequest;
    })();

    mypackage.UpdateProductRequest = (function() {

        /**
         * Properties of an UpdateProductRequest.
         * @memberof mypackage
         * @interface IUpdateProductRequest
         * @property {mypackage.IProduct|null} [product] UpdateProductRequest product
         */

        /**
         * Constructs a new UpdateProductRequest.
         * @memberof mypackage
         * @classdesc Represents an UpdateProductRequest.
         * @implements IUpdateProductRequest
         * @constructor
         * @param {mypackage.IUpdateProductRequest=} [properties] Properties to set
         */
        function UpdateProductRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpdateProductRequest product.
         * @member {mypackage.IProduct|null|undefined} product
         * @memberof mypackage.UpdateProductRequest
         * @instance
         */
        UpdateProductRequest.prototype.product = null;

        /**
         * Creates a new UpdateProductRequest instance using the specified properties.
         * @function create
         * @memberof mypackage.UpdateProductRequest
         * @static
         * @param {mypackage.IUpdateProductRequest=} [properties] Properties to set
         * @returns {mypackage.UpdateProductRequest} UpdateProductRequest instance
         */
        UpdateProductRequest.create = function create(properties) {
            return new UpdateProductRequest(properties);
        };

        /**
         * Encodes the specified UpdateProductRequest message. Does not implicitly {@link mypackage.UpdateProductRequest.verify|verify} messages.
         * @function encode
         * @memberof mypackage.UpdateProductRequest
         * @static
         * @param {mypackage.IUpdateProductRequest} message UpdateProductRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateProductRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.product != null && Object.hasOwnProperty.call(message, "product"))
                $root.mypackage.Product.encode(message.product, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UpdateProductRequest message, length delimited. Does not implicitly {@link mypackage.UpdateProductRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mypackage.UpdateProductRequest
         * @static
         * @param {mypackage.IUpdateProductRequest} message UpdateProductRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateProductRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UpdateProductRequest message from the specified reader or buffer.
         * @function decode
         * @memberof mypackage.UpdateProductRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mypackage.UpdateProductRequest} UpdateProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateProductRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mypackage.UpdateProductRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.product = $root.mypackage.Product.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UpdateProductRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mypackage.UpdateProductRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mypackage.UpdateProductRequest} UpdateProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateProductRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UpdateProductRequest message.
         * @function verify
         * @memberof mypackage.UpdateProductRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UpdateProductRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.product != null && message.hasOwnProperty("product")) {
                var error = $root.mypackage.Product.verify(message.product);
                if (error)
                    return "product." + error;
            }
            return null;
        };

        /**
         * Creates an UpdateProductRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mypackage.UpdateProductRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mypackage.UpdateProductRequest} UpdateProductRequest
         */
        UpdateProductRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.mypackage.UpdateProductRequest)
                return object;
            var message = new $root.mypackage.UpdateProductRequest();
            if (object.product != null) {
                if (typeof object.product !== "object")
                    throw TypeError(".mypackage.UpdateProductRequest.product: object expected");
                message.product = $root.mypackage.Product.fromObject(object.product);
            }
            return message;
        };

        /**
         * Creates a plain object from an UpdateProductRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mypackage.UpdateProductRequest
         * @static
         * @param {mypackage.UpdateProductRequest} message UpdateProductRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpdateProductRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.product = null;
            if (message.product != null && message.hasOwnProperty("product"))
                object.product = $root.mypackage.Product.toObject(message.product, options);
            return object;
        };

        /**
         * Converts this UpdateProductRequest to JSON.
         * @function toJSON
         * @memberof mypackage.UpdateProductRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpdateProductRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UpdateProductRequest
         * @function getTypeUrl
         * @memberof mypackage.UpdateProductRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UpdateProductRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/mypackage.UpdateProductRequest";
        };

        return UpdateProductRequest;
    })();

    mypackage.DeleteProductRequest = (function() {

        /**
         * Properties of a DeleteProductRequest.
         * @memberof mypackage
         * @interface IDeleteProductRequest
         * @property {number|null} [id] DeleteProductRequest id
         */

        /**
         * Constructs a new DeleteProductRequest.
         * @memberof mypackage
         * @classdesc Represents a DeleteProductRequest.
         * @implements IDeleteProductRequest
         * @constructor
         * @param {mypackage.IDeleteProductRequest=} [properties] Properties to set
         */
        function DeleteProductRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeleteProductRequest id.
         * @member {number} id
         * @memberof mypackage.DeleteProductRequest
         * @instance
         */
        DeleteProductRequest.prototype.id = 0;

        /**
         * Creates a new DeleteProductRequest instance using the specified properties.
         * @function create
         * @memberof mypackage.DeleteProductRequest
         * @static
         * @param {mypackage.IDeleteProductRequest=} [properties] Properties to set
         * @returns {mypackage.DeleteProductRequest} DeleteProductRequest instance
         */
        DeleteProductRequest.create = function create(properties) {
            return new DeleteProductRequest(properties);
        };

        /**
         * Encodes the specified DeleteProductRequest message. Does not implicitly {@link mypackage.DeleteProductRequest.verify|verify} messages.
         * @function encode
         * @memberof mypackage.DeleteProductRequest
         * @static
         * @param {mypackage.IDeleteProductRequest} message DeleteProductRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeleteProductRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            return writer;
        };

        /**
         * Encodes the specified DeleteProductRequest message, length delimited. Does not implicitly {@link mypackage.DeleteProductRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mypackage.DeleteProductRequest
         * @static
         * @param {mypackage.IDeleteProductRequest} message DeleteProductRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeleteProductRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DeleteProductRequest message from the specified reader or buffer.
         * @function decode
         * @memberof mypackage.DeleteProductRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mypackage.DeleteProductRequest} DeleteProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeleteProductRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mypackage.DeleteProductRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DeleteProductRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mypackage.DeleteProductRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mypackage.DeleteProductRequest} DeleteProductRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeleteProductRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeleteProductRequest message.
         * @function verify
         * @memberof mypackage.DeleteProductRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeleteProductRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            return null;
        };

        /**
         * Creates a DeleteProductRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mypackage.DeleteProductRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mypackage.DeleteProductRequest} DeleteProductRequest
         */
        DeleteProductRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.mypackage.DeleteProductRequest)
                return object;
            var message = new $root.mypackage.DeleteProductRequest();
            if (object.id != null)
                message.id = object.id | 0;
            return message;
        };

        /**
         * Creates a plain object from a DeleteProductRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mypackage.DeleteProductRequest
         * @static
         * @param {mypackage.DeleteProductRequest} message DeleteProductRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeleteProductRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.id = 0;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this DeleteProductRequest to JSON.
         * @function toJSON
         * @memberof mypackage.DeleteProductRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeleteProductRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DeleteProductRequest
         * @function getTypeUrl
         * @memberof mypackage.DeleteProductRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DeleteProductRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/mypackage.DeleteProductRequest";
        };

        return DeleteProductRequest;
    })();

    mypackage.ListProductsResponse = (function() {

        /**
         * Properties of a ListProductsResponse.
         * @memberof mypackage
         * @interface IListProductsResponse
         * @property {Array.<mypackage.IProduct>|null} [products] ListProductsResponse products
         */

        /**
         * Constructs a new ListProductsResponse.
         * @memberof mypackage
         * @classdesc Represents a ListProductsResponse.
         * @implements IListProductsResponse
         * @constructor
         * @param {mypackage.IListProductsResponse=} [properties] Properties to set
         */
        function ListProductsResponse(properties) {
            this.products = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ListProductsResponse products.
         * @member {Array.<mypackage.IProduct>} products
         * @memberof mypackage.ListProductsResponse
         * @instance
         */
        ListProductsResponse.prototype.products = $util.emptyArray;

        /**
         * Creates a new ListProductsResponse instance using the specified properties.
         * @function create
         * @memberof mypackage.ListProductsResponse
         * @static
         * @param {mypackage.IListProductsResponse=} [properties] Properties to set
         * @returns {mypackage.ListProductsResponse} ListProductsResponse instance
         */
        ListProductsResponse.create = function create(properties) {
            return new ListProductsResponse(properties);
        };

        /**
         * Encodes the specified ListProductsResponse message. Does not implicitly {@link mypackage.ListProductsResponse.verify|verify} messages.
         * @function encode
         * @memberof mypackage.ListProductsResponse
         * @static
         * @param {mypackage.IListProductsResponse} message ListProductsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ListProductsResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.products != null && message.products.length)
                for (var i = 0; i < message.products.length; ++i)
                    $root.mypackage.Product.encode(message.products[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ListProductsResponse message, length delimited. Does not implicitly {@link mypackage.ListProductsResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mypackage.ListProductsResponse
         * @static
         * @param {mypackage.IListProductsResponse} message ListProductsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ListProductsResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ListProductsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof mypackage.ListProductsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mypackage.ListProductsResponse} ListProductsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ListProductsResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mypackage.ListProductsResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.products && message.products.length))
                            message.products = [];
                        message.products.push($root.mypackage.Product.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ListProductsResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mypackage.ListProductsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mypackage.ListProductsResponse} ListProductsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ListProductsResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ListProductsResponse message.
         * @function verify
         * @memberof mypackage.ListProductsResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ListProductsResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.products != null && message.hasOwnProperty("products")) {
                if (!Array.isArray(message.products))
                    return "products: array expected";
                for (var i = 0; i < message.products.length; ++i) {
                    var error = $root.mypackage.Product.verify(message.products[i]);
                    if (error)
                        return "products." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ListProductsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mypackage.ListProductsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mypackage.ListProductsResponse} ListProductsResponse
         */
        ListProductsResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.mypackage.ListProductsResponse)
                return object;
            var message = new $root.mypackage.ListProductsResponse();
            if (object.products) {
                if (!Array.isArray(object.products))
                    throw TypeError(".mypackage.ListProductsResponse.products: array expected");
                message.products = [];
                for (var i = 0; i < object.products.length; ++i) {
                    if (typeof object.products[i] !== "object")
                        throw TypeError(".mypackage.ListProductsResponse.products: object expected");
                    message.products[i] = $root.mypackage.Product.fromObject(object.products[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ListProductsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mypackage.ListProductsResponse
         * @static
         * @param {mypackage.ListProductsResponse} message ListProductsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ListProductsResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.products = [];
            if (message.products && message.products.length) {
                object.products = [];
                for (var j = 0; j < message.products.length; ++j)
                    object.products[j] = $root.mypackage.Product.toObject(message.products[j], options);
            }
            return object;
        };

        /**
         * Converts this ListProductsResponse to JSON.
         * @function toJSON
         * @memberof mypackage.ListProductsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ListProductsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ListProductsResponse
         * @function getTypeUrl
         * @memberof mypackage.ListProductsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ListProductsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/mypackage.ListProductsResponse";
        };

        return ListProductsResponse;
    })();

    mypackage.Envelope = (function() {

        /**
         * Properties of an Envelope.
         * @memberof mypackage
         * @interface IEnvelope
         * @property {string|null} [method] Envelope method
         * @property {Uint8Array|null} [payload] Envelope payload
         */

        /**
         * Constructs a new Envelope.
         * @memberof mypackage
         * @classdesc Represents an Envelope.
         * @implements IEnvelope
         * @constructor
         * @param {mypackage.IEnvelope=} [properties] Properties to set
         */
        function Envelope(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Envelope method.
         * @member {string} method
         * @memberof mypackage.Envelope
         * @instance
         */
        Envelope.prototype.method = "";

        /**
         * Envelope payload.
         * @member {Uint8Array} payload
         * @memberof mypackage.Envelope
         * @instance
         */
        Envelope.prototype.payload = $util.newBuffer([]);

        /**
         * Creates a new Envelope instance using the specified properties.
         * @function create
         * @memberof mypackage.Envelope
         * @static
         * @param {mypackage.IEnvelope=} [properties] Properties to set
         * @returns {mypackage.Envelope} Envelope instance
         */
        Envelope.create = function create(properties) {
            return new Envelope(properties);
        };

        /**
         * Encodes the specified Envelope message. Does not implicitly {@link mypackage.Envelope.verify|verify} messages.
         * @function encode
         * @memberof mypackage.Envelope
         * @static
         * @param {mypackage.IEnvelope} message Envelope message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Envelope.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.method != null && Object.hasOwnProperty.call(message, "method"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.method);
            if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.payload);
            return writer;
        };

        /**
         * Encodes the specified Envelope message, length delimited. Does not implicitly {@link mypackage.Envelope.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mypackage.Envelope
         * @static
         * @param {mypackage.IEnvelope} message Envelope message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Envelope.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Envelope message from the specified reader or buffer.
         * @function decode
         * @memberof mypackage.Envelope
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mypackage.Envelope} Envelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Envelope.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mypackage.Envelope();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.method = reader.string();
                        break;
                    }
                case 2: {
                        message.payload = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Envelope message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mypackage.Envelope
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mypackage.Envelope} Envelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Envelope.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Envelope message.
         * @function verify
         * @memberof mypackage.Envelope
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Envelope.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.method != null && message.hasOwnProperty("method"))
                if (!$util.isString(message.method))
                    return "method: string expected";
            if (message.payload != null && message.hasOwnProperty("payload"))
                if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                    return "payload: buffer expected";
            return null;
        };

        /**
         * Creates an Envelope message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mypackage.Envelope
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mypackage.Envelope} Envelope
         */
        Envelope.fromObject = function fromObject(object) {
            if (object instanceof $root.mypackage.Envelope)
                return object;
            var message = new $root.mypackage.Envelope();
            if (object.method != null)
                message.method = String(object.method);
            if (object.payload != null)
                if (typeof object.payload === "string")
                    $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                else if (object.payload.length >= 0)
                    message.payload = object.payload;
            return message;
        };

        /**
         * Creates a plain object from an Envelope message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mypackage.Envelope
         * @static
         * @param {mypackage.Envelope} message Envelope
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Envelope.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.method = "";
                if (options.bytes === String)
                    object.payload = "";
                else {
                    object.payload = [];
                    if (options.bytes !== Array)
                        object.payload = $util.newBuffer(object.payload);
                }
            }
            if (message.method != null && message.hasOwnProperty("method"))
                object.method = message.method;
            if (message.payload != null && message.hasOwnProperty("payload"))
                object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
            return object;
        };

        /**
         * Converts this Envelope to JSON.
         * @function toJSON
         * @memberof mypackage.Envelope
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Envelope.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Envelope
         * @function getTypeUrl
         * @memberof mypackage.Envelope
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Envelope.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/mypackage.Envelope";
        };

        return Envelope;
    })();

    mypackage.ProductService = (function() {

        /**
         * Constructs a new ProductService service.
         * @memberof mypackage
         * @classdesc Represents a ProductService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function ProductService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (ProductService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = ProductService;

        /**
         * Creates new ProductService service using the specified rpc implementation.
         * @function create
         * @memberof mypackage.ProductService
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {ProductService} RPC service. Useful where requests and/or responses are streamed.
         */
        ProductService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link mypackage.ProductService#getProduct}.
         * @memberof mypackage.ProductService
         * @typedef GetProductCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {mypackage.Product} [response] Product
         */

        /**
         * Calls GetProduct.
         * @function getProduct
         * @memberof mypackage.ProductService
         * @instance
         * @param {mypackage.IGetProductRequest} request GetProductRequest message or plain object
         * @param {mypackage.ProductService.GetProductCallback} callback Node-style callback called with the error, if any, and Product
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(ProductService.prototype.getProduct = function getProduct(request, callback) {
            return this.rpcCall(getProduct, $root.mypackage.GetProductRequest, $root.mypackage.Product, request, callback);
        }, "name", { value: "GetProduct" });

        /**
         * Calls GetProduct.
         * @function getProduct
         * @memberof mypackage.ProductService
         * @instance
         * @param {mypackage.IGetProductRequest} request GetProductRequest message or plain object
         * @returns {Promise<mypackage.Product>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link mypackage.ProductService#createProduct}.
         * @memberof mypackage.ProductService
         * @typedef CreateProductCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {mypackage.Product} [response] Product
         */

        /**
         * Calls CreateProduct.
         * @function createProduct
         * @memberof mypackage.ProductService
         * @instance
         * @param {mypackage.ICreateProductRequest} request CreateProductRequest message or plain object
         * @param {mypackage.ProductService.CreateProductCallback} callback Node-style callback called with the error, if any, and Product
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(ProductService.prototype.createProduct = function createProduct(request, callback) {
            return this.rpcCall(createProduct, $root.mypackage.CreateProductRequest, $root.mypackage.Product, request, callback);
        }, "name", { value: "CreateProduct" });

        /**
         * Calls CreateProduct.
         * @function createProduct
         * @memberof mypackage.ProductService
         * @instance
         * @param {mypackage.ICreateProductRequest} request CreateProductRequest message or plain object
         * @returns {Promise<mypackage.Product>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link mypackage.ProductService#updateProduct}.
         * @memberof mypackage.ProductService
         * @typedef UpdateProductCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {mypackage.Product} [response] Product
         */

        /**
         * Calls UpdateProduct.
         * @function updateProduct
         * @memberof mypackage.ProductService
         * @instance
         * @param {mypackage.IUpdateProductRequest} request UpdateProductRequest message or plain object
         * @param {mypackage.ProductService.UpdateProductCallback} callback Node-style callback called with the error, if any, and Product
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(ProductService.prototype.updateProduct = function updateProduct(request, callback) {
            return this.rpcCall(updateProduct, $root.mypackage.UpdateProductRequest, $root.mypackage.Product, request, callback);
        }, "name", { value: "UpdateProduct" });

        /**
         * Calls UpdateProduct.
         * @function updateProduct
         * @memberof mypackage.ProductService
         * @instance
         * @param {mypackage.IUpdateProductRequest} request UpdateProductRequest message or plain object
         * @returns {Promise<mypackage.Product>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link mypackage.ProductService#deleteProduct}.
         * @memberof mypackage.ProductService
         * @typedef DeleteProductCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {mypackage.Empty} [response] Empty
         */

        /**
         * Calls DeleteProduct.
         * @function deleteProduct
         * @memberof mypackage.ProductService
         * @instance
         * @param {mypackage.IDeleteProductRequest} request DeleteProductRequest message or plain object
         * @param {mypackage.ProductService.DeleteProductCallback} callback Node-style callback called with the error, if any, and Empty
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(ProductService.prototype.deleteProduct = function deleteProduct(request, callback) {
            return this.rpcCall(deleteProduct, $root.mypackage.DeleteProductRequest, $root.mypackage.Empty, request, callback);
        }, "name", { value: "DeleteProduct" });

        /**
         * Calls DeleteProduct.
         * @function deleteProduct
         * @memberof mypackage.ProductService
         * @instance
         * @param {mypackage.IDeleteProductRequest} request DeleteProductRequest message or plain object
         * @returns {Promise<mypackage.Empty>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link mypackage.ProductService#listProducts}.
         * @memberof mypackage.ProductService
         * @typedef ListProductsCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {mypackage.ListProductsResponse} [response] ListProductsResponse
         */

        /**
         * Calls ListProducts.
         * @function listProducts
         * @memberof mypackage.ProductService
         * @instance
         * @param {mypackage.IEmpty} request Empty message or plain object
         * @param {mypackage.ProductService.ListProductsCallback} callback Node-style callback called with the error, if any, and ListProductsResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(ProductService.prototype.listProducts = function listProducts(request, callback) {
            return this.rpcCall(listProducts, $root.mypackage.Empty, $root.mypackage.ListProductsResponse, request, callback);
        }, "name", { value: "ListProducts" });

        /**
         * Calls ListProducts.
         * @function listProducts
         * @memberof mypackage.ProductService
         * @instance
         * @param {mypackage.IEmpty} request Empty message or plain object
         * @returns {Promise<mypackage.ListProductsResponse>} Promise
         * @variation 2
         */

        return ProductService;
    })();

    return mypackage;
})();

module.exports = $root;

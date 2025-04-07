
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.5.0
 * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
 */
Prisma.prismaVersion = {
  client: "6.5.0",
  engine: "173f8d54f8d52e692c7e27e72a88314ec7aeff60"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}




  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  email: 'email',
  password: 'password',
  avatarUrl: 'avatarUrl',
  experienceLevel: 'experienceLevel',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
};

exports.Prisma.TravelPlanScalarFieldEnum = {
  id: 'id',
  authorId: 'authorId',
  title: 'title',
  cityTitle: 'cityTitle',
  notes: 'notes',
  startDate: 'startDate',
  endDate: 'endDate',
  visibility: 'visibility',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
};

exports.Prisma.TravelPlanJournalScalarFieldEnum = {
  id: 'id',
  travelPlanId: 'travelPlanId',
  notes: 'notes',
  futureTip: 'futureTip',
  favNotes: 'favNotes',
  rating: 'rating',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
};

exports.Prisma.TravelPlanDestinationScalarFieldEnum = {
  id: 'id',
  travelPlanId: 'travelPlanId',
  title: 'title',
  latitude: 'latitude',
  longitude: 'longitude',
  photoUrl: 'photoUrl',
  googlePlaceId: 'googlePlaceId',
  startDate: 'startDate',
  dailyVisitOrder: 'dailyVisitOrder',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
};

exports.Prisma.TravelPlanDestinationAttachmentScalarFieldEnum = {
  travelPlanDestinationId: 'travelPlanDestinationId',
  url: 'url',
  order: 'order',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
};

exports.Prisma.TravelPlanBookmarkScalarFieldEnum = {
  travelPlanId: 'travelPlanId',
  userId: 'userId'
};

exports.Prisma.TravelPlanLikeScalarFieldEnum = {
  travelPlanId: 'travelPlanId',
  userId: 'userId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Visibility = exports.$Enums.Visibility = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE'
};

exports.Prisma.ModelName = {
  User: 'User',
  TravelPlan: 'TravelPlan',
  TravelPlanJournal: 'TravelPlanJournal',
  TravelPlanDestination: 'TravelPlanDestination',
  TravelPlanDestinationAttachment: 'TravelPlanDestinationAttachment',
  TravelPlanBookmark: 'TravelPlanBookmark',
  TravelPlanLike: 'TravelPlanLike'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\Chaya\\Desktop\\PROJECT\\VacationPlanner\\backend\\src\\generated\\prisma-client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x"
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "C:\\Users\\Chaya\\Desktop\\PROJECT\\VacationPlanner\\backend\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.5.0",
  "engineVersion": "173f8d54f8d52e692c7e27e72a88314ec7aeff60",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// <https://www.prisma.io/docs/orm/reference/prisma-schema-reference>\n// <https://www.postgresql.org/docs/current/datatype.html>\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\ngenerator client {\n  provider      = \"prisma-client-js\"\n  binaryTargets = [\"native\", \"debian-openssl-3.0.x\"]\n  output        = \"../src/generated/prisma-client\"\n}\n\n// generator joi {\n//   provider = \"prisma-joi-generator\"\n//   output   = \"../src/generated/joi\"\n// }\n\nenum Visibility {\n  PUBLIC\n  PRIVATE\n}\n\n// TODO:  @frontend:  Implement avatar image defaults\n// If null, check the default '/public/images/default-avatar.png' in the frontend\nmodel User {\n  id              Int      @default(autoincrement())\n  username        String   @unique @db.VarChar(100)\n  email           String   @unique @db.VarChar(100)\n  password        String   @db.VarChar(255)\n  avatarUrl       String?  @map(\"avatar_url\") @db.VarChar(255)\n  experienceLevel Int      @default(0) @map(\"rank\")\n  updatedAt       DateTime @updatedAt @map(\"updated_at\") @db.Timestamp()\n  createdAt       DateTime @default(now()) @map(\"created_at\") @db.Timestamp()\n\n  travelPlans           TravelPlan[]\n  bookmarkedTravelPlans TravelPlanBookmark[]\n  likedTravelPlans      TravelPlanLike[]\n\n  @@id([id])\n  @@map(\"users\")\n}\n\nmodel TravelPlan {\n  id         Int        @default(autoincrement())\n  user       User       @relation(fields: [authorId], references: [id])\n  authorId   Int        @map(\"author_id\")\n  title      String     @db.VarChar(100)\n  cityTitle  String     @map(\"city_title\") @db.Text\n  notes      String     @db.Text\n  startDate  DateTime   @map(\"start_date\") @db.Date\n  endDate    DateTime   @map(\"end_date\") @db.Date\n  visibility Visibility @default(PRIVATE)\n  updatedAt  DateTime   @updatedAt @map(\"updated_at\") @db.Timestamp()\n  createdAt  DateTime   @default(now()) @map(\"created_at\") @db.Timestamp()\n\n  journal           TravelPlanJournal?\n  destinations      TravelPlanDestination[]\n  bookmarkedByUsers TravelPlanBookmark[]\n  likedByUsers      TravelPlanLike[]\n\n  @@id([id])\n  @@map(\"travel_plans\")\n}\n\n// TODO:  @backend: Implement the validation logic on inserting 'rating' to CHECK (rating BETWEEN 0 AND 10)\n// <https://www.prisma.io/docs/orm/more/help-and-troubleshooting/check-constraints>\nmodel TravelPlanJournal {\n  id           Int        @default(autoincrement())\n  travelPlan   TravelPlan @relation(fields: [travelPlanId], references: [id])\n  travelPlanId Int        @unique @map(\"travel_plan_id\")\n  notes        String     @db.Text\n  futureTip    String     @map(\"future_tip\") @db.Text\n  favNotes     String     @map(\"fav_notes\") @db.Text\n  rating       Int\n  updatedAt    DateTime   @updatedAt @map(\"updated_at\") @db.Timestamp()\n  createdAt    DateTime   @default(now()) @map(\"created_at\") @db.Timestamp()\n\n  @@id([id])\n  @@map(\"travel_plan_journals\")\n}\n\nmodel TravelPlanDestination {\n  id              Int        @default(autoincrement())\n  travelPlan      TravelPlan @relation(fields: [travelPlanId], references: [id])\n  travelPlanId    Int        @map(\"travel_plan_id\")\n  title           String     @db.VarChar(255)\n  latitude        Float      @db.DoublePrecision\n  longitude       Float      @db.DoublePrecision\n  photoUrl        String?    @map(\"photo_url\") @db.Text\n  googlePlaceId   String     @map(\"google_place_id\") @db.VarChar(255)\n  startDate       DateTime   @map(\"start_date\") @db.Date\n  dailyVisitOrder Int        @map(\"daily_visit_order\")\n  updatedAt       DateTime   @updatedAt @map(\"updated_at\") @db.Timestamp()\n  createdAt       DateTime   @default(now()) @map(\"created_at\") @db.Timestamp()\n\n  attachments TravelPlanDestinationAttachment[]\n\n  @@id([id])\n  @@map(\"travel_plan_destinations\")\n}\n\nmodel TravelPlanDestinationAttachment {\n  travelPlanDestination   TravelPlanDestination @relation(fields: [travelPlanDestinationId], references: [id])\n  travelPlanDestinationId Int                   @map(\"travel_plan_destination_id\")\n  url                     String                @db.VarChar(255)\n  order                   Int\n  updatedAt               DateTime              @updatedAt @map(\"updated_at\") @db.Timestamp()\n  createdAt               DateTime              @default(now()) @map(\"created_at\") @db.Timestamp()\n\n  @@id([travelPlanDestinationId])\n  @@map(\"travel_plan_destination_attachments\")\n}\n\nmodel TravelPlanBookmark {\n  travelPlan   TravelPlan @relation(fields: [travelPlanId], references: [id])\n  travelPlanId Int        @map(\"travel_plan_id\")\n  user         User       @relation(fields: [userId], references: [id])\n  userId       Int        @map(\"user_id\")\n\n  @@id([travelPlanId, userId])\n  @@map(\"travel_plan_bookmarks\")\n}\n\nmodel TravelPlanLike {\n  travelPlan   TravelPlan @relation(fields: [travelPlanId], references: [id])\n  travelPlanId Int        @map(\"travel_plan_id\")\n  user         User       @relation(fields: [userId], references: [id])\n  userId       Int        @map(\"user_id\")\n\n  @@id([travelPlanId, userId])\n  @@map(\"travel_plan_likes\")\n}\n",
  "inlineSchemaHash": "009d9f158975e915d958e67c2b26dab8b8169ab92801fbe8abf87b0fefc8c7b9",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src/generated/prisma-client",
    "generated/prisma-client",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":\"users\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avatarUrl\",\"dbName\":\"avatar_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"experienceLevel\",\"dbName\":\"rank\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"travelPlans\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TravelPlan\",\"nativeType\":null,\"relationName\":\"TravelPlanToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bookmarkedTravelPlans\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TravelPlanBookmark\",\"nativeType\":null,\"relationName\":\"TravelPlanBookmarkToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"likedTravelPlans\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TravelPlanLike\",\"nativeType\":null,\"relationName\":\"TravelPlanLikeToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TravelPlan\":{\"dbName\":\"travel_plans\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"TravelPlanToUser\",\"relationFromFields\":[\"authorId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorId\",\"dbName\":\"author_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cityTitle\",\"dbName\":\"city_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startDate\",\"dbName\":\"start_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endDate\",\"dbName\":\"end_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"visibility\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Visibility\",\"nativeType\":null,\"default\":\"PRIVATE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"journal\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TravelPlanJournal\",\"nativeType\":null,\"relationName\":\"TravelPlanToTravelPlanJournal\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destinations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TravelPlanDestination\",\"nativeType\":null,\"relationName\":\"TravelPlanToTravelPlanDestination\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bookmarkedByUsers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TravelPlanBookmark\",\"nativeType\":null,\"relationName\":\"TravelPlanToTravelPlanBookmark\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"likedByUsers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TravelPlanLike\",\"nativeType\":null,\"relationName\":\"TravelPlanToTravelPlanLike\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TravelPlanJournal\":{\"dbName\":\"travel_plan_journals\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"travelPlan\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TravelPlan\",\"nativeType\":null,\"relationName\":\"TravelPlanToTravelPlanJournal\",\"relationFromFields\":[\"travelPlanId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"travelPlanId\",\"dbName\":\"travel_plan_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"futureTip\",\"dbName\":\"future_tip\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"favNotes\",\"dbName\":\"fav_notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rating\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TravelPlanDestination\":{\"dbName\":\"travel_plan_destinations\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"travelPlan\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TravelPlan\",\"nativeType\":null,\"relationName\":\"TravelPlanToTravelPlanDestination\",\"relationFromFields\":[\"travelPlanId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"travelPlanId\",\"dbName\":\"travel_plan_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"latitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"DoublePrecision\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"longitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"DoublePrecision\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"photoUrl\",\"dbName\":\"photo_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"googlePlaceId\",\"dbName\":\"google_place_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startDate\",\"dbName\":\"start_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dailyVisitOrder\",\"dbName\":\"daily_visit_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attachments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TravelPlanDestinationAttachment\",\"nativeType\":null,\"relationName\":\"TravelPlanDestinationToTravelPlanDestinationAttachment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TravelPlanDestinationAttachment\":{\"dbName\":\"travel_plan_destination_attachments\",\"schema\":null,\"fields\":[{\"name\":\"travelPlanDestination\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TravelPlanDestination\",\"nativeType\":null,\"relationName\":\"TravelPlanDestinationToTravelPlanDestinationAttachment\",\"relationFromFields\":[\"travelPlanDestinationId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"travelPlanDestinationId\",\"dbName\":\"travel_plan_destination_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"travelPlanDestinationId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TravelPlanBookmark\":{\"dbName\":\"travel_plan_bookmarks\",\"schema\":null,\"fields\":[{\"name\":\"travelPlan\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TravelPlan\",\"nativeType\":null,\"relationName\":\"TravelPlanToTravelPlanBookmark\",\"relationFromFields\":[\"travelPlanId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"travelPlanId\",\"dbName\":\"travel_plan_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"TravelPlanBookmarkToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"travelPlanId\",\"userId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TravelPlanLike\":{\"dbName\":\"travel_plan_likes\",\"schema\":null,\"fields\":[{\"name\":\"travelPlan\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TravelPlan\",\"nativeType\":null,\"relationName\":\"TravelPlanToTravelPlanLike\",\"relationFromFields\":[\"travelPlanId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"travelPlanId\",\"dbName\":\"travel_plan_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"TravelPlanLikeToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"travelPlanId\",\"userId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"Visibility\":{\"values\":[{\"name\":\"PUBLIC\",\"dbName\":null},{\"name\":\"PRIVATE\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "src/generated/prisma-client/query_engine-windows.dll.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-3.0.x.so.node");
path.join(process.cwd(), "src/generated/prisma-client/libquery_engine-debian-openssl-3.0.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/generated/prisma-client/schema.prisma")

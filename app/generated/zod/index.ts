import { z } from 'zod';
import type { Prisma } from '../prisma';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const ProjectScalarFieldEnumSchema = z.enum(['id','name','description','status','ideation_date','last_updated_date','llm_summary','llm_sentiment_phrase','created_at']);

export const ArtifactScalarFieldEnumSchema = z.enum(['id','title','publish_date','content_path','type','created_at']);

export const TagScalarFieldEnumSchema = z.enum(['id','name','created_at']);

export const ReactionScalarFieldEnumSchema = z.enum(['id','emoji','review_text','created_at','user_id','project_id','artifact_id']);

export const ProjectArtifactScalarFieldEnumSchema = z.enum(['project_id','artifact_id','created_at']);

export const ArtifactTagScalarFieldEnumSchema = z.enum(['artifact_id','tag_id','created_at']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','role','password_hash','emailVerified','image','created_at']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const ProjectStatusSchema = z.enum(['Ideation','InProgress','Shipped','Archived','Abandoned']);

export type ProjectStatusType = `${z.infer<typeof ProjectStatusSchema>}`

export const ArtifactTypeSchema = z.enum(['DevLog','BlogPost','Link','Image']);

export type ArtifactTypeType = `${z.infer<typeof ArtifactTypeSchema>}`

export const UserRoleSchema = z.enum(['Admin','User']);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  status: ProjectStatusSchema,
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  ideation_date: z.coerce.date(),
  last_updated_date: z.coerce.date(),
  llm_summary: z.string().nullable(),
  llm_sentiment_phrase: z.string().nullable(),
  created_at: z.coerce.date(),
})

export type Project = z.infer<typeof ProjectSchema>

/////////////////////////////////////////
// ARTIFACT SCHEMA
/////////////////////////////////////////

export const ArtifactSchema = z.object({
  type: ArtifactTypeSchema,
  id: z.string().cuid(),
  title: z.string(),
  publish_date: z.coerce.date(),
  content_path: z.string(),
  created_at: z.coerce.date(),
})

export type Artifact = z.infer<typeof ArtifactSchema>

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  created_at: z.coerce.date(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// REACTION SCHEMA
/////////////////////////////////////////

export const ReactionSchema = z.object({
  id: z.string().cuid(),
  emoji: z.string(),
  review_text: z.string().nullable(),
  created_at: z.coerce.date(),
  user_id: z.string().nullable(),
  project_id: z.string().nullable(),
  artifact_id: z.string().nullable(),
})

export type Reaction = z.infer<typeof ReactionSchema>

/////////////////////////////////////////
// PROJECT ARTIFACT SCHEMA
/////////////////////////////////////////

export const ProjectArtifactSchema = z.object({
  project_id: z.string(),
  artifact_id: z.string(),
  created_at: z.coerce.date(),
})

export type ProjectArtifact = z.infer<typeof ProjectArtifactSchema>

/////////////////////////////////////////
// ARTIFACT TAG SCHEMA
/////////////////////////////////////////

export const ArtifactTagSchema = z.object({
  artifact_id: z.string(),
  tag_id: z.string(),
  created_at: z.coerce.date(),
})

export type ArtifactTag = z.infer<typeof ArtifactTagSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: UserRoleSchema,
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string(),
  password_hash: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  created_at: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PROJECT
//------------------------------------------------------

export const ProjectIncludeSchema: z.ZodType<Prisma.ProjectInclude> = z.object({
  artifacts: z.union([z.boolean(),z.lazy(() => ProjectArtifactFindManyArgsSchema)]).optional(),
  reactions: z.union([z.boolean(),z.lazy(() => ReactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProjectArgsSchema: z.ZodType<Prisma.ProjectDefaultArgs> = z.object({
  select: z.lazy(() => ProjectSelectSchema).optional(),
  include: z.lazy(() => ProjectIncludeSchema).optional(),
}).strict();

export const ProjectCountOutputTypeArgsSchema: z.ZodType<Prisma.ProjectCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProjectCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProjectCountOutputTypeSelectSchema: z.ZodType<Prisma.ProjectCountOutputTypeSelect> = z.object({
  artifacts: z.boolean().optional(),
  reactions: z.boolean().optional(),
}).strict();

export const ProjectSelectSchema: z.ZodType<Prisma.ProjectSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  ideation_date: z.boolean().optional(),
  last_updated_date: z.boolean().optional(),
  llm_summary: z.boolean().optional(),
  llm_sentiment_phrase: z.boolean().optional(),
  created_at: z.boolean().optional(),
  artifacts: z.union([z.boolean(),z.lazy(() => ProjectArtifactFindManyArgsSchema)]).optional(),
  reactions: z.union([z.boolean(),z.lazy(() => ReactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ARTIFACT
//------------------------------------------------------

export const ArtifactIncludeSchema: z.ZodType<Prisma.ArtifactInclude> = z.object({
  projects: z.union([z.boolean(),z.lazy(() => ProjectArtifactFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => ArtifactTagFindManyArgsSchema)]).optional(),
  reactions: z.union([z.boolean(),z.lazy(() => ReactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ArtifactCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ArtifactArgsSchema: z.ZodType<Prisma.ArtifactDefaultArgs> = z.object({
  select: z.lazy(() => ArtifactSelectSchema).optional(),
  include: z.lazy(() => ArtifactIncludeSchema).optional(),
}).strict();

export const ArtifactCountOutputTypeArgsSchema: z.ZodType<Prisma.ArtifactCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ArtifactCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ArtifactCountOutputTypeSelectSchema: z.ZodType<Prisma.ArtifactCountOutputTypeSelect> = z.object({
  projects: z.boolean().optional(),
  tags: z.boolean().optional(),
  reactions: z.boolean().optional(),
}).strict();

export const ArtifactSelectSchema: z.ZodType<Prisma.ArtifactSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  publish_date: z.boolean().optional(),
  content_path: z.boolean().optional(),
  type: z.boolean().optional(),
  created_at: z.boolean().optional(),
  projects: z.union([z.boolean(),z.lazy(() => ProjectArtifactFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => ArtifactTagFindManyArgsSchema)]).optional(),
  reactions: z.union([z.boolean(),z.lazy(() => ReactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ArtifactCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  artifacts: z.union([z.boolean(),z.lazy(() => ArtifactTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z.object({
  select: z.lazy(() => TagSelectSchema).optional(),
  include: z.lazy(() => TagIncludeSchema).optional(),
}).strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  artifacts: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  created_at: z.boolean().optional(),
  artifacts: z.union([z.boolean(),z.lazy(() => ArtifactTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REACTION
//------------------------------------------------------

export const ReactionIncludeSchema: z.ZodType<Prisma.ReactionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  artifact: z.union([z.boolean(),z.lazy(() => ArtifactArgsSchema)]).optional(),
}).strict()

export const ReactionArgsSchema: z.ZodType<Prisma.ReactionDefaultArgs> = z.object({
  select: z.lazy(() => ReactionSelectSchema).optional(),
  include: z.lazy(() => ReactionIncludeSchema).optional(),
}).strict();

export const ReactionSelectSchema: z.ZodType<Prisma.ReactionSelect> = z.object({
  id: z.boolean().optional(),
  emoji: z.boolean().optional(),
  review_text: z.boolean().optional(),
  created_at: z.boolean().optional(),
  user_id: z.boolean().optional(),
  project_id: z.boolean().optional(),
  artifact_id: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  artifact: z.union([z.boolean(),z.lazy(() => ArtifactArgsSchema)]).optional(),
}).strict()

// PROJECT ARTIFACT
//------------------------------------------------------

export const ProjectArtifactIncludeSchema: z.ZodType<Prisma.ProjectArtifactInclude> = z.object({
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  artifact: z.union([z.boolean(),z.lazy(() => ArtifactArgsSchema)]).optional(),
}).strict()

export const ProjectArtifactArgsSchema: z.ZodType<Prisma.ProjectArtifactDefaultArgs> = z.object({
  select: z.lazy(() => ProjectArtifactSelectSchema).optional(),
  include: z.lazy(() => ProjectArtifactIncludeSchema).optional(),
}).strict();

export const ProjectArtifactSelectSchema: z.ZodType<Prisma.ProjectArtifactSelect> = z.object({
  project_id: z.boolean().optional(),
  artifact_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  artifact: z.union([z.boolean(),z.lazy(() => ArtifactArgsSchema)]).optional(),
}).strict()

// ARTIFACT TAG
//------------------------------------------------------

export const ArtifactTagIncludeSchema: z.ZodType<Prisma.ArtifactTagInclude> = z.object({
  artifact: z.union([z.boolean(),z.lazy(() => ArtifactArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
}).strict()

export const ArtifactTagArgsSchema: z.ZodType<Prisma.ArtifactTagDefaultArgs> = z.object({
  select: z.lazy(() => ArtifactTagSelectSchema).optional(),
  include: z.lazy(() => ArtifactTagIncludeSchema).optional(),
}).strict();

export const ArtifactTagSelectSchema: z.ZodType<Prisma.ArtifactTagSelect> = z.object({
  artifact_id: z.boolean().optional(),
  tag_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  artifact: z.union([z.boolean(),z.lazy(() => ArtifactArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  reactions: z.union([z.boolean(),z.lazy(() => ReactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  reactions: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  role: z.boolean().optional(),
  password_hash: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  created_at: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  reactions: z.union([z.boolean(),z.lazy(() => ReactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ProjectWhereInputSchema: z.ZodType<Prisma.ProjectWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumProjectStatusFilterSchema),z.lazy(() => ProjectStatusSchema) ]).optional(),
  ideation_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  last_updated_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  llm_summary: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  llm_sentiment_phrase: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  artifacts: z.lazy(() => ProjectArtifactListRelationFilterSchema).optional(),
  reactions: z.lazy(() => ReactionListRelationFilterSchema).optional()
}).strict();

export const ProjectOrderByWithRelationInputSchema: z.ZodType<Prisma.ProjectOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  ideation_date: z.lazy(() => SortOrderSchema).optional(),
  last_updated_date: z.lazy(() => SortOrderSchema).optional(),
  llm_summary: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  llm_sentiment_phrase: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  artifacts: z.lazy(() => ProjectArtifactOrderByRelationAggregateInputSchema).optional(),
  reactions: z.lazy(() => ReactionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProjectWhereUniqueInputSchema: z.ZodType<Prisma.ProjectWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumProjectStatusFilterSchema),z.lazy(() => ProjectStatusSchema) ]).optional(),
  ideation_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  last_updated_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  llm_summary: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  llm_sentiment_phrase: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  artifacts: z.lazy(() => ProjectArtifactListRelationFilterSchema).optional(),
  reactions: z.lazy(() => ReactionListRelationFilterSchema).optional()
}).strict());

export const ProjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  ideation_date: z.lazy(() => SortOrderSchema).optional(),
  last_updated_date: z.lazy(() => SortOrderSchema).optional(),
  llm_summary: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  llm_sentiment_phrase: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProjectCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProjectMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProjectMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumProjectStatusWithAggregatesFilterSchema),z.lazy(() => ProjectStatusSchema) ]).optional(),
  ideation_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  last_updated_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  llm_summary: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  llm_sentiment_phrase: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ArtifactWhereInputSchema: z.ZodType<Prisma.ArtifactWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ArtifactWhereInputSchema),z.lazy(() => ArtifactWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArtifactWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArtifactWhereInputSchema),z.lazy(() => ArtifactWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publish_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  content_path: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumArtifactTypeFilterSchema),z.lazy(() => ArtifactTypeSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projects: z.lazy(() => ProjectArtifactListRelationFilterSchema).optional(),
  tags: z.lazy(() => ArtifactTagListRelationFilterSchema).optional(),
  reactions: z.lazy(() => ReactionListRelationFilterSchema).optional()
}).strict();

export const ArtifactOrderByWithRelationInputSchema: z.ZodType<Prisma.ArtifactOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  publish_date: z.lazy(() => SortOrderSchema).optional(),
  content_path: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  projects: z.lazy(() => ProjectArtifactOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => ArtifactTagOrderByRelationAggregateInputSchema).optional(),
  reactions: z.lazy(() => ReactionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ArtifactWhereUniqueInputSchema: z.ZodType<Prisma.ArtifactWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ArtifactWhereInputSchema),z.lazy(() => ArtifactWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArtifactWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArtifactWhereInputSchema),z.lazy(() => ArtifactWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publish_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  content_path: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumArtifactTypeFilterSchema),z.lazy(() => ArtifactTypeSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projects: z.lazy(() => ProjectArtifactListRelationFilterSchema).optional(),
  tags: z.lazy(() => ArtifactTagListRelationFilterSchema).optional(),
  reactions: z.lazy(() => ReactionListRelationFilterSchema).optional()
}).strict());

export const ArtifactOrderByWithAggregationInputSchema: z.ZodType<Prisma.ArtifactOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  publish_date: z.lazy(() => SortOrderSchema).optional(),
  content_path: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ArtifactCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ArtifactMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ArtifactMinOrderByAggregateInputSchema).optional()
}).strict();

export const ArtifactScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ArtifactScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ArtifactScalarWhereWithAggregatesInputSchema),z.lazy(() => ArtifactScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArtifactScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArtifactScalarWhereWithAggregatesInputSchema),z.lazy(() => ArtifactScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  publish_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  content_path: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumArtifactTypeWithAggregatesFilterSchema),z.lazy(() => ArtifactTypeSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  artifacts: z.lazy(() => ArtifactTagListRelationFilterSchema).optional()
}).strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  artifacts: z.lazy(() => ArtifactTagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  artifacts: z.lazy(() => ArtifactTagListRelationFilterSchema).optional()
}).strict());

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional()
}).strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReactionWhereInputSchema: z.ZodType<Prisma.ReactionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReactionWhereInputSchema),z.lazy(() => ReactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReactionWhereInputSchema),z.lazy(() => ReactionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emoji: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  review_text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  project_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  artifact_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  project: z.union([ z.lazy(() => ProjectNullableScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional().nullable(),
  artifact: z.union([ z.lazy(() => ArtifactNullableScalarRelationFilterSchema),z.lazy(() => ArtifactWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ReactionOrderByWithRelationInputSchema: z.ZodType<Prisma.ReactionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  emoji: z.lazy(() => SortOrderSchema).optional(),
  review_text: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  project_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  artifact_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
  artifact: z.lazy(() => ArtifactOrderByWithRelationInputSchema).optional()
}).strict();

export const ReactionWhereUniqueInputSchema: z.ZodType<Prisma.ReactionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ReactionWhereInputSchema),z.lazy(() => ReactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReactionWhereInputSchema),z.lazy(() => ReactionWhereInputSchema).array() ]).optional(),
  emoji: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  review_text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  project_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  artifact_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  project: z.union([ z.lazy(() => ProjectNullableScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional().nullable(),
  artifact: z.union([ z.lazy(() => ArtifactNullableScalarRelationFilterSchema),z.lazy(() => ArtifactWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ReactionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReactionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  emoji: z.lazy(() => SortOrderSchema).optional(),
  review_text: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  project_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  artifact_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ReactionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReactionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReactionMinOrderByAggregateInputSchema).optional()
}).strict();

export const ReactionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReactionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReactionScalarWhereWithAggregatesInputSchema),z.lazy(() => ReactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReactionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReactionScalarWhereWithAggregatesInputSchema),z.lazy(() => ReactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emoji: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  review_text: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  project_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  artifact_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ProjectArtifactWhereInputSchema: z.ZodType<Prisma.ProjectArtifactWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectArtifactWhereInputSchema),z.lazy(() => ProjectArtifactWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectArtifactWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectArtifactWhereInputSchema),z.lazy(() => ProjectArtifactWhereInputSchema).array() ]).optional(),
  project_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  artifact_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  artifact: z.union([ z.lazy(() => ArtifactScalarRelationFilterSchema),z.lazy(() => ArtifactWhereInputSchema) ]).optional(),
}).strict();

export const ProjectArtifactOrderByWithRelationInputSchema: z.ZodType<Prisma.ProjectArtifactOrderByWithRelationInput> = z.object({
  project_id: z.lazy(() => SortOrderSchema).optional(),
  artifact_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
  artifact: z.lazy(() => ArtifactOrderByWithRelationInputSchema).optional()
}).strict();

export const ProjectArtifactWhereUniqueInputSchema: z.ZodType<Prisma.ProjectArtifactWhereUniqueInput> = z.object({
  project_id_artifact_id: z.lazy(() => ProjectArtifactProject_idArtifact_idCompoundUniqueInputSchema)
})
.and(z.object({
  project_id_artifact_id: z.lazy(() => ProjectArtifactProject_idArtifact_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ProjectArtifactWhereInputSchema),z.lazy(() => ProjectArtifactWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectArtifactWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectArtifactWhereInputSchema),z.lazy(() => ProjectArtifactWhereInputSchema).array() ]).optional(),
  project_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  artifact_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  artifact: z.union([ z.lazy(() => ArtifactScalarRelationFilterSchema),z.lazy(() => ArtifactWhereInputSchema) ]).optional(),
}).strict());

export const ProjectArtifactOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectArtifactOrderByWithAggregationInput> = z.object({
  project_id: z.lazy(() => SortOrderSchema).optional(),
  artifact_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProjectArtifactCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProjectArtifactMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProjectArtifactMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProjectArtifactScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectArtifactScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectArtifactScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectArtifactScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectArtifactScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectArtifactScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectArtifactScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  project_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  artifact_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ArtifactTagWhereInputSchema: z.ZodType<Prisma.ArtifactTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ArtifactTagWhereInputSchema),z.lazy(() => ArtifactTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArtifactTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArtifactTagWhereInputSchema),z.lazy(() => ArtifactTagWhereInputSchema).array() ]).optional(),
  artifact_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  artifact: z.union([ z.lazy(() => ArtifactScalarRelationFilterSchema),z.lazy(() => ArtifactWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
}).strict();

export const ArtifactTagOrderByWithRelationInputSchema: z.ZodType<Prisma.ArtifactTagOrderByWithRelationInput> = z.object({
  artifact_id: z.lazy(() => SortOrderSchema).optional(),
  tag_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  artifact: z.lazy(() => ArtifactOrderByWithRelationInputSchema).optional(),
  tag: z.lazy(() => TagOrderByWithRelationInputSchema).optional()
}).strict();

export const ArtifactTagWhereUniqueInputSchema: z.ZodType<Prisma.ArtifactTagWhereUniqueInput> = z.object({
  artifact_id_tag_id: z.lazy(() => ArtifactTagArtifact_idTag_idCompoundUniqueInputSchema)
})
.and(z.object({
  artifact_id_tag_id: z.lazy(() => ArtifactTagArtifact_idTag_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ArtifactTagWhereInputSchema),z.lazy(() => ArtifactTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArtifactTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArtifactTagWhereInputSchema),z.lazy(() => ArtifactTagWhereInputSchema).array() ]).optional(),
  artifact_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  artifact: z.union([ z.lazy(() => ArtifactScalarRelationFilterSchema),z.lazy(() => ArtifactWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
}).strict());

export const ArtifactTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.ArtifactTagOrderByWithAggregationInput> = z.object({
  artifact_id: z.lazy(() => SortOrderSchema).optional(),
  tag_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ArtifactTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ArtifactTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ArtifactTagMinOrderByAggregateInputSchema).optional()
}).strict();

export const ArtifactTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ArtifactTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ArtifactTagScalarWhereWithAggregatesInputSchema),z.lazy(() => ArtifactTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArtifactTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArtifactTagScalarWhereWithAggregatesInputSchema),z.lazy(() => ArtifactTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  artifact_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tag_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumUserRoleFilterSchema),z.lazy(() => UserRoleSchema) ]).optional(),
  password_hash: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  reactions: z.lazy(() => ReactionListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  password_hash: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  reactions: z.lazy(() => ReactionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumUserRoleFilterSchema),z.lazy(() => UserRoleSchema) ]).optional(),
  password_hash: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  reactions: z.lazy(() => ReactionListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  password_hash: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumUserRoleWithAggregatesFilterSchema),z.lazy(() => UserRoleSchema) ]).optional(),
  password_hash: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    sessionToken: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProjectCreateInputSchema: z.ZodType<Prisma.ProjectCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  status: z.lazy(() => ProjectStatusSchema),
  ideation_date: z.coerce.date(),
  last_updated_date: z.coerce.date().optional(),
  llm_summary: z.string().optional().nullable(),
  llm_sentiment_phrase: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  artifacts: z.lazy(() => ProjectArtifactCreateNestedManyWithoutProjectInputSchema).optional(),
  reactions: z.lazy(() => ReactionCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  status: z.lazy(() => ProjectStatusSchema),
  ideation_date: z.coerce.date(),
  last_updated_date: z.coerce.date().optional(),
  llm_summary: z.string().optional().nullable(),
  llm_sentiment_phrase: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  artifacts: z.lazy(() => ProjectArtifactUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUpdateInputSchema: z.ZodType<Prisma.ProjectUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => EnumProjectStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ideation_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_updated_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  llm_summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  llm_sentiment_phrase: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  artifacts: z.lazy(() => ProjectArtifactUpdateManyWithoutProjectNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => EnumProjectStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ideation_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_updated_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  llm_summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  llm_sentiment_phrase: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  artifacts: z.lazy(() => ProjectArtifactUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateManyInputSchema: z.ZodType<Prisma.ProjectCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  status: z.lazy(() => ProjectStatusSchema),
  ideation_date: z.coerce.date(),
  last_updated_date: z.coerce.date().optional(),
  llm_summary: z.string().optional().nullable(),
  llm_sentiment_phrase: z.string().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const ProjectUpdateManyMutationInputSchema: z.ZodType<Prisma.ProjectUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => EnumProjectStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ideation_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_updated_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  llm_summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  llm_sentiment_phrase: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => EnumProjectStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ideation_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_updated_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  llm_summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  llm_sentiment_phrase: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArtifactCreateInputSchema: z.ZodType<Prisma.ArtifactCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  publish_date: z.coerce.date(),
  content_path: z.string(),
  type: z.lazy(() => ArtifactTypeSchema),
  created_at: z.coerce.date().optional(),
  projects: z.lazy(() => ProjectArtifactCreateNestedManyWithoutArtifactInputSchema).optional(),
  tags: z.lazy(() => ArtifactTagCreateNestedManyWithoutArtifactInputSchema).optional(),
  reactions: z.lazy(() => ReactionCreateNestedManyWithoutArtifactInputSchema).optional()
}).strict();

export const ArtifactUncheckedCreateInputSchema: z.ZodType<Prisma.ArtifactUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  publish_date: z.coerce.date(),
  content_path: z.string(),
  type: z.lazy(() => ArtifactTypeSchema),
  created_at: z.coerce.date().optional(),
  projects: z.lazy(() => ProjectArtifactUncheckedCreateNestedManyWithoutArtifactInputSchema).optional(),
  tags: z.lazy(() => ArtifactTagUncheckedCreateNestedManyWithoutArtifactInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutArtifactInputSchema).optional()
}).strict();

export const ArtifactUpdateInputSchema: z.ZodType<Prisma.ArtifactUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publish_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => EnumArtifactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => ProjectArtifactUpdateManyWithoutArtifactNestedInputSchema).optional(),
  tags: z.lazy(() => ArtifactTagUpdateManyWithoutArtifactNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUpdateManyWithoutArtifactNestedInputSchema).optional()
}).strict();

export const ArtifactUncheckedUpdateInputSchema: z.ZodType<Prisma.ArtifactUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publish_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => EnumArtifactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => ProjectArtifactUncheckedUpdateManyWithoutArtifactNestedInputSchema).optional(),
  tags: z.lazy(() => ArtifactTagUncheckedUpdateManyWithoutArtifactNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedUpdateManyWithoutArtifactNestedInputSchema).optional()
}).strict();

export const ArtifactCreateManyInputSchema: z.ZodType<Prisma.ArtifactCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  publish_date: z.coerce.date(),
  content_path: z.string(),
  type: z.lazy(() => ArtifactTypeSchema),
  created_at: z.coerce.date().optional()
}).strict();

export const ArtifactUpdateManyMutationInputSchema: z.ZodType<Prisma.ArtifactUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publish_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => EnumArtifactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArtifactUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ArtifactUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publish_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => EnumArtifactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  artifacts: z.lazy(() => ArtifactTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  artifacts: z.lazy(() => ArtifactTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  artifacts: z.lazy(() => ArtifactTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  artifacts: z.lazy(() => ArtifactTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReactionCreateInputSchema: z.ZodType<Prisma.ReactionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  emoji: z.string(),
  review_text: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReactionsInputSchema).optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutReactionsInputSchema).optional(),
  artifact: z.lazy(() => ArtifactCreateNestedOneWithoutReactionsInputSchema).optional()
}).strict();

export const ReactionUncheckedCreateInputSchema: z.ZodType<Prisma.ReactionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  emoji: z.string(),
  review_text: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  user_id: z.string().optional().nullable(),
  project_id: z.string().optional().nullable(),
  artifact_id: z.string().optional().nullable()
}).strict();

export const ReactionUpdateInputSchema: z.ZodType<Prisma.ReactionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emoji: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  review_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutReactionsNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneWithoutReactionsNestedInputSchema).optional(),
  artifact: z.lazy(() => ArtifactUpdateOneWithoutReactionsNestedInputSchema).optional()
}).strict();

export const ReactionUncheckedUpdateInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emoji: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  review_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  project_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  artifact_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReactionCreateManyInputSchema: z.ZodType<Prisma.ReactionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  emoji: z.string(),
  review_text: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  user_id: z.string().optional().nullable(),
  project_id: z.string().optional().nullable(),
  artifact_id: z.string().optional().nullable()
}).strict();

export const ReactionUpdateManyMutationInputSchema: z.ZodType<Prisma.ReactionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emoji: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  review_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReactionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emoji: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  review_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  project_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  artifact_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectArtifactCreateInputSchema: z.ZodType<Prisma.ProjectArtifactCreateInput> = z.object({
  created_at: z.coerce.date().optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutArtifactsInputSchema),
  artifact: z.lazy(() => ArtifactCreateNestedOneWithoutProjectsInputSchema)
}).strict();

export const ProjectArtifactUncheckedCreateInputSchema: z.ZodType<Prisma.ProjectArtifactUncheckedCreateInput> = z.object({
  project_id: z.string(),
  artifact_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const ProjectArtifactUpdateInputSchema: z.ZodType<Prisma.ProjectArtifactUpdateInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutArtifactsNestedInputSchema).optional(),
  artifact: z.lazy(() => ArtifactUpdateOneRequiredWithoutProjectsNestedInputSchema).optional()
}).strict();

export const ProjectArtifactUncheckedUpdateInputSchema: z.ZodType<Prisma.ProjectArtifactUncheckedUpdateInput> = z.object({
  project_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  artifact_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectArtifactCreateManyInputSchema: z.ZodType<Prisma.ProjectArtifactCreateManyInput> = z.object({
  project_id: z.string(),
  artifact_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const ProjectArtifactUpdateManyMutationInputSchema: z.ZodType<Prisma.ProjectArtifactUpdateManyMutationInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectArtifactUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProjectArtifactUncheckedUpdateManyInput> = z.object({
  project_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  artifact_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArtifactTagCreateInputSchema: z.ZodType<Prisma.ArtifactTagCreateInput> = z.object({
  created_at: z.coerce.date().optional(),
  artifact: z.lazy(() => ArtifactCreateNestedOneWithoutTagsInputSchema),
  tag: z.lazy(() => TagCreateNestedOneWithoutArtifactsInputSchema)
}).strict();

export const ArtifactTagUncheckedCreateInputSchema: z.ZodType<Prisma.ArtifactTagUncheckedCreateInput> = z.object({
  artifact_id: z.string(),
  tag_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const ArtifactTagUpdateInputSchema: z.ZodType<Prisma.ArtifactTagUpdateInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  artifact: z.lazy(() => ArtifactUpdateOneRequiredWithoutTagsNestedInputSchema).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutArtifactsNestedInputSchema).optional()
}).strict();

export const ArtifactTagUncheckedUpdateInputSchema: z.ZodType<Prisma.ArtifactTagUncheckedUpdateInput> = z.object({
  artifact_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArtifactTagCreateManyInputSchema: z.ZodType<Prisma.ArtifactTagCreateManyInput> = z.object({
  artifact_id: z.string(),
  tag_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const ArtifactTagUpdateManyMutationInputSchema: z.ZodType<Prisma.ArtifactTagUpdateManyMutationInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArtifactTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ArtifactTagUncheckedUpdateManyInput> = z.object({
  artifact_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  password_hash: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  reactions: z.lazy(() => ReactionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  password_hash: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  password_hash: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const EnumProjectStatusFilterSchema: z.ZodType<Prisma.EnumProjectStatusFilter> = z.object({
  equals: z.lazy(() => ProjectStatusSchema).optional(),
  in: z.lazy(() => ProjectStatusSchema).array().optional(),
  notIn: z.lazy(() => ProjectStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => NestedEnumProjectStatusFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ProjectArtifactListRelationFilterSchema: z.ZodType<Prisma.ProjectArtifactListRelationFilter> = z.object({
  every: z.lazy(() => ProjectArtifactWhereInputSchema).optional(),
  some: z.lazy(() => ProjectArtifactWhereInputSchema).optional(),
  none: z.lazy(() => ProjectArtifactWhereInputSchema).optional()
}).strict();

export const ReactionListRelationFilterSchema: z.ZodType<Prisma.ReactionListRelationFilter> = z.object({
  every: z.lazy(() => ReactionWhereInputSchema).optional(),
  some: z.lazy(() => ReactionWhereInputSchema).optional(),
  none: z.lazy(() => ReactionWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ProjectArtifactOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProjectArtifactOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReactionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReactionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  ideation_date: z.lazy(() => SortOrderSchema).optional(),
  last_updated_date: z.lazy(() => SortOrderSchema).optional(),
  llm_summary: z.lazy(() => SortOrderSchema).optional(),
  llm_sentiment_phrase: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  ideation_date: z.lazy(() => SortOrderSchema).optional(),
  last_updated_date: z.lazy(() => SortOrderSchema).optional(),
  llm_summary: z.lazy(() => SortOrderSchema).optional(),
  llm_sentiment_phrase: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  ideation_date: z.lazy(() => SortOrderSchema).optional(),
  last_updated_date: z.lazy(() => SortOrderSchema).optional(),
  llm_summary: z.lazy(() => SortOrderSchema).optional(),
  llm_sentiment_phrase: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnumProjectStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumProjectStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ProjectStatusSchema).optional(),
  in: z.lazy(() => ProjectStatusSchema).array().optional(),
  notIn: z.lazy(() => ProjectStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => NestedEnumProjectStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumProjectStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumProjectStatusFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumArtifactTypeFilterSchema: z.ZodType<Prisma.EnumArtifactTypeFilter> = z.object({
  equals: z.lazy(() => ArtifactTypeSchema).optional(),
  in: z.lazy(() => ArtifactTypeSchema).array().optional(),
  notIn: z.lazy(() => ArtifactTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => NestedEnumArtifactTypeFilterSchema) ]).optional(),
}).strict();

export const ArtifactTagListRelationFilterSchema: z.ZodType<Prisma.ArtifactTagListRelationFilter> = z.object({
  every: z.lazy(() => ArtifactTagWhereInputSchema).optional(),
  some: z.lazy(() => ArtifactTagWhereInputSchema).optional(),
  none: z.lazy(() => ArtifactTagWhereInputSchema).optional()
}).strict();

export const ArtifactTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ArtifactTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArtifactCountOrderByAggregateInputSchema: z.ZodType<Prisma.ArtifactCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  publish_date: z.lazy(() => SortOrderSchema).optional(),
  content_path: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArtifactMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ArtifactMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  publish_date: z.lazy(() => SortOrderSchema).optional(),
  content_path: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArtifactMinOrderByAggregateInputSchema: z.ZodType<Prisma.ArtifactMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  publish_date: z.lazy(() => SortOrderSchema).optional(),
  content_path: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumArtifactTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumArtifactTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ArtifactTypeSchema).optional(),
  in: z.lazy(() => ArtifactTypeSchema).array().optional(),
  notIn: z.lazy(() => ArtifactTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => NestedEnumArtifactTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumArtifactTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumArtifactTypeFilterSchema).optional()
}).strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const ProjectNullableScalarRelationFilterSchema: z.ZodType<Prisma.ProjectNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ProjectWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProjectWhereInputSchema).optional().nullable()
}).strict();

export const ArtifactNullableScalarRelationFilterSchema: z.ZodType<Prisma.ArtifactNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ArtifactWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ArtifactWhereInputSchema).optional().nullable()
}).strict();

export const ReactionCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReactionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  emoji: z.lazy(() => SortOrderSchema).optional(),
  review_text: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  project_id: z.lazy(() => SortOrderSchema).optional(),
  artifact_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReactionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReactionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  emoji: z.lazy(() => SortOrderSchema).optional(),
  review_text: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  project_id: z.lazy(() => SortOrderSchema).optional(),
  artifact_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReactionMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReactionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  emoji: z.lazy(() => SortOrderSchema).optional(),
  review_text: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  project_id: z.lazy(() => SortOrderSchema).optional(),
  artifact_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectScalarRelationFilterSchema: z.ZodType<Prisma.ProjectScalarRelationFilter> = z.object({
  is: z.lazy(() => ProjectWhereInputSchema).optional(),
  isNot: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ArtifactScalarRelationFilterSchema: z.ZodType<Prisma.ArtifactScalarRelationFilter> = z.object({
  is: z.lazy(() => ArtifactWhereInputSchema).optional(),
  isNot: z.lazy(() => ArtifactWhereInputSchema).optional()
}).strict();

export const ProjectArtifactProject_idArtifact_idCompoundUniqueInputSchema: z.ZodType<Prisma.ProjectArtifactProject_idArtifact_idCompoundUniqueInput> = z.object({
  project_id: z.string(),
  artifact_id: z.string()
}).strict();

export const ProjectArtifactCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectArtifactCountOrderByAggregateInput> = z.object({
  project_id: z.lazy(() => SortOrderSchema).optional(),
  artifact_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectArtifactMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectArtifactMaxOrderByAggregateInput> = z.object({
  project_id: z.lazy(() => SortOrderSchema).optional(),
  artifact_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectArtifactMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectArtifactMinOrderByAggregateInput> = z.object({
  project_id: z.lazy(() => SortOrderSchema).optional(),
  artifact_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagScalarRelationFilterSchema: z.ZodType<Prisma.TagScalarRelationFilter> = z.object({
  is: z.lazy(() => TagWhereInputSchema).optional(),
  isNot: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const ArtifactTagArtifact_idTag_idCompoundUniqueInputSchema: z.ZodType<Prisma.ArtifactTagArtifact_idTag_idCompoundUniqueInput> = z.object({
  artifact_id: z.string(),
  tag_id: z.string()
}).strict();

export const ArtifactTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.ArtifactTagCountOrderByAggregateInput> = z.object({
  artifact_id: z.lazy(() => SortOrderSchema).optional(),
  tag_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArtifactTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ArtifactTagMaxOrderByAggregateInput> = z.object({
  artifact_id: z.lazy(() => SortOrderSchema).optional(),
  tag_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArtifactTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.ArtifactTagMinOrderByAggregateInput> = z.object({
  artifact_id: z.lazy(() => SortOrderSchema).optional(),
  tag_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumUserRoleFilterSchema: z.ZodType<Prisma.EnumUserRoleFilter> = z.object({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => NestedEnumUserRoleFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  password_hash: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  password_hash: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  password_hash: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectArtifactCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ProjectArtifactCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ProjectArtifactCreateWithoutProjectInputSchema),z.lazy(() => ProjectArtifactCreateWithoutProjectInputSchema).array(),z.lazy(() => ProjectArtifactUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectArtifactCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ProjectArtifactCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectArtifactCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReactionCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ReactionCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutProjectInputSchema),z.lazy(() => ReactionCreateWithoutProjectInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectArtifactUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ProjectArtifactUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ProjectArtifactCreateWithoutProjectInputSchema),z.lazy(() => ProjectArtifactCreateWithoutProjectInputSchema).array(),z.lazy(() => ProjectArtifactUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectArtifactCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ProjectArtifactCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectArtifactCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReactionUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ReactionUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutProjectInputSchema),z.lazy(() => ReactionCreateWithoutProjectInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const EnumProjectStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumProjectStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ProjectStatusSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const ProjectArtifactUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ProjectArtifactUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectArtifactCreateWithoutProjectInputSchema),z.lazy(() => ProjectArtifactCreateWithoutProjectInputSchema).array(),z.lazy(() => ProjectArtifactUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectArtifactCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ProjectArtifactCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectArtifactUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectArtifactCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectArtifactUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectArtifactUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectArtifactScalarWhereInputSchema),z.lazy(() => ProjectArtifactScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReactionUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ReactionUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutProjectInputSchema),z.lazy(() => ReactionCreateWithoutProjectInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReactionUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ReactionUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReactionUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ReactionUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReactionUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ReactionUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectArtifactUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ProjectArtifactUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectArtifactCreateWithoutProjectInputSchema),z.lazy(() => ProjectArtifactCreateWithoutProjectInputSchema).array(),z.lazy(() => ProjectArtifactUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectArtifactCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ProjectArtifactCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectArtifactUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectArtifactCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectArtifactUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectArtifactUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectArtifactScalarWhereInputSchema),z.lazy(() => ProjectArtifactScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReactionUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutProjectInputSchema),z.lazy(() => ReactionCreateWithoutProjectInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReactionUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ReactionUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReactionUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ReactionUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReactionUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ReactionUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectArtifactCreateNestedManyWithoutArtifactInputSchema: z.ZodType<Prisma.ProjectArtifactCreateNestedManyWithoutArtifactInput> = z.object({
  create: z.union([ z.lazy(() => ProjectArtifactCreateWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactCreateWithoutArtifactInputSchema).array(),z.lazy(() => ProjectArtifactUncheckedCreateWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUncheckedCreateWithoutArtifactInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectArtifactCreateOrConnectWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactCreateOrConnectWithoutArtifactInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectArtifactCreateManyArtifactInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ArtifactTagCreateNestedManyWithoutArtifactInputSchema: z.ZodType<Prisma.ArtifactTagCreateNestedManyWithoutArtifactInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactTagCreateWithoutArtifactInputSchema),z.lazy(() => ArtifactTagCreateWithoutArtifactInputSchema).array(),z.lazy(() => ArtifactTagUncheckedCreateWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUncheckedCreateWithoutArtifactInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArtifactTagCreateOrConnectWithoutArtifactInputSchema),z.lazy(() => ArtifactTagCreateOrConnectWithoutArtifactInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArtifactTagCreateManyArtifactInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReactionCreateNestedManyWithoutArtifactInputSchema: z.ZodType<Prisma.ReactionCreateNestedManyWithoutArtifactInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutArtifactInputSchema),z.lazy(() => ReactionCreateWithoutArtifactInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutArtifactInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutArtifactInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutArtifactInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutArtifactInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyArtifactInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectArtifactUncheckedCreateNestedManyWithoutArtifactInputSchema: z.ZodType<Prisma.ProjectArtifactUncheckedCreateNestedManyWithoutArtifactInput> = z.object({
  create: z.union([ z.lazy(() => ProjectArtifactCreateWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactCreateWithoutArtifactInputSchema).array(),z.lazy(() => ProjectArtifactUncheckedCreateWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUncheckedCreateWithoutArtifactInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectArtifactCreateOrConnectWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactCreateOrConnectWithoutArtifactInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectArtifactCreateManyArtifactInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ArtifactTagUncheckedCreateNestedManyWithoutArtifactInputSchema: z.ZodType<Prisma.ArtifactTagUncheckedCreateNestedManyWithoutArtifactInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactTagCreateWithoutArtifactInputSchema),z.lazy(() => ArtifactTagCreateWithoutArtifactInputSchema).array(),z.lazy(() => ArtifactTagUncheckedCreateWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUncheckedCreateWithoutArtifactInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArtifactTagCreateOrConnectWithoutArtifactInputSchema),z.lazy(() => ArtifactTagCreateOrConnectWithoutArtifactInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArtifactTagCreateManyArtifactInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReactionUncheckedCreateNestedManyWithoutArtifactInputSchema: z.ZodType<Prisma.ReactionUncheckedCreateNestedManyWithoutArtifactInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutArtifactInputSchema),z.lazy(() => ReactionCreateWithoutArtifactInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutArtifactInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutArtifactInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutArtifactInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutArtifactInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyArtifactInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumArtifactTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumArtifactTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ArtifactTypeSchema).optional()
}).strict();

export const ProjectArtifactUpdateManyWithoutArtifactNestedInputSchema: z.ZodType<Prisma.ProjectArtifactUpdateManyWithoutArtifactNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectArtifactCreateWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactCreateWithoutArtifactInputSchema).array(),z.lazy(() => ProjectArtifactUncheckedCreateWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUncheckedCreateWithoutArtifactInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectArtifactCreateOrConnectWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactCreateOrConnectWithoutArtifactInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectArtifactUpsertWithWhereUniqueWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUpsertWithWhereUniqueWithoutArtifactInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectArtifactCreateManyArtifactInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectArtifactUpdateWithWhereUniqueWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUpdateWithWhereUniqueWithoutArtifactInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectArtifactUpdateManyWithWhereWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUpdateManyWithWhereWithoutArtifactInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectArtifactScalarWhereInputSchema),z.lazy(() => ProjectArtifactScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ArtifactTagUpdateManyWithoutArtifactNestedInputSchema: z.ZodType<Prisma.ArtifactTagUpdateManyWithoutArtifactNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactTagCreateWithoutArtifactInputSchema),z.lazy(() => ArtifactTagCreateWithoutArtifactInputSchema).array(),z.lazy(() => ArtifactTagUncheckedCreateWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUncheckedCreateWithoutArtifactInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArtifactTagCreateOrConnectWithoutArtifactInputSchema),z.lazy(() => ArtifactTagCreateOrConnectWithoutArtifactInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArtifactTagUpsertWithWhereUniqueWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUpsertWithWhereUniqueWithoutArtifactInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArtifactTagCreateManyArtifactInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArtifactTagUpdateWithWhereUniqueWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUpdateWithWhereUniqueWithoutArtifactInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArtifactTagUpdateManyWithWhereWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUpdateManyWithWhereWithoutArtifactInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArtifactTagScalarWhereInputSchema),z.lazy(() => ArtifactTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReactionUpdateManyWithoutArtifactNestedInputSchema: z.ZodType<Prisma.ReactionUpdateManyWithoutArtifactNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutArtifactInputSchema),z.lazy(() => ReactionCreateWithoutArtifactInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutArtifactInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutArtifactInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutArtifactInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutArtifactInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReactionUpsertWithWhereUniqueWithoutArtifactInputSchema),z.lazy(() => ReactionUpsertWithWhereUniqueWithoutArtifactInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyArtifactInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReactionUpdateWithWhereUniqueWithoutArtifactInputSchema),z.lazy(() => ReactionUpdateWithWhereUniqueWithoutArtifactInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReactionUpdateManyWithWhereWithoutArtifactInputSchema),z.lazy(() => ReactionUpdateManyWithWhereWithoutArtifactInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectArtifactUncheckedUpdateManyWithoutArtifactNestedInputSchema: z.ZodType<Prisma.ProjectArtifactUncheckedUpdateManyWithoutArtifactNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectArtifactCreateWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactCreateWithoutArtifactInputSchema).array(),z.lazy(() => ProjectArtifactUncheckedCreateWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUncheckedCreateWithoutArtifactInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectArtifactCreateOrConnectWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactCreateOrConnectWithoutArtifactInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectArtifactUpsertWithWhereUniqueWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUpsertWithWhereUniqueWithoutArtifactInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectArtifactCreateManyArtifactInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectArtifactWhereUniqueInputSchema),z.lazy(() => ProjectArtifactWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectArtifactUpdateWithWhereUniqueWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUpdateWithWhereUniqueWithoutArtifactInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectArtifactUpdateManyWithWhereWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUpdateManyWithWhereWithoutArtifactInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectArtifactScalarWhereInputSchema),z.lazy(() => ProjectArtifactScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ArtifactTagUncheckedUpdateManyWithoutArtifactNestedInputSchema: z.ZodType<Prisma.ArtifactTagUncheckedUpdateManyWithoutArtifactNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactTagCreateWithoutArtifactInputSchema),z.lazy(() => ArtifactTagCreateWithoutArtifactInputSchema).array(),z.lazy(() => ArtifactTagUncheckedCreateWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUncheckedCreateWithoutArtifactInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArtifactTagCreateOrConnectWithoutArtifactInputSchema),z.lazy(() => ArtifactTagCreateOrConnectWithoutArtifactInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArtifactTagUpsertWithWhereUniqueWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUpsertWithWhereUniqueWithoutArtifactInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArtifactTagCreateManyArtifactInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArtifactTagUpdateWithWhereUniqueWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUpdateWithWhereUniqueWithoutArtifactInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArtifactTagUpdateManyWithWhereWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUpdateManyWithWhereWithoutArtifactInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArtifactTagScalarWhereInputSchema),z.lazy(() => ArtifactTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReactionUncheckedUpdateManyWithoutArtifactNestedInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateManyWithoutArtifactNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutArtifactInputSchema),z.lazy(() => ReactionCreateWithoutArtifactInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutArtifactInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutArtifactInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutArtifactInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutArtifactInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReactionUpsertWithWhereUniqueWithoutArtifactInputSchema),z.lazy(() => ReactionUpsertWithWhereUniqueWithoutArtifactInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyArtifactInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReactionUpdateWithWhereUniqueWithoutArtifactInputSchema),z.lazy(() => ReactionUpdateWithWhereUniqueWithoutArtifactInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReactionUpdateManyWithWhereWithoutArtifactInputSchema),z.lazy(() => ReactionUpdateManyWithWhereWithoutArtifactInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ArtifactTagCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.ArtifactTagCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactTagCreateWithoutTagInputSchema),z.lazy(() => ArtifactTagCreateWithoutTagInputSchema).array(),z.lazy(() => ArtifactTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => ArtifactTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArtifactTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => ArtifactTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArtifactTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ArtifactTagUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.ArtifactTagUncheckedCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactTagCreateWithoutTagInputSchema),z.lazy(() => ArtifactTagCreateWithoutTagInputSchema).array(),z.lazy(() => ArtifactTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => ArtifactTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArtifactTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => ArtifactTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArtifactTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ArtifactTagUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.ArtifactTagUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactTagCreateWithoutTagInputSchema),z.lazy(() => ArtifactTagCreateWithoutTagInputSchema).array(),z.lazy(() => ArtifactTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => ArtifactTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArtifactTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => ArtifactTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArtifactTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => ArtifactTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArtifactTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArtifactTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => ArtifactTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArtifactTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => ArtifactTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArtifactTagScalarWhereInputSchema),z.lazy(() => ArtifactTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ArtifactTagUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.ArtifactTagUncheckedUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactTagCreateWithoutTagInputSchema),z.lazy(() => ArtifactTagCreateWithoutTagInputSchema).array(),z.lazy(() => ArtifactTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => ArtifactTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArtifactTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => ArtifactTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArtifactTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => ArtifactTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArtifactTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArtifactTagWhereUniqueInputSchema),z.lazy(() => ArtifactTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArtifactTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => ArtifactTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArtifactTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => ArtifactTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArtifactTagScalarWhereInputSchema),z.lazy(() => ArtifactTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutReactionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReactionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReactionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReactionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ProjectCreateNestedOneWithoutReactionsInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutReactionsInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutReactionsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutReactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutReactionsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const ArtifactCreateNestedOneWithoutReactionsInputSchema: z.ZodType<Prisma.ArtifactCreateNestedOneWithoutReactionsInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactCreateWithoutReactionsInputSchema),z.lazy(() => ArtifactUncheckedCreateWithoutReactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArtifactCreateOrConnectWithoutReactionsInputSchema).optional(),
  connect: z.lazy(() => ArtifactWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneWithoutReactionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutReactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReactionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReactionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReactionsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReactionsInputSchema),z.lazy(() => UserUpdateWithoutReactionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReactionsInputSchema) ]).optional(),
}).strict();

export const ProjectUpdateOneWithoutReactionsNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneWithoutReactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutReactionsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutReactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutReactionsInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutReactionsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutReactionsInputSchema),z.lazy(() => ProjectUpdateWithoutReactionsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutReactionsInputSchema) ]).optional(),
}).strict();

export const ArtifactUpdateOneWithoutReactionsNestedInputSchema: z.ZodType<Prisma.ArtifactUpdateOneWithoutReactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactCreateWithoutReactionsInputSchema),z.lazy(() => ArtifactUncheckedCreateWithoutReactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArtifactCreateOrConnectWithoutReactionsInputSchema).optional(),
  upsert: z.lazy(() => ArtifactUpsertWithoutReactionsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ArtifactWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ArtifactWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ArtifactWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ArtifactUpdateToOneWithWhereWithoutReactionsInputSchema),z.lazy(() => ArtifactUpdateWithoutReactionsInputSchema),z.lazy(() => ArtifactUncheckedUpdateWithoutReactionsInputSchema) ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutArtifactsInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutArtifactsInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutArtifactsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutArtifactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutArtifactsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const ArtifactCreateNestedOneWithoutProjectsInputSchema: z.ZodType<Prisma.ArtifactCreateNestedOneWithoutProjectsInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactCreateWithoutProjectsInputSchema),z.lazy(() => ArtifactUncheckedCreateWithoutProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArtifactCreateOrConnectWithoutProjectsInputSchema).optional(),
  connect: z.lazy(() => ArtifactWhereUniqueInputSchema).optional()
}).strict();

export const ProjectUpdateOneRequiredWithoutArtifactsNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutArtifactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutArtifactsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutArtifactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutArtifactsInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutArtifactsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutArtifactsInputSchema),z.lazy(() => ProjectUpdateWithoutArtifactsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutArtifactsInputSchema) ]).optional(),
}).strict();

export const ArtifactUpdateOneRequiredWithoutProjectsNestedInputSchema: z.ZodType<Prisma.ArtifactUpdateOneRequiredWithoutProjectsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactCreateWithoutProjectsInputSchema),z.lazy(() => ArtifactUncheckedCreateWithoutProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArtifactCreateOrConnectWithoutProjectsInputSchema).optional(),
  upsert: z.lazy(() => ArtifactUpsertWithoutProjectsInputSchema).optional(),
  connect: z.lazy(() => ArtifactWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ArtifactUpdateToOneWithWhereWithoutProjectsInputSchema),z.lazy(() => ArtifactUpdateWithoutProjectsInputSchema),z.lazy(() => ArtifactUncheckedUpdateWithoutProjectsInputSchema) ]).optional(),
}).strict();

export const ArtifactCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.ArtifactCreateNestedOneWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactCreateWithoutTagsInputSchema),z.lazy(() => ArtifactUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArtifactCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => ArtifactWhereUniqueInputSchema).optional()
}).strict();

export const TagCreateNestedOneWithoutArtifactsInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutArtifactsInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutArtifactsInputSchema),z.lazy(() => TagUncheckedCreateWithoutArtifactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutArtifactsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional()
}).strict();

export const ArtifactUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.ArtifactUpdateOneRequiredWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArtifactCreateWithoutTagsInputSchema),z.lazy(() => ArtifactUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArtifactCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => ArtifactUpsertWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => ArtifactWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ArtifactUpdateToOneWithWhereWithoutTagsInputSchema),z.lazy(() => ArtifactUpdateWithoutTagsInputSchema),z.lazy(() => ArtifactUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
}).strict();

export const TagUpdateOneRequiredWithoutArtifactsNestedInputSchema: z.ZodType<Prisma.TagUpdateOneRequiredWithoutArtifactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutArtifactsInputSchema),z.lazy(() => TagUncheckedCreateWithoutArtifactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutArtifactsInputSchema).optional(),
  upsert: z.lazy(() => TagUpsertWithoutArtifactsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TagUpdateToOneWithWhereWithoutArtifactsInputSchema),z.lazy(() => TagUpdateWithoutArtifactsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutArtifactsInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReactionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReactionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutUserInputSchema),z.lazy(() => ReactionCreateWithoutUserInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReactionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutUserInputSchema),z.lazy(() => ReactionCreateWithoutUserInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumUserRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserRoleSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReactionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReactionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutUserInputSchema),z.lazy(() => ReactionCreateWithoutUserInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReactionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReactionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReactionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReactionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReactionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReactionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReactionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutUserInputSchema),z.lazy(() => ReactionCreateWithoutUserInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReactionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReactionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReactionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReactionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReactionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReactionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedEnumProjectStatusFilterSchema: z.ZodType<Prisma.NestedEnumProjectStatusFilter> = z.object({
  equals: z.lazy(() => ProjectStatusSchema).optional(),
  in: z.lazy(() => ProjectStatusSchema).array().optional(),
  notIn: z.lazy(() => ProjectStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => NestedEnumProjectStatusFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedEnumProjectStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumProjectStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ProjectStatusSchema).optional(),
  in: z.lazy(() => ProjectStatusSchema).array().optional(),
  notIn: z.lazy(() => ProjectStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => NestedEnumProjectStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumProjectStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumProjectStatusFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumArtifactTypeFilterSchema: z.ZodType<Prisma.NestedEnumArtifactTypeFilter> = z.object({
  equals: z.lazy(() => ArtifactTypeSchema).optional(),
  in: z.lazy(() => ArtifactTypeSchema).array().optional(),
  notIn: z.lazy(() => ArtifactTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => NestedEnumArtifactTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumArtifactTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumArtifactTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ArtifactTypeSchema).optional(),
  in: z.lazy(() => ArtifactTypeSchema).array().optional(),
  notIn: z.lazy(() => ArtifactTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => NestedEnumArtifactTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumArtifactTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumArtifactTypeFilterSchema).optional()
}).strict();

export const NestedEnumUserRoleFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleFilter> = z.object({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => NestedEnumUserRoleFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ProjectArtifactCreateWithoutProjectInputSchema: z.ZodType<Prisma.ProjectArtifactCreateWithoutProjectInput> = z.object({
  created_at: z.coerce.date().optional(),
  artifact: z.lazy(() => ArtifactCreateNestedOneWithoutProjectsInputSchema)
}).strict();

export const ProjectArtifactUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.ProjectArtifactUncheckedCreateWithoutProjectInput> = z.object({
  artifact_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const ProjectArtifactCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.ProjectArtifactCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => ProjectArtifactWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectArtifactCreateWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ProjectArtifactCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.ProjectArtifactCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProjectArtifactCreateManyProjectInputSchema),z.lazy(() => ProjectArtifactCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReactionCreateWithoutProjectInputSchema: z.ZodType<Prisma.ReactionCreateWithoutProjectInput> = z.object({
  id: z.string().cuid().optional(),
  emoji: z.string(),
  review_text: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReactionsInputSchema).optional(),
  artifact: z.lazy(() => ArtifactCreateNestedOneWithoutReactionsInputSchema).optional()
}).strict();

export const ReactionUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.ReactionUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().cuid().optional(),
  emoji: z.string(),
  review_text: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  user_id: z.string().optional().nullable(),
  artifact_id: z.string().optional().nullable()
}).strict();

export const ReactionCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.ReactionCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReactionCreateWithoutProjectInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ReactionCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.ReactionCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReactionCreateManyProjectInputSchema),z.lazy(() => ReactionCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProjectArtifactUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ProjectArtifactUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ProjectArtifactWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProjectArtifactUpdateWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectArtifactCreateWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ProjectArtifactUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ProjectArtifactUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ProjectArtifactWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProjectArtifactUpdateWithoutProjectInputSchema),z.lazy(() => ProjectArtifactUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const ProjectArtifactUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.ProjectArtifactUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => ProjectArtifactScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProjectArtifactUpdateManyMutationInputSchema),z.lazy(() => ProjectArtifactUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const ProjectArtifactScalarWhereInputSchema: z.ZodType<Prisma.ProjectArtifactScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectArtifactScalarWhereInputSchema),z.lazy(() => ProjectArtifactScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectArtifactScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectArtifactScalarWhereInputSchema),z.lazy(() => ProjectArtifactScalarWhereInputSchema).array() ]).optional(),
  project_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  artifact_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReactionUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ReactionUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReactionUpdateWithoutProjectInputSchema),z.lazy(() => ReactionUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => ReactionCreateWithoutProjectInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ReactionUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ReactionUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReactionUpdateWithoutProjectInputSchema),z.lazy(() => ReactionUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const ReactionUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.ReactionUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => ReactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReactionUpdateManyMutationInputSchema),z.lazy(() => ReactionUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const ReactionScalarWhereInputSchema: z.ZodType<Prisma.ReactionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReactionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emoji: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  review_text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  project_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  artifact_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ProjectArtifactCreateWithoutArtifactInputSchema: z.ZodType<Prisma.ProjectArtifactCreateWithoutArtifactInput> = z.object({
  created_at: z.coerce.date().optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutArtifactsInputSchema)
}).strict();

export const ProjectArtifactUncheckedCreateWithoutArtifactInputSchema: z.ZodType<Prisma.ProjectArtifactUncheckedCreateWithoutArtifactInput> = z.object({
  project_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const ProjectArtifactCreateOrConnectWithoutArtifactInputSchema: z.ZodType<Prisma.ProjectArtifactCreateOrConnectWithoutArtifactInput> = z.object({
  where: z.lazy(() => ProjectArtifactWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectArtifactCreateWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUncheckedCreateWithoutArtifactInputSchema) ]),
}).strict();

export const ProjectArtifactCreateManyArtifactInputEnvelopeSchema: z.ZodType<Prisma.ProjectArtifactCreateManyArtifactInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProjectArtifactCreateManyArtifactInputSchema),z.lazy(() => ProjectArtifactCreateManyArtifactInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ArtifactTagCreateWithoutArtifactInputSchema: z.ZodType<Prisma.ArtifactTagCreateWithoutArtifactInput> = z.object({
  created_at: z.coerce.date().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutArtifactsInputSchema)
}).strict();

export const ArtifactTagUncheckedCreateWithoutArtifactInputSchema: z.ZodType<Prisma.ArtifactTagUncheckedCreateWithoutArtifactInput> = z.object({
  tag_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const ArtifactTagCreateOrConnectWithoutArtifactInputSchema: z.ZodType<Prisma.ArtifactTagCreateOrConnectWithoutArtifactInput> = z.object({
  where: z.lazy(() => ArtifactTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArtifactTagCreateWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUncheckedCreateWithoutArtifactInputSchema) ]),
}).strict();

export const ArtifactTagCreateManyArtifactInputEnvelopeSchema: z.ZodType<Prisma.ArtifactTagCreateManyArtifactInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ArtifactTagCreateManyArtifactInputSchema),z.lazy(() => ArtifactTagCreateManyArtifactInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReactionCreateWithoutArtifactInputSchema: z.ZodType<Prisma.ReactionCreateWithoutArtifactInput> = z.object({
  id: z.string().cuid().optional(),
  emoji: z.string(),
  review_text: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReactionsInputSchema).optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutReactionsInputSchema).optional()
}).strict();

export const ReactionUncheckedCreateWithoutArtifactInputSchema: z.ZodType<Prisma.ReactionUncheckedCreateWithoutArtifactInput> = z.object({
  id: z.string().cuid().optional(),
  emoji: z.string(),
  review_text: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  user_id: z.string().optional().nullable(),
  project_id: z.string().optional().nullable()
}).strict();

export const ReactionCreateOrConnectWithoutArtifactInputSchema: z.ZodType<Prisma.ReactionCreateOrConnectWithoutArtifactInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReactionCreateWithoutArtifactInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutArtifactInputSchema) ]),
}).strict();

export const ReactionCreateManyArtifactInputEnvelopeSchema: z.ZodType<Prisma.ReactionCreateManyArtifactInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReactionCreateManyArtifactInputSchema),z.lazy(() => ReactionCreateManyArtifactInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProjectArtifactUpsertWithWhereUniqueWithoutArtifactInputSchema: z.ZodType<Prisma.ProjectArtifactUpsertWithWhereUniqueWithoutArtifactInput> = z.object({
  where: z.lazy(() => ProjectArtifactWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProjectArtifactUpdateWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUncheckedUpdateWithoutArtifactInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectArtifactCreateWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUncheckedCreateWithoutArtifactInputSchema) ]),
}).strict();

export const ProjectArtifactUpdateWithWhereUniqueWithoutArtifactInputSchema: z.ZodType<Prisma.ProjectArtifactUpdateWithWhereUniqueWithoutArtifactInput> = z.object({
  where: z.lazy(() => ProjectArtifactWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProjectArtifactUpdateWithoutArtifactInputSchema),z.lazy(() => ProjectArtifactUncheckedUpdateWithoutArtifactInputSchema) ]),
}).strict();

export const ProjectArtifactUpdateManyWithWhereWithoutArtifactInputSchema: z.ZodType<Prisma.ProjectArtifactUpdateManyWithWhereWithoutArtifactInput> = z.object({
  where: z.lazy(() => ProjectArtifactScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProjectArtifactUpdateManyMutationInputSchema),z.lazy(() => ProjectArtifactUncheckedUpdateManyWithoutArtifactInputSchema) ]),
}).strict();

export const ArtifactTagUpsertWithWhereUniqueWithoutArtifactInputSchema: z.ZodType<Prisma.ArtifactTagUpsertWithWhereUniqueWithoutArtifactInput> = z.object({
  where: z.lazy(() => ArtifactTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ArtifactTagUpdateWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUncheckedUpdateWithoutArtifactInputSchema) ]),
  create: z.union([ z.lazy(() => ArtifactTagCreateWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUncheckedCreateWithoutArtifactInputSchema) ]),
}).strict();

export const ArtifactTagUpdateWithWhereUniqueWithoutArtifactInputSchema: z.ZodType<Prisma.ArtifactTagUpdateWithWhereUniqueWithoutArtifactInput> = z.object({
  where: z.lazy(() => ArtifactTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ArtifactTagUpdateWithoutArtifactInputSchema),z.lazy(() => ArtifactTagUncheckedUpdateWithoutArtifactInputSchema) ]),
}).strict();

export const ArtifactTagUpdateManyWithWhereWithoutArtifactInputSchema: z.ZodType<Prisma.ArtifactTagUpdateManyWithWhereWithoutArtifactInput> = z.object({
  where: z.lazy(() => ArtifactTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ArtifactTagUpdateManyMutationInputSchema),z.lazy(() => ArtifactTagUncheckedUpdateManyWithoutArtifactInputSchema) ]),
}).strict();

export const ArtifactTagScalarWhereInputSchema: z.ZodType<Prisma.ArtifactTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ArtifactTagScalarWhereInputSchema),z.lazy(() => ArtifactTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArtifactTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArtifactTagScalarWhereInputSchema),z.lazy(() => ArtifactTagScalarWhereInputSchema).array() ]).optional(),
  artifact_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReactionUpsertWithWhereUniqueWithoutArtifactInputSchema: z.ZodType<Prisma.ReactionUpsertWithWhereUniqueWithoutArtifactInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReactionUpdateWithoutArtifactInputSchema),z.lazy(() => ReactionUncheckedUpdateWithoutArtifactInputSchema) ]),
  create: z.union([ z.lazy(() => ReactionCreateWithoutArtifactInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutArtifactInputSchema) ]),
}).strict();

export const ReactionUpdateWithWhereUniqueWithoutArtifactInputSchema: z.ZodType<Prisma.ReactionUpdateWithWhereUniqueWithoutArtifactInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReactionUpdateWithoutArtifactInputSchema),z.lazy(() => ReactionUncheckedUpdateWithoutArtifactInputSchema) ]),
}).strict();

export const ReactionUpdateManyWithWhereWithoutArtifactInputSchema: z.ZodType<Prisma.ReactionUpdateManyWithWhereWithoutArtifactInput> = z.object({
  where: z.lazy(() => ReactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReactionUpdateManyMutationInputSchema),z.lazy(() => ReactionUncheckedUpdateManyWithoutArtifactInputSchema) ]),
}).strict();

export const ArtifactTagCreateWithoutTagInputSchema: z.ZodType<Prisma.ArtifactTagCreateWithoutTagInput> = z.object({
  created_at: z.coerce.date().optional(),
  artifact: z.lazy(() => ArtifactCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const ArtifactTagUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.ArtifactTagUncheckedCreateWithoutTagInput> = z.object({
  artifact_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const ArtifactTagCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.ArtifactTagCreateOrConnectWithoutTagInput> = z.object({
  where: z.lazy(() => ArtifactTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArtifactTagCreateWithoutTagInputSchema),z.lazy(() => ArtifactTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const ArtifactTagCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.ArtifactTagCreateManyTagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ArtifactTagCreateManyTagInputSchema),z.lazy(() => ArtifactTagCreateManyTagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ArtifactTagUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.ArtifactTagUpsertWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => ArtifactTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ArtifactTagUpdateWithoutTagInputSchema),z.lazy(() => ArtifactTagUncheckedUpdateWithoutTagInputSchema) ]),
  create: z.union([ z.lazy(() => ArtifactTagCreateWithoutTagInputSchema),z.lazy(() => ArtifactTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const ArtifactTagUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.ArtifactTagUpdateWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => ArtifactTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ArtifactTagUpdateWithoutTagInputSchema),z.lazy(() => ArtifactTagUncheckedUpdateWithoutTagInputSchema) ]),
}).strict();

export const ArtifactTagUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.ArtifactTagUpdateManyWithWhereWithoutTagInput> = z.object({
  where: z.lazy(() => ArtifactTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ArtifactTagUpdateManyMutationInputSchema),z.lazy(() => ArtifactTagUncheckedUpdateManyWithoutTagInputSchema) ]),
}).strict();

export const UserCreateWithoutReactionsInputSchema: z.ZodType<Prisma.UserCreateWithoutReactionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  password_hash: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutReactionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReactionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  password_hash: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReactionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReactionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReactionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReactionsInputSchema) ]),
}).strict();

export const ProjectCreateWithoutReactionsInputSchema: z.ZodType<Prisma.ProjectCreateWithoutReactionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  status: z.lazy(() => ProjectStatusSchema),
  ideation_date: z.coerce.date(),
  last_updated_date: z.coerce.date().optional(),
  llm_summary: z.string().optional().nullable(),
  llm_sentiment_phrase: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  artifacts: z.lazy(() => ProjectArtifactCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutReactionsInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutReactionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  status: z.lazy(() => ProjectStatusSchema),
  ideation_date: z.coerce.date(),
  last_updated_date: z.coerce.date().optional(),
  llm_summary: z.string().optional().nullable(),
  llm_sentiment_phrase: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  artifacts: z.lazy(() => ProjectArtifactUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutReactionsInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutReactionsInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutReactionsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutReactionsInputSchema) ]),
}).strict();

export const ArtifactCreateWithoutReactionsInputSchema: z.ZodType<Prisma.ArtifactCreateWithoutReactionsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  publish_date: z.coerce.date(),
  content_path: z.string(),
  type: z.lazy(() => ArtifactTypeSchema),
  created_at: z.coerce.date().optional(),
  projects: z.lazy(() => ProjectArtifactCreateNestedManyWithoutArtifactInputSchema).optional(),
  tags: z.lazy(() => ArtifactTagCreateNestedManyWithoutArtifactInputSchema).optional()
}).strict();

export const ArtifactUncheckedCreateWithoutReactionsInputSchema: z.ZodType<Prisma.ArtifactUncheckedCreateWithoutReactionsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  publish_date: z.coerce.date(),
  content_path: z.string(),
  type: z.lazy(() => ArtifactTypeSchema),
  created_at: z.coerce.date().optional(),
  projects: z.lazy(() => ProjectArtifactUncheckedCreateNestedManyWithoutArtifactInputSchema).optional(),
  tags: z.lazy(() => ArtifactTagUncheckedCreateNestedManyWithoutArtifactInputSchema).optional()
}).strict();

export const ArtifactCreateOrConnectWithoutReactionsInputSchema: z.ZodType<Prisma.ArtifactCreateOrConnectWithoutReactionsInput> = z.object({
  where: z.lazy(() => ArtifactWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArtifactCreateWithoutReactionsInputSchema),z.lazy(() => ArtifactUncheckedCreateWithoutReactionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutReactionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutReactionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReactionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReactionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReactionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReactionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutReactionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReactionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReactionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReactionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutReactionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutReactionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReactionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReactionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ProjectUpsertWithoutReactionsInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutReactionsInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutReactionsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutReactionsInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutReactionsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutReactionsInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutReactionsInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutReactionsInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutReactionsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutReactionsInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutReactionsInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutReactionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => EnumProjectStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ideation_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_updated_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  llm_summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  llm_sentiment_phrase: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  artifacts: z.lazy(() => ProjectArtifactUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutReactionsInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutReactionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => EnumProjectStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ideation_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_updated_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  llm_summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  llm_sentiment_phrase: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  artifacts: z.lazy(() => ProjectArtifactUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ArtifactUpsertWithoutReactionsInputSchema: z.ZodType<Prisma.ArtifactUpsertWithoutReactionsInput> = z.object({
  update: z.union([ z.lazy(() => ArtifactUpdateWithoutReactionsInputSchema),z.lazy(() => ArtifactUncheckedUpdateWithoutReactionsInputSchema) ]),
  create: z.union([ z.lazy(() => ArtifactCreateWithoutReactionsInputSchema),z.lazy(() => ArtifactUncheckedCreateWithoutReactionsInputSchema) ]),
  where: z.lazy(() => ArtifactWhereInputSchema).optional()
}).strict();

export const ArtifactUpdateToOneWithWhereWithoutReactionsInputSchema: z.ZodType<Prisma.ArtifactUpdateToOneWithWhereWithoutReactionsInput> = z.object({
  where: z.lazy(() => ArtifactWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ArtifactUpdateWithoutReactionsInputSchema),z.lazy(() => ArtifactUncheckedUpdateWithoutReactionsInputSchema) ]),
}).strict();

export const ArtifactUpdateWithoutReactionsInputSchema: z.ZodType<Prisma.ArtifactUpdateWithoutReactionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publish_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => EnumArtifactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => ProjectArtifactUpdateManyWithoutArtifactNestedInputSchema).optional(),
  tags: z.lazy(() => ArtifactTagUpdateManyWithoutArtifactNestedInputSchema).optional()
}).strict();

export const ArtifactUncheckedUpdateWithoutReactionsInputSchema: z.ZodType<Prisma.ArtifactUncheckedUpdateWithoutReactionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publish_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => EnumArtifactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => ProjectArtifactUncheckedUpdateManyWithoutArtifactNestedInputSchema).optional(),
  tags: z.lazy(() => ArtifactTagUncheckedUpdateManyWithoutArtifactNestedInputSchema).optional()
}).strict();

export const ProjectCreateWithoutArtifactsInputSchema: z.ZodType<Prisma.ProjectCreateWithoutArtifactsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  status: z.lazy(() => ProjectStatusSchema),
  ideation_date: z.coerce.date(),
  last_updated_date: z.coerce.date().optional(),
  llm_summary: z.string().optional().nullable(),
  llm_sentiment_phrase: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  reactions: z.lazy(() => ReactionCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutArtifactsInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutArtifactsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  status: z.lazy(() => ProjectStatusSchema),
  ideation_date: z.coerce.date(),
  last_updated_date: z.coerce.date().optional(),
  llm_summary: z.string().optional().nullable(),
  llm_sentiment_phrase: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  reactions: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutArtifactsInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutArtifactsInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutArtifactsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutArtifactsInputSchema) ]),
}).strict();

export const ArtifactCreateWithoutProjectsInputSchema: z.ZodType<Prisma.ArtifactCreateWithoutProjectsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  publish_date: z.coerce.date(),
  content_path: z.string(),
  type: z.lazy(() => ArtifactTypeSchema),
  created_at: z.coerce.date().optional(),
  tags: z.lazy(() => ArtifactTagCreateNestedManyWithoutArtifactInputSchema).optional(),
  reactions: z.lazy(() => ReactionCreateNestedManyWithoutArtifactInputSchema).optional()
}).strict();

export const ArtifactUncheckedCreateWithoutProjectsInputSchema: z.ZodType<Prisma.ArtifactUncheckedCreateWithoutProjectsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  publish_date: z.coerce.date(),
  content_path: z.string(),
  type: z.lazy(() => ArtifactTypeSchema),
  created_at: z.coerce.date().optional(),
  tags: z.lazy(() => ArtifactTagUncheckedCreateNestedManyWithoutArtifactInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutArtifactInputSchema).optional()
}).strict();

export const ArtifactCreateOrConnectWithoutProjectsInputSchema: z.ZodType<Prisma.ArtifactCreateOrConnectWithoutProjectsInput> = z.object({
  where: z.lazy(() => ArtifactWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArtifactCreateWithoutProjectsInputSchema),z.lazy(() => ArtifactUncheckedCreateWithoutProjectsInputSchema) ]),
}).strict();

export const ProjectUpsertWithoutArtifactsInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutArtifactsInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutArtifactsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutArtifactsInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutArtifactsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutArtifactsInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutArtifactsInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutArtifactsInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutArtifactsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutArtifactsInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutArtifactsInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutArtifactsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => EnumProjectStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ideation_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_updated_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  llm_summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  llm_sentiment_phrase: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reactions: z.lazy(() => ReactionUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutArtifactsInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutArtifactsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => EnumProjectStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ideation_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  last_updated_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  llm_summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  llm_sentiment_phrase: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reactions: z.lazy(() => ReactionUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ArtifactUpsertWithoutProjectsInputSchema: z.ZodType<Prisma.ArtifactUpsertWithoutProjectsInput> = z.object({
  update: z.union([ z.lazy(() => ArtifactUpdateWithoutProjectsInputSchema),z.lazy(() => ArtifactUncheckedUpdateWithoutProjectsInputSchema) ]),
  create: z.union([ z.lazy(() => ArtifactCreateWithoutProjectsInputSchema),z.lazy(() => ArtifactUncheckedCreateWithoutProjectsInputSchema) ]),
  where: z.lazy(() => ArtifactWhereInputSchema).optional()
}).strict();

export const ArtifactUpdateToOneWithWhereWithoutProjectsInputSchema: z.ZodType<Prisma.ArtifactUpdateToOneWithWhereWithoutProjectsInput> = z.object({
  where: z.lazy(() => ArtifactWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ArtifactUpdateWithoutProjectsInputSchema),z.lazy(() => ArtifactUncheckedUpdateWithoutProjectsInputSchema) ]),
}).strict();

export const ArtifactUpdateWithoutProjectsInputSchema: z.ZodType<Prisma.ArtifactUpdateWithoutProjectsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publish_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => EnumArtifactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => ArtifactTagUpdateManyWithoutArtifactNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUpdateManyWithoutArtifactNestedInputSchema).optional()
}).strict();

export const ArtifactUncheckedUpdateWithoutProjectsInputSchema: z.ZodType<Prisma.ArtifactUncheckedUpdateWithoutProjectsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publish_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => EnumArtifactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => ArtifactTagUncheckedUpdateManyWithoutArtifactNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedUpdateManyWithoutArtifactNestedInputSchema).optional()
}).strict();

export const ArtifactCreateWithoutTagsInputSchema: z.ZodType<Prisma.ArtifactCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  publish_date: z.coerce.date(),
  content_path: z.string(),
  type: z.lazy(() => ArtifactTypeSchema),
  created_at: z.coerce.date().optional(),
  projects: z.lazy(() => ProjectArtifactCreateNestedManyWithoutArtifactInputSchema).optional(),
  reactions: z.lazy(() => ReactionCreateNestedManyWithoutArtifactInputSchema).optional()
}).strict();

export const ArtifactUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.ArtifactUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  publish_date: z.coerce.date(),
  content_path: z.string(),
  type: z.lazy(() => ArtifactTypeSchema),
  created_at: z.coerce.date().optional(),
  projects: z.lazy(() => ProjectArtifactUncheckedCreateNestedManyWithoutArtifactInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutArtifactInputSchema).optional()
}).strict();

export const ArtifactCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.ArtifactCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => ArtifactWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArtifactCreateWithoutTagsInputSchema),z.lazy(() => ArtifactUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const TagCreateWithoutArtifactsInputSchema: z.ZodType<Prisma.TagCreateWithoutArtifactsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const TagUncheckedCreateWithoutArtifactsInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutArtifactsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const TagCreateOrConnectWithoutArtifactsInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutArtifactsInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutArtifactsInputSchema),z.lazy(() => TagUncheckedCreateWithoutArtifactsInputSchema) ]),
}).strict();

export const ArtifactUpsertWithoutTagsInputSchema: z.ZodType<Prisma.ArtifactUpsertWithoutTagsInput> = z.object({
  update: z.union([ z.lazy(() => ArtifactUpdateWithoutTagsInputSchema),z.lazy(() => ArtifactUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => ArtifactCreateWithoutTagsInputSchema),z.lazy(() => ArtifactUncheckedCreateWithoutTagsInputSchema) ]),
  where: z.lazy(() => ArtifactWhereInputSchema).optional()
}).strict();

export const ArtifactUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.ArtifactUpdateToOneWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => ArtifactWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ArtifactUpdateWithoutTagsInputSchema),z.lazy(() => ArtifactUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const ArtifactUpdateWithoutTagsInputSchema: z.ZodType<Prisma.ArtifactUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publish_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => EnumArtifactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => ProjectArtifactUpdateManyWithoutArtifactNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUpdateManyWithoutArtifactNestedInputSchema).optional()
}).strict();

export const ArtifactUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.ArtifactUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publish_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ArtifactTypeSchema),z.lazy(() => EnumArtifactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => ProjectArtifactUncheckedUpdateManyWithoutArtifactNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedUpdateManyWithoutArtifactNestedInputSchema).optional()
}).strict();

export const TagUpsertWithoutArtifactsInputSchema: z.ZodType<Prisma.TagUpsertWithoutArtifactsInput> = z.object({
  update: z.union([ z.lazy(() => TagUpdateWithoutArtifactsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutArtifactsInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutArtifactsInputSchema),z.lazy(() => TagUncheckedCreateWithoutArtifactsInputSchema) ]),
  where: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagUpdateToOneWithWhereWithoutArtifactsInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutArtifactsInput> = z.object({
  where: z.lazy(() => TagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TagUpdateWithoutArtifactsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutArtifactsInputSchema) ]),
}).strict();

export const TagUpdateWithoutArtifactsInputSchema: z.ZodType<Prisma.TagUpdateWithoutArtifactsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateWithoutArtifactsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutArtifactsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReactionCreateWithoutUserInputSchema: z.ZodType<Prisma.ReactionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  emoji: z.string(),
  review_text: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutReactionsInputSchema).optional(),
  artifact: z.lazy(() => ArtifactCreateNestedOneWithoutReactionsInputSchema).optional()
}).strict();

export const ReactionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReactionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  emoji: z.string(),
  review_text: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  project_id: z.string().optional().nullable(),
  artifact_id: z.string().optional().nullable()
}).strict();

export const ReactionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReactionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReactionCreateWithoutUserInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReactionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReactionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReactionCreateManyUserInputSchema),z.lazy(() => ReactionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReactionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReactionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReactionUpdateWithoutUserInputSchema),z.lazy(() => ReactionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ReactionCreateWithoutUserInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReactionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReactionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReactionUpdateWithoutUserInputSchema),z.lazy(() => ReactionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ReactionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReactionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ReactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReactionUpdateManyMutationInputSchema),z.lazy(() => ReactionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  password_hash: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  reactions: z.lazy(() => ReactionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  password_hash: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  password_hash: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  reactions: z.lazy(() => ReactionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  password_hash: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ProjectArtifactCreateManyProjectInputSchema: z.ZodType<Prisma.ProjectArtifactCreateManyProjectInput> = z.object({
  artifact_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const ReactionCreateManyProjectInputSchema: z.ZodType<Prisma.ReactionCreateManyProjectInput> = z.object({
  id: z.string().cuid().optional(),
  emoji: z.string(),
  review_text: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  user_id: z.string().optional().nullable(),
  artifact_id: z.string().optional().nullable()
}).strict();

export const ProjectArtifactUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ProjectArtifactUpdateWithoutProjectInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  artifact: z.lazy(() => ArtifactUpdateOneRequiredWithoutProjectsNestedInputSchema).optional()
}).strict();

export const ProjectArtifactUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ProjectArtifactUncheckedUpdateWithoutProjectInput> = z.object({
  artifact_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectArtifactUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.ProjectArtifactUncheckedUpdateManyWithoutProjectInput> = z.object({
  artifact_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReactionUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ReactionUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emoji: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  review_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutReactionsNestedInputSchema).optional(),
  artifact: z.lazy(() => ArtifactUpdateOneWithoutReactionsNestedInputSchema).optional()
}).strict();

export const ReactionUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emoji: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  review_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  artifact_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReactionUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateManyWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emoji: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  review_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  artifact_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectArtifactCreateManyArtifactInputSchema: z.ZodType<Prisma.ProjectArtifactCreateManyArtifactInput> = z.object({
  project_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const ArtifactTagCreateManyArtifactInputSchema: z.ZodType<Prisma.ArtifactTagCreateManyArtifactInput> = z.object({
  tag_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const ReactionCreateManyArtifactInputSchema: z.ZodType<Prisma.ReactionCreateManyArtifactInput> = z.object({
  id: z.string().cuid().optional(),
  emoji: z.string(),
  review_text: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  user_id: z.string().optional().nullable(),
  project_id: z.string().optional().nullable()
}).strict();

export const ProjectArtifactUpdateWithoutArtifactInputSchema: z.ZodType<Prisma.ProjectArtifactUpdateWithoutArtifactInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutArtifactsNestedInputSchema).optional()
}).strict();

export const ProjectArtifactUncheckedUpdateWithoutArtifactInputSchema: z.ZodType<Prisma.ProjectArtifactUncheckedUpdateWithoutArtifactInput> = z.object({
  project_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectArtifactUncheckedUpdateManyWithoutArtifactInputSchema: z.ZodType<Prisma.ProjectArtifactUncheckedUpdateManyWithoutArtifactInput> = z.object({
  project_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArtifactTagUpdateWithoutArtifactInputSchema: z.ZodType<Prisma.ArtifactTagUpdateWithoutArtifactInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutArtifactsNestedInputSchema).optional()
}).strict();

export const ArtifactTagUncheckedUpdateWithoutArtifactInputSchema: z.ZodType<Prisma.ArtifactTagUncheckedUpdateWithoutArtifactInput> = z.object({
  tag_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArtifactTagUncheckedUpdateManyWithoutArtifactInputSchema: z.ZodType<Prisma.ArtifactTagUncheckedUpdateManyWithoutArtifactInput> = z.object({
  tag_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReactionUpdateWithoutArtifactInputSchema: z.ZodType<Prisma.ReactionUpdateWithoutArtifactInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emoji: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  review_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutReactionsNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneWithoutReactionsNestedInputSchema).optional()
}).strict();

export const ReactionUncheckedUpdateWithoutArtifactInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateWithoutArtifactInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emoji: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  review_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  project_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReactionUncheckedUpdateManyWithoutArtifactInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateManyWithoutArtifactInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emoji: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  review_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  project_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ArtifactTagCreateManyTagInputSchema: z.ZodType<Prisma.ArtifactTagCreateManyTagInput> = z.object({
  artifact_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const ArtifactTagUpdateWithoutTagInputSchema: z.ZodType<Prisma.ArtifactTagUpdateWithoutTagInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  artifact: z.lazy(() => ArtifactUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const ArtifactTagUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.ArtifactTagUncheckedUpdateWithoutTagInput> = z.object({
  artifact_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArtifactTagUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.ArtifactTagUncheckedUpdateManyWithoutTagInput> = z.object({
  artifact_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const ReactionCreateManyUserInputSchema: z.ZodType<Prisma.ReactionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  emoji: z.string(),
  review_text: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  project_id: z.string().optional().nullable(),
  artifact_id: z.string().optional().nullable()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReactionUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReactionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emoji: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  review_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneWithoutReactionsNestedInputSchema).optional(),
  artifact: z.lazy(() => ArtifactUpdateOneWithoutReactionsNestedInputSchema).optional()
}).strict();

export const ReactionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emoji: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  review_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  project_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  artifact_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReactionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emoji: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  review_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  project_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  artifact_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ProjectFindFirstArgsSchema: z.ZodType<Prisma.ProjectFindFirstArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindFirstOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectFindManyArgsSchema: z.ZodType<Prisma.ProjectFindManyArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectAggregateArgsSchema: z.ZodType<Prisma.ProjectAggregateArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectGroupByArgsSchema: z.ZodType<Prisma.ProjectGroupByArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithAggregationInputSchema.array(),ProjectOrderByWithAggregationInputSchema ]).optional(),
  by: ProjectScalarFieldEnumSchema.array(),
  having: ProjectScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectFindUniqueArgsSchema: z.ZodType<Prisma.ProjectFindUniqueArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ProjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindUniqueOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ArtifactFindFirstArgsSchema: z.ZodType<Prisma.ArtifactFindFirstArgs> = z.object({
  select: ArtifactSelectSchema.optional(),
  include: ArtifactIncludeSchema.optional(),
  where: ArtifactWhereInputSchema.optional(),
  orderBy: z.union([ ArtifactOrderByWithRelationInputSchema.array(),ArtifactOrderByWithRelationInputSchema ]).optional(),
  cursor: ArtifactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArtifactScalarFieldEnumSchema,ArtifactScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArtifactFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ArtifactFindFirstOrThrowArgs> = z.object({
  select: ArtifactSelectSchema.optional(),
  include: ArtifactIncludeSchema.optional(),
  where: ArtifactWhereInputSchema.optional(),
  orderBy: z.union([ ArtifactOrderByWithRelationInputSchema.array(),ArtifactOrderByWithRelationInputSchema ]).optional(),
  cursor: ArtifactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArtifactScalarFieldEnumSchema,ArtifactScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArtifactFindManyArgsSchema: z.ZodType<Prisma.ArtifactFindManyArgs> = z.object({
  select: ArtifactSelectSchema.optional(),
  include: ArtifactIncludeSchema.optional(),
  where: ArtifactWhereInputSchema.optional(),
  orderBy: z.union([ ArtifactOrderByWithRelationInputSchema.array(),ArtifactOrderByWithRelationInputSchema ]).optional(),
  cursor: ArtifactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArtifactScalarFieldEnumSchema,ArtifactScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArtifactAggregateArgsSchema: z.ZodType<Prisma.ArtifactAggregateArgs> = z.object({
  where: ArtifactWhereInputSchema.optional(),
  orderBy: z.union([ ArtifactOrderByWithRelationInputSchema.array(),ArtifactOrderByWithRelationInputSchema ]).optional(),
  cursor: ArtifactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ArtifactGroupByArgsSchema: z.ZodType<Prisma.ArtifactGroupByArgs> = z.object({
  where: ArtifactWhereInputSchema.optional(),
  orderBy: z.union([ ArtifactOrderByWithAggregationInputSchema.array(),ArtifactOrderByWithAggregationInputSchema ]).optional(),
  by: ArtifactScalarFieldEnumSchema.array(),
  having: ArtifactScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ArtifactFindUniqueArgsSchema: z.ZodType<Prisma.ArtifactFindUniqueArgs> = z.object({
  select: ArtifactSelectSchema.optional(),
  include: ArtifactIncludeSchema.optional(),
  where: ArtifactWhereUniqueInputSchema,
}).strict() ;

export const ArtifactFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ArtifactFindUniqueOrThrowArgs> = z.object({
  select: ArtifactSelectSchema.optional(),
  include: ArtifactIncludeSchema.optional(),
  where: ArtifactWhereUniqueInputSchema,
}).strict() ;

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithAggregationInputSchema.array(),TagOrderByWithAggregationInputSchema ]).optional(),
  by: TagScalarFieldEnumSchema.array(),
  having: TagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const ReactionFindFirstArgsSchema: z.ZodType<Prisma.ReactionFindFirstArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereInputSchema.optional(),
  orderBy: z.union([ ReactionOrderByWithRelationInputSchema.array(),ReactionOrderByWithRelationInputSchema ]).optional(),
  cursor: ReactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReactionScalarFieldEnumSchema,ReactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReactionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReactionFindFirstOrThrowArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereInputSchema.optional(),
  orderBy: z.union([ ReactionOrderByWithRelationInputSchema.array(),ReactionOrderByWithRelationInputSchema ]).optional(),
  cursor: ReactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReactionScalarFieldEnumSchema,ReactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReactionFindManyArgsSchema: z.ZodType<Prisma.ReactionFindManyArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereInputSchema.optional(),
  orderBy: z.union([ ReactionOrderByWithRelationInputSchema.array(),ReactionOrderByWithRelationInputSchema ]).optional(),
  cursor: ReactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReactionScalarFieldEnumSchema,ReactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReactionAggregateArgsSchema: z.ZodType<Prisma.ReactionAggregateArgs> = z.object({
  where: ReactionWhereInputSchema.optional(),
  orderBy: z.union([ ReactionOrderByWithRelationInputSchema.array(),ReactionOrderByWithRelationInputSchema ]).optional(),
  cursor: ReactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReactionGroupByArgsSchema: z.ZodType<Prisma.ReactionGroupByArgs> = z.object({
  where: ReactionWhereInputSchema.optional(),
  orderBy: z.union([ ReactionOrderByWithAggregationInputSchema.array(),ReactionOrderByWithAggregationInputSchema ]).optional(),
  by: ReactionScalarFieldEnumSchema.array(),
  having: ReactionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReactionFindUniqueArgsSchema: z.ZodType<Prisma.ReactionFindUniqueArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereUniqueInputSchema,
}).strict() ;

export const ReactionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReactionFindUniqueOrThrowArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereUniqueInputSchema,
}).strict() ;

export const ProjectArtifactFindFirstArgsSchema: z.ZodType<Prisma.ProjectArtifactFindFirstArgs> = z.object({
  select: ProjectArtifactSelectSchema.optional(),
  include: ProjectArtifactIncludeSchema.optional(),
  where: ProjectArtifactWhereInputSchema.optional(),
  orderBy: z.union([ ProjectArtifactOrderByWithRelationInputSchema.array(),ProjectArtifactOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectArtifactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectArtifactScalarFieldEnumSchema,ProjectArtifactScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectArtifactFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectArtifactFindFirstOrThrowArgs> = z.object({
  select: ProjectArtifactSelectSchema.optional(),
  include: ProjectArtifactIncludeSchema.optional(),
  where: ProjectArtifactWhereInputSchema.optional(),
  orderBy: z.union([ ProjectArtifactOrderByWithRelationInputSchema.array(),ProjectArtifactOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectArtifactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectArtifactScalarFieldEnumSchema,ProjectArtifactScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectArtifactFindManyArgsSchema: z.ZodType<Prisma.ProjectArtifactFindManyArgs> = z.object({
  select: ProjectArtifactSelectSchema.optional(),
  include: ProjectArtifactIncludeSchema.optional(),
  where: ProjectArtifactWhereInputSchema.optional(),
  orderBy: z.union([ ProjectArtifactOrderByWithRelationInputSchema.array(),ProjectArtifactOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectArtifactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectArtifactScalarFieldEnumSchema,ProjectArtifactScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectArtifactAggregateArgsSchema: z.ZodType<Prisma.ProjectArtifactAggregateArgs> = z.object({
  where: ProjectArtifactWhereInputSchema.optional(),
  orderBy: z.union([ ProjectArtifactOrderByWithRelationInputSchema.array(),ProjectArtifactOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectArtifactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectArtifactGroupByArgsSchema: z.ZodType<Prisma.ProjectArtifactGroupByArgs> = z.object({
  where: ProjectArtifactWhereInputSchema.optional(),
  orderBy: z.union([ ProjectArtifactOrderByWithAggregationInputSchema.array(),ProjectArtifactOrderByWithAggregationInputSchema ]).optional(),
  by: ProjectArtifactScalarFieldEnumSchema.array(),
  having: ProjectArtifactScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectArtifactFindUniqueArgsSchema: z.ZodType<Prisma.ProjectArtifactFindUniqueArgs> = z.object({
  select: ProjectArtifactSelectSchema.optional(),
  include: ProjectArtifactIncludeSchema.optional(),
  where: ProjectArtifactWhereUniqueInputSchema,
}).strict() ;

export const ProjectArtifactFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProjectArtifactFindUniqueOrThrowArgs> = z.object({
  select: ProjectArtifactSelectSchema.optional(),
  include: ProjectArtifactIncludeSchema.optional(),
  where: ProjectArtifactWhereUniqueInputSchema,
}).strict() ;

export const ArtifactTagFindFirstArgsSchema: z.ZodType<Prisma.ArtifactTagFindFirstArgs> = z.object({
  select: ArtifactTagSelectSchema.optional(),
  include: ArtifactTagIncludeSchema.optional(),
  where: ArtifactTagWhereInputSchema.optional(),
  orderBy: z.union([ ArtifactTagOrderByWithRelationInputSchema.array(),ArtifactTagOrderByWithRelationInputSchema ]).optional(),
  cursor: ArtifactTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArtifactTagScalarFieldEnumSchema,ArtifactTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArtifactTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ArtifactTagFindFirstOrThrowArgs> = z.object({
  select: ArtifactTagSelectSchema.optional(),
  include: ArtifactTagIncludeSchema.optional(),
  where: ArtifactTagWhereInputSchema.optional(),
  orderBy: z.union([ ArtifactTagOrderByWithRelationInputSchema.array(),ArtifactTagOrderByWithRelationInputSchema ]).optional(),
  cursor: ArtifactTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArtifactTagScalarFieldEnumSchema,ArtifactTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArtifactTagFindManyArgsSchema: z.ZodType<Prisma.ArtifactTagFindManyArgs> = z.object({
  select: ArtifactTagSelectSchema.optional(),
  include: ArtifactTagIncludeSchema.optional(),
  where: ArtifactTagWhereInputSchema.optional(),
  orderBy: z.union([ ArtifactTagOrderByWithRelationInputSchema.array(),ArtifactTagOrderByWithRelationInputSchema ]).optional(),
  cursor: ArtifactTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArtifactTagScalarFieldEnumSchema,ArtifactTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArtifactTagAggregateArgsSchema: z.ZodType<Prisma.ArtifactTagAggregateArgs> = z.object({
  where: ArtifactTagWhereInputSchema.optional(),
  orderBy: z.union([ ArtifactTagOrderByWithRelationInputSchema.array(),ArtifactTagOrderByWithRelationInputSchema ]).optional(),
  cursor: ArtifactTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ArtifactTagGroupByArgsSchema: z.ZodType<Prisma.ArtifactTagGroupByArgs> = z.object({
  where: ArtifactTagWhereInputSchema.optional(),
  orderBy: z.union([ ArtifactTagOrderByWithAggregationInputSchema.array(),ArtifactTagOrderByWithAggregationInputSchema ]).optional(),
  by: ArtifactTagScalarFieldEnumSchema.array(),
  having: ArtifactTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ArtifactTagFindUniqueArgsSchema: z.ZodType<Prisma.ArtifactTagFindUniqueArgs> = z.object({
  select: ArtifactTagSelectSchema.optional(),
  include: ArtifactTagIncludeSchema.optional(),
  where: ArtifactTagWhereUniqueInputSchema,
}).strict() ;

export const ArtifactTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ArtifactTagFindUniqueOrThrowArgs> = z.object({
  select: ArtifactTagSelectSchema.optional(),
  include: ArtifactTagIncludeSchema.optional(),
  where: ArtifactTagWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const ProjectCreateArgsSchema: z.ZodType<Prisma.ProjectCreateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
}).strict() ;

export const ProjectUpsertArgsSchema: z.ZodType<Prisma.ProjectUpsertArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
  create: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
  update: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProjectCreateManyArgsSchema: z.ZodType<Prisma.ProjectCreateManyArgs> = z.object({
  data: z.union([ ProjectCreateManyInputSchema,ProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProjectCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProjectCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProjectCreateManyInputSchema,ProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProjectDeleteArgsSchema: z.ZodType<Prisma.ProjectDeleteArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ProjectUpdateArgsSchema: z.ZodType<Prisma.ProjectUpdateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ProjectUpdateManyArgsSchema: z.ZodType<Prisma.ProjectUpdateManyArgs> = z.object({
  data: z.union([ ProjectUpdateManyMutationInputSchema,ProjectUncheckedUpdateManyInputSchema ]),
  where: ProjectWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProjectUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProjectUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProjectUpdateManyMutationInputSchema,ProjectUncheckedUpdateManyInputSchema ]),
  where: ProjectWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProjectDeleteManyArgsSchema: z.ZodType<Prisma.ProjectDeleteManyArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ArtifactCreateArgsSchema: z.ZodType<Prisma.ArtifactCreateArgs> = z.object({
  select: ArtifactSelectSchema.optional(),
  include: ArtifactIncludeSchema.optional(),
  data: z.union([ ArtifactCreateInputSchema,ArtifactUncheckedCreateInputSchema ]),
}).strict() ;

export const ArtifactUpsertArgsSchema: z.ZodType<Prisma.ArtifactUpsertArgs> = z.object({
  select: ArtifactSelectSchema.optional(),
  include: ArtifactIncludeSchema.optional(),
  where: ArtifactWhereUniqueInputSchema,
  create: z.union([ ArtifactCreateInputSchema,ArtifactUncheckedCreateInputSchema ]),
  update: z.union([ ArtifactUpdateInputSchema,ArtifactUncheckedUpdateInputSchema ]),
}).strict() ;

export const ArtifactCreateManyArgsSchema: z.ZodType<Prisma.ArtifactCreateManyArgs> = z.object({
  data: z.union([ ArtifactCreateManyInputSchema,ArtifactCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ArtifactCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ArtifactCreateManyAndReturnArgs> = z.object({
  data: z.union([ ArtifactCreateManyInputSchema,ArtifactCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ArtifactDeleteArgsSchema: z.ZodType<Prisma.ArtifactDeleteArgs> = z.object({
  select: ArtifactSelectSchema.optional(),
  include: ArtifactIncludeSchema.optional(),
  where: ArtifactWhereUniqueInputSchema,
}).strict() ;

export const ArtifactUpdateArgsSchema: z.ZodType<Prisma.ArtifactUpdateArgs> = z.object({
  select: ArtifactSelectSchema.optional(),
  include: ArtifactIncludeSchema.optional(),
  data: z.union([ ArtifactUpdateInputSchema,ArtifactUncheckedUpdateInputSchema ]),
  where: ArtifactWhereUniqueInputSchema,
}).strict() ;

export const ArtifactUpdateManyArgsSchema: z.ZodType<Prisma.ArtifactUpdateManyArgs> = z.object({
  data: z.union([ ArtifactUpdateManyMutationInputSchema,ArtifactUncheckedUpdateManyInputSchema ]),
  where: ArtifactWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ArtifactUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ArtifactUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ArtifactUpdateManyMutationInputSchema,ArtifactUncheckedUpdateManyInputSchema ]),
  where: ArtifactWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ArtifactDeleteManyArgsSchema: z.ZodType<Prisma.ArtifactDeleteManyArgs> = z.object({
  where: ArtifactWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
}).strict() ;

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
  create: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
  update: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
}).strict() ;

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TagCreateManyAndReturnArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReactionCreateArgsSchema: z.ZodType<Prisma.ReactionCreateArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  data: z.union([ ReactionCreateInputSchema,ReactionUncheckedCreateInputSchema ]),
}).strict() ;

export const ReactionUpsertArgsSchema: z.ZodType<Prisma.ReactionUpsertArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereUniqueInputSchema,
  create: z.union([ ReactionCreateInputSchema,ReactionUncheckedCreateInputSchema ]),
  update: z.union([ ReactionUpdateInputSchema,ReactionUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReactionCreateManyArgsSchema: z.ZodType<Prisma.ReactionCreateManyArgs> = z.object({
  data: z.union([ ReactionCreateManyInputSchema,ReactionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReactionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ReactionCreateManyAndReturnArgs> = z.object({
  data: z.union([ ReactionCreateManyInputSchema,ReactionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReactionDeleteArgsSchema: z.ZodType<Prisma.ReactionDeleteArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereUniqueInputSchema,
}).strict() ;

export const ReactionUpdateArgsSchema: z.ZodType<Prisma.ReactionUpdateArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  data: z.union([ ReactionUpdateInputSchema,ReactionUncheckedUpdateInputSchema ]),
  where: ReactionWhereUniqueInputSchema,
}).strict() ;

export const ReactionUpdateManyArgsSchema: z.ZodType<Prisma.ReactionUpdateManyArgs> = z.object({
  data: z.union([ ReactionUpdateManyMutationInputSchema,ReactionUncheckedUpdateManyInputSchema ]),
  where: ReactionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReactionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ReactionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ReactionUpdateManyMutationInputSchema,ReactionUncheckedUpdateManyInputSchema ]),
  where: ReactionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReactionDeleteManyArgsSchema: z.ZodType<Prisma.ReactionDeleteManyArgs> = z.object({
  where: ReactionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProjectArtifactCreateArgsSchema: z.ZodType<Prisma.ProjectArtifactCreateArgs> = z.object({
  select: ProjectArtifactSelectSchema.optional(),
  include: ProjectArtifactIncludeSchema.optional(),
  data: z.union([ ProjectArtifactCreateInputSchema,ProjectArtifactUncheckedCreateInputSchema ]),
}).strict() ;

export const ProjectArtifactUpsertArgsSchema: z.ZodType<Prisma.ProjectArtifactUpsertArgs> = z.object({
  select: ProjectArtifactSelectSchema.optional(),
  include: ProjectArtifactIncludeSchema.optional(),
  where: ProjectArtifactWhereUniqueInputSchema,
  create: z.union([ ProjectArtifactCreateInputSchema,ProjectArtifactUncheckedCreateInputSchema ]),
  update: z.union([ ProjectArtifactUpdateInputSchema,ProjectArtifactUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProjectArtifactCreateManyArgsSchema: z.ZodType<Prisma.ProjectArtifactCreateManyArgs> = z.object({
  data: z.union([ ProjectArtifactCreateManyInputSchema,ProjectArtifactCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProjectArtifactCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProjectArtifactCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProjectArtifactCreateManyInputSchema,ProjectArtifactCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProjectArtifactDeleteArgsSchema: z.ZodType<Prisma.ProjectArtifactDeleteArgs> = z.object({
  select: ProjectArtifactSelectSchema.optional(),
  include: ProjectArtifactIncludeSchema.optional(),
  where: ProjectArtifactWhereUniqueInputSchema,
}).strict() ;

export const ProjectArtifactUpdateArgsSchema: z.ZodType<Prisma.ProjectArtifactUpdateArgs> = z.object({
  select: ProjectArtifactSelectSchema.optional(),
  include: ProjectArtifactIncludeSchema.optional(),
  data: z.union([ ProjectArtifactUpdateInputSchema,ProjectArtifactUncheckedUpdateInputSchema ]),
  where: ProjectArtifactWhereUniqueInputSchema,
}).strict() ;

export const ProjectArtifactUpdateManyArgsSchema: z.ZodType<Prisma.ProjectArtifactUpdateManyArgs> = z.object({
  data: z.union([ ProjectArtifactUpdateManyMutationInputSchema,ProjectArtifactUncheckedUpdateManyInputSchema ]),
  where: ProjectArtifactWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProjectArtifactUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProjectArtifactUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProjectArtifactUpdateManyMutationInputSchema,ProjectArtifactUncheckedUpdateManyInputSchema ]),
  where: ProjectArtifactWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProjectArtifactDeleteManyArgsSchema: z.ZodType<Prisma.ProjectArtifactDeleteManyArgs> = z.object({
  where: ProjectArtifactWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ArtifactTagCreateArgsSchema: z.ZodType<Prisma.ArtifactTagCreateArgs> = z.object({
  select: ArtifactTagSelectSchema.optional(),
  include: ArtifactTagIncludeSchema.optional(),
  data: z.union([ ArtifactTagCreateInputSchema,ArtifactTagUncheckedCreateInputSchema ]),
}).strict() ;

export const ArtifactTagUpsertArgsSchema: z.ZodType<Prisma.ArtifactTagUpsertArgs> = z.object({
  select: ArtifactTagSelectSchema.optional(),
  include: ArtifactTagIncludeSchema.optional(),
  where: ArtifactTagWhereUniqueInputSchema,
  create: z.union([ ArtifactTagCreateInputSchema,ArtifactTagUncheckedCreateInputSchema ]),
  update: z.union([ ArtifactTagUpdateInputSchema,ArtifactTagUncheckedUpdateInputSchema ]),
}).strict() ;

export const ArtifactTagCreateManyArgsSchema: z.ZodType<Prisma.ArtifactTagCreateManyArgs> = z.object({
  data: z.union([ ArtifactTagCreateManyInputSchema,ArtifactTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ArtifactTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ArtifactTagCreateManyAndReturnArgs> = z.object({
  data: z.union([ ArtifactTagCreateManyInputSchema,ArtifactTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ArtifactTagDeleteArgsSchema: z.ZodType<Prisma.ArtifactTagDeleteArgs> = z.object({
  select: ArtifactTagSelectSchema.optional(),
  include: ArtifactTagIncludeSchema.optional(),
  where: ArtifactTagWhereUniqueInputSchema,
}).strict() ;

export const ArtifactTagUpdateArgsSchema: z.ZodType<Prisma.ArtifactTagUpdateArgs> = z.object({
  select: ArtifactTagSelectSchema.optional(),
  include: ArtifactTagIncludeSchema.optional(),
  data: z.union([ ArtifactTagUpdateInputSchema,ArtifactTagUncheckedUpdateInputSchema ]),
  where: ArtifactTagWhereUniqueInputSchema,
}).strict() ;

export const ArtifactTagUpdateManyArgsSchema: z.ZodType<Prisma.ArtifactTagUpdateManyArgs> = z.object({
  data: z.union([ ArtifactTagUpdateManyMutationInputSchema,ArtifactTagUncheckedUpdateManyInputSchema ]),
  where: ArtifactTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ArtifactTagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ArtifactTagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ArtifactTagUpdateManyMutationInputSchema,ArtifactTagUncheckedUpdateManyInputSchema ]),
  where: ArtifactTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ArtifactTagDeleteManyArgsSchema: z.ZodType<Prisma.ArtifactTagDeleteManyArgs> = z.object({
  where: ArtifactTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;